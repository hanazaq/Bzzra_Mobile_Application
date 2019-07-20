import React from 'react';
import { StyleSheet, Text, View,Image , ScrollView , TouchableOpacity , Modal , TextInput , FlatList} from 'react-native';

export default class Detail extends React.Component {


  

 

 render() {
  const item=this.props.navigation.state.params;
  return (
  	<View>
  	<Text>{item.name}</Text>
  	<Image source={item.image}/>
  	 </View>
  	) }};
