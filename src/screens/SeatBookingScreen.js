import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  FlatList,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { COLORS } from "../theme/theme";
import AppHeader from "../components/AppHeader";

const timeArray = ["10:30", "12:30", "14:30", "15:00", "19:30", "21:00"];

const generateDate = () => {
  const date = new Date();
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekdays = [];
  for (let i = 0; i < 7; i++) {
    const tempDate = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
      day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
    };
    weekdays.push(tempDate);
  }
  return weekdays;
};

const generateSeats = () => {
  let numRow = 8;
  let numColumn = 3;
  let rowArray = [];
  let start = 1;
  let reachnine = false;

  for (let i = 0; i < numRow; i++) {
    let columnArray = [];
    for (let j = 0; j < numColumn; j++) {
      let seatObj = {
        number: start,
        taken: Boolean(Math.round(Math.random())),
        selected: false,
      };
      columnArray.push(seatObj);
      start++;
    }
    if (i === 3) numColumn += 2;

    if (numColumn < 9 && !reachnine) numColumn += 2;
    else {
      reachnine = true;
      numColumn -= 2;
    }

    rowArray.push(columnArray);
  }
  return rowArray;
};

const SeatBookingScreen = ({ navigation, route }) => {
  const [dateArray, setDateArray] = useState(generateDate());
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [price, setPrice] = useState(0);
  const [twoDSeatArray, setTwoDSeatArray] = useState(generateSeats());
  const [selectedSeatArray, setSelectedSeatArray] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);

  const toast = useToast();

  const selectSeat = (index, subindex, num) => {
    if (!twoDSeatArray[index][subindex].taken) {
      const array = [...selectedSeatArray];
      let temp = [...twoDSeatArray];

      temp[index][subindex].selected = !temp[index][subindex].selected;

      if (!array.includes(num)) {
        array.push(num);
        setSelectedSeatArray(array);
      } else {
        const tempindex = array.indexOf(num);

        if (tempindex > -1) {
          array.splice(tempindex, 1);
          setSelectedSeatArray(array);
        }
      }
      setPrice(array.length * 230.0);
      setTwoDSeatArray(temp);
    }
  };

  const bookSeats = async () => {
    if (selectedSeatArray.length) {
      try {
        await AsyncStorage.setItem(
          "ticket",
          JSON.stringify({
            seatArray: selectedSeatArray,
            time: timeArray[selectedTimeIndex],
            date: dateArray[selectedDateIndex],
            ticketImage: route.params.posterImage,
          })
        );
      } catch (error) {
        console.error("Something went wrong in bookSeats function", error);
      }

      navigation.navigate("Ticket", {
        seatArray: selectedSeatArray,
        time: timeArray[selectedTimeIndex],
        date: dateArray[selectedDateIndex],
        ticketImage: route.params.posterImage,
      });
    } else {
      toast.show("Please select seats", {
        type: "normal",
        placement: "bottom",
        duration: 1000,
        offset: 30,
        animationType: "slide-in",
      });
    }
  };

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      className="flex-[1] bg-Black"
    >
      <StatusBar hidden />

      <View>
        <ImageBackground
          className="w-full aspect-[3072/1727]"
          source={{ uri: route.params?.bgImage }}
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
        <Text className="text-center font-Poppins_Regular text-size_14 text-WhiteRGBA15">
          Screen this side
        </Text>
      </View>

      <View className="my-space_20">
        <View className="gap-space_8 ">
          {twoDSeatArray?.map((item, index) => (
            <View
              key={index}
              className="flex-row gap-space_8 justify-center mr-2"
            >
              {item?.map((subitem, subindex) => (
                <TouchableOpacity
                  key={subitem.number}
                  onPress={() => {
                    selectSeat(index, subindex, subitem.number);
                  }}
                >
                  <MaterialCommunityIcons
                    name="seat"
                    size={35}
                    color={
                      subitem.taken
                        ? COLORS.Grey
                        : subitem.selected
                        ? COLORS.Green
                        : COLORS.White
                    }
                  />
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        <View className=" mt-space_36 mb-space_10 flex-row items-center justify-evenly">
          <View className="flex-row gap-space_10 items-center">
            <MaterialCommunityIcons
              name="radiobox-marked"
              size={20}
              color={COLORS.White}
            />
            <Text className="font-Poppins_Medium text-size_12 text-White">
              Available
            </Text>
          </View>

          <View className="flex-row gap-space_10 items-center">
            <MaterialCommunityIcons
              name="radiobox-marked"
              size={20}
              color={COLORS.Grey}
            />
            <Text className="font-Poppins_Medium text-size_12 text-White">
              Taken
            </Text>
          </View>

          <View className="flex-row gap-space_10 items-center">
            <MaterialCommunityIcons
              name="radiobox-marked"
              size={20}
              color={COLORS.Green}
            />
            <Text className="font-Poppins_Medium text-size_12 text-White">
              Selected
            </Text>
          </View>
        </View>
      </View>

      <View className="">
        <FlatList
          data={dateArray}
          keyExtractor={(item) => item.date}
          horizontal
          contentContainerStyle={{
            gap: 24,
          }}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => setSelectedDateIndex(index)}>
              <View
                style={{
                  borderRadius: 100,
                }}
                className={` bg-DarkGrey ${
                  !index
                    ? `ml-space_24`
                    : !(dateArray.length - 1 - index)
                    ? `mr-space_24`
                    : ``
                } ${
                  index === selectedDateIndex ? `bg-Green` : ``
                } w-[70] h-[100]  items-center justify-center`}
              >
                <Text className="font-Poppins_Medium text-size_24 text-White">
                  {item.date}
                </Text>
                <Text className="font-Poppins_Regular text-size_12 text-White">
                  {item.day}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <View className="my-space_24">
        <FlatList
          data={timeArray}
          keyExtractor={(item) => item}
          horizontal
          contentContainerStyle={{
            gap: 24,
          }}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => setSelectedTimeIndex(index)}>
              <View
                style={{
                  borderRadius: 100,
                }}
                className={` bg-DarkGrey border border-WhiteRGBA50 rounded-[25] ${
                  !index
                    ? `ml-space_24`
                    : !(dateArray.length - 1 - index)
                    ? `mr-space_24`
                    : ``
                } ${
                  index === selectedTimeIndex ? `bg-Green` : ``
                } items-center justify-center py-space_10 px-space_20`}
              >
                <Text className="font-Poppins_Regular text-size_14 text-White">
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <View className="flex-row justify-between items-center px-space_24 pb-space_24">
        <View className="items-center">
          <Text className="font-Poppins_Regular text-size_14 text-Grey ">
            Total Price
          </Text>
          <Text className="font-Poppins_Medium text-size_24 text-White ">
            ₹ {price}.00
          </Text>
        </View>

        <TouchableOpacity onPress={bookSeats}>
          <Text
            style={{
              borderRadius: Platform.OS === "ios" ? 20 : 30,
            }}
            className=" overflow-hidden px-space_24 py-space_10 font-Poppins_SemiBold text-size_16 text-White bg-Green "
          >
            Buy Tickets
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SeatBookingScreen;
