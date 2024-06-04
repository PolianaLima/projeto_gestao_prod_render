import React, {useEffect, useState} from 'react';
import HeadSgme from "@/components/head/HeadSgme";
import {getFornecedores} from "@/api/fornecedoresApi";
import {handleApiError} from "@/utils/errors/handleErroApi";
import GroupButtonCadastro from "@/components/buttons_group/GroupButtonCadastro";
import ModalInfo from "@/components/modal/ModalInfo";
import ModalCancelar from "@/components/modal/ModalCancelar";
import {useFormModal} from "@/utils/hooks/useFormModalNewCadastro";
import MessageLoadingData from "@/components/message/messageLoadingData";
import MessageErroApi from "@/components/message/messageErroApi";
import {postDespesa} from "@/api/despesasApi";
import Image from "next/image";

const ROUTE_PATH = `/gestao-sgme/financeiro/contas-a-pagar`;

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


    const [fornecedores, setFornecedores] = useState([]);

    useEffect(() => {
        const fetchFornecedores = async () => {
            try {
                const response = await getFornecedores();
                setFornecedores(response);
            } catch (error) {
                handleApiError(error, setErroApiMessage, setStatusErroApi)
            }
        }

        fetchFornecedores();
    }, [setErroApiMessage, setStatusErroApi]);

    const onSubmit = async (data) => {
        try {
            await postDespesa(data);
            setStatusVisibleModal(true);
        }catch (error) {
            handleApiError(error, setErroApiMessage, setStatusErroApi)
        }finally {
            setLoadingApi(false)
        }
    }

    return (
        <>
            <HeadSgme title="SGME - Cadastrando contas a pagar"/>

            <main className="m-5 border border-1 border-secondary-subtle mt-3">
                <h3 className="bg-secondary-subtle p-2">
                    <i className="h3 bi bi-cash-coin"> </i>
                    Lancar Despesa
                </h3>
                <div className="d-sm-flex justify-content-between w-100">
                    <form className="p-3 mt-3 w-100">
                        <div className="d-flex flex-column ">
                            <label>Fornecedor</label>
                            <select className="form-select mb-3 form-controll-sgme"
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
                        <Image src="/assets/img/icone_contas_pagar.svg"
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
                           message="Despesa salva com sucesso"/>

                <ModalCancelar toggleModal={toggleModalCancelar}
                               setStatusVisibleModalCancelar={setStatusVisibleModalCancelar}
                               statusVisibleModalCancelar={statusVisibleModalCancelar}
                               message="Deseja descartar as alterações?"
                />

            </main>
        </>

    );
}

export default Cadastro;