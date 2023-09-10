import React, { useState, useEffect } from 'react';
import { DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Onbording from '../components/onboarding'; 
import Web from '../screens/web';
import EditProfile from '../user/screens/edit-profile';
import Add_details from '../user/screens/add-details';

import { HelloFriday } from '../components/drawerContents';
import Signin from '../auth/pages/signin';
import Signup from "../auth/pages/signup"
import AddPwd from "../auth/pages/enter-pwd"
import SelectState from "../auth/pages/select-state"
import SelectFellowship from "../auth/pages/select-fellowship"
import SendOTP from "../auth/pages/send-otp"
import EnterOTP from "../auth/pages/enter-otp"
import ResetPWD from "../auth/pages/reset-pwd"
import Logout from "../auth/pages/logout"

import { Color } from '../components/theme';

const headerColor = '#fffdfb'
const navTheme = DefaultTheme;
navTheme.colors.background = headerColor;

const Colors = Color()
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

export default function AuthStack({ appState }) {

    const [isOnoarded, setOnboarded] = useState()

    
    return (
        <Stack.Navigator
            // initialRouteName={isOnoarded == true ? "WEB" : "Home"}
            initialRouteName="Signin"
            screenOptions={{
                transitionSpec: transition.transitionSpec,
                cardStyleInterpolator: transition.cardStyleInterpolator,
                headerStyle: {
                    backgroundColor: headerColor,
                },
            }}
        >

            <Stack.Screen name='Signin' component={Signin} options={{
                header: () => null
            }} />
            <Stack.Screen name='Signup' component={Signup} options={{
                header: () => null
            }} />

            <Stack.Screen name='Add-password' component={AddPwd} options={{ header: () => null }} />
            <Stack.Screen name='SEND OTP' component={SendOTP} options={{ header: () => null }} />
            <Stack.Screen name='Add-details' component={Add_details} options={{ header: () => null, title: "Update Profile" }} />
            <Stack.Screen name='Enter OTP' component={EnterOTP} options={{ header: () => null }} />
            <Stack.Screen name='Logout' component={Logout} options={{ header: () => null }} />
            <Stack.Screen name='RESET PWD' component={ResetPWD} options={{ header: () => null }} />
            <Stack.Screen name='Select state' component={SelectState} options={{
                title: "Select Your State",
                headerStyle: {
                    backgroundColor: Colors.light
                }
            }} />
            <Stack.Screen name='Select Fellowship' component={SelectFellowship} options={{
                title: "Select Your Fellowship",
                headerStyle: {
                    backgroundColor: Colors.light
                }
            }} />


        </Stack.Navigator>
    )
} 