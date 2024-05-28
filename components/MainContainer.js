import React from 'react';
import {useAuth} from "@/context/authContext";
import MenuLateral from "@/components/menu/MenuLateral";
import Login from "@/pages/Login";


function MainContainer({children, Component}) {

    const {token, user} = useAuth();
    return (
        <div>
            {user !== null ? (
                <MenuLateral>
                    {children}
                </MenuLateral>
            ) : (
             <Login/>
            )}
        </div>
    );
}

export default MainContainer;