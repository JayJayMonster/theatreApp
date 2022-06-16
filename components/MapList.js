import { useState, useEffect } from 'react';
import * as React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../config/themeProvider';
import { SafeAreaView } from 'react-native';

export function MapList({ navigation, setActiveTab }) {
  const [data, setData] = useState([]);
  // const navigation = useNavigation();
  const { theme } = useTheme();

  //functions use fetch to get theatre data
  useEffect(() => {
    fetch('https://stud.hosted.hr.nl/1009321/theatreApp/theatres.json')
      .then(response => response.json())
      .then(results => {
        setData(results);
      })
      .catch(error => console.error(error));
  }, []);

  const goToMarker = (lat, long) => {
    navigation.navigate('Map', { latitude: lat, longitude: long });
    setActiveTab('Map');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <Text style={[styles.title, { color: theme.textColor }]}>
        List of all theatres
      </Text>
      {data.map((item, key) => {
        return (
          <View
            style={[
              styles.listItem,
              { backgroundColor: theme.backgroundColor },
            ]}
            key={key}
          >
            <TouchableOpacity
              onPress={() => {
                goToMarker(item.coordinates[0], item.coordinates[1]);
              }}
            >
              <Text style={[styles.text, { color: theme.textColor }]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listItem: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  text: {
    color: 'black',
    padding: 5,
  },
  title: {
    paddingHorizontal: 30,
    paddingBottom: 10,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#20315f',
  },
});
