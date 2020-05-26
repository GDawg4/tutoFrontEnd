import { schema } from 'normalizr'

export const transactionSchema = new schema.Entity(
    'transaction'
);

export const transactionListSchema = [transactionSchema];