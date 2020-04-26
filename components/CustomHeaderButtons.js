import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import * as Colors from '../contants/Colors';

const CustomHeaderButtons = (props) => {
	return (
		<HeaderButton
			{...props}
			IconComponent={Ionicons}
			iconSize={23}
			// color={Platform.OS === 'android' ? 'white' : Colors.primary}
			color={'white'}
		/>
	);
};

export default CustomHeaderButtons;
