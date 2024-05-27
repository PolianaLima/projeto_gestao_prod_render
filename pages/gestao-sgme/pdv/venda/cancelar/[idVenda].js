import HeadSgme from "@/components/head/HeadSgme";
import {useRouter} from "next/router";
import {getUserFromCookie} from "@/utils/Cookies";
import {http} from "@/utils/http";

function CancelarVenda() {

    const router = useRouter();
    const codigo = router.query.idVenda;

  const handleCancelarVenda = async () => {
      const dataUser = getUserFromCookie();
        try {
             await http.put(`/vendas/cancelar/${codigo}`,{}, {
                headers: {
                    Authorization: `Bearer ${dataUser.token}`
                }
            });
            router.push("/gestao-sgme/pdv")
        } catch (error) {
            console.error("Erro ao excluir venda:" + error);
        }

  }

    return (
        <>
            <HeadSgme title="SGME - Cancelar Venda"/>
            <main className="container d-flex justify-content-center align-items-center" style={{minHeight: '60vh'}}>
                <div className="d-flex justify-content-center flex-column align-items-center" style={{minWidth: '18%'}}>
                    <p>Deseja cancelar a venda?</p>
                    <div className="d-flex justify-content-between w-100 p-2">
                        <button className="btn btn-danger" onClick={
                            event => {
                                event.preventDefault();
                                router.push("/gestao-sgme/pdv")
                            }
                        }>Cancelar
                        </button>
                        <button className="btn btn-success" onClick={
                            event => {
                                event.preventDefault();
                                handleCancelarVenda()
                            }
                        }> Confirmar</button>
                    </div>

                </div>

            </main>
        </>
    );
}

export default CancelarVenda;