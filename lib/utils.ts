/**
 * Utility function to convert MongoDB _id to string id
 */
export function getIdFromMongoId(document: { _id?: { toString: () => string } | string | unknown } | { id?: string } | Record<string, unknown>): string {
  const doc = document as Record<string, unknown>;
  
  if ('id' in doc && typeof doc.id === 'string') {
    return doc.id;
  }
  
  if ('_id' in doc) {
    const id = doc._id;
    if (typeof id === 'string') {
      return id;
    }
    if (id && typeof id === 'object' && 'toString' in id && typeof (id as { toString: () => string }).toString === 'function') {
      return (id as { toString: () => string }).toString();
    }
    return String(id);
  }
  
  return String(doc);
}

/**
 * Serializes MongoDB documents to plain objects for Next.js
 * Converts ObjectId to strings and Date to ISO strings
 * This function recursively processes the object to ensure all nested values are serializable
 */
export function serializeMongoDocument<T>(doc: T): T {
  // Handle null or undefined
  if (doc === null || doc === undefined) {
    return doc;
  }
  
  // Handle arrays
  if (Array.isArray(doc)) {
    return doc.map(item => serializeMongoDocument(item)) as T;
  }
  
  // Handle primitive types (string, number, boolean, etc.)
  if (typeof doc !== 'object') {
    return doc;
  }
  
  // Handle Date objects
  if (doc instanceof Date) {
    return doc.toISOString() as T;
  }
  
  // Handle ObjectId and similar MongoDB types
  if (doc && typeof doc === 'object') {
    const docAsRecord = doc as Record<string, unknown> & { 
      toJSON?: () => unknown;
      toHexString?: () => string;
      toString?: () => string;
      _bsontype?: string;
      constructor?: { name?: string };
    };
    
    // If the object has a toJSON method, use it first (Mongoose documents)
    if (typeof docAsRecord.toJSON === 'function') {
      try {
        const jsonResult = docAsRecord.toJSON();
        return serializeMongoDocument(jsonResult) as T;
      } catch {
        // If toJSON fails, continue with normal serialization
      }
    }
    
    // Check if it's an ObjectId-like object (Mongoose ObjectId)
    if (
      (typeof docAsRecord.toHexString === 'function') ||
      (docAsRecord._bsontype === 'ObjectId') ||
      (docAsRecord.constructor?.name === 'ObjectId')
    ) {
      // Try to convert ObjectId to string
      if (typeof docAsRecord.toString === 'function') {
        return docAsRecord.toString() as T;
      }
      if (typeof docAsRecord.toHexString === 'function') {
        return docAsRecord.toHexString() as T;
      }
      return String(doc) as T;
    }
    
    // Recursively serialize object properties
    const serialized: Record<string, unknown> = {};
    
    // Get all keys including non-enumerable ones
    const keys = Object.keys(doc);
    
    for (const key of keys) {
      const value = docAsRecord[key];
      
      // Skip functions
      if (typeof value === 'function') {
        continue;
      }
      
      // Handle null/undefined
      if (value === null || value === undefined) {
        serialized[key] = value;
      }
      // Handle Date
      else if (value instanceof Date) {
        serialized[key] = value.toISOString();
      }
      // Handle ObjectId
      else if (
        value &&
        typeof value === 'object' &&
        (
          ('toHexString' in value && typeof (value as { toHexString: () => string }).toHexString === 'function') ||
          ('_bsontype' in value && (value as { _bsontype: string })._bsontype === 'ObjectId') ||
          (value.constructor && (value.constructor as { name?: string }).name === 'ObjectId')
        )
      ) {
        const objId = value as { toString?: () => string; toHexString?: () => string };
        serialized[key] = objId.toString?.() || objId.toHexString?.() || String(value);
      }
      // Handle arrays
      else if (Array.isArray(value)) {
        serialized[key] = value.map(item => serializeMongoDocument(item));
      }
      // Handle nested objects (plain objects only)
      else if (value && typeof value === 'object' && value.constructor === Object) {
        serialized[key] = serializeMongoDocument(value);
      }
      // Handle primitives and other serializable values
      else {
        serialized[key] = value;
      }
    }
    
    // Final check: try JSON serialization to catch any remaining non-serializable values
    try {
      JSON.stringify(serialized);
      return serialized as T;
    } catch {
      // If JSON.stringify fails, try to use JSON.parse(JSON.stringify()) with a replacer
      // This will remove any non-serializable values
      try {
        const jsonString = JSON.stringify(doc, (key, val) => {
          // Skip functions
          if (typeof val === 'function') {
            return undefined;
          }
          // Convert Date to ISO string
          if (val instanceof Date) {
            return val.toISOString();
          }
          // Convert ObjectId to string
          if (val && typeof val === 'object' && 'toHexString' in val && typeof (val as { toHexString: () => string }).toHexString === 'function') {
            return (val as { toString: () => string }).toString();
          }
          return val;
        });
        return JSON.parse(jsonString) as T;
      } catch {
        // If all else fails, return the serialized object as-is
        // This might cause issues, but it's better than crashing
        return serialized as T;
      }
    }
  }
  
  return doc;
}

