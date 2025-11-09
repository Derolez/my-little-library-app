import { z } from "zod";
import { ObjectId } from "mongodb";

const bookBaseSchema = z.object({
  _id: z.instanceof(ObjectId),
  title: z.string(),
  author: z.string().optional(),
  editionName: z.string().optional(),
  yearOfPublication: z.number().min(1600).max(new Date().getFullYear(), { message: "Year cannot be in the future" }).optional(),
  ean13: z.number().positive().refine((val) => val.toString().length === 13, {message: "Le numero de chiffres du codebar doit comprendre 13 caractères exactement"}).optional(),
  copyNum: z.number().min(1),
  loanableStatus: z.enum(["available on site", "loanable"]),
  summary: z.string().optional(),
  coverURL: z.string().url().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const bookEntitySchema = bookBaseSchema;

export type BookEntity = z.infer<typeof bookEntitySchema>;

export const bookDTOSchema = z.object({
  id: z.string(),
  title: bookBaseSchema.shape.title,
  author: bookBaseSchema.shape.author,
  editionName: bookBaseSchema.shape.editionName,
  yearOfPublication: bookBaseSchema.shape.yearOfPublication,
  ean13: bookBaseSchema.shape.ean13,
  copyNum: bookBaseSchema.shape.copyNum,
  loanableStatus: bookBaseSchema.shape.loanableStatus,
  summary: bookBaseSchema.shape.summary,
  coverURL: bookBaseSchema.shape.coverURL,
});

export type BookDTO = z.infer<typeof bookDTOSchema>;

export const BookDTO = {
  convertFromEntity(entity: BookEntity): BookDTO {
    const candidate = {
      id: entity._id.toHexString(),
      title: entity.title,
      author: entity.author,
      editionName: entity.editionName,
      yearOfPublication: entity.yearOfPublication,
      ean13: entity.ean13,
      copyNum: entity.copyNum,
      loanableStatus: entity.loanableStatus,
      summary: entity.summary,
      coverURL: entity.coverURL,
    };
    return bookDTOSchema.parse(candidate);
  },
};