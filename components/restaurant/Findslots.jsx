import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Findslots = ({ date, guestCount, slots, selectedSlot, setSelectedSlot }) => {
    const [slotsVisible, setSlotsVisible] = useState(false);

    const handleSlots = () => {
        setSlotsVisible(!slotsVisible);
    }

    const handleSlotPres = (slot) => {
        let previous = selectedSlot;
        if (previous == slot) {
            setSelectedSlot(null);
        } else {
            setSelectedSlot(slot);
        }

    }

    return (
        <View className="flex-1">
            <View className={`flex ${selectedSlot != null && "flex-row"}`}>
                <View className={`${selectedSlot != null && "flex-1"}`}>
                    <TouchableOpacity onPress={handleSlots}>
                        <Text className="text-center text-lg font-semibold bg-[#f49b33] p-2 my-3 mx-2 rounded-lg">Find Slots</Text>
                    </TouchableOpacity>
                </View>
                <View className="flex-1">

                    {selectedSlot != null && (
                        <TouchableOpacity>
                            <Text className="text-center text-lg font-semibold bg-[#f49b33] p-2 my-3 mx-2 rounded-lg text-white">Book Slot</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            {slotsVisible && (
                <View className="flex-wrap flex-row mx-2 p-2 bg-[#474747] rounded-lg">
                    {
                        slots.map((slot, index) => (
                            <TouchableOpacity onPress={() => handleSlotPres(slot)} key={index} className={`m-2 p-4 bg-[#f49b33] rounded-lg items-center justify-center ${selectedSlot && selectedSlot !== slot && "opacity-50"}`} disabled={selectedSlot == slot || selectedSlot == null ? false : true}>
                                <Text className="text-white font-semibold">{slot}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            )}
        </View>
    )
}

export default Findslots