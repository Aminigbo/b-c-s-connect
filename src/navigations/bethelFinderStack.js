import React, { useState, useEffect } from 'react';
import { DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Onbording from '../components/onboarding'; 
import BethelFinder from '../bethel-finder/screens/index'; 
import Add_bethel from '../bethel-finder/screens/add-bethel';


import { HelloFriday } from '../components/drawerContents';


const headerColor = '#fffdfb'
const navTheme = DefaultTheme;
navTheme.colors.background = headerColor;


const transition = {
    gestureDirection: 'horizontal',
    transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
    },
    cardStyleInterpolator: ({ current, layouts }) => {
        return {
            cardStyle: {
                transform: [
                    {
                        translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                        }),
                    },
                ],
            },
        };
    },
};


const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();

export default function BethelFinderStack({ appState }) {

   
    return (
        <Drawer.Navigator
            drawerContent={(props) => <HelloFriday {...props} />}
            // initialRouteName={isOnoarded == true ? "WEB" : "Home"}
            initialRouteName="Home"
            screenOptions={{ 
                transitionSpec: transition.transitionSpec,
                cardStyleInterpolator: transition.cardStyleInterpolator,
                headerStyle: {
                    backgroundColor: headerColor,
                },
            }}
        > 

            <Drawer.Screen name='Home' component={BethelFinder} options={{
                header: () => null
            }} /> 

            <Drawer.Screen name='Add-Bethel' component={Add_bethel} options={{
                header: () => null
            }} /> 

        </Drawer.Navigator>
    )
} 