import React from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

function ReceitaItem({ receita }) {
    return (
        <>
            <tr>
                <td className="fw-medium  ">
                    {format(parseISO(receita.data_vencimento), "dd/MM/yyyy", {
                    locale: ptBR,
                    })}
                </td>
                <td className="fw-medium text-end ">{receita.valor.toLocaleString('pt-bt', {style:'currency', currency: 'BRL'})}</td>
            </tr>

            <tr>
                <td colSpan={2}>
                <Link
                    className="d-flex flex-row justify-content-between link "
                    href={`/gestao-sgme/financeiro/contas-a-receber/update/${receita.id}`}
                >
                    <span>{receita.nomeCliente}</span>
                    <span>{receita.status}</span>
                </Link>
                </td>
                <td colSpan="2"></td>
            </tr>

            <div className="ms-2 fw-bolder">|</div>
        </>
    );
}

export default ReceitaItem;
