import React, { Component } from 'react';
import { View, TextInput, Text } from 'react-native';
import {Button, Card, Dialog, Title,Portal, Paragraph, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import style from './styles';
import firebase from 'react-native-firebase';
import {withNavigation} from 'react-navigation';

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dialog: false,
    };
  }

  _showDialog = () => {this.setState({dialog:true})}
  _hideDialog = () => {this.setState({dialog:false})}
  logoutHandler = () => {
    firebase.auth().signOut()
    .then(this.props.navigation.navigate("Login"))
  }
  render() {
      const {viewContainerMargin} = style
      const user = firebase.auth().currentUser
    return (
        
      <View style={viewContainerMargin}>  
        <Card >
            <Card.Content>
                <Text>Nama</Text>
                <TextInput value={user.displayName} underlineColorAndroid="gray"/>
                <Text>Email</Text>
                <TextInput value={user.email} underlineColorAndroid="gray"/>
                {/* <Button mode='contained' icon='exit-to-app' color='#900'>Update</Button> */}
            </Card.Content>
        </Card>
        <Divider/>
        <Card >
            <Card.Content>
            <Button mode='contained' icon='exit-to-app' color='#900' onPress={this._showDialog}>Logout</Button>        
            </Card.Content>
        </Card>  
        
        <Portal>
          <Dialog
             visible={this.state.dialog}
             onDismiss={this._hideDialog}>
            <Dialog.Title>Keluar dari Simo</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Apakah anda yakin untuk logout?</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button mode="outlined" onPress={this._hideDialog} color="blue">Batal</Button>
              
              <Button style={{marginLeft:10}} mode="outlined" onPress={this.logoutHandler} color="red">Keluar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        
      </View>
    );
  }
}
