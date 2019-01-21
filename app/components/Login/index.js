import React, { Component } from 'react';
import {StyleSheet, View, Text, ActivityIndicator, TextInput } from 'react-native';
import {Button, Snackbar, ToastAndroid} from 'react-native-paper';
import style from "./styles";
import firebase from "react-native-firebase";



export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,
      email: "",
      password: "",
      loading: false,
      errorMessage: null,
      btn : "Masuk",
      snack: false,
      textSnack:null,
    };
  }
  
  loginHandler = () => {
    this.setState({loading:true, btn: "Loading"});
    if (this.state.email != "" && this.state.password != "") {
      setTimeout(() => {
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .then(()=>this.setState({loading:false, btn:"Masuk", snack:true, textSnack:"Anda Berhasil Masuk", loading:false}))
        .then(()=>this.props.navigation.navigate("Dashboard"))
        .catch((error)=>this.setState({errorMessage:error.code, btn:"Masuk",snack:true, textSnack:error.code, loading:false }))
        
      }, 2000);  
    } else {
      this.setState({textSnack:"Username atau Password Tidak Boleh Kosong", loading:false,snack:true, btn:"Masuk"})
    }
    
    
  }
  render() {
      const {input,viewContainerMargin,heading} = style
    return (
        <View style={viewContainerMargin}>
      
      
        <Text style={heading}> Login ke Simo  </Text>
        <TextInput underlineColorAndroid="gray" placeholder="Email" onChangeText={ (text) => this.setState({email:text})}/>
        <TextInput secureTextEntry underlineColorAndroid="gray" placeholder='password' onChangeText={ (text) => this.setState({password:text})} />
        <Button color="#900" mode="contained" loading={this.state.loading} disabled={this.state.loading} onPress={this.loginHandler} >{this.state.btn}</Button>
        <Text style={{textAlign:'center', padding:10}}>Atau</Text>
        <Button color="#900" mode="contained" disabled={this.state.loading} onPress={()=>this.props.navigation.navigate("Register")} >Daftar</Button>
        <Snackbar
          visible={this.state.snack}
          onDismiss={() => this.setState({ snack: false })}
        >
          {this.state.textSnack}
        </Snackbar>
      
        
      </View>
    );
  }
}
