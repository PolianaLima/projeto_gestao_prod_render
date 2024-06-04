import React from 'react';

function DashboadDadosFechamentoCaixa({dados, title}) {
    return (
        <div className="d-sm-flex flex-column w-100 p-2 mobile-styles-component-fluxo-caixa">


            <div className="mt-3">
                <h5> Resumo de {title}</h5>
                <hr/>
                <div className="d-flex justify-content-between ">
                    <p className="fw-bolder">
                        <i className="bi bi-caret-right-square"> </i>
                        Total de {title} (+)</p>
                    <p className="fw-bolder">{dados.total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</p>
                </div>
                <div>
                    <div className="d-flex justify-content-between">
                        <p>
                            <i className="bi bi-cash"> </i>
                            Dinheiro</p>
                        <p>{dados.totalDinheiro.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p>
                            <i className="bi bi-stripe"> </i>
                            Pix</p>
                        <p>{dados.totalPix.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p>
                            <i className="bi bi-credit-card-2-front-fill"> </i>
                            Cartão</p>
                        <p>{dados.totalCartao.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</p>
                    </div>

                </div>
            </div>

        </div>

    );
}

export default DashboadDadosFechamentoCaixa;