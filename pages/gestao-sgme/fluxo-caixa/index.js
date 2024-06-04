import HeadSgme from "@/components/head/HeadSgme";
import React, {useEffect, useState} from "react";
import {getReceitas} from "@/api/receitasApi";
import {getDespesas} from "@/api/despesasApi";
import {handleApiError} from "@/utils/errors/handleErroApi";
import {useFormListFinanceiro} from "@/utils/hooks/useFormListFinanceiro";
import {filtroFinanceiroList} from "@/utils/fillters/filtroFinanceiroLis";
import {getCheckout} from "@/api/checkoutApi";
import {format, parseISO} from "date-fns";
import {ptBR} from "date-fns/locale";
import MessageLoadingData from "@/components/message/messageLoadingData";
import {getVendasCheckout} from "@/api/vendasApi";
import DashboadDadosFechamentoCaixa from "@/components/financeiro/DashboardDadosFechamentoCaixa";

function Index() {
    const [receitas, setReceitas] = useState([]);
    const [despesas, setDespesas] = useState([]);

    const [checkout, setCheckout] = useState([]);
    const [vendas, setVendas] = useState([]);
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

                let vendasData = await getVendasCheckout(checkoutData.id);
                const vendasFilradas = vendasData.filter(venda => venda.status === "FINALIZADA");
                setVendas(vendasFilradas);


            } catch (error) {
                handleApiError(error, setStatusErroApi, setErroApiMessage);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    const totalVendas = {
        total: vendas.reduce((acc, venda) => acc + venda.valor_total, 0),
        totalPix: vendas.reduce((acc, venda) => acc + (venda.forma_pagamento === "PIX" ? venda.valor_total : 0), 0),
        totalDinheiro: vendas.reduce((acc, venda) => acc + (venda.forma_pagamento === "DINHEIRO" ? venda.valor_total : 0), 0),
        totalCartao: vendas.reduce((acc, venda) => acc + (venda.forma_pagamento === "CARTAO" ? venda.valor_total : 0), 0),
        totalBoleto: vendas.reduce((acc, venda) => acc + (venda.forma_pagamento === "BOLETO" ? venda.valor_total : 0), 0),
        totalTransacoes: vendas.length
    };

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

    console.log("vendas", totalVendas);
    console.log("vendas", vendas);


    return (
        <div>
            <HeadSgme title="SGME - Fluxo caixa Diario"/>

            {loading ? (
                <MessageLoadingData message="Carregando dados "/>
            ) : (
                <main className="m-2 mt-5 d-flex justify-content-between">
                    <div className="w-100">
                        <h1>Controle de caixa</h1>
                        <p className="fw-bolder">
                            <i className="fw-bolder bi  bi-calendar-date"> </i>
                            Periodo: <span>{format(parseISO(checkout.data_created), 'dd/MM/yyyy', {locale: ptBR})} </span>
                            : até agora</p>
                        <p className="fw-bolder"><i className="fw-bolder bi bi-cash"> </i>
                            Abertura de
                            caixa {checkout.valor_inicial.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}
                        </p>


                        <div className="d-sm-flex justify-content-between ">
                            <div className="d-flex border shadow p-3 w-100">
                                <DashboadDadosFechamentoCaixa dados={totalVendas} title="Vendas"/>
                            </div>

                        </div>

                        <hr/>
                        <h4>Resumo do caixa (Dinheiro)</h4>
                        <div>
                            <p className="fw-bold d-flex justify-content-between">Valor Total de vendas
                                :<span>{totalVendas.totalDinheiro.toLocaleString('pt-br', {
                                    style: 'currency',
                                    currency: 'BRL'
                                })}</span></p>
                            <p className="fw-bold d-flex justify-content-between">Abertura de caixa
                                : <span>{checkout.valor_inicial.toLocaleString('pt-br', {
                                    style: 'currency',
                                    currency: 'BRL'
                                })}</span></p>
                            <p className="fw-bold bg-paleta_Azul d-flex justify-content-between p-2 text-white">Saldo Final do Caixa ( Dinheiro)
                                :<span className="fw-bolder text-white">{(totalVendas.totalDinheiro + checkout.valor_inicial).toLocaleString('pt-br', {
                                    style: 'currency',
                                    currency: 'BRL'
                                })}</span> </p>
                        </div>

                        <button className="btn btn-success">FINALIZAR CAIXA</button>
                    </div>
                    <div className="w-100">

                    </div>

                </main>
            )}

        </div>
    )
}

export default Index;