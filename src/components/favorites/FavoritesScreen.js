import React, { useState, useCallback } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../../res/colors';
import FavoritesEmptyState from "./FavoritesEmptyState";
import CoinsItem from "../coins/CoinsItem";
import Storage from '../../libs/storage';

const FavoritesScreen = ( props ) => {
    const [ favorites, setFavorites ] = useState( [] );

    useFocusEffect( useCallback( () => {
        const cleanup = getFavorites();
        return () => cleanup;
    }, [] ) );

    const getFavorites = async () => {
        try {
            const allKeys = await Storage.instance.getAllKeys();
            const favKeys = allKeys.filter( key => key.includes("favorite-") );
            const favoritesFull = await Storage.instance.multiGet( favKeys );
            
            const favoritesMapped = favoritesFull.map( fav => JSON.parse(fav[1]) );
            setFavorites( [...favoritesMapped] );
        } catch ( err ) {
            console.log( "Get favorites err", err );
        }
    };

    const handlePress = ( coin ) => {
        props.navigation.navigate("Coin Detail", { coin });
    };

    return (
        <View style={ styles.container }>
            {
                favorites.length > 0
                ? <FlatList
                        data={ favorites }
                        renderItem={ ({ item }) => (
                            <CoinsItem
                                item={ item }
                                onPress={ () => handlePress( item ) }
                            />
                        )}
                    />
                : <FavoritesEmptyState />
            }            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.charade,
        flex: 1
    }
});

export default FavoritesScreen;