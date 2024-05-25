import HeadSgme from "@/components/head/HeadSgme";
import {useForm} from "react-hook-form";
import FormFiltroDados from "@/components/componentes_financeiro/FormFiltroDados";
import DashComponentReceitas from "@/components/componentes_financeiro/DashComponentReceitas";
import DashComponentDespesas from "@/components/componentes_financeiro/DashComponentDespesas";
import {getReceitasData} from "@/utils/getReceitas";
import {useEffect, useState} from "react";
import {getDespesasData} from "@/utils/getDespesas";
import {formatISO} from "date-fns";

function Index() {
    const [receitas, setReceitas] = useState([]);
    const [despesas, setDespesas] = useState([]);
    const [loadingData, setLoadingData] = useState(false);


    const [dataFiltro, setdataFiltro] = useState({
        dataInicial: formatISO(new Date(), {representation: 'date'}),
        dataFinal: formatISO(new Date(), {representation: 'date'}),
        status: ""
    });

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();


    useEffect(() => {
        const getData = async () => {
            setLoadingData(true);
            try {
                const receitasData = await getReceitasData();
                setReceitas(receitasData);

                const despesasData = await getDespesasData();
                setDespesas(despesasData)
            } catch (error) {
                console.error("Erro ao buscar dados", error);
            } finally {
                setLoadingData(false);
            }
        };

        getData();
    }, []);


    const filtrarDados = async (data) => {
        setdataFiltro(data);
    };

    console.log(dataFiltro)

    const receitasFiltradas = receitas.filter(receita => {
        const {dataInicial, dataFinal, status} = dataFiltro;
        if (!dataInicial && !dataFinal && !status) return false;

        // Converta as datas para o formato ISO antes de compará-las
        const dataCriacaoReceita = new Date(receita.data_created).toISOString().slice(0,10);
        const dataInicialFiltro = new Date(dataInicial).toISOString().slice(0,10);
        const dataFinalFiltro = new Date(dataFinal).toISOString().slice(0,10);


        // Lógica de filtro para dataInicial
        if (dataInicial && dataCriacaoReceita < dataInicialFiltro) {
            return false;
        }

        // Lógica de filtro para dataFinal
        if (dataFinal && dataCriacaoReceita > dataFinalFiltro) {
            return false;
        }

        // Lógica de filtro para status
        if (status && receita.status !== status) {
            return false;
        }

        return true; // Retorna true se a receita passar por todos os filtros
    });


    const despesasFiltradas = despesas.filter(despesa => {

        const {dataInicial, dataFinal, status} = dataFiltro;
        if (!dataInicial && !dataFinal && !status) return false;

        // Converta as datas para o formato ISO antes de compará-las
        const dataCriacaoDespesa = new Date(despesa.data_created).toISOString().slice(0,10);
        const dataInicialFiltro = new Date(dataInicial).toISOString().slice(0,10);
        const dataFinalFiltro = new Date(dataFinal).toISOString().slice(0,10);


        if (dataInicial && dataCriacaoDespesa < dataInicialFiltro) {
            return false;
        }

        // Lógica de filtro para dataFinal
        if (dataFinal && dataCriacaoDespesa > dataFinalFiltro) {
            return false;
        }

        // Lógica de filtro para status
        if (status && despesa.status !== status) {
            return false;
        }

        return true; // Retorna true se a despesa passar por todos os filtros
    });


    const totalReceitas = {
        total: receitasFiltradas.reduce((acc, receita) => acc + receita.valor, 0),
        totalPix: receitasFiltradas.reduce((acc, receita) => acc + (receita.forma_pagamento === "PIX" ? receita.valor : 0), 0),
        totalDinheiro: receitasFiltradas.reduce((acc, receita) => acc + (receita.forma_pagamento === "DINHEIRO" ? receita.valor : 0), 0),
        totalCartao: receitasFiltradas.reduce((acc, receita) => acc + (receita.forma_pagamento === "CARTAO" ? receita.valor : 0), 0),
        totalBoleto: receitasFiltradas.reduce((acc, receita) => acc + (receita.forma_pagamento === "BOLETO" ? receita.valor : 0), 0),
        totalTransacoes: receitasFiltradas.length
    };

    const totalDespesas = {
        total: despesasFiltradas.reduce((acc, despesa) => acc + despesa.valor, 0),
        totalPix: despesasFiltradas.reduce((acc, despesa) => acc + (despesa.forma_pagamento === "PIX" ? despesa.valor : 0), 0),
        totalDinheiro: despesasFiltradas.reduce((acc, despesa) => acc + (despesa.forma_pagamento === "DINHEIRO" ? despesa.valor : 0), 0),
        totalCartao: despesasFiltradas.reduce((acc, despesa) => acc + (despesa.forma_pagamento === "CARTAO" ? despesa.valor : 0), 0),
        totalBoleto: despesasFiltradas.reduce((acc, despesa) => acc + (despesa.forma_pagamento === "BOLETO" ? despesa.valor : 0), 0),
        totalTransacoes: despesasFiltradas.length
    }

    return (
        <div>
            <HeadSgme title="SGME - Fluxo caixa Diario"/>
            <main className="container">
                <h1>Fluxo de caixa diário</h1>

                <div>
                    <FormFiltroDados filtrarDados={filtrarDados}/>
                </div>

                <div className="d-sm-flex justify-content-between ">
                    <DashComponentReceitas receitas={totalReceitas}/>
                    <DashComponentDespesas despesas={totalDespesas}/>
                </div>

                <hr/>
                <h3>Resumo do caixa</h3>
                <div>
                    <p className="text-success fw-bold">Entradas : {totalReceitas.total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</p>
                    <p className="text-danger fw-bold">Saidas : {totalDespesas.total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</p>
                    <p className="fw-bold">Saldo : {(totalReceitas.total-totalDespesas.total).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</p>
                </div>


            </main>
        </div>
    )
}

export default Index;