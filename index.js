const express=require('express')
const { MongoClient, ObjectId } = require('mongodb')
const app=express()
app.use(express.json())

//configuração BD
const bdUrl = 'mongodb+srv://admin:WeL94dTtknnEOVJr@cluster0.1b2ewyf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const dbName = 'mongodb-intro-e-implementacao' 



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
    if (!novoItem.titulo || !novoItem.autor || !novoItem.anoPublicacao){
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
app.get('/livros/:id', async (req,res)=>{
    const id = req.params.id
    const item = await collection.findOne({_id: new ObjectId(id)})
    if(!item){
        return res.send('Item não encontrado')
    }
    res.send(item)
})

//Implemente um endpoint para atualizar um livro por ID (PUT /livros/:id).
app.put('/livros/:id', async (req,res)=>{
    const id = req.params.id
    const novoItem = req.body

    // const item = await collection.findOne({_id: new ObjectId(id)})
    await collection.updateOne(
        {_id: new ObjectId(id)},
        {$set: novoItem}
    )

    res.send(novoItem)

})

//Implemente um endpoint para deletar um livro por ID (DELETE /livros/:id).
app.delete('/livros/:id', async (req,res)=>{
    const id = req.params.id
    await collection.deleteOne({_id: new ObjectId(id)})
    res.send('Item removido com sucesso!')
})

}

main()





app.listen(3000)