const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');

//Datos falsos, esta técnica también se llama mockup de datos. Se utiliza para agilizar una prueba sin necesidad de tener que pasar por una base de datos.
let courses = require('./courses');

console.log("Estos son los cursos: ",courses)

const app = express();

//El tipo ID de graphQL indica un identificador único, es decir que en una misma lista no haya 2 registros con un mismo ID.
//Notar que todo debe estar tipado.
//Permite definir el esquema de una manera menos verbosa, la gran desventaja es que puedo indicar como se resuelve c/u de las propiedades. c/ propiedad puede tener su resolver.
//
const schema = buildSchema(`
    type Course{
        id: ID!
        title: String!
        views: Int
    }

    type Alert{
        message: String
    }

    input CourseInput{
        title: String!
        views: Int
    }

    type Query{
        getCourses: [Course]
        getCourse(id: ID!): Course
    }

    type Mutation {
        addCourse(title: String!, views: Int): Course
        updateCourse(id: ID!, title: String!, views: Int): Course
        addCourseV2(input: CourseInput): Course
        updateCourseV2(id: ID!, input: CourseInput): Course
        deleteCourse(id: ID!): Alert
    }
    `);

const root = {
    getCourses(){
        return courses;
    },
    getCourse( {id}  ){
        console.log(id);
        return courses.find( (course)=> id == course.id );
    },
    //{...} destructuring de objetos en javascript
    addCourse({title,views}){
        const id = String(courses.length + 1);
        const course = {id,title,views};
        courses.push(course);
        return course;
    },
    updateCourse({id, title, views}){
        const courseIndex = courses.findIndex((course)=> course.id);
        const course = courses[courseIndex];
        //abajo se puede utilizar short hand properties
        const newCourse = Object.assign(course,{title: title, views: views});
        course[courseIndex] = newCourse;
        return newCourse;
    },
    addCourseV2({input}){
        const { title, views } = input;
        const id = String(courses.length + 1);        
        const course = {id, ...input}; //equivalente a: const course = {id,title,views};
        
        
        courses.push(course);
        return course;
    },
    updateCourseV2({id,input}){
        //const { title, views } = input;
        const courseIndex = courses.findIndex((course)=> id === course.id);
        const course = courses[courseIndex];
        //abajo se puede utilizar short hand properties
        const newCourse = Object.assign(course,{course,input});
        course[courseIndex] = newCourse;
        return newCourse;
    },
    deleteCourse({id}){
        courses = courses.filter((course) => course.id != id);

        return{
            message: `El curso con id ${id} fue eliminado`
        }
    }
}

app.get('/',function(req,res){
    // res.send("Bienvenido al facinante mundo de GraphQL");
    res.json(cursos);
});

app.use('/graphql',graphqlHTTP({
    schema,
    rootValue: root, /* Se le pasa un objeto con funciones cuyo nombre coincida con las definidas en el schema*/
    graphiql: true
  }));

app.listen(8082,function(){
    console.log("Servidor arriba");
})