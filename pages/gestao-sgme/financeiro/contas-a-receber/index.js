'use client';

import React, {useEffect, useState} from 'react';
import HeadSgme from "@/components/head/HeadSgme";
import {handleApiError} from "@/utils/errors/handleErroApi";
import {deleteReceita, getReceitas} from "@/api/receitasApi";
import MessageLoadingData from "@/components/message/messageLoadingData";
import FinanceiroIndexLayout from "@/components/layouts/FinanceiroIndexLayout";
import {useFormListFinanceiro} from "@/utils/hooks/useFormListFinanceiro";
import {filtroFinanceiroList} from "@/utils/fillters/filtroFinanceiroLis";

const PATH_URL = '/gestao-sgme/financeiro/contas-a-receber';

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
        id,
        setId,
        loadingApi,
        setLoadingApi,
        setStatusVisibleModal,
        statusVisibleModal
    } = useFormListFinanceiro();

    const [totalReceitas, setTotalReceitas] = useState(0.00)
    const [receitas, setReceitas] = useState([])

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = await getReceitas();
                const dataFiltrado = filtroFinanceiroList(data, dataFiltro);
                setReceitas(dataFiltrado);

                const total = dataFiltrado.reduce((sum, despesa) => sum + despesa.valor, 0);
                setTotalReceitas(total);

            } catch (error) {
                handleApiError(error, setErroApiMessage, setStatusErroApi)
            } finally {
                setLoading(false)
            }
        };
        
        fetchData();
    }, [dataFiltro, setErroApiMessage, setLoading, setStatusErroApi]);

    const excluirReceita = async (id) => {
        setLoadingApi(true)
        try {
            const response = await deleteReceita(id)
            fetchData()
            setStatusVisibleModal(false)

        }catch (error) {
            handleApiError(error, setErroApiMessage, setStatusErroApi)
        }finally {
            setLoadingApi(false)
        }
    }

    return (
        <>
            <HeadSgme title="SGME - Contas a receber"/>
            {loading ? (
                <MessageLoadingData message="Carregando dados"/>
            ) : (
                <main className="m-2 mt-5">
                    <FinanceiroIndexLayout
                        title="Contas a receber"
                        descNomeConta="Cliente"
                        titleButtonAdd="Nova receita"
                        handleSubmit={handleSubmit}
                        register={register}
                        dados={receitas}
                        setdataFiltro={setdataFiltro}
                        valorTotal={totalReceitas}
                        statusErroApi={statusErroApi}
                        erroApiMessage={erroApiMessage}
                        urlDetalhes={`${PATH_URL}/update`}
                        urlNewCadastro={`${PATH_URL}/nova-receita`}
                        id={id}
                        setId={setId}
                        setStatusVisibleModal={setStatusVisibleModal}
                        statusVisibleModal={statusVisibleModal}
                        excluir={excluirReceita}
                        loadingApi={loadingApi}

                    />
                </main>
            )}
        </>
    );
}

export default Index;
