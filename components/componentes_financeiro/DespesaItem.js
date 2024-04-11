import React from 'react';
import Link from "next/link";
import {format, parseISO} from "date-fns";
import {ptBR} from "date-fns/locale";

function DespesaItem({despesa}) {
    return (
        <tr key={despesa.id}>
            <td>{despesa.nomeFornecedor}</td>
            <td>R$ {despesa.valor.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL'
            })}</td>
            <td>{format(parseISO(despesa.data_vencimento), 'dd/MM/yyyy', {locale: ptBR})}</td>
            <td>{despesa.status}</td>
            <td className="d-flex justify-content-end">
                <Link href={`/gestao-sgme/financeiro/contas-a-pagar/update/${despesa.id}`}
                      className="btn btn-success me-2">EDITAR</Link>
                <Link href={`/gestao-sgme/financeiro/contas-a-pagar/delete/${despesa.id}`}
                      className="btn btn-danger">EXCLUIR</Link>
            </td>
        </tr>
    );
}

export default DespesaItem;