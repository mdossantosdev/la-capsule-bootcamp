const GET_PROJECTS = 'GET_PROJECTS';
const GET_FAVORITES = 'GET_FAVORITES';

const initialState = {
  projects: [],
  favorites: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload
      }
    case GET_FAVORITES:
      return {
        ...state,
        favorites: action.payload
      }
    default:
      return state
  }
}
