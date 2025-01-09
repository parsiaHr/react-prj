import React, { createContext, useCallback, useContext, useState } from 'react'

const UserProgressContext = createContext({
    progress:"",
    showCart: () => {},
    hideCart: () => {},
    showCheckout:() => {},
    hideCheckout:() => {},
});

export const UserProgressContextProvider = ({children}) => {

    const [userProgrss , setUserProgress] = useState("");

    function showCart() {
        setUserProgress("cart");
    }
    function hideCart() {
        setUserProgress("")
    }

    function showCheckout() {
        setUserProgress("checkout")
    }

    function hideCheckout() {
        setUserProgress("")
    }

    const userProgressCtx = {
        progress:userProgrss , 
        showCart,
        hideCart,
        showCheckout,
        hideCheckout,
    }
 

  return (
    <UserProgressContext.Provider value={userProgressCtx}>
        {children}
    </UserProgressContext.Provider>
  )
}

export default UserProgressContext;

