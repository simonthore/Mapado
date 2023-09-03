import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, Dimensions, TextInput, StatusBar, ScrollView, RefreshControl, Pressable, Alert, Button, TouchableOpacity } from "react-native";
import { useState } from 'react';
import { LinearGradient } from "expo-linear-gradient";



export default function ForgotPassword({navigation}) {
  const [refresh, setRefresh] = useState(false);

  const pullRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      window;
      setRefresh(false);
    }, 2000);
  };
  const [userInfo, setUserInfo] = useState({ email: ""});

  const imageTop = require("../assets/images/forgot.png");

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
          <Text 
          style={styles.topText}>Récupéreration du mot de passe</Text>
             <Image
            source={imageTop}
            style={{ width: 300, height: 300, marginBottom:60, marginTop:40, alignContent:"center", alignSelf:"center"}}
          />
             <TextInput
            placeholder="votre adresse e-mail"
            style={styles.info}
            value={userInfo.email}
            onChangeText={(val) =>
              setUserInfo({ ...userInfo, email: val })
            }
          />
           <Pressable
            style={styles.connexion}
            onPress={() => {
             console.log("Voila le mot de passe")
            }}
          >
            <Text style={styles.connexionText}>Récupérer votre mot de passe</Text>
          </Pressable>
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
 
  ScrollView: {
  },
  topText:{
    fontSize: 22,
    color:'#ec5d5c',
    marginTop:20,
    fontWeight:"bold",
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
    alignSelf: "center",
    marginTop: 20,
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
    alignContent: "center",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },

});


