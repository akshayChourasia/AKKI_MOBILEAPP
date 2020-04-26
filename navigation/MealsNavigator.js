import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoriesMealScreen from '../screens/CategoriesMealScreen';
import MealDetailsScreen from '../screens/MealDetailsScreen';
import Colors from '../contants/Colors';
import FavoritesScreen from '../screens/FavoritesScreen';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import FiltersScreen from '../screens/FiltersScreen';

const MealsNavigator = createStackNavigator(
	{
		Categories: CategoriesScreen,
		CategoryMeals: {
			screen: CategoriesMealScreen,
		},
		MealDetail: MealDetailsScreen,
	},
	{
		defaultNavigationOptions: {
			headerTintColor: 'white',
			headerTitleStyle: {
				fontFamily: 'open-sans-bold'
			},
			headerBackTitleStyle: {
				fontFamily: 'open-sans-bold'
			}
		},
	}
);

const favoriteNavigator = createStackNavigator(
	{
		screen: FavoritesScreen,
	},
	{
		navigationOptions: {
			tabBarIcon: (tabInfo) => {
				return (
					<Ionicons
						name='ios-heart-empty'
						size={25}
						color={tabInfo.tintColor}
					/>
				);
			},
			headerTintColor: 'white',
		},
	}
);

const tabScreenConst = {
	Meals: {
		screen: MealsNavigator,
		navigationOptions: {
			tabBarIcon: (tabInfo) => {
				return (
					<Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
				);
			},
		},
	},
	Favorites: favoriteNavigator,
};

const mealsTabNavigator =
	// Platform.OS === 'android'
	// 	? createMaterialBottomTabNavigator(tabScreenConst, {
	// 			activeTintColor: Colors.primary,
	// 			shifting: true,
	// 	  })
	// :
	createBottomTabNavigator(tabScreenConst, {
		tabBarOptions: {
			activeTintColor: Colors.primary,
			labelStyle: {
				fontFamily: 'open-sans-bold'
			}
		},
	});

// Drawer based navigations

const filtersNavigator = createStackNavigator(
	{
		Filters: {
			screen: FiltersScreen,
		},
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: Colors.primary,
			},
			headerTintColor: 'white',
		},
	}
);
const appDrawer = createDrawerNavigator(
	{
		MealsFav: {
			screen: mealsTabNavigator,
			navigationOptions: {
				drawerLabel: 'Meals',
			},
		},
		Filters: {
			screen: filtersNavigator,
			navigationOptions: {
				drawerLabel: "Filter's",
			},
		},
	},
	{
		contentOptions: {
			activeTintColor: Colors.primary,
			labelStyle: {
				fontFamily: 'open-sans-bold',
			},
		},
	}
);

// export default createAppContainer(mealsTabNavigator);
export default createAppContainer(appDrawer);
