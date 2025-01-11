import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../constant/Colors";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/FirebaseConfig";
import { setLocalStorage } from "../../service/Storage";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const OnSignInClick = async () => {
    if (!email || !password) {
      ToastAndroid.show("Please enter email and password", ToastAndroid.SHORT);
      Alert.alert("Missing Details", "Please fill in all the details.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Log user object for debugging
      console.log("Signed in user:", user);

      // Store user details in local storage
      await setLocalStorage("userDetail", {
        email: user.email,
        displayName: user.displayName,
        uid: user.uid,
      });

      // Navigate to the main tabs
      router.replace("(tabs)");
    } catch (error) {
      const errorCode = error.code;

      if (errorCode === "auth/invalid-email") {
        Alert.alert("Invalid Email", "The email address is not valid.");
      } else if (errorCode === "auth/user-not-found") {
        Alert.alert("User Not Found", "No user found with this email.");
      } else if (errorCode === "auth/wrong-password") {
        Alert.alert(
          "Incorrect Password",
          "The password you entered is incorrect."
        );
      } else {
        Alert.alert("Sign In Error", error.message);
      }

      console.error("Sign-in error:", error);
    }
  };

  return (
    <View style={{ padding: 25 }}>
      <Text style={styles.textHeader}>Let's Sign You In</Text>
      <Text style={styles.subText}>Welcome Back</Text>
      <Text style={styles.subText}>You've been missed!</Text>

      <View style={{ marginTop: 25 }}>
        <Text>Email</Text>
        <TextInput
          placeholder="Email"
          style={styles.textInput}
          onChangeText={setEmail}
          value={email}
        />
      </View>

      <View style={{ marginTop: 25 }}>
        <Text>Password</Text>
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.textInput}
          onChangeText={setPassword}
          value={password}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={OnSignInClick}>
        <Text style={{ fontSize: 17, color: "white", textAlign: "center" }}>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonCreate}
        onPress={() => router.push("login/signUp")}
      >
        <Text
          style={{ fontSize: 17, color: Colors.PRIMARY, textAlign: "center" }}
        >
          Create Account
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
  subText: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    color: Colors.GRAY,
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
