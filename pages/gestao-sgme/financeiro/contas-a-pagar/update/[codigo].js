'use client';
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import {http} from "@/utils/http";
import ModalComponent from "@/components/ModalComponent";
import {getUserFromCookie} from "@/utils/Cookies";
import {isAfter, parseISO} from "date-fns";
import Link from "next/link";
import HeadSgme from "@/components/head/HeadSgme";

const UpdateDespesas = () => {
    const router = useRouter();
    const {codigo} = router.query;

    const [loadingData, setLoadingData] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    const [erroData, setErroData] = useState(false)
    const [erroDados, setErroDados] = useState("")

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        router.push('/gestao-sgme/financeiro/contas-a-pagar')
    };


    const [despesa, setDespesa] = useState({});

    const [fornecedor, setFornecedor] = useState({});

    const [status, setStatus] = useState([false])

    useEffect(() => {

        const fetchData = async () => {
            setLoadingData(true);
            const dataUser = getUserFromCookie();

            if (codigo) {
                try {
                    const response = await http.get(`/despesas/${codigo}`, {
                        headers: {
                            Authorization: `Bearer ${dataUser.token}`
                        }
                    });
                    setDespesa(response.data)

                    const responseFornecedor = await http.get(`/fornecedores/${response.data.fornecedor_id}`, {
                        headers: {
                            Authorization: `Bearer ${dataUser.token}`
                        }
                    });

                    setFornecedor(responseFornecedor.data)
                } catch (error) {
                    console.log("Erro ao buscar receita" + error)
                } finally {
                    setLoadingData(false)
                }
            }
        }

        fetchData();

    }, [codigo])

    const handleUpdateDespesa = async () => {
        setLoadingUpdate(true)
        const dataUser = getUserFromCookie();

        if (erroData !== true) {
            try {
                await http
                    .put(`/despesas/${codigo}`, despesa, {
                        headers: {
                            Authorization: `Bearer ${dataUser.token}`
                        }
                    })
                    .then((response) => {
                        setStatus(true)
                    })
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    setErroDados('Erro na resposta da API:', error.response.message);
                } else {
                    console.error('Erro ao enviar dados para a API:', error);
                }
            } finally {
                setLoadingUpdate(false)
            }

        } else {
            setErroDados("Nao foi possivel atualizar os dados, corrija os erros e tente novamente")
        }

    };

    const handleInputChange = (e) => {
        setDespesa({...despesa, [e.target.name]: e.target.value});
    };

    const handlerCancelar = () => {
        router.push('/gestao-sgme/financeiro/contas-a-pagar');
    }


    const validateDataVencimento = (value) => {
        const dataVencimento = parseISO(value);
        const dataAtual = new Date();

        return isAfter(dataVencimento, dataAtual) || dataVencimento.toDateString() === dataAtual.toDateString();
    };


    return (
        <>
            <HeadSgme title="SGME - Alterando contas a pagar" />
            <div className="container d-flex align-items-center justify-content-center mt-5">

                <form className="form-control-sm w-100">

                    {loadingData ? (
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h1>{fornecedor.nome}</h1>
                            <input defaultValue={fornecedor.id}
                                   readOnly={true}
                                   name="fornecedor_id"
                                   hidden
                                   onChange={handleInputChange}

                            />

                            <div>
                                <p><b>Status:</b> {despesa.status}</p>
                            </div>

                            <div className="d-sm-flex flex-row justify-content-between mb-3">
                                <div className="d-flex flex-column w-100 me-3">
                                    <label htmlFor="valor">Valor: </label>
                                    <input type="number" placeholder="R$"
                                           className="form-control"
                                           value={despesa.valor}
                                           name="valor"
                                           onChange={handleInputChange}
                                    />

                                </div>


                                <div className="d-flex flex-column w-100">
                                    <label htmlFor="data_vencimento">Data Vencimento: </label>
                                    <input type="date"
                                           className="form-control"
                                           value={despesa.data_vencimento}
                                           name="data_vencimento"
                                           onChange={(e) => {
                                               handleInputChange(e);
                                               if (!validateDataVencimento(e.target.value)) {
                                                   setErroData(true)
                                               }
                                           }}
                                    />

                                    {erroData === true ? (
                                        <p className="alert alert-danger mt-3">A data de vencimento deve ser maior ou
                                            igual à
                                            data atual.</p>
                                    ) : ("")}

                                </div>
                            </div>

                            <div className="d-sm-flex flex-row justify-content-between mb-3">

                                <div className="d-flex flex-column me-3 w-100">
                                    <label htmlFor="forma_pagamento">Forma de Pagamento</label>
                                    <select className="form-select"
                                            value={despesa.forma_pagamento}
                                            name="forma_pagamento"
                                            onChange={handleInputChange}
                                    >
                                        <option hidden
                                                value={despesa.forma_pagamento}>{despesa.forma_pagamento}</option>
                                        <option value="DINHEIRO">DINHEIRO</option>
                                        <option value="PIX">PIX</option>
                                        <option value="CARTAO">CARTAO</option>
                                        <option value="BOLETO">BOLETO</option>
                                    </select>


                                </div>

                                <div className="d-sm-flex flex-column w-100">
                                    <label htmlFor="status">Status</label>
                                    <select className="form-select"
                                            value={despesa.status}
                                            name="status"
                                            onChange={handleInputChange}
                                    >
                                        <option value={despesa.status} hidden>{despesa.status}</option>
                                        <option value="Pendente">Pendente</option>
                                        <option value="Paga">Pago</option>
                                    </select>

                                </div>

                            </div>

                            <div className="d-sm-flex flex-row justify-content-between mb-3">
                                <div className="d-flex flex-column w-100 me-3">
                                    <label htmlFor="observacao">Observação: </label>
                                    <textarea placeholder="Observação"
                                              className="form-control"
                                              value={despesa.observacao}
                                              name="observacao"
                                              onChange={handleInputChange}
                                    />

                                </div>
                            </div>

                            <div className="w-100 d-flex justify-content-end">

                                <button className="btn btn-success me-3" onClick={(e) => {
                                    e.preventDefault();
                                    handleUpdateDespesa()
                                    openModal()
                                }}>ALTERAR
                                </button>

                                <Link href={`/gestao-sgme/financeiro/contas-a-pagar/delete/${despesa.id}`}
                                      className="btn btn-danger me-3">EXCLUIR</Link>

                                <button className="btn btn-primary" onClick={(e) => {
                                    e.preventDefault();
                                    handlerCancelar();

                                }}>CANCELAR
                                </button>
                            </div>


                            <ModalComponent
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                            >
                                {loadingUpdate ? (
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {status === true ? (
                                            <div>
                                                <p className="fw-bold text-success">Conta alterada com sucesso</p>
                                            </div>

                                        ) : (
                                            <>
                                                <p>Erro ao atualizar</p>
                                                <p>{erroDados}</p>
                                            </>

                                        )}
                                    </>
                                )}


                            </ModalComponent>
                        </>
                    )}

                </form>

            </div>
        </>
    )
}
export default UpdateDespesas;