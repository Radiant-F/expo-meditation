import { View, Text, ScrollView } from "react-native";
import React from "react";
import AppGradient from "@/components/AppGradient";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallery";
import GuidedAffirmationGallery from "@/components/GuidedAffirmationGallery";

type Props = {};

const Affirmation = (props: Props) => {
  return (
    <View className="flex-1">
      <AppGradient colors={["#2e1f58", "#54426b", "#a790af"]}>
        <ScrollView>
          <Text className="text-zinc-50 text-3xl font-bold">
            Change your beliefs with affirmations
          </Text>

          <View>
            {AFFIRMATION_GALLERY.map((v) => (
              <GuidedAffirmationGallery
                key={v.title}
                title={v.title}
                previews={v.data}
              />
            ))}
          </View>
        </ScrollView>
      </AppGradient>
    </View>
  );
};

export default Affirmation;
