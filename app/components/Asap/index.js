import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Card } from 'react-native-paper'
import style from './styles';

export default class Asap extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {viewContainerMargin, isiCardContent} = style
    return (
      <View style={viewContainerMargin}>
         <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => 
          <Card>
            <Card.Content style={{flex:1}}>
                <Text style={{alignSelf: "flex-end"}}>Tanggal</Text>
                <Text style={{alignSelf: "flex-start"}}>{item.key}</Text>
                
            </Card.Content>
          </Card>}
        />
      </View>
    );
  }
}
