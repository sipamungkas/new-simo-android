import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';
import firebase from 'react-native-firebase';
import style from './styles';
import { ScrollView, Directions } from 'react-native-gesture-handler';

export default class Arus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      loading: true,
      today:new Date()
    };
  }

  componentDidMount(){
    let newData = [];
    timezone = new Date().getTimezoneOffset();
    const ref = firebase.database().ref("data/");
    ref.child("current").orderByChild("time").startAt("2019-01-19 00:00:00").endAt("2019-01-19 23:59:59").on("value", (snapshot)=>snapshot.forEach((doc)=>
    {
      newData.unshift(doc.val());
      this.setState({data:newData, loading:false});
    }));
    timezone = new Date().getTimezoneOffset();
    
    
    
  }
  render() {
    const {viewContainerMargin, isiCardContent} = style
    if(this.state.loading){
      return (
        <View style={viewContainerMargin}>
        <ActivityIndicator size="large"/>
        </View>
      );
    }
    return(
      <View style={viewContainerMargin}>
      <ScrollView
      contentContainerStyle={{flexDirection:"row",flexGrow:1}}
      >
      <FlatList
          scrollEnabled={false}
          data={this.state.data}
          renderItem={({item}) => 
          <Card>
            <Card.Content style={{flex:1}}>
                <Text style={{alignSelf: "flex-end"}}>{item.time}</Text>
                <Text style={{alignSelf: "flex-start"}}>{item.value}</Text>
                
            </Card.Content>
          </Card>
          }
          keyExtractor={(item,index)=>index.toString()}
        />
        </ScrollView>
        </View>
    );
    
  }
}
