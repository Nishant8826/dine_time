import { useRouter } from "expo-router";
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../assets/images/dinetimelogo.png";
import entryImg from "../assets/images/Frame.png";

export default function Index() {

  const router = useRouter();

  return (
    <SafeAreaView className={`bg-[#2b2b2b]`}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#2b2b2b"} />
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="m-2 flex justify-center items-center">
          <Image source={logo} style={{ height: 300, width: 300 }} />
          <View className="w-3/4">
            <TouchableOpacity onPress={() => router.push('/signup')} className="p-2 my-2 bg-[#f49b33] text-black rounded-lg">
              <Text className="text-lg text-center font-semibold">Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/home')} className="p-2 my-2 border border-[#f49b33] bg-[#2b2b2b] text-[#f49b33] rounded-lg">
              <Text className="text-lg text-center font-semibold text-[#f49b33]">Guest User</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text className="text-center text-lg font-semibold my-4 text-white">
              <View className="w-24 border-b-2 border-[#f49b33] p-2 mb-1" />
              {"    "}or{" "}
              <View className="w-24 border-b-2 border-[#f49b33] p-2 mb-1" />
            </Text>

            <TouchableOpacity onPress={() => router.push('./signin')} className="flex flex-row justify-center items-center">
              <Text className="text-white font-semibold">Already a User?{" "}</Text>
              <Text className="font-semibold underline text-base text-[#f49b33]">Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-1">
          <Image source={entryImg} className="w-full h-full" resizeMode="contain" />
        </View>
        <StatusBar barStyle={"light-content"} backgroundColor={"#2b2b2b"} />
      </ScrollView>
    </SafeAreaView>
  );
}
