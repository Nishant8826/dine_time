import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';

const DateTimePickerComponent = ({ date, setDate }) => {
    const [show, setShow] = useState(false);

    const handleChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    }

    const handlePress = () => {
        setShow(true);
    };

    return (
        <View className="flex flex-row p-2">
            <TouchableOpacity onPress={handlePress} className={`rounded-lg text-white text-base ${Platform.OS == "android" && "px-2 py-1 justify-center bg-[#474747]"
                }`}>
                <Text className="text-white font-semibold px-2 py-1 bg-[#474747]">
                    {date.toLocaleDateString()}
                </Text>
                {Platform.OS === 'android' && show && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        accentColor='#f4b933'
                        textColor='#f4b933'
                        display="default"
                        minimumDate={new Date()}
                        maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
                        onChange={handleChange}
                    />
                )}

                {Platform.OS === 'ios' && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        accentColor='#f4b933'
                        textColor='#f4b933'
                        display="spinner"
                        minimumDate={new Date()}
                        maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
                        onChange={handleChange}
                    />
                )}
            </TouchableOpacity >

        </View>
    );
};

export default DateTimePickerComponent;
