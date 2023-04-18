import ActionTypesEnum from '../Enums';
import { StateInterface } from '../Interfaces';
import { ActionTypes } from '../Types';

const Reducer = (state: StateInterface, action: ActionTypes) => {
  const firstPattern = /(?<=<)([\S]*)(?=>; rel="First")/i;
  const nextPattern = /(?<=<)([\S]*)(?=>; rel="Next")/i;
  const prevPattern = /(?<=<)([\S]*)(?=>; rel="Prev")/i;
  const lastPattern = /(?<=<)([\S]*)(?=>; rel="Last")/i;
  switch (action.type) {
    case ActionTypesEnum.UPDATE_FOOTER:
      return {
        ...state,
        isLoading : action.isLoading,
      };
    case ActionTypesEnum.UPDATE_FILTER:
      return {
        ...state,
        filterVal : action.filterVal
      };
    case ActionTypesEnum.LIST_USERS:
        return {
          ...state,
          users: action.payload,
          actionType : action.type,
          ...(action.since && {since : action.since}),
          ...(action.per_page && {per_page : action.per_page}),          
          firstBtnLink : action.headers.link && action.headers.link.includes(`rel=\"first\"`) ? action.headers.link.match(firstPattern)[0] : null,
          nextBtnLink : action.headers.link && action.headers.link.includes(`rel=\"next\"`) ? action.headers.link.match(nextPattern)[0] : null,
          prevBtnLink : action.headers.link && action.headers.link.includes(`rel=\"prev\"`) ? action.headers.link.match(prevPattern)[0] : null,
          lastBtnLink : action.headers.link && action.headers.link.includes(`rel=\"last\"`) ? action.headers.link.match(lastPattern)[0] : null
        };
    default:
      return state;
  }
};

export default Reducer;
