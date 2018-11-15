import { combineReducers } from 'redux';

const avgData = (state = [], action) => {
    switch (action.type) {
        case 'GET_AVG_DATA':
            return action.payload;
        default:
            return state;
    }
}

const specificData = (state = [], action) => {
    switch (action.type) {
        case 'GET_SPECIFIC_DATA':
            return action.payload;
        default:
            return state;
    }
}

const behaviorData = (state = [], action) => {
    switch (action.type) {
        case 'GET_BEHAVIOR_DATA':
            return action.payload;
        default:
            return state;
    }
}

const downloadBehaviorData = (state = [], action) => {
    switch (action.type) {
        case 'GET_DOWNLOAD_BEHAVIOR_DATA':
            return action.payload;
        default:
            return state;
    }
}

const downloadAverageData = (state = [], action) => {
    switch (action.type) {
        case 'GET_DOWNLOAD_AVERAGE_DATA':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    avgData,
    specificData,
    behaviorData,
    downloadBehaviorData,
    downloadAverageData
});