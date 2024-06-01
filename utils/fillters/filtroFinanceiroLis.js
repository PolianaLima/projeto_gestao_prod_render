export const filtroFinanceiroList = (data, dataFiltro) => {
    if (dataFiltro) {
        const {dataFiltroInicio, dataFiltroFim, statusFiltro} = dataFiltro;

        data = data.filter(despesa => {
            // Lógica de filtro para dataFiltroInicio
            if (dataFiltroInicio && new Date(despesa.data_vencimento) < new Date(dataFiltroInicio)) {
                return false;
            }

            // Lógica de filtro para dataFiltroFim
            if (dataFiltroFim && new Date(despesa.data_vencimento) > new Date(dataFiltroFim)) {
                return false;
            }

            // Lógica de filtro para statusFiltro
            if (statusFiltro && despesa.status !== statusFiltro) {
                return false;
            }

            return true; // Retorna true se a despesa passar por todos os filtros
        });
    }

    return data;
}