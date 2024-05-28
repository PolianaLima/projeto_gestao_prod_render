import React from 'react';
import Image from "next/image";
import {useAuth} from "@/context/authContext";
import Link from "next/link";

import { AiFillProduct } from "react-icons/ai";

function MenuLateral({children}) {
    const {user, logout} = useAuth();

    return (
        <>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-paleta_Azul">
                        <div
                            className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <Link href="/"
                                  className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                <span className="fs-5 d-none d-sm-inline text-white">
                                    <Image src="/assets/img/logotipo.svg" alt="Logotipo" width={200}
                                           height={100}/></span>
                            </Link>
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                                id="menu">

                                <li>
                                    <Link href="/" className="nav-link px-0 align-middle">
                                        <i className="fs-2 bi-speedometer2"></i>
                                        <span
                                        className="ms-1 d-none d-sm-inline ">Dashboard</span></Link>
                                </li>

                                <li>
                                    <Link href="#submenu2" data-bs-toggle="collapse"
                                          className="nav-link px-0 align-middle ">
                                        <i className="fs-2 bi bi-folder-plus"></i>
                                        <span className="ms-1 d-none d-sm-inline ">Cadastro</span></Link>
                                    <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                                        <li className="w-100">
                                            <Link href="/gestao-sgme/produtos" className="nav-link px-0">
                                                <AiFillProduct className="fs-5"/>
                                                <span
                                                    className="d-none d-sm-inline ">Produto</span> </Link>
                                        </li>
                                        <li>
                                            <Link href="/gestao-sgme/clientes" className="nav-link px-0 ">
                                                <i className="bi bi-person-fill-add fs-5"></i>
                                                <span
                                                    className="d-none d-sm-inline "> Cliente</span></Link>
                                        </li>
                                        <li>
                                            <Link href="/gestao-sgme/fornecedores" className="nav-link px-0 ">
                                                <i className="bi bi-box-seam-fill fs-5"></i>
                                                <span
                                                    className="d-none d-sm-inline "> Fornecedor</span> </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link href="/gestao-sgme/pdv" className="nav-link px-0 align-middle">
                                        <i className="fs-2 bi bi-pc-display"></i> <span
                                        className="ms-1 d-none d-sm-inline ">Vendas</span></Link>
                                </li>

                                <li>
                                    <Link href="#submenu3" data-bs-toggle="collapse"
                                          className="nav-link px-0 align-middle">
                                        <i className="fs-2 bi bi-cash-coin"></i> <span
                                        className="ms-1 d-none d-sm-inline">Financeiro</span> </Link>
                                    <ul className="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                                        <li className="w-100">
                                            <Link href="/gestao-sgme/financeiro/contas-a-pagar"
                                                  className="nav-link px-0">
                                                <i className="fs-5 bi bi-arrow-down-square-fill"></i>
                                                <span
                                                    className="d-none d-sm-inline"> Contas a pagar</span> </Link>
                                        </li>
                                        <li>
                                            <Link href="/gestao-sgme/financeiro/contas-a-receber" className="nav-link px-0">
                                                <i className="fs-5 bi bi-arrow-up-square-fill"></i><span
                                                className="d-none d-sm-inline "> Contas a receber</span> </Link>
                                        </li>

                                        <li>
                                            <Link href="/gestao-sgme/fluxo-caixa" className="nav-link px-0">
                                                <i class="fs-5 bi bi-currency-exchange"></i><span
                                                className="d-none d-sm-inline "> Fluxo Caixa</span> </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link href="#" className="nav-link px-0 align-middle">
                                        <i className="fs-4 bi-people"></i> <span
                                        className="ms-1 d-none d-sm-inline">Customers</span> </Link>
                                </li>
                            </ul>
                            <hr/>
                            <div className="dropdown pb-4">
                                <a href="#"
                                   className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                                   id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-person-circle fs-3"></i>
                                    <span className="d-none d-sm-inline mx-1 text-white">{user.nome}</span>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                                    <li>
                                        <button className="dropdown-item" onClick={event => {
                                            event.preventDefault();
                                            logout();
                                        }}>Sign out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col py-3">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MenuLateral;
