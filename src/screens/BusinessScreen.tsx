import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { RootStackParamList } from "../../App";

export type BusinessScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BusinessScreen'>
export type BusinessScreenRouteProp = RouteProp<RootStackParamList, 'BusinessScreen'>
export interface BusinessProps {
    navigation: BusinessScreenNavigationProp;
    route: BusinessScreenRouteProp
}

function distanceToMiles(distance: number): string {
    const meters = Math.floor(distance);
    return (meters / 1609).toFixed(2);
}

export const BusinessScreen = (props: BusinessProps) => {
    return (
        <View>
            <View style={styles.headerContainer}>
                <Image
                    style={styles.headerImage}
                    source={{ uri: props.route.params.business.image_url }}
                />
                <View>
                    <Text style={styles.headerText}>{props.route.params.business.name}</Text>
                    <Text style={styles.headerAdress}>{props.route.params.business.location.address1}, {props.route.params.business.location.city}</Text>
                    <Text style={styles.headerAdress}>{props.route.params.business.phone}</Text>
                    <Text style={styles.headerAdress}>{distanceToMiles(props.route.params.business.distance)} {'miles'}</Text>
                    {/* <Text style={styles.headerAdress}>{props.route.params.business.url}</Text> */}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: 'grey',
        alignItems: 'flex-start',
        flexDirection: 'row'
    },
    headerText: {
        color: 'black',
        fontSize: 25
    },
    headerImage: {
        width: '50%',
        aspectRatio: 1,
        //flex: 1
    },
    headerAdress: {
        color: 'black'
    }
});