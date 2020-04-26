import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import * as Data from '../data/dummy-data';
import { FlatList } from 'react-native-gesture-handler';
import MealItem from '../components/MealItem';

const CategoriesMealScreen = (props) => {
	const filteredMeals = useSelector(state => state.meals.filteredMeals);
	const selectedCategoryId = props.navigation.getParam('categoryId');
	const fetchedCategoryName = Data.CATEGORIES.find(
		(c) => c.id === selectedCategoryId
	);
	const meals = filteredMeals.filter(
		(m) => m.categoryIds.indexOf(selectedCategoryId) >= 0
	);
	const favoriteMeals = useSelector(state => state.meals.favoriteMeals);
	const renderMealItem = (itemData) => {
		return (
			<MealItem
				onSelectMeal={() =>
					props.navigation.navigate({
						routeName: 'MealDetail',
						params: {
							mealId: itemData.item.id,
							mealTitle: itemData.item.title,
							categoryColor: fetchedCategoryName.color,
							isFav: favoriteMeals.some(m => m.id === itemData.item.id)
						}
					})
				}
				{...itemData}
				{...props}
			/>
		);
	};

	return (
		<View style={styles.screen}>
			{meals.length ? <FlatList
				style={{ width: '100%' }}
				data={meals}
				renderItem={renderMealItem}
				keyExtractor={(item, index) => item.id}
			/>
			: 
			<Text>
				Please check your filters, If you haven't find your item. 
			</Text>}
		</View>
	);
};

CategoriesMealScreen.navigationOptions = (navigationData) => {
	const fetchedCategoryName = Data.CATEGORIES.find(
		(c) => c.id === navigationData.navigation.getParam('categoryId')
	);
	return {
		headerTitle: fetchedCategoryName.title || 'Category',
		headerStyle: {
			backgroundColor: fetchedCategoryName.color,
		},
	};
};

export default CategoriesMealScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 15,
	},
});
