import { schema } from 'normalizr'

const noteSchema = new schema.Entity(
    'note'
);

export const noteListSchema = [noteSchema];