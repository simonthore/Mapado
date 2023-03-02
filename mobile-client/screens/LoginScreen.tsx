import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import * as React from "react";
import Svg, { G, Rect } from "react-native-svg";
import {
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  Text,
  ScrollView,
  RefreshControl,
  TouchableHighlight,
  Pressable,
} from "react-native";
import { useFonts } from "expo-font";
import { useLoginMutation } from "../gql/generated/schema";

export default function LoginScreen({ navigation }) {
  const [credentials, setCredentials] = useState({
    email: "toto@gmail.com",
    password: "abc123",
  });

  
  const [refresh, setRefresh] = useState(false);

  const pullRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      window;
      setRefresh(false);
    }, 2000);
  };
  const [login] = useLoginMutation();
  const [error, setError] = useState("");
  const [valid, setValid] = useState("");



  return (
    
    <View style={styles.container}>
      
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => pullRefresh()}
          />
        }
        style={styles.ScrollView}
      >
         <View style={styles.contain}>
        <TouchableHighlight
          style={{
            borderRadius:
              Math.round(
                Dimensions.get("window").width + Dimensions.get("window").height
              ) / 2,
            width: Dimensions.get("window").width * 0.5,
            height: Dimensions.get("window").width * 0.5,
            borderWidth: 8,
            borderColor: "#F5DEB3",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 60,
            marginTop: 20,
           
          }}
          underlayColor="#CCC30A"
          onPress={() => alert("Mapado's Rule")}
        >
          <Text style={styles.mainName}>Mapado</Text>
        </TouchableHighlight>
        </View>
        <TextInput
          onChangeText={(val) => setCredentials({ ...credentials, email: val })}
          placeholder="Nom d'utilisateur ou email"
          value={credentials.email}
          style={styles.info}
        />

        <Svg height="15" width="100%">
          <Rect x="0" y="10" width="1120" height="3" fill="white" />
        </Svg>

        <TextInput
          onChangeText={(val) =>
            setCredentials({ ...credentials, password: val })
          }
          placeholder="Mot de passe"
          value={credentials.password}
          style={styles.info}
        />

        <Svg height="50" width="100%">
          <Rect x="0" y="10" width="1120" height="3" fill="white" />
        </Svg>

        {error && <Text style={{ color: "red" }}>{error}</Text>}
        {valid && <Text style={{ color: "green" }}>{valid}</Text>}
        <View style={styles.contain}>
        <Pressable
            style={styles.connexion}
          onPress={() => {
            login({ variables: { data: credentials } })
            .then((res) => {
              navigation.navigate("Home");
            })
            .catch(() => setError("Mot de passe ou email incorrect"));
          }}
        >
          <Text style={styles.connexionText}>Se connecter</Text>
        </Pressable>
        </View>
        <View style={styles.box}>
        <Pressable
          onPress={() => {
            navigation.navigate("Forgot");
          }}
        >
          <Text style={styles.Mdp}>Mot de passe oublié ?</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={styles.text}>Créer un compte</Text>
        </Pressable>
        
        </View>

        <StatusBar style="auto" />
      </ScrollView>
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
    color: "white",
  },
  connexion: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    paddingHorizontal: 32,
    height: 50,
    width: 200,
    borderRadius: 20,
    backgroundColor: "#F5DEB3",
    marginBottom: 70,
  },
  connexionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#08415C",
  },
  text: {
    fontSize: 16, 
    fontWeight: "bold",
    color: "white",
  },
  Mdp: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
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
});
