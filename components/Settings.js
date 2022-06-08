import { StyleSheet, View, Text, Button } from 'react-native';
import { useTheme } from '../config/themeProvider';

export function Settings() {
  const { theme, updateTheme } = useTheme();
  const changeTheme = () => updateTheme(theme.themeMode);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <Text style={[styles.text, { color: theme.textColor }]}>SETTINGS</Text>
      <Button
        title="Dark Mode"
        onPress={changeTheme}
        color={theme.nav.backgroundColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
