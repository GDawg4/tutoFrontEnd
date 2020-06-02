import { schema } from 'normalizr'

export const analysisSchema = new schema.Entity(
    'analysis'
);

export const analysisListSchema = [analysisSchema];