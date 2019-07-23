import React from "react";
import {
	createAppContainer,
	createBottomTabNavigator,
	createStackNavigator,
	createSwitchNavigator
} from "react-navigation";
import Profile from "./components/Profile.js";
import Feed from "./components/Feed.js";
import Detail from "./components/Detail.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import Home from "./components/Home.js";
import roll from "./components/roll.js";
import uploading from "./components/uploading.js";
import * as firebase from "firebase";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

var firebaseConfig = {
	apiKey: "AIzaSyCK0K3XCYU8iQ6zvijNntb5JzNU1MJWktU",
	authDomain: "bzzra-58867.firebaseapp.com",
	databaseURL: "https://bzzra-58867.firebaseio.com",
	projectId: "bzzra-58867",
	storageBucket: "bzzra-58867.appspot.com",
	messagingSenderId: "369949751308",
	appId: "1:369949751308:web:cea642ba4af644f4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const stackNavigator = createStackNavigator({
	Feed: Feed,
	Detail: Detail
});
const tabs = createBottomTabNavigator({
	Profile: Profile,
	Home: stackNavigator
});
const all = createSwitchNavigator({
	// roll: roll,
	Main: tabs,
	Home: Home,
	Signup: Signup,
	Login: Login
});
1;
const App = createAppContainer(all);

async function registerForPushNotificationsAsync() {
	const { status: existingStatus } = await Permissions.getAsync(
		Permissions.NOTIFICATIONS
	);
	let finalStatus = existingStatus;

	// only ask if permissions have not already been determined, because
	// iOS won't necessarily prompt the user a second time.
	if (existingStatus !== "granted") {
		// Android remote notification permissions are granted during the app
		// install, so this will only ask on iOS
		const { status } = await Permissions.askAsync(
			Permissions.NOTIFICATIONS
		);
		finalStatus = status;
	}

	// Stop here if the user did not grant permissions
	if (finalStatus !== "granted") {
		return;
	}

	// Get the token that uniquely identifies this device
	let token = await Notifications.getExpoPushTokenAsync();

	console.log(token);
}

registerForPushNotificationsAsync();

export default App;
