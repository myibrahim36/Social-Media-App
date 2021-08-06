import { combineReducers, createStore, Store } from "redux";
import { myReducer } from "../reducer-logic/Reducer";


//THIS IS A COMBINATION OF ALL REDUCERS IN YOUR SYSTEM, we'll only have one for our example
const allOfMyReducers = combineReducers({
    myStateReducer: myReducer
})

//LET'S CREATE THE STATE STORE (container)
export const store: Store<any> = createStore(allOfMyReducers);