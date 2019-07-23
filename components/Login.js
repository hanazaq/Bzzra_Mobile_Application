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

export default class Login extends React.Component {
	state = {
		email: "",
		password: "",
		gmails: []
	};
	toAPP = () => {
		this.props.navigation.navigate("Store");
	};
	readPosts = () => {
		firebase
			.database()
			.ref("post")
			.on("value", snapshot => {
				const posts = snapshot.val();
				var gmails = [];
				for (var key in posts) {
					const gmail = posts[key].email;
					gmails.push(gmail);
				}
				this.setState({ gmails: gmails });
			});
	};

	logbutton = () => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(
				this.state.email,
				this.state.password
			)
			.then(() => {
				alert("successfully logged in	");
				this.toAPP();
			})
			.catch(error => {
				alert(error.message);
			});
	};

	render() {
		return (
			<View style={styles.container}>
				<Text>Email</Text>
				<TextInput
					onChangeText={text => this.setState({ email: text })}
					value={this.state.email}
				/>
				<Text>password </Text>
				<TextInput
					onChangeText={text => this.setState({ password: text })}
					value={this.state.password}
				/>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						this.logbutton();
					}}
				>
					<Text>save</Text>
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
