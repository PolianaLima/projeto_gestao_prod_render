'use client';
import React from "react";
import HeadSgme from "@/components/head/HeadSgme";
import {handleApiError} from "@/utils/errors/handleErroApi";
import {deleteDespesa} from "@/api/despesasApi";
import ModalInfo from "@/components/modal/ModalInfo";
import {useFormDeleteFinanceiro} from "@/utils/hooks/useFormDeleteFinanceiro";

const ROUTE_PATH = '/gestao-sgme/financeiro/contas-a-pagar'

const DeleteDespesa = () => {
    const {
        erroApiMessage,
        setErroApiMessage,
        statusErroApi,
        setStatusErroApi,
        loadingApi,
        setLoadingApi,
        statusVisibleModal,
        setStatusVisibleModal,
        toggleModal,
        router
    }=useFormDeleteFinanceiro(ROUTE_PATH)

    const {idDespesa} = router.query;

    const handleDeleteDespesa = async () => {
        setLoadingApi(true)
        try {
            await deleteDespesa(idDespesa);
            setStatusVisibleModal(true)
        } catch (error) {
            handleApiError(error, setErroApiMessage, setStatusErroApi)
        } finally {
            setLoadingApi(false)
        }
    }

    return (
        <>
            <HeadSgme title="SGME - Excluindo contas a pagar"/>
            <main className="container d-flex flex-column align-items-center justify-content-center" style={{minHeight:'90%'}}>
                <div className="p-5 border shadow  mt-5">
                    <h1 className="text-center mb-3">Excluir despesa</h1>
                    <p className="text-center">Deseja excluir despesa?</p>

                    {loadingApi && (
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>

                    )}

                    <div className="w-100 d-sm-flex justify-content-between">
                        <button className="btn btn-success"
                                onClick={(event) => {
                                    event.preventDefault()
                                    handleDeleteDespesa()
                                }}
                        >
                            CONFIRMAR
                        </button>
                        <button className="btn btn-danger"
                        onClick={(event) => {
                            event.preventDefault()
                            router.push(ROUTE_PATH)
                        }}
                        >
                            CANCELAR
                        </button>
                    </div>
                </div>

            </main>

            <ModalInfo
                toggleModal={toggleModal}
                statusVisibleModal={statusVisibleModal}
                message="Despesa excluida com sucesso"
            />
        </>
    )
};

export default DeleteDespesa;