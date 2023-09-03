import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { City } from "../gql/generated/schema";
import { useGetCityQuery } from "../gql/generated/schema";
import ICity from "../interfaces/ICity";
import CityDescription from "../components/CityDescription";
import axios from "axios";
import IPoi from "../interfaces/IPoi";
import {LinearGradient} from "expo-linear-gradient";

// import MarkerIconPng from "../assets/images/marker.png";
interface CityInfoScreenProps {
    route: any;
}

const CityInfoScreen: React.FC<CityInfoScreenProps> = ({ route }) => {
    const { name, image, latitude, longitude } = route.params;

    const [CityDescriptionData, setCityDescriptionData] = useState("");

    // création de valeur initial pour eviter les crash du au fonctionnement asynchrone
    const [mapRegion, setMapRegion] = useState({
        latitude: 47.2009456,
        longitude: 0.6327305,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const { data } = useGetCityQuery({
        variables: {
            query: name,
        },
    });
    const city: ICity = {
        id: data?.city?.id!,
        name: data?.city?.name!,
        latitude: data?.city?.latitude!,
        longitude: data?.city?.longitude!,
        pois: [],
    };

    data?.city?.poi?.forEach((e) => {
        const poi: IPoi = {
            id: e.id,
            name: e.name,
            longitude: e.longitude!,
            latitude: e.latitude!,
            address: e.address,
            category: e.category?.name,
            description: e.description,
            rating: e.rating,
            photo: e.photo,
        };
        city?.pois?.push(poi);
    });

    useEffect(() => {
        if (data?.city) {
            setMapRegion({
                latitude: data.city.latitude,
                longitude: data.city.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });

        

            // Appel à l'API Wikipedia pour récupérer la description de la ville
            axios
                .get(
                    `https://fr.wikipedia.org/api/rest_v1/page/summary/${data.city.name}`
                )
                .then((response) => {
                    setCityDescriptionData(response.data.extract);
                })
                .catch((error) => {
                    console.error(
                        "Erreur lors de la récupération de la description de la ville :",
                        error
                    );
                });
        }
    }, [data]);

    return (
        <LinearGradient
        colors={['rgba(2, 0, 36, 1)', 'rgba(23, 52, 114, 1)', 'rgba(236, 93, 92, 1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
    >
            <View style={styles.container}>
                <CityDescription
                    cityName={name}
                    description={CityDescriptionData}
                />
                <Image source={{ uri: image }} style={styles.cityImage} />

                <View style={styles.cityMapContainer}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.cityMap}
                        region={mapRegion}
                    >
                        <Marker
                            coordinate={{
                                latitude: 47.2009456,
                                longitude: 0.6327305,
                            }}
                            title={name}
                            // image={require("../assets/images/starred.png")}
                        />
                    </MapView>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        width: "100%",
        // backgroundColor: "white",
    },
    cityTitle: {
        fontSize: 25,
        color: "red",
        textAlign: "center",
    },

    cityImage: {
        width: "100%",
    },
    cityMapContainer: {
        flex: 1, // Utilisez un flex de 1 pour que la carte prenne une part sur trois
        width: "100%",
    },
    cityMap: {
        flex: 1, // Utilisez un flex de 1 pour que la carte prenne une part sur trois
        width: "100%",
    },
    gradient: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default CityInfoScreen;
