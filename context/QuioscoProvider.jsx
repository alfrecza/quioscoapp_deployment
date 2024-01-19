import {createContext, useState, useEffect } from "react";
import axios from "axios";
import {toast} from 'react-toastify';
import { useRouter } from "next/router";


const QuioscoContext = createContext()



const QuiscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)


    const router = useRouter()

    const obtenerCategorias = async () => {
        const {data} = await axios('/api/categorias')
        setCategorias(data)
        
    }

    useEffect(() => {
        obtenerCategorias()
    }, [])

    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias])

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])

    const handleClickCategoria = id => {
        const categoria = categorias.filter(categoriaArray => categoriaArray.id === id)
        setCategoriaActual(categoria[0])
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleModal = () => {
        setModal(!modal)
    }

    const handleAgregarPedido = (producto) => {

        if(pedido.some(p => p.id === producto.id)) {
            const pedidosActualizados = pedido.map(p => p.id === producto.id ? producto : p)
            setPedido(pedidosActualizados)
            toast.success('Guardado correctamente')
        } else {
            setPedido([...pedido, producto])
            toast.success('Agregado al pedido')
        }

        setModal(false)
    }

    const handleEliminarProducto = (producto) => {
        const pedidosActualizados = pedido.filter(productoState => productoState.id !== producto.id)
        setPedido(pedidosActualizados)
        toast.success("Se eliminó correctamente")
    }

    const colocarOrden = async (e) => {
        e.preventDefault()

        try { 
            await axios.post('/api/ordenes', {pedido, nombre, total, fecha: Date.now().toString()})

            //resetear la app
            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)

            toast.success("Pedido realizado correctamente")

            setTimeout(() => {
                router.push('/')
            }, 3000);

        } catch (error){
            console.log(error)
        }
        console.log('Enviando orden')
    }
    

    return(
        <QuioscoContext.Provider value={{
            categorias, 
            categoriaActual,
            setCategoriaActual,
            handleClickCategoria,
            handleSetProducto,
            producto,
            handleModal,
            modal,
            handleAgregarPedido,
            pedido,
            setPedido,
            handleEliminarProducto,
            nombre,
            setNombre,
            colocarOrden,
            total
        }}>
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuiscoProvider
}

export default QuioscoContext