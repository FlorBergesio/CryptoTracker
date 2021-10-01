//import AsyncStorage from "@react-native-community/async-storage";

import AsyncStorage from "@react-native-async-storage/async-storage";

class Storage {
    static instance = Storage();

    store = async () => {
        try {
            await AsyncStorage.setItem( key, value );
            return true;
        } catch ( err ) {
            console.log( "Storage store err", err );
            return false;
        }
    };

    get = async ( key ) => {
        try {
            return await AsyncStorage.getItem( key );
        } catch ( err ) {
            console.log("Storage get err", err);
            throw Error( err );
        }
    };

    multiGet = async ( keys ) => {
        try {
            return await AsyncStorage.multiGet( keys );
        } catch ( err ) {
            console.log("Storage multiGet err", err);
            throw Error( err );
        }
    };

    getAllKeys = async () => {
        try {
            return await AsyncStorage.getAllKeys();
        } catch ( err ) {
            console.log("Storage getAllKeys err", err);
            throw Error( err );
        }
    };

    remove = async ( key ) => {
        try {
            await AsyncStorage.removeItem( key );
            return true;
        } catch ( err ) {
            console.log("Storage remove err", err);
            return false;
        }
    };
}