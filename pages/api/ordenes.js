import { PrismaClient } from "@prisma/client"


export default async function hendler(req, res) {
    const prisma = new PrismaClient()

    //Obtener ordenes

    const ordenes = await prisma.orden.findMany({
    })
    res.status(200).json(ordenes)


    //Crear ordenes
    if(req.method === "POST") {
        const orden = await prisma.orden.create({
            data:{
                nombre: req.body.nombre,
                total: req.body.total,
                pedido: req.body.pedido,
                fecha: req.body.fecha,
            }
        })


        res.json(orden)
    }


    //Eliminar ordenes
    if(req.method === "DELETE") {
        const eliminarOrden = await prisma.orden.deleteMany()
        res.json(eliminarOrden)
    }
    
}