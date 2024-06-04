'use client';
import HeadSgme from "@/components/head/HeadSgme";
import React, {useEffect, useState} from "react";
import {useFormModalNewUpdate} from "@/utils/hooks/useFormNewUpdate";
import {getProdutoId, putProduto} from "@/api/produtosApi";
import {handleApiError} from "@/utils/errors/handleErroApi";
import MessageLoadingData from "@/components/message/messageLoadingData";
import {useRouter} from "next/router";
import Image from "next/image";
import ModalInfo from "@/components/modal/ModalInfo";
import ModalCancelar from "@/components/modal/ModalCancelar";
import GroupButtonFormUpdate from "@/components/buttons_group/GroupButtonFormUpdate";

const ROUTE_PATH = `/gestao-sgme/produtos`;

const UpdateProduto = () => {
        const router = useRouter();
        const {idProduto} = router.query;

        console.log(idProduto)

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


        const [produto, setProduto] = useState({});

       

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const data = await getProdutoId(idProduto);
                    setProduto(data);
                } catch (error) {
                    handleApiError(error, setErroApiMessage, setStatusErroApi);
                } finally {
                    setLoadingData(false);
                }
            }
            fetchData();
        }, [idProduto, setErroApiMessage, setLoadingData, setStatusErroApi]);


        const handleInputChange = (e) => {
            setProduto({...produto, [e.target.name]: e.target.value});
        }

        const onsubmit = async () => {
            setLoadingApi(true);
            try{
                await putProduto(idProduto, produto);
                setStatusVisibleModal(true);
            }catch (error) {
                handleApiError(error, setErroApiMessage, setStatusErroApi)
            }finally {
                setLoadingApi(false);
            }
        }

        return (
            <>
                <HeadSgme title="SGME - Editando Produto"/>

                {loadingData ? (
                    <MessageLoadingData message="Carregando dados do produto"/>
                ) : (
                    <main className="m-5 border border-1 border-secondary-subtle mt-3">
                        <h3 className="bg-secondary-subtle p-2">
                            <i className="h3 bi bi-box"> </i>
                            Alterar Produto
                        </h3>
                        <div className="d-sm-flex justify-content-between w-100">
                            <form className="p-3 mt-3 w-100">
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

                                {statusErroApi && (
                                    <p className="p-2 text-danger fw-bolder">
                                        <i className="bi bi-exclamation-triangle"> </i>
                                        {erroApiMessage}
                                    </p>

                                )}

                                <GroupButtonFormUpdate
                                    statusButtonEditar={statusButtonEditar}
                                    onSubmit={onsubmit}
                                    statusButtonSalvar={statusButtonSalvar}
                                    setStatusInputDisabled={setStatusInputDisabled}
                                    setStatusButtonSalvar={setStatusButtonSalvar}
                                    cancelar={cancelar}
                                    setStatusButtonEditar={setStatusButtonEditar}
                                />

                                {loadingApi && (
                                    <p className="p-2 text-success fw-bolder">
                                        <i className="bi bi-info-circle"> </i>
                                        Salvando Produto, aguarde...
                                    </p>
                                )}
                            </form>

                            <div className="w-100 d-flex justify-content-center">
                                <Image src="/assets/img/icone_cad_produto.svg"
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
                                   message="Produto Alterado com sucesso"/>

                        <ModalCancelar message="Deseja descartar as alterações?"
                                       toggleModal={toggleModalCancelar}
                                       statusVisibleModalCancelar={statusVisibleModalCancelar}
                                       setStatusVisibleModalCancelar={setStatusVisibleModalCancelar}
                        />

                    </main>
                )}
            </>
        );
    }
;
export default UpdateProduto;