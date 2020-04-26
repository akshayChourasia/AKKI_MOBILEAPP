import * as actions from '../actions';
import { MEALS } from '../../data/dummy-data';

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
  filteredSaved: false
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case actions.TOGGLE_FAVORITES:
            const existingIndex = state.favoriteMeals.findIndex(
                meal => meal.id === payload
              );
              if (existingIndex >= 0) {
                const updatedFavMeals = [...state.favoriteMeals];
                updatedFavMeals.splice(existingIndex, 1);
                return { ...state, favoriteMeals: updatedFavMeals };
              } else {
                const meal = state.meals.find(meal => meal.id === payload);
                return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
              }
              case actions.SET_FILTERS:
                const appliedFilters = payload.filters;
                const updatedFilteredMeals = state.meals.filter(meal => {
                  if (appliedFilters.glutenFree && !meal.isGlutenFree) {
                    return false;
                  }
                  if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
                    return false;
                  }
                  if (appliedFilters.vegetarian && !meal.isVegetarian) {
                    return false;
                  }
                  if (appliedFilters.vegan && !meal.isVegan) {
                    return false;
                  }
                  return true;
                });
                return { ...state, 
                  filteredMeals: updatedFilteredMeals,
                  filteredSaved: true
                };
        default:
            return state
    }
}
