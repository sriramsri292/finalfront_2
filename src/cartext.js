import React, { createContext, useContext, useState,useEffect } from "react";

const CartContext = createContext({
  userName:{
    name:''
  },
  chat:{
    email:'',
    userName:''
  },
  
  setUserName: () => {},
  setChat:()=> {},
});

export const useCart = () => useContext(CartContext);

export default function CartContextProvider({ children }) {
    const [userName, setUserName] = useState({ name: '' });
    const [chat,setChat]=useState({
      email:'sriram@gmail.com',
      userName:'Naveen'
    });



    const value = {
      userName,
       chat,
       setChat,
      setUserName,
    };
  
    useEffect(() => {
      console.log('hai', userName.name);
    }, [userName]);
    
    useEffect(() => {
      console.log('hai form cartext ', chat);
    }, [chat]);
    
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
