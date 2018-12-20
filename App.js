/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Login from './app/components/Login';
import Register from './app/components/Register';
import Dashboard from './app/components/Dashboard';
import Suhu from './app/components/Suhu';
import Akun from './app/components/Akun';



export default class App extends Component {
  render() {
    return (
      <Dashboard />
    );
  }
}