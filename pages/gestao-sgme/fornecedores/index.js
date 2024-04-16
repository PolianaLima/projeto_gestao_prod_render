import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {http} from "@/utils/http";
import Head from "next/head";
import {getUserFromCookie} from "@/utils/Cookies";
import axios from "axios";
import ModalInfo from "@/components/ModalInfo";
import HeadSgme from "@/components/head/HeadSgme";

function Index(props) {


    const [fornecedores, setFornecedores] = useState([]);
    const [selectedFornecedor, setSelectedFornecedor] = useState({});
    const [loadingData, setLoadingData] = useState(false);


    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = (cliente) => {
        setSelectedFornecedor(cliente)
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedFornecedor({})
        setModalIsOpen(false);
    };

    useEffect(() => {
        setLoadingData(true)

        const fetchData = async () => {
            const dataUser = getUserFromCookie();

            try {
                const response = await http.get(`/fornecedores?idUsuario=${dataUser.usuario.id}`, {
                    headers: {
                        Authorization: `Bearer ${dataUser.token}`
                    }
                });
                setFornecedores(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoadingData(false)
            }
        }
        fetchData()
    }, []);


    return (
        <>
            <HeadSgme title="SGME - Fornecedores" />

            <main className="container">
                <div className="container d-sm-flex flex-row justify-content-between mb-3">
                    <h3>Fornecedores</h3>
                    <Link href="/gestao-sgme/fornecedores/cadastro" className="btn btn-success">Novo Fornecedor</Link>
                </div>
                <table className="table">
                    {loadingData ? (
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border text-warning" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <thead>
                            <tr className="border border-2 border-warning">
                                <th scope="col" className="w-100">Razao Social / Nome</th>
                                <th scope="col" className="d-flex justify-content-end">Ações</th>
                            </tr>
                            </thead>
                            <tbody>

                            {fornecedores && fornecedores.length > 0 ? (
                                    fornecedores.map(fornecedor =>
                                        <tr key={fornecedor.id}>

                                            <td>
                                                {fornecedor.nome}
                                            </td>
                                            <td className="d-flex  justify-content-start ">
                                                <img width="30" height="30" className="me-3 pointer-cursor"
                                                     src="https://img.icons8.com/3d-fluency/94/info.png"
                                                     alt="info"
                                                     onClick={() => openModal(fornecedor)}/>
                                                <Link href={`/gestao-sgme/fornecedores/update/${fornecedor.id}`}
                                                      className="btn btn-success me-2">EDITAR</Link>
                                            </td>
                                        </tr>
                                    )
                                ) :
                                (
                                    <tr>
                                        <td colSpan="6">Nenhum cliente encontrado.</td>
                                    </tr>
                                )}
                            </tbody>
                        </>
                    )}
                </table>

                <ModalInfo
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                >
                    <div className="w-100 h-100 p-3">
                        <p className="fw-bold"> Informações</p>
                        <p>Nome: {selectedFornecedor.nome}</p>
                        <p>Cpf / CNPJ: {selectedFornecedor.cnpj}</p>
                    </div>

                </ModalInfo>

            </main>
        </>

    );
}

export default Index;