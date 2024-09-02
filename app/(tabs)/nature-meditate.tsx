import {
  View,
  Text,
  FlatList,
  Pressable,
  ImageBackground,
  ImageBackgroundProps,
} from "react-native";
import React from "react";
import AppGradient from "@/components/AppGradient";
import { MEDITATION_DATA } from "@/constants/MeditationData";
import DATA from "@/constants/meditation-images";
import { LinearGradient } from "expo-linear-gradient";
import { Href, router } from "expo-router";

type Props = {};

const NatureMeditate = (props: Props) => {
  return (
    <View className="flex-1">
      <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
        <View className="mb-6">
          <Text className="text-gray-200 mb-3 font-bold text-4xl text-left">
            Welcome NyQuil
          </Text>
          <Text className="text-indigo-100 text-xl font-medium">
            Start your meditation practice today
          </Text>
        </View>

        <View>
          <FlatList
            className="mb-20"
            showsVerticalScrollIndicator={false}
            data={MEDITATION_DATA}
            renderItem={({ item }) => {
              return (
                <Pressable
                  onPress={() =>
                    router.push(`/meditate/${item.id}` as Href<"/meditate">)
                  }
                  className="h-48 my-3 rounded-md overflow-hidden"
                >
                  <ImageBackground
                    source={DATA[item.id - 1] as ImageBackgroundProps}
                    resizeMode="cover"
                    className="flex-1 rounded-lg justify-center"
                    resizeMethod="resize"
                  >
                    <LinearGradient
                      colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
                      className="flex-1 justify-center items-center"
                    >
                      <Text className="text-gray-100 text-3xl font-bold text-center">
                        {item.title}
                      </Text>
                    </LinearGradient>
                  </ImageBackground>
                </Pressable>
              );
            }}
          />
        </View>
      </AppGradient>
    </View>
  );
};

export default NatureMeditate;
