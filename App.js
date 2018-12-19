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



export default class App extends Component {
  render() {
    return (
      <Dashboard />
    );
  }
}