import React from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	ScrollView,
	TouchableOpacity,
	Modal,
	TextInput,
	FlatList
} from "react-native";
import * as firebase from "firebase";

export default class Home extends React.Component {
	gosign = () => {
		this.props.navigation.navigate("Signup");
	};
	golog = () => {
		this.props.navigation.navigate("Login");
	};

	render() {
		return (
			<View style={styles.container}>
				<Image source={require("../assets/plant1.jpg")} />
				<Text>Welcome to Bzzra </Text>
				<Text>For a better planting experience </Text>
				<TouchableOpacity style={styles.button} onPress={this.gosign}>
					<Text>Sign up</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={this.golog}>
					<Text>Log in</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: 'pink',
		alignItems: "center",
		justifyContent: "center"
	}
});
