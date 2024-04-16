import React, {useState} from "react";
import {useRouter} from "next/router";
import Head from "next/head";
import {http} from "@/utils/http";
import ModalComponent from "@/components/ModalComponent";
import {getUserFromCookie} from "@/utils/Cookies";
import HeadSgme from "@/components/head/HeadSgme";

const DeleteReceitas = () => {


    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        router.push('/gestao-sgme/financeiro/contas-a-receber')
    };

    const [status, setStatus] = useState([false])

    const router = useRouter();
    const {codigo} = router.query;

    const [receitaId, setReceitaId] = useState(codigo);

    const handleDeleteReceita = () => {

        const fetchData = async () => {
            try {
                setLoading(true);
                const dataUser = getUserFromCookie();
                const response = await http.delete(`/receitas/${receitaId}`, {
                    headers: {
                        Authorization: `Bearer ${dataUser.token}`
                    }
                });
                setStatus(true);
            } catch (error) {
                console.log("Erro ao excluir receita:" + error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    };

    const handlerCancelar = () => {
        router.push('/gestao-sgme/financeiro/contas-a-receber');
    }
    return (
        <>
            <HeadSgme title="Exlcuindo conta a receber" />
            <div className="container d-flex flex-column align-items-center justify-content-center">
                <div className="p-5 border border-danger mt-5">
                    <h1 className="text-center mb-3">Excluir receita</h1>
                    <table style={{marginLeft: "20px"}}>
                        <tbody>
                        <tr>
                            <td>
                                <label>Deseja excluir a despesa?</label>
                            </td>
                            <td>
                                <input
                                    type="hidden"
                                    value={receitaId}
                                    onChange={(e) => setReceitaId(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <button className="btn btn-danger mt-2 me-2" onClick={(e) => {
                                    e.preventDefault();
                                    handleDeleteReceita();
                                    openModal();
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
                                    <p className="fw-bold text-success">Conta excluida com sucesso</p>
                                </div>

                            ) : (
                                <p>Erro ao deletar</p>
                            )}
                        </>
                    )}
                </ModalComponent>
            </div>
        </>
    );
};

export default DeleteReceitas;