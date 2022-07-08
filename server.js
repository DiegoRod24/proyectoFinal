//importar paquetes
const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path  = require('path');

//firebase admin setup
let serviceAccount = require("./ecom-website-26328-firebase-adminsdk-97lst-8058112187.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

//Aws configuracion
const aws = require('aws-sdk');
const dotenv = require('dotenv');
const { generateKey } = require('crypto');
const { AppIntegrations } = require('aws-sdk');

dotenv.config();

//aws parametros 
const region="ap-south-1";
const bucketName = "ecom-website-diego"
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

aws.config.update({
    region,
    accessKeyId,
    secretAccessKey
})

// inicializar s3
const s3 = new aws.S3();

//generate image upload link
async function generateUrl(){
    let date = new Date();
    let id = parseInt(Math.random() * 10000000000)

    const imageName = `${id}${date.getTime()}.jpg`;
    
    const params =({
        Bucket: bucketName,
        Key: imageName,
        Expires: 300,
        ContentType: 'image/jpeg'

    })
    const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
    return uploadUrl;
}
//declarando el path
let staticPath= path.join(__dirname);

//inicializando express.js
const app = express ();

//middlewares
app.use(express.static(staticPath));
app.use(express.json());

//routes
//home 
app.get('/', (req, res)  =>{
        res.sendFile(path.join(staticPath, "index.html"));
})

//signup route
app.get('/signup', (req, res) => {
    res.sendFile(path.join(staticPath,"signup.html"));
})

app.post('/signup', (req, res) => {
    let { name, email, password, number, tac, notification } = req.body;

    //form validations
    if(name.length < 3){
        return res.json({'alert':'el nombre debe tener 3 letras como minimo'})
    } else if(!email.length){
        return res.json({'alert':'ingrese su correo'});
    } else if(password.length < 8){
        return res.json({'alert':'ingrese contraseña'});
    } else if(!number.length){
        return res.json({'alert': 'Ingrese su numero de celular'});
    }/* else if(!Number(number.value) || number.value.length < 10){
        return res.json('Numero invalido, porfavor vuelve a intentarlo');
    }*/  else if(!tac){
        return res.json({'alert':'debes aceptar los terminos y condiciones'});
    }

    //almacenar usuario en db
    db.collection('users').doc(email).get()
    .then(user => {
        if(user.exists){
            return res.json({'alert':'email already exists'});
        }else{
            //cifrar la contraseña antes de almacenarla
            bcrypt.genSalt(10, (err, salt) =>{
                bcrypt.hash(password, salt, (err, hash) =>{
                    req.body.password =hash;
                    db.collection('users').doc(email).set(req.body)
                    .then(data => {
                        res.json({
                            name: req.body.name,
                            email: req.body.email,
                            seller: req.body.seller

                        })
                    })
                })
            })
        }
    })
})
//login route
app.get('/login', (req,res) => {
    res.sendFile(path.join(staticPath, "login.html"));
})

app.post('/login', (req,res) =>{
    let { email, password } = req.body;

    if(!email.length || !password.length){
        return res.json({'alert': 'llenar todo los campos'})
    }

    db.collection('users').doc(email).get()
    .then(user => {
        if(!user.exists){ //si el correo electrónico no existe
            return res.json({'alert': 'el correo electrónico de inicio de sesión no existe'})
        } else {
            bcrypt.compare(password, user.data().password, (err, result) => {
                if(result){
                    let data = user.data();
                    return res.json({
                        name: data.name,
                        email: data.email,
                        seller: data.seller,
                    })
                }else {
                    return res.json({'alert': 'password incorrecto'})
                }
            } )
        }
    })
})
//seller route
app.get('/seller', (req, res) => {
   res.sendFile(path.join(staticPath,"seller.html")); 
})

app.post('/seller',(req, res) => {
    let{name, about, address, number, tac, legit, email} = req.body;
    if(!name.length || !address.length || !about.length || number.length < 9
        || !Number(number)){
            return res.json({'alert':'alguna información no es válida'})
        } else if(!tac || !legit){
            return res.json({ 'alert': 'debes aceptar los términos y condiciones'})
        } else {
            // actualizar el estado de vendedor de los usuarios aquí
            db.collection('sellers').doc(email).set(req.body).then(data=>{
                db.collection('users').doc(email).update({
                    seller:true
                }).then(data => {
                    res.json(true);
                })
            })
        }
})
//add product
app.get('/add-product',(req, res) => {
    res.sendFile(path.join(staticPath,"addProduct.html"))
})
app.get('/add-product/:id',(req, res) => {
    res.sendFile(path.join(staticPath,"addProduct.html"))
})

// obtener el enlace de carga
app.get('/s3url', (req,res) => {
    generateUrl().then(url => res.json(url));
})

//añadir producto
app.post('/add-product',(req, res) =>{
    let { name, shortDes, des, images, sizes, 
        actualPrice, discount, sellPrice, 
        stock,tags, tac, email,draft } = req.body;

        //validacion
        if(!draft){
            if(!name.length){
                return res.json({'alert' : 'introducir nombre del producto'});
            } else if(shortDes.length > 100 || shortDes.length<10){
                return res.json( { 'alert' :'breve descripción debe tener entre 10 y 100 letras'} );
            }else if(!des.length){
                return res.json( { 'alert' : 'ingrese una descripción detallada sobre el producto' });
            }else if(!images.length){// matriz de enlaces de imagen
                return res.json({'alert' : 'sube al menos una imagen de producto'});
            } else if (!sizes.length){// matriz de tamaño
                return res.json('seleccione al menos un tamaño');
            } else if (!actualPrice.length || !discount.length || !sellPrice.length){
                return res.json( {'alert' : 'debes agregar precios'} );
            } else if (stock< 20){
                return res.json( {'alert' : 'debe tener al menos 20 artículos en stock'} );
            } else if (!tags.length){
                return res.json( {'alert' : 'ingrese algunas etiquetas para ayudar a clasificar su producto en la búsqueda '} );
            } else if(!tac){
                return res.json({'alert' : 'debes aceptar nuestros términos y condiciones'} );
            }
    
        }
        //adicionar producto
        let docName =`${name.toLowerCase()}-${Math.floor(Math.random() * 5000)}`;
        db.collection('products').doc(docName).set(req.body)
        .then(data => {
                res.json({'product': name });
        })
        .catch(err => {
            return res.json( {'alert' : 'Se produjo algún error. intentar otra vez '});
        })
        })

// Obtener Producto 
app.post('/get-products', (req,res) => {
    let{email,id}=req.body;
    let docRef = id ? db.collection('products').doc(id) : db.collection('products').where('email', '==', email);

    docRef.get()
    .then(products =>{
        if(products.empty){
            return res.json('no products');
        }
        let productArr = [];
        if(id){
            return res.json(products.data());
        }else{
            products.forEach(item => {
                let data =item.data();
                data.id = item.id;
                productArr.push(data);
            })
            res.json(productArr)
        }
      
    })
})    

app.post('/delete-product', (req, res) =>{
    let{id} = req.body;
    db.collection('products').doc(id).delete()
    .then(data => {
        res.json('success');
    }).catch(err => {
        res.json('err');
    })
})
//404 route
app.get('/404', (req, res) => {
    res.sendFile(path.join(staticPath,"404.html"));
})


app.use((req,res) => {
    res.redirect('/404');
})

app.listen(3000, () => {
        console.log('listening on port 3000......');
})