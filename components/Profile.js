import React from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	Modal,
	TextInput,
	FlatList
} from "react-native";

import * as firebase from "firebase";
export default class Profile extends React.Component {
	state = {
		color: "blue",
		name: "sia",
		displayText: "sia",
		backgroundColor: "blue",
		modalVisible: false,
		captions: []
	};
	upload = () => {
		const cool = firebase.database().ref("post");
		cool.push({
			name: this.state.name
		});
	};

	readPosts = () => {
		firebase
			.database()
			.ref("post")
			.on("value", snapshot => {
				const posts = snapshot.val();
				var captions = [];
				for (var key in posts) {
					const caption = posts[key].name;
					captions.push(caption);
				}
				this.setState({ captions: captions });
			});
	};
	componentWillMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (!user) {
				this.props.navigation.navigate("Login");
			}
		});
		this.readPosts();
	}

	handeled = () => {
		if (this.state.displayText === "hello") {
			this.setState({ displayText: "Bye" });
		} else {
			this.setState({ displayText: "Hello" });
		}
	};
	color = () => {
		if (this.state.backgroundColor == "pink") {
			this.setState({ backgroundColor: "purple" });
		} else {
			this.setState({ backgroundColor: "pink" });
		}
	};
	handelEditpress = () => {
		this.setState({ modalVisible: true });
	};
	handelDone = () => {
		this.setState({ modalVisible: false });
	};
	render() {
		return (
			<View
				style={styles.container}
				backgroundColor={this.state.backgroundColor}
			>
				<FlatList
					keyExtractor={(item, index) => item}
					data={this.state.captions}
					renderItem={({ item, index }) => (
						<View style={styles.container}>
							<Text style={styles.paragraph}>{item}</Text>
						</View>
					)}
				/>

				<TouchableOpacity style={styles.button} onPress={this.upload}>
					<Text>Save</Text>
				</TouchableOpacity>
				<Modal animationType="slide" visible={this.state.modalVisible}>
					<View style={styles.container} backgroundColor="red">
						<TouchableOpacity
							style={styles.button}
							onPress={() => {
								this.upload();
								this.handelDone();
							}}
						>
							<Text> Done !</Text>
						</TouchableOpacity>
						<TextInput
							multiline={false}
							style={{
								fontSize: 18,
								color: "white",
								backgroundColor: "grey"
							}}
							placeholder="enter ur name"
							value={this.state.name}
							onChangeText={text => {
								this.setState({ name: text });
							}}
						/>
					</View>
				</Modal>

				<TouchableOpacity onPress={() => this.handeled()}>
					<Text> Press Me! </Text>
				</TouchableOpacity>
				<Text>{this.state.name}</Text>

				<Image
					style={styles.img1}
					source={require("../components/dog.jpeg")}
				/>

				<TouchableOpacity
					style={styles.button}
					onPress={() => alert("You clicked!")}
				>
					<Text> Click Me!</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => {
						this.color();
					}}
				>
					<Text> Press me to change color !</Text>
				</TouchableOpacity>

				<Text style={{ color: this.state.color }}></Text>

				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						this.handelEditpress();
					}}
				>
					<Text> Edit profile !</Text>
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
	},

	img1: {
		width: 100,
		height: 100
	},
	button: {
		alignItems: "center",
		backgroundColor: "#DDDDDD",
		padding: 10,
		borderColor: "black",
		borderWidth: 2
	}
});
