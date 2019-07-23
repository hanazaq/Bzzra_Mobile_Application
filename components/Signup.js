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
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { Input } from 'react-native-elements';
export default class Signup extends React.Component {
	state = {
		email: "",
		password: "",
		gmails: []
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

	Signupbutton = () => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(
				this.state.email,
				this.state.password
			)
			.then(() => {
				alert("successfully created account	");
				this.props.navigation.navigate("Login");
			})
			.catch(error => {
				if (error.code == "auth/email already in use") {
					alert("email address");
				} else if (error.code == "auth/weak password") {
					alert("password is weak");
				} else {
					alert(error.message);
				}
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
				<Text>Confirm password</Text>
				<TextInput
					onChangeText={text => this.setState({ password: text })}
					value={this.state.password}
				/>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						this.Signupbutton();
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
