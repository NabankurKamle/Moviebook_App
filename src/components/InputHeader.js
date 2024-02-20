import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Octicons } from "@expo/vector-icons";

import { COLORS } from "../theme/theme";

const InputHeader = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <View className="py-space_8 px-space_24 border-2 border-WhiteRGBA15 rounded-[25px] flex-row w-full">
      <TextInput
        className={`w-['90%'] flex-1 font-Poppins_Regular text-size_16 text-White `}
        onChangeText={(text) => setSearchText(text)}
        placeholder="Search your movies..."
        placeholderTextColor={COLORS.WhiteRGBA32}
        value={searchText}
      />
      <TouchableOpacity
        className="items-center justify-center p-space_10"
        onPress={() => handleSearch(searchText)}
      >
        <Octicons name="search" color={COLORS.Green} size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default InputHeader;
