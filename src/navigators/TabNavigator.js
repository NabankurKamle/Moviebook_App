import React from "react";
import { View, Text, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AntDesign,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";

import { COLORS } from "../theme/theme";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import TicketScreen from "../screens/TicketScreen";
import UserAccountScreen from "../screens/UserAccountScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      className="bg-Black"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.Black,
          borderTopWidth: 0,
          height: Platform.OS === "ios" ? 120 : 100,
          marginBottom: -15,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View
              className={`p-space_15 rounded-[180px] ${
                focused ? `bg-Green` : `bg-Black`
              }`}
            >
              <MaterialCommunityIcons
                name="movie-open-play-outline"
                color={COLORS.White}
                size={30}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View
              className={` p-space_15 rounded-[180px] ${
                focused ? `bg-Green` : `bg-Black`
              }`}
            >
              <AntDesign name="search1" color={COLORS.White} size={30} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Ticket"
        component={TicketScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View
              className={` p-space_15 rounded-[180px] ${
                focused ? `bg-Green` : `bg-Black`
              }`}
            >
              <MaterialCommunityIcons
                name="ticket-confirmation-outline"
                color={COLORS.White}
                size={30}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserAccountScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View
              className={` p-space_15 rounded-[100px] ${
                focused ? `bg-Green` : `bg-Black`
              }`}
            >
              <AntDesign name="user" color={COLORS.White} size={30} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
