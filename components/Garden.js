import React, { Component } from "react";
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
import { Ionicons } from "@expo/vector-icons";

export default class Garden extends React.Component {
  state = { list: [] };
  handlePress = item => {
    this.props.navigation.navigate("Plant", item);
  };
  readPosts = () => {
    firebase
      .database()
      .ref("Garden")
      .on("value", snapshot => {
        const posts = snapshot.val();
        var show = [];
        var list = [];
        for (var key in posts) {
          // show.push(posts[key])
          show.push({
            image: posts[key].image,
            name: posts[key].name,
            age: posts[key].age,
            pot: posts[key].pot,
            number: Number(posts[key].number),
            advice: posts[key].advice
          });
          console.log(posts[key].advice);
        }
        // captions.push(posts[key].name);
        for (s = 0; s < show.length; s++) {
          var found = false;
          for (var m = 0; m < list.length; m++) {
            if (show[s].name == list[m].name) {
              list[m].number += show[s].number;
              found = true;
            }
          }
          if (!found) {
            list.push(show[s]);
          }
        }
        this.setState({ list: list });
        console.log(list);
      });
  };
  componentWillMount() {
    this.readPosts();
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.list}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.border}
                onPress={() => {
                  this.handlePress(item);
                }}
              >
                <View style={styles.container}>
                  <Image
                    style={{ width: 80, height: 80 }}
                    source={{
                      uri: item.image
                    }}
                  />
                  <View style={styles.t}>
                    <Text>{item.name}</Text>
                    <Text style={styles.c}>{item.age} old</Text>
                    <Text style={styles.c}>pot redius: {item.pot}</Text>
                    <Text style={styles.c}>plants number: {item.number}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    flexDirection: "row",
    padding: 10
  },
  border: {
    borderWidth: 2,
    borderColor: "#b2bec3",
    borderRadius: 10
  },
  t: {
    paddingLeft: 10
  },
  c: {
    color: "#b2bec3"
  },
  table: {
    flex: 1
  }
});
