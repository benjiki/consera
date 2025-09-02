import { images } from "@/constants";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-primary">
      {/* main container  */}
      <View className="flex  items-center mt-5 gap-5">
        <Image source={images.MainScreenImage} />
        <Text className="text-white text-xl font-bold text-center leading-snug">
          Your Ultimate Destination for
          {"\n"}
          Concerts Tickets and Merchendice
        </Text>

        <Link
          href={"/sigin-up"}
          className="rounded-full px-20 py-5 color-white bg-secondary"
        >
          Lets go
        </Link>
      </View>
    </SafeAreaView>
  );
}
