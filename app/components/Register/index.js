import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import {Button, Snackbar, TouchableRipple} from 'react-native-paper';
import firebase from "react-native-firebase";
import {withNavigation} from "react-navigation";
import style from './styles';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
        nama:null,
        email: null,
        password: null,
        password2: null,
        snack: false,
        loading: false,
        btn: "Daftar",
        textSnack: null
    };
  }

    registerHandler = () => {
      this.setState({loading:true,btn:"loading"});
      if (this.state.nama != null && this.state.email !=null &&this.state.password != null && this.state.password2 != null ) {
        firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then((userProfile)=>userProfile.user.updateProfile({displayName:this.state.nama}))
        .then(()=>this.setState({loading:false}))
        .then(()=>this.props.navigation.navigate("Dashboard"))
        .catch((error)=>this.setState({textSnack:error.code, loading:false,btn:"Daftar",snack:true}))
      } else {
        this.setState({textSnack:"Silakan isi semua from !",snack:true,loading:false,btn:"Daftar"})
      }
        
    }
  render() {
    const {input,viewContainerMargin,heading} = style
    
  return (
      <View style={viewContainerMargin}>
    
    
      <Text style={heading}> Registrasi Akun Simo  </Text>
      
      
      <TextInput underlineColorAndroid="gray" placeholder="Nama" onChangeText={ (text) => this.setState({nama:text})}/>
      <TextInput underlineColorAndroid="gray" placeholder="Email" onChangeText={ (text) => this.setState({email:text})}/>
      
      <TextInput secureTextEntry underlineColorAndroid="gray" placeholder='password' onChangeText={ (text) => this.setState({password:text})} />
      <TextInput secureTextEntry underlineColorAndroid="gray" placeholder='re-enter password' onChangeText={ (text) => this.setState({password2:text})} />
      
      {this.state.password2 != this.state.password && <Text style={{color:'red'}}>password Tidak Cocok</Text>}
      <Button color="#900" mode="contained" loading={this.state.loading} disabled={this.state.loading} onPress={this.registerHandler} >{this.state.btn}</Button>
      <TouchableRipple onPress={()=>this.props.navigation.navigate("Login")} style={{alignItems:'flex-end',paddingTop:20}}>
      <Text style={{fontSize:15, fontWeight:"bold"}}>Sudah Memiliki Akun? Login Disini</Text>
      </TouchableRipple>
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
