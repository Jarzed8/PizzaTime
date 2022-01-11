import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import { RootStackParamList } from '../../App';

import { Business, BusinessSearchResponse, SearchBuisness } from '../YelpAPI';


// SearchBuisness('kingston, ma').then((data) => {
//   console.log(data);
// });

const ListComponent = (props: { business: Business, nav: HomeScreenNavigationProp }) => {
    const item = props.business;
    return (
        <TouchableOpacity
            style={styles.listItemContainer}
            onPress={() => { props.nav.push('BusinessScreen', { business: props.business }) }}
            activeOpacity={0.6}
        >
            <Text style={styles.titleText}>
                {item.name}
                {/* ryan gay */}
            </Text>
            <Text style={styles.addressText}>
                {item.location.address1}, {item.location.city}
            </Text>
            <Image
                style={{ width: '100%', aspectRatio: 1, borderRadius: 13 }}
                source={{ uri: item.image_url, }}
            />
        </TouchableOpacity>)
}

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>
export interface HomeProps {
    navigation: HomeScreenNavigationProp;
    route: HomeScreenRouteProp
}

export const HomeScreen = (props: HomeProps) => {
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [searchedBusinesses, setSearchedBusinesses] = useState<Business[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>('');


    useEffect(() => {
        SearchBuisness('kingston, ma').then((data) => {
            setBusinesses(data.businesses);
            setSearchedBusinesses(data.businesses);
            setLoading(false);
        })
    }, [])
    useEffect(() => {
        let result = businesses.filter((item) => item.name.toLowerCase().startsWith(search.toLowerCase()));
        result = result.filter((item) => !item.name.toLowerCase().startsWith('napoli'));
        setSearchedBusinesses(result);
    }, [search])
    if (loading) {
        return <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator animating={true} color={'red'} size={'large'} />
        </View>
    }
    return (
        <View>
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder='Search'
                    placeholderTextColor={'black'}
                    onChangeText={(text) => setSearch(text)}
                    style={{ color: 'black' }}
                />
            </View>
            <FlatList
                data={searchedBusinesses}
                keyExtractor={(input) => input.id}
                ItemSeparatorComponent={() => <View style={{ backgroundColor: 'black', height: 1 }} />}
                contentContainerStyle={{ padding: 5 }}
                renderItem={({ item }) => <ListComponent business={item} nav={props.navigation} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    listItemContainer: {
        padding: 5,
    },
    titleText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'black'
    },
    addressText: {
        fontSize: 20,
    },
    searchContainer: {
        backgroundColor: 'lightgrey',
        padding: 5,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
    }
});

export default HomeScreen;
