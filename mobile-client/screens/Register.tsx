import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, Dimensions, TextInput, StatusBar, ScrollView, RefreshControl, Pressable, Alert, Button, TouchableOpacity } from "react-native";
import Svg, { G, Rect } from "react-native-svg";
import { useState } from 'react';
import { useCreateUserMutation } from '../gql/generated/schema';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from "expo-linear-gradient";


export default function UserRegister({ navigation }) {
  const [refresh, setRefresh] = useState(false);

  const pullRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      window;
      setRefresh(false);
    }, 2000);
  };

  const [image, setImage] = useState(null);
  const imageTop = require("../assets/images/Navigation.png");
  const user = require("../assets/images/user.png");
  const pickImage = async () => {
    // Demander les autorisations nécessaires
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Désolé, nous avons besoin des autorisations de la mémoire du téléphone pour que cela fonctionne!');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("le result =", result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setUserInfo({ ...userInfo, profilePicture: result.assets[0].uri });
    } else {
      console.log("le result =", result);

    }
  };


  const [userInfo, setUserInfo] = useState({ email: "", password: "", userName: "", profilePicture: "" });
  const [CreateUser] = useCreateUserMutation();
  // console.log(userInfo)
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(2, 0, 36, 1)', 'rgba(23, 52, 114, 1)', 'rgba(236, 93, 92, 1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
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



          </View>
          <Image
            source={imageTop}
            style={{ width: 200, height: 200 }}
          />
  
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 40 }}>
            <TouchableOpacity
              style={styles.button}
              onPress={pickImage}
            >
              <Image source={user} style={{ width: 60, height: 50, alignSelf:"center"}} />
              <Text style={styles.buttonText}>Choisir une photo</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder="Nom d'utilisateur"
            style={styles.info}
            value={userInfo.userName}
            onChangeText={(val) =>
              setUserInfo({ ...userInfo, userName: val })
            }
          />




          <TextInput
            placeholder="adresse e-mail"
            style={styles.info}
            value={userInfo.email}
            onChangeText={(val) =>
              setUserInfo({ ...userInfo, email: val })
            }
          />

    
          <TextInput
            placeholder="Mot de passe"
            style={styles.info}
            value={userInfo.password}
            onChangeText={(val) =>
              setUserInfo({ ...userInfo, password: val })
            }
          />

          <Pressable
            style={styles.connexion}
            onPress={() => {
              CreateUser({ variables: { data: userInfo } })
                .then(() => {
                  navigation.navigate("home");
                  console.log("les info :", userInfo)
                  Alert.alert('Alert Title', 'My Alert Msg', [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                  ]);
                })
                .catch((error) => {
                  console.error(error);
                });
            }}
          >
            <Text style={styles.connexionText}>Créer son compte</Text>
          </Pressable>
          <StatusBar />

        </ScrollView>
      </LinearGradient>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#08415C",
    justifyContent: "center",
    width:"100%",
  },
  mainName: {
    color: "#F5DEB3",
    fontSize: 40,
  },
  contain: {
    flex: 1,
    alignItems: "center",
  },
  ScrollView: {
  },
  welcome: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },
  info: {
    width: '100%',
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
    alignSelf: "center",
  },
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
  connexionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#173472",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  button: {
    backgroundColor: '#ec5d5c', // Couleur de fond du bouton
    padding: 10,
    borderRadius: 5,
    elevation: 3, // Ombre pour une apparence en relief (Android)
    shadowColor: '#000', // Couleur de l'ombre
    shadowOffset: { width: 0, height: 2 }, // Décalage de l'ombre
    shadowOpacity: 0.3, // Opacité de l'ombre
    shadowRadius: 2, // Rayon de l'ombre
    height: 100,
    width: 100,
  },
  buttonText: {
    color: '#173472', // Couleur du texte du bouton
    fontSize: 16, // Taille de la police du texte
    fontWeight: 'bold', // Poids de la police du texte
    textAlign: 'center', // Alignement du texte
  },

});


