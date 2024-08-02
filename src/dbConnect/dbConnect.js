import mongoose from "mongoose";


export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI)
        const connection = mongoose.connection

        connection.on('connected', ()=>{
            console.log("mongodb connected sucess");
        })

        connection.on('error', (err)=>{
            console.log("mongodb connection error");
            console.log(err);
            process.exit()
        })
    } catch (error) {
        console.log("Connection db failed");
        console.log(error);
        
    }
}