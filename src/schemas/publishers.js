import { schema } from 'normalizr'

export const publisherSchema = new schema.Entity(
    'publisher'
);

export const publisherListSchema = [publisherSchema];