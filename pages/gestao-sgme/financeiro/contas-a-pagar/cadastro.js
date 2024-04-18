import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import Head from "next/head";
import {http} from "@/utils/http";
import {getUserFromCookie} from "@/utils/Cookies";
import {format, isAfter, isBefore, parseISO} from "date-fns";
import HeadSgme from "@/components/head/HeadSgme";


function Cadastro() {
    const [errorApi, setErroApi] = useState()
    const [resultErro, setResultErro] = useState(false)

    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm();


    const [status, setStatus] = useState([false])

    /*CHAMADA DA API PARA LISTA DE CLIENTES*/
    const [fornecedores, setFornecedores] = useState([]);
    useEffect(() => {
        const dataUser = getUserFromCookie();
        http.get(`/fornecedores?idUsuario=${dataUser.usuario.id}`, {
            headers: {
                Authorization: `Bearer ${dataUser.token}`
            }
        })
            .then((response) => {
                setFornecedores(response.data)
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
               await http.post(`/despesas/cadastro`, data, {
                    headers: {
                        Authorization: `Bearer ${dataUser.token}`
                    }
                })
                    .then((response) => {
                        setStatus(true)
                        router.push('/gestao-sgme/financeiro/contas-a-pagar')

                    })
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    setResultErro(true)
                    setErroApi(error.response.data.message)
                }
            }

    }

    const handlerCancelar = () => {
        router.push('/gestao-sgme/financeiro/contas-a-pagar');
    }

    return (
        <>
            <HeadSgme title="SGME - Cadastrando contas a pagar" />

            <div className="container d-flex align-items-center justify-content-center mt-5">
                <form className="form-control-sm w-100">
                    <h3 className="mb-4">Nova Despesa</h3>

                    <div className="d-flex flex-column ">
                        <label>Fornecedor</label>
                        <select className="form-select mb-3"
                                defaultValue="0"
                                {...register("fornecedor_id", {validate: (value) => (value !== "0")})}
                        >
                            <option value="0">Selecione um fornecedor</option>
                            {fornecedores.map((fornecedor) =>
                                <option value={fornecedor.id} key={fornecedor.id}>{fornecedor.nome}</option>
                            )}
                        </select>
                        {errors?.fornecedor_id?.type === "validate" && (
                            <p className="alert alert-danger">Fornecedor Obrigatorio</p>
                        )}
                    </div>

                    <div className="d-sm-flex flex-row justify-content-between mb-3">
                        <div className="d-sm-flex flex-column w-100 me-3">
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

                        <div className="d-sm-flex flex-column w-100">
                            <label htmlFor="data_vencimento">Data Vencimento: </label>
                            <input type="date"
                                   className="form-control"

                                   {...register('data_vencimento', {
                                       required: true,
                                   })}
                            />
                            {errors?.data_vencimento?.type === "required" && (
                                <p className="alert alert-danger mt-3">Valor e obrigatorio!</p>
                            )}
                            {errorApi && resultErro ? (
                                <p className="alert alert-danger mt-3">{errorApi}</p>
                            ) : ("")}

                        </div>

                    </div>

                    <div className="d-sm-flex flex-row justify-content-between mb-3">

                        <div className="d-sm-flex flex-column w-100 me-3">
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
                                <p className="alert alert-danger mt-3" role="alert">Selecione uma forma de pagamento</p>
                            )}

                        </div>

                        <div className="d-sm-flex flex-column w-100">
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
                                <p className="alert alert-danger mt-3">Selecione o status!</p>
                            )}
                        </div>
                    </div>

                    <div className="d-flex flex-column w-100">
                        <label htmlFor="Obsercavao">Obervação: </label>
                        <textarea className="mb-3 form-control " rows={3} {...register("observacao")}/>
                    </div>

                    <div className="d-flex justify-content-end">
                        <button className="btn btn-success me-3 "
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSubmit(onSubmit)();
                                }}>
                            SALVAR
                        </button>

                        <button className="btn btn-danger pe-3 ps-3" onClick={(e) => {
                            e.preventDefault();
                            handlerCancelar();

                        }}>CANCELAR
                        </button>
                    </div>


                    {status === true ? (
                        <p>Despesa inserida com sucesso</p>
                    ) : ("")}
                </form>


            </div>
        </>

    );
}

export default Cadastro;