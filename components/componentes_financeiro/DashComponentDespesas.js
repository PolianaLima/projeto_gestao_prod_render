import React from 'react';
import Image from "next/image";

function DashComponentReceitas({despesas}) {
    return (
        <div className="d-sm-flex flex-column w-50 p-2 mobile-styles-component-fluxo-caixa">
            <div className="bg-warning p-3 rounded-1 d-flex flex-row justify-content-between w-100">
                <div>
                    <Image src="/img/icons-despesa-94.png" width={50} height={50} alt="Receitas"/>
                </div>
                <div>
                    <h2 className="text-light text-end">{despesas.total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</h2>
                    <p className="text-light text-end">Valor Total (R$)</p>
                </div>
            </div>

            <div className="mt-3">
                <h5> Resumo de Despesas</h5>
                <hr/>
                <div className="d-flex justify-content-between">
                    <p>Total de despesas</p>
                    <p>{despesas.totalTransacoes}</p>
                </div>
                <div>
                    <div className="d-flex justify-content-between">
                        <p>Dinheiro</p>
                        <p>{despesas.totalDinheiro.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p>Pix</p>
                        <p>{despesas.totalPix.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p>Cartão</p>
                        <p>{despesas.totalCartao.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p>Boleto</p>
                        <p>{despesas.totalBoleto.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</p>
                    </div>

                </div>
            </div>

        </div>

    );
}

export default DashComponentReceitas;