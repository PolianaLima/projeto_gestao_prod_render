import React from 'react';
import Link from "next/link";
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function ReceitaItem({receita}) {
    return (
        <tr key={receita.id}>
            <td>{receita.nomeCliente}</td>
            <td>{receita.valor.toLocaleString('pt-br',{style:'currency', currency: 'BRL'})}</td>
            <td>{format(parseISO(receita.data_vencimento), 'dd/MM/yyyy', {locale:ptBR})}</td>
            <td>{receita.status}</td>
            <td className="d-flex justify-content-end">
                <Link href={`/gestao-sgme/financeiro/contas-a-receber/update/${receita.id}`}
                      className="btn btn-success me-2">EDITAR
                </Link>
                <Link href={`/gestao-sgme/financeiro/contas-a-receber/delete/${receita.id}`}
                      className="btn btn-danger">EXCLUIR
                </Link>
            </td>
        </tr>
    );
}

export default ReceitaItem;