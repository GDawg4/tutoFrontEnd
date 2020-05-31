import { schema } from 'normalizr'

export const tagSchema = new schema.Entity(
    'tag'
);

export const tagListSchema = [tagSchema];