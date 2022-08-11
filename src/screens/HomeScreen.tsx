import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect, useRef } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
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
            </Text>
            <Text style={styles.addressText}>
                {item.location.address1}, {item.location.city}
            </Text>
            <Image
                style={{ width: '100%', aspectRatio: 1, borderRadius: 13 }}
                source={{ uri: item.image_url, }}
            />
        </TouchableOpacity>)
};


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

    const textInputRef = useRef<TextInput>(undefined)

    const HeaderComponent = () => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', paddingBottom: 4 }}>
                <Image
                    style={{ width: '18%', aspectRatio: 1, resizeMode: 'contain' }}
                    source={{ uri: 'https://www.clipartmax.com/png/full/49-498849_logo-suprem-pizza-logos-de-pizzerias-png.png' }}
                />
                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder='Search'
                        placeholderTextColor={'black'}
                        onChangeText={(text) => setSearch(text)}
                        style={{ color: 'black', flex: 1 }}
                        ref={textInputRef}
                    />
                    <TouchableOpacity
                        onPress={() => { textInputRef.current.clear(); setSearch('') }}
                        style={{ backgroundColor: '#E30004', marginRight: 5, width: '8%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 500 }}
                    >
                        <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>X</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    useEffect(() => {
        SearchBuisness('plymouth, ma').then((data) => {
            setBusinesses(data.businesses);
            let result = data.businesses.filter((item) => item.name.toLowerCase().startsWith(search.toLowerCase()));
            setSearchedBusinesses(result);
            setLoading(false);
        })
    }, []);

    useEffect(() => {
        let result = businesses.filter((item) => item.name.toLowerCase().startsWith(search.toLowerCase()));
        setSearchedBusinesses(result);
    }, [search]);

    if (loading) {
        return <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator animating={true} color={'red'} size={'large'} />
        </View>
    }
    return (
        <View style={{ height: '100%' }}>
            <FlatList
                data={searchedBusinesses}
                keyExtractor={(input) => input.id}
                // ItemSeparatorComponent={() => <View style={{ backgroundColor: '#E30004', height: 2 }} />}
                contentContainerStyle={{ padding: 5 }}
                renderItem={({ item }) => <ListComponent business={item} nav={props.navigation} />}
                ListHeaderComponent={<HeaderComponent />}
                stickyHeaderIndices={[0]}
                ListHeaderComponentStyle={{ marginBottom: 4 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    listItemContainer: {
        padding: 5,
        borderColor: '#E30004',
        borderWidth: 2,
        borderRadius: 13,
        backgroundColor: '#ff2e1f',
        marginBottom: 12,
    },
    titleText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#0B0014'
    },
    addressText: {
        fontSize: 20,
        color: '#0B0014'
    },
    searchContainer: {
        backgroundColor: 'white',
        borderColor: '#0B0014',
        borderWidth: 1,
        padding: 5,
        alignSelf: 'center',
        width: '80%',
        borderRadius: 60,
        marginTop: 12,
        marginLeft: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    floatingSearchButton: {
        width: '15%',
        height: 60,
        // aspectRatio: 1,
        borderRadius: 500,
        backgroundColor: '#f01000',
        position: 'absolute',
        alignSelf: 'flex-end',
        top: '1%',
        right: '2%',
    }
});

export default HomeScreen;
