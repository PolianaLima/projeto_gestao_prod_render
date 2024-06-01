import HeadSgme from "@/components/head/HeadSgme";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {getClienteId, putCliente} from "@/api/clienteApi";
import MessageLoadingData from "@/components/message/messageLoadingData";
import InputMask from "react-input-mask";
import Image from "next/image";
import ModalInfo from "@/components/modal/ModalInfo";
import {handleApiError} from "@/utils/errors/handleErroApi";
import ModalCancelar from "@/components/modal/ModalCancelar";
import {useFormModalNewUpdate} from "@/utils/hooks/useFormNewUpdate";
import GroupButtonFormUpdate from "@/components/buttons_group/GroupButtonFormUpdate";

const ROUTE_PATH = '/gestao-sgme/clientes';

function UpdateCliente() {

    const router = useRouter();
    const {idCliente} = router.query;

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
        concelar

    }= useFormModalNewUpdate(ROUTE_PATH);


   /* const router = useRouter();
    const [loadingData, setLoadingData] = useState(true);
    const [loadingApi, setLoadingApi] = useState(false);

    const [statusButtonSalvar, setStatusButtonSalvar] = useState(true);
    const [statusButtonEditar, setStatusButtonEditar] = useState(true);
    const [statusInputDisabled, setStatusInputDisabled] = useState(true);

    const [erroApiMessage, setErroApiMessage] = useState(false);
    const [statusErroApi, setStatusErroApi] = useState(false);

    const [statusVisibleModal, setStatusVisibleModal] = useState(false);
    const [statusVisibleModalCancelar, setStatusVisibleModalCancelar] = useState(false);*/



    const [cliente, setCliente] = useState({});

    //Pegando o dado do cliente
    useEffect(() => {
        fetchData();
    }, [idCliente]);

    const fetchData = async () => {
        try {
            const data = await getClienteId(idCliente);
            setCliente(data);
        } catch (error) {
            handleApiError(error, setErroApiMessage, setStatusErroApi)
        } finally {
            setLoadingData(false);
        }
    }

    //Monitorando o estado do cliente
    const handleInputChange = (e) => {
        setCliente({...cliente, [e.target.name]: e.target.value})
    }

    const onSubmit = async () => {
        setLoadingApi(true)
        try {
            await putCliente(idCliente, cliente);
            setStatusVisibleModal(true)
        } catch (error) {
            handleApiError(error, setErroApiMessage, setStatusErroApi)
        } finally {
            setLoadingApi(false)
        }
    }

 /*   const toggleModalCancelar = () => {
        toggleModalCancelarController(setStatusVisibleModalCancelar, statusVisibleModalCancelar, ROUTE_PATH)
    }

    const toggleModal = () => {
        toggleModalController(setStatusVisibleModal, statusVisibleModal, ROUTE_PATH)
    }

    const concelar = () => {
        if (statusButtonEditar === false) {
            setStatusVisibleModalCancelar(true);
        } else {
            router.push(ROUTE_PATH);
        }
    }*/

    return (
        <>
            <HeadSgme title="SGME - Cliente"/>
            {loadingData ? (
                <MessageLoadingData message="Carregando dados do cliente"/>
            ) : (
                <main className="m-5 border border-1 border-secondary-subtle mt-3">
                    <h3 className="bg-secondary-subtle p-2">
                        <i className=" h3 bi bi-person-add"> </i>
                        Alterar Cliente
                    </h3>
                    <div className="d-sm-flex justify-content-between w-100">
                        <form className="p-2 mt-3 w-100">
                            <div className="d-flex mb-3">
                                <label className="fw-bolder me-5 w-25" htmlFor="nome">Nome</label>
                                <input type="text"
                                       className="border border-1 border-secondary-subtle w-100 p-1"
                                       disabled={statusInputDisabled}
                                       name="nome"
                                       value={cliente.nome}
                                       onChange={handleInputChange}
                                />
                            </div>
                            <div className="d-flex mb-3">
                                <label className="fw-bolder me-5 w-25" htmlFor="documento">Documento</label>
                                <input type="text"
                                       className="border border-1 border-secondary-subtle w-100 p-1"
                                       placeholder="CPF/CNPJ"
                                       disabled={statusInputDisabled}
                                       name="documento"
                                       value={cliente.documento}
                                       onChange={handleInputChange}
                                />
                            </div>

                            <div className="d-flex mb-3">
                                <label className="fw-bolder me-5 w-25" htmlFor="telefone">Telefone</label>
                                <InputMask
                                    mask="(99) 99999-9999"
                                    maskChar="_"
                                    placeholder="Telefone/Celular"
                                    className="form-control"
                                    name="telefone"
                                    disabled={statusInputDisabled}
                                    value={cliente.telefone}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="d-flex mb-3">
                                <label className="fw-bolder me-5 w-25" htmlFor="data_nascimento">Data de
                                    Nasc</label>
                                <input type="date"
                                       className="border border-1 border-secondary-subtle w-100 p-1"
                                       disabled={statusInputDisabled}
                                       name="data_nascimento"
                                       value={cliente.data_nascimento}
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
                                               checked={cliente.status === "ATIVO"}
                                               onChange={handleInputChange}
                                        />
                                        <label htmlFor="ATIVO">Ativo</label>
                                    </div>
                                    <div>
                                        <input type="radio"
                                               id="inativo"
                                               name="status"
                                               value="INATIVO"
                                               checked={cliente.status === "INATIVO"}
                                               onChange={handleInputChange}
                                               className="me-3"
                                        />
                                        <label htmlFor="ATIVO">Inativo</label>
                                    </div>
                                </div>
                            </div>

                            {statusErroApi && (
                                <p className="p-2 text-danger fw-bolder">
                                    <i className="bi bi-exclamation-triangle"> </i>
                                    {erroApiMessage}
                                </p>

                            )}

                            <GroupButtonFormUpdate
                                onSubmit={onSubmit}
                                concelar={concelar}
                                setStatusButtonEditar={setStatusButtonEditar}
                                setStatusButtonSalvar={setStatusButtonSalvar}
                                setStatusInputDisabled={setStatusInputDisabled}
                                statusButtonSalvar={statusButtonSalvar}
                                statusButtonEditar={statusButtonEditar}
                            />


                            {loadingApi && (
                                <p className="p-2 text-success fw-bolder">
                                    <i className="bi bi-info-circle"> </i>
                                    Salvando cliente, aguarde...
                                </p>
                            )}
                        </form>

                        <div className="w-100 d-flex justify-content-center">
                            <Image src="/assets/img/icone_cadastro_cliente.svg"
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
                               message="Cliente Alterado com sucesso"/>

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

export default UpdateCliente;