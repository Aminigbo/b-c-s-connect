import React, { useEffect } from 'react';
import { Image } from "react-native"
import { DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import Categories from '../components/categories';
import GiftItemsComponents from '../screens/gift-items';
import Home from '../screens/home';
import ItemDetails from '../screens/item-details';
import Cart from '../screens/cart';
import { AccountIcon, BackIcon, CartIcon, Logo, OpenDrawer } from '../components/icons';
import Checkout from '../screens/checkout';
import { connect } from "react-redux";
import AccountComponent from '../screens/account';
import SurpriseDetails from '../screens/surprise-details';
import itemDetails from '../screens/item-details';
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



const Stack = createStackNavigator()

function AccountStack({ appState }) {
    const CartItems = appState.CartItems;

    const totalAmount = CartItems.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.amount;
    }, 0);
    let Colors = Color()
    return (
        <Stack.Navigator
            screenOptions={{
                // header: (props) => {
                //   <Header {...props} />
                // }, 
                transitionSpec: transition.transitionSpec,
                cardStyleInterpolator: transition.cardStyleInterpolator,
                headerStyle: {
                    backgroundColor: Colors.light,
                    elevation: 0,
                },
            }}
        >
            {/* <Stack.Screen name='Account' component={AccountComponent}
                options={{
                    header: () => null,
                    headerRight: () => (<CartIcon count={appState.CartItems.length} />),
                    title: null,
                    headerLeft: () => (<BackIcon />)
                }}
            /> */}
            <Stack.Screen name='Items' component={GiftItemsComponents}
                options={{
                    header: () => null,
                    headerRight: () => (<CartIcon count={appState.CartItems.length} />),
                    title: null,
                    headerLeft: () => (<BackIcon />)
                }}
            />

            <Stack.Screen name='SurpriseDetails' component={SurpriseDetails}
                options={{
                    // headerRight: () => (<CartIcon count={appState.CartItems.length} />),
                    title: null,
                    headerLeft: () => (<BackIcon />)
                }}
            />
            <Stack.Screen name='ItemsDetails' component={GiftItemsComponents} options={{ header: () => null }} />
            <Stack.Screen name='FullItemsDetails' component={itemDetails} options={{ header: () => null }} />
        </Stack.Navigator>
    )
}

const mapStateToProps = (state) => {
    return {
        appState: state.user,
    };
};


const mapDispatchToProps = (dispatch, encoded) => {
    return {
        // disp_category: (payload) => dispatch(categories(HomeStack)),
        // disp_ath: () => dispatch(initAuth()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(AccountStack);
