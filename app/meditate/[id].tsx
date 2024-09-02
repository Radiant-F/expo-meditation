import {
  View,
  Text,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import ImgBackground from "@/constants/meditation-images";
import AppGradient from "@/components/AppGradient";
import { Href, router, useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import { Audio } from "expo-av";
import { AUDIO_FILES, MEDITATION_DATA } from "@/constants/MeditationData";

type Props = {};

const Meditate = (props: Props) => {
  const { id: meditateId } = useLocalSearchParams();
  const [isMeditating, setIsMeditating] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (timeRemaining == 0) {
      setIsMeditating(false);
      return;
    }

    if (isMeditating && timeRemaining) {
      timerId = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [isMeditating, timeRemaining]);
  // format remaining times to text
  const minutes = Math.floor(timeRemaining / 60);
  const remainingSeconds = timeRemaining % 60;
  // pad the minutes and seconds with leading zeros
  const minutesString = String(minutes).padStart(2, "0");
  const secondsString = String(remainingSeconds).padStart(2, "0");
  const formattedTime = `${minutesString}:${secondsString}`;

  const [audioSound, setAudioSound] = useState<Audio.Sound>();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  async function initializeSound() {
    const audioFileName = MEDITATION_DATA[Number(meditateId) - 1].audio;
    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);

    setAudioSound(sound);
  }
  async function toggleSound() {
    const sound = audioSound ? audioSound : await initializeSound();

    const status = await sound?.getStatusAsync();

    if (status?.isLoaded && !isAudioPlaying) {
      await sound?.playAsync();
      setIsAudioPlaying(true);
    } else {
      await sound?.pauseAsync();
      setIsAudioPlaying(false);
    }
  }
  async function toggleMeditationSessionStatus() {
    setIsMeditating(!isMeditating);
    if (timeRemaining == 0) setTimeRemaining(10);
    await toggleSound();
  }
  useEffect(() => {
    return () => {
      audioSound?.unloadAsync();
    };
  }, [audioSound]);

  async function adjustMeditationDuration() {
    if (isMeditating) toggleMeditationSessionStatus();

    router.push("/(modal)/adjust-meditation-duration" as Href);
  }

  return (
    <View className="flex-1">
      <ImageBackground
        source={ImgBackground[Number(meditateId) - 1] as ImageSourcePropType}
        resizeMode="cover"
        className="flex-1"
        resizeMethod="resize"
      >
        <AppGradient colors={["transparent", "rgba(0,0,0,0.8)"]}>
          <Pressable onPress={() => router.back()}>
            <AntDesign name="leftcircleo" size={50} color={"white"} />
          </Pressable>

          <View className="flex-1 justify-center">
            <View className="mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center">
              <Text className="text-4xl text-blue-800 font-rmono">
                {formattedTime}
              </Text>
            </View>
          </View>

          <View className="mb-5">
            <CustomButton
              title={"Adjust Duration"}
              onPress={() => adjustMeditationDuration()}
            />
            <View className="my-2.5" />
            <CustomButton
              title={isMeditating ? "Stop Meditate" : "Start Meditate"}
              onPress={() => toggleMeditationSessionStatus()}
            />
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default Meditate;
