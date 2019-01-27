import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';
import firebase from 'react-native-firebase';
import style from './styles';
import { ScrollView, Directions } from 'react-native-gesture-handler';

export default class Aktifitas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      loading: true,
      today:new Date(),
      key: "",
      keyReference:null,
      endPoint: 10
    };
  }

  firebaseFetch = () =>{
    let oldData = this.state.data;
    let referenceToOldestKey = this.state.keyReference;
    if (referenceToOldestKey==null) {
      const ref = firebase.database().ref("data/");
      ref.child("pir").orderByKey().limitToLast(15)
      .once("value").then((snapshot)=>{
        let arrayOfKeys = Object.keys(snapshot.val())
         .sort()
         .reverse();
      let results = arrayOfKeys
         .map((key) => snapshot.val()[key]);
      referenceToOldestKey = arrayOfKeys[arrayOfKeys.length-1];
      this.setState({data:results,keyReference:referenceToOldestKey,loading:false})
      }).catch((error)=>alert(error.code));  
    }else{
      const ref = firebase.database().ref("data/");
      ref.child("pir").orderByKey().endAt(referenceToOldestKey)
      .limitToLast(15)
      .once("value").then((snapshot)=>{
        let arrayOfKeys = Object.keys(snapshot.val())
         .sort()
         .reverse()
         .slice(1);
      let results = arrayOfKeys
         .map((key) => snapshot.val()[key]);
      
      referenceToOldestKey = arrayOfKeys[arrayOfKeys.length-1];
      this.setState({data:this.state.data.concat(results),keyReference:referenceToOldestKey,loading:false})
      }).catch((error)=>alert("Terjadi Kesalahan"));  
    }
    
  }

  
  componentDidMount(){  
    this.firebaseFetch()
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
      
      
      <FlatList
          
          data={this.state.data}
          onEndReachedThreshold={0.5}
          onEndReached={this.firebaseFetch}
          
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
        </View>
    );
    
  }
}
