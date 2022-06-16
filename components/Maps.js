import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export function Maps({ route, navigation, setActiveTab }) {
  const [data, setData] = useState([]);
  const [locationResult, setLocation] = useState(null);
  const [mapRegion, setRegion] = useState(null);
  const [doneFetching, setDoneFetching] = useState(false);
  const { latitude, longitude } = route.params;

  console.log(latitude, longitude);

  //functions use fetch to get theatre data
  useEffect(() => {
    fetch('https://stud.hosted.hr.nl/1009321/theatreApp/theatres.json')
      .then(response => response.json())
      .then(results => {
        setData(results);
        setDoneFetching(true);
      })
      .catch(error => console.error(error));
  }, []);

  //* Do this when the fetch is done
  useEffect(() => {
    getLocationAsync();
  }, [doneFetching]);

  //functions to get the users location
  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setLocation('Permission to access location was denied');
    }

    let {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({});
    setLocation(JSON.stringify({ latitude, longitude }));

    // Center the map on the location we just fetched.
    setRegion({
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    //console.log(mapRegion);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={{ alignSelf: 'stretch', height: '100%' }}
        region={mapRegion}
      >
        {latitude ? (
          <Marker
            pinColor="blue"
            coordinate={{ latitude: latitude, longitude: longitude }}
            title="This is the marker you selected"
          />
        ) : null}
        {data.map((element, key) => {
          //* Map through all the theatres
          return (
            <Marker
              key={key}
              coordinate={{
                latitude: element.coordinates[0],
                longitude: element.coordinates[1],
              }}
              title={element.name}
              onPress={() => {
                navigation.navigate('Notes', { name: element.name });
                setActiveTab('Notes');
              }}
              description={element.reviews}
            />
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
