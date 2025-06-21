import { BlurView } from 'expo-blur';
import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ImageBackground, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from "../../assets/images/dinetimelogo.png";
import banner from "../../assets/images/homeBanner.png";
import { db } from '../../config/firebaseConfig';

const Home = () => {

    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        getRestaurants();
    }, [])

    const getRestaurants = async () => {
        const q = query(collection(db, 'restaurants'));
        const res = await getDocs(q);
        res.forEach(item => {
            setRestaurants((prev) => [...prev, item.data()])
        })
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity className="bg-[#5f5f5f] max-h-64 max-w-xs flex justify-center rounded-lg p-4 mx-4 shadow-md">
            <Image resizeMode='cover' source={{ uri: item.image }} className="h-28 mt-2 mb-1 rounded-lg" />
            <Text className="text-white text-lg font-bold mb-2">{item.name}</Text>
            <Text className="text-white text-base mb-2">{item.address}</Text>
            <Text className="text-white text-base mb-2">Open: {item.opening} - Close: {item.closing}</Text>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={[{ backgroundColor: "#2b2b2b" }, Platform.OS == "android" && { paddingBottom: 60 }, Platform.OS == "ios" && { paddingBottom: 20 }]}>
            <View className="flex items-center">
                <View className="bg-[#5f5f5f] w-11/12 rounded-lg shadow-lg justify-center items-center flex flex-row p-2">
                    <View className="flex flex-row">
                        <Text className="text-base h-10 align-middle text-white">
                            {" "}Welcome to {" "}
                        </Text>
                        <Image source={logo} resizeMode='cover' className="w-20 h-11" />
                    </View>
                </View>
            </View>
            <ScrollView stickyHeaderIndices={[0]}>
                <ImageBackground source={banner} resizeMode='cover' className="mb-4 bg-[#2b2b2b] w-full h-52 items-center justify-center">
                    <BlurView intensity={100} tint='dark' className="w-full p-4 shadow-lg">
                        <Text className="text-center text-4xl font-bold text-white">Dine with your loved ones</Text>
                    </BlurView>
                </ImageBackground>
                <View className="p-4 bg-[#2b2b2b] flex-row items-center">
                    <Text className="text-3xl font-semibold mr-2 text-white">Special Discount %</Text>
                </View>
                {
                    restaurants.length > 0 ? (
                        <FlatList data={restaurants} renderItem={renderItem} horizontal contentContainerStyle={{ padding: 16 }} showsHorizontalScrollIndicator={false} scrollEnabled={true} />
                    ) : (
                        <ActivityIndicator animating color={'#fff'} />
                    )
                }
                <View className="p-4 bg-[#2b2b2b] flex-row items-center">
                    <Text className="text-3xl font-semibold mr-2 text-[#fb9b33]">Our Restaurants</Text>
                </View>
                {
                    restaurants.length > 0 ? (
                        <FlatList data={restaurants} renderItem={renderItem} horizontal contentContainerStyle={{ padding: 16 }} showsHorizontalScrollIndicator={false} scrollEnabled={true} />
                    ) : (
                        <ActivityIndicator animating color={'#fb9b33'} />
                    )
                }
            </ScrollView>



        </SafeAreaView>
    )
}

export default Home;
