import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "@/components/CustomButton";
import { Href, router } from "expo-router";
import AppGradient from "@/components/AppGradient";

type Props = {};

const App = (props: Props) => {
  return (
    <View className="flex-1">
      <ImageBackground
        source={require("../assets/meditation-images/beach.webp")}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.8)"]}>
          <SafeAreaView className={`flex flex-1 px-1 justify-between`}>
            <View>
              <Text className="text-center text-white font-bold text-4xl">
                Simple Meditation
              </Text>
              <Text className="text-center text-white mt-3">
                Simplifying Meditation for Everyone
              </Text>
            </View>

            <View>
              <CustomButton
                onPress={() =>
                  router.push("/nature-meditate" as Href<string | object>)
                }
                title="Get Started"
              />
            </View>
          </SafeAreaView>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default App;
