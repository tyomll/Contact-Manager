import {
  SET_LIST_VIEW,
  SET_CARD_VIEW,
  SET_MODAL_EDIT,
  SET_INLINE_EDIT,
  SET_SAVED_SETTINGS,
} from "./types";

export const setListView = () => ({ type: SET_LIST_VIEW });
export const setCardView = () => ({ type: SET_CARD_VIEW });

export const setModalEdit = () => ({ type: SET_MODAL_EDIT });
export const setInlineEdit = () => ({ type: SET_INLINE_EDIT });

export const setSavedSettings = (settings ) => ({ type: SET_SAVED_SETTINGS , payload : settings });
