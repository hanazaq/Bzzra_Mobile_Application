import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
  Modal,
  View,
  TextInput,
  FlatList
} from "react-native";
import * as firebase from "firebase";

export default class Buy extends React.Component {
  state = {
    phone: "",
    plantnum: "",
    order: ""
  };
  upload = (name, img, age, pot, advice) => {
    const Buy = firebase.database().ref("Buy");
    const Garden = firebase.database().ref("Garden");
    Buy.push({
      phone: this.state.phone,
      plantnum: this.state.plantnum,
      order: name
    });
    Garden.push({
      image: img,
      name: name,
      age: age,
      pot: pot,
      number: this.state.plantnum,
      advice: advice
    });
  };

  render() {
    const item = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <Image
          style={{ width: 150, height: 150 }}
          source={{
            uri: item.image
          }}
        />
        <Text style={styles.paragraph}>name:{item.name}</Text>
        <Text>Age:{item.age}</Text>
        <Text>diameter of pot:{item.pot}</Text>
        <Text>price:{item.price}</Text>
        <Text>Cash on delivary</Text>
        <Text>Enter your Phone number</Text>
        <TextInput
          multiline={false}
          keyboardType={"numeric"}
          style={{
            fontSize: 20,
            margin: 20,
            color: "green",
            backgroundColor: "orange"
          }}
          placeholder="Phone number"
          onChangeText={num => {
            Color: "";
            this.setState({ phone: num });
          }}
        />
        <Text>Plants number:</Text>
        <TextInput
          multiline={false}
          keyboardType={"numeric"}
          style={{
            fontSize: 20,
            margin: 20,
            color: "green",
            backgroundColor: "orange"
          }}
          placeholder="number of plants"
          onChangeText={pnum => {
            this.setState({ plantnum: pnum });
          }}
        />
        <TouchableOpacity
          onPress={() => {
            this.upload(item.name, item.image, item.age, item.pot, item.advice);

            this.props.navigation.navigate("Store");
            this.props.navigation.navigate("Garden", item);
          }}
        >
          <Text>Let us buy it now</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60
  }
});
