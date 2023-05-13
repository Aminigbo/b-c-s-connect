import { legacy_createStore as createStore,combineReducers } from 'redux' 
// import logger from 'redux-logger'
// import thunk from 'redux-thunk'
import { persistStore, persistReducer  } from 'redux-persist'
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from '../state/reducer'

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  // whitelist: ['loggedIn']
}

const AllReducers = combineReducers({
  user: persistReducer(userPersistConfig, userReducer)
}) 

// const storeCreator = createStore(
//   AllReducers,
//   applyMiddleware(logger, thunk)
// )

let store = createStore(AllReducers)
let persistor = persistStore(store)

 // eslint-disable-next-line
export default () => {
  return {
    store,
    persistor
  }
}




// git branch -M main
// git remote add origin https://github.com/Aminigbo/predictor-supabase.git