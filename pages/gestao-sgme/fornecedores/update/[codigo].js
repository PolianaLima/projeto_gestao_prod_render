'use client';
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {getUserFromCookie} from "@/utils/Cookies";
import {http} from "@/utils/http";
import ModalComponent from "@/components/ModalComponent";
import HeadSgme from "@/components/head/HeadSgme";

const UpdateFornecedor = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [loading, setLoading] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        router.push('/gestao-sgme/fornecedores')
    };

    const router = useRouter();

    const [errorApi, setErroApi] = useState()
    const [resultErro, setResultErro] = useState(false)
    const [status, setStatus] = useState([false])
    const {codigo} = router.query;


    const [fornecedor, setFornecedor] = useState(
        {
            id: "",
            cnpj: "",
            nome: "",
            status: ""

        }
    );


    useEffect(() => {

        setLoadingData(true)

        const fetchData = async () => {
            const dataUser = getUserFromCookie();

            if (codigo) {
                try {
                    const response = await http.get(`/fornecedores/${codigo}`, {
                        headers: {
                            Authorization: `Bearer ${dataUser.token}`
                        }
                    });
                    setFornecedor(response.data)
                } catch (error) {
                    console.log(error.response.data.message)
                } finally {
                    setLoadingData(false)
                }
            }

        }
        fetchData()

    }, [codigo])

    const handleUpdateFornecedor = async () => {
        setLoading(true)
        const dataUser = getUserFromCookie();

        try {
            await http.put(`/fornecedores/${codigo}`, fornecedor, {
                headers: {
                    Authorization: `Bearer ${dataUser.token}`
                }
            });
            setResultErro(false);
            setStatus(true)
            abrirModal();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setResultErro(true)
                setStatus(false)
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
        setFornecedor({...fornecedor, [e.target.name]: e.target.value});
    };
    const handlerCancelar = () => {
        router.push('/gestao-sgme/fornecedores');
    }

    return (
        <>
           <HeadSgme title="SGME - Alterando Fornecedor" />
            <main className="container-sm d-flex align-items-center justify-content-start mt-5">

                <form className="form-control-sm w-100 mobile-styles-form" style={{maxWidth: "50%"}}>
                    <h3 className="mb-4">Atualizando Fornecedor</h3>

                    {loadingData ? (
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) :
                        (
                            <>
                                <div className="d-flex flex-column">
                                    <label>Cpnj / CPF: </label>
                                    <input type="number"
                                           placeholder="Cnpj / Cpf"
                                           className="form-control"
                                           name="documento"
                                           value={fornecedor.documento}
                                           onChange={handleInputChange}
                                    />

                                    {resultErro === true ? (
                                        <p className="text-danger fw-bold">{errorApi}</p>
                                    ) : ("")}
                                </div>

                                <div className="d-flex flex-row justify-content-between mb-3">
                                    <div className="d-flex flex-column w-100">
                                        <label htmlFor="valor">Razão Social / Nome: </label>
                                        <input placeholder="Razao Social / NOme"
                                               className="form-control"
                                               name="nome"
                                               value={fornecedor.nome}
                                               onChange={handleInputChange}
                                        />

                                    </div>
                                </div>

                                <div className="d-sm-flex justify-content-between flex-row mt-3 ">
                                    <div className="d-flex flex-column w-100 me-3">
                                        <label htmlFor="status">Status</label>
                                        <div>
                                            <input type="radio"
                                                   id="ativo"
                                                   name="status"
                                                   value="ATIVO"
                                                   checked={fornecedor.status === "ATIVO"}
                                                   onChange={handleInputChange}
                                                   className="me-3"
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

                                <div className="d-flex mt-3">
                                    <button className="btn btn-success pe-3 ps-3 me-3" onClick={(e) => {
                                        e.preventDefault();
                                        const promise = handleUpdateFornecedor();
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
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            {status === true ? (
                                                <div>
                                                    <p className="fw-bold text-success">Fornecedor alterado com
                                                        sucesso</p>
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

            </main>
        </>
    )
}

export default UpdateFornecedor;