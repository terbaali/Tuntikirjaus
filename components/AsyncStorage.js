import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'TUNNIT';

  const storeData = async (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      return "Data saved successfully";
    } 
    catch (error) {
      return "Error on adding data: ", error.toString();
    };
  };

  const addDateKey = async (date) => {
    try {
      const keys = await AsyncStorage.getItem('keys');
      let keysArray = keys ? JSON.parse(keys) : [];
      if (!keysArray.includes(date)) {
        keysArray.push(date);
        await AsyncStorage.setItem('keys', JSON.stringify(keysArray));
      }
    } catch (e) {
      console.error('Failed to add date key', e);
    }
  };

  const storeHours = async (date, data) => {
    try {
      console.log('Tallennetaas');
      console.log(date);
      console.log(data);
      await AsyncStorage.setItem(date, JSON.stringify(data));
      await addDateKey(date);
      console.log('Data successfully saved');
    } catch (e) {
      console.error('Failed to save the data to the storage', e);
    }
  };
 
  const getData = async () => {
    try {
      return AsyncStorage.getItem(STORAGE_KEY)
      .then(response => JSON.parse(response))
      .then(data => {
        if (data === null) data = [];
        return data;
      }).catch (error => {
        return error.toString();
      });
    } 
    catch (error) {
      return "Error on loading data: ", error.toString()
    };
  };

  const getAllData = async () => {
    try {
      ///*
      const keys = await AsyncStorage.getItem('keys');
      const keysArray = keys ? JSON.parse(keys) : [];
      console.log(keys);
      console.log(keysArray);
      console.log("gettistä");
      const data = await Promise.all(keysArray.map(async (key) => {
        console.log(key);
        const jsonData = await AsyncStorage.getItem(key);
        console.log(jsonData);
        console.log({ date: key, ...JSON.parse(jsonData) });
        return jsonData ? { date: key, ...JSON.parse(jsonData) } : null;
      }));
      //return data.filter(item => item !== null);
      console.log("data");
      console.log(data);
      return data.filter(item => item !== null);
      //*/
      //return await AsyncStorage.getItem('keys');
    } catch (e) {
      console.error('Failed to fetch all data', e);
    }
  };


  export {
    getData,
    storeData,
    storeHours,
    getAllData
  }