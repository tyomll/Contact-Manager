import { createContext, useContext, useReducer } from "react";
import { SET_SAVED_SETTINGS } from "./actions/types";

const AppContext = createContext(null);
const AppDispatchContext = createContext(null);

const initialSettings = {
  viewMode: true,
};

export const AppProvider = ({ children }) => {
  const [settings, dispatch] = useReducer(appReducer, initialSettings);
  return (
    <AppContext.Provider value={settings}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};

function appReducer(settings, action) {
  switch (action.type) {
    case SET_SAVED_SETTINGS:
      return {
        ...settings,
        ...action.payload,
      };
    default:
      return {
        ...settings,
      };
  }
}

export function useSettings() {
  return useContext(AppContext);
}

export function useSettingsDispatch() {
  return useContext(AppDispatchContext);
}
