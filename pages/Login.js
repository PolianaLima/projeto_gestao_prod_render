'use client';

import Image from "next/image";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {http} from "@/utils/http";
import React, {useState} from "react";
import axios from "axios";
import HeadSgme from "@/components/head/HeadSgme";
import {useAuth} from "@/context/authContext";

const useLogin = () => {
    const router = useRouter();
    const {login, token} = useAuth();
    const [erroLogin, setErroLogin] = useState(false);
    const [erroLoginMessage, setErroLoginMessage] = useState("");

    const onSubmit = async (data) => {
        try {
            const response = await http.post("/auth/login", data);
            login(response.data);
            router.push("/");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setErroLogin(true);
                setErroLoginMessage(error.response.data.message);
            } else {
                setErroLogin(true);
                setErroLoginMessage("Servidor indisponível, tente novamente mais tarde!", error.message);
            }
        }
    };

    return {erroLogin, erroLoginMessage, onSubmit};
};

function Login(props) {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {erroLogin, erroLoginMessage, onSubmit} = useLogin();

    return (
        <div className="w100" style={{height:'100vh'}}>
            <HeadSgme title="SGME - Login"/>
            <main className="container-fluid d-flex align-items-center bg-paleta_Azul"
                  style={{height: '100%',
                      backgroundImage: `url('/assets/img/fundo_login.jpg')`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                  }}>
                <div className="container-sm d-sm-flex  justify-content-center align-items-center pt-2"
                     style={{height: '90%', width:'60%'}}>
                    <div className="mobile-styles-login bg-paleta_Azul w-100 d-flex justify-content-center" style={{
                        height:'100%'
                    }}>
                        <Image
                            src="/assets/img/icon_login.svg"
                            width="0"
                            height="0"
                            sizes="100vw"
                            style={{width: '80%', height: 'auto'}}
                            alt="contatoform"
                            priority={true}
                        />
                    </div>
                    <form className="bg-white p-5 d-flex flex-column align-items-center justify-content-center rounded-start-5" style={{height:'100%', marginLeft:-40}}>
                        <div className="d-flex flex-column bg-white  justify-content-center w-100 mb-3 align-items-center">
                            <Image src="/assets/img/logotipo.svg"
                                   alt="Logotipo"
                                   width="0"
                                   height="0"
                                   sizes="100vw"
                                   style={{width: '60%', height: 'auto'}}
                                   priority={true}
                            />
                            <h3 className="text-center text-secondary">Sistema de Gestão para Microempreendedores</h3>
                        </div>

                        <div className="w-100 mt-5" >
                            <p className="pb-2">Entre com seu e-mail e senha para acessar a conta</p>
                            <input
                                type="text"
                                className="form-control border-secondary-subtle mb-4 p-2"
                                id="login"
                                placeholder="Email"
                                {...register("login", {required: true})}
                            />
                            {errors?.login?.type === "required" && (
                                <p className=" text-danger fw-bold">Email Obrigatório!</p>
                            )}

                            <input
                                type="password"
                                className="form-control border-secondary-subtle mb-4 p-2"
                                id="senha"
                                placeholder="Senha"
                                {...register("senha", {required: true})}
                            />

                            {errors?.senha?.type === "required" && (
                                <p className=" text-danger fw-bold">Senha Obrigatório!</p>
                            )}

                            <button className="btn btn-primary w-100 mb-3" onClick={(e) => {
                                e.preventDefault();
                                handleSubmit(onSubmit)();
                            }}>
                                Entrar
                            </button>
                            {erroLogin === true ? (
                                <p className="alert alert-danger">{erroLoginMessage}</p>) : ("")}
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Login;