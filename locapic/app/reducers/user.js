const SIGN_IN = 'SIGN_IN';

export default (user = {}, action) => {
  if (action.type === SIGN_IN) {
    return action.user;
  } else {
    return user;
  }
}
