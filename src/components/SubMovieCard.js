import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

const SubMovieCard = ({
  title,
  imagePath,
  cardWidth,
  shouldMarginatedArround,
  shouldMarginatedAtEnd,
  isFirst,
  isLast,
  handleCard,
}) => {
  return (
    <TouchableOpacity
      className="flex"
      onPress={() => {
        handleCard();
      }}
    >
      <View
        className={`  ${
          shouldMarginatedAtEnd
            ? isFirst
              ? `ml-space_36`
              : isLast
              ? `mr-space_36`
              : ``
            : ``
        } ${shouldMarginatedArround ? `m-space_12` : ``}`}
        style={{ maxWidth: cardWidth }}
      >
        <Image
          className={`aspect-[2/3] rounded-[20px]`}
          style={{ width: cardWidth }}
          source={{ uri: imagePath }}
        />
        <Text
          className="font-Poppins_Regular text-size_14 text-White text-center py-space_10"
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SubMovieCard;
