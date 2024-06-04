import React, {useEffect, useState} from 'react';
import HeadSgme from "@/components/head/HeadSgme";
import MessageErroApi from "@/components/message/messageErroApi";
import GroupButtonCadastro from "@/components/buttons_group/GroupButtonCadastro";
import MessageLoadingData from "@/components/message/messageLoadingData";
import ModalInfo from "@/components/modal/ModalInfo";
import ModalCancelar from "@/components/modal/ModalCancelar";
import {useFormModal} from "@/utils/hooks/useFormModalNewCadastro";
import {handleApiError} from "@/utils/errors/handleErroApi";
import {getClientes} from "@/api/clienteApi";
import {postReceita} from "@/api/receitasApi";
import Image from "next/image";

const ROUTE_PATH = `/gestao-sgme/financeiro/contas-a-receber`;

function Cadastro() {
    const {
        register,
        handleSubmit,
        errors,
        loadingApi,
        setLoadingApi,
        statusErroApi,
        setStatusErroApi,
        erroApiMessage,
        setErroApiMessage,
        statusVisibleModal,
        setStatusVisibleModal,
        statusVisibleModalCancelar,
        setStatusVisibleModalCancelar,
        toggleModalCancelar,
        toggleModal
    } = useFormModal(ROUTE_PATH);

    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await getClientes();
                setClientes(response);
            } catch (error) {
                handleApiError(error, setErroApiMessage, setStatusErroApi)
            }
        }

        fetchClientes();
    }, [setErroApiMessage, setStatusErroApi]);

    const onSubmit = async (data) => {
        try {
            await postReceita(data);
            setStatusVisibleModal(true);
        } catch (error) {
            handleApiError(error, setErroApiMessage, setStatusErroApi)
        } finally {
            setLoadingApi(false)
        }
    }

    return (
        <>
            <HeadSgme title="SGME - Cadastrando nova conta a receber"/>
            <main className="m-5 border border-1 border-secondary-subtle mt-3">
                <h3 className="bg-secondary-subtle p-2">
                    <i className="h3 bi bi-cash-coin"> </i>
                    Lancar Conta a receber
                </h3>
                <div className="d-sm-flex justify-content-between w-100">
                    <form className="p-3 mt-3 w-100">
                        <div className="d-flex flex-column ">
                            <label>Cliente</label>
                            <select className="form-select mb-3 form-controll-sgme"
                                    defaultValue="0"
                                    {...register("cliente_id", {validate: (value) => (value !== "0")})}
                            >
                                <option value="0">Selecione um cliente</option>
                                {clientes.map((cliente) =>
                                    <option value={cliente.id} key={cliente.id}>{cliente.nome}</option>
                                )}
                            </select>
                            {errors?.cliente_id?.type === "validate" && (
                                <p className="alert alert-danger">Cliente Obrigatorio</p>
                            )}
                        </div>

                        <div className="d-sm-flex flex-row justify-content-between mb-3">
                            <div className="d-sm-flex flex-column w-100 me-3">
                                <label htmlFor="valor">Valor: </label>
                                <input type="number"
                                       placeholder="R$"
                                       className="form-controll-sgme"
                                       {...register("valor", {required: true})}
                                />
                                {errors?.valor?.type === "required" && (
                                    <p className="alert alert-danger mt-3">Valor e obrigatorio!</p>
                                )}
                            </div>

                            <div className="d-sm-flex flex-column w-100">
                                <label htmlFor="data_vencimento">Data Vencimento: </label>
                                <input type="date"
                                       className="form-controll-sgme"

                                       {...register('data_vencimento', {
                                           required: true,
                                       })}
                                />
                                {errors?.data_vencimento?.type === "required" && (
                                    <p className="alert alert-danger mt-3">Valor e obrigatorio!</p>
                                )}
                            </div>
                        </div>

                        <div className="d-sm-flex flex-row justify-content-between mb-3">

                            <div className="d-sm-flex flex-column w-100 me-3">
                                <label htmlFor="forma_pagamento">Forma de Pagamento</label>
                                <select className="form-select form-controll-sgme"
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
                                    <p className="alert alert-danger mt-3" role="alert">Selecione uma forma de
                                        pagamento</p>
                                )}

                            </div>

                            <div className="d-sm-flex flex-column w-100">
                                <label htmlFor="status">Status</label>
                                <select className="form-select form-controll-sgme"
                                        defaultValue="Selecione status"
                                        {...register("status", {validate: (value) => (value !== "0")})}
                                >
                                    <option value="0">Selecione status</option>
                                    <option value="Pendente">Pendente</option>
                                    <option value="Paga">Pago</option>
                                </select>
                                {errors?.status?.type === "validate" && (
                                    <p className="alert alert-danger mt-3">Selecione o status!</p>
                                )}
                            </div>
                        </div>

                        <div className="d-flex flex-column w-100">
                            <label htmlFor="Obsercavao">Obervação: </label>
                            <textarea className="mb-3 form-controll-sgme"
                                      rows={3} {...register("observacao")}/>
                        </div>

                        {statusErroApi && (
                            <MessageErroApi erroApiMessage={erroApiMessage}/>

                        )}

                        <GroupButtonCadastro handleSubmit={handleSubmit}
                                             setStatusVisibleModalCancelar={setStatusVisibleModalCancelar}
                                             onSubmit={onSubmit}
                        />

                        {loadingApi && (
                            <MessageLoadingData message="Salvando dados no sistema, por favor aguarde"/>
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
                           message="Receita salva com sucesso"/>

                <ModalCancelar toggleModal={toggleModalCancelar}
                               setStatusVisibleModalCancelar={setStatusVisibleModalCancelar}
                               statusVisibleModalCancelar={statusVisibleModalCancelar}
                               message="Deseja descartar as alterações?"
                />

            </main>
        </>
    )
        ;
}

export default Cadastro;