import React, {useEffect, useState} from 'react';
import Link from "next/link";
import Head from "next/head";
import {getDespesasData} from "@/utils/getDespesas";
import DespesaItem from "@/components/componentes_financeiro/DespesaItem";
import DespesaItemMobile from "@/components/componentes_financeiro/DespesaItemMobile";
import {useForm} from "react-hook-form";
import FormFiltroDados from "@/components/componentes_financeiro/FormFiltroDados";
import HeadSgme from "@/components/head/HeadSgme";

function Index(props) {

    const [despesas, setDespesas] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [dataFiltro, setDataFiltro] = useState({
        dataInicio: "",
        dataFinal: "",
        status: ""
    });

    useEffect(() => {
        const getData = async () => {
            setLoadingData(true)
            try {
                const despesasData = await getDespesasData();
                setDespesas(despesasData);
            } catch (error) {
                console.error("Erro ao buscar dados", error);
            } finally {
                setLoadingData(false);
            }
        };

        getData();
    }, []);

    const filtrarDados = async (data) => {
        setDataFiltro(data);
    }

    const despesasFiltradas = despesas.filter(despesa => {
        const {dataInicial, dataFinal, status} = dataFiltro;
        if (!dataInicial && !dataFinal && !status) {
            return true;
        }

        if (dataInicial && new Date(despesa.data_vencimento) < new Date(dataInicial)) {
            return false;
        }
        if (dataFinal && new Date(despesa.data_vencimento) > new Date(dataFinal)) {
            return false;
        }

        if (status && despesa.status !== status) {
            return false;
        }
        return true;
    })

    const despesasOrdenada = despesasFiltradas.sort((v1, v2) => {
        if (v1.data_vencimento < v2.data_vencimento) {
            return -1;
        }
        if (v1.data_vencimento > v2.data_vencimento) {
            return 1;
        }
        return 0;
    });

    const totalDespesa = despesasOrdenada.reduce((acc, despesa) => {
        return acc + despesa.valor;
    }, 0);

    return (
        <>
            <HeadSgme title="SGME - Contas a pagar" />

            <main className="container">
                <div className="container d-flex flex-row justify-content-between mb-3">
                    <h3>Contas a Pagar</h3>
                    <Link href="/gestao-sgme/financeiro/contas-a-pagar/cadastro"
                          className="btn btn-success rounded-5">+</Link>
                </div>

                <FormFiltroDados filtrarDados={filtrarDados}/>


                <table className="table overflow-x-scroll mb-5 desktop-styles-info-financeiro-table">
                    <thead>
                    <tr className="border border-2 border-warning">
                        <th scope="col">Fornecedor</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Vencimento</th>
                        <th scope="col">Status</th>
                        <th scope="col" className=" d-flex justify-content-end">Ações</th>

                    </tr>
                    </thead>
                    {loadingData ? (
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <tbody>
                            {despesasOrdenada && despesasOrdenada.length > 0 ? (
                                despesasOrdenada.map(despesa => (
                                    <DespesaItem key={despesa.id} despesa={despesa}/>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">Nenhuma despesa encontrada.</td>
                                </tr>
                            )}
                            <tr>
                                <td colSpan={4} className="fw-bold pt-3">
                                    Total
                                </td>
                                <td className="text-end fw-bold pt-3">
                                    {totalDespesa.toLocaleString('pt-br', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    })}
                                </td>
                            </tr>
                            </tbody>
                        </>
                    )}
                </table>


                {/*MOBILE*/}
                <table className="table table-borderless overflow-x-scroll mb-5 mobile-styles-info-financeiro-table">

                    {loadingData ? (
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <thead>
                            <tr>
                                <th scope="col" className="text-secondary ">Vencimento</th>
                                <th scope="col" className="text-secondary text-end ">Valor</th>
                            </tr>
                            </thead>
                            <tbody>
                            {despesasOrdenada && despesasOrdenada.length > 0 ? (
                                despesasOrdenada.map(despesa => (
                                    <DespesaItemMobile key={despesa.id} despesa={despesa}/>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">Nenhuma despesa encontrada.</td>
                                </tr>
                            )}
                            <tr>
                                <td className="fw-bold pt-3">
                                    Total
                                </td>
                                <td className="text-end fw-bold pt-3">
                                    {totalDespesa.toLocaleString('pt-br', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    })}
                                </td>
                            </tr>
                            </tbody>
                        </>
                    )}
                </table>

            </main>
        </>

    );
}

export default Index;