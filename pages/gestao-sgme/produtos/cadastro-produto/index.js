import React from 'react';
import HeadSgme from "@/components/head/HeadSgme";
import Image from "next/image";
import ModalInfo from "@/components/modal/ModalInfo";
import ModalCancelar from "@/components/modal/ModalCancelar";
import {postProduto} from "@/api/produtosApi";
import {handleApiError} from "@/utils/errors/handleErroApi";
import {useFormModal} from "@/utils/hooks/useFormModalNewCadastro";
import GroupButtonCadastro from "@/components/buttons_group/GroupButtonCadastro";
import MessageLoadingData from "@/components/message/messageLoadingData";
import MessageErroApi from "@/components/message/messageErroApi";

const ROUTE_PATH = `/gestao-sgme/produtos`;

function Index(props) {
    const {
        register,
        handleSubmit,
        errors,
        loadingApi,
        setLoadingApi,
        statusErroApi,
        setStatusErroApi,
        erroApiMessage,
        setErroApiMessage,
        statusVisibleModal,
        setStatusVisibleModal,
        statusVisibleModalCancelar,
        setStatusVisibleModalCancelar,
        toggleModalCancelar,
        toggleModal
    } = useFormModal(ROUTE_PATH);

    const onsubmit = async (data) => {
        setLoadingApi(true)
        try {
            await postProduto(data);
            setStatusVisibleModal(true)
        } catch (error) {
            handleApiError(error, setErroApiMessage, setStatusErroApi)
        }finally {
            setLoadingApi(false)
        }
    }

    return (
        <>
            <HeadSgme title="SGME - Index de produtos"/>
            <main className="m-5 border border-1 border-secondary-subtle mt-3">
                <h3 className="bg-secondary-subtle p-2">
                    <i className="h3 bi bi-box"> </i>
                    Index de produtos
                </h3>
                <div className="d-sm-flex justify-content-between w-100">
                    <form className="p-2 mt-3 w-100">
                        <div className="d-sm-flex justify-content-between flex-row ">
                            <div className="w-100 me-3">
                                <label htmlFor="codigo">Codigo</label>
                                <input type="text"
                                       placeholder="Digite  o codigo do produto"
                                       className="form-control" {...register('codigo')}/>
                            </div>
                            <div className="w-100">
                                <label htmlFor="nome">Nome</label>
                                <input type="text"
                                       placeholder="Digite o nome do produto"
                                       className="form-control"{...register('nome', {required: "Nome do produto obrigatório"})}/>
                                {errors.nome && (
                                    <p className="text-danger fw-bolder">{errors.nome.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="d-sm-flex justify-content-between flex-row ">
                            <div className="w-100 me-3">
                                <label htmlFor="codigo">Custo</label>
                                <input type="number"
                                       placeholder="Digite  o custo do produto"
                                       className="form-control" {...register('custo', {required:true})}/>
                                {errors.custo && (
                                    <p className="text-danger fw-bolder">Custo do produto obrigatório</p>
                                )}
                            </div>
                            <div className="w-100 mb-3">
                                <label htmlFor="nome">Preco</label>
                                <input type="number"
                                       placeholder="Digite o preço do produto"
                                       className="form-control" {...register('preco', {required:true})}/>
                                {errors.preco && (
                                    <p className="text-danger fw-bolder">Preço do produto obrigatório</p>
                                )}
                            </div>
                        </div>


                        {statusErroApi && (
                            <MessageErroApi erroApiMessage={erroApiMessage} />
                        )}

                        <GroupButtonCadastro
                            onSubmit={onsubmit}
                            setStatusVisibleModalCancelar={setStatusVisibleModalCancelar}
                            handleSubmit={handleSubmit}
                        />

                        {loadingApi && (
                            <MessageLoadingData message="Salvando produto no sistema"/>
                        )}

                    </form>

                    <div className="w-100 d-flex justify-content-center">
                        <Image src="/assets/img/icone_cad_produto.svg"
                               alt="Index de Cliente"
                               width="0"
                               height="0"
                               priority={true}
                               sizes="100vw"
                               style={{width: "60%", height: "auto"}}/>
                    </div>

                </div>

                <ModalInfo statusVisibleModal={statusVisibleModal}
                           toggleModal={toggleModal}
                           message="Produto salvo com sucesso"/>

                <ModalCancelar toggleModal={toggleModalCancelar}
                               setStatusVisibleModalCancelar={setStatusVisibleModalCancelar}
                               statusVisibleModalCancelar={statusVisibleModalCancelar}
                               message="Deseja descartar as alterações?"
                />

            </main>
        </>
    );
}

export default Index;