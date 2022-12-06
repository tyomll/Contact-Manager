import { createContext, useContext, useReducer } from "react";
import { SET_LIST_VIEW, SET_CARD_VIEW } from "./actions/types";

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
    case SET_LIST_VIEW:
      localStorage.setItem(
        "viewMode",
        JSON.stringify(JSON.parse(true))
      );
      return {
        ...settings,
        viewMode: true,
      };
    case SET_CARD_VIEW:
        localStorage.setItem(
            "viewMode",
            JSON.stringify(JSON.parse(false))
          );
      return {
        ...settings,
        viewMode: false,
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
