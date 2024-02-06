import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";

import { DashboardParamList } from "../types";
import { createStackNavigator } from "@react-navigation/stack";

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>This is the "For You" aka dashboard screen.</Text>
    </View>
  );
}

export const DashboardStack = createStackNavigator<DashboardParamList>();

export const DashboardNavigator = () => {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{ headerTitle: "For You" }}
      />
    </DashboardStack.Navigator>
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
