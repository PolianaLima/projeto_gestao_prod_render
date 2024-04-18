import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useRouter} from "next/router";
import Head from "next/head";
import {useForm} from "react-hook-form";
import {http} from "@/utils/http";
import {reset} from "next/dist/lib/picocolors";
import {getUserFromCookie} from "@/utils/Cookies";
import {format, isAfter, parseISO} from "date-fns";
import HeadSgme from "@/components/head/HeadSgme";


function Cadastro() {
    const [errorApi, setErroApi] = useState()
    const [resultErro, setResultErro] = useState(false)
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const [status, setStatus] = useState([false])

    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const dataUser = getUserFromCookie();
        http.get(`/clientes?idUsuario=${dataUser.usuario.id}`, {
            headers: {
                Authorization: `Bearer ${dataUser.token}`
            }
        })
            .then((response) => {
                setClientes(response.data)
            })
            .catch((error) => {
                if (axios.isAxiosError(error))
                    console.error("Erro ao buscar a lista de Clientes", error)
            });
    }, []);

    const onSubmit = async (data) => {
        const dataUser = getUserFromCookie();
        data = {...data, usuario_id: dataUser.usuario.id}
        try {
           await http.post(`/receitas/cadastro`, data, {
                headers: {
                    Authorization: `Bearer ${dataUser.token}`
                }
            })
                .then((response) => {
                    setStatus(true)
                    reset()
                    router.push('/gestao-sgme/financeiro/contas-a-receber')

                })
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setResultErro(true)
                setErroApi(error.response.data.message)
            }
        }

    };

    const dataAtual = new Date();

    const handlerCancelar = () => {
        router.push('/gestao-sgme/financeiro/contas-a-receber');
    }


    return (
        <>
           <HeadSgme title="SGME - Cadastrando nova conta a receber" />
            <div className="container d-flex align-items-center justify-content-center mt-5">
                <form className="form-control-sm w-100">
                    <h3 className="mb-4">Nova Receita</h3>

                    <div className="d-sm-flex flex-column ">
                        <label>Cliente</label>
                        <select className="form-select mb-3"
                                defaultValue="0"
                                {...register("cliente_id", {validate: (value) => (value !== "0")})}
                        >
                            <option value="0">Selecione um Cliente</option>
                            {clientes.map((cliente) =>
                                <option value={cliente.id} key={cliente.id}>{cliente.nome}</option>
                            )}
                        </select>
                        {errors?.cliente_id?.type === "validate" && (
                            <p className="alert alert-danger">Cliente Obrigatorio</p>
                        )}
                    </div>

                    <div className="d-sm-flex flex-row justify-content-between mb-3">
                        <div className="d-flex flex-column w-100 me-3">
                            <label htmlFor="valor">Valor: </label>
                            <input type="number"
                                    placeholder="R$"
                                   className="form-control"
                                   {...register("valor", {required: true})}
                            />
                            {errors?.valor?.type === "required" && (
                                <p className="alert alert-danger mt-3">Valor e obrigatorio!</p>
                            )}
                        </div>

                        <div className="d-flex flex-column w-100">
                            <label htmlFor="data_vencimento">Data Vencimento: </label>
                            <input type="date"
                                   className="form-control"
                                   {...register("data_vencimento", {
                                       required: true,
                                   })}
                            />
                            {errors?.data_vencimento?.type === "required" && (
                                <p className="alert alert-danger mt-3">Data de vencimento e obrigatorio!</p>
                            )}

                            {errorApi?.data_vencimento && resultErro (
                                <p className="alert alert-danger mt-3">{errorApi}</p>
                            )}

                        </div>

                    </div>

                    <div className="d-sm-flex flex-row justify-content-between mb-3">

                        <div className="d-flex flex-column w-100 me-3">
                            <label htmlFor="forma_pagamento">Forma de Pagamento</label>
                            <select className="form-select"
                                    defaultValue="0"
                                    {...register("forma_pagamento", {validate: (value) => (value !== "0")})}
                            >
                                <option value="0">Selecione forma de pagamento</option>
                                <option value="DINHEIRO">DINHEIRO</option>
                                <option value="PIX">PIX</option>
                                <option value="CARTAO">CARTAO</option>
                                <option value="BOLETO">BOLETO</option>
                            </select>
                            {errors?.forma_pagamento?.type === "validate" && (
                                <p className="alert alert-danger mt-3" role="alert">Selecione uma forma de pagamento
                                    Valida</p>
                            )}

                        </div>

                        <div className="d-flex flex-column w-100">
                            <label htmlFor="status">Status</label>
                            <select className="form-select"
                                    defaultValue="Selecione status"
                                    {...register("status", {validate: (value) => (value !== "0")})}
                            >
                                <option value="0">Selecione status</option>
                                <option value="Pendente">Pendente</option>
                                <option value="Pago">Pago</option>
                            </select>
                            {errors?.status?.type === "validate" && (
                                <p className="alert alert-danger mt-3">Selecione um status!</p>
                            )}
                        </div>

                    </div>

                    <div className="d-flex flex-column w-100">
                        <label htmlFor="Obsercavao">Obervação: </label>
                        <textarea className="mb-3 form-control " rows={3} {...register("observacao")}/>
                    </div>

                    <div className="d-flex justify-content-end">
                        <button className="btn btn-warning  me-3" onClick={(e) => {
                            e.preventDefault();
                            handleSubmit(onSubmit)();
                        }}>SALVAR
                        </button>

                        <button className="btn btn-danger pe-3 ps-3" onClick={(e) => {
                            e.preventDefault();
                            handlerCancelar();

                        }}>CANCELAR
                        </button>
                    </div>


                </form>
            </div>
        </>
    );
}

export default Cadastro;