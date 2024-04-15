import React, {useEffect, useState, Suspense} from 'react';
import Link from "next/link";
import Head from "next/head";
import {getReceitasData} from "@/utils/getReceitas";
import {useRouter} from 'next/router';
import ReceitaItem from "@/components/componentes_financeiro/ReceitaItem";
import ReceitaItemMobile from "@/components/componentes_financeiro/ReceitaItemMobile";
import {useForm} from "react-hook-form";
import FormFiltroDados from "@/components/componentes_financeiro/FormFiltroDados";

function Index() {
    const [receitas, setReceitas] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [dataFiltro, setdataFiltro] = useState({
        dataInicial: "",
        dataFinal: "",
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


    const receitasFiltradas = receitas.filter(receita => {

        const {dataInicial, dataFinal, status} = dataFiltro;
        if (!dataInicial && !dataFinal && !status) return true;

        // Lógica de filtro para dataInicial
        if (dataInicial && new Date(receita.data_vencimento) < new Date(dataInicial)) {
            return false;
        }

        // Lógica de filtro para dataFinal
        if (dataFinal && new Date(receita.data_vencimento) > new Date(dataFinal)) {
            return false;
        }

        // Lógica de filtro para status
        if (status && receita.status !== status) {
            return false;
        }

        return true; // Retorna true se a receita passar por todos os filtros
    });


    const receitasOrdernada = receitasFiltradas.sort((v1, v2) => {
        if (v1.data_vencimento < v2.data_vencimento) {
            return -1;
        }
        if (v1.data_vencimento > v2.data_vencimento) {
            return 1;
        }
        return 0;
    });

    const totalReceitas = receitasOrdernada.reduce((acc, receita) => acc + receita.valor, 0);

    return (<div>
        <Head>
            <title>SGME - Lista de contas a receber</title>
            <meta name="description" content="Generated by create next app"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        <main className="container">
            <div className="container d-flex flex-row justify-content-between mb-3">
                <h3>Contas a Receber</h3>
                <Link href="/gestao-sgme/financeiro/contas-a-receber/cadastro"
                      className="btn btn-success rounded-5">+</Link>
            </div>

            <FormFiltroDados filtrarDados={filtrarDados}/>

            {/* Tabela de contas a receber */}
            <table className="table overflow-x-scroll mb-5 desktop-styles-info-financeiro-table">

                <thead>
                <tr className="border border-2 border-warning ">
                    <th scope="col">Cliente</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Vencimento</th>
                    <th scope="col">Status</th>
                    <th scope="col" className=" d-flex justify-content-end">Ações</th>
                </tr>
                </thead>
                {loadingData ? (
                    <tr className="d-flex justify-content-center align-items-center">
                        <td className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </td>
                    </tr>
                ) : (
                    <>
                        <tbody>
                        {receitasOrdernada && receitasOrdernada.length > 0 ? (receitasOrdernada.map(receita => (
                            <ReceitaItem key={receita.id} receita={receita}/>))) : (
                            <tr>
                                <td colSpan="5">Nenhuma despesa encontrada.</td>
                            </tr>
                        )}

                        <tr>
                            <td colSpan={4} className="fw-bold pt-3 ">Total</td>
                            <td className="text-end fw-bold pt-3">{totalReceitas.toLocaleString('pt-br', {
                                style: 'currency', currency: 'BRL'
                            })}
                            </td>
                        </tr>
                        </tbody>
                    </>
                )}
            </table>

                {/* Tabela de contas a receber - Mobile */}
            <table className="table table-borderless overflow-x-scroll mb-5 mobile-styles-info-financeiro-table">
                <thead>
                <tr>
                    <th scope="col" className="text-secondary ">Vencimento</th>
                    <th scope="col" className="text-secondary text-end ">Valor</th>
                </tr>
                </thead>

                {loadingData ? (
                    <tr className="d-flex justify-content-center align-items-center">
                        <td className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </td>
                    </tr>
                ) : (
                    <>
                        <tbody>
                        {receitasOrdernada && receitasOrdernada.length > 0 ? (receitasOrdernada.map(receita =>
                                <ReceitaItemMobile key={receita.id} receita={receita}/>)) :
                            (<tr>
                                <td colSpan="6">Nenhuma despesa encontrada.</td>
                            </tr>)
                        }
                        <tr>
                            <td className="fw-bold pt-3 ">Total</td>
                            <td className="text-end fw-bold pt-3">{totalReceitas.toLocaleString('pt-br', {
                                style: 'currency', currency: 'BRL'
                            })}
                            </td>
                        </tr>
                        </tbody>
                    </>
                )}
            </table>
        </main>
    </div>);
}

export default Index;
