import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import colors from 'src/constants/colors';
import Home from 'src/screens/Home';
import QrScanner from 'src/screens/QrScanner';

const Stack = createNativeStackNavigator();

const QrNavigator = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.LIGHT} barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="QrScanner" component={QrScanner} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default QrNavigator;
