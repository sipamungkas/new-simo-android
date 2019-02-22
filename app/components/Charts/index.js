import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Button, Card } from 'react-native-paper';
import firebase from 'react-native-firebase';
import { LineChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';

formatDate = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}
Array.prototype.chunk = function (n) {
  if (!this.length) {
    return [];
  }
  return [this.slice(0, n)].concat(this.slice(n).chunk(n));
};

export default class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      startDate: formatDate(new Date().toLocaleString()),
      endDate: formatDate(new Date().toLocaleString()),
      startDateTimePickerVisible: false,
      endDateTimePickerVisible: false,
      data: null,
      labelData: null,
      labelTime: null,
      timeReference: null,
    };
  }

  // Funsgi Date Time Picker
  showStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: true });

  showEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: true });

  hideStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: false });

  hideEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: false });

  handleStartDatePicked = (date) => {
    this.setState({ startDate: formatDate(date.toLocaleString()) });
    this.hideStartDateTimePicker();
  };

  handleEndDatePicked = (date) => {
    if (formatDate(date.toLocaleString()) >= this.state.startDate) {
      this.setState({ endDate: formatDate(date.toLocaleString()) });
      this.hideEndDateTimePicker();
    } else {
      alert("Tanggal Harus Lebih besar dari Tanggal Awal");
      this.hideEndDateTimePicker();
    }
  };

  saringHandler = () => {
    const startDate = this.state.startDate + " 00:00:00";
    const endDate = this.state.endDate + " 23:59:59";
    this.setState({ data: null, loading: true, timeReference: null });
    const ref = firebase.database().ref("data/");
    ref.child("temperature").orderByChild("time").startAt(startDate).endAt(endDate)
      .once("value").then((snapshot) => {
        let arrayOfKeys = Object.keys(snapshot.val())
          .sort()
        let results = arrayOfKeys
          .map((key) => snapshot.val()[key]);
        let time = arrayOfKeys
          .map((key) => snapshot.val()[key].time.slice(11, 16));
        let valueSuhu = arrayOfKeys
          .map((key) => snapshot.val()[key].value);
        console.warn(time);
        let timeChunked = time.chunk(6);
        let valueChunked = valueSuhu.chunk(6);
        let labelTime = [];
        let labelSuhu = [];
        timeChunked.forEach(val => {
          labelTime.push(val[val.length - 1])
        });
        valueChunked.forEach(val => {
          labelSuhu.push(val[val.length - 1])
        });
        console.warn(labelTime.length, labelSuhu.length);
        this.setState({ data: results, labelTime: labelTime, labelData: labelSuhu, loading: false })
      }).catch((error) => alert(error));

  }


  render() {
    const data = {
      labels: this.state.labelTime,
      datasets: [{
        data: this.state.labelData,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }]
    }
    const screenWidth = Dimensions.get('window').width
    const chartConfig = {
      backgroundGradientFrom: '#1E2923',
      backgroundGradientTo: '#08130D',
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2 // optional, default 3
    }
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", marginLeft: 5, marginRight: 5 }}>
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
        <View style={{ flex: 9 }}>
          {this.state.loading && <ActivityIndicator size="large" />}
          {this.state.data &&
            <ScrollView
              horizontal={true}>
              <LineChart
                data={data}
                width={this.state.labelTime.length * 50}
                height={220}
                chartConfig={chartConfig}
              />
            </ScrollView>
          }
        </View>

      </View>
    );
  }
}
