import React, { Component } from 'react';
import {StyleSheet, View, Text, ActivityIndicator, TextInput } from 'react-native';
import {Button,Divider, Snackbar, ToastAndroid, ProgressBar} from 'react-native-paper';
import style from "./styles";
import firebase from "react-native-firebase";



export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,
      
      loading: false,
      errorMessage: null,
      btn : "Masuk",
      snack: false,
      textSnack:null,
    };
  }
  componentDidMount(){
      setTimeout(
          () => {
            if(firebase.auth().currentUser!=null){
                this.props.navigation.navigate("Dashboard")
            }else{
                this.props.navigation.navigate("Login")
            }
          },2000
      )
  }
  
  render() {
        const {viewContainerMargin,heading} = style
        
    return (
        <View style={viewContainerMargin}>
        <Text style={heading}> SIMO  </Text>
        <ActivityIndicator size="large" color="#900"/>
      </View>
    );
  }
}
