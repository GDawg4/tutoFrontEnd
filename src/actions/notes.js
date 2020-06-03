import * as types from '../types/notes'

export const startNotesFetch = (note) => ({
    type:types.NOTE_FETCH_STARTED,
    payload:note
});

export const completeFetchingNotes = (entities, order) => ({
    type: types.NOTE_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});

export const failFetchingNotes = error => ({
    type: types.NOTE_FETCH_FAILED,
    payload: {
        error,
    },
});

export const selectNote = note => ({
    type: types.NOTE_SELECTED,
    payload:note
})

export const deSelectNote = () => ({
    type: types.NOTE_DESELECTED
})

export const startRemovingNote = note => ({
    type: types.NOTE_REMOVE_STARTED,
    payload: note
});
export const completeRemovingNote = (note) => ({
    type: types.NOTE_REMOVE_COMPLETED,
    payload:note
});
export const failRemovingNote = (id, error) => ({
    type: types.NOTE_REMOVE_FAILED,
    payload: {
        id,
        error,
    },
});

export const startAddingNote = note => ({
    type: types.NOTE_ADD_STARTED,
    payload: note,
});
export const completeAddingNote = (oldId, note) => ({
    type: types.NOTE_ADD_COMPLETED,
    payload: {
        oldId,
        note,
    },
});
export const failAddingNote = (oldId, error) => ({
    type: types.NOTE_ADD_FAILED,
    payload: {
        oldId,
        error,
    },
});