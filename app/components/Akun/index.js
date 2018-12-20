import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {Button, Card, Dialog, Title, Paragraph} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import style from './styles';

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dialog: false,
    };
  }

  _showDialog = () => {this.setState({dialog:true})}
  _hideDialog = () => {this.setState({dialog:true})}
  render() {
      const {viewContainerMargin} = style
    return (
        
      <View style={viewContainerMargin}>  
        <Card >
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Content>
                <Title>Email : </Title>
            </Card.Content>
        </Card>
        <Button mode='contained' icon='exit-to-app' color='blue' onPress={()=> console.warn('Log Out')}>Logout</Button>
        
        
      </View>
    );
  }
}
