import React, {useState} from 'react';
import {format, parseISO} from "date-fns";
import {ptBR} from "date-fns/locale";
import {useRouter} from "next/router";

function ListaVenda({venda}) {
    const [error, setError] = useState("");
    const [vendaComponent, setVendaComponent] = useState(venda);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const router = useRouter();

const cancelarVenda = async () => {
    router.push(`/gestao-sgme/pdv/venda/cancelar/${vendaComponent.id}`);
}


    return (
        <tr>
            <td>{format(parseISO(vendaComponent.data_created), 'dd/MM/yyyy', {locale: ptBR})}</td>
            <td>{vendaComponent.valor_total.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL'
            })}</td>
            <td>{vendaComponent.status}</td>
            <td>
                <button className="border-0 text-danger fw-bold"
                        disabled={isButtonDisabled || vendaComponent.status === "CANCELADA"}
                        onClick={
                            event => {
                                event.preventDefault();
                                cancelarVenda();
                            }
                        }>Cancelar
                </button>
            </td>
        </tr>
    );
}

export default ListaVenda;