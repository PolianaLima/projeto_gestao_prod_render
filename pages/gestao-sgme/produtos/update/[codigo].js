'use client';
import {useRouter} from "next/router";
import HeadSgme from "@/components/head/HeadSgme";
import React, {useEffect, useState} from "react";
import {getUserFromCookie} from "@/utils/Cookies";
import {http} from "@/utils/http";
import axios from "axios";
import ModalComponent from "@/components/ModalComponent";

const UpdateProduto = () => {
        const router = useRouter();
        const [loadingData, setLoadingData] = useState(false);
        const [loadingUpdate, setLoadingUpdate] = useState(false);
        const [resultErro, setResultErro] = useState(false);
        const {codigo} = router.query;
        const [produto, setProduto] = useState({
            id: "",
            codigo: "",
            nome: "",
            preco: "",
            custo: "",
            status: "",
        });
        const [errorApi, setErroApi] = useState();
        const [status, setStatus] = useState([false]);

        const [modalIsOpen, setModalIsOpen] = useState(false);
        const openModal = () => {
            setModalIsOpen(true);
        };

        const closeModal = () => {
            setModalIsOpen(false);
            router.push('/gestao-sgme/produtos')
        };
        const abrirModal = (erroApi) => {
            openModal()
        }

        useEffect(() => {
                setLoadingData(true);
                const fetchData = async () => {
                    const dataUser = getUserFromCookie();
                    if (codigo) {
                        try {
                            const response = await http.get(`/produtos/${codigo}`, {
                                headers: {
                                    Authorization: `Bearer ${dataUser.token}`
                                }
                            });
                            setProduto(response.data)
                        } catch (error) {
                            console.log(error.response.data.message)
                        } finally {
                            setLoadingData(false)
                        }
                    }
                }
                fetchData()
            }, [codigo]
        )
        ;

        const handleInputChange = (e) => {
            setProduto({...produto, [e.target.name]: e.target.value})
        }

        const handlerCancelar = () => {
            router.push("/gestao-sgme/produtos")
        }

        const handleUpdateProduto = async () => {
            setLoadingUpdate(true)
            const dataUser = getUserFromCookie();
            try {
                await http.put(`/produtos/${codigo}`, produto, {
                    headers: {
                        Authorization: `Bearer ${dataUser.token}`
                    }
                })
                setResultErro(false);
                setStatus(true)
                openModal();

            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setResultErro(true)
                    setStatus(false)
                    setErroApi(error.response.data.message)
                }
            } finally {
                setLoadingUpdate(false)

            }
        }

        console.log(errorApi)

        return (
            <>
                <HeadSgme title="SGME - Editando Produto"/>
                <main className="container-sm d-flex align-items-center justify-content-start mt-5">

                    <form className="form-control-sm w-100 mobile-styles-form" style={{maxWidth: "50%"}}>
                        <h3 className="mb-4">Atualizando Produto</h3>

                        {loadingData ? (
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="d-sm-flex justify-content-between flex-row ">
                                    <div className="d-flex flex-column w-100 me-3">
                                        <label htmlFor="codigo">Codigo</label>
                                        <input type="text"
                                               value={produto.codigo}
                                               className="form-control"
                                               name="codigo"
                                               onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="d-flex flex-column w-100">
                                        <label htmlFor="nome">Nome</label>
                                        <input type="text"
                                               value={produto.nome}
                                               className="form-control"
                                               name="nome"
                                               onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="d-sm-flex justify-content-between flex-row ">
                                    <div className="d-flex flex-column w-100 me-3">
                                        <label htmlFor="custo">Custo</label>
                                        <input type="number"
                                               value={produto.custo}
                                               className="form-control"
                                               name="custo"
                                               onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="d-flex flex-column w-100">
                                        <label htmlFor="preco">Preço</label>
                                        <input type="number"
                                               value={produto.preco}
                                               className="form-control"
                                               name="preco"
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
                                                   checked={produto.status === "ATIVO"}
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
                                                   checked={produto.status === "INATIVO"}
                                                   onChange={handleInputChange}
                                                   className="me-3"
                                            />
                                            <label htmlFor="ATIVO">Inativo</label>
                                        </div>
                                    </div>
                                </div>

                                {errorApi !== "" ? (
                                    <p className="text-danger fw-bold mt-3">{errorApi}</p>
                                ) : ("")
                                }

                                <div className="d-flex mt-3">
                                    <button className="btn btn-success pe-3 ps-3 me-3" onClick={(e) => {
                                        e.preventDefault();
                                        const promise = handleUpdateProduto();
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
                                                    <p className="fw-bold text-success">Produto alterado com
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
        );
    }
;
export default UpdateProduto;