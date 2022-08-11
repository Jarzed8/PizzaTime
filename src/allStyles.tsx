import React from "react";
import { StyleSheet } from "react-native";

export const allStyles = StyleSheet.create({
    shadowContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        backgroundColor: '#b8b7b6',
        borderRadius: 15,
    },
    parentContainer: {
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: '95%',
        paddingVertical: 12,
        flex: 1,
    },
    separator: {
        width: '100%',
        height: 2,
        backgroundColor: 'black',
        marginTop: 12
    }
});