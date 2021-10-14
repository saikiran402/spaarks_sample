export const initialState = {
    allPosts:[],
    marketPosts:[],
    eventsPosts:[],
    sayhiiPosts:[],
    preferences:[{category:'All',subCategory:'All',selected:true}]
};

const postReducer = (state = initialState, action)=>{
     switch(action.type){
         case "GETALLPOSTS":
             return state.allPosts;
         case "GETMARKETPOSTS":
             return state.marketPosts;
         case "GETEVENTSPOSTS":
             return state.eventsPosts;  
         case "GETGREETPOSTS":
             return state.sayhiiPosts;
         case "GETPREFERENCES":
             return state.preferences;   
         case "SETPREFERENCES":
             return{
                 ...state,
                 preferences:action.preferences
             }      
         default:
            return state;
            
     }
}

export default postReducer;

