export const initialState = {
    latitude:null,
    longitude:null,
    fromMockProvider:false
};

const locationReducer = (state = initialState, action)=>{
     switch(action.type){
         case "SETCOORDINATES":
             return {
                 ...state,
                 latitude:action.latitude,
                 longitude:action.longitude,
                 fromMockProvider:action.fromMockProvider
             }
         default:
            return state;
            
     }
}

export default locationReducer;

