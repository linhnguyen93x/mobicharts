export const loadingReducer = (state = {}, action: any) => {
  switch (action.type) {
    case 'START_LOADING':
      return {
        ...state,
        [action.id]: {
          isLoading: true,
          text: action.text,
          hideSpinner: action.hideSpinner
        }
      }

    case 'END_LOADING':
      return {
        ...state,
        [action.id]: {
          isLoading: false
        }
      }

    default:
      return state
  }
}
