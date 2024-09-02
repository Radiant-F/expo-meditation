import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  children: React.JSX.Element[] | React.JSX.Element;
  colors: string[];
};

const AppGradient = ({ children, colors }: Props) => {
  return (
    <LinearGradient
      className="flex-1"
      colors={colors}
      style={{
        paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 20 : 0,
      }}
    >
      <SafeAreaView className="flex-1 px-5 py-3">{children}</SafeAreaView>
    </LinearGradient>
  );
};

export default AppGradient;
