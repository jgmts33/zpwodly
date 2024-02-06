import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";

import { CreditParamList } from "../types";
import { createStackNavigator } from "@react-navigation/stack";

export default function CreditScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Credit</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>This is the credit screen.</Text>
    </View>
  );
}

export const CreditStack = createStackNavigator<CreditParamList>();

export const CreditNavigator = () => {
  return (
    <CreditStack.Navigator>
      <CreditStack.Screen
        name="CreditScreen"
        component={CreditScreen}
        options={{ headerTitle: "Credit" }}
      />
    </CreditStack.Navigator>
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
