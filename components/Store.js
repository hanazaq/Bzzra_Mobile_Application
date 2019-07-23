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
import Carousel from "react-native-snap-carousel";
export default class Store extends React.Component {
  state = {
    modalVisible: false,
    list: []
  };
  handlePress = item => {
    this.props.navigation.navigate("Buy", item);
  };
  readPosts = () => {
    firebase
      .database()
      .ref("plants")
      .on("value", snapshot => {
        const posts = snapshot.val();
        var captions = [];
        for (var key in posts) {
          captions.push({
            image: posts[key].image,
            price: posts[key].price,
            name: posts[key].name,
            age: posts[key].age,
            pot: posts[key].pot,
            advice: posts[key].advice
          });
          // captions.push(posts[key].name);
        }
        this.setState({ list: captions });
      });
  };
  _renderItem = ({ item, index }) => {
    return (
      <View>
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
        <TouchableOpacity
          onPress={() => {
            this.handlePress(item);
          }}
        >
          <Text>BUY</Text>
        </TouchableOpacity>
      </View>
    );
  };

  componentWillMount() {
    this.readPosts();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Store Page</Text>

        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={this.state.list}
          renderItem={this._renderItem}
          sliderWidth={300}
          itemWidth={300}
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
    marginTop: 60
  },
  button: {
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white"
  }
});
