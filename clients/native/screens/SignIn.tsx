import * as React from "react";
import {
  Image,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
} from "react-native";
import Layout from "../constants/Layout";

import { Text, View } from "../components/Themed";
import ThirdPartyButton from "../components/ThirdPartyButton";
import PasswordToggleInput from "../components/PasswordToggleInput";

import * as SecureStore from "expo-secure-store";

import upwardliLogo from "../assets/images/upwardli-logo.png";
import googleLogo from "../assets/images/google-logo.png";
import facebookLogo from "../assets/images/facebook-logo.png";
import appleLogo from "../assets/images/apple-logo.png";

import { Login } from "@upwardli/api";
import { getCoreAPIClient } from "@upwardli/shared/api";

import { useAuthStateFunc } from "../hooks/AuthStateContext";

export default function SignInScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const upwardliLogin = useAuthStateFunc().upwardliLogin;

  const handleEmailLogin = async () => {
    const client = getCoreAPIClient();
    const login: Login = {
      email: email,
      password: password,
    };
    const authResponse = await client.createLogin({ login: login });
    SecureStore.setItemAsync("accessToken", authResponse.accessToken);
    SecureStore.setItemAsync("refreshToken", authResponse.refreshToken);
    console.log("User successfully authenticated");
    upwardliLogin();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.logo} source={upwardliLogo} />

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />

        <PasswordToggleInput
          password={password}
          setPassword={setPassword}
        ></PasswordToggleInput>

        <TouchableHighlight
          style={styles.button}
          onPress={handleEmailLogin}
          underlayColor="dodgerblue"
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableHighlight>

        <View style={styles.linkContainer}>
          <Text style={styles.text}>Forgot ID/Password</Text>
          <Text style={styles.text}>Create Account</Text>
        </View>

        <View style={styles.seperatorContainer}>
          <View style={styles.seperatorLine}></View>
          <Text style={styles.text}>OR</Text>
          <View style={styles.seperatorLine}></View>
        </View>

        {/* The third party buttons at the moment use the upwardliLogin function. Need to support third party authentication in the future. */}
        <ThirdPartyButton
          buttonImage={googleLogo}
          buttonText="Sign In With Google"
          onPress={upwardliLogin}
        ></ThirdPartyButton>
        <ThirdPartyButton
          buttonImage={facebookLogo}
          buttonText="Sign In With Facebook"
          onPress={upwardliLogin}
        ></ThirdPartyButton>
        <ThirdPartyButton
          buttonImage={appleLogo}
          buttonText="Sign In With Apple"
          onPress={upwardliLogin}
        ></ThirdPartyButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    justifyContent: "space-evenly",
    height: Layout.window.height,
    paddingTop: "10%",
    paddingBottom: "10%",
  },
  logo: {
    alignSelf: "center",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  button: {
    padding: 10,
    borderRadius: 10,
    alignSelf: "stretch",
    backgroundColor: "royalblue",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
  },
  text: {
    color: "gray",
    fontSize: 12,
    marginLeft: 5,
    marginRight: 5,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "lightgray",
    backgroundColor: "transparent",
  },
  seperatorContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "5%",
    backgroundColor: "transparent",
  },
  seperatorLine: {
    width: "45%",
    height: 1,
    backgroundColor: "lightgray",
  },
});
