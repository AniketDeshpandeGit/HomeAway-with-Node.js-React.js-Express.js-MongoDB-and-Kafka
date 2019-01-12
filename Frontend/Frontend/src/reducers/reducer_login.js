import _ from "lodash";
import { FETCH_LOGIN } from "../actions";


//Reducer listening to different action types
//initial state is {}
export default function(state = {}, action) {
  switch (action.type) {
    //target 
    case FETCH_LOGIN:
    
         return _.mapKeys(action.payload.data, "username");
    default:
      return state;
  }
}
