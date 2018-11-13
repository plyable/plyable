import { combineReducers } from 'redux';

const surveyScore = (state = [], action) => {
  switch (action.type) {
    case 'SET_SCORE':
      return [
        ...state, action.payload
      ];
    default:
      return state;
  }
};


export default combineReducers({
  surveyScore,
});//stores survey scores from server
