import React, {useContext, useEffect, useState} from "react";
import {auth} from "../firebase";

//context hook. named useAuth real name == useContext
const AuthContext = React.createContext()
export function useAuth(){
    return useContext(AuthContext)
}
export function  AuthProvider({children}){
    const [currentUser,setCurrentUser] = useState()
    const [loading,setLoading] =useState(true)
    //useEffect Hook
    useEffect(()=>{
            //set user after signup
                            //this method returns the method to un subscribe the
                            // means remove the user or do opposite whatever the function is doing
        const unsubscribe = auth.onAuthStateChanged(user=>{
            setCurrentUser(user)
            setLoading(false)
            //order is important here/fuck
        })
        return unsubscribe
    },[])

    //useState hook

    function signup(email,password){
        //firebase auth
        return auth.createUserWithEmailAndPassword(email,password)
    }

    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password)
    }

    const value = {currentUser,signup,login}
    return (
        //.provider is added additionally not suggested by the ide
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}