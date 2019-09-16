export const types = {
  LOADING: "_global/LOADING",
  MESSAGE: "_global/MESSAGE",
  ERROR: "_global/ERROR"
};

export const creators = {
  loading: (bool) => ({
    type: types.LOADING,
    payload: bool
  }),
  message: message => ({
    type: types.MESSAGE,
    payload: message
  }),
  error: () => ({ type: types.ERROR })
};

const INITIAL_STATE = {
  message: { type: "", text: "" },
  loading: false,
  error: false
};

export default function global(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.LOADING:
      return { ...state, loading: action.payload };
    case types.MESSAGE:
      return { ...state, message: action.payload };
    case types.ERROR:
      return { ...state, error: !state.error };
    default:
      return state;
  }
}
