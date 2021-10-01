import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FavoritesScreen from './FavoritesScreen';

const Stack = createStackNavigator();

const FavoritesStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Favorites"
                component={ FavoritesScreen }
            />
        </Stack.Navigator>
    );
};

export default FavoritesStack;
