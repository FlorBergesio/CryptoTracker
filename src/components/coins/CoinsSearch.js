import React, { useState } from "react";
import { View, TextInput, Platform, StyleSheet } from 'react-native';
import Colors from "../../res/colors";

const CoinsSearch = ( props ) => {
    const [ query, setQuery ] = useState("");

    const handleText = ( queryData ) => {
        setQuery( queryData );
        if ( props.onChange ) {
            props.onChange( queryData );
        }
    };

    return (
        <View>
            <TextInput
                onChangeText={ handleText }
                value={ query }
                placeholder="Search coin"
                placeholderTextColor="#fff"
                style={[
                    styles.textInput,
                    Platform.OS == 'ios' ?
                    styles.textInputIOS :
                    styles.textInputAndroid
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        height: 46,
        backgroundColor: Colors.charade,
        paddingLeft: 16,
        color: "#fff"
    },
    textInputAndroid: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.zircon
    },
    textInputIOS: {
        margin: 8,
        borderRadius: 8
    }
});

export default CoinsSearch;