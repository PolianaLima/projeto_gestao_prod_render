import HeadSgme from "@/components/head/HeadSgme";
import FormFiltroDados from "@/components/financeiro/FormFiltroDados";
import DashComponentReceitas from "@/components/financeiro/DashComponentReceitas";
import DashComponentDespesas from "@/components/financeiro/DashComponentDespesas";
import React, {useEffect, useState} from "react";
import {getReceitas} from "@/api/receitasApi";
import {getDespesas} from "@/api/despesasApi";
import {handleApiError} from "@/utils/errors/handleErroApi";
import {useFormListFinanceiro} from "@/utils/hooks/useFormListFinanceiro";
import {filtroFinanceiroList} from "@/utils/fillters/filtroFinanceiroLis";
import {getCheckout} from "@/api/checkoutApi";
import {format, parseISO} from "date-fns";
import {ptBR} from "date-fns/locale";

function Index() {
    const [receitas, setReceitas] = useState([]);
    const [despesas, setDespesas] = useState([]);

    const [checkout, setCheckout] = useState([]); // [1
    /* const [totalDespesas, setTotalDespesas] = useState(0.00)
     const [totalReceitas, setTotalReceitas] = useState(0.00)*/

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


    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                let receitasData = await getReceitas();
                const receitasFiltradas = filtroFinanceiroList(receitasData, dataFiltro);
                setReceitas(receitasFiltradas);

                let despesasData = await getDespesas();
                const despesasFiltradas = filtroFinanceiroList(despesasData, dataFiltro);
                setDespesas(despesasFiltradas)

                const checkoutData = await getCheckout();
                setCheckout(checkoutData);

            } catch (error) {
                handleApiError(error, setStatusErroApi, setErroApiMessage);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    const totalReceitas = {
        total: receitas.reduce((acc, receita) => acc + receita.valor, 0),
        totalPix: receitas.reduce((acc, receita) => acc + (receita.forma_pagamento === "PIX" ? receita.valor : 0), 0),
        totalDinheiro: receitas.reduce((acc, receita) => acc + (receita.forma_pagamento === "DINHEIRO" ? receita.valor : 0), 0),
        totalCartao: receitas.reduce((acc, receita) => acc + (receita.forma_pagamento === "CARTAO" ? receita.valor : 0), 0),
        totalBoleto: receitas.reduce((acc, receita) => acc + (receita.forma_pagamento === "BOLETO" ? receita.valor : 0), 0),
        totalTransacoes: receitas.length
    };

    const totalDespesas = {
        total: despesas.reduce((acc, despesa) => acc + despesa.valor, 0),
        totalPix: despesas.reduce((acc, despesa) => acc + (despesa.forma_pagamento === "PIX" ? despesa.valor : 0), 0),
        totalDinheiro: despesas.reduce((acc, despesa) => acc + (despesa.forma_pagamento === "DINHEIRO" ? despesa.valor : 0), 0),
        totalCartao: despesas.reduce((acc, despesa) => acc + (despesa.forma_pagamento === "CARTAO" ? despesa.valor : 0), 0),
        totalBoleto: despesas.reduce((acc, despesa) => acc + (despesa.forma_pagamento === "BOLETO" ? despesa.valor : 0), 0),
        totalTransacoes: despesas.length
    }

    //Caso o checkout nao exista e porque o caixa ta fechado e solicitar abertuta do caixa
    // Listar todas as vendas colocando por tipo de pagamento
    // Criar o button de fechamento de caixa


    return (
        <div>
            <HeadSgme title="SGME - Fluxo caixa Diario"/>
            <main className="m-2 mt-5">
                <h1>Controle de caixa</h1>
                <p className="fw-bolder">
                    <i className="fw-bolder bi  bi-calendar-date"> </i>
                    Periodo: <span>{format(parseISO(checkout.data_created), 'dd/MM/yyyy', {locale: ptBR})} </span>
                    : até agora</p>
                <p className="fw-bolder"> <i className="fw-bolder bi bi-cash"> </i>
                    Abertura de caixa {checkout.valor_inicial.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})} </p>


                <div className="d-sm-flex justify-content-between ">
                    <DashComponentReceitas receitas={totalReceitas}/>
                    {/*  <DashComponentDespesas despesas={totalDespesas}/>*/}
                </div>

                <hr/>
                <h3>Resumo do caixa</h3>
                <div>
                    <p className="text-success fw-bold">Entradas
                        : {totalReceitas.total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</p>
                    <p className="text-danger fw-bold">Saidas
                        : {totalDespesas.total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</p>
                    <p className="fw-bold">Saldo
                        : {(totalReceitas.total - totalDespesas.total).toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL'
                        })}</p>
                </div>


            </main>
        </div>
    )
}

export default Index;