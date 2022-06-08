import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from './TabBar';
import { List } from '../components/List';
import { Home } from '../components/Home';
import { Settings } from '../components/Settings';
import { Maps } from '../components/Maps';

const Tab = createBottomTabNavigator();

export function AppNavigator() {
  return (
    //* using a tab navigator to navigate
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{ icon: 'home' }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Map"
        component={Maps}
        initialParams={{ icon: 'map' }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="List"
        component={List}
        initialParams={{ icon: 'clipboard-list' }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        initialParams={{ icon: 'account-settings' }}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
