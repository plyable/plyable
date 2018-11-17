import { combineReducers } from 'redux';

const surveyScore = (state = [], action) => {
  switch (action.type) {
    case 'SET_SCORE':
      return [ ...state, action.payload ];
    case 'REMOVE_BEHAVIOR':
      return state.filter(survey => {
        console.log(survey.id, action.payload.id);
        if(survey.id === action.payload.id) {
          return false;
        } else {
          return true;
        }
      });
    default:
      return state;
  }
};


export default combineReducers({
  surveyScore,
});//stores survey scores from server
