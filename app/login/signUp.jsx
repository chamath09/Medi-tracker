import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import Colors from "../../constant/Colors";
import { auth } from "../../config/FirebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setLocalStorage } from "../../service/Storage";

export default function SignUp() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const OnCreateAccount = () => {
    if (!email || !password || !userName) {
      ToastAndroid.show("Please fill all details", ToastAndroid.BOTTOM);
      Alert.alert("Please fill all details");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        await updateProfile(user, { displayName: userName });
        await setLocalStorage("userDetail", user);

        router.push("login/signIn");

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/email-already-in-use") {
          ToastAndroid.show("Email already in use", ToastAndroid.BOTTOM);
          Alert.alert("Email already in use");
        } else {
          console.error(errorMessage);
        }
      });
  };

  return (
    <View style={{ padding: 25 }}>
      <Text style={styles.textHeader}>Create New Account</Text>

      <View style={{ marginTop: 25 }}>
        <Text>Full Name</Text>
        <TextInput
          placeholder="Full Name"
          style={styles.textInput}
          onChangeText={(value) => setUserName(value)} // Fixed here
        />
      </View>

      <View style={{ marginTop: 25 }}>
        <Text>Email</Text>
        <TextInput
          placeholder="Email"
          style={styles.textInput}
          onChangeText={(value) => setEmail(value)} // Fixed here
        />
      </View>

      <View style={{ marginTop: 25 }}>
        <Text>Password</Text>
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.textInput}
          onChangeText={(value) => setPassword(value)} // Fixed here
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={OnCreateAccount}>
        <Text style={{ fontSize: 17, color: "white", textAlign: "center" }}>
          Create Account
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonCreate}
        onPress={() => router.push("login/signIn")}
      >
        <Text
          style={{ fontSize: 17, color: Colors.PRIMARY, textAlign: "center" }}
        >
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 15,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    fontSize: 17,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: "white",
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    marginTop: 35,
  },
  buttonCreate: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
});
