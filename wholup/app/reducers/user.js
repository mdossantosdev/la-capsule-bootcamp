const SET_USER = 'SET_USER';

export default (state = {}, action) => {
  if (action.type === SET_USER) {
    const user = {
      ...state,
      firstName: action.firstName,
      lastName: action.lastName,
      email: action.email,
    };
    return user;
  } else {
    return state;
  }
};
