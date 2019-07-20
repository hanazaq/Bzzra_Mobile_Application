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

import * as firebase from "firebase";

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
	Home: Home,
	Signup: Signup,
	Login: Login,
	Main: tabs
});
1;
const App = createAppContainer(all);

export default App;
