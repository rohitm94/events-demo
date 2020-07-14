import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItemList
} from '@react-navigation/drawer';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import EventsOverviewScreen, {
  screenOptions as eventsOverviewScreenOptions
} from '../screens/dashboard/eventsMain';
import AuthScreen, {
  screenOptions as authScreenOptions
} from '../screens/user/AuthScreen';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const EventsStackNavigator = createStackNavigator();

export const EventsNavigator = () => {
  return (
    <EventsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <EventsStackNavigator.Screen
        name="EventsOverview"
        component={EventsOverviewScreen}
        options={eventsOverviewScreenOptions}
      />
      {/* <EventsStackNavigator.Screen
        name="EventDetail"
        component={EventDetailScreen}
        options={eventDetailScreenOptions}
      />*/}
    </EventsStackNavigator.Navigator>
  );
};


const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();

  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={props => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={Colors.primary}
                onPress={() => {
                  dispatch(authActions.logout());
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primary
      }}
    >
      <ShopDrawerNavigator.Screen
        name="Events"
        component={EventsNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={props.color}
            />
          )
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};

