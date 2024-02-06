/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import * as React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import DashboardNavigator from "../screens/Dashboard";
import LearnNavigator from "../screens/Learn";
import CreditNavigator from "../screens/Credit";
import OffersNavigator from "../screens/Offers";
import ProfileNavigator from "../screens/Profile";
import { BottomTabParamList } from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="For You"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="For You"
        component={DashboardNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarMaterialIcon name="class" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Learn"
        component={LearnNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarMaterialIcon name="ballot" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Credit"
        component={CreditNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarMaterialIcon name="credit-card" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Offers"
        component={OffersNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarMaterialIcon name="bookmark" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarCommunityMaterialIcon name="face-profile" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarMaterialIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  color: string;
}) {
  return <MaterialIcons size={24} {...props} />;
}
function TabBarCommunityMaterialIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
}) {
  return <MaterialCommunityIcons size={24} {...props} />;
}
