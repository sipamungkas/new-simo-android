import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Button, Card} from 'react-native-paper';
import firebase from 'react-native-firebase';

formatDate = (date) => {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

export default class Aktifitas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      startDate: formatDate(new Date().toLocaleString()),
      endDate: formatDate(new Date().toLocaleString()),
      startDateTimePickerVisible:false,
      endDateTimePickerVisible:false,
      data:null,
      timeReference:null,
    };
  }
  
  // Funsgi Date Time Picker
    showStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: true });

    showEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: true });

    hideStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: false });

    hideEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: false });

    handleStartDatePicked = (date) => {
        this.setState({startDate:formatDate(date.toLocaleString())});
        this.hideStartDateTimePicker();
    };

    handleEndDatePicked = (date) => {
      if(formatDate(date.toLocaleString())>=this.state.startDate){
        this.setState({endDate:formatDate(date.toLocaleString())});
        this.hideEndDateTimePicker();  
      }else{
        alert("Tanggal Harus Lebih besar dari Tanggal Awal");
        this.hideEndDateTimePicker();  
      }        
    };

    saringHandler =()=>{
      const startDate = this.state.startDate + " 00:00:00";
      const endDate = this.state.endDate + " 23:59:59";
      this.setState({data:null,loading:true, timeReference:null});
      const ref = firebase.database().ref("data/");
      ref.child("pir").orderByChild("time").startAt(startDate).endAt(endDate)
      .once("value").then((snapshot)=>{
        let arrayOfKeys = Object.keys(snapshot.val())
         .sort()
         .reverse();
      let results = arrayOfKeys
         .map((key) => snapshot.val()[key]);
      referenceToOldestTime = snapshot.val()[arrayOfKeys[arrayOfKeys.length-1]].time;
      this.setState({data:results,timeReference:referenceToOldestTime,loading:false})
      }).catch((error)=>alert(error.code));
      
    }


  render() {
    return (
      <View style={{flex:1,flexDirection:"column"}}>
        <View style={{flex: 1, flexDirection:"row", justifyContent:"center", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap",marginLeft:5,marginRight:5}}> 
        <TouchableOpacity onPress={this.showStartDateTimePicker}>
        <Text>Dari: {this.state.startDate} </Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={this.showEndDateTimePicker}>
        <Text>Hingga: {this.state.endDate}</Text>
        </TouchableOpacity>

        <Button mode="contained" color="#900" onPress={this.saringHandler}>Tampilkan</Button>

        <DateTimePicker
        isVisible={this.state.startDateTimePickerVisible}
        onConfirm={this.handleStartDatePicked}
        onCancel={this.hideStartDateTimePicker}
        />
        <DateTimePicker
        isVisible={this.state.endDateTimePickerVisible}
        onConfirm={this.handleEndDatePicked}
        onCancel={this.hideEndDateTimePicker}
        />
    </View>
        <View style={{flex:9}}>
        {this.state.loading && <ActivityIndicator size="large"/>}
        {this.state.data &&  
        <FlatList
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
        />}
        </View>
        
      </View>
    );
  }
}
