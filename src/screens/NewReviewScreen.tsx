import { NavigationRouteContext, RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Modal, FlatList } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { allStyles } from "../allStyles";

export type NewReviewScreenNavigationProp = StackNavigationProp<RootStackParamList, 'NewReviewScreen'>
export type NewReviewScreenRouteProp = RouteProp<RootStackParamList, 'NewReviewScreen'>
export interface newReviewProps {
    navigation: NewReviewScreenNavigationProp;
    route: NewReviewScreenRouteProp
};

let pizzaTypes: any[] = [
    {
        name: 'Cheese Pizza',
        selected: false
    },
    {
        name: 'Peperoni Pizza',
        selected: false
    },
    {
        name: 'Meatball Pizza',
        selected: false
    },
    {
        name: 'Onion Pizza',
        selected: false
    },
    {
        name: 'Mushroom Pizza',
        selected: false
    },
    {
        name: 'Alfredo Pizza',
        selected: false
    },
    {
        name: 'Specialty Pizza',
        selected: false
    },
    {
        name: 'Other Pizza',
        selected: false
    },
];

let cooknessTypes: any[] = [
    {
        name: 'Uncooked',
        selected: false
    },
    {
        name: 'Light Cook',
        selected: false
    },
    {
        name: 'Perfect',
        selected: false
    },
    {
        name: 'Well Done',
        selected: false
    },
    {
        name: 'Burnt',
        selected: false
    }
];

let cheeseRatingTypes: any[] = [
    {
        name: '1',
        selected: false
    },
    {
        name: '2',
        selected: false
    },
    {
        name: '3',
        selected: false
    },
    {
        name: '4',
        selected: false
    },
    {
        name: '5',
        selected: false
    },
];

let sauceRatingTypes: any[] = [
    {
        name: '1',
        selected: false
    },
    {
        name: '2',
        selected: false
    },
    {
        name: '3',
        selected: false
    },
    {
        name: '4',
        selected: false
    },
    {
        name: '5',
        selected: false
    },
];

let overallRatingTypes: any[] = [
    {
        name: '1',
        selected: false
    },
    {
        name: '2',
        selected: false
    },
    {
        name: '3',
        selected: false
    },
    {
        name: '4',
        selected: false
    },
    {
        name: '5',
        selected: false
    },
];


export const NewReviewScreen = (props: newReviewProps) => {
    const [pizzaCount, setPizzaCount] = useState<number>(1);
    const [pizzaType, setPizzaType] = useState<string>('Select Pizza');
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [cookness, setCookness] = useState<string>('Perfect');
    const [cheeseRating, setCheeseRating] = useState<number>(0);
    const [sauceRating, setSauceRating] = useState<number>(0);
    const [overallRating, setOverallRating] = useState<number>(0);
    const [userName, setUserName] = useState<string>('');
    const [review, setReview] = useState<string>('');

    function selector(selector: string, data: any, setValue: any) {
        data.forEach((element: any) => element.selected = false);
        const findIndex = (element: any) => element.name == selector;
        setValue(selector);
        const index = data.findIndex(findIndex);
        data[index].selected = true;
    };

    function starSelector(selector: string, data: any, name: string) {
        let setValue: Function;
        switch (name) {
            case 'cheese':
                setValue = setCheeseRating;
                break;
            case 'sauce':
                setValue = setSauceRating;
                break;
            case 'overall':
                setValue = setOverallRating;
                break;
            default:
                console.log('Error: Invalid star setValue')
        }
        data.forEach((element: any) => element.selected = false);
        const findIndex = (element: any) => element.name == selector;
        setValue(selector);
        const index = data.findIndex(findIndex);
        data[index].selected = true;
        for (let i = 0; i < index; i++) {
            data[i].selected = true;
        };
    };

    function submitReview() {
        const reviewObj = {
            business: {
                businessName: props.route.params.business.name,
                businessID: props.route.params.business.id,
                businessLocation: props.route.params.business.location
            },
            pizza: {
                pizzaType: pizzaType,
                pizzaCount: pizzaCount,
            },
            data: {
                cookness: cookness,
                cheeseRating: cheeseRating,
                sauceRating: sauceRating,
                overallRating: overallRating
            },
            review: {
                userName: userName,
                review: review
            }
        };
        console.log(reviewObj);
        props.navigation.goBack();
    };

    const AddPizzaComponent: React.FC<{}> = () => {
        return (
            <View style={[allStyles.shadowContainer, styles.pizzaContainer]}>
                <TouchableOpacity style={styles.addPizzaButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.addPizzaText}>Add Pizza</Text>
                </TouchableOpacity>
                <Text style={styles.addPizzaType}>{pizzaType}</Text>
                <TextInput
                    placeholder="1"
                    placeholderTextColor={'black'}
                    style={styles.addPizzaCount}
                    onChangeText={(text) => setPizzaCount(+text)}
                    keyboardType='numeric'
                    value={pizzaCount.toString()}
                />
            </View>
        )
    };

    const PizzaTypeComponent: React.FC<{ pizza: any }> = (props) => {
        return (
            <View style={{ marginTop: 12 }}>
                <View style={{ flexDirection: 'row', padding: 0 }}>
                    <TouchableOpacity
                        style={{ width: '15%', aspectRatio: 1, borderRadius: 25, borderWidth: 1, borderColor: 'black', marginRight: 6, backgroundColor: props.pizza.selected ? 'red' : 'white' }}
                        onPress={() => selector(props.pizza.name, pizzaTypes, setPizzaType)}
                    >
                    </TouchableOpacity>
                    <Text style={{ color: 'black' }}>{props.pizza.name}</Text>
                </View>
            </View>
        )
    };

    const CooknessP = () => {
        const data: any[] = cooknessTypes;
        return (
            <View style={{ flexDirection: 'row', paddingHorizontal: 4 }}>
                {data.map((value, index) => {
                    // const selected = value.name === cookness
                    return <View key={`${index}`} style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            style={[styles.cooknessSelector, { backgroundColor: value.selected ? 'red' : 'white' }]}
                            onPress={() => selector(value.name, cooknessTypes, setCookness)}
                        />
                        <Text style={{ color: 'black' }}>{value.name}</Text>
                    </View>
                }
                )}
            </View>
        )
    };

    const StarScale = (props: { ratingType: any, name: string }) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                {props.ratingType.map((value: any, index: any) =>
                    <TouchableOpacity
                        key={`${index}`}
                        style={[styles.ratingCircle, { backgroundColor: value.selected ? 'yellow' : 'white' }]}
                        onPress={() => starSelector(value.name, props.ratingType, props.name)}
                    />
                )}
            </View>
        )
    };

    const backButton = '<';

    return (
        <View style={[allStyles.parentContainer]}>

            <View style={{ flexDirection: 'row', width: '100%', alignContent: 'center' }}>
                <TouchableOpacity
                    style={styles.floatingButton}
                    onPress={() => props.navigation.goBack()}
                >
                    <Text style={{ color: 'black', fontSize: 30, fontWeight: 'bold' }}>{backButton}</Text>
                </TouchableOpacity>
                {/* BackButton */}

                <Text style={{ color: 'black' }}>{props.route.params.business.name}</Text>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={[styles.modalContainer, allStyles.shadowContainer]}>
                    <FlatList
                        data={pizzaTypes}
                        renderItem={({ item }) => <PizzaTypeComponent pizza={item} />}
                        keyExtractor={item => item.name}
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}

                    />
                    <TouchableOpacity
                        style={{ height: 'auto', width: 'auto', borderRadius: 25, backgroundColor: 'red', alignSelf: 'center', marginTop: 'auto', margin: 12 }}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={{ padding: 10, color: 'black' }}>Add Pizza</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            {/*Add pizza modal*/}

            <AddPizzaComponent />
            {/*add pizza component*/}

            <View style={allStyles.separator} />

            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#fff8e8', '#B87333', '#323d45']} style={styles.cooknessScale}>
            </LinearGradient>
            <CooknessP />
            {/*cookness selector*/}

            <View style={allStyles.separator} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 12 }}>
                <View style={[allStyles.shadowContainer, { width: '48%', alignSelf: 'flex-start', alignItems: 'center' }]}>
                    <Text style={{ color: 'black' }}>Cheese Rating</Text>
                    <StarScale ratingType={cheeseRatingTypes} name={'cheese'} />
                </View>
                <View style={[allStyles.shadowContainer, { width: '48%', alignSelf: 'flex-start', alignItems: 'center' }]}>
                    <Text style={{ color: 'black' }}>Sauce Rating</Text>
                    <StarScale ratingType={sauceRatingTypes} name={'sauce'} />
                </View>
            </View>
            <View style={[allStyles.shadowContainer, { width: '48%', alignSelf: 'center', alignItems: 'center', marginTop: 12 }]}>
                <Text style={{ color: 'black' }}>Overall Rating</Text>
                <StarScale ratingType={overallRatingTypes} name={'overall'} />
            </View>
            {/*Cheese, sauce, and overall ratings*/}

            <View style={allStyles.separator} />

            <TextInput
                placeholder="Enter Username"
                placeholderTextColor={'black'}
                style={[allStyles.shadowContainer, { width: '100%', marginTop: 12 }]}
                onChangeText={(text) => setUserName(text)}
                value={userName}
            />
            {/*Review Username*/}
            <TextInput
                placeholder="Review"
                placeholderTextColor={'black'}
                style={[allStyles.shadowContainer, { width: '100%', height: '22%', marginTop: 12 }]}
                onChangeText={(text) => setReview(text)}
                value={review}
                multiline={true}
                textAlignVertical={'top'}
            />
            {/*Review body*/}

            <TouchableOpacity
                style={{ backgroundColor: 'red', width: '35%', height: '8%', borderRadius: 15, marginTop: 12, alignItems: 'center', justifyContent: 'center' }}
                onPress={() => submitReview()}>
                <Text style={{ color: 'black', fontSize: 18 }}>Submit{'\n'}Review</Text>
            </TouchableOpacity>
            {/*Submit review*/}

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: '95%',
        paddingVertical: 12,
        flex: 1,
    },
    modalContainer: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
        width: '75%',
        height: '60%',
        backgroundColor: 'black',
        marginTop: 20
    },
    floatingButton: {
        width: '15%',
        aspectRatio: 1,
        borderRadius: 500,
        backgroundColor: 'red',
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 'auto',
        alignSelf: 'flex-start',
        marginBottom: 5,
        zIndex: 1
    },
    pizzaContainer: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    addPizzaButton: {
        width: '30%',
        height: '100%',
        borderRadius: 15,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    addPizzaText: {
        color: 'black',
        fontSize: 14
    },
    addPizzaType: {
        marginLeft: 12,
        color: 'black',
        fontSize: 16
    },
    addPizzaOther: {
        backgroundColor: 'red'
    },
    addPizzaCount: {
        marginLeft: 'auto'
    },
    cooknessScale: {
        marginTop: 12,
        borderWidth: 2,
        borderColor: 'black',
        height: '8%',
        width: '100%',
        borderRadius: 15,
    },
    cooknessSelector: {
        width: '22%',
        aspectRatio: 1,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 500,
        marginTop: 5
    },
    ratingCircle: {
        width: 20,
        height: 20,
        borderRadius: 500,
        borderColor: 'black',
        borderWidth: 2,
        margin: 5
    },
});