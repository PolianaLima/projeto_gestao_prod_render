import React, {useState} from 'react';
import Head from "next/head";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useRouter} from "next/router";
import {http} from "@/utils/http";
import {getUserFromCookie} from "@/utils/Cookies";
import HeadSgme from "@/components/head/HeadSgme";

function Cadastro(props) {
    const [errorApi, setErroApi] = useState()
    const [resultErro, setResultErro] = useState(false)
    const [status, setStatus] = useState([false])

    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm();

    const onSubmit = async (data) => {
        const dataUser = getUserFromCookie();
        data = {...data, usuario_id: dataUser.usuario.id}

        try {
            await http.post('/fornecedores/cadastro', data, {
                headers: {
                    Authorization: `Bearer ${dataUser.token}`
                }
            })
                .then((response) => {
                    setStatus(true)
                    reset()
                    router.push('/gestao-sgme/fornecedores')
                })
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setResultErro(true)
                setErroApi(error.response.data.message)
            }
        }
    }

    const cancelar = ()=>{
        router.push("/gestao-sgme/fornecedores")
    }


    return (
        <>
            <HeadSgme title="SGME - Cadastro de Fornecedores"/>

            <div className="container-sm d-sm-flex align-items-center justify-content-start mt-5">

                <form className="form-control-sm w-100" style={{maxWidth: "75%"}}>

                    <h3 className="mb-4">Novo Fornecedor</h3>
                    <div className="d-sm-flex flex-column  me-3">
                        <label htmlFor="valor">CPF/CNPJ: </label>
                        <input type="number"
                                placeholder="CPF / Cnpj"
                               className="form-control"
                               {...register("cnpj", {required: true})}
                        />
                        {errors?.cnpj?.type === "required" && (
                            <p className="alert alert-danger mt-3">CPF / Cnpj obrigatorio!</p>
                        )}
                        {resultErro === true ? (
                            <p className="text-danger fw-bold">{errorApi}</p>
                        ) : ("")}
                    </div>

                    <div className="d-flex flex-row justify-content-between mb-3">
                        <div className="d-flex flex-column w-100 me-3">
                            <label htmlFor="valor">Razao Social / Nome </label>
                            <input placeholder="Razao Social / Nome"
                                   className="form-control"
                                   {...register("nome", {required: true})}
                            />
                            {errors?.nome?.type === "required" && (
                                <p className="alert alert-danger mt-3">Nome é obrigatorio</p>
                            )}
                        </div>


                    </div>


                    <div className="d-flex ">
                        <button className="btn btn-warning pe-5 ps-5 me-3" onClick={(e) => {
                            e.preventDefault();
                            handleSubmit(onSubmit)();
                        }}>SALVAR
                        </button>

                        <button className="btn btn-danger pe-5 ps-5 me-3" onClick={(e) => {
                            e.preventDefault();
                            cancelar();
                        }}>CANCELAR
                        </button>
                    </div>

                </form>
            </div>
        </>
    );
}

export default Cadastro;