import React, { useEffect, useState }  from "react";
import { View, Text, Image, SectionList, FlatList, StyleSheet, Pressable, Alert } from 'react-native';
import Colors from "../../res/colors";
import Http from "../../libs/http";
import Storage from "../../libs/storage";
import CoinMarketItem from "./CoinMarketItem";

const CoinDetailScreen = ( props ) => {
    const [ coin, setCoin ] = useState( props.route.params.coin );
    const [ markets, setMarkets ] = useState( [ ] );
    const [ isFavorite, setIsFavorite ] = useState( false );
        
    useEffect(() => {
        props.navigation.setOptions({ title: coin.symbol });
        getMarkets( coin.id );
        getFavorite();
    }, [ coin ]);

    const toggleFavorite = () => {
        if ( isFavorite ) {
            removeFavorite();
        } else {
            addFavorite();
        }
    };

    const addFavorite = async () => {
        const stringCoin = JSON.stringify( coin );
        const key = `favorite-${ coin.id }`;
        const stored = await Storage.instance.store( key, stringCoin );
        if ( stored ) {
            setIsFavorite( true );
        }
    };

    const removeFavorite = () => {
        Alert.alert("Remove favorite", "Are you sure?", [
            {
                text: "Cancel",
                onPress: () => {},
                style: "cancel"
            },
            {
                text: "Remove",
                onPress: async () => {
                    const key = `favorite-${ coin.id }`;
                    const removed = await Storage.instance.remove( key );
                    if ( removed ) {
                        setIsFavorite( false );
                    }
                },
                style: "destructive"
            }
        ]);
    };

    const getFavorite = async () => {
        try {
            const key = `favorite-${ coin.id }`;
            const favStr = await Storage.instance.get( key );
            if ( favStr !== null ) {
                setIsFavorite( true );
            }
        } catch (err) {
            console.log("Get favorites err", err);
        }
    };

    const getSymbolIcon = ( nameid ) => {
        if (nameid) {
            
            const symbol = nameid.toLowerCase().replace(" ", "-");
    
            return `https://c1.coinlore.com/img/25x25/${symbol}.png`
        }
    }

    const getSections = ( coin ) => {
        const sections = [
            {
                title: "Market cap",
                data: [ coin.market_cap_usd ]
            },
            {
                title: "Volume 24hs",
                data: [ coin.volume24 ]
            },
            {
                title: "Change 24hs",
                data: [ coin.percent_change_24h ]
            }
        ];

        return sections;
    };

    const getMarkets = async ( coinId ) => {
        const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;

        const marketsData = await Http.instance.get( url );

        setMarkets( marketsData );
    };

    return (
        <View style={ styles.container }>

            <View style={ styles.subheader }>
                <View style={ styles.row }>
                    <Image
                        source={{ uri: getSymbolIcon( coin.nameid ) }}
                        style={ styles.iconImg }
                    />
                    <Text style={ styles.titleText }>{ coin.name }</Text>
                </View>
            
                <Pressable
                    onPress={ toggleFavorite }
                    style={[
                        styles.btnFavorite,
                        isFavorite
                            ? styles.btnFavoriteRemove
                            : styles.btnFavoriteAdd
                    ]}
                >
                    <Text style={ styles.btnFavoriteText }>{ isFavorite ? "Remove favorite" : "Add Favorite"}</Text>
                </Pressable>

            </View>

            <SectionList 
                sections={ getSections( coin ) }
                keyExtractor={ ( item  ) => item }
                renderSectionHeader={ ({ section }) => 
                    <View style={ styles.sectionHeader }>
                        <Text style={ styles.sectionText }>{ section.title }</Text>
                    </View>
                }
                renderItem={ ({ item }) => 
                    <View style={ styles.sectionItem }>
                        <Text style={ styles.itemText }>{ item }</Text>
                    </View>
                }
                style={ styles.section }
            />

            <Text style={ styles.marketTitle }>Markets</Text>

            <FlatList
                horizontal={ true }
                data={ markets }
                renderItem={ ({ item }) => <CoinMarketItem item={ item } /> }
                style={ styles.horizontalList }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade
    },
    row: {
        flexDirection: "row"
    },
    subheader: {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    titleText: {
        fontSize: 16,
        color: Colors.white,
        fontWeight: "bold",
        marginLeft: 8
    },
    iconImg: {
        width: 25,
        height: 25
    },
    section: {
        maxHeight: 220
    },
    sectionHeader: {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        padding: 8
    },
    sectionItem: {
        padding: 8
    },
    itemText: {
        color: Colors.white,
        fontSize: 14
    },
    sectionText: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: "bold"
    },
    marketTitle: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 16,
        marginLeft: 16
    },
    horizontalList: {
        maxHeight: 100,
        marginLeft: 16
    },
    btnFavorite: {
        padding: 8,
        borderRadius: 8
    },
    btnFavoriteText: {
        color: Colors.white
    },
    btnFavoriteAdd: {
        backgroundColor: Colors.picton
    },
    btnFavoriteRemove: {
        backgroundColor: Colors.carmine
    }
});

export default CoinDetailScreen;