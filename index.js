const express=require('express')
const { MongoClient } = require('mongodb')
const app=express()

//configuração BD
const bdUrl = 'mongodb+srv://admin:WeL94dTtknnEOVJr@cluster0.1b2ewyf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const dbName = 'mongodb-intro-e-implementacao' 

app.use(express.json())

async function main(){
    //conexão BD
    const client = new MongoClient(bdUrl)
    console.log('conectando ao BD...');
    await client.connect()
    console.log('BD conectado!');

    const db = client.db(dbName)
    const collection = db.collection('livros')
    
    
//Implemente um endpoint para adicionar um novo livro (POST /livros).
app.post('/livros', async (req,res)=>{
    const novoItem = req.body
    if (!novoItem || !novoItem.titulo || !novoItem.autor || !novoItem.anoPublicacao){
        return res.status(400).send('Dados incompletos')
    }
    await collection.insertOne(novoItem)
    res.status(201).send('Novo item adicionado com sucesso.')
})

//Implemente um endpoint para listar todos os livros (GET /livros).
app.get('/livros', async (req,res)=>{
    const todosItens = await collection.find().toArray()
    res.send(todosItens)
})

//Implemente um endpoint para obter um livro específico por ID (GET /livros/:id).

//Implemente um endpoint para atualizar um livro por ID (PUT /livros/:id).

//Implemente um endpoint para deletar um livro por ID (DELETE /livros/:id).


}

main()





app.listen(3000)