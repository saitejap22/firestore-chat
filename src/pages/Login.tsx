import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, database } from "../App";
import { get, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [fields, setFields] = useState<any>({
    email: "",
    password: "",
    name: "",
    username: "",
    age: "",
  });
  const navigate = useNavigate();

  const onChnageHandle = (e: any) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async() => {
    try {
        const user = await signInWithEmailAndPassword(auth, 
            fields.email,
            fields.password
        )
        if(user.user.uid) {
            localStorage.setItem('uid', user.user.uid)
            const myRef = ref(database, 'users/'+user.user.uid)
            const res = await get(myRef)
            localStorage.setItem('uid', user.user.uid)
            localStorage.setItem('name', res.val().name)
            navigate('/home')
        }

        // console.log(user)
    } catch(e) {
        console.log(e)
    }
  }

  const handleRegister = async() => {
    try {

        const user = await createUserWithEmailAndPassword(auth, 
            fields.email,
            fields.password
        )
        if(user.user.uid) {
            console.log(user)
            const myRef = ref(database, 'users/'+user.user.uid)
            const res = await set(myRef, {
                email: fields.email,
                name: fields.name,
                username: fields.name.toLowerCase().replace(' ', '-'),
                age: fields.age,
                online: false,
            })
            console.log(res);
        }
    } catch(e) {
        console.log(e)
    }
  }

  return (
    <>
    <div style={{ border: "2px solid #000", margin: 50, padding: 50 }}>
        <input
          type="text"
          placeholder="email"
          value={fields.email}
          name="email"
          onChange={onChnageHandle}
        />
        <input
          type="text"
          placeholder="password"
          value={fields.password}
          name="password"
          onChange={onChnageHandle}
        />
        <button type="button" onClick={handleLogin}>Login</button>
      </div>
      <div style={{ border: "2px solid #000", margin: 50, padding: 50 }}>
        <input
          type="text"
          placeholder="email"
          value={fields.email}
          name="email"
          onChange={onChnageHandle}
        />
        <input
          type="text"
          placeholder="password"
          value={fields.password}
          name="password"
          onChange={onChnageHandle}
        />
        <input
          type="text"
          placeholder="name"
          value={fields.name}
          name="name"
          onChange={onChnageHandle}
        />
        <input
          type="text"
          placeholder="age"
          value={fields.age}
          name="age"
          onChange={onChnageHandle}
        />
        <button type="button" onClick={handleRegister}>Register</button>
      </div>
    </>
  );
};

export default Login;
