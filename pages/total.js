import Layout from "../layout/Layout"
import useQuiosco from "../hooks/useQuiosco"
import { useEffect, useCallback } from "react"
import { formatearDinero } from "../helpers"


export default function Resumen () {

    const {pedido, nombre, setNombre, colocarOrden, total} = useQuiosco()

    const comprobarPedido = useCallback(() => {
        return pedido.length === 0
    }, [pedido])

    const comprobarNombre = () => {
        return nombre === ''|| nombre.length < 3
    }

    useEffect(() => {
        comprobarPedido()
        comprobarNombre()
    }, [pedido, comprobarPedido, nombre])

    return (
        <Layout pagina={'Total y Confirmar Pedido'}>
            <h1 className="text-4xl font-black">Total y Confirmar Pedido</h1>
            {comprobarPedido() ? <p className="text-2xl my-10 text-red-600">Primero comienza por agregar un producto al pedido!</p> : <p className="text-2xl my-10">Confirma tu pedido a continuación</p>}
            

            <form  onSubmit={colocarOrden}>
                <div>
                    <label className="block uppercase text-slate-800 font-bold text-xl" htmlFor="nombre">Nombre</label>
                    <input disabled={comprobarPedido()} type="text" className="bg-gray-200 w-full mt-3 lg:w-1/3 p-2 rounded-md" id="nombre" value={nombre} onChange={e => setNombre(e.target.value)}/>
                </div>
                <div className="mt-10">
                    <p className="text-2xl">Total a pagar <span className="font-bold">{formatearDinero(total)}</span></p>
                </div>
                <div className="mt-5">
                    <input type="submit" value="Confirmar pedido" className={`${comprobarPedido() || comprobarNombre() ? 'bg-indigo-100' : 'bg-indigo-600  hover:bg-indigo-800 cursor-pointer'} w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center`}  disabled={comprobarPedido() || comprobarNombre()}/>
                </div>
            </form>
        </Layout>
    )
}