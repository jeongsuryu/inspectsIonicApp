import AsyncStorage from '@react-native-async-storage/async-storage';

const authAcess = store => next => action => {
  return new Promise((resolve, reject)=> {
    AsyncStorage.getItem('@access_token', (err, result) => {
      if (err) reject(err);

      if (result === null) resolve(null);

      resolve(JSON.parse(result));
    });
  });

  console.log(store, next, action);
}

export default authAcess;