import React from 'react';
import Link from "next/link";

function ListagemDadosLayout({dados, erroApiMessage, statusErroApi, url, urlDetalhes, titleListagem, titleButtonAdd}) {
    return (
        <>
            <div className="d-flex justify-content-between">
                <h3>{titleListagem}</h3>
                <Link href={url} className="btn btn-primary">
                    <i className="bi bi-person-add fs-5 pe-2 text-white"></i>
                    {titleButtonAdd}</Link>
            </div>
            <div className="mt-3">
                <table className="table table-borderless">
                    <thead>
                    <tr className="border-bottom shadow">
                        <th scope="col" style={{minWidth: 100}}>Codigo</th>
                        <th scope="col" className="w-100">Nome</th>
                        <th scope="col" className="w-100">Status</th>
                        <th scope="col" style={{minWidth: 100}}>Detalhar</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dados && dados.length > 0 ? (
                        dados.map((dado, index) =>
                            <tr key={index}>
                                <td style={{minWidth: 100}}>{index + 1}</td>
                                <td className="w-100">{dado.nome}</td>
                                <td className="w-100">{dado.status.toLowerCase()}</td>
                                <td className="d-flex justify-content-center align-items-center"
                                    style={{minWidth: 100}}>
                                    <Link href={`${urlDetalhes}/${dado.id}`}
                                          className="btn btn-success">
                                        <i className="bi bi-search text-white"></i>
                                    </Link>
                                </td>
                            </tr>
                        )
                    ) : (
                        <tr>
                            {statusErroApi ? (
                                <td colSpan="3" className="text-center text-danger">{erroApiMessage}</td>
                            ) : (
                                <td colSpan="3" className="text-center">Nenhum cliente cadastrado</td>
                            )}
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ListagemDadosLayout;