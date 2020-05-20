import { schema } from 'normalizr'

const publisherSchema = new schema.Entity(
    'publisher'
)

const authorSchema = new schema.Entity(
    'author'
)

export const bookSchema = new schema.Entity(
    'book',{
        author:authorSchema,
        publisher:publisherSchema
    }
);

export const bookListSchema = [bookSchema];