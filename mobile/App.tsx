import { StatusBar } from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";

import { Loading } from "./src/components/Loading";
import { Home } from "./src/screens/Home";
import * as NavigationBar from "expo-navigation-bar";
import { Routes } from "./src/routes";
import "./src/lib/dayjs.ts";

export default function App() {
  const [fontsLoader] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontsLoader) {
    return <Loading />;
  }

  NavigationBar.setBackgroundColorAsync("#09090a");

  return (
    <>
      <Routes />
      <StatusBar
        barStyle={"light-content"}
        backgroundColor="transparent"
        translucent
      />
    </>
  );
}
