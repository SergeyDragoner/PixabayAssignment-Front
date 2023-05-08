import { createStore } from "redux";

// 1. The state - array of Pictures that we want to STORE
export class PixabayState {
    images = [];
}

// 2. Action types
export const FETCH_PIXABAY = "FETCH_PIXABAY";

// 3. Action creators
export function fetchPixabay(pixabay) {
    return { type: FETCH_PIXABAY, payload: pixabay };
}

// 4. Reducer - the logic
function pixabayReducer(currentState = new PixabayState(), action = {}) {
    const newState = { ...currentState };

    switch (action.type) {
        case FETCH_PIXABAY: {
            newState.images = action.payload;
            break;
        }
        default:
            break;
    }

    return newState;
}

// create store
export const pixabayStore = createStore(pixabayReducer);