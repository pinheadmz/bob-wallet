const initialState = {
  darkMode: false
};

export const toggleDarkMode = () => async (dispatch, getState) => {
  const {darkMode} = getState().settings;
  dispatch({type: 'TOGGLE_DARK_MODE', payload: !darkMode});
};

export default function myDomainsReducer(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case 'TOGGLE_DARK_MODE':
      return {...state, darkMode: payload};
    default:
      return state;
  }
}
