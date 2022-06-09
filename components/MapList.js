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

export function MapList() {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  //functions use fetch to get theatre data
  useEffect(() => {
    fetch('https://stud.hosted.hr.nl/1009321/theatreApp/theatres.json')
      .then(response => response.json())
      .then(results => {
        setData(results);
      })
      .catch(error => console.error(error));
  }, []);

  const goToMarker = (name, lat, long) => {
    console.log(
      `Go to ${name} marker, it has ${lat} latitude and ${long} longtitude`
    );
    navigation.navigate('Map', { latitude: lat, longtitude: long });
  };

  return (
    <ScrollView style={styles.scrollview}>
      {data.map((item, key) => {
        return (
          <View style={styles.container} key={key}>
            <TouchableOpacity
              onPress={() => {
                goToMarker(item.name, item.coordinates[0], item.coordinates[1]);
              }}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollview: {
    height: '20%',
    width: '80%',
    marginTop: 50,
    marginBottom: 100,
    alignSelf: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'left',
    padding: 10,
  },
});
