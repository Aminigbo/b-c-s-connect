import React, { useEffect } from 'react'; 
import { DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack'; 
import { connect } from "react-redux";


// import payTithe from '../donations/pages/pay-tithe';
// import Donations from '../donations/pages/donations';
// import Select_Fellowship from "../donations/pages/select-fellowship"
// import profile from '../user/screens/profile';
// import PayTithe from "../finance/pages/pay-tithe"
// import Donations from "../donations/pages/donations"
// import View_Donations from "../donations/pages/view-donation"
// import ViewFinanceHistory from "../donations/pages/view-finance-history"


import { Color } from '../components/theme';
// import financeHistory from '../donations/pages/finance-history';
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



const Stack = createStackNavigator()

function DonationStack({ appState }) {
    const CartItems = appState.CartItems;

    const totalAmount = CartItems.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price * currentValue.qty;
    }, 0);

    return (
        <Stack.Navigator
            initialRouteName="Donations"
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
            <Stack.Screen name='Donations' component={Donations} options={{
                header: () => null,
                // headerRight: () => (<CartIcon home={true}  count={appState.CartItems.length} />),
                //   title: () => { return (<Logo />) },
                // headerTitle: () => (<Logo />),
                // headerTitleAlign: "center",
                // headerLeft: () => (<AccountIcon />)
            }} />



            {/* <Stack.Screen name='Select-fellowship' component={Select_Fellowship} options={{
                title: "Select fellowship", headerStyle: {
                    backgroundColor: Colors.light
                }
            }} />
            <Stack.Screen name='pay-tithe' component={payTithe} options={{
                title: "Tithe payment", headerStyle: {
                    backgroundColor: Colors.light
                }
            }} />
            <Stack.Screen name='Donations' component={Donations} options={{
                title: "Donation campaigns", headerStyle: {
                    backgroundColor: Colors.light
                }
            }} />
            <Stack.Screen name='View-Donations' component={View_Donations} options={{
                title: "Suport campaign", headerStyle: {
                    backgroundColor: Colors.light
                }
            }} />

            <Stack.Screen name='finance-history' component={financeHistory} options={{ header: () => null, title: "Finance history" }} />

            <Stack.Screen name='View-finance-history' component={ViewFinanceHistory} options={{
                title: "Transaction", headerStyle: {
                    backgroundColor: Colors.light, 
                }
            }} /> */}





            {/* <Stack.Screen name='Payments' component={payments} options={{ title: "Make payment" }} /> */}
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


export default connect(mapStateToProps, mapDispatchToProps)(DonationStack);
