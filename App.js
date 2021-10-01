import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import CoinsStack from './src/components/coins/CoinsStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import Colors from './src/res/colors';

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={{
          tabBarStyle:{
            backgroundColor: Colors.blackPearl
          },
          headerShown: false
        }}
      >
        <Tabs.Screen 
          name="Coins"
          component={ CoinsStack }
          options={{
            tabBarIcon: ({ size, color }) => (
              <Image 
                source={ require('./src/assets/bank.png') }
                style={{ tintColor: color, width: size, height: size }}
              />
            )
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;
