'use client';

import React from "react";
import CardImagemButton from "@/components/cards/CardImagemButton";
import {useAuth} from "@/context/authContext";
import HeadSgme from "@/components/head/HeadSgme";


function Index() {

    const {user} = useAuth();

    return (
        <>
            <HeadSgme title="SGME - Dashboard"/>

            <main className="mt-5">
                <section
                    className="container d-sm-flex flex-sm-column align-items-center justify-content-center pb-5"
                >

                    <div className="d-sm-flex justify-content-center align-items-center">
                        <div>
                            <h1 className="w-100 text-center">SEJA BEM VINDO(A)</h1>
                            <h3 className="mb-5 text-center">{user.nome}</h3>
                        </div>
                    </div>

                    <p className="fw-bolder text-app-sgme fs-2">Menu Rapido</p>
                    <div className="container-sm d-sm-flex flex-wrap justify-content-between">


                        <CardImagemButton
                            link="/gestao-sgme/pdv"
                            img="/assets/img/icone_pdv_venda.svg"
                            titleLink="Nova Venda"/>

                        <CardImagemButton
                            link="/gestao-sgme/produtos/cadastro-produto"
                            img="/assets/img/icone_cad_produto.svg"
                            titleLink="Novo Produto"/>

                        <CardImagemButton
                            link="/gestao-sgme/clientes/cadastro-cliente"
                            img="/assets/img/icone_cad_cliente.svg"
                            titleLink="Novo Cliente"/>

                        <CardImagemButton
                            link="/gestao-sgme/fornecedores/cadastro-fornecedor"
                            img="/assets/img/icone_cad_fornecedor.png"
                            titleLink="Novo Fornecedor"/>

                        <CardImagemButton
                            link="/gestao-sgme/financeiro/contas-a-pagar/nova-despesa"
                            img="/assets/img/icone_contas_pagar.svg"
                            titleLink="Nova Despesa"/>

                        <CardImagemButton
                            link="/gestao-sgme/financeiro/contas-a-receber/nova-receita"
                            img="/assets/img/icone_contas_receber.svg"
                            titleLink="Nova Receita"/>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Index;