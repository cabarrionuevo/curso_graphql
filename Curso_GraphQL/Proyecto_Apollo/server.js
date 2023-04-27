const { ApolloServer} = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');
let courses = require('./courses');

const typeDefs = `
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
    getCourses(page: Int, limit: Int = 1): [Course]
    getCourse(id: ID!): Course
}

type Mutation {
    addCourse(input: CourseInput): Course
    updateCourse(id: ID!,input: CourseInput): Course
    deleteCourse(id: ID!): Alert
}
`;

const resolvers = {    
    Query: {
        getCourses(obj,{page,limit},){
            if (page!==undefined){
                return courses.slice((page -1)* limit,(page)*limit);
            }
            return courses;
        },
        getCourse(obj, {id} ){
            return courses.find( (course)=> id == course.id );
        }
    },
    Mutation: {
        addCourse(obj,{ input }){
            const { title, views } = input;
            const id = String(courses.length + 1);        
            const course = {id, ...input}; //equivalente a: const course = {id,title,views};
            courses.push(course);
            return course;
        },
        updateCourse(obj,{ id,input }){
            //Obtengo el indice del curso
            const courseIndex = courses.findIndex((course)=> id === course.id);            
            //Obtengo el curso
            const course = courses[courseIndex];            
            const newCourse = Object.assign(course,input);            
            courses[courseIndex] = newCourse;            
            return newCourse;

        },
        deleteCourse(obj, {id}){
            courses = courses.filter((course) => course.id != id);

            return {
                message: `El curso ${id} fue boleteado`
            }
        }
    }
}

//resolvers, objeto donde vamos a tener como resolver a querys y mutations. Abajo uso short hand notations
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

const server = new ApolloServer({
    schema: schema
});

server.listen().then(({url})=>{
    console.log(`Servidor iniciado en ${url}`);
})