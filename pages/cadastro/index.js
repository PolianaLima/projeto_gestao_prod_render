'use client';
import React, {useState} from 'react';
import Image from "next/image";
import {useForm} from "react-hook-form";
import axios from "axios";
import {http} from "@/utils/http";
import Link from "next/link";
import {useRouter} from 'next/router';
import HeadSgme from "@/components/head/HeadSgme";

function Index(props) {
    const [errorApi, setErroApi] = useState("")
    const [resultErro, setResultErro] = useState(false)
    const [status, setStatus] = useState([false])
    const router  = useRouter();


    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm();

    const onSubmit = async (data) => {

        const response = await http.post("/auth/register", data)
            .then((response) => {
                console.log(response.data)
                setStatus(true)
                router.push("/")
            })
            .catch((error)=> {
                if (axios.isAxiosError(error) && error.response) {
                    setResultErro(true)
                    setErroApi(error.response.data.message)
                }
            })
        };



    return (
        <>
            <HeadSgme title="Cadasto de usuario" />
            <div className="container">
                <div className="container bg-warninge">
                    <div className="container-sm d-sm-flex pt-5 align-items-center justify-content-between">
                        <div className="">
                            <Image
                                src="/img/ICONE_CADASTRO.svg"
                                alt="contatoform"
                                width={350}
                                height={350}
                            />
                        </div>
                        <div className="container-sm d-sm-flex flex-md-column align-items-center ">
                            <div className="title-form mb-3">
                                <h2 className="text-paleta_blue">Crie sua conta grátis</h2>
                                <p>E conheça o SGME e todas as suas vantagens!</p>
                            </div>

                            <form className="w-100" style={{maxWidth: 500}}>
                                <input
                                    type="text"
                                    className="form-control mb-4 border-primary"
                                    id="nome"
                                    placeholder="Digite seu Nome"
                                    {...register("nome", {required: true})}
                                />
                                {errors?.nome?.type === "required" && (
                                    <p className="alert alert-danger">Nome e obrigatorio!</p>
                                )}

                                <input
                                    type="email"
                                    className="form-control mb-4 border-primary"
                                    id="InputEmail"
                                    placeholder="Digite seu e-mail"
                                    {...register("login", {required: true})}
                                />
                                {errors?.login?.type === "required" && (
                                    <p className="alert alert-danger">Email e obrigatorio!</p>
                                )}
                                {resultErro === true ? (
                                    <p className="text-danger fw-bold">{errorApi}</p>
                                ) : ("")}
                                <input
                                    type="password"
                                    className="form-control mb-4 border-primary"
                                    id="inputSenha"
                                    placeholder="Senha"
                                    {...register("senha", {required: true})}
                                />
                                {errors?.senha?.type === "required" && (
                                    <p className="alert alert-danger">Senha e obrigatorio!</p>
                                )}

                                <button className="btn btn-primary w-100 mb-2" type="button"
                                        onClick={handleSubmit(onSubmit)}>
                                    Cadastrar
                                </button>

                                <div className="w-100 text-center fs-6">
                                    <Link href="/login" className="link-underline-light"
                                    ><strong>Já tenho conta</strong></Link
                                    >
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Index;
