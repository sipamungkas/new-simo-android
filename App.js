/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { AsyncStorage, Alert, StyleSheet, Text, View } from 'react-native';
import firebase from 'react-native-firebase';
import Login from './app/components/Login';
import Register from './app/components/Register';
import Dashboard from './app/components/Dashboard';
import Aktifitas from './app/components/Aktifitas';
import Suhu from './app/components/Suhu';
import Asap from './app/components/Asap';
import Cahaya from './app/components/Cahaya';
import Arus from './app/components/Arus';
import Akun from './app/components/Akun';
import Splash from './app/components/Splash';
import Charts from './app/components/Charts';
// import DateRangePickerTest from './app/components/DateRangePickerTest';
import { createAppContainer, createSwitchNavigator, createBottomTabNavigator, createStackNavigator, createMaterialTopTabNavigator, createMaterialBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-ionicons';
import Iconf from 'react-native-vector-icons/FontAwesome5';
import { Provider as PaperProvider } from 'react-native-paper';

class App extends Component {
  async componentDidMount() {
    this.checkPermission();
    firebase.messaging().subscribeToTopic("simo-client-android");
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmTokem');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.warn('permission rejected');
    }
  }

  render() {
    return (
      <PaperProvider>
        <AppContainer />
      </PaperProvider>
    );
  }
}
export default App;



const AppStackNavigator = createStackNavigator({
  Splash: {
    screen: Splash
  },
  Login: {
    screen: Login
  },
  Register: {
    screen: Register
  }
},
  {
    defaultNavigationOptions: {
      header: null
    }
  })

const RiwayatTopNavigator = createMaterialTopTabNavigator({
  Aktifitas: {
    screen: Aktifitas,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Iconf name="running" color={tintColor} size={20} />
    }

  }, Arus: {
    screen: Arus,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Iconf name="bolt" color={tintColor} size={20} />
    }
  }, Asap: {
    screen: Asap,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Iconf name="fire" color={tintColor} size={20} />
    }
  }, Cahaya: {
    screen: Cahaya,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Iconf name="lightbulb" color={tintColor} size={20} />
    }
  }, Suhu: {
    screen: Suhu,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Iconf name="temperature-low" color={tintColor} size={20} />
    }
  },
}, {
    tabBarOptions: {
      activeTintColor: "#900",
      inactiveTintColor: "black",
      style: {
        backgroundColor: "white",
      },
      showIcon: true,
      showLabel: false
    },
  }
)

const AppBottomNavigator = createBottomTabNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      tabBarLabel: "Dashboard",
      tabBarIcon: ({ tintColor }) => <Icon name="home" color={tintColor} />
    }
  },
  Riwayat: {
    screen: RiwayatTopNavigator,
    navigationOptions: {
      tabBarLabel: "Riwayat",
      tabBarIcon: ({ tintColor }) => <Icon name="time" color={tintColor} />
    }
  },
  Akun: {
    screen: Akun,
    navigationOptions: {
      tabBarLabel: "Akun",
      tabBarIcon: ({ tintColor }) => <Icon name="person" color={tintColor} />
    }
  }
}, {
    tabBarOptions: {
      activeTintColor: "#900",
    },
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      if (routeName == "Riwayat") {
        return { header: null }
      } else {
        return {
          headerTitle: routeName,
        }
      }

    }
  })

const DashboardStackNavigator = createStackNavigator({
  Dashboard: AppBottomNavigator,
  Chart: {
    screen: Charts,
    navigationOptions: {
      headerTitle: 'Grafik'
    }
  }

})

const AppSwitchNavigator = createSwitchNavigator({
  Login: AppStackNavigator,
  Dashboard: DashboardStackNavigator
})

const AppContainer = createAppContainer(AppSwitchNavigator);