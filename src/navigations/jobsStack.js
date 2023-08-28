import React, { useState, useEffect } from 'react';
import { DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Onbording from '../components/onboarding';
import { Onborded } from '../controllers/auth/authController';

// connect===================
import Connect from "../bcs-connect/pages/index"

// JOBS ==========================
import Job from "../job/pages/job-index"
import JobApplicants from "../job/pages/applicants-profile"
import ViewJobs from '../job/pages/view-jobs';
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
const Colors = Color()
export default function JobStack({ appState }) {

    const [isOnoarded, setOnboarded] = useState()

    Onborded().then(res => {
        if (res == 1) {
            setOnboarded(true)
        } else {
            setOnboarded(false)
        }
    })
    return (
        <Stack.Navigator

            // initialRouteName={isOnoarded == true ? "WEB" : "Home"}
            initialRouteName="Job"
            screenOptions={{
                transitionSpec: transition.transitionSpec,
                cardStyleInterpolator: transition.cardStyleInterpolator,
                headerStyle: {
                    backgroundColor: headerColor,
                },
            }}
        >

            {/* Job ================= */}
            <Stack.Screen name='Job' component={Job} options={{
                header: () => null,
                title: "Active jobs",
                headerStyle: {
                    backgroundColor: Colors.light
                }
            }} />

            {/* QR=============== */}
            <Stack.Screen name='View-job' component={ViewJobs} options={{
                title: "Apply",
                headerStyle: {
                    backgroundColor: Colors.light
                }
            }} />

            <Stack.Screen name='Applicants' component={JobApplicants} options={{
                title: "Apply",
                header: () => null,
                headerStyle: {
                    backgroundColor: Colors.light
                }
            }} />


        </Stack.Navigator>
    )
} 