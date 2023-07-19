import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { City } from "../gql/generated/schema";
import { useGetCityQuery } from "../gql/generated/schema";
import ICity from "../interfaces/ICity";
// import CityDescription from "../components/CityDescription";
// import axios from "axios";
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
    console.log("CityInfoScreen.tsx - data :", data?.city);
    const city: ICity = {
        id: data?.city?.id!,
        name: data?.city?.name!,
        latitude: data?.city?.latitude!,
        longitude: data?.city?.longitude!,
        // pois: []
    };

    useEffect(() => {
        if (data?.city) {
            setMapRegion({
                latitude: data.city.latitude,
                longitude: data.city.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        }
    }, []);

    //         // Appel à l'API Wikipedia pour récupérer la description de la ville
    //         axios
    //             .get(
    //                 `https://fr.wikipedia.org/api/rest_v1/page/summary/${data.city.name}`
    //             )
    //             .then((response) => {
    //                 setCityDescriptionData(response.data.extract);
    //             })
    //             .catch((error) => {
    //                 console.error(
    //                     "Erreur lors de la récupération de la description de la ville :",
    //                     error
    //                 );
    //             });
    //     }
    // }, [data]);

    console.log("CityInfoScreen.tsx - city :", city);
    return (
        <View style={styles.container}>
            {/* <CityDescription cityName={name} description={CityDescription} /> */}
            <Image source={{ uri: image }} style={styles.cityImage} />
            <Text style={styles.cityTitle}>{name}</Text>
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
            <TouchableOpacity style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    cityTitle: {
        fontSize: 25,
        color: "#EC5D5B",
        paddingTop: 20,
        textAlign: "center",
    },
    cityImage: {
        width: "100%",
        height: 200,
    },
    cityMap: {
        flex: 1,
        width: "100%",
        height: "50%",
    },
    backButton: {
        backgroundColor: "#3270F4",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: "center",
        marginTop: 20,
    },
    backButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default CityInfoScreen;
