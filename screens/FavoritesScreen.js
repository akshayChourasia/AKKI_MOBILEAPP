import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButtons from '../components/CustomHeaderButtons';
import { useSelector } from 'react-redux';
import MealItem from '../components/MealItem';

const FavoritesScreen = (props) => {
	const meals = useSelector(state => state.meals.favoriteMeals);
	const renderMealItem = (itemData) => {
		return (
			<MealItem
				onSelectMeal={() =>
					props.navigation.navigate({
						routeName: 'MealDetail',
						params: {
							mealId: itemData.item.id,
							mealTitle: itemData.item.title,
							categoryColor: itemData.item.categoryIds[0],
						},
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
			/>: <Text> You have no favorites !!</Text>}
		</View>
	);
};

export default FavoritesScreen;

FavoritesScreen.navigationOptions = (navData) => ({
	headerTitle: 'Your Favorites',
	headerStyle: {
		backgroundColor: '#FE6B8B',
	},
	headerTintColor: 'white',
	headerLeft: () => (
		<HeaderButtons HeaderButtonComponent={CustomHeaderButtons}>
			<Item
				title='Favorite'
				iconName='ios-menu'
				onPress={() => navData.navigation.toggleDrawer()}
			/>
		</HeaderButtons>
	),
});
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 15,
	},
});
