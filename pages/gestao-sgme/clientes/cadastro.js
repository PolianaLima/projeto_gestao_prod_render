import React, {useState} from 'react';
import Head from "next/head";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useRouter} from "next/router";
import {http} from "@/utils/http";
import {getUserFromCookie} from "@/utils/Cookies";
import InputMask from 'react-input-mask';
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

        const cpfCleaned = data.cpf.replace(/\D/g, '');
        data.cpf = cpfCleaned;

        if (data.telefone) {
            const telefoneCleaned = data.telefone.replace(/\D/g, ''); // Remove caracteres não numéricos
            data.telefone = telefoneCleaned;
        }

        data = {...data, usuario_id: dataUser.usuario.id}

        try {
            await http.post('/clientes/cadastro', data, {
                headers: {
                    Authorization: `Bearer ${dataUser.token}`
                }
            })
                .then((response) => {
                    router.push('/gestao-sgme/clientes')
                })
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setResultErro(true)
                setErroApi(error.response.data.message)
            }
        }

    }

    const cancelar = ()=>{
        router.push("/gestao-sgme/clientes")
    }


    return (
        <>
            <HeadSgme title="SGME - Cadastro de Clientes" />
            <div className="container-sm d-sm-flex align-items-center justify-content-start mt-5">


                <form className="form-control-sm w-100 mobile-styles-form" style={{maxWidth:"65%"}}>

                    <h3 className="mb-4">Novo cliente</h3>
                    <div className="d-sm-flex flex-column">
                        <label htmlFor="valor">Nome Completo: </label>
                        <input placeholder="Nome"
                               className="form-control"
                               {...register("nome",{required:true} )}
                        />
                        {errors?.nome?.type === "required" && (
                            <p className="alert alert-danger mt-3">Nome obrigatorio!</p>
                        )}
                    </div>

                    <div className="d-sm-flex justify-content-between mb-3">
                        <div className="d-flex flex-column w-100 me-3">
                            <label htmlFor="valor">CPF: </label>

                            <input type="number"
                                placeholder="Cnpj / CPF"
                                className="form-control"
                                {...register("cpf" )} />

                            {resultErro === true ? (
                                <p className="text-danger fw-bold">{errorApi}</p>
                            ) : ("")}
                        </div>

                        <div className="d-flex flex-column w-100  me-3">
                            <label htmlFor="data_vencimento">Data Nascimento: </label>
                            <input type="date"
                                   className="form-control"
                                   {...register("data_nascimento")}
                            />

                        </div>
                        <div className="d-flex flex-column w-100 mb-3">
                            <label htmlFor="data_vencimento">Telefone</label>
                            <InputMask
                                mask="(99) 99999-9999"
                                maskChar="_"
                                placeholder="Telefone/Celular"
                                className="form-control"
                                {...register("telefone",)}
                            />

                        </div>


                    </div>

                    <div className="d-flex ">
                        <button className="btn btn-success pe-5 ps-5 me-3" onClick={(e) => {
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