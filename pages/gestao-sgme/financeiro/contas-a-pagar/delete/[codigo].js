'use client';
import Head from "next/head";
import React, {useState} from "react";
import {useRouter} from "next/router";
import ModalComponent from "@/components/ModalComponent";
import {http} from "@/utils/http";
import {getUserFromCookie} from "@/utils/Cookies";
import HeadSgme from "@/components/head/HeadSgme";

const DeleteDespesa = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        router.push('/gestao-sgme/financeiro/contas-a-pagar')
    };

    const [status, setStatus] = useState([false])

    const router = useRouter();
    const {codigo} = router.query;

    const [despesaId, setDespesaId] = useState(codigo);

    const handleDeleteDespesa = () => {

        const fetchData = async () => {
            try {
                setLoading(true);
                const dataUser = getUserFromCookie();
                const response = await http.delete(`/despesas/${despesaId}`, {
                    headers: {
                        Authorization: `Bearer ${dataUser.token}`
                    }
                });
                setStatus(true);
            } catch (error) {
                console.error("Erro ao excluir despesa:" + error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    };


    const handlerCancelar = () => {
        router.push("/gestao-sgme/financeiro/contas-a-pagar");
    }


    return (
        <>
            <HeadSgme title="SGME - Excluindo contas a pagar" />

            <div className="container d-flex flex-column align-items-center justify-content-center">
                <div className="p-5 border border-danger mt-5">
                    <h1 className="text-center mb-3">Excluir despesa</h1>
                    <table style={{marginLeft: "20px"}}>
                        <tbody>
                        <tr>
                            <td>
                                <label>Deseja excluir a despesa?</label>
                            </td>
                            <td>
                                <input
                                    type="hidden"
                                    value={despesaId}
                                    onChange={(e) => setDespesaId(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <button className="btn btn-danger mt-2 me-2" onClick={(e) => {
                                    e.preventDefault()
                                    handleDeleteDespesa()
                                    openModal()
                                }}>Confirmar
                                </button>
                                <button className="btn btn-success mt-2" onClick={(e) => {
                                    e.preventDefault();
                                    handlerCancelar()
                                }}>Cancelar
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
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
                                    <p className="fw-bold text-success">Despesa excluida com sucesso</p>
                                </div>

                            ) : (
                                <p>Erro ao deletar</p>
                            )}
                        </>

                    )}
                </ModalComponent>

            </div>
        </>
    )
};

export default DeleteDespesa;