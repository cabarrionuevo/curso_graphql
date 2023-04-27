module.exports = `
    
type User{
        id: ID!
        email: String
        hashedPassword: String
        token: String
    }

    extend type Query {
        getUsers: [User]
        getUser(id: ID!): User
    }

    input UserInput{
        email: String!
        password: String
    }

    extend type Mutation {
        singUp(input: UserInput): User
        logIn(input: UserInput): User
        singOut: Alert
    }



`