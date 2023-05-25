import client from "./gql/client"
import {ApolloProvider} from "@apollo/client";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import CitiesScreen from "./screens/CitiesScreen";
import CityInfoScreen from "./screens/CityInfoScreen";
import LoginScreen from "./screens/LoginScreen";
import UserProfile from './screens/ProfileView';
import UserRegister from './screens/Register';
import ForgotPassword from "./screens/ForgotPassword";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function Cities() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={CitiesScreen} 
            options={{
                headerTitle: "Simon",
                headerRight: () => (
                    <Ionicons name={"person-circle-outline"} size={40} color={"#EC5D5B"} style={{marginRight: 20}}/>
                ),
            }}/>
            <Stack.Screen name="Info" component={CityInfoScreen} 
                    options={{
                        headerTitle: "Simon",
                        headerRight: () => (
                            <Ionicons name={"person-circle-outline"} size={40} color={"#EC5D5B"} style={{marginRight: 20}}/>
                        ),
                    }}/>
            <Stack.Screen name="Profile" component={UserProfile}
            options={{
                headerTitle: "Simon",
                headerRight: () => (
                    <Ionicons name={"person-circle-outline"} size={40} color={"#EC5D5B"} style={{marginRight: 20}}/>
                ),
            }}
            />
            <Stack.Screen name="Forgot" component={ForgotPassword}
            options={{
                headerTitle: "Simon",
                headerRight: () => (
                    <Ionicons name={"person-circle-outline"} size={40} color={"#EC5D5B"} style={{marginRight: 20}}/>
                ),
            }} />
            <Stack.Screen name="Register" component={UserRegister} 
               options={{
                headerTitle: "Simon",
                headerRight: () => (
                    <Ionicons name={"person-circle-outline"} size={40} color={"#EC5D5B"} style={{marginRight: 20}}/>
                ),
            }}  />
            
        </Stack.Navigator>
    )
}
export default function App() {
    return (
        <ApolloProvider client={client}>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={ ({route}) => ({
                        tabBarIcon: ({focused, color, size}) => {
                            if (route.name === "Login") {
                                return (
                                    <Ionicons
                                        name={focused ? "person-circle" : "person-circle-outline"}
                                        size={size}
                                        color={color}
                                    />
                                );
                            } else if (route.name === "Cities") {
                                return (
                                    <Ionicons
                                        name={focused ? "airplane" : "airplane-outline"}
                                        size={size}
                                        color={color}
                                    />
                                );
                            }
                            return (
                                <Ionicons name={"alert-circle"} size={size} color={color}/>
                            );
                        },
                        tabBarActiveTintColor: "#A9B18F",
                        tabBarInactiveTintColor: "gray",
                        tabBarStyle: {height: 60, paddingBottom: 10},
                    })}
                >
                    {/* nom de la page reliée à chaque composant */}
                    <Tab.Screen name="Cities" component={Cities}/>
                    <Tab.Screen name="Login"  component={LoginScreen}/>
                </Tab.Navigator>
            </NavigationContainer>
        </ApolloProvider>
    );
}