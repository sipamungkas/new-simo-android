import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

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
        endDate: formatDate(new Date().toLocaleDateString()),
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
        this.setState({endDate:formatDate(date.toLocaleString())});
    this.hideEndDateTimePicker();
    };
  render() {
    return (
      <View style={{flex: 1,flexDirection:"row"}}>
        
        <TouchableOpacity onPress={this.showStartDateTimePicker}>
          <Text>Dari: {this.state.startDate} </Text>
          {console.warn(this.state.startDate)}
        </TouchableOpacity>
        
        <TouchableOpacity onPress={this.showEndDateTimePicker}>
          <Text>Hingga: {this.state.endDate}</Text>
        </TouchableOpacity>

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
