import { StatusBar } from "expo-status-bar";
import {
    FlatList,
    StyleSheet,
    TextInput,
    View,
    Text,
    Button,
    Image,
} from "react-native";
import { useCitiesQuery } from "../gql/generated/schema";
import CityListItem from "../components/CityListItem";
import React from "react";
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";

export default function CitiesScreen({ navigation }) {
    const handleButtonPress = () => {
        // console.log("Ville :", item);
        console.log(cities)
    };
    const [text, onChangeText] = React.useState("");
    const { data } = useCitiesQuery();
    const cities = data?.cities || [];

    // filtre les villes en fonction de la recherche
    const filteredCities = cities.filter((city) =>
        city.name.toLowerCase().includes(text.toLowerCase())
    );


    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(2, 0, 36, 1)', 'rgba(23, 52, 114, 1)', 'rgba(236, 93, 92, 1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >

                <StatusBar />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder={"Recherchez une ville"}
                ></TextInput>
                <FlatList
                    style={styles.list}
                    keyExtractor={(item) => item.id.toString()}
                    data={filteredCities}
                    renderItem={({ item }) => {

                        console.log("City item:", item); 
                        return (
                            <CityListItem navigation={navigation} city={item} />
                        );
                    }}
                />
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3270F4",
    },
    mapadoTitle: {
        color: "white",
        fontSize: 25,
        marginTop: 10,
        paddingBottom: 10,
    },
    user: {
        position: "absolute",
        top: 10,
        right: 10,
    },
    input: {
        backgroundColor: "white",
        width: 220,
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        alignSelf: "center",
        marginTop: 10,
    },
    list: {
        width: "60%",
    },
    image: {
        flex: 1,
        justifyContent: "center",
    },
    gradient: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
