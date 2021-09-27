import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Http from '../../libs/http';
import CoinsItem from "./CoinsItem";
import Colors from '../../res/colors';

const CoinsScreen = ( props ) => {
    const [ coins, setCoins ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    useEffect( async () => {
        setLoading( true );
        const res = await Http.instance.get("https://api.coinlore.net/api/tickers/");
        setCoins( res.data );
        setLoading( false );
    }, [] );

    const handlePress = () => {
        console.log( "go to detail", props );
        props.navigation.navigate('Coin Detail');
    };

    return (
        <View
            style={ styles.container }
        >
            { loading ? 
                <ActivityIndicator
                    style={ styles.loading }
                    color="#fff"
                    size="large"
                /> 
                : null   
            }
            <Text
                style={ styles.titleText }
            >Coins Screen</Text>

            <Pressable
                onPress={ handlePress }
                style={ styles.btn }
            >
                <Text
                    style={ styles.btnText }
                >Ir a detail</Text>
            </Pressable>

            <FlatList
                data={ coins }
                renderItem={ ({ item }) => (
                    <CoinsItem item={ item } />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade,
    },
    titleText: {
        color: "black",
        textAlign: "center",
        color: "#fff",
    },
    btn: {
        padding: 8,
        backgroundColor: "blue",
        borderRadius: 8,
        margin: 16
    },
    btnText: {
        color: "#fff",
        textAlign: "center"
    },
    loading: {
        marginTop: 60
    }
});

export default CoinsScreen;