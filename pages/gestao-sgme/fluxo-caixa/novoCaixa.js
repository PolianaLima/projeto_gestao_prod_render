import React from 'react';
import HeadSgme from "@/components/head/HeadSgme";
import ModalInfo from "@/components/modal/ModalInfo";
import {useFormListFinanceiro} from "@/utils/hooks/useFormListFinanceiro";
import {abrirNovoCheckout} from "@/api/checkoutApi";
import {handleApiError} from "@/utils/errors/handleErroApi";
import MessageLoadingData from "@/components/message/messageLoadingData";
import {toggleModalController} from "@/utils/controller/modal";

const ROUTE_PATH = '/gestao-sgme/pdv';

function NovoCaixa() {
    const {
        register,
        handleSubmit,
        statusVisibleModal,
        setStatusVisibleModal,
        statusErroApi,
        setStatusErroApi,
        erroApiMessage,
        setErroApiMessage,
        loadingApi,
        setLoadingApi,
        router
    } = useFormListFinanceiro()


    const onSubmit = async (data) => {
        setLoadingApi(true)
        try {
            await abrirNovoCheckout(data);
            setStatusVisibleModal(true)
        } catch (error) {
           handleApiError(error, setErroApiMessage, setStatusErroApi)
        }finally {
            setLoadingApi(false)
        }
    }

    const toggleModal = () => {
        toggleModalController(setStatusVisibleModal, router, ROUTE_PATH)
    }

    return (
        <>
            <HeadSgme title="SGME _ Novo Caixa"/>
            <main className="mt-3 d-flex justify-content-center align-items-center h-100">
                <div className="d-flex flex-column justify-content-center align-items-center shadow border p-5">
                    <h2>Abertura de caixa</h2>
                    <form className="d-sm-flex flex-column justify-content-center align-items-center mb-3">
                        <label htmlFor="valor_inicial" className="mb-3">Valor de abertura</label>
                        <input type="number" className="form-controll-sgme" placeholder="Digite um valor inicial"
                               {...register("valor_inicial")} />
                        <button type="submit" className="btn btn-success mt-3 w-100" onClick={event => {
                            event.preventDefault()
                            handleSubmit(onSubmit)()
                        }}>Abrir Caixa
                        </button>
                    </form>

                    {loadingApi &&(
                        <MessageLoadingData message="Salvando dados no sistema" />
                    )}
                </div>

                <ModalInfo toggleModal={toggleModal} statusVisibleModal={statusVisibleModal} message="Caixa aberto com sucesso!!"  />
            </main>
        </>
    );
}

export default NovoCaixa;
