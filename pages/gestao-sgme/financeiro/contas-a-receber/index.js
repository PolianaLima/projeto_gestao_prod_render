import React, {useEffect, useState} from 'react';
import HeadSgme from "@/components/head/HeadSgme";
import {handleApiError} from "@/utils/errors/handleErroApi";
import {getReceitas} from "@/api/receitasApi";
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
        setStatusErroApi
    } = useFormListFinanceiro();

    const [totalReceitas, setTotalReceitas] = useState(0.00)
    const [receitas, setReceitas] = useState([])

    const fetchData = async () => {
        try {
            let data = await getReceitas();
            const dataFiltrado = filtroFinanceiroList(data, dataFiltro);
            setReceitas(dataFiltrado);

            const total = data.reduce((sum, despesa) => sum + despesa.valor, 0);
            setTotalReceitas(total);

        } catch (error) {
            handleApiError(error, setErroApiMessage, setStatusErroApi)
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchData();
    }, [dataFiltro]);

    return (
        <>
            <HeadSgme title="SGME - Contas a receber"/>
            {loading ? (
                <MessageLoadingData message="Carregando dados"/>
            ) : (
                <main className="m-2 mt-5">
                    <FinanceiroIndexLayout
                        title="Contas a receber"
                        titleButtonAdd="Nova receita"
                        handleSubmit={handleSubmit}
                        register={register}
                        dados={receitas}
                        setdataFiltro={setdataFiltro}
                        valorTotal={totalReceitas}
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
