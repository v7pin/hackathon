// src/redux/userReducer.js
const initialState = {
  role: null, // role can be 'surveillancePartner' or 'safetyAlertsUser'
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_ROLE':
      return {
        ...state,
        role: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
