import React, { useState, useEffect } from 'react';
import { DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Onbording from '../components/onboarding'; 
import Web from '../screens/web';
import EditProfile from '../user/screens/edit-profile';
import Add_details from '../user/screens/add-details';
import profile from '../user/screens/profile';

// connect===================
import Connect from "../bcs-connect/pages/index"

// JOBS ==========================
import Job from "../job/pages/job-index"

// QRAUTH =============
import QRAUTH from "../user/screens/qr-auth"
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

export default function ProfileStack({ appState }) {

    const [isOnoarded, setOnboarded] = useState()

  
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

            {/* <Stack.Screen name='Home' component={Onbording} options={{
                header: () => null
            }} /> */}

            <Drawer.Screen name='Home' component={profile} options={{
                header: () => null
            }} />
            <Stack.Screen name='Edit-profile' component={EditProfile} options={{ header: () => null }} />
            <Stack.Screen name='Add-details' component={Add_details} options={{ header: () => null, title: "Update Profile" }} />





            {/* connect=================================== */}
            <Stack.Screen name='Connect' component={Connect} options={{ header: () => null, title: "Suport campaign" }} />


            {/* Job ================= */}
            {/* <Stack.Screen name='Job' component={Job} options={{ title: "Active jobs" }} /> */}


            {/* QR=============== */}
            {/* <Stack.Screen name='QR' component={QRAUTH} options={{ title: "Meeting management" }} /> */}

            <Stack.Screen name='WEB' component={Web}
                options={{
                    header: () => null
                }}
            />


        </Drawer.Navigator>
    )
} 