import { schema } from 'normalizr'

export const courseSchema = new schema.Entity(
    'course'
);

export const courseListSchema = [courseSchema];