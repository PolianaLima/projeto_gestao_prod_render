import Image from "next/image";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {http} from "utils/http";
import React, {useState} from "react";
import axios from "axios";
import HeadSgme from "components/head/HeadSgme";
import {useAuth} from "@/context/authContext";

function Index(props) {

    const router = useRouter();

    const {login, token} = useAuth();


    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const [erroLogin, setErroLogin] = useState(false);
    const [erroLoginMessage, setErroLoginMessage] = useState("");

    
    const onSubmit = async (data) => {
        const response = http.post(
            "/auth/login",
            data
        )
            .then((response) => {
                login(response.data)
                router.push("/gestao-sgme")
            })
            .catch((error) => {
                if (axios.isAxiosError(error) && error.response) {
                    setErroLogin(true)
                    setErroLoginMessage(error.response.data.message);
                } else {
                    setErroLogin(true)
                    setErroLoginMessage("Servidor indisponível, tente novamente mais tarde!", error.message)
                }
            });

    }

    return (
        <>
            <HeadSgme title="SGME - Login" />

            <main className="container-sm">

                <div
                    className="container-sm  d-sm-flex  justify-content-center align-items-center pt-2">
                    <div className="mobile-styles-login">
                        <Image
                            src="/img/ICON-LOGIN.jpg"
                            width={350}
                            height={350}
                            alt="contatoform"
                            priority={true}
                        />
                    </div>
                    <div className="" style={{minWidth:300} }>
                        <div className="mb-5">
                            <h2 className="text-center ">LOGIN</h2>
                        </div>

                        <div className=" w-100 ">
                            <input
                                type="usuário"
                                className="form-control  mb-4  border-primary"
                                id="login"
                                placeholder="Email"
                                {...register("login", {required: true})}
                            />
                            {errors?.login?.type === "required" && (
                                <p className=" text-danger fw-bold">Email Obrigatório!</p>
                            )}

                            <input
                                type="password"
                                className="form-control mb-4 border-primary"
                                id="senha"
                                placeholder="Senha"
                                {...register("senha", {required: true})}
                            />

                            {errors?.senha?.type === "required" && (
                                <p className=" text-danger fw-bold">Senha Obrigatório!</p>
                            )}

                            <button className="btn btn-primary w-100 mb-3" onClick={(e) => {
                                e.preventDefault()
                                handleSubmit(onSubmit)()}}>
                                Entrar
                            </button>
                            {erroLogin === true ? (
                                <p className="alert alert-danger">{erroLoginMessage}</p>) : ("")}
                        </div>
                    </div>
                </div>


            </main>
        </>
    );
}

export default Index;