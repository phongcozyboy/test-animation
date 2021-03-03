import React, { useRef, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Animated,
	TouchableWithoutFeedback,
	Dimensions,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
	CardStyleInterpolators,
	createStackNavigator,
} from "@react-navigation/stack";

const AddButton = (props) => {
	const [scaleValue] = useState(new Animated.Value(0));

	const scaleValueInterpolation = scaleValue.interpolate({
		inputRange: [0, 0.25, 1],
		outputRange: props.route.name === "HomeScreen" ? [1, 20, 30] : [30, 20, 1],
	});

	return (
		<>
			<Animated.View
				style={[
					styles.container,
					{
						backgroundColor: "pink",
						transform: [{ scale: scaleValueInterpolation }],
					},
				]}
			/>
			<TouchableOpacity
				style={[
					styles.container,
					{
						backgroundColor:
							props.route.name === "HomeScreen" ? "pink" : "#fff",
					},
				]}
				onPress={() => {
					Animated.timing(scaleValue, {
						toValue: 1,
						useNativeDriver: true,
						duration: 700,
					}).start(() => {
						scaleValue.setValue(0);
					});
					if (props.route.name === "HomeScreen") {
						props.navigation.navigate("ModalScreen");
					} else {
						props.navigation.goBack();
					}
				}}
			></TouchableOpacity>
		</>
	);
};

const Home = (props) => {
	return (
		<>
			<View style={{ flex: 1, alignItems: "center" }}>
				<AddButton {...props} />
			</View>
		</>
	);
};

const Modal = (props) => {
	return (
		<>
			<View
				style={{
					flex: 1,
					alignItems: "center",
					backgroundColor: "pink",
				}}
			>
				<AddButton {...props} />
			</View>
		</>
	);
};

const opacityTransition = {
	// we will swipe right if we want to close the screen
	gestureDirection: "horizontal",
	transitionSpec: {
		open: {
			animation: "timing",
		},
		close: {
			animation: "timing",
			config: {
				duration: 300,
			},
		},
	},
	cardStyleInterpolator: ({ current }) => ({
		cardStyle: {
			opacity: current.progress,
		},
	}),
};

const Stack = createStackNavigator();
const AllScreen = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				...opacityTransition,
			}}
			mode="modal"
		>
			<Stack.Screen name="HomeScreen" component={Home} />
			<Stack.Screen
				name="ModalScreen"
				component={Modal}
				options={{
					gestureEnabled: false,
				}}
			/>
		</Stack.Navigator>
	);
};

const App = () => {
	return (
		<NavigationContainer>
			<AllScreen />
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 50,
		height: 50,
		borderRadius: 25,
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		zIndex: 1,
		elevation: 1,
		marginTop: 100,
	},

	text: {
		color: "white",
		fontSize: 24,
		fontWeight: "bold",
	},
});

export default App;
