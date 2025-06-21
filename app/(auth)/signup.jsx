import { useRouter } from "expo-router";
import { Formik } from "formik";
import { Image, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/dinetimelogo.png";
import entryImg from "../../assets/images/Frame.png";
import { validationSchema } from "../../utils/authSchema.js";


const Signup = () => {
    const router = useRouter();

    const handleSubmit = () => {

    }

    return (
        <SafeAreaView className={`bg-[#2b2b2b]`}>
            <StatusBar barStyle={"light-content"} backgroundColor={"#2b2b2b"} />
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View className="m-2 flex justify-center items-center">
                    <Image source={logo} style={{ height: 100, width: 200 }} />
                    <Text className="text-lg text-white font-bold text-center mb-10">Let's get you started</Text>

                    <View className="w-5/6">
                        <Formik initialValues={{ email: "", password: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
                            {({ touched, handleChange, handleBlur, handleSubmit, values, errors }) => (

                                <View className="w-full">
                                    <Text className="mt-4 mb-2 text-[#f49b33]">Email</Text>
                                    <TextInput className="h-10 text-white border border-white rounded px-2" onChangeText={handleChange('email')} value={values.email} onBlur={handleBlur('email')} keyboardType="email-address" />
                                    {touched.email && errors.email && (
                                        <Text className="text-red-500 text-xs mb-2">
                                            {errors.email}
                                        </Text>
                                    )}
                                    <Text className="mt-4 mb-2 text-[#f49b33]">Password</Text>
                                    <TextInput className="h-10 text-white border border-white rounded px-2" onChangeText={handleChange('password')} value={values.password} onBlur={handleBlur('password')} secureTextEntry />
                                    {touched.password && errors.password && (
                                        <Text className="text-red-500 text-xs mb-2">
                                            {errors.password}
                                        </Text>
                                    )}

                                    <TouchableOpacity onPress={handleSubmit} className="p-2 my-2 mt-10 bg-[#f49b33] text-black rounded-lg">
                                        <Text className="text-lg text-center font-semibold">Sign up</Text>
                                    </TouchableOpacity>

                                </View>


                            )}
                        </Formik>

                        <View>
                            <TouchableOpacity onPress={() => router.push('./signin')} className="flex flex-row my-5 p-2 justify-center items-center">
                                <Text className="text-white font-semibold">Already a user?{" "}</Text>
                                <Text className="font-semibold underline text-base text-[#f49b33]">Sign in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>

                <View className="flex-1">
                    <Image source={entryImg} className="w-full h-full" resizeMode="contain" />
                </View>
                <StatusBar barStyle={"light-content"} backgroundColor={"#2b2b2b"} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Signup