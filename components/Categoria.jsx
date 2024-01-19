import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";
import { useRouter} from "next/router";
import { useEffect } from "react";
const Categoria = ({ categoria }) => {

    const router = useRouter()
    const {categoriaActual, handleClickCategoria, setCategoriaActual,categorias} = useQuiosco()
    const { nombre, icono, id} = categoria;

    useEffect(() => {
        if(router.pathname !== '/') {
            setCategoriaActual({})
        } else if (router.pathname === '/'){
            setCategoriaActual(categorias[0])
        } else {
            setCategoriaActual(categoriaActual)
        }
    }, [router.pathname])

    


    return(
        <div className={`${categoriaActual?.id === id ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border p-5 hover:bg-amber-400`}>
            <Image alt="imagen icono" width={70} height={70} src={`/assets/img/icono_${icono}.svg`}/>
            <button type="button" className="text-2xl font-bold hover:cursor-pointer" onClick={() => {handleClickCategoria(id), router.push('/')}}>{nombre}</button>
        </div>
    ) 
};

export default Categoria;
