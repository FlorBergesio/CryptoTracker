import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from '../../res/colors';
import FavoritesEmptyState from "./FavoritesEmptyState";

const FavoritesScreen = () => {
    return (
        <View style={ styles.container }>
            <FavoritesEmptyState />
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