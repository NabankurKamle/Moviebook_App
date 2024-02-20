import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { searchGenres } from "../api/apiCalls";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../theme/theme";

const MovieCard = ({
  title,
  imagePath,
  cardWidth,
  shouldMarginatedArround,
  shouldMarginatedAtEnd,
  isFirst,
  isLast,
  vote_average,
  vote_count,
  genreIds,
  handleCard,
}) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getGenres();
  }, []);

  const getGenres = async () => {
    try {
      const response = await fetch(searchGenres);
      const { genres } = await response.json();
      setGenres(genres);
    } catch (error) {
      console.error(
        "Something went wrong in getNowPlayingMoviesList function",
        error
      );
    }
  };

  return (
    <TouchableOpacity
      className="flex flex-[1]"
      onPress={() => {
        handleCard();
      }}
    >
      <View
        className={` flex-[1] bg-Black ${
          shouldMarginatedAtEnd
            ? isFirst
              ? `ml-space_36`
              : isLast
              ? `mr-space_36`
              : ``
            : ``
        } ${shouldMarginatedArround ? `ml-space_12` : ``}`}
        style={{ maxWidth: cardWidth }}
      >
        <Image
          className={`aspect-[2/3] rounded-[20px]`}
          style={{ width: cardWidth }}
          source={{ uri: imagePath }}
        />
        <View className="">
          <View className="flex-row gap-space_10 items-center justify-center mt-space_10 ">
            <FontAwesome size={20} color={COLORS.Yellow} name="star" />
            <Text className="font-Poppins_Medium text-size_14 text-White">
              {vote_average} ({vote_count})
            </Text>
          </View>

          <Text
            numberOfLines={1}
            className="font-Poppins_Regular text-size_24 text-White text-center py-space_10"
          >
            {title}
          </Text>

          <View className="flex-[1] flex-row gap-space_20 flex-wrap justify-center">
            {genres
              .filter((genre) => genreIds.includes(genre.id))
              .map((genre) => (
                <View
                  key={genre.id}
                  className=" border-WhiteRGBA50 border py-space_8 px-space_10 rounded-[20px] h-8"
                >
                  <Text className="text-size_10 font-Poppins_Regular text-White">
                    {genre.name}
                  </Text>
                </View>
              ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;
