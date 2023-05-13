import React from 'react';
import store from "./src/redux/store/index";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState, useEffect } from 'react'
import itemStack from './src/navigations/itemStack';
import { Color } from './src/components/theme';
import onAuthStateChange from './src/controllers/auth/onAuthStateChange';
import SplashScreen from 'react-native-splash-screen';
const headerColor = '#fffdfb'
const navTheme = DefaultTheme;
navTheme.colors.background = headerColor;



const Stack = createStackNavigator()

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, [])
  return (
    <>
      <Provider store={store().store}>
        <PersistGate loading={null} persistor={store().persistor}>
          <NavigationContainer theme={navTheme}  >

            <Stack.Navigator initialRouteName="ItemTab"
              screenOptions={{
                headerStyle: {
                  backgroundColor: headerColor,
                },
              }}
            >
              <Stack.Screen name="ItemTab" component={itemStack} options={{ header: () => null }} />

            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
