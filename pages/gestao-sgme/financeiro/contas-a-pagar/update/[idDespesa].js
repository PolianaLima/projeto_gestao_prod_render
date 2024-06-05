'use client';

import React, {useEffect, useState} from "react";
import HeadSgme from "@/components/head/HeadSgme";
import {useFormModalNewUpdate} from "@/utils/hooks/useFormNewUpdate";
import {useRouter} from "next/router";
import {handleApiError} from "@/utils/errors/handleErroApi";
import {getDespesaId, putDespesa} from "@/api/despesasApi";
import MessageLoadingData from "@/components/message/messageLoadingData";
import GroupButtonFormUpdate from "@/components/buttons_group/GroupButtonFormUpdate";
import ModalInfo from "@/components/modal/ModalInfo";
import ModalCancelar from "@/components/modal/ModalCancelar";
import Image from "next/image";

const ROUTE_PATH = '/gestao-sgme/financeiro/contas-a-pagar';

const UpdateDespesas = () => {

    const {
        loadingData,
        setLoadingData,
        loadingApi,
        setLoadingApi,
        statusButtonSalvar,
        setStatusButtonSalvar,
        statusButtonEditar,
        setStatusButtonEditar,
        statusInputDisabled,
        setStatusInputDisabled,
        erroApiMessage,
        setErroApiMessage,
        statusErroApi,
        setStatusErroApi,
        statusVisibleModal,
        setStatusVisibleModal,
        statusVisibleModalCancelar,
        setStatusVisibleModalCancelar,
        toggleModalCancelar,
        toggleModal,
        cancelar

    } = useFormModalNewUpdate(ROUTE_PATH);

    const router = useRouter();
    const {idDespesa} = router.query;
    const [despesa, setDespesa] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDespesaId(idDespesa);
                setDespesa(data);
            } catch (error) {
                handleApiError(error, setErroApiMessage, setStatusErroApi)
            } finally {
                setLoadingData(false);
            }
        }

        fetchData();
    }, [idDespesa, setErroApiMessage, setLoadingData, setStatusErroApi]);

   
    const handleInputChange = (e) => {
        setDespesa({...despesa, [e.target.name]: e.target.value})
    }

    const onSubmit = async () => {
        setLoadingApi(true);
        try {
            await putDespesa(idDespesa, despesa);
            setStatusVisibleModal(true);
        } catch (error) {
            handleApiError(error, setErroApiMessage, setStatusErroApi)
        } finally {
            setLoadingApi(false);
        }
    }

    return (
        <>
            <HeadSgme title="SGME - Alterando contas a pagar"/>
            {loadingData ? (
                <MessageLoadingData message="Carregando dados da despesa..."/>
            ) : (
                <main className="m-5 border border-1 border-secondary-subtle mt-3">
                    <h3 className="bg-secondary-subtle p-2">
                        <i className="h3 bi bi-cash-coin"> </i>
                        Editar Despesa
                    </h3>

                    <div className="d-sm-flex justify-content-between w-100">

                        <form className="p-3 mt-3 m-2 w-100 border ">
                            <div>
                                <p><b>Status:</b> {despesa.status.toLowerCase()}</p>
                            </div>

                            <div className="mb-3">
                                <label className="fw-bolder" htmlFor="nome">Nome</label>
                                <input type="text"
                                       className="form-controll-sgme"
                                       disabled={true}
                                       name="nome"
                                       value={despesa.nome}
                                />
                            </div>
                            <div className="d-sm-flex flex-row justify-content-between mb-3">
                                <div className="d-flex flex-column w-100 me-3">
                                    <label htmlFor="valor">Valor: </label>
                                    <input type="number" placeholder="R$"
                                           className="form-control"
                                           disabled={statusInputDisabled}
                                           value={despesa.valor}
                                           name="valor"
                                           onChange={handleInputChange}
                                    />

                                </div>


                                <div className="d-flex flex-column w-100">
                                    <label htmlFor="data_vencimento">Data Vencimento: </label>
                                    <input type="date"
                                           className="form-control"
                                           disabled={statusInputDisabled}
                                           value={despesa.data_vencimento}
                                           name="data_vencimento"
                                           onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="d-sm-flex flex-row justify-content-between mb-3">
                                <div className="d-flex flex-column me-3 w-100">
                                    <label htmlFor="forma_pagamento">Forma de Pagamento</label>
                                    <select className="form-select"
                                            value={despesa.forma_pagamento}
                                            name="forma_pagamento"
                                            disabled={statusInputDisabled}
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
                                            disabled={statusInputDisabled}
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
                                              disabled={statusInputDisabled}
                                              onChange={handleInputChange}
                                    />

                                </div>
                            </div>

                            {statusErroApi && (
                                <p className="p-2 text-danger fw-bolder">
                                    <i className="bi bi-exclamation-triangle"> </i>
                                    {erroApiMessage}
                                </p>

                            )}
                            <GroupButtonFormUpdate
                                statusButtonEditar={statusButtonEditar}
                                onSubmit={onSubmit}
                                statusButtonSalvar={statusButtonSalvar}
                                setStatusInputDisabled={setStatusInputDisabled}
                                setStatusButtonSalvar={setStatusButtonSalvar}
                                cancelar={cancelar}
                                setStatusButtonEditar={setStatusButtonEditar}
                            />
                            {loadingApi && (
                                <MessageLoadingData message="Salvando dados"/>
                            )}
                        </form>

                        <div className="w-100 d-flex justify-content-center">
                            <Image src="/assets/img/icone_contas_pagar.svg"
                                   alt="Index de Cliente"
                                   width="0"
                                   height="0"
                                   priority={true}
                                   sizes="100vw"
                                   style={{width: "60%", height: "auto"}}/>
                        </div>
                    </div>


                    <ModalInfo statusVisibleModal={statusVisibleModal}
                               toggleModal={toggleModal}
                               message="Despesa Alterado com sucesso"/>

                    <ModalCancelar message="Deseja descartar as alterações?"
                                   toggleModal={toggleModalCancelar}
                                   statusVisibleModalCancelar={statusVisibleModalCancelar}
                                   setStatusVisibleModalCancelar={setStatusVisibleModalCancelar}
                    />
                </main>
            )}
        </>
    )
}
export default UpdateDespesas;