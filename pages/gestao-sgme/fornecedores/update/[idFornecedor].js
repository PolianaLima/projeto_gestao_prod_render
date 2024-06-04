'use client';
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import HeadSgme from "@/components/head/HeadSgme";
import {useFormModalNewUpdate} from "@/utils/hooks/useFormNewUpdate";
import {getFornecedorId, putFornecedor} from "@/api/fornecedoresApi";
import MessageLoadingData from "@/components/message/messageLoadingData";
import GroupButtonFormUpdate from "@/components/buttons_group/GroupButtonFormUpdate";
import Image from "next/image";
import ModalInfo from "@/components/modal/ModalInfo";
import ModalCancelar from "@/components/modal/ModalCancelar";
import {handleApiError} from "@/utils/errors/handleErroApi";

const ROUTE_PATH = '/gestao-sgme/fornecedores';

const UpdateFornecedor = () => {
    const router = useRouter();
    const {idFornecedor} = router.query;

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

    const [fornecedor, setFornecedor] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getFornecedorId(idFornecedor);
                setFornecedor(data);
            } catch (error) {

            } finally {
                setLoadingData(false)
            }
        }
        fetchData();
    }, [idFornecedor, setLoadingData]);

    //Monitorando o estado do cliente
    const handleInputChange = (e) => {
        setFornecedor({...fornecedor, [e.target.name]: e.target.value})
    }

    const onSubmit = async () => {
        setLoadingApi(true)
        try {
            await putFornecedor(idFornecedor, fornecedor);
            setStatusVisibleModal(true)
        } catch (error) {
            handleApiError(error, setErroApiMessage, setStatusErroApi)
        } finally {
            setLoadingApi(false)
        }
    }

    return (
        <>
            <HeadSgme title="SGME - Alterando Fornecedor"/>
            {loadingData ? (
                <MessageLoadingData message="Carregando dados do cliente"/>
            ) : (
                <main className="m-5 border border-1 border-secondary-subtle mt-3">
                    <h3 className="bg-secondary-subtle p-2">
                        <i className="h3 bi bi-person-up"> </i>
                        Alterar Fornecedor
                    </h3>
                    <div className="d-sm-flex justify-content-between w-100">
                        <form className="p-2 mt-3 w-100">
                            <div className="d-flex mb-3">
                                <label className="fw-bolder me-5 w-25" htmlFor="documento">Documento</label>
                                <input type="text"
                                       className="border border-1 border-secondary-subtle w-100 p-1"
                                       placeholder="CPF/CNPJ"
                                       disabled={statusInputDisabled}
                                       name="documento"
                                       value={fornecedor.documento}
                                       onChange={handleInputChange}
                                />
                            </div>

                            <div className="d-flex mb-3">
                                <label className="fw-bolder me-5 w-25" htmlFor="nome">Nome</label>
                                <input type="text"
                                       className="border border-1 border-secondary-subtle w-100 p-1"
                                       disabled={statusInputDisabled}
                                       name="nome"
                                       value={fornecedor.nome}
                                       onChange={handleInputChange}
                                />
                            </div>

                            <div className="d-flex mb-3">
                                <label htmlFor="status" className="fw-bolder me-5 w-25">Status</label>
                                <div className="d-flex mb-3 w-100">
                                    <div className="me-3">
                                        <input type="radio"
                                               className="me-3"
                                               id="ativo"
                                               name="status"
                                               value="ATIVO"
                                               checked={fornecedor.status === "ATIVO"}
                                               onChange={handleInputChange}
                                        />
                                        <label htmlFor="ATIVO">Ativo</label>
                                    </div>
                                    <div>
                                        <input type="radio"
                                               id="inativo"
                                               name="status"
                                               value="INATIVO"
                                               checked={fornecedor.status === "INATIVO"}
                                               onChange={handleInputChange}
                                               className="me-3"
                                        />
                                        <label htmlFor="ATIVO">Inativo</label>
                                    </div>
                                </div>
                            </div>

                            <GroupButtonFormUpdate
                                onSubmit={onSubmit}
                                cancelar={cancelar}
                                setStatusButtonEditar={setStatusButtonEditar}
                                setStatusButtonSalvar={setStatusButtonSalvar}
                                setStatusInputDisabled={setStatusInputDisabled}
                                statusButtonSalvar={statusButtonSalvar}
                                statusButtonEditar={statusButtonEditar}
                            />

                            {statusErroApi && (
                                <p className="p-2 text-danger fw-bolder">
                                    <i className="bi bi-exclamation-triangle"> </i>
                                    {erroApiMessage}
                                </p>

                            )}
                        </form>

                        <div className="w-100 d-flex justify-content-center">
                            <Image src="/assets/img/icone_cad_fornecedor.png"
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
                               message="Fornecedor Alterado com sucesso"/>

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

export default UpdateFornecedor;