const { actionTypes } = require("./actions");

const reducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, user: action.user };

    default:
      return state;
  }
};

export default reducer;
