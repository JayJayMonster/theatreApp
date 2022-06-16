import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../config/themeProvider';
import Tab from './Tab';

const { width } = Dimensions.get('screen');

const TabBar = ({ state, navigation, activeTab }) => {
  const [selected, setSelected] = useState('Home');
  const { theme } = useTheme();
  const { routes } = state;
  const renderColor = currentTab =>
    currentTab === selected ? theme.nav.active : theme.nav.inActive;

  const handlePress = (tab, index) => {
    if (state.index !== index) {
      setSelected(tab);
      navigation.navigate(tab);
      //console.log(activeTab);
    }
  };

  useEffect(() => {
    setSelected(activeTab);
  }, [activeTab]);

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.container,
          { backgroundColor: theme.nav.backgroundColor },
        ]}
      >
        {routes.map((route, index) => (
          <Tab
            tab={route}
            icon={route.params.icon}
            onPress={() => handlePress(route.name, index)}
            color={renderColor(route.name)}
            key={route.key}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 40,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 350,
    borderRadius: 100,
    elevation: 3,
  },
});

export default TabBar;
