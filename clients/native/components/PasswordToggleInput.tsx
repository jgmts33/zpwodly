import * as React from "react";
import { TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { View } from "./Themed";

export default function PasswordToggleInput({
  password,
  setPassword = (f) => f,
}) {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [iconName, setIconName] = React.useState("eye");

  function onIconPress() {
    setSecureTextEntry((prevSecureTextEntry) => !prevSecureTextEntry);
    setIconName(secureTextEntry ? "eye-off" : "eye");
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={"Password"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={secureTextEntry}
      ></TextInput>
      <TouchableOpacity onPress={onIconPress}>
        <Ionicons style={styles.icon} name={iconName} size={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "lightgray",
    backgroundColor: "transparent",
  },
  input: {
    flex: 1,
  },
  icon: {
    color: "gray",
  },
});
