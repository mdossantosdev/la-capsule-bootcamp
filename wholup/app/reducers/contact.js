const ADD_CONTACT = 'ADD_CONTACT';

export default (state = [], action) => {
  if (action.type === ADD_CONTACT) {
    let contactList = [...state];
    let userExist = false;

    for (let contact of contactList) {
      if (contact.email === action.email) {
        userExist = true;
        return contactList;
      }
    }

    if (!userExist) {
      contactList.push({
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
        company: action.company,
        avatar: action.avatar
      });
    }

    return contactList;
  } else {
    return state;
  }
}
