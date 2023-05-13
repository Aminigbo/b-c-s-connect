import React, { useEffect } from 'react';
import { Image } from "react-native"
import { DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import Categories from '../components/categories';
import GiftItemsComponents from '../screens/gift-items';
import Home from '../screens/home';
import ItemDetails from '../screens/item-details';
import Cart from '../screens/cart';
import { AccountIcon, BackIcon, CartIcon, Logo } from '../components/icons';
import Checkout from '../screens/checkout';
import { connect } from "react-redux";
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

function HomeStack({ appState }) {
    const CartItems = appState.CartItems;

    const totalAmount = CartItems.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price * currentValue.qty;
    }, 0);

    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                // header: (props) => {
                //   <Header {...props} />
                // }, 
                transitionSpec: transition.transitionSpec,
                cardStyleInterpolator: transition.cardStyleInterpolator,
                headerStyle: {
                    backgroundColor: headerColor,
                },
            }}
        >
            <Stack.Screen name='Home' component={Home} options={{
                // headerRight: () => (<CartIcon home={true}  count={appState.CartItems.length} />),
                //   title: () => { return (<Logo />) },
                headerTitle: () => (<Logo />),
                headerTitleAlign: "center",
                headerLeft: () => (<AccountIcon />)
            }} />
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


export default connect(mapStateToProps, mapDispatchToProps)(HomeStack);
