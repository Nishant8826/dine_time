import { Text, TouchableOpacity, View } from 'react-native';

const GuestPicker = ({ guestCount, setGuestCount }) => {
    const decrement = () => {
        if (guestCount > 1) setGuestCount(guestCount - 1);
    }
    const increment = () => {
        if (guestCount < 12) setGuestCount(guestCount + 1);
    }
    return (
        <View className="flex flex-row items-center rounded-lg text-white text-base">
            <TouchableOpacity onPress={decrement} className="rounded">
                <Text className="text-white text-lg border border-[#f49b33] rounded-l-lg px-3">-</Text>
            </TouchableOpacity>
            <Text className="px-3 text-white bg-[#474747] border border-[#474747] text-lg">{guestCount}</Text>
            <TouchableOpacity onPress={increment} className="rounded">
                <Text className="text-white text-lg border border-[#f49b33] rounded-r-lg px-3">+</Text>
            </TouchableOpacity>
        </View>
    )
}

export default GuestPicker