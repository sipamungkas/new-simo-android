import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import style from './styles';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    const {viewContainerMargin, isiCardContent} = style
    return (
      <View style={viewContainerMargin}>
      <ScrollView>
          <Card style={{marginVertical: 10}}>
              <Card.Content>
                  <Title><Icon name="temperature-low" size={20} color="#900" /> Suhu ruangan</Title>
                  <Text style={{alignSelf:'flex-end'}}>23-12-2018</Text><Text style={{alignSelf:'flex-start'}}>30 derajat celcius</Text>
              </Card.Content>
          </Card>
          <Card style={{marginVertical: 10}}>
              <Card.Content>
                  <Title> <Icon name="fire" size={20} color="#900" /> Asap</Title>
                  <Text style={{alignSelf:'flex-end'}}>23-12-2018</Text><Text style={{alignSelf:'flex-start'}}>30 derajat celcius</Text>
              </Card.Content>
          </Card>
          <Card style={{marginVertical: 10}}>
              <Card.Content>
                  <Title> <Icon name="lightbulb" size={20} color="#900" /> Cahaya</Title>
                  <Text style={{alignSelf:'flex-end'}}>23-12-2018</Text><Text style={{alignSelf:'flex-start'}}>30 derajat celcius</Text>
              </Card.Content>
          </Card>
          <Card style={{marginVertical: 10}}>
              <Card.Content>
                  <Title> <Icon name="running" size={20} color="#900" /> Aktifitas</Title>
                  <Text style={{alignSelf:'flex-end'}}>23-12-2018</Text><Text style={{alignSelf:'flex-start'}}>30 derajat celcius</Text>
              </Card.Content>
          </Card>
          <Card style={{marginVertical: 10}}>
              <Card.Content>
                  <Title> <Icon name="bolt" size={20} color="#900" /> Arus</Title>
                  <Text style={{alignSelf:'flex-end'}}>23-12-2018</Text><Text style={{alignSelf:'flex-start'}}>30 derajat celcius</Text>
              </Card.Content>
          </Card>
        </ScrollView>
      </View>
    );
  }
}
