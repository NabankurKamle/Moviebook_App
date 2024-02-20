import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Dimensions,
  StatusBar,
  FlatList,
  View,
  Text,
} from "react-native";

import { baseImagePath, searchMovies } from "../api/apiCalls";
import SubMovieCard from "../components/SubMovieCard";
import InputHeader from "../components/InputHeader";

const { width, height } = Dimensions.get("screen");

const SearchScreen = ({ navigation }) => {
  const [searchedMovieList, setSearchedMovieList] = useState([]);

  const getSearchedMovies = async (name) => {
    try {
      const response = await fetch(searchMovies(name));
      const { results } = await response.json();
      setSearchedMovieList(results);
    } catch (error) {
      console.error("Something went wrong in getSearchedMovies API", error);
    }
  };

  useEffect(() => {
    getSearchedMovies();
  }, []);

  return (
    <SafeAreaView
      style={{ width }}
      className="flex flex-[1] items-center bg-Black"
    >
      <StatusBar hidden />

      <FlatList
        data={searchedMovieList}
        keyExtractor={(item) => item.id}
        bounces={false}
        showsVerticalScrollIndicator={false}
        className="w-full"
        numColumns={2}
        ListHeaderComponent={
          <View className=" mx-space_36 my-space_8 w-full">
            <InputHeader handleSearch={getSearchedMovies} />
          </View>
        }
        contentContainerStyle={{ alignItems: "center" }}
        renderItem={({ item, index }) => (
          <SubMovieCard
            shouldMarginatedAtEnd={false}
            shouldMarginatedArround={true}
            handleCard={() =>
              navigation.push("MovieDetails", { movieId: item.id })
            }
            cardWidth={width / 2 - 24}
            title={item.original_title}
            imagePath={baseImagePath("w342", item.poster_path)}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
