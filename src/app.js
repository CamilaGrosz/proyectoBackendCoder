import ProductManager from './productManager.js'
import express from 'express'

const app = express()
const port = 8080;

const productManager = new ProductManager("./products.json")
app.use(express.json());

app.get('/api/products', (req, res) => {
    const products = productManager.getProducts();
    try {
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

app.get('/', (req, res)=>{
    const products = productManager.getProducts();
    let limit = req.query.limit
    if(!limit || limit < 0 ){
        return res.send({products})
    }
    products.forEach(e => {
        if(e <= limit){
            res.send(e)
        }
    });
})

app.get('/api/products/:id', (req, res)=>{
    let id = req.params.id
    let product = productManager.getProductById(id)
    if(!product){
        return res.send({products})
    }
    res.send({product})

})

app.post('/api/products',(req, res) => {
    let product = productManager.addProduct(req.body)
})

app.listen(port, () => {
    console.log(`Servidor en el puerto ${port}`);
});
