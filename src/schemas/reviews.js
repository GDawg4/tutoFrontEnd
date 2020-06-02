import { schema } from 'normalizr'

export const reviewSchema = new schema.Entity(
    'review'
);

export const reviewListSchema = [reviewSchema];