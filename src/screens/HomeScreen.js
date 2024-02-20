import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
} from "react-native";

import { COLORS } from "../theme/theme";
import {
  upcomingMovies,
  nowPlayingMovies,
  popularMovies,
  baseImagePath,
} from "../api/apiCalls";
import CategoryHeader from "../components/CategoryHeader";
import SubMovieCard from "../components/SubMovieCard";
import MovieCard from "../components/MovieCard";

const { height, width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState(undefined);
  const [popularMoviesList, setPopularMoviesList] = useState(undefined);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState(undefined);

  const getNowPlayingMoviesList = async () => {
    try {
      const response = await fetch(nowPlayingMovies);
      const { results } = await response.json();
      setNowPlayingMoviesList([{ id: "dummy1" }, ...results, { id: "dummy2" }]);
    } catch (error) {
      console.error(
        "Something went wrong in getNowPlayingMoviesList function",
        error
      );
    }
  };

  const getUpcomingMoviesList = async () => {
    try {
      const response = await fetch(upcomingMovies);
      const { results } = await response.json();
      setUpcomingMoviesList(results);
    } catch (error) {
      console.error(
        "Something went wrong in getUpcomingMoviesList function",
        error
      );
    }
  };

  const getPopularMoviesList = async () => {
    try {
      const response = await fetch(popularMovies);
      const { results } = await response.json();
      setPopularMoviesList(results);
    } catch (error) {
      console.error(
        "Something went wrong in getPopularMoviesList function",
        error
      );
    }
  };

  useEffect(() => {
    getNowPlayingMoviesList();
    getPopularMoviesList();
    getUpcomingMoviesList();
  }, []);

  if (!nowPlayingMoviesList && !popularMoviesList && !upcomingMoviesList)
    return (
      <SafeAreaView className="flex-1 bg-Black">
        <ScrollView
          className=" "
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flex: 1,
          }}
        >
          <StatusBar hidden />

          <View className="flex-[1] self-center justify-center">
            <ActivityIndicator size={"large"} color={COLORS.Green} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );

  return (
    <SafeAreaView className="flex-[1] bg-Black">
      <ScrollView bounces={false}>
        <StatusBar hidden />

        <CategoryHeader title={"Now Playing"} />
        <FlatList
          data={nowPlayingMoviesList}
          keyExtractor={(item) => item.id}
          bounces={false}
          snapToInterval={width * 0.7 + 36}
          showsHorizontalScrollIndicator={false}
          horizontal
          decelerationRate={0}
          contentContainerStyle={{ gap: 36 }}
          renderItem={({ item, index }) => {
            if (!item.original_title)
              return (
                <View
                  style={{ width: (width - (width * 0.7 + 36 * 2)) / 2 }}
                  className=""
                ></View>
              );
            return (
              <MovieCard
                shouldMarginatedAtEnd={true}
                handleCard={() =>
                  navigation.push("MovieDetails", { movieId: item.id })
                }
                cardWidth={width * 0.7}
                isFirst={!index}
                isLast={!(upcomingMoviesList?.length - 1 - index)}
                title={item.original_title}
                imagePath={baseImagePath("w780", item.poster_path)}
                genreIds={item.genre_ids.slice(0, 3)}
                vote_average={item.vote_average}
                vote_count={item.vote_count}
              />
            );
          }}
        />

        <CategoryHeader title={"Popular"} />
        <FlatList
          data={popularMoviesList}
          keyExtractor={(item) => item.id}
          bounces={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 36 }}
          renderItem={({ item, index }) => (
            <SubMovieCard
              shouldMarginatedAtEnd={true}
              handleCard={() =>
                navigation.push("MovieDetails", { movieId: item.id })
              }
              cardWidth={width / 3}
              isFirst={!index}
              isLast={!(upcomingMoviesList?.length - 1 - index)}
              title={item.original_title}
              imagePath={baseImagePath("w342", item.poster_path)}
            />
          )}
        />

        <CategoryHeader title={"Upcoming"} />
        <FlatList
          data={upcomingMoviesList}
          keyExtractor={(item) => item.id}
          bounces={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 36 }}
          renderItem={({ item, index }) => (
            <SubMovieCard
              shouldMarginatedAtEnd={true}
              handleCard={() =>
                navigation.push("MovieDetails", { movieId: item.id })
              }
              cardWidth={width / 3}
              isFirst={!index}
              isLast={!(upcomingMoviesList?.length - 1 - index)}
              title={item.original_title}
              imagePath={baseImagePath("w342", item.poster_path)}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
