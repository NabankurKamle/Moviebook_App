import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

import { COLORS } from "../theme/theme";

const SettingComponent = ({ Icon, heading, subHeading, subTitle }) => {
  return (
    <View className="flex-row py-space_20">
      <View className="px-space_20">
        <Icon size={24} color={COLORS.White} />
      </View>
      <View className="flex-[1] ">
        <Text className="font-Poppins_Medium text-size_18 text-White">
          {heading}
        </Text>
        <Text className="font-Poppins_Regular text-size_14 text-WhiteRGBA15">
          {subHeading}
        </Text>
        <Text className="font-Poppins_Regular text-size_14 text-WhiteRGBA15">
          {subTitle}
        </Text>
      </View>
      <View className="justify-center">
        <Feather name="chevron-right" size={24} color={COLORS.White} />
      </View>
    </View>
  );
};

export default SettingComponent;
