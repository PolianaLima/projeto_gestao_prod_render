import React, {useEffect, useState} from "react";

import 'bootstrap/dist/css/bootstrap.css';
import {getUserFromCookie} from "@/utils/Cookies";
import CardImagemButton from "@/components/cards/CardImagemButton";
import {useRouter} from 'next/router';
import HeadSgme from "@/components/head/HeadSgme";
import Image from "next/image";


export default function Home() {

    const [usuario, setusuario] = useState([{"nome": "", login: ""}])

    const router = useRouter();

    useEffect(() => {
        const fetchData = () => {
            const data = getUserFromCookie();

            if (data !== null) {
                setusuario(data.usuario);
            } else {
                router.push("/")
            }

        }
        fetchData();
    }, [router, usuario.id]);


    return (<>
        <HeadSgme title="SGME - Dashboard"/>

        <main className="d-sm-flex align-items-center">
            <section
                className="container d-sm-flex flex-sm-column align-items-center justify-content-center pb-5"
            >

                <div className="d-sm-flex justify-content-center align-items-center">
                    <Image src="/img/pdv-venda.png"
                           alt="Pdv"
                           width="0"
                           height="0"
                           sizes="100vw"
                           style={{width: '30%', height: 'auto'}}
                           priority={true}
                    />
                    <div>
                        <h1 className="w-100 text-center">SEJA BEM VINDO(A)</h1>
                        <h3 className="mb-5 text-center">{usuario.nome}</h3>
                    </div>
                </div>

                <p className="fw-bolder text-app-sgme fs-2">Menu Rapido</p>
                <div className="container-sm d-sm-flex flex-wrap justify-content-between">


                    <CardImagemButton
                        link="/gestao-sgme/pdv"
                        img="/img/icone_nova_venda.png"
                        titleLink="Nova Venda"/>

                    <CardImagemButton
                        link="/gestao-sgme/produtos/cadastro"
                        img="/img/icone_cad_produto.svg"
                        titleLink="Novo Produto"/>

                    <CardImagemButton
                        link="/gestao-sgme/clientes/cadastro"
                        img="/img/icone_cad_fornecedor.png"
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
            </section>
        </main>
    </>)
}
