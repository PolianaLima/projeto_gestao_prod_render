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
                    <MenuNavSite />
                )}
                <div className="min-vh mt-5" >{children}</div>

                <Footer/>
            </div>
        );
}

export default MainContainer;