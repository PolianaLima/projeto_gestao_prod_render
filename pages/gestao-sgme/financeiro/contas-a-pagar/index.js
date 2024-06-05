'use client';

import React, {useEffect, useState} from 'react';
import HeadSgme from "@/components/head/HeadSgme";
import {handleApiError} from "@/utils/errors/handleErroApi";
import {deleteDespesa, getDespesas} from "@/api/despesasApi";
import MessageLoadingData from "@/components/message/messageLoadingData";
import FinanceiroIndexLayout from "@/components/layouts/FinanceiroIndexLayout";
import {useFormListFinanceiro} from "@/utils/hooks/useFormListFinanceiro";
import {filtroFinanceiroList} from "@/utils/fillters/filtroFinanceiroLis";

const PATH_URL = '/gestao-sgme/financeiro/contas-a-pagar'

function Index() {

    const {
        register,
        handleSubmit,
        erroApiMessage,
        setErroApiMessage,
        statusErroApi,
        dataFiltro,
        setdataFiltro,
        loading,
        setLoading,
        setStatusErroApi,
        statusVisibleModal,
        setStatusVisibleModal,
        id,
        setId,
        loadingApi,
        setLoadingApi

    } = useFormListFinanceiro()

    const [totalDespesas, setTotalDespesas] = useState(0.00)
    const [despesas, setDespesas] = useState([])



    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = await getDespesas();
                const dataFiltrado = filtroFinanceiroList(data, dataFiltro);
                setDespesas(dataFiltrado)
                const total = dataFiltrado.reduce((sum, despesa) => sum + despesa.valor, 0);
                setTotalDespesas(total);
            } catch (error) {
                handleApiError(error, setErroApiMessage, setStatusErroApi)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [dataFiltro, setErroApiMessage, setLoading, setStatusErroApi])

    const excluirDespesa = async (id) => {
        setLoadingApi(true)
        try {
            const response = await deleteDespesa(id)
            fetchData()
            setStatusVisibleModal(false)
        } catch (error) {
            handleApiError(error, erroApiMessage, statusErroApi)
        } finally {
            setLoadingApi(false)
        }
    }
    return (
        <>
            <HeadSgme title="SGME - Contas a pagar"/>
            {loading ? (
                <MessageLoadingData message="Carregando os dados"/>
            ) : (
                <main className="m-2 mt-5">

                    <FinanceiroIndexLayout
                        title="Contas a pagar"
                        descNomeConta="Fornecedor"
                        titleButtonAdd="Nova despesa"
                        handleSubmit={handleSubmit}
                        register={register}
                        dados={despesas}
                        setdataFiltro={setdataFiltro}
                        valorTotal={totalDespesas}
                        statusErroApi={statusErroApi}
                        erroApiMessage={erroApiMessage}
                        urlDetalhes={`${PATH_URL}/update`}
                        urlNewCadastro={`${PATH_URL}/nova-despesa`}
                        id={id}
                        setId={setId}
                        excluir={excluirDespesa}
                        loadingApi={loadingApi}
                        statusVisibleModal={statusVisibleModal}
                        setStatusVisibleModal={setStatusVisibleModal}
                    />
                </main>

            )}


        </>

    );
}

export default Index;