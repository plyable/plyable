const initialState = { 
  emailList: [],
}

const addEmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_EMPLOYEES':
      return {...state, emailList: action.payload};
    
    default:
      return state;  
  } 
}

export default addEmployeeReducer;