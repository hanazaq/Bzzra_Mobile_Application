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

export default class Plant extends React.Component {
  state = {};

  render() {
    const item = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 80, height: 80 }}
          source={{
            uri: item.image
          }}
        />
        <Text>{item.name}</Text>
        <Text style={styles.c}>{item.age} old</Text>
        <Text style={styles.c}>pot redius: {item.pot}</Text>
        <Text style={styles.c}>plants number: {item.number}</Text>
        <Text>ADVICE</Text>
        <Text>{item.advice}</Text>
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

