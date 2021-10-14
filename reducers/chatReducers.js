import produce from "immer"
import PushNotificationIOS from '@react-native-community/push-notification-ios';
const GLOBAL = require('../Globals');
import axios from 'axios';
export var initialState = {
    chat_roster_main: [],
    chat_roster_anonymous: [],
    messages: [],
    chatLoading: true,
    main_loading: false,
    preferences: [{ category: 'All', subCategory: 'All', selected: true }],
    allMapPosts: [],
    marketMapPosts: [],
    friendsMapPosts: [],
    dataSourceWithin:[],
    dataSourceBeyond:[],
    token:null,
    announceMapPosts: [],
    selectedPreference:'All',
    isConnected:true,
    category:'All',
    subCategory:null,
    whatToShow: [],
    allPosts: [],
    name:'Loading',
    phone:'',
    userId:null,
    refreshAfterPost:false,
    jid_main:null,
    chat_password:null,
    postBeyond: [],
    count: 12,
    profilePic: 'https://static-content.spaarksweb.com/images/userprofile.png',
    latitude:null,
    longitude:null,
    mockProvider:false,
    language:'en',
    distance:5,
    sortBy:'Distance',
    sortApplied:false,
    askName:false,
    Mytickets:[],
    partnershipSets:[],
    nameUpdate : "",
    unreadCount:0,
    HomeGif:'https://static-content.spaarksweb.com/images/userprofile.png',
};
async function setReceivedMessage(){

}
const chatReducers = (state = initialState, action) => {
    switch (action.type) {
        case "GETMAINROSTER":
            return state.chat_roster_main;
        case "SETPROFILEPIC":
            return {
                ...state,
                profilePic:action.profilePic,
                phone:action.phone,
                name:action.name
            };
            case "UPDATEALLAFTERLOGIN":
                return {
                    ...state,
                    profilePic:action.profilePic,
                    phone:action.phone,
                    name:action.name,
                    token:action.token
                };
            case "SETPROFILEPICDEFAULT":
                return {
                    ...state,
                    profilePic:action.profilePic
                };
                case "SETUNREADCOUNT":
                    return {
                        ...state,
                        unreadCount:action.unreadCount
                    };    

                
            case "REFRESHAFTERPOSTING":
            
                return {
                    ...state,
                    refreshAfterPost:action.refreshAfterPost
                };   
                case "SETLANGUAGE":
            
                    return {
                        ...state,
                        language:action.language
                    };    
                    case "SETSORTBY":
            
                        return {
                            ...state,
                            distance:action.distance,
                            sortBy:action.sortBy,
                            sortApplied:action.sortApplied
                        };    
    
            
        case "GETANONYMOUSROSTER":
            return state.chat_roster_anonymous;
        case "ADDTOROSTERMAIN":
            console.log('Innn')
            return {
                ...state,
                chat_roster_main: state.chat_roster_main.concat({
                    _id: action._id,
                    aid: action.aid,
                    blocked: action.blocked,
                    blockedMe: action.blockedMe,
                    canResume: action.canResume,
                    chatExit: action.chatExit,
                    chatExitMe: action.chatExitMe,
                    clearChat: action.clearChat,
                    contactMe: action.contactMe,
                    connection: action.connection,
                    jid: action.jid,
                    name: action.name,
                    offline_count: action.offline_count,
                    profilePic: action.profilePic,
                    userId: action.userId,
                    messages: action.messages,
                    message: action.message,
                    unread:0,
                    photos:action.photos,
                    amIAnonymous:action.amIAnonymous,
                    isOtherAnonymous:action.isOtherAnonymous

                })
            }
        case "ADDTOROSTERANONYMOUS":
            return {
                ...state,
                chat_roster_anonymous: state.chat_roster_anonymous.concat({
                    _id: action._id,
                    aid: action.aid,
                    blocked: action.blocked,
                    blockedMe: action.blockedMe,
                    canResume: action.canResume,
                    chatExit: action.chatExit,
                    chatExitMe: action.chatExitMe,
                    clearChat: action.clearChat,
                    connection: action.connection,
                    contactMe: action.contactMe,
                    jid: action.jid,
                    name: action.name,
                    offline_count: action.offline_count,
                    profilePic: action.profilePic,
                    userId: action.userId,
                    messages: [],
                    unread:0,
                    amIAnonymous:action.amIAnonymous
                })
            }
        case "SETPREFERENCES":
            return {
                ...state,
                preferences: action.preferences
            }

            case 'SETONLINE':
                // alert('In OLD')
                console.log('JNJNJNJNJNJNJNJNJNJNJNJNJ',action)
                var b = state.chat_roster_main;
                b.forEach(list=>{
                    if(list.jid == action.from){
                        list.isOnline = true;
                    }
                    
                })
                    return {
                        ...state,
                        chat_roster_main: [...b]
             }

        case "SETMAINMESSAGE":
            // alert('In Old')
            console.log(action)
            var from  = action.from;
            var to  = action.to;
            var createdAt  = action.createdAt;
            var unique  = action.unique;
            var message = action.message;
            var type = action.types;
            // alert(state.chat_roster_main.length)
            if (state.chat_roster_main.length > 0) {
                var b = state.chat_roster_main;
                var this_chat = b.find(item => item.jid == from.substr(0, 44));
      
                if (this_chat) {
                var unreadCounts = state.unreadCount;

                    // alert('In Main')
                    console.log('<--------------this_chatthis_chatthis_chat-------------->', this_chat);
                    var a = state.chat_roster_main;
                    chat_roster_mainss = a.filter((item) => item.jid !== from.substr(0, 44));
                    if (type == 'block') {
                        this_chat.blockedMe = true;
                        this_chat.message = `Chat can't be replied anymore`
                    }
                    else if (type == 'unblock') {
                        this_chat.blockedMe = false;
                        this_chat.message = `Click to send Message`
                    }
                    else if (type == 'exit') {
                        this_chat.chatExitMe = true;
                        this_chat.message = `Chat can't be replied anymore`
                    }
                    else if (type == 'resume') {
                        this_chat.chatExitMe = false;
                        this_chat.message = `Click to send Message`
                    }
                    else if (type == 'chat') {
                        // this_chat.unread++;
                        // unreadCounts = state.unreadCount+1
                        // this_chat.messages.splice(0, 0, {
                        //     content: message,
                        //     text: message,
                        //     messageType: type,
                        //     createdAt: Date.now(),
                        //     _id: Date.now() * Math.random(),
                        //     unique: Date.now(),
                        //     messageId: unique,
                        //     type: "chat",
                        //     user: {
                        //         _id: 1,
                        //     },
                        // });
                        this_chat.message = message,
                        this_chat.unread = this_chat.unread+1;
                    }
                    else if (type == 'image') {
                        // this_chat.unread++;
                        // unreadCounts = state.unreadCount+1
                        // this_chat.messages.splice(0, 0, {
                        //     content: message,
                        //     image: message,
                        //     messageType: type,
                        //     createdAt: Date.now(),
                        //     _id: Date.now() * Math.random(),
                        //     unique: Date.now(),
                        //     messageId: unique,
                        //     type: "chat",
                        //     user: {
                        //         _id: 1,
                        //     },
                        // });
                        // this_chat.unread++;
                        this_chat.message = 'IMAGE';
                    
                    }else if (type == 'video') {
                        // this_chat.unread++;
                        // unreadCounts = state.unreadCount+1
                        // this_chat.messages.splice(0, 0, {
                        //     content: message,
                        //     image: message,
                        //     messageType: type,
                        //     createdAt: Date.now(),
                        //     _id: Date.now() * Math.random(),
                        //     unique: Date.now(),
                        //     messageId: unique,
                        //     type: "chat",
                        //     user: {
                        //         _id: 1,
                        //     },
                        // });
                        this_chat.message = 'VIDEO';
                            // this_chat.unread++;
                    }
                    else if (type == 'file') {
                        // this_chat.unread++;
                        // unreadCounts = state.unreadCount+1
                        // this_chat.messages.splice(0, 0, {
                        //     content: message,
                        //     document: message,
                        //     messageType: type,
                        //     text: message,
                        //     createdAt: Date.now(),
                        //     _id: Date.now() * Math.random(),
                        //     unique: Date.now(),
                        //     messageId: unique,
                        //     type: "chat",
                        //     user: {
                        //         _id: 1,
                        //     },
                        // });
                        this_chat.message = 'DOCUMENT';
                            // this_chat.unread++;

                    } else if (type == 'deleteforboth') {
                        var foundIndex = null;
                        var i = 0;
                        var setted = false


                        if (this_chat.messages[0].messageId == unique) {

                            i = 0;
                            setted = true;
                            this_chat.messages[0].text = 'This message is deleted';
                            this_chat.messages[0].content = 'This message is deleted';
                            this_chat.messages[0].messageType = 'deleteforboths';
                            this_chat.message = 'This message is deleted';

                        } else {

                            this_chat.messages.forEach(list => {
                                console.log(list.messageId, unique, list.content)
                                if (list.messageId == unique) {

                                    setted = true;
                                    this_chat.messages[0].text = 'This message is deleted';
                                    this_chat.messages[0].content = 'This message is deleted';
                                    this_chat.messages[0].messageType = 'deleteforboths';
                                    this_chat.message = 'This message is deleted';
                                } else {
                                    i++;
                                }
                            })
                        }

                        // if(i==0){
                        //   isLatest = true;
                        //   chat_roster_main.forEach(list=>{
                        //     if(list.jid == route.params.jid){
                        //       list.messages = this_chat.messages;
                        //       list.message = 'This message is deleted';
                        //     }
                        //   })
                        // }

                        // this_chat.messages.forEach(list=>{
                        //   console.log(list.messageId,unique,list.content)
                        //   if(list.messageId == unique && setted == false ){
                        //     // alert(list.content)
                        //     // alert(unique)
                        //     setted = true;
                        //     list.text = message;
                        //     list.content = message;
                        //   }else{
                        //     i++;
                        //   }
                        // })
                        // if(foundIndex == 0){
                        //   alert('deleteforboth-first')
                        //   this_chat.message = message
                        // }
                    } else {

                    }

                    this_chat.updatedAt = Date.now();
                    chat_roster_mainss.splice(0, 0, this_chat)
                    //   chat_roster_main: [...action.chat_roster_mainss]
                    // PushNotificationIOS.addNotificationRequest({
                    //     id:String(Date.now()),
                    //     title:'You Have a New Message',
                    //     subtitle:'',
                    //     body:'',
                    //     userInfo:{
                    //       messageFrom:from,
                    //       apnType:'ChatSpecificScreen',
                    //       local:true,
                    //       name:this_chat.name,
                    //       profilePic:this_chat.profilePic
                    //     }
                    //  })
                    return {
                        ...state,
                        chat_roster_main: [...chat_roster_mainss],
                        unreadCount:unreadCounts
                    }
                    //   global.Chatdispatcherss({
                    //     type: "SETMYMESSAGEMAIN",
                    //     chat_roster_main: chat_roster_mainss,
                    //   });
                    // }





                } else {
                    // alert('In Else')
                    
                    axios.post(GLOBAL.BASE_URL + 'user/getchatdata', {
                        mjid: 1,
                        jid: from.substr(0, 44)
                    },
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization:
                                    state.token
                            },
                        }
                    ).then((resp) => {
                        console.log('New ChatNew ChatNew ChatNew Chat', resp.data)
                         PushNotificationIOS.addNotificationRequest({
                            id:String(Date.now()),
                            title:'New Message from '+resp.data[0].name,
                            subtitle:'',
                            body:'',
                            userInfo:{
                              messageFrom:resp.data[0].jid,
                              apnType:'ChatSpecificScreen',
                              local:true,
                              name:resp.data[0].name,
                              profilePic:resp.data[0].profilePic,
                            }
                         })
                        var mymes = {
                            content: message,
                            text: message,
                            messageType: type,
                            createdAt: Date.now(),
                            _id: Date.now() * Math.random(),
                            unique: Date.now(),
                            messageId: unique,
                            type: "chat",
                            user: {
                                _id: 1,
                            },
                        };
                        var eachuser = {
                            _id: resp.data[0]._id,
                            aid: resp.data[0].aid,
                            blocked: resp.data[0].blocked,
                            blockedMe: resp.data[0].blockedMe,
                            canResume: resp.data[0].canResume,
                            chatExit: resp.data[0].chatExit,
                            chatExitMe: resp.data[0].chatExitMe,
                            clearChat: resp.data[0].clearChat,
                            contactMe: resp.data[0].contactMe,
                            connection: resp.data[0].connection,
                            jid: resp.data[0].jid,
                            name: resp.data[0].name,
                            message: message,
                            messages: [],
                            offline_count: 0,
                            profilePic: resp.data[0].profilePic,
                            userId: resp.data[0].userId,
                            updatedAt: Date.now(),
                        };
                        eachuser.messages.push(mymes);
                        var asd = state.chat_roster_main;
                        asd.splice(0, 0, {
                            _id: eachuser._id,
                            aid: eachuser.aid,
                            blocked: eachuser.blocked,
                            blockedMe: eachuser.blockedMe,
                            canResume: eachuser.canResume,
                            chatExit: eachuser.chatExit,
                            chatExitMe: eachuser.chatExitMe,
                            clearChat: eachuser.clearChat,
                            contactMe: eachuser.contactMe,
                            connection: eachuser.connection,
                            jid: eachuser.jid,
                            name: eachuser.name,
                            offline_count: eachuser.offline_count,
                            profilePic: eachuser.profilePic,
                            userId: eachuser.userId,
                            messages: eachuser.messages,
                            message: eachuser.message,
                            unread: 0,
                            photos: [],
                            amIAnonymous: eachuser.amIAnonymous,
                            isOtherAnonymous: eachuser.isOtherAnonymous
                        })
                        return {
                            ...state,
                            chat_roster_main: [...asd]
                        }
                        //   Chatdispatcherss({
                        //   type: "ADDTOROSTERMAIN",
                        //   _id: eachuser._id,
                        //   aid: eachuser.aid,
                        //   blocked: eachuser.blocked,
                        //   blockedMe: eachuser.blockedMe,
                        //   canResume: eachuser.canResume,
                        //   chatExit: eachuser.chatExit,
                        //   chatExitMe: eachuser.chatExitMe,
                        //   clearChat: eachuser.clearChat,
                        //   contactMe: eachuser.contactMe,
                        //   connection: eachuser.connection,
                        //   jid: eachuser.jid,
                        //   name: eachuser.name,
                        //   messages:eachuser.messages,
                        //   message : eachuser.message,
                        //   unread:1,
                        //   offline_count: eachuser.offline_count,
                        //   profilePic: eachuser.profilePic,
                        //   userId: eachuser.userId,
                        //   updatedAt: Date.now(),
                        // });
                    })
                }
            } else {
                alert('chat_roster_main length is less')
            }
          
            // return {
            //     ...state,
            //     chat_roster_main: state.chat_roster_main.map(
            //         // (t, i) => t => t.jid == action.from ?
               
            //         t => t.jid == action.from ?
     
            //         {
            //             _id: t._id,
            //             aid: t.aid,
            //             blocked: t.blocked,
            //             blockedMe: t.blockedMe,
            //             canResume: t.canResume,
            //             chatExit: t.chatExit,
            //             chatExitMe: t.chatExitMe,
            //             clearChat: t.clearChat,
            //             connection: t.connection,
            //             contactMe: t.contactMe,
            //             jid: action.from,
            //             name: t.name,
            //             offline_count: t.offline_count,
            //             profilePic: t.profilePic,
            //             userId: t.userId,
            //             unread:t.unread++,
            //             amIAnonymous:t.amIAnonymous,
            //             messages:t.messages
            //             // .splice(0,0,{
            //             //     content: action.message,
            //             //     text: action.message,
            //             //     messageType:'chat',
            //             //     createdAt: Date.now(),
            //             //     _id: Date.now() * Math.random(),
            //             //     unique: Date.now(),
            //             //     messageId:Date.now(),
            //             //     type: "chat",
            //             //     user: {
            //             //       _id: 1,
            //             //     },
            //             //   })
            //               ,
            //             message:action.message
            //         }:
            //         t
                
            //     )
            // }

        case 'SETMYMESSAGEMAIN':
            return {
                ...state,
                chat_roster_main: [...action.chat_roster_main]
            }
            case 'SETMYMESSAGEMAININIT':
            return {
                ...state,
                chat_roster_main: action.chat_roster_main,
                main_loading:action.main_loading
            }
        case 'SETMAMMESSAGES':
            return {
                ...state,
                messages: action.messages
            }

        case 'SETLOADING':
            return {
                ...state,
                chatLoading: action.chatLoading
            }

        case 'SETMAINLOADING':
            return {
                ...state,
                main_loading: action.main_loading
            }
        case 'SENDMESSAGE':
            console.log("In reducer success", action.data)
            return {

            }

        case 'SETRECEIVEDMESSAGE':
            return {
                initialState
            }
        case 'SETALLPOSTS':
            return {
                ...state,
                allPosts: action.allPosts.reverse(),
                postBeyond: action.postBeyond.reverse(),
                main_loading: true
            }
        case 'SETTHISPOST':
            // const index = state.allPosts.findIndex(post => post._id === action.id)
            return {
                ...state,
                allPosts: [
                    ...state.allPosts.slice(0, action.index),
                    { ...state.allPosts[action.index], requested: true },
                    ...state.allPosts.slice(action.index)
                ]
            }
        case 'SETCOUNT':
            const nextState = produce(state.allPosts, draftState => {
                draftState[action.index].requested = true
            })
            return {
                ...state,
                allPosts: nextState
            }
        case 'SETMAPPOSTSALL':
            // alert("SETMAPPOSTSALL")
            return {
                ...state,
                allMapPosts: action.allMapPosts,
                whatToShow: action.whatToShow
            }
        // main_loading:action.main_loading,
        case 'SETMAPPOSTSMARKET':
            return {
                ...state,
                marketMapPosts: action.marketMapPosts,
                // whatToShow:action.,
            }
        case 'SETMAPPOSTSFRIENDS':
            return {
                ...state,
                friendsMapPosts: action.friendsMapPosts,
                // whatToShow:action.,
                main_loading: true
            }
        case 'SETMAPPOSTSANNOUNCE':
            return {
                ...state,
                announceMapPosts: action.announceMapPosts,
                // whatToShow:action.,
                main_loading: true
            }
        case 'SETSHOWNOW':
            // alert("SETSHOWNOW")
            return {
                ...state,
                allMapPosts: action.allMapPosts,
                whatToShow: action.allMapPosts
            }
        case 'SETMYLOCATION':
            // alert("SETSHOWNOW")
            return {
                ...state,
                latitude: action.latitude,
                longitude: action.longitude,
                mockProvider: action.mockProvider
            }
         case 'SETSELECTEDPREFERENCE':
            return {
                ...state,
                selectedPreference: action.selectedPreference,
                category:action.category,
                subCategory:action.subCategory
            }          
            
            case 'SETTOKEN':
                return {
                    ...state,
                    token:action.token,
                    name:action.name,
                    userId:action.userId,
                    jid_main:action.jid_main,
                    chat_password:action.chat_password
                }
             case 'SETONAPPOPEN':
                    return {
                        ...state,
                        name: action.name,
                        userId:action.userId
    
                    }                    
            case 'CLEARROSTER':
                        return {
                            ...state,
                            chat_roster_main: []
        
                        }
            case 'SETDATAWITHINALL':
                return {
                    ...state,
                    dataSourceWithin:action.dataSourceWithin
                }
                case 'SETMYNAME':
                    return {
                        ...state,
                        name:action.name
                    }     
                    case 'SETSORTCHANGED':
                        return {
                            ...state,
                            sortApplied:action.sortApplied
                        }    
                        case 'SETASKNAME':
                            return {
                                ...state,
                                askName:action.askName
                            }                                                        

                            case 'NETWORKSTATUS':
                                return {
                                    ...state,
                                    isConnected:action.isConnected
                                } 
                            case 'UPDATEMYTICKETS':
                                    return {
                                        ...state,
                                        Mytickets:action.Mytickets
                                    }
                    case 'UPDATEPARTNERPROGRAM':
                            return {
                                            ...state,
                                            partnershipSets:action.partnershipSets
                            }    
                        case 'UPDATENAME': 
                        return {
                            ...state,
                            nameUpdate:action.nameUpdate
                        }

                            case 'SETRECMESSAGE':
                                return {
                                    ...state,
                                    chat_roster_main:state.chat_roster_main
                                    // chat_roster_main: [...action.chat_roster_main]
                                }
                                


                                case 'SETHOMEGIF':
                                    return {
                                        ...state,
                                        HomeGif:action.HomeGif
                                    }

                    
        default:
            return state

    }
}

export default chatReducers;

