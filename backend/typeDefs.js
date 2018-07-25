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
    diamond: Int
    gold: Int
    iconNum: Int
  }
  type Dragon {
    name: String
    combination: String
    birthday: String
    price: Int
    serial: String
  }
  type Statistic {
    usercount: Int
    dragoncount: Int
  }
  type AuthPayload {
    token: String!
    refreshToken: String!
  }
  type Query{
    books: [Book]
    findbook(id:String!): Book
    users: [User]
    checkemail(email:String!): User
    dragons: [Dragon]
    finddragon(serial:String!): Dragon
    statistic: Statistic
  }
  type Mutation{
    resetCount(usercount: Int, dragoncount: Int): Statistic
    addDragon(name:String, combination:String, birthday:String, price:Int, serial:String): Dragon
    addBook(title:String,author:String): Book
    registerUser(email:String!,username:String!,password:String!): User
    login(email:String!,password:String!): AuthPayload!
  }
`
export default typeDefs
