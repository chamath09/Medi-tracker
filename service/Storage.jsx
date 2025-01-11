import AsyncStorage from "@react-native-async-storage/async-storage"

export const setLocalStorage = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value); // Serialize to JSON
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error("Error setting local storage:", error);
  }
};




export const getLocalStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null; // Parse JSON if it exists
  } catch (error) {
    console.error("Error getting local storage:", error);
  }
};


export const removeLocalStorage = async() => {
    await AsyncStorage.clear();
}

