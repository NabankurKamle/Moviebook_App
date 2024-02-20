import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
  Image,
  FlatList,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

import { baseImagePath, movieCastDetails, movieDetails } from "../api/apiCalls";
import { COLORS } from "../theme/theme";
import AppHeader from "../components/AppHeader";
import CategoryHeader from "../components/CategoryHeader";
import CastCard from "../components/CastCard";

const MovieDetailsScreen = ({ navigation, route }) => {
  const [movieData, setMovieData] = useState(undefined);
  const [movieCastData, setMovieCastData] = useState(undefined);

  const getMovieData = async (movieId) => {
    try {
      const response = await fetch(movieDetails(movieId));
      const result = await response.json();
      setMovieData(result);
    } catch (error) {
      console.error("Something went wrong in getMovieData API", error);
    }
  };

  const getMovieCastData = async (movieId) => {
    try {
      const response = await fetch(movieCastDetails(movieId));
      const { cast } = await response.json();
      setMovieCastData(cast);
    } catch (error) {
      console.error("Something went wrong in getMovieCastData API", error);
    }
  };

  useEffect(() => {
    getMovieData(route.params.movieId);
    getMovieCastData(route.params.movieId);
  }, []);

  if (!movieData && !movieCastData)
    return (
      <ScrollView
        className="flex flex-[1] bg-Black"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View className="mx-space_36 mt-[40px]">
          <AppHeader
            name="close-circle-outline"
            header={""}
            handleClick={() => navigation.goBack()}
          />
        </View>

        <View className="flex-[1] self-center justify-center">
          <ActivityIndicator size={"large"} color={COLORS.Green} />
        </View>
      </ScrollView>
    );

  return (
    <ScrollView
      className="flex flex-[1] bg-Black"
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar hidden />

      <View className="">
        <ImageBackground
          className="w-full aspect-[3072/1727]"
          source={{ uri: baseImagePath("w780", movieData?.backdrop_path) }}
        >
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Black]}
            style={{ height: "100%" }}
          >
            <View className="mx-space_36 mt-[40px]">
              <AppHeader
                name="close-circle-outline"
                header={""}
                handleClick={() => navigation.goBack()}
              />
            </View>
          </LinearGradient>
        </ImageBackground>

        <View className="w-full aspect-[3072/1727]">
          <Image
            style={{ width: "60%", aspectRatio: 200 / 300 }}
            className=" absolute bottom-0 self-center "
            source={{ uri: baseImagePath("w342", movieData?.poster_path) }}
          />
        </View>
      </View>

      <View className="flex flex-row justify-center items-center pt-space_15 space-x-space_8 ">
        <MaterialCommunityIcons
          name="clock-outline"
          size={20}
          color={COLORS.WhiteRGBA50}
        />
        <Text className="font-Poppins_Medium text-size_14 text-White">
          {Math.floor(movieData?.runtime / 60)}h{" "}
          {Math.floor(movieData?.runtime % 60)}m
        </Text>
      </View>

      <View>
        <Text className="font-Poppins_Regular text-size_24 text-White mx-space_36 my-space_15 text-center">
          {movieData?.original_title}
        </Text>

        <View className=" flex-row gap-space_20 flex-wrap justify-center">
          {movieData?.genres?.map((item) => (
            <View
              className={`border-[1px] border-WhiteRGBA50 px-space_10 py-space_4 rounded-[25px]`}
              key={item.name}
            >
              <Text className="font-Poppins_Regular text-size_10 text-WhiteRGBA75">
                {item?.name}
              </Text>
            </View>
          ))}
        </View>
        <Text className=" font-Poppins_LightItalic  text-size_14 text-White mx-space_36 my-space_15 text-center">
          {movieData?.tagline}
        </Text>
      </View>

      <View className="mx-space_24">
        <View className="flex-row gap-space_10 items-center ">
          <FontAwesome size={20} color={COLORS.Yellow} name="star" />
          <Text className="font-Poppins_Medium text-size_14 text-White">
            {movieData?.vote_average.toFixed(1)} ({movieData?.vote_count})
          </Text>
          <Text className="font-Poppins_Medium text-size_14 text-White">
            {movieData?.release_date.substring(8, 10)}{" "}
            {new Date(movieData?.release_date).toLocaleString("default", {
              month: "long",
            })}{" "}
            {movieData?.release_date.substring(0, 4)}
          </Text>
        </View>
        <Text className="font-Poppins_Light text-size_14 text-White">
          {movieData?.overview}
        </Text>
      </View>

      <View>
        <CategoryHeader title="Top Cast" />
        <FlatList
          data={movieCastData}
          keyExtractor={(item) => item.cast_id}
          horizontal
          contentContainerStyle={{
            gap: 24,
          }}
          renderItem={({ item, index }) => (
            <CastCard
              shouldMarginatedAtEnd={true}
              width={80}
              isFirst={!index}
              isLast={!(movieCastData?.length - 1 - index)}
              imageUrl={baseImagePath("w185", item.profile_path)}
              title={item.original_name}
              subTitle={item.character}
            />
          )}
        />

        <View className="">
          <TouchableOpacity
            className="items-center my-space_24"
            onPress={() =>
              navigation.push("SeatBooking", {
                bgImage: baseImagePath("w780", movieData?.backdrop_path),
                posterImage: baseImagePath("original", movieData?.poster_path),
              })
            }
          >
            <Text
              style={{ borderRadius: Platform.OS === "ios" ? 20 : 25 }}
              className=" overflow-hidden font-Poppins_Medium text-size_14 text-White bg-Green py-space_10 px-space_24"
            >
              Select Seats
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default MovieDetailsScreen;
