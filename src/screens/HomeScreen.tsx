import { transform } from '@babel/core';
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
    Animated,
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
};


const SearchComponent = (searchState: any) => {
    const floatingSearchButton = () => {
        return (
            <AnimatedTouchable
                style={[
                    styles.floatingSearchButton,
                    {
                        width: scaleAnim
                    }
                ]}
                onPress={animateSearch}
            >
            </AnimatedTouchable>
        )
    };

    const [value, setValue] = useState<number>(377)

    const scaleAnim = useRef<any>(new Animated.Value(60)).current;
    const animateSearch = () => {
        Animated.timing(scaleAnim, {
            toValue: value,
            duration: 700,
            useNativeDriver: false
        }).start(() => setValue(valueFlip(value)));
    };
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

    const valueFlip = (currValue: number): number => {
        let value = ((currValue === 60) ? 377 : 60);
        return value;
    };

    // if (searchState) {
    return (
        <AnimatedTouchable
            style={[
                styles.floatingSearchButton,
                {
                    width: scaleAnim
                }
            ]}
            onPress={animateSearch}
        >
        </AnimatedTouchable>
    )
}
//};

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
    const [searchState, setSearchState] = useState<boolean>(false);


    useEffect(() => {
        SearchBuisness('kingston, ma').then((data) => {
            setBusinesses(data.businesses);
            setSearchedBusinesses(data.businesses);
            setLoading(false);
        })
    }, []);

    useEffect(() => {
        let result = businesses.filter((item) => item.name.toLowerCase().startsWith(search.toLowerCase()));
        result = result.filter((item) => !item.name.toLowerCase().startsWith('napoli'));
        setSearchedBusinesses(result);
    }, [search]);

    if (loading) {
        return <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator animating={true} color={'red'} size={'large'} />
        </View>
    }
    return (
        <View>
            {/* <View style={styles.searchContainer}>
                <TextInput
                    placeholder='Search'
                    placeholderTextColor={'black'}
                    onChangeText={(text) => setSearch(text)}
                    style={{ color: 'black' }}
                />
            </View> */}
            <FlatList
                data={searchedBusinesses}
                keyExtractor={(input) => input.id}
                ItemSeparatorComponent={() => <View style={{ backgroundColor: 'black', height: 1 }} />}
                contentContainerStyle={{ padding: 5 }}
                renderItem={({ item }) => <ListComponent business={item} nav={props.navigation} />}
            />
            <SearchComponent searchState={searchState} />
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
        backgroundColor: 'grey',
        padding: 5,
        alignSelf: 'center',
        width: '97%',
        borderRadius: 60,
        // borderBottomLeftRadius: 25,
        // borderBottomRightRadius: 25
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
