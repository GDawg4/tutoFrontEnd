import { schema } from 'normalizr'

const studentSchema = new schema.Entity(
    'user_id'
)

const courseSchema = new schema.Entity(
    'course'
)

export const tutorSchema = new schema.Entity(
    'tutors',{
        student: studentSchema,
        course: courseSchema
    }
);

export const tutorListSchema = [tutorSchema];