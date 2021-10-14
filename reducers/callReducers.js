export const initialState = {
    ongoingCall:false
};

const callReducers = (state = initialState, action)=>{
     switch(action.type){
         case "SETONCALL":
             return {
                 ...state,
                 ongoingCall:action.ongoingCall
             }
         default:
            return state;
            
     }
}

export default callReducers;

