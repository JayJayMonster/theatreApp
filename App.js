import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './navigation/AppNavigator';
import { React } from 'react';
import ThemeProvider from './config/themeProvider';
import ThemeWrapper from './config/themeWrapper';

export default function App() {
  return (
    <ThemeProvider>
      <ThemeWrapper>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ThemeWrapper>
    </ThemeProvider>
  );
}
