import { NavigationContainer, RouteProp, StackActions, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Button, Modal, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


export type StackParamList = {
  Home: undefined;
  Details: { itemId: number; otherParam?: string };
  Modal: undefined;
  Custom: { name: string};
};

const Stack = createStackNavigator<StackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Home"
          options={{ headerShown: true }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            headerShown: true,
            headerTitle: 'My Custom Title',
            headerTitleStyle: { color: '#bf0000' },
            headerStyle: { backgroundColor: '#fff444' },
            headerBackTitle: 'Custom Back',
          }}
        />
        <Stack.Screen
          name="Modal"
          component={ModalScreen}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name="Custom"
          options={{ 
            headerShown: true,
            headerTitle: "My Custom Page!!!",
            headerTitleStyle: { color: '#242024' },
            headerStyle: { backgroundColor: '#bf0000' },
          }}
          component={CustomScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

type HomeScreenNavigationProp = StackNavigationProp<StackParamList, 'Home'>;

export function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate('Details', { itemId: 313, otherParam: 'Hello!!!' })
        }
      />
      <Button
        title="Go to Modal"
        onPress={() =>
          navigation.navigate("Modal")
        }
      />
      <Button
        title="Go to Custom Screen"
        onPress={() =>
          navigation.navigate("Custom", { name: "Nathan" })
        }
      />
    </View>
  );
}

type DetailsScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'Details'
>;

type DetailsScreenRouteProp = RouteProp<StackParamList, 'Details'>;

export function DetailsScreen() {
  const { params } = useRoute<DetailsScreenRouteProp>();
  const navigation = useNavigation<DetailsScreenNavigationProp>();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {params.itemId} </Text>
      <Text>otherParam: {params.otherParam} </Text>
      <Button title="Go to Home" onPress={() => navigation.goBack()} />
    </View>
  );
}

type ModalScreenNavigationProp = StackNavigationProp<StackParamList, 'Modal'>;

export function ModalScreen() {
  const navigation = useNavigation<ModalScreenNavigationProp>();

  // Here's where we listen for the modal to close
  const closeAndNavigate = () => {
    const unsubscribe = navigation.addListener('transitionEnd', () => {
      navigation.navigate('Details', { itemId: 123, otherParam: 'test' });
      unsubscribe();
    });

    navigation.dispatch(StackActions.pop(1));
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Modal</Text>
      <Button title="Go to details" onPress={closeAndNavigate} />
    </View>
  );
}

type CustomScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'Custom'
>;

type CustomScreenRouteProp = RouteProp<StackParamList, 'Custom'>;

export function CustomScreen() {
  const { params } = useRoute<CustomScreenRouteProp>();
  const navigation = useNavigation<CustomScreenNavigationProp>();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Custom Screen</Text>
      <Text>Hello {params.name}!!! </Text>
      <Button title="Go to Home" onPress={() => navigation.goBack()} />
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
});
