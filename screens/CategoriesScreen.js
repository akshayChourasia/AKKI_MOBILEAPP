import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTiles from '../components/CategoryGridTiles';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButtons from '../components/CustomHeaderButtons';

const CategoriesScreen = (props) => {
	const renderGridItem = (itemData) => {
		return <CategoryGridTiles {...itemData} {...props} />;
	};

	return (
		<FlatList
			keyExtractor={(item, index) => item.id}
			data={CATEGORIES}
			renderItem={renderGridItem}
			numColumns={2}
		/>
	);
};

CategoriesScreen.navigationOptions = (navData) => ({
	headerTitle: 'Meals Category',
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
});

export default CategoriesScreen;

const styles = StyleSheet.create({});
