import * as React from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

import { Text, View } from "../components/Themed";

import { LearnParamList } from "../types";
import { createStackNavigator } from "@react-navigation/stack";

const BLOG_URL =
  "https://upwardli.com/building-credit-tips-blog/how-to-build-credit-and-get-a-credit-card-as-an-immigrant?embedded=1";

export default function LearnScreen() {
  return <WebView source={{ uri: BLOG_URL }} style={{ marginTop: 20 }} />;
}

export const DashboardStack = createStackNavigator<LearnParamList>();

export const DashboardNavigator = () => {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen
        name="LearnScreen"
        component={LearnScreen}
        options={{ headerTitle: "Learn" }}
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
