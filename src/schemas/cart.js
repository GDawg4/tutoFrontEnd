import { schema } from 'normalizr'

const cartSchema = new schema.Entity(
    'author',
    {},
    {idAttribute: 'book'}
);

export const cartListSchema = [cartSchema];