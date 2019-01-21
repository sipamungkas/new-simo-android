import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from 'react-native-firebase';
import style from './styles';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        current:"",
        ldr:"",
        pir:"",
        smoke:"",
        temperature:"",
    };
  }
  
  componentDidMount(){
    
    const ref = firebase.database().ref("data/");
    ref.child('current').limitToLast(1).on("child_added",(snapshot)=>this.setState({current:snapshot.toJSON()}));
    ref.child('ldr').limitToLast(1).on("child_added",(snapshot)=>this.setState({ldr:snapshot.toJSON()}));
    ref.child('pir').limitToLast(1).on("child_added",(snapshot)=>this.setState({pir:snapshot.toJSON()}));
    ref.child('smoke').limitToLast(1).on("child_added",(snapshot)=>this.setState({smoke:snapshot.toJSON()}));
    ref.child('temperature').limitToLast(1).on("child_added",(snapshot)=>this.setState({temperature:snapshot.toJSON()}));
    
    
    
  }

  render() {
    const {viewContainerMargin} = style
    return (
      <View style={viewContainerMargin}>
      <ScrollView>
          <Card style={{marginVertical: 3}}>
              <Card.Content>
                  <Title><Icon name="temperature-low" size={20} color="#900" /> Suhu Ruangan</Title>
                  <Text style={{alignSelf:'flex-end'}}>{this.state.temperature.time}</Text><Text style={{alignSelf:'flex-start'}}>{this.state.temperature.value}</Text>
              </Card.Content>
          </Card>
          <Card style={{marginVertical: 3}}>
              <Card.Content>
                  <Title> <Icon name="fire" size={20} color="#900" /> Asap</Title>
                  <Text style={{alignSelf:'flex-end'}}>{this.state.smoke.time}</Text><Text style={{alignSelf:'flex-start'}}>{this.state.smoke.value}</Text>
              </Card.Content>
          </Card>
          <Card style={{marginVertical: 3}}>
              <Card.Content>
                  <Title> <Icon name="lightbulb" size={20} color="#900" /> Cahaya</Title>
                  <Text style={{alignSelf:'flex-end'}}>{this.state.ldr.time}</Text><Text style={{alignSelf:'flex-start'}}>{this.state.ldr.value}</Text>
              </Card.Content>
          </Card>
          <Card style={{marginVertical: 3}}>
              <Card.Content>
                  <Title> <Icon name="running" size={20} color="#900" /> Aktifitas</Title>
                  <Text style={{alignSelf:'flex-end'}}>{this.state.pir.time}</Text><Text style={{alignSelf:'flex-start'}}>{this.state.pir.value}</Text>
              </Card.Content>
          </Card>
          <Card style={{marginVertical: 3}}>
              <Card.Content>
                  <Title> <Icon name="bolt" size={20} color="#900" /> Arus</Title>
                  <Text style={{alignSelf:'flex-end'}}>{this.state.current.time}</Text><Text style={{alignSelf:'flex-start'}}>{this.state.current.value}</Text>
              </Card.Content>
          </Card>
        </ScrollView>
      </View>
    );
  }
}
