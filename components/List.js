import { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../config/themeProvider';
import { Dimensions } from 'react-native-web';
const COLORS = { primary: '#AD48AF', white: '#fff' };

export function List() {
  const [theatres, setTheatres] = useState([]);
  const [textInput, setTextInput] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    getTheatresFromUserDevice();
  }, []);

  useEffect(() => {
    saveTheatreToUserDevice(theatres);
  }, [theatres]);

  //functions add a new theatre
  const addTheatre = () => {
    if (textInput == '') {
      Alert.alert('Error', 'Please input a theatre');
    } else {
      const newTheatre = {
        id: Math.random(),
        task: textInput,
        completed: false,
      };
      setTheatres([...theatres, newTheatre]);
      setTextInput('');
    }
  };

  //functions save it using Async storage
  const saveTheatreToUserDevice = async theatre => {
    try {
      const stringifyTheatres = JSON.stringify(theatre);
      await AsyncStorage.setItem('theatres', stringifyTheatres);
    } catch (error) {
      console.log(error);
    }
  };

  //functions get it from async storage
  const getTheatresFromUserDevice = async () => {
    try {
      const theatres = await AsyncStorage.getItem('theatres');
      if (theatres != null) {
        setTheatres(JSON.parse(theatres));
      }
    } catch (error) {
      console.log(error);
    }
  };

  //functions delete a theatre
  const deleteTheatre = theatreId => {
    const newTheatreItem = theatres.filter(item => item.id != theatreId);
    setTheatres(newTheatreItem);
  };

  //functions delete all theatres
  const clearAllTheatres = () => {
    Alert.alert('Confirm', 'Clear all theaters?', [
      {
        text: 'Yes',
        onPress: () => setTheatres([]),
      },
      {
        text: 'No',
      },
    ]);
  };

  const goToMarker = () => {
    console.log('go to the marker page');
  };

  //functions a new list item
  const ListItem = ({ theatre }) => {
    return (
      <View
        style={[styles.listItem, { backgroundColor: theme.backgroundColor }]}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              color: COLORS.primary,
            }}
          >
            {theatre?.task}
          </Text>
        </View>
        <TouchableOpacity onPress={() => goToMarker()}>
          <View style={styles.searchIcon}>
            <Icon name="search" size={20} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTheatre(theatre.id)}>
          <View style={styles.actionIcon}>
            <Icon name="delete" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.textColor }]}>
          YOUR OWN LIST OF THEATRES
        </Text>
        <Icon
          name="delete"
          size={25}
          color={COLORS.primary}
          onPress={clearAllTheatres}
        />
      </View>
      <ScrollView>
        {theatres.map((item, key) => {
          return <ListItem theatre={item} key={key} />;
        })}
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: theme.backgroundColor }]}>
        <View
          style={[
            styles.inputContainer,
            { backgroundColor: theme.backgroundColor },
          ]}
        >
          <TextInput
            style={[styles.text, { color: theme.textColor }]}
            value={textInput}
            placeholder="ADD THEATRE"
            placeholderTextColor="#911691"
            onChangeText={text => setTextInput(text)}
          />
        </View>
        <TouchableOpacity onPress={addTheatre}>
          <View style={styles.iconContainer}>
            <Icon name="add" color="white" size={30} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  placeHolderText: {
    color: 'grey',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  footer: {
    marginBottom: 80,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  text: {
    color: 'grey',
    fontSize: 16,
    marginTop: 15,
  },
  inputContainer: {
    height: 50,
    paddingHorizontal: 20,
    elevation: 40,
    backgroundColor: COLORS.white,
    flex: 1,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.primary,
    elevation: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listItem: {
    padding: 20,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },
  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    marginLeft: 5,
    borderRadius: 3,
  },
  searchIcon: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    marginLeft: 5,
    borderRadius: 3,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#20315f',
  },
});
