import React, { useState, useEffect } from 'react';
import { DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Onbording from '../components/onboarding'; 
import Web from '../screens/web';
import ViewProfile from "../bcs-connect/pages/user-profile"

// connect===================
import Connect from "../bcs-connect/pages/index"

// JOBS ==========================
import Job from "../job/pages/job-index"

// QRAUTH =============
import QRAUTH from "../user/screens/qr-auth"
import { Color } from '../components/theme';


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

export default function BCSconnectStack({ appState }) {

    const [isOnoarded, setOnboarded] = useState()

    

    const Colors = Color()
    return (
        <Stack.Navigator

            // initialRouteName={isOnoarded == true ? "WEB" : "Home"}
            initialRouteName="Connect"
            screenOptions={{
                transitionSpec: transition.transitionSpec,
                cardStyleInterpolator: transition.cardStyleInterpolator,
                headerStyle: {
                    backgroundColor: headerColor,
                },
            }}
        >
            {/* connect=================================== */}
            <Stack.Screen name='Connect' component={Connect} options={{
                header: () => null,
                headerTintColor: Colors.DarkBlue,
                title: 'BCS-Connect',
                headerStyle: {
                    backgroundColor: Colors.white
                },
            }} />


            {/* Job ================= */}
            <Stack.Screen name='Job' component={Job} options={{
                title: "Active jobs",
                headerStyle: {
                    backgroundColor: Colors.white
                }
            }} />


            {/* QR=============== */}
            <Stack.Screen name='view-user' component={ViewProfile} options={{ header: () => null }} />

            <Stack.Screen name='WEB' component={Web}
                options={{
                    header: () => null
                }}
            />


        </Stack.Navigator>
    )
} 