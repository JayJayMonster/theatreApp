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

  const { tempLatitude, tempLongitude, tempLat, tempLon } = route.params;

  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if (route.params?.tempLat) {
      console.log(`Changed temps: ${tempLat} and ${tempLon}`);
      setLat(tempLat);
      setLon(tempLon);
      setLatitude(null);
      setLongitude(null);
      setRegion({
        latitude: tempLat,
        longitude: tempLon,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [route.params?.tempLat]);

  useEffect(() => {
    if (route.params?.tempLatitude) {
      console.log(
        `Changed temp for list: ${tempLatitude} and ${tempLongitude}`
      );
      setLat(null);
      setLon(null);
      setLatitude(tempLatitude);
      setLongitude(tempLongitude);
      setRegion({
        latitude: tempLatitude,
        longitude: tempLongitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [route.params?.tempLatitude]);

  //functions use fetch to get theatre data
  useEffect(() => {
    fetch('https://stud.hosted.hr.nl/1009321/theatreApp/theatres.json', {
      headers: {
        'Cache-Control': 'no-cache',
      },
    })
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
      latitude: latitude,
      longitude: longitude,
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
        {data.map((element, key) => {
          //* Map through all the theatres
          let color = 'purple';

          if (lat == element.coordinates[0] && lon == element.coordinates[1]) {
            color = 'green';
          } else if (
            latitude == element.coordinates[0] &&
            longitude == element.coordinates[1]
          ) {
            color = 'yellow';
          }

          return (
            <Marker
              pinColor={color}
              key={key}
              coordinate={{
                latitude: element.coordinates[0],
                longitude: element.coordinates[1],
              }}
              title={element.name}
              onPress={() => {
                navigation.navigate('Notes', {
                  name: element.name,
                  latitude: element.coordinates[0],
                  longitude: element.coordinates[1],
                });
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
