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


export default class Feed extends React.Component {
  handlePress = item => {
    this.props.navigation.navigate("Detail", item);
  };

  render() {
    return (
      //<ScrollView cotentContainerStyle ={styles.container}>

      <View style={styles.container}>
        <FlatList
          keyExtractor={(item, index) => item.name}
          data={dogs}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => this.handlePress(item)}
            >
              <Image source={item.image} style={styles.image} />
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  }
});
const dogs = [
  {
    name: "sia",
    image: require("../assets/download.jpeg")
  }
];
