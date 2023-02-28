import { onValue, ref, update, onChildAdded } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database, fdb } from "../App";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import MessageList from "./MessageList";

const Home = () => {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("uid");
  const loggedInUserName = localStorage.getItem("name");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setStatus(true);
    getUsers();
    return () => {
      setStatus(false);
    };
  }, []);

  const setStatus = async (status: boolean) => {
    const myRef = ref(database, "users/" + loggedInUser);
    const res = await update(myRef, {
      online: status,
    });
    console.log("res", res);
  };

  const getUsers = () => {
    try {
      const myRef = ref(database, "users");
      onValue(myRef, (snapshot) => {
        const userList = snapshot.val();
        console.log(userList);
        let data = Object.entries(userList).map((i: any) => ({
          id: i[0],
          ...i[1],
        }));
        setUsers(data);
      });
    } catch (e) {
      console.log("error", e);
    }
  };

  const sendMessage = () => {
    addDoc(collection(fdb, 'chat'), {
      text: message,
      name: loggedInUserName,
      chatId: [selectedUser.id, loggedInUser].sort().join('.'),
      time: serverTimestamp()
    })
  };

  return (
    <>
      <h2>Home</h2>
      <h2 onClick={() => navigate("/")}>navigate</h2>
      <div>
        {users
          .filter((i) => i.id !== loggedInUser)
          .map((user) => {
            return (
              <h2
                key={user.id}
                onClick={() => setSelectedUser(user)}
                style={{
                  backgroundColor:
                    user.id === selectedUser?.id ? "red" : "grey",
                }}
              >
                {user.name} - {user.online ? "Online" : "Offline"}
              </h2>
            );
          })}
      </div>
      {selectedUser && loggedInUser && loggedInUserName ? (
        <div style={{ border: "2px solid #000", margin: 100, padding: 50 }}>
          <MessageList sender={loggedInUser} receiver={selectedUser.id} name={loggedInUserName} />
          <div>
            <input
              type={"text"}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{fontSize: 30}}
              placeholder="Enter message here"
            />
            <button type="button" onClick={sendMessage} style={{fontSize: 30}}>
              Send
            </button>
          </div>
        </div>
      ) : (
        <h2>Please select user</h2>
      )}
    </>
  );
};

export default Home;
