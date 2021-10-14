import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connect, useDispatch, useReducer } from "react-redux";
import I18n from "../src/i18n"
import chatReducers from "../reducers/chatReducers";
const ReceivedXMPP = ({from,to,content,createdAt,chat_roster_main}) => {
    console.log("In received",from,to,content,createdAt)
    function setToState(){
             if (chat_roster_main.length > 0) {
      chat_roster_main.forEach((list) => {
        if (list.jid == stanza.attrs.from.substr(0, 44)) {
          list.messages.splice(0, 0, {
            content: stanza.children[2].children[0].content,
            text: stanza.children[2].children[0].content,
            createdAt: stanza.children[2].children[0].createdAt,
            _id: Date.now() * Math.random(),
            unique: Date.now(),
            type: "chat",
            user: {
              _id: 1,
            },
          });
          list.updatedAt = Date.now();
        }
      });
      Chatdispatcher({
        type: "SETMYMESSAGEMAIN",
        chat_roster_main: chat_roster_main,
      });
    }
    }
    const Chatdispatcher = useDispatch(chatReducers);
    return (
      <View style={styles.container}>
        <Text>{I18n.t("Bookmark Screen")}</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};
const mapStatetoProps = (state) => {
    // const { }=state
    console.log("xmppStates", state);
    return {
      chat_roster_main: state.chatss.chat_roster_main,
      chat_roster_anonymous: state.chatss.chat_roster_anonymous,
      messages: state.chatss.messages,
      chatLoading: state.chatss.chatLoading,
    };
  };
export default connect(mapStatetoProps)(ReceivedXMPP);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
