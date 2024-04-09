import React from 'react';
import Link from "next/link";
import Image from "next/image";

function MenuNavSite(props) {
    return (
        <nav className=" container-fluid navbar  navbar-expand-lg" style={{background: " #4682B4"}}>
            <div className="container d-sm-flex">

                <div className="container d-sm-flex flex-nowrap justify-content-between">
                    <div className="justify-content-between d-flex">
                        <Link className="navbar-brand nav-link-light img-fluid" href="/">
                            <Image src="/img/logotipo.svg" width="0"
                                   height="0"
                                   alt="Logotipo Sistema de Gestao de Microempreendedores"
                                   style={{width: '150px', height: 'auto'}}/>

                        </Link>

                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </div>

            </div>
        </nav>
    );
}

export default MenuNavSite;