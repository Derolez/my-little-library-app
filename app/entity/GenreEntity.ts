import { z } from "zod";
import { ObjectId } from "mongodb";

const genreBaseSchema = z.object({
    _id: z.instanceof(ObjectId),
    name: z.string(),
    category: z.string(),
});

export const genreEntitySchema = genreBaseSchema;

export type GenreEntity = z.infer<typeof genreEntitySchema>;

export const genreDTOSchema = z.object({
    id: z.string(),
    name: genreBaseSchema.shape.name,
    category: genreBaseSchema.shape.category,
});

export type GenreDTO = z.infer<typeof genreDTOSchema>;

export const GenreDTO = {
    convertFromEntity(entity: GenreEntity): GenreDTO {
        const candidate = {
            id: entity._id.toHexString(),
            name: entity.name,
            category: entity.category,
        };
        return genreDTOSchema.parse(candidate);
    },
};
