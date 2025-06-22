import { useLocalSearchParams } from "expo-router";
import { Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Restaurant = () => {
    const { restaurant } = useLocalSearchParams();
    return (
        <SafeAreaView style={[{ backgroundColor: "#2b2b2b" }, Platform.OS == "android" && { paddingBottom: 60 }, Platform.OS == "ios" && { paddingBottom: 20 }]}>
            <ScrollView className="h-full">
                <View className="flex-1 my-3 p-2">

                    <Text className="text-[#fb9b33] font-bold text-xl my-2">{restaurant}</Text>
                    <View className="border-b border-[#fb9b33]" />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Restaurant