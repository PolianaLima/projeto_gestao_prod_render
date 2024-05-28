import React, {useState} from 'react';
import MenuNavSgme from "components/menu-site/MenuNavSgme";
import MenuNavSite from "components/menu-site/MenuNavSite";
import Footer from "components/menu-site/Footer";
import {useAuth} from "@/context/authContext";


function MainContainer({children}) {

    const {token, user} = useAuth();
    return (
        <div>
            {user !== null ? (
                <MenuNavSgme/>
            ) : (
                ""
            )}
            <div className="vh-100">{children}</div>
            {user !== null ? (
                <Footer/>
            ) : (""
            )}

        </div>
    );
}

export default MainContainer;