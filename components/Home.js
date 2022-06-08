import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../config/themeProvider';

const Home = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <View>
        <Text style={[styles.title, { color: theme.textColor }]}>
          THEATRE MAPS
        </Text>
      </View>
      <View style={styles.imagecontainer}>
        <Image style={styles.image} source={require('../assets/masks.png')} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#20315f',
  },
  image: {
    width: 400,
    height: 400,
  },
});

export { Home };
