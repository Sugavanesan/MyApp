import React from 'react';
import { StyleSheet } from 'react-native';
import RouteNavigation from './src/navigators/RouteNavigation';
import { NavigationContainer } from '@react-navigation/native';
import AppTabBar from './src/navigators/AppTabBar';

const App = () => {
  return (
    <NavigationContainer>
      <RouteNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({})

export default App;
