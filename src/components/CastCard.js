import React from "react";
import { View, Text, Image } from "react-native";

const CastCard = ({
  isFirst,
  isLast,
  imageUrl,
  title,
  subTitle,
  shouldMarginatedAtEnd,
  width,
}) => {
  return (
    <View
      style={{ maxWidth: width }}
      className={`items-center ${
        shouldMarginatedAtEnd
          ? isFirst
            ? `ml-space_24`
            : isLast
            ? `mr-space_24`
            : ``
          : ``
      }`}
    >
      <Image
        style={{
          aspectRatio: 1920 / 2880,
          width,
        }}
        className=" rounded-[100px] "
        source={{ uri: imageUrl }}
      />
      <Text
        className="self-stretch font-Poppins_Medium text-size_12 text-White"
        numberOfLines={1}
      >
        {title}
      </Text>
      <Text
        className="self-stretch font-Poppins_Medium text-size_10 text-White"
        numberOfLines={1}
      >
        {subTitle}
      </Text>
    </View>
  );
};

export default CastCard;
