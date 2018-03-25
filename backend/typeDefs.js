const typeDefs = `
  type Book {
    id: ID
    title: String
    author: String
  }
  type User {
    email: String
    username: String
    name: String
  }
  type Query{
    books: [Book]
    findbook(id:String!): Book
    users: [User]
  }
  type Mutation{
    addBook(title:String,author:String): Book
    registerUser(email:String!,username:String!,password:String!): User
    login(email:String!,password:String!): String!
  }
`
export default typeDefs
