import React from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ToastProvider } from "react-native-toast-notifications";

import TabNavigator from "./src/navigators/TabNavigator";
import MovieDetailsScreen from "./src/screens/MovieDetailsScreen";
import SeatBookingScreen from "./src/screens/SeatBookingScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_Black: require("./src/assets/fonts/Poppins-Black.ttf"),
    Poppins_BlackItalic: require("./src/assets/fonts/Poppins-BlackItalic.ttf"),
    Poppins_Bold: require("./src/assets/fonts/Poppins-Bold.ttf"),
    Poppins_BoldItalic: require("./src/assets/fonts/Poppins-BoldItalic.ttf"),
    Poppins_ExtraBold: require("./src/assets/fonts/Poppins-ExtraBold.ttf"),
    Poppins_ExtraBoldItalic: require("./src/assets/fonts/Poppins-ExtraBoldItalic.ttf"),
    Poppins_ExtraLight: require("./src/assets/fonts/Poppins-ExtraLight.ttf"),
    Poppins_ExtraLightItalic: require("./src/assets/fonts/Poppins-ExtraLightItalic.ttf"),
    Poppins_Italic: require("./src/assets/fonts/Poppins-Italic.ttf"),
    Poppins_Light: require("./src/assets/fonts/Poppins-Light.ttf"),
    Poppins_LightItalic: require("./src/assets/fonts/Poppins-LightItalic.ttf"),
    Poppins_Medium: require("./src/assets/fonts/Poppins-Medium.ttf"),
    Poppins_MediumItalic: require("./src/assets/fonts/Poppins-MediumItalic.ttf"),
    Poppins_Regular: require("./src/assets/fonts/Poppins-Regular.ttf"),
    Poppins_SemiBold: require("./src/assets/fonts/Poppins-SemiBold.ttf"),
    Poppins_SemiBoldItalic: require("./src/assets/fonts/Poppins-SemiBoldItalic.ttf"),
    Poppins_Thin: require("./src/assets/fonts/Poppins-Thin.ttf"),
    Poppins_ThinItalic: require("./src/assets/fonts/Poppins-ThinItalic.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <ToastProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Tab" component={TabNavigator} />
          <Stack.Screen
            name="MovieDetails"
            component={MovieDetailsScreen}
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="SeatBooking"
            component={SeatBookingScreen}
            options={{ animation: "slide_from_bottom" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
}
