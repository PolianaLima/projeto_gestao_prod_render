'use client';
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Head from "next/head";
import {http} from "@/utils/http";
import ModalComponent from "@/components/ModalComponent";
import {getUserFromCookie} from "@/utils/Cookies";
import InputMask from "react-input-mask";
import HeadSgme from "@/components/head/HeadSgme";

const UpdateCliente = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [loading, setLoading] = useState(true);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        router.push('/gestao-sgme/clientes')
    };


    const router = useRouter();


    const [errorApi, setErroApi] = useState()
    const [resultErro, setResultErro] = useState(false)
    const [status, setStatus] = useState(false)


    const [cliente, setCliente] = useState(
        {
            id: "",
            cpf: "",
            nome: "",
            telefone: "",
            data_nascimento: ""
        }
    );

    const {codigo} = router.query;
    useEffect(() => {
        setLoadingData(true)

        const fetchData = async () => {
            const dataUser = getUserFromCookie();
            if (codigo) {
                try {
                    const response = await http.get(`/clientes/${codigo}`, {
                        headers: {
                            Authorization: `Bearer ${dataUser.token}`
                        }
                    });
                    setCliente(response.data)
                } catch (error) {
                    console.error('Erro ao buscar cliente na pagina de atualização')
                    setErroApi(error.response.data.message)
                } finally {
                    setLoadingData(false)
                }
            }

        }

        fetchData();

    }, [codigo]);


    const handleUpdateCliente = async () => {
        setLoading(true)

        const dataUser = getUserFromCookie();

        const cpfCleaned = cliente.cpf.replace(/\D/g, '');
        cliente.cpf = cpfCleaned;

        if (cliente.telefone) {
            const telefoneCleaned = cliente.telefone.replace(/\D/g, '');
            cliente.telefone = telefoneCleaned;
        }

        try {
            await http.put(`/clientes/${codigo}`, cliente, {
                headers: {
                    Authorization: `Bearer ${dataUser.token}`
                }
            });
            setResultErro(false)
            setStatus(true)
            abrirModal();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setResultErro(true)
                setErroApi(error.response.data.message)
            }
        } finally {
            setLoading(false)
        }
    }

    const abrirModal = (erroApi) => {
        setStatus(true)
        openModal()
    }

    const handleInputChange = (e) => {
        setCliente({...cliente, [e.target.name]: e.target.value});
    };

    const handlerCancelar = () => {
        router.push("/gestao-sgme/clientes");
    }

    return (
        <>
            <HeadSgme title="SGME - Alterando Cliente" />
            <div className="container-sm d-flex align-items-center justify-content-start mt-5">

                <form className="form-control-sm w-100 mobile-styles-form" style={{maxWidth: "65%"}}>

                    <h3 className="mb-4">Atualizando Clientes</h3>

                    {loadingData ? (
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        <>
                            <div className="d-sm-flex flex-column">
                                <label htmlFor="valor">Nome Completo: </label>
                                <input placeholder="Nome"
                                       className="form-control"
                                       name="nome"
                                       value={cliente.nome}
                                       onChange={handleInputChange}
                                />
                            </div>

                            <div className="d-sm-flex flex-row justify-content-between mb-3">
                                <div className="d-sm-flex flex-column w-100 me-3">
                                    <label htmlFor="valor">CPF: </label>
                                    <input type="number"
                                        placeholder="Cnpj / Cnpj"
                                        className="form-control"
                                        name="cpf"
                                        value={cliente.cpf}
                                        onChange={handleInputChange}
                                    />
                                </div>


                                <div className="d-sm-flex flex-column w-100  me-3">
                                    <label>Data Nascimento: </label>
                                    <input type="date"
                                           className="form-control"
                                           name="data_nascimento"
                                           value={cliente.data_nascimento}
                                           onChange={handleInputChange}
                                    />

                                </div>
                                <div className="d-sm-flex flex-column w-100 ">
                                    <label>Telefone</label>
                                    <InputMask
                                        mask="(99) 99999-9999"
                                        maskChar="_"
                                        placeholder="Telefone/Celular"
                                        className="form-control"
                                        name="telefone"
                                        value={cliente.telefone}
                                        onChange={handleInputChange}
                                    />

                                </div>

                            </div>

                            <div>
                                {resultErro === true ? (
                                    <p className="text-danger fw-bold">{errorApi}</p>
                                ) : ("")}
                            </div>

                            <div className="d-flex">
                                <button className="btn btn-success pe-3 ps-3 me-3" onClick={(e) => {
                                    e.preventDefault();
                                    const promise = handleUpdateCliente();
                                    // openModal()
                                }}>SALVAR
                                </button>
                                <button className="btn btn-danger pe-3 ps-3" onClick={(e) => {
                                    e.preventDefault();
                                    handlerCancelar();

                                }}>CANCELAR
                                </button>
                            </div>
                            <ModalComponent
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                            >

                                {loading ? (
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ) : (
                                    <>
                                        {status === true ? (
                                            <div>
                                                <p className="fw-bold text-success">Cliente alterado com sucesso</p>
                                            </div>

                                        ) : (
                                            <>
                                                <p>Erro ao atualizar</p>
                                                <p>{errorApi}</p>

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

export default UpdateCliente;