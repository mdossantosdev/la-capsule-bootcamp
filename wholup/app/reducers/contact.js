const ADD_CONTACT = 'ADD_CONTACT';

export default (state = [], action) => {
  if (action.type === ADD_CONTACT) {
    let contactListCopy = [...state];
    let userExist = false;

    for (let contact of contactListCopy) {
      if (contact.email === action.email) {
        userExist = true;
        return contactListCopy;
      }
    }

    if (!userExist) {
      contactListCopy.push({
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
        company: action.company,
        avatar: action.avatar
      });
    }

    return contactListCopy;
  } else {
    return state;
  }
}
