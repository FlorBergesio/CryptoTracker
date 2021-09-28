import React, { useEffect, useState }  from "react";
import { View, Text, Image, SectionList, StyleSheet } from 'react-native';
import Colors from "../../res/colors";

const CoinDetailScreen = ( props ) => {
    const [ coin, setCoin ] = useState( props.route.params.coin );
    
    
    useEffect(() => {
        props.navigation.setOptions({ title: coin.symbol });
    }, [ coin ]);

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

    return (
        <View style={ styles.container }>
            <View style={ styles.subheader }>
                <Image
                    source={{ uri: getSymbolIcon( coin.nameid ) }}
                    style={ styles.iconImg }
                />
                <Text style={ styles.titleText }>{ coin.name }</Text>
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
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade
    },
    subheader: {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        padding: 16,
        flexDirection: "row"
    },
    titleText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        marginLeft: 8
    },
    iconImg: {
        width: 25,
        height: 25
    },
    sectionHeader: {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        padding: 8
    },
    sectionItem: {
        padding: 8
    },
    itemText: {
        color: "#fff",
        fontSize: 14
    },
    sectionText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold"
    }
});

export default CoinDetailScreen;