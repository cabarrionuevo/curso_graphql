const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const { graphqlExpress,graphiqlExpress } = require('graphql-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { merge } = require('lodash');

const courseTypeDefs = require('./types/course.types');
const userTypeDefs = require('./types/user.types');

const courseResolvers = require('./resolvers/course.resolvers');
const userResolvers = require('./resolvers/user.resolvers');

mongoose.connect('mongodb://localhost/graphql_db_course',{ useNewUrlParser: true })

const app = express();

// _ : Boolean -> no indica nada, es solo para que no pinche por que esta vacio
const typeDefs = 
    `
        type Alert{
            message: String
        }

        type Query {
            _ : Boolean
        }

        type Mutation {
            _ : Boolean
        }
    `;


    const resolver = {}

const schema = makeExecutableSchema({
    typeDefs: [typeDefs, courseTypeDefs,userTypeDefs], //arreglo, notar que typedefs esta definida arriba al igual que courseTypeDefs
    resolvers: merge(resolver,courseResolvers,userResolvers)
});

//use permite montar middlewares. Para que procese o adorne una petición
app.use('/graphql', bodyParser.json() ,graphqlExpress({ schema: schema }));

//Graphiql nos pide un endpoint donde enviar las peticiones
app.use('/graphiql',graphiqlExpress({ endpointURL: '/graphql'}));



app.listen(8085,function(){
    console.log("Servidor iniciado");;
});

//Clase 2 Modulo 5 - Base de datos
//Se crea carpeta modelos. Se indica que un modelo se relaciona a una colección