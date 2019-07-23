/* -----------------------------------------------------
// First do "expo install expo-image-picker" in Terminal
// Then  do "expo install expo-permissions"  in Terminal
// Also, user must be signed in before uploading photos
-------------------------------------------------------*/

import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import uuid from "uuid";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default class UploadExample extends React.Component {
  state = {
    localURI: ""
  };

  selectImageFromCameraRoll = async () => {
    var result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ localURI: result.uri });
    }
  };

  takeImageWithCamera = async () => {
    var result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ localURI: result.uri });
    }
  };

  publish = () => {
    const imageUri = this.state.localURI;
    this.uploadImage(imageUri)
      .then(downloadURL => {
        alert("Image uploaded!");
        console.log(downloadURL);
        // Do something with downloadURL...
      })
      .catch(error => {
        alert("Uploading image failed");
      });
  };

  uploadImage = uri => {
    const imagesRef = firebase
      .storage()
      .ref()
      .child("images")
      .child(uuid.v4());
    const downloadURLPromise = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        const blob = xhr.response;
        var uploadTask = imagesRef.put(blob);
        uploadTask.then(snapshot => {
          snapshot.ref.getDownloadURL().then(function(downloadURL) {
            resolve(downloadURL);
          });
        });
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    return downloadURLPromise;
  };

  getPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );
    var finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(
        Permissions.CAMERA_ROLL,
        Permissions.CAMERA
      );
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Sorry, we need camera roll permissions to select photos!");
    }
  };

  componentDidMount() {
    if (!firebase.auth().currentUser) {
      // Navigate to your login screen
      this.props.navigation.navigate("Login");
    }
    this.getPermissions();
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.selectImageFromCameraRoll}>
          <Text>Select Image</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.takeImageWithCamera}>
          <Text>Take New Image</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.publish}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
