import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FavoritesEmptyState = () => {
    return (
        <View style={ styles.container }>
            <Text style={ styles.text }>You don't have any favorites yet. Go add some!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center"
    },
    text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
        alignSelf: "center"
    }
});

export default FavoritesEmptyState;