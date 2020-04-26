import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Platform,
	TouchableNativeFeedback,
} from 'react-native';

const CategoryGridTiles = (props) => {
	let TouchableCmp = TouchableOpacity;
	if (Platform.OS === 'android' && Platform.Version >= 21) {
		TouchableCmp = TouchableNativeFeedback;
	}
	return (
		<View style={styles.grid}>
			<TouchableCmp
				onPress={() => {
					props.navigation.navigate({
						routeName: 'CategoryMeals',
						params: {
							categoryId: props.item.id,
						},
					});
				}}
			>
				<View
					style={{
						...styles.container,
						...{ backgroundColor: props.item.color },
					}}
				>
					<Text numberOfLines={2} style={styles.title}>
						{props.item.title}
					</Text>
				</View>
			</TouchableCmp>
		</View>
	);
};

export default CategoryGridTiles;

const styles = StyleSheet.create({
	grid: {
		flex: 1,
		margin: 15,
		elevation: 5,
		overflow:
			Platform.OS === 'android' && Platform.Version >= 21
				? 'hidden'
				: 'visible',
	},
	container: {
		height: 100,
		flex: 1,
		borderRadius: 10,
		shadowColor: 'black',
		shadowOpacity: 0.26,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		padding: 15,
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
	},
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 20,
		textAlign: 'right',
	},
});
