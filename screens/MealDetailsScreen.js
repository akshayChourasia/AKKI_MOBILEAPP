import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import MealDetailsItem from '../components/MealItemDetails';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButtons from '../components/CustomHeaderButtons';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorites } from '../store/actions';

const MealDetailsScreen = (props) => {
	const [favclicked, setFavClicked] = useState(false);
	const filteredMeals = useSelector(state => state.meals.filteredMeals);
	const meal = filteredMeals.find((m) => m.id === props.navigation.getParam('mealId'));
	const currentMealIsFav = useSelector(state => state.meals.favoriteMeals.some(m => m.id === meal.id));
	
	const dispatch = useDispatch();
	const toggleFavHandler = useCallback(() => {
		dispatch(toggleFavorites(meal.id));
		setFavClicked(true);
	}, [ dispatch, meal ])
	
	useEffect(() => {
		props.navigation.setParams({
			toggleFav: toggleFavHandler
		})
	}, [ toggleFavHandler ])

	useEffect(() => {
		props.navigation.setParams({
			isFav: currentMealIsFav
		})
		if ( favclicked ) {
			const msg = currentMealIsFav ? 'Added to favorites.': 'Removed From favorites.';
			Alert.alert(
				msg,
				"",
				[
				  {
					text: "Ok",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel"
				  }
				],
				{ cancelable: false }
			);
		} 
	}, [ currentMealIsFav ])

	return (
		<ScrollView>
			<View style={styles.screen}>
				<MealDetailsItem {...{ item: { ...meal } }} />
				<View style={styles.titles}>
					<Text> Ingredients </Text>
				</View>
				{
					meal.ingredients &&
					meal.ingredients.map((ing, i) => {
						return <View key={i} style={styles.ingredients}>
							<Text>
								{ing}
							</Text>
						</View>
					})
				}
				<View style={styles.titles}>
					<Text> Steps </Text>
				</View>
				{
					meal.steps &&
					meal.steps.map((step, i) => {
						return <View key={i} style={styles.ingredients}>
							<Text>
								{(i+1)} : {step}
							</Text>
						</View>
					})
				}
			</View>
		</ScrollView>
	);
};

export default MealDetailsScreen;

MealDetailsScreen.navigationOptions = (navigationData) => {
	const color = navigationData.navigation.getParam('categoryColor');
	const mealTitle = navigationData.navigation.getParam('mealTitle');
	const isFav = navigationData.navigation.getParam('isFav');
	const toggleFav = navigationData.navigation.getParam('toggleFav');
	return {
		headerTitle: mealTitle,
		headerStyle: {
			backgroundColor: color,
		},
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButtons}>
				<Item 
					title='Favorite' 
					iconName={isFav ? 'ios-heart' :'ios-heart-empty'} 
					onPress={toggleFav} 
				/>
			</HeaderButtons>
		),
	};
};

const styles = StyleSheet.create({
	screen: {
		// padding: 15,
	},
	ingredients: {
		margin: 10,
		borderWidth: 1,
		borderRadius: 4,
		borderColor: '#ccc',
		padding: 10,
		color: '#fff'
	},
	titles: {
		alignItems: 'center',
		margin: 5,
		padding: 15,
		borderBottomColor: "#ccc",
		borderBottomWidth: 1
	}
});
