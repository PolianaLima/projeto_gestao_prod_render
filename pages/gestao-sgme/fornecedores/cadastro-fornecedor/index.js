import React from 'react';
import HeadSgme from "@/components/head/HeadSgme";
import {useFormModal} from "@/utils/hooks/useFormModalNewCadastro";
import Image from "next/image";
import ModalInfo from "@/components/modal/ModalInfo";
import ModalCancelar from "@/components/modal/ModalCancelar";
import {postFornecedores} from "@/api/fornecedoresApi";
import {handleApiError} from "@/utils/errors/handleErroApi";
import GroupButtonCadastro from "@/components/buttons_group/GroupButtonCadastro";

const ROUTE_PATH = `/gestao-sgme/fornecedores`;

function Index() {
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

    const onSubmit = async (data) => {
        setLoadingApi(true);
        try {
            await postFornecedores(data);
            setStatusVisibleModal(true);
        }catch (error) {
            handleApiError(error, setErroApiMessage, setStatusErroApi)
        }finally {
            setLoadingApi(false);
        }
    }

    return (
        <>
            <HeadSgme title="SGME - Index de Fornecedores"/>

            <main className="m-5 border border-1 border-secondary-subtle mt-3">
                <h3 className="bg-secondary-subtle p-2">
                    <i className="h3 bi bi-person-add"> </i>
                    Cadasto de Fornecedores
                </h3>
                <div className="d-sm-flex justify-content-between w-100">
                    <form className="p-2 mt-3 w-100">
                        <div className="d-flex mb-3">
                            <label className="fw-bolder me-5 w-25" htmlFor="documento">CPF/CNPJ</label>
                            <input type="text"
                                   className="border border-1 border-secondary-subtle w-100 p-1"
                                   placeholder="CPF / CNPJ"
                                   {...register('documento')}/>
                        </div>

                        <div className="d-flex mb-3">
                            <label className="fw-bolder me-5 w-25" htmlFor="nome">Nome/Razao Social</label>
                            <input type="text"
                                   className="border border-1 border-secondary-subtle w-100 p-1"
                                   placeholder="Nome / Razão Social"
                                   {...register('nome', {required: true})}/>
                        </div>

                        {errors?.nome && (
                            <p className="text-danger fw-bolder mt-3">Nome é obrigatorio!</p>
                        )}

                        {statusErroApi && (
                            <p className="p-2 text-danger fw-bolder">
                                <i className="bi bi-exclamation-triangle"> </i>
                                {erroApiMessage}
                            </p>

                        )}

                        <GroupButtonCadastro
                            onSubmit={onSubmit}
                            setStatusVisibleModalCancelar={setStatusVisibleModalCancelar}
                            handleSubmit={handleSubmit}
                        />

                        {loadingApi && (
                            <p className="p-2 text-success fw-bolder">
                                <i className="bi bi-info-circle"> </i>
                                Salvando Fornecedor, aguarde...
                            </p>
                        )}
                    </form>

                    <div className="w-100 d-flex justify-content-center">
                        <Image src="/assets/img/icone_cad_fornecedor.png"
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

export default Index;