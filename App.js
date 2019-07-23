import React from "react";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import BzzraStore from "./components/Store";
import BzzraGarden from "./components/Garden";
import BzzraPlant from "./components/Plant";
import Buy from "./components/Buy";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import Home from "./components/Home.js";
import water from "./components/water.js";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBCYL03xRyWzgEVcy6tCEpunV1jbw_4e8Y",
  authDomain: "bzzra-b1c9e.firebaseapp.com",
  databaseURL: "https://bzzra-b1c9e.firebaseio.com",
  projectId: "bzzra-b1c9e",
  storageBucket: "bzzra-b1c9e.appspot.com",
  messagingSenderId: "856621016536",
  appId: "1:856621016536:web:c687c8231a6b913f"
};

const stackNavigator = createStackNavigator({
  Garden: BzzraGarden,
  Plant: BzzraPlant
});

const stackStore = createStackNavigator({
  Store: BzzraStore,
  Buy: Buy
});

const tabs = createBottomTabNavigator({
  BzzraStore: {
    screen: stackStore,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-cart" color={tintColor} size={24} />
      )
    })
  },

  MyGarden: {
    screen: stackNavigator,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-leaf" color={tintColor} size={24} />
      )
    })
  },
  Watering: {
    screen: water,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-color-fill" color={tintColor} size={24} />
      )
    })
  }
});
if (firebase.apps.length < 1) {
  firebase.initializeApp(firebaseConfig);
}
const all = createSwitchNavigator({
  // Home: Home,
  //Signup: Signup,
  // Login: Login,
  Main: tabs
});
1;
const App = createAppContainer(all);
export default App;
