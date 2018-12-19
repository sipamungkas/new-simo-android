import React, { Component } from 'react';
import {StyleSheet, View, Text, ActivityIndicator, TextInput } from 'react-native';
import {Button, Snackbar} from 'react-native-paper';
import style from "./styles"


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      loading: false,
      btn : "Masuk",
      snack: false,
    };
  }
  loginHandler = () => {
    this.setState({loading:true, btn: "Loading"});
    setTimeout(() => {
      this.setState({loading:false, btn:"Masuk", snack:true})
    }, 2000);
    
    
  }
  render() {
      const {input,viewContainerMargin,heading} = style
    return (
        <View style={viewContainerMargin}>
      
      
        <Text style={heading}> Login ke Simo  </Text>
        
        
        <TextInput underlineColorAndroid="gray" placeholder="Email" onChangeText={ (text) => this.setState({email:text})}/>
        
        <TextInput secureTextEntry underlineColorAndroid="gray" placeholder='password' onChangeText={ (text) => this.setState({password:text})} />
        <Button color="blue" mode="contained" loading={this.state.loading} disabled={this.state.loading} onPress={this.loginHandler} >{this.state.btn}</Button>
        <Text style={{textAlign:'center', padding:10}}>Atau</Text>
        <Button color="blue" mode="contained" disabled={this.state.loading} onPress={() => console.warn('Daftar')} >Daftar</Button>
        <Snackbar
          visible={this.state.snack}
          onDismiss={() => this.setState({ snack: false })}
        >
          Anda Berhasil Masuk
        </Snackbar>
      
        
      </View>
    );
  }
}
