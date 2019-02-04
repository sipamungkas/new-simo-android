import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Button } from 'react-native-paper';
import tes from '../Aktifitas/index';

 formatDate = (date) => {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

export default class DateRangePickerTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isDateTimePickerVisible: false,
        startDate: formatDate(new Date().toLocaleString()),
        endDate: formatDate(new Date().toLocaleString()),
        startDateTimePickerVisible:false,
        endDateTimePickerVisible:false,
    };
  }

    showStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: true });

    showEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: true });

    hideStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: false });

    hideEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: false });

    handleStartDatePicked = (date) => {
    this.setState({startDate:formatDate(date.toLocaleString())});
    this.hideStartDateTimePicker();
    };

    handleEndDatePicked = (date) => {
        if (this.state.startDate >= date.toLocaleString()) {
          this.setState({endDate:formatDate(date.toLocaleString())});
          this.hideEndDateTimePicker();  
        }
        alert("Tanggal Harus Lebih besar dari Tanggal Awal");
        this.hideEndDateTimePicker();  
    };
  render() {
    return (
      <View style={{flex: 1, flexDirection:"row", justifyContent:"center", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap",marginLeft:5,marginRight:5}}> 
        <TouchableOpacity onPress={this.showStartDateTimePicker}>
        <Text>Dari: {this.state.startDate} </Text>
        
        </TouchableOpacity>
        
        <TouchableOpacity onPress={this.showEndDateTimePicker}>
        <Text>Hingga: {this.state.endDate}</Text>
        </TouchableOpacity>

        <Button mode="contained" color="#900" onPress={()=>this.saringHandler}>Saring</Button>

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
    );
  }
}
