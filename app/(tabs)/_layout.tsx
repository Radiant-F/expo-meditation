import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

type Props = {};

const TabsLayout = (props: Props) => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <Tabs.Screen
        name="nature-meditate"
        options={{
          tabBarLabel: "Meditate",
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={focused ? "flower-tulip" : "flower-tulip-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="affirmation"
        options={{
          tabBarLabel: "Affirmation",
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={focused ? "book-open-variant" : "book-open-blank-variant"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
