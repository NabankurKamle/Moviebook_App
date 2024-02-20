import React from "react";
import { View, Text, StatusBar, Image } from "react-native";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

import AppHeader from "../components/AppHeader";
import SettingComponent from "../components/SettingComponent";

const UserAccountScreen = ({ navigation }) => {
  return (
    <View className="flex-[1] bg-Black">
      <StatusBar hidden />

      <View className="mx-space_36 mt-[40px]">
        <AppHeader
          name="close-circle-outline"
          header={"My Profile"}
          handleClick={() => navigation.goBack()}
        />
      </View>

      <View className="items-center pt-space_36 ">
        <Image
          className="h-[80] w-[80] rounded-[40px] "
          source={require("../assets/images/user.jpg")}
        />
        <Text className="font-Poppins_Medium text-size_16 mt-space_20 text-White">
          Nabankur Kamle
        </Text>
      </View>

      <View className="items-center p-space_36 ">
        <SettingComponent
          Icon={({ ...otherProps }) => (
            <AntDesign name="user" {...otherProps} />
          )}
          heading="Account"
          subHeading="Edit Profile"
          subTitle="Change Password"
        />
        <SettingComponent
          Icon={({ ...otherProps }) => (
            <Ionicons name="settings-outline" {...otherProps} />
          )}
          heading="Settings"
          subHeading="Theme"
          subTitle="Permission"
        />
        <SettingComponent
          Icon={({ ...otherProps }) => (
            <Feather name="dollar-sign" {...otherProps} />
          )}
          heading="Offers & Refferels"
          subHeading="Offer"
          subTitle="Refferals"
        />
        <SettingComponent
          Icon={({ ...otherProps }) => (
            <MaterialIcons name="info-outline" {...otherProps} />
          )}
          heading="About"
          subHeading="About Movies"
          subTitle="more"
        />
      </View>
    </View>
  );
};

export default UserAccountScreen;
