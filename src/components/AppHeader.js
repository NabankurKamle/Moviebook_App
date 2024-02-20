import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS } from "../theme/theme";

const AppHeader = ({ name, header, handleClick }) => {
  return (
    <View className=" flex-row items-center justify-center">
      <TouchableOpacity
        className="h-[40px] w-[40px] items-center justify-center rounded-[20px] bg-Green"
        onPress={handleClick}
      >
        <MaterialCommunityIcons name={name} color={COLORS.White} size={24} />
      </TouchableOpacity>
      <Text className="flex-[1] font-Poppins_Medium text-size_20 text-center text-White">
        {header}
      </Text>
      <View className="h-[40px] w-[40px]"></View>
    </View>
  );
};

export default AppHeader;
