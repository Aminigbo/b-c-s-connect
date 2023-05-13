import React, { useState, useEffect } from 'react';
import { DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import Onbording from '../components/onboarding';
import Web from '../screens/web';
import { Onborded } from '../controllers/auth/authController';
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



const Stack = createStackNavigator()

export default function ItemStack({ appState }) {

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
            initialRouteName="Home"
            screenOptions={{
                transitionSpec: transition.transitionSpec,
                cardStyleInterpolator: transition.cardStyleInterpolator,
                headerStyle: {
                    backgroundColor: headerColor,
                },
            }}
        > 

            <Stack.Screen name='Home' component={Onbording} options={{
                header: () => null
            }} />

            <Stack.Screen name='WEB' component={Web}
                options={{
                    header: () => null
                }}
            />


        </Stack.Navigator>
    )
} 