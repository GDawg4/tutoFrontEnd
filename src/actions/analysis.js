import * as types from '../types/analysis'

export const startFetchingAnalysis = () => ({
    type: types.ANALYSIS_FETCH_STARTED,
});
export const completeFetchingAnalysis = (entities, order) => ({
    type: types.ANALYSIS_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});
export const failFetchingAnalysis = error => ({
    type: types.ANALYSIS_FETCH_FAILED,
    payload: {
        error,
    },
});

export const startAddingAnalysis = analysis => ({
    type: types.ANALYSIS_ADD_STARTED,
    payload: analysis,
});
export const completeAddingAnalysis = (oldId, analysis) => ({
    type: types.ANALYSIS_ADD_COMPLETED,
    payload: {
        oldId,
        analysis,
    },
});
export const failAddingAnalysis = (oldId, error) => ({
    type: types.ANALYSIS_ADD_FAILED,
    payload: {
        oldId,
        error,
    },
});

export const startRemovingAnalysis = id => ({
    type: types.ANALYSIS_REMOVE_STARTED,
    payload: {
        id,
    },
});
export const completeRemovingAnalysis = () => ({
    type: types.ANALYSIS_REMOVE_COMPLETED,
});
export const failRemovingAnalysis = (id, error) => ({
    type: types.ANALYSIS_REMOVE_FAILED,
    payload: {
        id,
        error,
    },
});

export const selectAnalysis = (id) => ({
    type: types.ANALYSIS_SELECTED,
    payload: {
        id
    }
});

export const deselectAnalysis = () => ({
    type: types.ANALYSIS_DESELECTED
});