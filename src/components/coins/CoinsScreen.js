import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Http from '../../libs/http';
import CoinsItem from "./CoinsItem";
import CoinsSearch from "./CoinsSearch";
import Colors from '../../res/colors';

const CoinsScreen = ( props ) => {
    const [ coins, setCoins ] = useState([]);
    const [ allCoins, setAllCoins ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    useEffect( () => {
        getCoins();
    }, [] );

    const getCoins = async () => {
        setLoading( true );
        const res = await Http.instance.get("https://api.coinlore.net/api/tickers/");
        setCoins( res.data );
        setAllCoins( res.data );
        setLoading( false );
    };

    const handlePress = ( coin ) => {
        props.navigation.navigate('Coin Detail', { coin });
    };

    const handleSearch = ( query ) => {
        const coinsFiltered = allCoins.filter(( coin ) => {
            return coin.name.toLowerCase().includes( query.toLowerCase() ) || coin.symbol.toLowerCase().includes( query.toLowerCase() );
        });

        setCoins( coinsFiltered );
    };

    return (
        <View
            style={ styles.container }
        >
            <CoinsSearch
                onChange={ handleSearch }
            />

            { loading ? 
                <ActivityIndicator
                    style={ styles.loading }
                    color="#fff"
                    size="large"
                /> 
                : null   
            }
            
            <FlatList
                data={ coins }
                renderItem={ ({ item }) => (
                    <CoinsItem
                        item={ item }
                        onPress={ () => handlePress( item ) }
                    />
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