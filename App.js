import React from 'react';
import { Alert, ToastAndroid } from "react-native"
import store from "./src/redux/store/index";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useState, useEffect } from 'react'
import { Color } from './src/components/theme';
import SplashScreen from 'react-native-splash-screen';
import { RequestUserPermission } from './src/utilities/fcntoken';
import financeStack from './src/navigations/financeStack';
import BCSconnectStack from './src/navigations/bcs-connectStack';
import JobStack from './src/navigations/jobsStack';
import Verifymeetinguser from "./src/user/screens/verify-auth"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBookAtlas, faBriefcase, faDonate, faFeed, faHome, faHomeAlt, faLocation, faMapLocation, faMapMarkedAlt, faMapMarker, faMapMarkerAlt, faMarker, faMoneyBill, faPeopleArrows, faSearchLocation, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import AuthStack from './src/navigations/authStack';
import BCSEventStack from "./src/navigations/enevtStack"
import ProfileStack from './src/navigations/profileStack';
import BethelFinderStack from './src/navigations/bethelFinderStack';
import viewJobs from './src/job/pages/view-jobs';
import View_event from "./src/events/pages/view-event"
import jobApplicants from './src/job/pages/applicants-profile';
import ViewProfile from "./src/bcs-connect/pages/user-profile"
import { BackIcon, CustomMarker, CustomMarkerAlt, SearchIcon } from './src/components/icons';
import notifications from './src/bethel-finder/screens/notifications';
import myjobs from './src/job/pages/myjobs';
import Meetingattendance from "./src/user/screens/view-attendance"
import search from './src/bcs-connect/pages/search';
import filter from './src/bcs-connect/pages/filter';
import scan from './src/user/screens/scan';
import qrAuth from './src/user/screens/qr-auth';
import createMeeting from './src/user/screens/create-meeting';
import {NativeBaseProvider} from "native-base"

const headerColor = '#fffdfb'
const navTheme = DefaultTheme;

const Colors = Color()
navTheme.colors.background = Colors.light;



const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();

function App() {

  useEffect(() => {
    SplashScreen.hide();
    RequestUserPermission()

  }, [])











  function MyTabBar({ state, descriptors, navigation }) {
    return (
      <View style={{ flexDirection: 'row', backgroundColor: Colors.light }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                // height: 90,
                // backgroundColor: "green",
                justifyContent: "space-around",
                flexDirection: "row",
                paddingTop: 15,
                paddingBottom: 15,
              }}
            >
              {/* <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                {label}
              </Text> */}

              {label == "Account" && <>
                <View style={{
                  alignItems: "center"
                }} >
                  <FontAwesomeIcon style={{
                    flex: 1,
                    color: isFocused ? Colors.primary : 'grey',
                    // marginLeft: 10,
                    padding: 10,


                    // }} size={20} icon={faMapMarkerAlt} />}
                  }} size={20} icon={faHome} />
                  <Text style={{ color: isFocused ? Colors.primary : 'grey', }}>Find Bethel</Text>
                </View>
              </>}

              {label == "BCS-Connect" &&
                <View style={{
                  alignItems: "center"
                }} >
                  <FontAwesomeIcon style={{
                    flex: 1,
                    color: isFocused ? Colors.primary : 'grey',
                    // marginLeft: 10,
                    padding: 10,


                    // }} size={20} icon={faMapMarkerAlt} />}
                  }} size={20} icon={faUserGroup} />
                  <Text style={{ color: isFocused ? Colors.primary : 'grey', }}>BCS-Connect</Text>
                </View>
              }

              {label == "Jobs" &&
                <View style={{
                  alignItems: "center"
                }} >
                  <FontAwesomeIcon style={{
                    flex: 1,
                    color: isFocused ? Colors.primary : 'grey',
                    // marginLeft: 10,
                    padding: 10,


                    // }} size={20} icon={faMapMarkerAlt} />}
                  }} size={20} icon={faBriefcase} />
                  <Text style={{ color: isFocused ? Colors.primary : 'grey', }} >Jobs</Text>
                </View>
              }
              {label == "BCS-Events" &&
                <View style={{
                  alignItems: "center"
                }} >
                  <FontAwesomeIcon style={{
                    flex: 1,
                    color: isFocused ? Colors.primary : 'grey',
                    // marginLeft: 10,
                    padding: 10,


                    // }} size={20} icon={faMapMarkerAlt} />}
                  }} size={20} icon={faDonate} />
                  <Text style={{ color: isFocused ? Colors.primary : 'grey', }}>Donations</Text>
                </View>}
              {label == "Finance" && <FontAwesomeIcon style={{
                flex: 1,
                color: isFocused ? Colors.primary : 'grey',
                marginLeft: 10,
                padding: 10,


              }} size={25} icon={faMoneyBill} />}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }


  const HomeStacks = () => {
    return (
      <Tab.Navigator
        tabBar={props => <MyTabBar {...props} />}

        initialRouteName="Account"
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: headerColor,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Account') {
              iconName = focused
                ? faHome
                : faHomeAlt;
            } else if (route.name === 'BCS-Connect') {
              iconName = focused
                ? faPeopleArrows
                : faPeopleArrows;
            }
            else if (route.name === 'BCS-Events') {
              iconName = focused
                ? faBookAtlas
                : faBookAtlas;
            }
            else if (route.name === 'Finance') {
              iconName = focused
                ? faMoneyBill
                : faMoneyBill;
            }
            else if (route.name === 'Jobs') {
              iconName = focused
                ? faBriefcase
                : faBriefcase;
            }

            // You can return any component that you like here!
            return (
              <>
                <FontAwesomeIcon style={{
                  flex: 1,
                  color: color,

                }} size={size} icon={iconName} />
              </>
            )
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: 'gray',


        })}
      >
        <Tab.Screen name="Account" component={BethelFinderStack} options={{ header: () => null }} />
        <Tab.Screen name="BCS-Events" component={BCSEventStack} options={{ header: () => null, }} />
        <Tab.Screen name="BCS-Connect" component={BCSconnectStack} options={{ header: () => null, }} />
        <Tab.Screen name="Jobs" component={JobStack} options={{ header: () => null }} />

      </Tab.Navigator>
    )
  }

  return (
    <>
      <Provider store={store().store}>
        <PersistGate loading={null} persistor={store().persistor}>
          <NativeBaseProvider>

            <NavigationContainer theme={navTheme}  >

              <Stack.Navigator
                tabBar={props => <MyTabBar {...props} />}

                initialRouteName="Account"
                screenOptions={({ route }) => ({
                  headerStyle: {
                    backgroundColor: headerColor,
                  },

                })}
              >
                <Stack.Screen name="Accounts" component={HomeStacks} options={{ header: () => null }} />
                <Stack.Screen name="Auth" component={AuthStack} options={{ header: () => null, }} />
                <Stack.Screen name="Finance" component={financeStack} options={{ header: () => null }} />
                <Stack.Screen name="Profile" component={ProfileStack} options={{ header: () => null }} />
                <Stack.Screen name="Scan" component={scan} options={{
                  title: "",
                  headerLeft: () => (<BackIcon />),
                  headerRight: () => (<SearchIcon />),
                  headerStyle: {
                    backgroundColor: Colors.light
                  }
                }} />

                {/* create meeting */}
                <Stack.Screen name="Create meeting" component={createMeeting} options={{
                  title: "Create meeting attendance",
                  headerLeft: () => (<BackIcon />),
                  headerStyle: {
                    backgroundColor: Colors.light
                  }
                }} />


                <Stack.Screen name="Verify-auht" component={Verifymeetinguser} options={{
                  title: "Authenticate member",
                  headerLeft: () => (<BackIcon />),
                  headerStyle: {
                    backgroundColor: Colors.light
                  }
                }} />

                {/* // Qr /  meeting management */}
                <Stack.Screen name="QR" component={qrAuth} options={{
                  title: "Meeting management",
                  headerLeft: () => (<BackIcon />),
                  // headerRight: () => (<BackIcon />),
                  headerStyle: {
                    backgroundColor: Colors.light
                  }
                }} />


                <Stack.Screen name="Notifications" component={notifications} options={{
                  headerStyle: {
                    backgroundColor: Colors.light
                  }
                }} />

                <Stack.Screen name="User-Profile" component={ViewProfile} options={{ header: () => null }} />

                {/* <Stack.Screen name="view-user" component={ViewProfile} options={{ header: () => null }} /> */}

                <Stack.Screen name="my-job" component={myjobs} options={{
                  title: "My jobs",
                  headerLeft: () => (<BackIcon />),
                  headerStyle: {
                    backgroundColor: Colors.light
                  }
                }} />

                {/* see attendance */}
                <Stack.Screen name="View-attendance" component={Meetingattendance} options={{
                  title: "",
                  headerLeft: () => (<BackIcon />),
                  headerStyle: {
                    backgroundColor: Colors.light
                  }
                }} />



                {/* search for brethren */}
                <Stack.Screen name="Search" component={search} options={{
                  title: "Search",
                  headerLeft: () => (<BackIcon />),
                  headerStyle: {
                    backgroundColor: Colors.light
                  }
                }} />

                {/* Filter for brethren */}
                <Stack.Screen name="Filter" component={filter} options={{
                  title: "Filter",
                  headerLeft: () => (<BackIcon />),
                  headerStyle: {
                    backgroundColor: Colors.light
                  }
                }} />


                <Stack.Screen name="View-event" component={View_event} options={{
                  title: "",
                  headerStyle: {
                    backgroundColor: Colors.light
                  }
                }} />
                <Stack.Screen name="View-job" component={viewJobs} options={{
                  title: "",
                  headerStyle: {
                    backgroundColor: Colors.light
                  }
                }} />

              </Stack.Navigator>
            </NavigationContainer>
          </NativeBaseProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
