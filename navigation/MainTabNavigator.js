import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  StackActions,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

// Home Screen Stack
import HomeScreen from '../screens/HomeScreen';
import HomeResultScreen from '../screens/HomeResultScreen';

// Event Screen Stack
import EventScreen from '../screens/EventScreen';
import PracticeOptionScreen from '../screens/PracticeOptionScreen';
import PracticeInputScreen from '../screens/PracticeInputScreen';
import PracticeResultScreen from '../screens/PracticeResultScreen';

// About Screen Stack
import AboutScreen from '../screens/AboutScreen';

// Setting Screen Stack
import SettingsScreen from '../screens/SettingsScreen';

// Others Screen Stack
import LinksScreen from '../screens/LinksScreen';

//-------------------------HOME STACK----------------------------------------------//
const HomeStack = createStackNavigator({
    Home: HomeScreen,
    HomeResult: HomeResultScreen,
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarOnPress: ({navigation, defaultHandler}) => (
        navigation.dispatch(StackActions.popToTop()),
        defaultHandler()
    ),
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-home${focused ? '' : '-outline'}`
                    : 'md-home'
            }
        />
    )
};

//-------------------------LINK STACK----------------------------------------------------//
const LinksStack = createStackNavigator({
    Links: LinksScreen,
});

LinksStack.navigationOptions = {
    tabBarLabel: 'Links',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
        />
    ),
};

//---------------------------SETTINGS STACK--------------------------------------------------//
const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
        />
    ),
};

//--------------------------EVENT STACK---------------------------------------------//
const EventStack = createStackNavigator({
    Event: EventScreen,
    PracticeOption: PracticeOptionScreen,
    PracticeInput: PracticeInputScreen,
    PracticeResult: PracticeResultScreen,
});

EventStack.navigationOptions = {
    tabBarLabel: 'Events',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-rocket' : 'md-rocket'}
        />
    ),
};

//--------------------------ABOUT STACK---------------------------------------------//
const AboutStack = createStackNavigator({
    About: AboutScreen,
});

AboutStack.navigationOptions = {
    tabBarLabel: 'About Us',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={Platform.OS === 'ios' ? 'ios-information-circle' : 'md-information-circle'}
        />
    ),
};

// AVAILABLE STACK
// HomeStack, ✔️
// LinkStack, 
// SettingStack,
// EventStack, ✔️
// AboutStack, ✔️

export default createBottomTabNavigator({
    HomeStack,
    EventStack,
    AboutStack,
}, {
    tabBarOptions: {
        activeTintColor: 'green',
    }
});
