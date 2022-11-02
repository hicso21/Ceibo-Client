import {configureStore} from "@reduxjs/toolkit";
import logger from "redux-logger";
import foundationsReducer from "./foundations";
import petsReducer from "./pets";
import userReducer from "./user";
import searchReducer from "./search";

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(logger),
    reducer: {
      user: userReducer,
      pets: petsReducer,
      foundations: foundationsReducer,
      search:searchReducer,
      },
  });

export default store;
