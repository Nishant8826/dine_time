import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, Linking, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePickerComponent from '../../components/restaurant/DateTimePickerComponent';
import GuestPicker from '../../components/restaurant/GuestPicker';
import { db } from "../../config/firebaseConfig";

const Restaurant = () => {
    const windowWidth = Dimensions.get("window").width;
    const { restaurant } = useLocalSearchParams();
    const carouselRef = useRef();
    const [loading, setLoading] = useState(true);
    const [restaurantData, setRestaurantData] = useState({});
    const [carouselData, setCarouselData] = useState({});
    const [slotsData, setSlotsData] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [date, setDate] = useState(new Date());
    const [guestCount, setGuestCount] = useState(2);


    const getRestaturantData = async () => {
        try {
            const restaurantQuery = query(collection(db, "restaurants"), where("name", "==", restaurant));
            const restaurantSnapshot = await getDocs(restaurantQuery);

            if (restaurantSnapshot.empty) {
                return console.log("No Matching Restaurant found");
            }


            for (const doc of restaurantSnapshot.docs) {
                const restaurantData = doc.data();
                setRestaurantData(restaurantData);

                const carouselQuery = query(collection(db, "carousel"), where("res_id", "==", doc.ref))
                const carouselSnapshot = await getDocs(carouselQuery);
                let carouselImages = []

                carouselSnapshot.forEach(doc => {
                    carouselImages.push(doc.data());
                })

                setCarouselData(carouselImages);

                const slotsQuery = query(collection(db, "slots"), where('ref_id', "==", doc.ref))
                const slotsSnapshot = await getDocs(slotsQuery);

                let slots = []

                slotsSnapshot.forEach(doc => {
                    slots.push(doc.data());
                })

                setSlotsData(slots);


            }


        } catch (error) {
            console.log('Error occured - getRestaturantData : ', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getRestaturantData();
    }, [])

    const handleNextImage = () => {
        let nextIndex;
        const carouselLength = carouselData[0]?.images.length;
        if (currentIndex < carouselLength - 1) {
            nextIndex = currentIndex + 1;
        } else if (currentIndex == carouselLength - 1) {
            nextIndex = 0;
        }
        setCurrentIndex(nextIndex);
        carouselRef.current.scrollToIndex({ index: nextIndex, animated: true })
    }

    const handlePrevImage = () => {
        let prevIndex;
        const carouselLength = carouselData[0]?.images.length;
        if (currentIndex > 0) {
            prevIndex = currentIndex - 1;
        } else if (currentIndex == 0) {
            prevIndex = carouselLength - 1;
        }
        setCurrentIndex(prevIndex);
        carouselRef.current.scrollToIndex({ index: prevIndex, animated: true })
    }

    const carouselItem = ({ item }) => {
        return (
            <View style={{ width: windowWidth - 2 }} className="h-64 relative">

                <View style={{ position: 'absolute', top: "40%", left: '2%', backgroundColor: "rgba(0,0,0,0.6)", borderRadius: 45, padding: 10, zIndex: 10 }}>
                    <Ionicons onPress={handlePrevImage} name="arrow-back" size={24} color="white" />
                </View>

                <View style={{ position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', bottom: 15, zIndex: 10, left: '38%', flexDirection: 'row' }}>
                    {
                        carouselData[0].images.map((_, i) => (
                            <View key={i} className={`h-2 w-2 bg-white p-1 mx-1 rounded-full ${i == currentIndex && 'h-3 w-3'}`} />
                        ))
                    }
                </View>
                <Image source={{ uri: item }} style={{ opacity: 0.5, backgroundColor: 'black', marginRight: 20, marginLeft: 5, borderRadius: 25 }} className="h-64" />

                <View style={{ position: 'absolute', top: "40%", right: '7%', backgroundColor: "rgba(0,0,0,0.6)", borderRadius: 50, padding: 10, zIndex: 10 }}>
                    <Ionicons onPress={handleNextImage} name="arrow-forward" size={24} color="white" />
                </View>


            </View>
        )
    }


    const handleLocation = async () => {
        const url = 'https://maps.app.goo.gl/rRUR9wZYTaykZGNA9';
        const support = await Linking.canOpenURL(url);
        if (support) {
            await Linking.openURL(url);
        } else {
            console.log("Don't know how to open url : ", url);
        }
    }

    return (
        <SafeAreaView style={[{ backgroundColor: "#2b2b2b" }, Platform.OS == "android" && { paddingBottom: 60 }, Platform.OS == "ios" && { paddingBottom: 20 }]}>
            <ScrollView className="min-h-full">
                <View className="flex-1 my-3 p-2">
                    <Text className="text-[#f49b33] font-bold text-xl my-2">{restaurant}</Text>
                    <View className="border-b border-[#f49b33]" />
                </View>
                <View className="h-64 max-w-[98%] mx-2 rounded-[25px]">
                    <FlatList ref={carouselRef} data={carouselData[0]?.images} renderItem={carouselItem} horizontal scrollEnabled={false} style={{ borderRadius: 25 }} showsHorizontalScrollIndicator={false} />
                </View>
                <View className="flex-1 flex-row mt-2 p-2">
                    <Ionicons name="location-sharp" size={24} className="mt-1" color="#f49b33" />
                    <Text className="text-white max-w-[75%] font-semibold">{restaurantData.address} | {"  "}
                        <Text onPress={handleLocation} className="text-[#f49b33] underline italic font-semibold flex items-center mt-1">Get Direction</Text>
                    </Text>
                </View>
                <View className="flex-1 flex-row text-center p-2">
                    <Ionicons name="time" size={20} color="#f49b33" />
                    <Text className="text-white max-w-[75%] font-semibold mx-1">{restaurantData.opening} - {restaurantData.closing} </Text>
                </View>

                <View className="">
                    <View className="flex-1 flex-row m-2 p-2 justify-end items-center">
                        <View className="flex-1 flex-row items-center">
                            <Ionicons name='calendar' size={24} color="#f49b33" />
                            <Text className="text-base text-white mx-2">Select Booking Date</Text>
                        </View>
                        <DateTimePickerComponent date={date} setDate={setDate} />
                    </View>
                    <View className="flex-1 flex-row bg-[#474747] rounded-lg m-2 p-3 justify-end items-center">
                        <View className="flex-1 flex-row items-center">
                            <Ionicons name='people' size={24} color="#f49b33" />
                            <Text className="text-base text-white mx-2">Select number of Guests</Text>
                        </View>
                        <GuestPicker guestCount={guestCount} setGuestCount={setGuestCount} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Restaurant