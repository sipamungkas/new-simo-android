import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View, Dimensions, Picker } from 'react-native';
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
      sensor: "temperature",
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


  saringHandler = () => {
    const startDate = this.state.startDate + " 00:00:00";
    const endDate = this.state.startDate + " 23:59:59";
    this.setState({ data: null, loading: true, timeReference: null });
    const ref = firebase.database().ref("data/");
    ref.child(this.state.sensor).orderByChild("time").startAt(startDate).endAt(endDate)
      .once("value").then((snapshot) => {
        let arrayOfKeys = Object.keys(snapshot.val())
          .sort()
        let results = arrayOfKeys
          .map((key) => snapshot.val()[key]);
        let time = arrayOfKeys
          .map((key) => snapshot.val()[key].time.slice(11, 16));
        let valueSuhu = arrayOfKeys
          .map((key) => snapshot.val()[key].value);
        let timeChunked = time.chunk(3);
        let valueChunked = valueSuhu.chunk(3);
        let labelTime = [];
        let labelSuhu = [];
        timeChunked.forEach(val => {
          labelTime.push(val[val.length - 1])
        });
        // console.warn(valueChunked);
        valueChunked.forEach(val => {
          total = 0;
          val.forEach(element => {
            total += parseFloat(element);
          });
          labelSuhu.push(total / val.length)
        });
        // console.warn(labelTime.length, labelSuhu.length);
        this.setState({ data: results, labelTime: labelTime, labelData: labelSuhu, loading: false })
      }).catch((error) => alert(error));

  }


  render() {
    // console.warn(this.state.labelData);
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
            <Text style={{ color: "black" }}>{this.state.startDate} </Text>
          </TouchableOpacity>
          <Picker
            selectedValue={this.state.sensor}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ sensor: itemValue })
            }>
            <Picker.Item label="Suhu" value="temperature" />
            {/* <Picker.Item label="Arus" value="current" /> */}

          </Picker>
          <Button mode="contained" color="#900" onPress={this.saringHandler}>Tampilkan</Button>
          <DateTimePicker
            isVisible={this.state.startDateTimePickerVisible}
            onConfirm={this.handleStartDatePicked}
            onCancel={this.hideStartDateTimePicker}
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
