import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,
    onAuthStateChanged,GoogleAuthProvider, 
    signInWithPopup,
    signOut
 } from "firebase/auth";
import { auth } from '../Firebase/firebase.config';


const AuthProvider = ({ children }) => {
const [user,setUser] = useState(null);
const [loading,setLoading] = useState(true);

const googleProvider = new GoogleAuthProvider ();

const googleSignIn = ()=>{
    setLoading(true)
  return   signInWithPopup(auth,googleProvider)
}

const createUser = (email,password)=>{ 
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
}
const signInUser = (email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)
}

const removeUser=()=>{
    setLoading(true)
    return signOut(auth)
}

useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser)
        console.log(currentUser)
        if(currentUser){
            const loggedUser = {email:currentUser.email}
            fetch('http://localhost:3000/getToken',{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(loggedUser)

            })
            .then(res=>res.json())
            .then(data=>{
                console.log('after getting token',data)
               localStorage.setItem('access-token', data.token);
            })
        }
        setLoading(false)

    })
   return ()=>{
       unsubscribe()
    }
},[])




    const authInfo = {
              createUser,
              user,
              loading,
              signInUser,
              googleSignIn,
              removeUser,
    }
    return <AuthContext value={authInfo}>
        {children}
    </AuthContext>
};

export default AuthProvider;