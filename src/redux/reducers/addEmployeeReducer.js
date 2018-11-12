const initialState = { 
  employeeList: []
}

const addEmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_EMPLOYEES':
      return {...state, employeeList: action.payload};
    default:
      return state;  
  } 

}

export default addEmployeeReducer;