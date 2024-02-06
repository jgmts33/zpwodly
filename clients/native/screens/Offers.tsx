import React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";

import { OffersParamList } from "../types";
import { createStackNavigator } from "@react-navigation/stack";

import { ApiApi, Configuration } from "@upwardli/api";

export default function OffersScreen() {
  React.useEffect(() => {});

  console.log("Rendering offers screen");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Offers</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>This is the offers screen.</Text>
    </View>
  );
}

export const OffersStack = createStackNavigator<OffersParamList>();

export const OffersNavigator = () => {
  return (
    <OffersStack.Navigator>
      <OffersStack.Screen
        name="OffersScreen"
        component={OffersScreen}
        options={{ headerTitle: "Offers" }}
      />
    </OffersStack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
