import React from "react";
import { View, Text } from "react-native";

const CategoryHeader = ({ title }) => {
  return (
    <Text className="font-Poppins_SemiBold text-size_20 text-White px-space_36 py-space_28">
      {title}
    </Text>
  );
};

export default CategoryHeader;
