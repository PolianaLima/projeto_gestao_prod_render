import React, {useEffect, useState} from 'react';
import HeadSgme from "@/components/head/HeadSgme";
import Link from "next/link";
import ModalInfo from "@/components/ModalInfo";
import {getUserFromCookie} from "@/utils/Cookies";
import {http} from "@/utils/http";
import Image from "next/image";

function Index(props) {

    const [produtos, setProdutos] = useState([]);
    const [selectedProduto, setSelectedProduto] = useState({});
    const [loadingData, setLoadingData] = useState(false);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = (produto) => {
        setSelectedProduto(produto)
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setSelectedProduto({})
        setModalIsOpen(false);
    }

    useEffect(() => {
        setLoadingData(true);

        const fetchData = async () => {
            const dataUser = getUserFromCookie();
            try {
                const response = await http.get(`/produtos`, {
                    headers: {
                        Authorization: `Bearer ${dataUser.token}`
                    }
                });

                setProdutos(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoadingData(false)
            }

        }
        fetchData()
    }, []);

    console.log(produtos)

    return (
        <>
            <HeadSgme title="SGME - Produtos"/>
            <main className="container">
                <div className="container d-sm-flex flex-row justify-content-between mb-3">
                    <h3>Produtos</h3>
                    <Link href="/gestao-sgme/produtos/cadastro" className="btn btn-success">Novo Produto</Link>
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
                                <th scope="col" style={{maxWidth: 100}}>Codigo</th>
                                <th scope="col" className="w-100">Descrição</th>
                                <th scope="col" className="w-100">Custo</th>
                                <th scope="col" className="w-100">Valor</th>
                                <th scope="col" className="w-100">Status</th>
                                <th scope="col" className="w-100">Editar</th>
                            </tr>
                            </thead>
                            <tbody>

                            {produtos && produtos.length > 0 ? (
                                    produtos.map(produto =>
                                        <tr key={produto.id}>

                                            <td>
                                                {produto.codigo}
                                            </td>
                                            <td>
                                                {produto.nome}
                                            </td>
                                            <td>
                                                {produto.custo.toLocaleString('pt-br', {
                                                    style: 'currency',
                                                    currency: 'BRL'
                                                })}
                                            </td>
                                            <td>
                                                {produto.preco.toLocaleString('pt-br', {
                                                    style: 'currency',
                                                    currency: 'BRL'
                                                })}
                                            </td>
                                            <td>
                                                {produto.status}
                                            </td>
                                            <td>

                                                <Link href={`/gestao-sgme/produtos/update/${produto.id}`}>
                                                    <Image src="/img/icon_editar.png"  width="0"
                                                           height="0"
                                                           sizes="100vw"
                                                           style={{ width: '60%', height: 'auto' }}
                                                           alt="Icone de Blog"
                                                           priority={true}
                                                    />
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                ) :
                                (
                                    <tr>
                                        <td colSpan="6">Nenhum Produto encontrado.</td>
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
                        <p>Nome: {selectedProduto.nome}</p>
                        <p>Cpf / CNPJ: {selectedProduto.cnpj}</p>
                    </div>

                </ModalInfo>

            </main>
        </>
    );
}

export default Index;