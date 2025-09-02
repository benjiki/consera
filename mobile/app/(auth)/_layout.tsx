import { images } from "@/constants";
import { Slot } from "expo-router";
import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function auth_layout() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView className={"bg-primary h-full flex"}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View className="items-center mt-20">
            <Image
              source={images.MainIcon}
              style={{
                width: 200,
                height: 200,
                borderRadius: 40, // make it circular
                resizeMode: "cover",
              }}
            />
          </View>

          <Slot />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
