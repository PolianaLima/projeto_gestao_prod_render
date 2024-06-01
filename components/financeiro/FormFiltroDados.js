import React from 'react';
import {useForm} from "react-hook-form";

function FormFiltroDados({filtrarDados}) {

    const{
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();


    return (
        <div>
            <form className="d-sm-flex flex-row justify-content-between mb-3">
                <div className="d-sm-flex mobile-styles-form-filtro-Dados">
                    <div className="form-group me-3">
                        <label>Data Inicial</label>
                        <input type="date"
                               className="form-control"
                               {...register("dataInicial")}/>
                    </div>
                    <div className="form-group me-3">
                        <label>Data Final</label>
                        <input type="date"
                               className="form-control"
                               {...register("dataFinal")}/>
                    </div>
                    <div className="form-group">
                        <label className="form-label mb-0">Status</label>
                        <select className="form-select"
                                defaultValue={1}
                                {...register("status")}
                        >
                            <option value="">Todos</option>
                            <option value="Pago">Pagos</option>
                            <option value="Pendente">A vencer</option>
                        </select>
                    </div>
                </div>

                <div className="align-content-end ">
                    <button className="btn btn-success" onClick={event => {
                        event.preventDefault()
                        handleSubmit(filtrarDados)()
                    }}>Filtrar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormFiltroDados;