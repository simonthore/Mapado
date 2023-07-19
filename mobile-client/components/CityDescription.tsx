import { StyleSheet, View, Text } from "react-native";
import React from "react";

const CityDescription = ({ cityName, description }) => {
    return (
        <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>{cityName}</Text>
            <Text style={styles.descriptionText}>{description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    descriptionContainer: {
        backgroundColor: "#f2f2f2",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    descriptionText: {
        fontSize: 16,
        color: "#333",
    },
});

export default CityDescription;
