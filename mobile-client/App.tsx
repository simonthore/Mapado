import client from "./gql/client";
import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import CitiesScreen from "./screens/CitiesScreen";
import CityInfoScreen from "./screens/CityInfoScreen";
import LoginScreen from "./screens/LoginScreen";
// import UserProfile from './screens/ProfileView';
import UserRegister from "./screens/Register";
import ForgotPassword from "./screens/ForgotPassword";
import { Button, Image, Pressable, Text, View } from "react-native";
import { useState } from "react";
import { useGetProfileQuery } from "./gql/generated/schema";
import { useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Cities() {
    const { data: currentUser } = useGetProfileQuery({
        errorPolicy: "ignore",
    });
    // console.log("info currentuser : ",currentUser)
    const [profilePicture, setProfilePicture] = useState(
        "https://www.w3schools.com/howto/img_avatar.png"
    );
    const [userName, setUserName] = useState("John Doe");

    useEffect(() => {
        if (currentUser) {
            setProfilePicture(currentUser.profile.profilePicture);
            setUserName(currentUser.profile.userName);
        }
    }, [currentUser]);
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: "#051944",
                },
                headerTintColor: "#ec5d5c",
                headerRight: () => (
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <Image
                            source={{ uri: profilePicture }}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                            }}
                        />
                        <Text
                            style={{
                                color: "#ec5d5c",
                                fontSize: 12,
                                fontWeight: "bold",
                            }}
                        >
                            {userName}
                        </Text>
                    </View>
                ),
            }}
        >
            <Stack.Screen name="Home" component={CitiesScreen} />
            <Stack.Screen name="Info" component={CityInfoScreen} />
            {/* <Stack.Screen name="Profile" component={UserProfile} /> */}
            <Stack.Screen name="Forgot" component={ForgotPassword} />
            <Stack.Screen name="Register" component={UserRegister} />
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>

    );
}
export default function App() {
    return (
        <ApolloProvider client={client}>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            if (route.name === "Login") {
                                return (
                                    <Ionicons
                                        name={
                                            focused
                                                ? "person-circle"
                                                : "person-circle-outline"
                                        }
                                        size={size}
                                        color={color}
                                    />
                                );
                            } else if (route.name === "Cities") {
                                return (
                                    <Ionicons
                                        name={
                                            focused
                                                ? "airplane"
                                                : "airplane-outline"
                                        }
                                        size={size}
                                        color={color}
                                    />
                                );
                            }
                            return (
                                <Ionicons
                                    name={"alert-circle"}
                                    size={size}
                                    color={color}
                                />
                            );
                        },
                        tabBarActiveTintColor: "#ec5d5c",
                        tabBarInactiveTintColor: "gray",
                        tabBarStyle: { height: 60, paddingBottom: 10 },
                        headerStyle: {
                            backgroundColor: '#051944',
                        },
                    })}
                >
                    {/* nom de la page reliée à chaque composant */}
                    <Tab.Screen
                        name="home"
                        component={Cities}
                        options={{ headerShown: false }}
                    />
                    <Tab.Screen name="login" component={LoginScreen}
                        options={{
                            headerTitleStyle: { color: '#ec5d5c' },
                        }} />
                </Tab.Navigator>
            </NavigationContainer>
        </ApolloProvider>
    );
}
