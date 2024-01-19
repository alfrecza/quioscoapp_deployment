import axios from "axios"
import AdminLayout from "../../layout/AdminLayout"
import useSWR from 'swr'
import Orden from "../../components/Orden"
import { formatearDinero } from "../../helpers"

const completadas = () => {

  const fetcher = () => axios('/api/ordenes').then(datos => datos.data)

  const { data, error, isLoading } = useSWR('/api/ordenes', fetcher, {refreshInterval: 100})

  const gastoTotal = () => {
    const ordenesTerminadas = data?.filter(orden => orden.estado === true)
    const total = ordenesTerminadas?.reduce((total, orden) => total + orden.total, 0)
    return total
  }

  const handleFinalizar = async () => {
      if(confirm("Estas seguro de que deseas cerrar la caja del dia? Tanto las ordenes en proceso y las completadas se reiniciarán"))
      await axios.delete('/api/ordenes')
  }

  return (
    <AdminLayout>
        <h1 className="text-4xl font-black my-10">Resumen de ordenes completadas</h1>
        <div>
          <p className="text-amber-500 font-bold text-3xl uppercase">Dinero en caja: <span className="text-black">{formatearDinero(gastoTotal())}</span></p>
          
          <button className="bg-indigo-600 hover:bg-indigo-800 text-white py-3 px-6 my-6 uppercase font-bold rounded-lg text-lg" onClick={handleFinalizar}>Finalizar dia</button>
          
        </div>
        {data && data.length ? data.map(orden => (
          orden.estado && <Orden orden={orden} key={orden.id}/>
        )) : <p>Todavia no hay ordenes completadas</p>}
    </AdminLayout>
  )
}

export default completadas