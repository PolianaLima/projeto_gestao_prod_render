import React from 'react';
import Link from "next/link";
import {format, parseISO} from "date-fns";
import {ptBR} from "date-fns/locale";

function DespesaItemMobile({despesa}) {
    return (
        <>
            <tr >
                <td className="fw-medium w-100">{format(parseISO(despesa.data_vencimento), 'dd/MM/yyyy', {locale: ptBR})}</td>
                <td className="fw-medium text-end">{despesa.valor.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL'
                })}</td>
            </tr>

            <tr >
                <td colSpan={2}>
                    <Link
                        className="d-flex flex-row justify-content-between link "
                        href={`/gestao-sgme/financeiro/contas-a-pagar/update/${despesa.id}`}
                    >
                        <span>{despesa.nomeFornecedor}</span>
                        <span>{despesa.status}</span>
                    </Link>
                </td>
            </tr>
            <tr>
                <td colSpan={2}>|</td>
            </tr>
        </>

    );
}

export default DespesaItemMobile;