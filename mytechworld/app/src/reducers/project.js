const GET_PROJECTS = 'GET_PROJECTS';
const ADD_FAVORITES = 'ADD_FAVORITES';

const initialState = {
  projects: [],
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
    default:
      return state
  }
}
