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
        return auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
            //order is important here/fuck
        })
    },[])

    //useState hook

    function signup(email,password){
        //firebase auth
        return auth.createUserWithEmailAndPassword(email,password)
    }

    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password)
    }

    function logout(){
        return auth.signOut()
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email){
        return currentUser.updateEmail(email)
    }
    function updatePassword(password){
        return currentUser.updatePassword(password)
    }

    const value = {currentUser,signup,login, logout, resetPassword,updatePassword,updateEmail}
    return (
        //.provider is added additionally not suggested by the ide
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}