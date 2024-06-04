import React from 'react';
import Image from "next/image";
import {router} from "next/client";
import {useRouter} from "next/router";

function ToltipInfoCancelar({
                                statusHidden,
                                setStatusHidden,
                                statusCarrinho,
                                setStatusCarrinho,
                                conteudoInfo,
                                tituloInfo,
                            }) {

    const router = useRouter();
    return (
        <div hidden={statusHidden} className="w-100 bg-secondary vh-100" style={{
            height: "100%",
            width: "100%",
            position: 'fixed',
            top: "0",
            left: "0",
            opacity: "95%"
        }}>
            <div
                className="offcanvas bg-white offcanvas-body bottom-200 show text-bg-secondary rounded-2"
                tabIndex="-1"
                id="offcanvasDark"
                aria-labelledby="offcanvasDarkLabel"
                style={{
                    height: "auto",
                    width: "30%",
                    position: 'relative',
                    top: "25%",
                    left: "35%",
                }}
            >
                <div className="d-flex justify-content-center">
                    <i className="h1 text-success bi bi-check-circle-fill"></i>
                </div>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title text-center w-100" id="offcanvasDarkLabel">{tituloInfo}</h5>
                </div>
                <div className="offcanvas-body text-center">
                    <p>{conteudoInfo}</p>
                </div>
                <div className="offcanvas-footer w-100 d-flex justify-content-center">
                    <div className="d-flex flex-row w-50 mb-4">
                        <button className="btn btn-outline-danger w-100 me-3"
                                onClick={(event) => {
                                    event.preventDefault();
                                    setStatusHidden(false)
                                    setStatusCarrinho(false)
                                    router.push("/gestao-sgme/pdv")
                                }}>Sim
                        </button>
                        <button className="btn btn-outline-warning w-100" onClick={() => {
                            setStatusHidden(true)
                        }}>Não
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ToltipInfoCancelar;