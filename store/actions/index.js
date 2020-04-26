export const LOAD_MEALS = 'LOAD_MEALS';
export const loadMeals = () => ({
    type: LOAD_MEALS
})

export const TOGGLE_FAVORITES = 'TOGGLE_FAVORITES';
export const toggleFavorites = (id) => ({
    type: TOGGLE_FAVORITES,
    payload: id
})

export const SET_FILTERS = 'SET_FILTERS';
export const setFilters = filterSettings => {
    return { type: SET_FILTERS, payload:{ filters: filterSettings } };
};