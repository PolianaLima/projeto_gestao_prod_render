import HeadSgme from "@/components/head/HeadSgme";
import React, {useEffect, useState} from "react";
import {handleApiError} from "@/utils/errors/handleErroApi";
import {useFormListFinanceiro} from "@/utils/hooks/useFormListFinanceiro";
import {finalizarCheckout, getCheckout} from "@/api/checkoutApi";
import {format, parseISO} from "date-fns";
import {ptBR} from "date-fns/locale";
import MessageLoadingData from "@/components/message/messageLoadingData";
import DashboadDadosFechamentoCaixa from "@/components/financeiro/DashboardDadosFechamentoCaixa";
import ModalFecharCaixa from "@/components/modal/ModalFecharCaixa";
import ModalInfo from "@/components/modal/ModalInfo";
import {toggleModalController} from "@/utils/controller/modal";
import GraficoVendasFluxoFinanceiro from "@/components/graficos/GraficoVendasFluxoFinanceiro";
import ModalCheckoutFechado from "@/components/modal/ModalCheckoutFechado";
import {getVendasCheckout} from "@/api/vendasApi";

const ROUTE_PATH = "/"

function Index() {

    const [checkout, setCheckout] = useState([]);
    const [vendas, setVendas] = useState([]);


    const {
        erroApiMessage,
        setErroApiMessage,
        statusErroApi,
        loading,
        setLoading,
        setStatusErroApi,
        statusVisibleModal,
        setStatusVisibleModal,
        setStatusVisibleModalCancelar,
        statusVisibleModalCancelar,
        id,
        setId,
        loadingApi,
        setLoadingApi
    } = useFormListFinanceiro()


    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const checkoutData = await getCheckout();
                setCheckout(checkoutData);

                const vendasData = await getVendasCheckout(checkoutData.id);
                setVendas(vendasData);
            } catch (error) {
                handleApiError(error, setErroApiMessage, setStatusErroApi);
                setStatusVisibleModal(true);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [setErroApiMessage, setLoading, setStatusErroApi, setStatusVisibleModal]);

    const totalVendas = {
        total: vendas.reduce((acc, venda) => acc + venda.valor_total, 0),
        totalPix: vendas.reduce((acc, venda) => acc + (venda.forma_pagamento === "PIX" ? venda.valor_total : 0), 0),
        totalDinheiro: vendas.reduce((acc, venda) => acc + (venda.forma_pagamento === "DINHEIRO" ? venda.valor_total : 0), 0),
        totalCartao: vendas.reduce((acc, venda) => acc + (venda.forma_pagamento === "CARTAO" ? venda.valor_total : 0), 0),
        totalBoleto: vendas.reduce((acc, venda) => acc + (venda.forma_pagamento === "BOLETO" ? venda.valor_total : 0), 0),
        totalTransacoes: vendas.length
    };

    const onConfirmar = async (id) => {
        setLoadingApi(true);
        try {
            await finalizarCheckout(id);
            toggleModal()
        } catch (error) {
            handleApiError(error, setErroApiMessage, setStatusErroApi);
        } finally {
            setLoadingApi(false);
        }
    }

    const toggleModal = () => {
        toggleModalController(setStatusVisibleModal, statusVisibleModal, ROUTE_PATH)
    }

    return (
        <>
            <HeadSgme title="SGME - Fluxo caixa Diario"/>

            {loading ? (
                <MessageLoadingData message="Carregando dados "/>
            ) : (
                <>
                    {statusErroApi ? (

                        <div>
                           <ModalCheckoutFechado
                               statusVisibleModal={statusVisibleModal}
                               setStatusVisibleModal={setStatusVisibleModal}
                               urlNewCheckout = {`${ROUTE_PATH}/gestao-sgme/fluxo-caixa/novo-caixa`}
                               urlDashboard={ROUTE_PATH}
                               message="Não tem caixa em aberto, deseja abrir o caixa?"
                           />
                        </div>
                    ): (
                        <main className="m-2 mt-5 d-flex justify-content-between">
                            <div className="w-100">
                                <h1>Controle de caixa</h1>
                                <p className="fw-bolder">
                                    <i className="fw-bolder bi  bi-calendar-date"> </i>
                                    Periodo: <span>{format(parseISO(checkout.data_created), 'dd/MM/yyyy', {locale: ptBR})} </span>
                                    : até agora</p>
                                <p className="fw-bolder"><i className="fw-bolder bi bi-cash"> </i>
                                    Abertura de
                                    caixa {checkout.valor_inicial.toLocaleString('pt-br', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    })}
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
                                    <p className="fw-bold bg-paleta_Azul d-flex justify-content-between p-2 text-white">Saldo
                                        Final do Caixa ( Dinheiro)
                                        :<span
                                            className="fw-bolder text-white">{(totalVendas.totalDinheiro + checkout.valor_inicial).toLocaleString('pt-br', {
                                            style: 'currency',
                                            currency: 'BRL'
                                        })}</span></p>
                                </div>

                                <button className="btn btn-success"
                                        onClick={(event) => {
                                            event.preventDefault()
                                            setId(checkout.id)
                                            setStatusVisibleModal(true)
                                        }}
                                >FINALIZAR CAIXA
                                </button>
                            </div>
                            <div className="w-100 d-flex align-items-center justify-content-center">
                                <GraficoVendasFluxoFinanceiro totalVendas={totalVendas}/>

                            </div>

                            <ModalFecharCaixa loadingApi={loadingApi}
                                              id={checkout.id}
                                              setStatusVisibleModal={setStatusVisibleModal}
                                              statusVisibleModal={statusVisibleModal}
                                              message="Deseja realmente fechar o caixa?"
                                              onConfirmar={onConfirmar}
                            />

                            <ModalInfo
                                statusVisibleModal={statusErroApi}
                                message="Caixa finalizado com Sucesso"
                                setStatusVisibleModal={setStatusErroApi}
                                toggleModal={toggleModal}
                            />

                        </main>
                    )}

                </>


            )}

        </>
    )
}

export default Index;