const GET_PROJECTS = 'GET_PROJECTS';
const ADD_FAVORITES = 'ADD_FAVORITES';
const REMOVE_FAVORITES = 'REMOVE_FAVORITES';
const DISPLAY_FAVORITES = 'DISPLAY_FAVORITES';

const initialState = {
  projects: [],
  displayFavorites: false
}

const addFavorites = (projects, idProject) => {
  return projects.map((project) => {
    if (project.id_project === idProject) {
      return { ...project, favorites: true }
    } else {
      return project
    }
  })
};

const removeFavorites = (projects, idProject) => {
  return projects.map((project) => {
    if (project.id_project === idProject) {
      return { ...project, favorites: false }
    } else {
      return project
    }
  })
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload
      }
    case ADD_FAVORITES:
      return {
        ...state,
        projects: addFavorites(state.projects, action.payload)
      }
    case REMOVE_FAVORITES:
      return {
        ...state,
        projects: removeFavorites(state.projects, action.payload)
      }
    case DISPLAY_FAVORITES:
      return {
        ...state,
        displayFavorites: action.payload
      }
    default:
      return state
  }
}
