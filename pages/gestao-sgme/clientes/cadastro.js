import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import HeadSgme from "@/components/head/HeadSgme";
import Image from "next/image";
import InputMask from "react-input-mask";
import ModalInfo from "@/components/modal/ModalInfo";
import {useRouter} from "next/router";
import {postCliente} from "@/api/clienteApi";
import {handleApiError} from "@/utils/errors/handleErroApi";
import {toggleModalCancelarController, toggleModalController} from "@/utils/controller/modal";
import ModalCancelar from "@/components/modal/ModalCancelar";

const ROUTE_PATH = `/gestao-sgme/clientes`;

function Cadastro(props) {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: erros
    } = useForm()
    const [loadingApi, setLoadingApi] = useState(false);
    const [statusErroApi, setStatusErroApi] = useState("");
    const [erroApiMessage, setErroApiMessage] = useState("");

    const [statusVisibleModal, setStatusVisibleModal] = useState(false);
    const [statusVisibleModalCancelar, setStatusVisibleModalCancelar] = useState(false);

    const toggleModalCancelar = () => {
        toggleModalCancelarController(setStatusVisibleModalCancelar, statusVisibleModalCancelar, ROUTE_PATH)
    }

    const toggleModal = () => {
        toggleModalController(setStatusVisibleModal, statusVisibleModal, ROUTE_PATH)
    }

    const verificaTelefone = (telefone) => {
        if (telefone) {
            const telefoneCleaned = telefone.replace(/\D/g, ''); // Remove caracteres não numéricos
            return telefoneCleaned;
        }
        return telefone;
    }

    const onsubmit = async (data) => {
        verificaTelefone(data.telefone);
        setLoadingApi(true)
        try {
            await postCliente(data);
            setStatusVisibleModal(true)
        } catch (error) {
            handleApiError(error, setErroApiMessage, setStatusErroApi)
        } finally {
            setLoadingApi(false)
        }
    }

    return (
        <>
            <HeadSgme title="SGME - Cadastro de Cliente"/>
            <main className="m-5 border border-1 border-secondary-subtle mt-3">
                <h3 className="bg-secondary-subtle p-2">
                    <i className=" h3 bi bi-person-add"> </i>
                    Cadasto de Cliente
                </h3>
                <div className="d-sm-flex justify-content-between w-100">
                    <form className="p-2 mt-3 w-100">
                        <div className="d-flex mb-3">
                            <label className="fw-bolder me-5 w-25" htmlFor="nome">Nome</label>
                            <input type="text"
                                   className="border border-1 border-secondary-subtle w-100 p-1"
                                   {...register('nome')}/>
                        </div>
                        <div className="d-flex mb-3">
                            <label className="fw-bolder me-5 w-25" htmlFor="documento">Documento</label>
                            <input type="text"
                                   className="border border-1 border-secondary-subtle w-100 p-1"  {...register('documento')}/>
                        </div>

                        <div className="d-flex mb-3">
                            <label className="fw-bolder me-5 w-25" htmlFor="telefone">Telefone</label>
                            <InputMask
                                mask="(99) 99999-9999"
                                maskChar="_"
                                placeholder="Telefone/Celular"
                                className="form-control"
                                {...register("telefone",)}
                            />
                        </div>

                        <div className="d-flex mb-3">
                            <label className="fw-bolder me-5 w-25" htmlFor="data_nascimento">Data de Nasc</label>
                            <input type="date"
                                   className="border border-1 border-secondary-subtle w-100 p-1" {...register('data_nascimento')}/>
                        </div>

                        {statusErroApi && (
                            <p className="p-2 text-danger fw-bolder">
                                <i className="bi bi-exclamation-triangle"> </i>
                                {erroApiMessage}
                            </p>

                        )}

                        <div className="d-sm-flex justify-content-end">
                            <button className="btn btn-warning pe-3 ps-3 me-3"
                                    onClick={(event) => {
                                        event.preventDefault()
                                        setStatusVisibleModalCancelar(true);
                                    }}
                            >CANCELAR
                            </button>
                            <button className="btn btn-success pe-4 ps-4"
                                    onClick={(event) => {
                                        event.preventDefault()
                                        handleSubmit(onsubmit)();
                                    }}>SALVAR
                            </button>
                        </div>

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
                           message="Cliente salvo com sucesso"/>

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