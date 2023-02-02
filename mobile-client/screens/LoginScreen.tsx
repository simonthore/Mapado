import { StatusBar } from "expo-status-bar";
import {useState} from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import { useFonts } from "expo-font";
import { TouchableOpacity } from 'react-native';


export default function LoginScreen() {
  const [credentials, setCredentials] = useState({
    email : "",
    password : "",
  });
  const [loader] = useFonts({
    "Amatic SC-Bold": require("../assets/fonts/AmaticSC-Bold.ttf"),
  });

 
  return (
    <View style={styles.container}>

      <ScrollView style={styles.ScrollView}>
        <TouchableHighlight
          style={{
            borderRadius:
              Math.round(
              Dimensions.get("window").width + Dimensions.get("window").height
              ) / 2,
            width: Dimensions.get("window").width * 0.5,
            height: Dimensions.get("window").width * 0.5,
            borderWidth: 2,
            borderColor: "black",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 60,
            marginTop: 60,
            marginLeft: 90,
          }}
          underlayColor="#CCC30A"
          onPress={() => alert("Mapado's Rule")}
        >
          <Text style={styles.mainName}>Mapado</Text>
        </TouchableHighlight>
        

        <TextInput
          onChangeText={(val) => setCredentials({ ...credentials, email: val })}
          placeholder="Nom d'utilisateur ou email"
          value={credentials.email}
          style = {styles.info}

          />

        <TextInput
          onChangeText={(val) => setCredentials({ ...credentials, password: val })}
          placeholder="Mot de passe"
          value={credentials.password}
          style = {styles.info}
          />
      {/* <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>ce connecter</Text> 
      </TouchableOpacity> 
      */}
        <TouchableOpacity >
          <Text style={styles.forgot_button}> mot de passe oublié ? </Text>
          </TouchableOpacity>

        <Text style={styles.info}>Créer un compte</Text>

        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    color: "black",
    backgroundColor: "#ffffff",
    padding: 10,
    justifyContent: "flex-end",
    width: 350,
    margin: 10,
    borderWidth: 1,
    borderColor: "black",
    borderTopLeftRadius: 20,
  },
  button: {
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 4,
    backgroundColor: "black",
    width: 250,
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  forgot_button: {
    textAlign: "center",
    marginBottom: 25,
    height: 30,
  },
  mainName: {
    fontFamily: "Amatic SC-Bold",
    fontSize: 40,
  },
  ScrollView: {},
});
