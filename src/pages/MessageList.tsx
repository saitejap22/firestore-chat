import { onValue, ref, update, onChildAdded } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database, fdb } from "../App";
import { addDoc, collection, onSnapshot, serverTimestamp, query, where, orderBy } from 'firebase/firestore'

const MessageList: React.FC<{sender: string, receiver: string, name: string}> = ({sender, receiver, name}) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    getMessages();
  }, [receiver]);

  const getMessages = () => {
    // 
    try {
      const myQeury = query(
        collection(fdb, 'chat'),
        where('chatId', '==', [sender, receiver].sort().join('.')),
        // orderBy('time', 'asc')
      );
      onSnapshot(myQeury, (snapshot: any) => {
        const message = snapshot.docs.map((i: any) => ({
          id: i.id,
          ...i.data()
        }))
        console.log('----------message', message)
        setMessages(message)
      })
      
    } catch (e) {
      console.log("error", e);
    }
  };


  return (
    <>
      <h2>MessageList</h2>
      <div>
        {messages
          .map((message, index) => {
            console.log(new Date(message.time?.seconds * 1000))
            return (
              <div key={index} style={{border: '1px solid #000', marginBottom: 20, paddingLeft: 20, paddingRight: 20}}>
                <h2
                
                style={{}}
              >
                {name === message.name ? "You" : message.name}
              </h2>
              <h2
                style={{}}
              >
                {message.text}
              </h2>
              <h4>{message.time?.seconds && new Date(message.time?.seconds * 1000).toISOString()}</h4>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default MessageList;
