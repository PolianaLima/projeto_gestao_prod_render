import Head from 'next/head'
import React, {useEffect, useState} from "react";
import moment from "moment";

import 'bootstrap/dist/css/bootstrap.css';
import {http} from "@/utils/http";
import {getUserFromCookie} from "@/utils/Cookies";
import axios from "axios";
import CardImagemButton from "@/components/cards/CardImagemButton";
import CardDashBoard from "@/components/cards/CardDashBoard";
import { useRouter } from 'next/router';


export default function Home() {

    const [usuario, setusuario] = useState([{"nome": "", login: ""}])
    const [token, setToken] = useState({token: ""})
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const mes = moment().format('MM')

    const [despesas, setDespesas] = useState([])
    const [receitas, setReceitas] = useState([]);


    //buscando Receitas e despesas
    //adcionando uma fetch para busca de dados
    useEffect(() => {
        const fetchData = async () => {
            const data = getUserFromCookie();

            console.log("Dados do data: ", data);

            if(data !== null){

                setToken(data.token);
                setusuario(data.usuario);

                if (data.usuario && data.usuario.id) {
                    try {
                        setLoading(true); // Inicia o carregamento
                        await Promise.all([
                            getDataReceitas(data.token, data.usuario.id),
                            getDataDespesas(data.token, data.usuario.id)
                        ]);
                    } finally {
                        setLoading(false); // Finaliza o carregamento, mesmo se ocorrer um erro
                    }
                }
            }else{
                router.push("/")
            }
            
        }


        fetchData();
    }, [usuario.id]);


    const getDataReceitas = async (token, userId) => {
        try {
            const response = await http.get(`/receitas?idUsuario=${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {userId}
            });

            setReceitas(response.data);
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log(e)
            }
        }

    }

    //Buscando Despesas
    const getDataDespesas = async (token, userId) => {

        try {
            const response = await http.get(`/despesas?idUsuario=${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {userId}
            });
            setDespesas(response.data);
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log(e)
            }
        }


    }



    //Filtrando dados Receitas - Mes
    const receitaAtualPendente = receitas.filter((receita) => receita.status === "Pendente");
    const totalReceitaMes = receitaAtualPendente.length;
    const valorReceitaMes = receitaAtualPendente.reduce((total, receita) => {
        return total + receita.valor
    }, 0)


    //FIltrando dados Despesas Pendentes
    const despesasAtualPendente = despesas.filter((receita) => receita.status === "Pendente");
    const totalDespesasMes = despesasAtualPendente.length;
    const valorDespesaMes = despesasAtualPendente.reduce((total, despesa) => {
        return total + despesa.valor
    }, 0)


    return (
        <>
            <Head>
                <title>Sistema de Gestão para Microempreendedores</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>

            </Head>

            <main className="d-sm-flex align-items-center">
                <section
                    className="container d-sm-flex flex-sm-column align-items-center justify-content-center pb-5"
                >
                    <h1 className="w-100 text-center">SEJA BEM VINDO(A)</h1>
                    <h3 className="mb-5 text-center">{usuario.nome}</h3>

                    {loading && <p>Carregando...</p>}

                    <p className="fw-bolder text-app-sgme fs-2">Menu Rapido</p>
                    <div className="container-sm d-sm-flex flex-wrap justify-content-between">

                        <CardImagemButton
                            link="/gestao-sgme/clientes/cadastro"
                            img="/img/icone_cad_cliente.svg"
                            titleLink="Novo Cliente"/>

                        <CardImagemButton
                            link="/gestao-sgme/fornecedores/cadastro"
                            img="/img/icone_cad_produto.svg"
                            titleLink="Novo Fornecedor"/>

                        <CardImagemButton
                            link="/gestao-sgme/financeiro/contas-a-pagar/cadastro"
                            img="img/icone_cad_despesa.svg"
                            titleLink="Nova Despesa"/>

                        <CardImagemButton
                            link="/gestao-sgme/financeiro/contas-a-receber/cadastro"
                            img="/img/icone_func_financeiro.svg"
                            titleLink="Nova Receita"/>

                    </div>


                    <div className="container d-sm-flex  align-items-center justify-content-between p-4">
                        <CardDashBoard total={totalReceitaMes} valor={valorReceitaMes} tipo="receber"
                                    url="/gestao-sgme/financeiro/contas-a-receber"/>
                        <CardDashBoard total={totalDespesasMes} valor={valorDespesaMes} tipo="pagar"
                                    url="/gestao-sgme/financeiro/contas-a-pagar"/>


                    </div>
                    <p className="d-sm-flex mt-0 w-75 ms-5">Os valores apresentados sao referente ao mes atual!</p>

                </section>
            </main>
        </>
    )
}
