import { getUserFromCookie } from "@/utils/Cookies";
import { http } from "@/utils/http";

export const    getReceitasData = async () => {
    try {
        const dataUser = getUserFromCookie();

        const response = await http.get(`/receitas`, {
            headers: {
                Authorization: `Bearer ${dataUser.token}`
            }
        });

        const receitas = response.data;

        //Obter dados do total de receitas

        const idCliente = receitas.map((receita) => receita.cliente_id);

        const uniqueIdCliente = [...new Set(idCliente)];

        const clienteResponses = await Promise.all(
            uniqueIdCliente.map((id) => http.get(`/clientes/${id}`, {
                headers: {
                    Authorization: `Bearer ${dataUser.token}`
                }
            }))
        );

        // Adicione verificações aqui para garantir que os dados sejam válidos

        const clienteMap = clienteResponses
            .filter((res) => res.data.hasOwnProperty("nome"))
            .reduce((map, clienteResponse) => {
                const cliente = clienteResponse.data;
                map[cliente.id] = cliente.nome;
                return map;
            }, {});

        return receitas.map((receita) => ({
            ...receita,
            nomeCliente: clienteMap[receita.cliente_id]
        }));
    } catch (error) {
        console.error("Erro ao buscar dados", error);
        throw error; // Rejeitar o erro para que o chamador possa lidar com ele
    }
};
