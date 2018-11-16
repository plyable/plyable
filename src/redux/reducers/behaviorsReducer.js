import { combineReducers } from 'redux';

const behaviors = (state = [], action) => {
  switch (action.type) {
    case 'SET_BEHAVIORS':
      return action.payload
    default:
      return state;
  }
};


export default combineReducers({
  behaviors,
});//stores behaviors in the database
