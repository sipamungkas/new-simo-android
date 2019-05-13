import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from 'react-native-firebase';
import style from './styles';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "",
      ldr: "",
      pir: "",
      smoke: "",
      temperature: "",
    };
  }

  componentDidMount() {

    const ref = firebase.database().ref("data/");
    ref.child('current').limitToLast(1).on("child_added", (snapshot) => this.setState({ current: snapshot.toJSON() }));
    ref.child('ldr').limitToLast(1).on("child_added", (snapshot) => this.setState({ ldr: snapshot.toJSON() }));
    ref.child('pir').limitToLast(1).on("child_added", (snapshot) => this.setState({ pir: snapshot.toJSON() }));
    ref.child('smoke').limitToLast(1).on("child_added", (snapshot) => this.setState({ smoke: snapshot.toJSON() }));
    ref.child('temperature').limitToLast(1).on("child_added", (snapshot) => this.setState({ temperature: snapshot.toJSON() }));
  }
  render() {
    const { viewContainerMargin } = style
    return (
      <View style={viewContainerMargin}>
        <ScrollView>
          <Card
            onPress={() => this.props.navigation.navigate("Chart")}>
            <Card.Content>
              <Title ><Icon name="chart-line" size={20} color="#900" /> Lihat Grafik</Title>
            </Card.Content>
          </Card>
          <Card style={{ marginVertical: 3 }}
            onPress={() => this.props.navigation.navigate("Suhu")}>
            <Card.Content>
              <Title><Icon name="temperature-low" size={20} color="#900" /> Suhu Ruangan {parseInt(this.state.temperature.value) > 32 ? <Icon name="exclamation-triangle" color="red" /> : null}</Title>
              <Text style={{ alignSelf: 'flex-end' }}>{this.state.temperature.time}</Text><Text style={{ alignSelf: 'flex-start' }}>{this.state.temperature.value} °C {parseInt(this.state.temperature.value) > 32 ? <Icon size={20} name="exclamation-triangle" color="red" /> : null}</Text>
            </Card.Content>
          </Card>
          <Card style={{ marginVertical: 3 }}
            onPress={() => this.props.navigation.navigate("Asap")}>
            <Card.Content>
              <Title> <Icon name="fire" size={20} color="#900" /> Asap</Title>
              <Text style={{ alignSelf: 'flex-end' }}>{this.state.smoke.time}</Text><Text style={{ alignSelf: 'flex-start' }}>{this.state.smoke.value > 430 ? "Bahaya" : "Normal"} </Text>

            </Card.Content>
          </Card>
          <Card style={{ marginVertical: 3 }}
            onPress={() => this.props.navigation.navigate("Cahaya")}>
            <Card.Content>
              <Title> <Icon name="lightbulb" size={20} color="#900" /> Cahaya</Title>
              <Text style={{ alignSelf: 'flex-end' }}>{this.state.ldr.time}</Text><Text style={{ alignSelf: 'flex-start' }}>{this.state.ldr.value > 758 ? "Hidup" : "Mati"}</Text>
            </Card.Content>
          </Card>
          <Card style={{ marginVertical: 3 }}
            onPress={() => this.props.navigation.navigate("Aktifitas")}>
            <Card.Content>
              <Title> <Icon name="running" size={20} color="#900" /> Aktifitas</Title>
              <Text style={{ alignSelf: 'flex-end' }}>{this.state.pir.time}</Text><Text style={{ alignSelf: 'flex-start' }}>{this.state.pir.value == 1 ? "Terdapat Aktifitas" : "Tidak Terdapat Aktifitas"} {this.state.pir.value == 1 ? <Icon size={20} name="exclamation-triangle" color="yellow" /> : null}</Text>
            </Card.Content>
          </Card>
          <Card style={{ marginVertical: 3 }}
            onPress={() => this.props.navigation.navigate("Cahaya")}>
            <Card.Content>
              <Title> <Icon name="bolt" size={20} color="#900" /> Arus</Title>
              <Text style={{ alignSelf: 'flex-end' }}>{this.state.current.time}</Text><Text style={{ alignSelf: 'flex-start' }}>{this.state.current.value} A</Text>
            </Card.Content>
          </Card>
        </ScrollView>
      </View>
    );
  }
}
