import React from "react";

import {
	CameraRoll,
	FlatList,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	TextInput,
	PermissionsAndroid
} from "react-native";
import { Permissions } from "expo";
import { constants } from "expo";
export default class roll extends React.Component {
	state = {
		uri: [],
		selectedindex: 0
	};

	onPress = () => {
		this.props.navigation.navigate("Home", { uri: item });
	};

	requestPermission = async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
				{
					title: "Cool Photo App Camera Permission",
					message:
						"Cool Photo App needs access to your camera " +
						"so you can take awesome pictures.",
					buttonNeutral: "Ask Me Later",
					buttonNegative: "Cancel",
					buttonPositive: "OK"
				}
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log("You can use the camera");
			} else {
				console.log("Camera permission denied");
			}
		} catch (err) {
			console.warn(err);
		}
	};
	componentDidMount() {
		Permissions.askAsync(Permissions.CAMERA_ROLL);
	}
	componentWillMount() {
		CameraRoll.getPhotos({
			assetType: "Photos",
			first: 10
		})
			.then(data => {
				console.log("done");

				this.setState({ uri: data.edges });
			})
			.catch(error => {
				console.log("error");
				console.log(error);
			});
	}

	render() {
		return (
			<FlatList
				data={this.state.uri}
				renderItem={({ item, index }) => {
					return (
						<TouchableOpacity
							onPress={() => {
								this.props.navigation.navigate("Feed", {
									uri: item.node.image.uri
								});
							}}
						>
							<Image
								source={{ uri: item.node.image.uri }}
								style={{ height: 59, width: 59 }}
							/>
						</TouchableOpacity>
					);
				}}
			></FlatList>
		);
	}
}
