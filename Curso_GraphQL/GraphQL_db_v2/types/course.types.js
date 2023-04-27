//La nomeclatura del nombre del archivo es comunmente usada en angular para diferenciar archivos con un mismo nombre (en realidad para evitar esto).

module.exports = `

type Course{
    id: ID!
    title: String!
    views: Int
}

input CourseInput{
    title: String!
    views: Int
}

extend type Query{
    getCourses(page: Int, limit: Int = 1): [Course]
    getCourse(id: ID!): Course
}

extend type Mutation {
    addCourse(input: CourseInput): Course
    updateCourse(id: ID!,input: CourseInput): Course
    deleteCourse(id: ID!): Alert
}
`;