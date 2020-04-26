import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ImageBackground,
} from 'react-native';

const MealItem = (props) => {
	return (
		<View style={styles.mealItems}>
			<TouchableOpacity style={styles.meal} onPress={props.onSelectMeal}>
				<View>
					<View style={{ ...styles.mealHeader, ...styles.mealRow }}>
						<ImageBackground
							source={{ uri: props.item.imageUrl }}
							style={styles.bgImage}
						>
							<View style={styles.titleWrapper}>
								<Text numberOfLines={1} style={styles.bgTitle}>
									{props.item.title}
								</Text>
							</View>
						</ImageBackground>
					</View>
					<View style={{ ...styles.mealDetail, ...styles.mealRow }}>
						<Text>{props.item.duration} m</Text>
						<Text>{props.item.complexity.toUpperCase()}</Text>
						<Text>{props.item.affordability.toUpperCase()}</Text>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default MealItem;

const styles = StyleSheet.create({
	mealItems: {
		height: 200,
		width: '100%',
		backgroundColor: '#cccc',
		marginBottom: 10,
		overflow: 'hidden',
		borderRadius: 10,
	},
	meal: {},
	mealRow: {
		flexDirection: 'row',
		// backgroundColor: '#cccc',
		borderRadius: 10,
	},
	mealHeader: {
		height: '80%',
	},
	mealDetail: {
		height: '20%',
		paddingHorizontal: 20,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	bgImage: {
		width: '100%',
		height: '100%',
		justifyContent: 'flex-end',
	},
	titleWrapper: {
		backgroundColor: 'rgba(0,0,0,0.3)',
	},
	bgTitle: {
		fontFamily: 'open-sans-bold',
		fontSize: 20,
		padding: 10,
		color: 'white',
		textAlign: 'center',
	},
});
