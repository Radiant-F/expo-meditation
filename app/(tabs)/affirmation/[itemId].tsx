import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallery";
import { AffirmationCategory } from "@/constants/models/AffirmationCategory";
import AppGradient from "@/components/AppGradient";
import { AntDesign } from "@expo/vector-icons";

type Props = {};

const AffirmationPractice = (props: Props) => {
  const { itemId } = useLocalSearchParams();

  const [selectedAffirmation, setSelectedAffirmation] =
    useState<AffirmationCategory["data"]>();
  const [sentences, setSentences] = useState<string[]>([""]);

  function findSelectedAffirmation() {
    for (let i = 0; i < AFFIRMATION_GALLERY.length; i++) {
      const affirmationItem = AFFIRMATION_GALLERY[i].data;

      const selectedAffirmation = affirmationItem.find(
        (item) => item.id === Number(itemId)
      );

      if (selectedAffirmation) {
        setSelectedAffirmation(selectedAffirmation);

        // split the text by dot to get every sentences into an array
        const splitAffirmationText = selectedAffirmation.text
          .split(".")
          .map((text) => text.trim()) // remove whitespace
          .filter((text) => text !== "") // remove empty string
          .map((text) => text + "."); // add dot to each element

        setSentences(splitAffirmationText);

        return;
      }
    }
  }

  useEffect(() => {
    findSelectedAffirmation();
  }, []);

  return (
    <View className="flex-1">
      <ImageBackground
        source={selectedAffirmation?.image}
        resizeMode="cover"
        className="flex-1"
        resizeMethod="resize"
      >
        <AppGradient colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.9)"]}>
          <Pressable
            onPress={() => router.back()}
            // className="absolute top-16 left-6 z-10"
          >
            <AntDesign name="leftcircleo" size={50} color={"white"} />
          </Pressable>
          <ScrollView className="mt-5" showsVerticalScrollIndicator={false}>
            <View className="h-full justify-center">
              <View className="h-4/5 justify-center">
                {sentences.map((text) => (
                  <Text
                    key={text}
                    className="text-white text-3xl mb-12 font-bold text-center"
                  >
                    {text}
                  </Text>
                ))}
              </View>
            </View>
          </ScrollView>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default AffirmationPractice;
