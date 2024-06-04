'use client';
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import HeadSgme from "@/components/head/HeadSgme";
import {useFormModalNewUpdate} from "@/utils/hooks/useFormNewUpdate";
import {handleApiError} from "@/utils/errors/handleErroApi";
import {getReceitaId, putReceita} from "@/api/receitasApi";
import MessageLoadingData from "@/components/message/messageLoadingData";
import GroupButtonFormUpdate from "@/components/buttons_group/GroupButtonFormUpdate";
import Image from "next/image";
import ModalInfo from "@/components/modal/ModalInfo";
import ModalCancelar from "@/components/modal/ModalCancelar";

const ROUTE_PATH = '/gestao-sgme/financeiro/contas-a-receber';
const UpdateReceita = () => {
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
    const {idReceita} = router.query;
    const [receita, setReceita] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await getReceitaId(idReceita);
            setReceita(data);
        } catch (error) {
            handleApiError(error, setErroApiMessage, setStatusErroApi)
        } finally {
            setLoadingData(false);
        }
    }

    const handleInputChange = (e) => {
        setReceita({...receita, [e.target.name]: e.target.value})
    }

    const onSubmit = async () => {
        setLoadingApi(true);
        try {
            await putReceita(idReceita, receita);
            setStatusVisibleModal(true);
        } catch (error) {
            handleApiError(error, setErroApiMessage, setStatusErroApi)
        } finally {
            setLoadingApi(false);
        }
    }
    return (
        <>
            <HeadSgme title="SGME - Alterando conta a receber" />
            {loadingData ? (
                <MessageLoadingData message="Carregando dados da despesa..."/>
            ) : (
                <main className="m-5 border border-1 border-secondary-subtle mt-3">
                    <h3 className="bg-secondary-subtle p-2">
                        <i className="h3 bi bi-cash-coin"> </i>
                        Editar Receita
                    </h3>

                    <div className="d-sm-flex justify-content-between w-100">

                        <form className="p-3 mt-3 m-2 w-100 border ">
                            <div>
                                <p><b>Status:</b> {receita.status.toLowerCase()}</p>
                            </div>

                            <div className="mb-3">
                                <label className="fw-bolder" htmlFor="nome">Nome</label>
                                <input type="text"
                                       className="form-controll-sgme"
                                       disabled={true}
                                       name="nome"
                                       value={receita.nome}
                                />
                            </div>
                            <div className="d-sm-flex flex-row justify-content-between mb-3">
                                <div className="d-flex flex-column w-100 me-3">
                                    <label htmlFor="valor">Valor: </label>
                                    <input type="number" placeholder="R$"
                                           className="form-control"
                                           disabled={statusInputDisabled}
                                           value={receita.valor}
                                           name="valor"
                                           onChange={handleInputChange}
                                    />

                                </div>


                                <div className="d-flex flex-column w-100">
                                    <label htmlFor="data_vencimento">Data Vencimento: </label>
                                    <input type="date"
                                           className="form-control"
                                           disabled={statusInputDisabled}
                                           value={receita.data_vencimento}
                                           name="data_vencimento"
                                           onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="d-sm-flex flex-row justify-content-between mb-3">
                                <div className="d-flex flex-column me-3 w-100">
                                    <label htmlFor="forma_pagamento">Forma de Pagamento</label>
                                    <select className="form-select"
                                            value={receita.forma_pagamento}
                                            name="forma_pagamento"
                                            disabled={statusInputDisabled}
                                            onChange={handleInputChange}
                                    >
                                        <option hidden
                                                value={receita.forma_pagamento}>{receita.forma_pagamento}</option>
                                        <option value="DINHEIRO">DINHEIRO</option>
                                        <option value="PIX">PIX</option>
                                        <option value="CARTAO">CARTAO</option>
                                        <option value="BOLETO">BOLETO</option>
                                    </select>
                                </div>

                                <div className="d-sm-flex flex-column w-100">
                                    <label htmlFor="status">Status</label>
                                    <select className="form-select"
                                            value={receita.status}
                                            name="status"
                                            disabled={statusInputDisabled}
                                            onChange={handleInputChange}
                                    >
                                        <option value={receita.status} hidden>{receita.status}</option>
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
                                              value={receita.observacao}
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
                            <Image src="/assets/img/icone_contas_receber.svg"
                                   alt="Cadastro de Cliente"
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

export default UpdateReceita;