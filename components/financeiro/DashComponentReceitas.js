import React from 'react';
import Image from "next/image";

function DashComponentReceitas({receitas}) {
    return (
        <div className="d-sm-flex flex-column w-50 p-2 mobile-styles-component-fluxo-caixa">
            <div className="bg-success p-3 rounded-1 d-flex flex-row justify-content-between w-100">
                <div>
                    <Image src="/img/icons-receita-94.png" width={50} height={50} alt="Receitas"/>
                </div>
                <div>
                    <h2 className="text-light text-end">{receitas.total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</h2>
                    <p className="text-light text-end">Valor Total (R$)</p>
                </div>
            </div>

            <div className="mt-3 ">
                <h5> Resumo de vendas</h5>
                <hr/>
                <div className="d-flex justify-content-between">
                    <p>Total de Venda</p>
                    <p>{receitas.totalTransacoes}</p>
                </div>
                <div>
                    <div className="d-flex justify-content-between">
                        <p>Dinheiro</p>
                        <p>{receitas.totalDinheiro.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p>Pix</p>
                        <p>{receitas.totalPix.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p>Cartao</p>
                        <p>{receitas.totalCartao.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p>Boleto</p>
                        <p>{receitas.totalBoleto.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</p>
                    </div>

                </div>
            </div>

        </div>

    );
}

export default DashComponentReceitas;