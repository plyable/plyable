import { combineReducers } from 'redux';

const surveyScore = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SCORE':
      return {
          ...state,
          [action.payload.value]: action.payload.score,
      };
    default:
      return state;
  }
};


export default combineReducers({
  surveyScore,
});
