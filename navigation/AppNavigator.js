import { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from './TabBar';
import { List } from '../components/List';
import { Home } from '../components/Home';
import { Settings } from '../components/Settings';
import { Maps } from '../components/Maps';
import { MapList } from '../components/MapList';

const Tab = createBottomTabNavigator();

export function AppNavigator() {
  const [activeTab, setActiveTab] = useState();

  return (
    //* using a tab navigator to navigate
    <Tab.Navigator
      tabBar={props => (
        <TabBar {...props} setActiveTab={setActiveTab} activeTab={activeTab} />
      )}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{ icon: 'home' }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Map"
        initialParams={{ icon: 'map' }}
        options={{ headerShown: false }}
      >
        {props => <Maps {...props} setActiveTab={setActiveTab} />}
      </Tab.Screen>
      <Tab.Screen
        name="Maplist"
        initialParams={{ icon: 'clipboard-list' }}
        options={{ headerShown: false }}
      >
        {props => <MapList {...props} setActiveTab={setActiveTab} />}
      </Tab.Screen>
      <Tab.Screen
        name="Notes"
        initialParams={{ icon: 'note' }}
        options={{ headerShown: false }}
      >
        {props => <List {...props} setActiveTab={setActiveTab} />}
      </Tab.Screen>
      <Tab.Screen
        name="Settings"
        component={Settings}
        initialParams={{ icon: 'account-settings' }}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
