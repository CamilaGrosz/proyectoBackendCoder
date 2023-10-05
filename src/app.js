import ProductManager from './productManager.js'
import express from 'express'

const app = express()
const port = 8080;

const productManager = new ProductManager("./products.json")
app.use(express.json());


app.get('/api/products', async (req, res) => {
    try {
        let limit = req.query.limit
        const products = await productManager.getProducts();
        if (limit) {
            
            return res.send(products.slice(0, limit))            
        } else {
            return res.send(products);
        }
    } catch (error) {
        res.status(500).json({ error: 'no se encontraron los productos' });
    }
});


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
