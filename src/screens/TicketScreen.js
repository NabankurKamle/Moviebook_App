import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppHeader from "../components/AppHeader";
import { COLORS } from "../theme/theme";

const TicketScreen = ({ navigation, route }) => {
  const [ticketData, setTicketData] = useState(route.params);

  const getTicket = async () => {
    try {
      const ticket = await AsyncStorage.getItem("ticket");
      if (ticket) setTicketData(JSON.parse(ticket));
    } catch (error) {
      console.error("Something went wrong in getTicket function", error);
    }
  };

  useEffect(() => {
    getTicket();
  }, []);

  if (ticketData !== route.params && route.params !== undefined)
    setTicketData(route.params);

  if (!ticketData)
    return (
      <View className="flex-[1] bg-Black">
        <StatusBar hidden />
        <View className="mx-space_36 mt-[40px]">
          <AppHeader
            name="close-circle-outline"
            header={""}
            handleClick={() => navigation.goBack()}
          />
        </View>
      </View>
    );

  return (
    <View className="flex-[1] bg-Black">
      <StatusBar hidden />
      <View
        className={`mx-space_36  ${
          Platform.OS === "ios" ? `mt-[40px]` : ``
        } z-10`}
      >
        <AppHeader
          name="close-circle-outline"
          header={"My Tickets"}
          handleClick={() => navigation.goBack()}
        />
      </View>

      <View className="flex-[1] justify-center ">
        <ImageBackground
          className="self-center w-[280] aspect-[200/300] rounded-t-[25px] overflow-hidden justify-end"
          source={{ uri: ticketData?.ticketImage }}
        >
          <LinearGradient
            colors={[COLORS.GreenRGBA0, COLORS.Green]}
            style={{ height: "70%" }}
          >
            <View
              style={{ borderRadius: 40 }}
              className="h-[80] w-[80] bg-Black absolute bottom-[-40] left-[-40]"
            />
            <View
              style={{ borderRadius: 40 }}
              className="h-[80] w-[80] bg-Black absolute bottom-[-40] right-[-40]"
            />
          </LinearGradient>
        </ImageBackground>
        <View
          style={{
            borderStyle: "dashed",
          }}
          className="border-t-[#000] border-t-[2px]  self-center bg-Green border-dashed"
        ></View>

        <View className="bg-Green w-[280] pb-space_20 items-center self-center rounded-b-[25px]">
          <View
            style={{ borderRadius: 40 }}
            className="h-[80] w-[80] bg-Black absolute top-[-40] left-[-40]"
          />
          <View
            style={{ borderRadius: 40 }}
            className="h-[80] w-[80] bg-Black absolute top-[-40] right-[-40]"
          />
          <View className="flex-row space-x-space_36 items-center justify-center  my-space_10">
            <View className="items-center">
              <Text className="font-Poppins_Medium text-size_24 text-White">
                {ticketData?.date?.date}
              </Text>
              <Text className="font-Poppins_Regular text-size_14 text-White">
                {ticketData?.date?.day}
              </Text>
            </View>

            <View className="items-center space-y-space_8">
              <MaterialCommunityIcons
                name="clock-outline"
                size={24}
                color={COLORS.White}
              />
              <Text className="font-Poppins_Regular text-size_12 text-White">
                {ticketData?.time}
              </Text>
            </View>
          </View>

          <View className="flex-row space-x-space_36 items-center justify-center my-space_10">
            <View className="items-center">
              <Text className="font-Poppins_Medium text-size_18 text-White">
                Hall
              </Text>
              <Text className="font-Poppins_Regular text-size_12 text-White">
                02
              </Text>
            </View>

            <View className="items-center">
              <Text className="font-Poppins_Medium text-size_18 text-White">
                Row
              </Text>
              <Text className="font-Poppins_Regular text-size_12 text-White">
                04
              </Text>
            </View>

            <View className="items-center">
              <Text className="font-Poppins_Medium text-size_18 text-White">
                Seats
              </Text>
              <Text className="font-Poppins_Regular text-size_12 text-White">
                {ticketData?.seatArray
                  .slice(0, 3)
                  .map(
                    (item, index, arr) =>
                      item + (index === arr.length - 1 ? "" : ", ")
                  )}
              </Text>
            </View>
          </View>
          <Image
            className="h-[50] aspect-[158/52]"
            source={require("../assets/images/barcode.png")}
          />
        </View>
      </View>
    </View>
  );
};

export default TicketScreen;
