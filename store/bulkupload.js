import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { carouselImages, restaurants, slots } from "./restaurants";


const restaurantsData = restaurants;
const carouselImagesData = carouselImages;
const slotsData = slots;

export const uploadData = async () => {
    try {
        for (let i = 0; i < restaurantsData.length; i++) {
            const rest = restaurantsData[i];
            const docRef = doc(collection(db, "restaurants"), `restaurant_${i + 1}`)
            await setDoc(docRef, rest);
        }
        for (let i = 0; i < carouselImagesData.length; i++) {
            const rest = carouselImagesData[i];
            const docRef = doc(collection(db, "carousel"), `carousel_${i + 1}`)
            await setDoc(docRef, rest);
        }
        for (let i = 0; i < slotsData.length; i++) {
            const rest = slotsData[i];
            const docRef = doc(collection(db, "slots"), `slot_${i + 1}`)
            await setDoc(docRef, rest);
            console.log('Restaurant Data uploaded successfully')
        }
    } catch (error) {
        console.log("Error - uploadData : ", error)
    }
} 