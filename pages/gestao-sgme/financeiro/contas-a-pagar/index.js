import React, {useEffect, useState} from 'react';
import HeadSgme from "@/components/head/HeadSgme";
import {handleApiError} from "@/utils/errors/handleErroApi";
import {getDespesas} from "@/api/despesasApi";
import MessageLoadingData from "@/components/message/messageLoadingData";
import FinanceiroIndexLayout from "@/components/layouts/FinanceiroIndexLayout";
import {useFormListFinanceiro} from "@/utils/hooks/useFormListFinanceiro";
import {filtroFinanceiroList} from "@/utils/fillters/filtroFinanceiroLis";

const PATH_URL = '/gestao-sgme/financeiro/contas-a-pagar'

function Index(props) {

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
    } = useFormListFinanceiro()


    const [totalDespesas, setTotalDespesas] = useState(0.00)
    const [despesas, setDespesas] = useState([])
    const [idDespesaExcluir, setIdDespesaExcluir] = useState(null);

    const fetchData = async () => {
        try {
            let data = await getDespesas();
            const dataFiltrado = filtroFinanceiroList(data, dataFiltro);
            setDespesas(dataFiltrado)
            const total = data.reduce((sum, despesa) => sum + despesa.valor, 0);
            setTotalDespesas(total);
        } catch (error) {
            handleApiError(error, setErroApiMessage, setStatusErroApi)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [dataFiltro])


    const excluir = async (id) => {
        console.log('Excluir despesa', id)
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
                        titleButtonAdd="Nova despesa"
                        handleSubmit={handleSubmit}
                        register={register}
                        dados={despesas}
                        setdataFiltro={setdataFiltro}
                        valorTotal={totalDespesas}
                        statusErroApi={statusErroApi}
                        erroApiMessage={erroApiMessage}
                        urlDetalhes={`${PATH_URL}/update`}
                        urlExcluir={`${PATH_URL}/delete`}
                    />
                </main>

            )}


        </>

    );
}

export default Index;