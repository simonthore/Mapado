import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import * as React from "react";
import Svg, { G, Rect } from "react-native-svg";
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  Pressable,
} from "react-native";
import { useFonts } from "expo-font";
import {
  useGetProfileQuery,
  useLoginMutation,
  useLogoutMutation,
} from "../gql/generated/schema";
import * as SecureStore from "expo-secure-store";
import {LinearGradient} from "expo-linear-gradient";


export default function LoginScreen({ navigation }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [refresh, setRefresh] = useState(false);
  const image = require("../assets/images/Navigation.png");

  const pullRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      window;
      setRefresh(false);
    }, 2000);
  };
  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();
  // récupère les données de l'utilisateur connecté afin de pouvoir afficher son nom dans le header
  const { data: currentUser, client } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  // instancie le message d'erreur si le mot de passe ou l'email est incorrect
  const [error, setError] = useState("");

  // instancie le message de validation si le mot de passe ou l'email est correct
  const [valid, setValid] = useState("");

  return (
    <View style={styles.container}>
    <LinearGradient
      colors={['rgba(2, 0, 36, 1)', 'rgba(23, 52, 114, 1)', 'rgba(236, 93, 92, 1)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
      >
      <Image
                source={image}
                style={{width:200, height:200, marginBottom:50}}
                />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => pullRefresh()}
          />
        }
        style={styles.ScrollView}
      >
        {currentUser?.profile ? (
          <View>
            <Text>connected as {currentUser?.profile.email}</Text>
            <Button
              onPress={async () => {
                await logout();
                client.resetStore();
                SecureStore.setItemAsync("token", "");
              }}
              title="logout"
            />
          </View>
        ) : (
          <View>
            <TextInput
              onChangeText={(val) =>
                setCredentials({ ...credentials, email: val })
              }
              placeholder="Nom d'utilisateur ou email"
              value={credentials.email}
              style={styles.info}
            />

            {/* <Svg height="15" width="100%">
              <Rect x="0" y="10" width="1120" height="3" fill="white" />
            </Svg> */}

            <TextInput
              onChangeText={(val) =>
                setCredentials({ ...credentials, password: val })
              }
              placeholder="Mot de passe"
              value={credentials.password}
              style={styles.info}
            />

            {/* <Svg height="50" width="100%">
              <Rect x="0" y="10" width="1120" height="3" fill="white" />
            </Svg> */}

            {error && <Text style={{ color: "red" }}>{error}</Text>}
            <View style={styles.contain}>
              <Pressable
                style={styles.connexion}
                onPress={() => {
                  login({ variables: { data: credentials } })
                    .then((res) => {
                      client.resetStore();
                      // navigation.navigate("Home");
                      if (res.data?.login) {
                        SecureStore.setItemAsync("token", res.data?.login);
                        console.log(currentUser?.profile);
                        console.log(client);
                        setCredentials;
                      }
                    })
                    .catch(() => setError("Mot de passe ou email incorrect"));
                }}
                // title="login"
              >
                <Text style={styles.connexionText}>Se connecter</Text>
              </Pressable>
            </View>
          </View>
        )}

        <View style={styles.contain}></View>

        <View style={styles.box}>
          <Pressable
            onPress={() => {
              navigation.navigate("Forgot");
              console.log("forgot");
            }}
          >
            <Text style={styles.Mdp}>Mot de passe oublié ?</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("Register");
              console.log("register");
            }}
          >
            <Text style={styles.text}>Créer un compte</Text>
          </Pressable>
        </View>
        <StatusBar style="auto" />
      </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#08415C",
    alignItems: "center",
  },
  contain: {
    flex: 1,
    alignItems: "center",
  },
  info: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignSelf:"center",
  },

  //bouton "Se connecter"
  connexion: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    paddingHorizontal: 32,
    height: 50,
    width: 200,
    borderRadius: 20,
    backgroundColor: "#ec5d5c",
    marginBottom: 70,
  },

  //texte du bouton "Se connecter"
  connexionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#173472",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#173472",
  },
  Mdp: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#173472",
    marginRight: 60,
  },
  box: {
    flexDirection: "row",
  },
  mainName: {
    color: "#F5DEB3",
    fontSize: 40,
  },
  ScrollView: {},
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height:"100%",
    width:"100%",
},
});
