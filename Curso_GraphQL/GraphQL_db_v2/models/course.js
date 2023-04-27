//Colecciones -> Tablas
//Documentos -> registros
//Lo 1er que necesito es crear un schema (ojo, no confundir con los esquemas de graphql)
//En este caso define que campos tienen los documentos

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: String,
    views: Number
});

//Retorna un modelo de mongoose mediante el cual nos podemos comunicar con nuestra base de datos mongodb
//Lo exportamos para poder usarlo en otros archivos
module.exports = mongoose.model('Course',courseSchema);
