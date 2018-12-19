import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import {Button, Snackbar} from 'react-native-paper';
import style from './styles';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: null,
        password: null,
        password2: null,
        snack: false,
        loading: false,
        btn: "Daftar"
    };
  }

    pwdCheck = () => {
        
    }
  render() {
    const {input,viewContainerMargin,heading} = style
    
  return (
      <View style={viewContainerMargin}>
    
    
      <Text style={heading}> Login ke Simo  </Text>
      
      
      <TextInput underlineColorAndroid="gray" placeholder="Email" onChangeText={ (text) => this.setState({email:text})}/>
      
      <TextInput secureTextEntry underlineColorAndroid="gray" placeholder='password' onChangeText={ (text) => this.setState({password:text})} />
      <TextInput secureTextEntry underlineColorAndroid="gray" placeholder='re-enter password' onChangeText={ (text) => this.setState({password2:text})} />
      {this.state.password2 != this.state.password && <Text style={{color:'red'}}>password Tidak Cocok</Text>}
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
