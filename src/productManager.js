import fs from "fs";
class ProductManager {
    constructor() {
        this.path = "products.JSON";
        this.products = [];
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        const productExist = this.products.find((prod) => prod.code === code);

        if (productExist) {
            console.log("El codigo del producto ya está en uso");
            return null;
        }
        let idMax = 0;
        this.products.forEach((prod) => {
            if (prod.id > idMax) {
                idMax = prod.id;
            }
        });
        idMax++;
        const product = {
            id: idMax,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        this.products.push(product);
        let productsStrings = JSON.stringify(this.products);
        fs.writeFileSync(this.path, productsStrings);
        return product;
    }

    getProducts() {
        let data = fs.readFileSync(this.path, "UTF-8");
        console.log(JSON.parse(data));
        return JSON.parse(data);
    }

    getProductsById(id) {
        let data = fs.readFileSync(this.path, "UTF-8");
        let dataParse = JSON.parse(data);
        let productFound = dataParse.find((prod) => prod.id === id);
        if (productFound) {
            return console.log(productFound);
        } else {
            return console.log("Not Found");
        }
    }

    updateProduct(id, title, description, price, thumbnail, code, stock) {
        let data = fs.readFileSync(this.path, "UTF-8");
        let dataParse = JSON.parse(data);
        let productFound = dataParse.findIndex((product) => product.id === id);
        const updatedProduct = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        dataParse[productFound] = updatedProduct;
        fs.writeFileSync(this.path, JSON.stringify(dataParse));
        console.log("The product has update succefully");
        console.log(updatedProduct);
    }

    deleteProduct(id) {
        let data = fs.readFileSync(this.path, "UTF-8");
        let dataParse = JSON.parse(data);
        let index = dataParse.findIndex((product) => product.id === id);
        if (index === -1) {
            console.log("product not found");
        } else {
            dataParse.splice(index, 1);
            fs.writeFileSync(this.path, JSON.stringify(dataParse));
            console.log("Product was deleted");
        }
    }
}

const productManager = new ProductManager("products.json");

// 1) TEST DEL METODO getProducts() CON ARRAY VACIO
// productManager.getProducts();

// SE INSTANCIA Y TESTEA UN NUEVO PRODUCTO
const product1 = productManager.addProduct(
    "Campera",
    "Cuero Vacuno",
    1000,
    "img.jpg",
    1241414,
    3
);

// 2) SE MUESTRA EL PRODUCTO POR CONSOLA A TRAVES DEL METODO getProducts()
// productManager.getProducts();

// 3) SE INSTANCIA UN SEGUNDO PRODUCTO CON UN CODE YA UTILIZADO
// const product2 = productManager.addProduct(
//   "Camisa",
//   "Cuello Mao",
//   2000,
//   "img2.jpg",
//   1241414,
//   24
// );

// 4) SE INSTANCIAN NUEVE PRODUCTOS MAS CON UN CODE Y UN ID NUEVOS
// const product3 = productManager.addProduct(
//   "Zapatillas",
//   "Tela",
//   1500,
//   "img3.jpg",
//   1241411,
//   24
// );

// const product4 = productManager.addProduct(
//   "Pantalon",
//   "Jean",
//   3500,
//   "img4.jpg",
//   1241434,
//   12
// );

// const product5 = productManager.addProduct(
//   "Remera",
//   "Adidas",
//   1600,
//   "img5.jpg",
//   1241439,
//   11
// );

// const product6 = productManager.addProduct(
//   "Gorra",
//   "Nike",
//   1100,
//   "img6.jpg",
//   1241441,
//   17
// );

// const product7 = productManager.addProduct(
//   "Medias",
//   "Adidas",
//   500,
//   "img7.jpg",
//   1241446,
//   12
// );

// const product8 = productManager.addProduct(
//   "Anteojos",
//   "Rayban",
//   5000,
//   "img8.jpg",
//   1241447,
//   25
// );

// const product9 = productManager.addProduct(
//   "Perfume",
//   "Hugo Boss",
//   10100,
//   "img9.jpg",
//   1241448,
//   15
// );

// const product10 = productManager.addProduct(
//   "Cadena de Oro",
//   "GUCCI",
//   150000,
//   "img10.jpg",
//   1241449,
//   100
// );

// const product11 = productManager.addProduct(
//   "Reloj",
//   "Casio",
//   12000,
//   "img11.jpg",
//   1241450,
//   64
// );

// productManager.getProducts();

// 5) SE LLAMA A UN PRODUCTO POR ALGUN ID VALIDO
// productManager.getProductsById(5);

// 6) SE LLAMA A UN PRODUCTO POR ALGUN ID NO VALIDO
// productManager.getProductsById(11);

// 7) SE LLAMA AL METODO getProducts() MOSTRANDO TODOS LOS PRODUCTOS
// productManager.getProducts();

// 8) SE ACTUALIZA UN PRODUCTO POR SU ID
// productManager.updateProduct(
//   1,
//   "Fernet",
//   "Branca",
//   2200,
//   "fernet.jpg",
//   1241420,
//   30
// );

// 9) SE ELIMINAR UN PRODUCTO POR SU ID
// console.log(productManager.deleteProduct(1));