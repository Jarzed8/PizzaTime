import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, StyleSheet, Text, Image, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { RootStackParamList } from "../../App";
import LinearGradient from 'react-native-linear-gradient';
import allData from "../testData/allData.json";
import { allStyles } from "../allStyles";

export type BusinessScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BusinessScreen'>
export type BusinessScreenRouteProp = RouteProp<RootStackParamList, 'BusinessScreen'>
export interface BusinessProps {
    navigation: BusinessScreenNavigationProp;
    route: BusinessScreenRouteProp
};

const getCookness = (cookness: number): { position: number, text: string } => {
    switch (cookness) {
        case 0:
            return { position: screenWidth * -0.38, text: 'Uncooked' };
        case 1:
            return { position: screenWidth * -0.18, text: 'Light Cook' };
        case 2:
            return { position: 0, text: 'Perfect' };
        case 3:
            return { position: screenWidth * 0.18, text: 'Well Done' };
        case 4:
            return { position: screenWidth * 0.38, text: 'Burnt' };
        default:
            console.log('Error: No cookness value')
            return { position: 0, text: 'Perfect' };
    };
};

function distanceToMiles(distance: number): string {
    const meters = Math.floor(distance);
    return (meters / 1609).toFixed(2);
};

function formatPhone(phone: string): string {
    const clean = phone.replace('+1', '');
    const match = clean.match(/^(\d{3})(\d{3})(\d{4})$/)
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
};

const StarScale: React.FC<{ rating: number }> = (props) => {
    const rating = props.rating > 5 ? 5 : props.rating;
    const ratings: boolean[] = [];
    for (let i = 0; i < 5; i++) {
        ratings.push(i < rating)
    }
    return (
        <View style={{ flexDirection: 'row' }}>
            {ratings.map((value, index) => <View key={`${index}`} style={[styles.ratingCircle, { backgroundColor: value ? 'yellow' : 'white' }]} />)}
        </View>
    )
};

const ListComponent: React.FC<{}> = () => { //Makes pie labels
    const data: any[] = allData.pieData;
    return (
        <View>
            {data.map((value, index) =>
                <View key={`${index}`} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={[styles.pieLabelColor, { backgroundColor: value.color }]}>
                    </View>
                    <Text style={styles.pieLabelText}>
                        {value.name}
                    </Text>
                </View>
            )}
        </View>
    )
};

const ReviewComponent: React.FC<{}> = () => {
    const data: any[] = allData.reviews
    return (
        <View style={{ width: '100%', alignItems: 'center' }}>
            {data.map((value, index) =>
                <View key={`${index}`} style={[allStyles.shadowContainer, styles.reviewContainer]}>
                    <Text style={{ color: 'black' }}>{value.userName}</Text>
                    <StarScale rating={value.rating} />
                    <Text style={{ color: 'black' }}>{value.review}</Text>
                </View>
            )}
        </View>
    )
};

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

export const BusinessScreen: React.FC<BusinessProps> = (props: BusinessProps) => {
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    };

    const CooknessP = (props: { position: number, text: string }) => {
        return (
            <View style={{ left: props.position, alignItems: 'center' }}>
                <View style={styles.arrowUp} />
                <Text style={{ color: 'black' }}>{props.text}</Text>
            </View>
        )
    };

    const cookness = getCookness(allData.data.cookness);
    const backButton = '<';

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.viewContainer}>

                <TouchableOpacity
                    style={styles.floatingButton}
                    onPress={() => props.navigation.goBack()}
                >
                    <Text style={{ color: 'black', fontSize: 30, fontWeight: 'bold' }}>{backButton}</Text>
                </TouchableOpacity>

                <Image
                    style={styles.headerImage}
                    source={{ uri: props.route.params.business.image_url }}
                />

                <View style={allStyles.separator} />

                <TouchableOpacity
                    style={styles.startReviewContainer}
                    onPress={() => { props.navigation.push('NewReviewScreen', { business: props.route.params.business }) }}
                >
                    <Text style={styles.startReviewText}>Start a new review</Text>
                </TouchableOpacity>

                <View style={allStyles.separator} />

                <View style={[styles.infoContainer, { padding: 10 }]}>
                    <Text style={styles.headerText}>{props.route.params.business.name}</Text>
                    <Text style={styles.headerAdress}>{props.route.params.business.location.address1}, {props.route.params.business.location.city}</Text>
                    <Text style={styles.headerAdress}>{formatPhone(props.route.params.business.phone)}</Text>
                    <Text style={styles.headerAdress}>{distanceToMiles(props.route.params.business.distance)} {'miles'}</Text>
                    {/* <Text style={styles.headerAdress}>{props.route.params.business.url}</Text> */}
                </View>

                <View style={allStyles.separator} />

                <View style={[styles.ratingContainer]}>
                    <Text style={{ color: 'black', fontSize: 16 }}>Overall Rating</Text>
                    <StarScale rating={allData.data.overallRating} />
                </View>

                <View style={allStyles.separator} />

                <View style={[styles.pieContainer]}>
                    <PieChart
                        data={allData.pieData}
                        width={screenWidth * 0.95}
                        height={200}
                        chartConfig={chartConfig}
                        accessor={"count"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        center={[0, 0]}
                        absolute
                        hasLegend={false}
                    />
                    <View style={styles.pieLabelContainer} >
                        <ListComponent />
                    </View>
                </View>

                <View style={allStyles.separator} />

                <View style={[styles.cooknessContainer]}>
                    <Text style={{ color: 'black', fontSize: 16 }}>Cookness Rating</Text>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#fff8e8', '#B87333', '#323d45']} style={styles.cooknessScale}>
                    </LinearGradient>
                    <CooknessP position={cookness.position} text={cookness.text} />
                </View>

                <View style={allStyles.separator} />

                <View style={styles.cheeseSauceContainer}>
                    <View style={[styles.cheeseContainer]}>
                        <Text style={{ color: 'black' }}>Cheese Rating</Text>
                        <StarScale rating={allData.data.cheeseRating} />
                    </View>
                    <View style={[styles.sauceContainer]}>
                        <Text style={{ color: 'black' }}>Sauce Rating</Text>
                        <StarScale rating={allData.data.sauceRating} />
                    </View>
                </View>

                <View style={allStyles.separator} />

                <Text style={{ color: 'black', marginTop: 8, fontSize: 16 }}>User Reviews</Text>
                <ReviewComponent />

            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    scrollContainer: {
        minHeight: '100%',
    },
    floatingButton: {
        width: '15%',
        aspectRatio: 1,
        borderRadius: 500,
        position: 'absolute',
        backgroundColor: 'red',
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 'auto',
        alignSelf: 'flex-start',
        margin: 5,
        zIndex: 1
    },
    startReviewContainer: {
        width: '95%',
        height: screenHeight * 0.05,
        backgroundColor: 'red',
        marginTop: 12,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    startReviewText: {
        color: 'black',
        fontSize: 18
    },
    viewContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: 20
    },
    headerContainer: {
        backgroundColor: 'grey',
    },
    infoContainer: {
        alignItems: 'center',
        width: '95%',
    },
    headerText: {
        color: 'black',
        fontSize: 25
    },
    headerImage: {
        width: '100%',
        height: screenHeight * 0.25,
    },
    headerAdress: {
        color: 'black',
        fontSize: 16
    },
    ratingContainer: {
        marginTop: 12,
        width: '95%',
        height: screenHeight * 0.05,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ratingCircle: {
        width: 20,
        height: 20,
        borderRadius: 500,
        borderColor: 'black',
        borderWidth: 2,
        margin: 5
    },
    pieContainer: {
        //marginTop: 12,
        width: '95%',
        flexDirection: 'row-reverse',
    },
    pieLabelContainer: {
        position: 'absolute',
        alignSelf: 'center',
        width: '40%'
    },
    pieLabelText: {
        color: 'black',
        textAlignVertical: 'center',
        paddingLeft: 3,
    },
    pieLabelColor: {
        width: '10%',
        aspectRatio: 1,
        borderRadius: 500
    },
    cooknessContainer: {
        marginTop: 12,
        width: '95%',
        height: screenHeight * 0.13,
        alignItems: 'center'
    },
    cooknessScale: {
        marginTop: 6,
        borderWidth: 2,
        borderColor: 'black',
        height: '50%',
        width: '90%',
        borderRadius: 20,
    },
    arrowUp: {
        marginTop: 3,
        borderTopWidth: 0,
        borderRightWidth: 15,
        borderBottomWidth: 15,
        borderLeftWidth: 15,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: "black",
        borderLeftColor: 'transparent',
        width: '15%',
    },
    cheeseSauceContainer: {
        flexDirection: 'row',
        height: 'auto',
        width: '95%',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    cheeseContainer: {
        width: '48%',
        height: '100%',
        alignItems: 'center'
    },
    sauceContainer: {
        width: '48%',
        height: '100%',
        alignItems: 'center'
    },
    reviewContainer: {
        marginTop: 12,
        padding: 12,
        width: '95%'
    },
});