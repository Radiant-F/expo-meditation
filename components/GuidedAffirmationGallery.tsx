import { View, Text, FlatList, Pressable, Image } from "react-native";
import React from "react";
import { AffirmationCategory } from "@/constants/models/AffirmationCategory";
import { Href, Link } from "expo-router";

type Props = {
  title: string;
  previews: AffirmationCategory["data"][];
};

const GuidedAffirmationGallery = ({ title, previews }: Props) => {
  return (
    <View className="my-5">
      <View className="mb-2">
        <Text className="text-white font-bold text-xl">{title}</Text>
      </View>
      <View className="space-y-2">
        <FlatList
          horizontal
          data={previews}
          renderItem={({ item }) => {
            return (
              <Link
                href={`/affirmation/${item.id}` as Href<string | object>}
                asChild
              >
                <Pressable>
                  <View className="h-36 w-32 rounded-md mr-4">
                    <Image
                      source={item.image}
                      resizeMode="cover"
                      className="w-full h-full"
                      resizeMethod="resize"
                    />
                  </View>
                </Pressable>
              </Link>
            );
          }}
        />
      </View>
    </View>
  );
};

export default GuidedAffirmationGallery;
