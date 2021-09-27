import React from "react";
import { View, Text, Image, StyleSheet } from 'react-native';
import Colors from '../../res/colors';

const CoinsItem = ({ item }) => {

    const getImgArrow = () => {
        if( item.percent_change_1h > 0 ) {
            return require( "../../assets/arrow_up.png" );
        } else {
            return require( "../../assets/arrow_down.png" );
        }
    };

    return (
        <View style={ styles.container }>
            <View style={ styles.row }>
                <Text style={ styles.symbolText }>{ item.name }</Text>
                <Text style={ styles.nameText }>{ item.symbol }</Text>
                <Text style={ styles.priceText }>{ `$${item.price_usd}` }</Text>
            </View>
            <View style={ styles.row }>
                <Text style={ styles.percentText }>{ item.percent_change_1h }</Text>
                <Image
                style={ styles.imgIcon }
                    source={ getImgArrow() }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        borderBottomColor: Colors.zircon,
        borderBottomWidth: 1,
        marginLeft: Platform.OS == 'ios' ? 16 : 0
    },
    row: {
        flexDirection: "row"
    },
    symbolText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        marginRight: 12
    },
    nameText: {
        color: "#fff",
        fontSize: 14,
        marginRight: 16
    },
    priceText: {
        color: "#fff",
        fontSize: 14
    },
    percentText: {
        color: "#fff",
        fontSize: 12,
        marginRight: 8
    },
    imgIcon: {
        width: 20,
        height: 20
    }
});

export default CoinsItem;