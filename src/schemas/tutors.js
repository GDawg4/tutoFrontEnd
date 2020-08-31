import { schema } from 'normalizr'

export const tutorSchema = new schema.Entity(
    'tutor'
);

export const tutorListSchema = [tutorSchema];