import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Switch, Alert } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButtons from '../components/CustomHeaderButtons';
import Colors from '../contants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../store/actions';
const FilterSwitch = props => (
	<View style={styles.filtercontainer}>
		<Text> {props.title} </Text>
	<Switch 
		// trackColor={{true: Colors.primary}} 
		// thumbColor={Colors.primary} 
		value={props.state} onValueChange={newValue => props.setState(newValue)
		}/>
	</View>
)

const FiltersScreen = props => {
	const { navigation } = props;
	const filteredSaved = useSelector(state => state.meals.filteredSaved);
	const [glutenFree, setIsGluteenFree] = useState(false);
	const [lactoseFree, setIsLactos] = useState(false);
	const [vegan, setIsVegan] = useState(false);
	const [vegetarian, setIsVegetarian] = useState(false);
	
	const dispatch = useDispatch();
	const setFilterValues = useCallback(() => {
		const appliedFilters = {
			glutenFree: glutenFree,
			lactoseFree: lactoseFree,
			vegan: vegan,
			vegetarian: vegetarian
		};
		Alert.alert(
			"Filter\'s has been applied.",
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
		dispatch(setFilters(appliedFilters));
	}, [
		glutenFree,
		lactoseFree,
		vegan,
		vegetarian
	])

	useEffect(() => {
		navigation.setParams({save: setFilterValues});
		// return () => {
		// 	cleanup
		// }
	}, [
		setFilterValues
	])
	return <View style={styles.screen}>
			<Text style={styles.title}> Available Filters / Restrictions </Text>
			<FilterSwitch title={'Gluteen-Free'} state={glutenFree} setState={setIsGluteenFree}/>
			<FilterSwitch title={'Lactos-Free'} state={lactoseFree} setState={setIsLactos}/>
			<FilterSwitch title={'Vegan'} state={vegan} setState={setIsVegan}/>
			<FilterSwitch title={'Vegetarian'} state={vegetarian} setState={setIsVegetarian}/>
		</View>
};

FiltersScreen.navigationOptions = (navData) => ({
	headerTitle: 'Filters',
	headerStyle: {
		backgroundColor: '#FE6B8B',
	},
	headerLeft: () => (
		<HeaderButtons HeaderButtonComponent={CustomHeaderButtons}>
			<Item
				title='Favorite'
				iconName='ios-menu'
				onPress={() => navData.navigation.toggleDrawer()}
			/>
		</HeaderButtons>
	),
	headerRight: () => (
		<HeaderButtons HeaderButtonComponent={CustomHeaderButtons}>
			<Item
				title='Save Filter'
				iconName='ios-save'
				onPress={() => navData.navigation.getParam('save')()}
			/>
		</HeaderButtons>
	),
});

export default FiltersScreen;
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		// justifyContent: 'center',
		alignItems: 'center',
		margin: 10
	},
	title: {
		fontFamily: "open-sans-bold",
		fontSize: 20,
		alignItems: 'center',
		padding: 8,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc'
	},
	filtercontainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '80%',
		marginVertical: 10,
		// borderBottomWidth: 1,
		// borderBottomColor: '#ccc'
	}
});
