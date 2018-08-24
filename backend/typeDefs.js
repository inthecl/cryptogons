const typeDefs = `
  type Book {
    id: ID
    title: String
    author: String
  }
  type Dragon {
    name: String
    combination: String
    birthday: String
    price: Int
    serial: String
    choice_cbg: String
    choice_sword: String
    choice_shield: String
  }
  type User {
    email: String
    username: String
    name: String
    diamond: Int
    gold: Int
    iconNum: Int
    cbg: [String]
    sword: [String]
    shield: [String]
    dragons: [Dragon]
  }
  type Statistic {
    usercount: Int
    dragoncount: Int
  }
  type AuthPayload {
    token: String!
    refreshToken: String!
  }
  type Item {
    sword: [String]
    shield: [String]
    cbg: [String]
  }
  type Query{
    books: [Book]
    findbook(id:String!): Book
    users: [User]
    checkemail(email:String!): User
    dragons: [Dragon]
    finddragon(serial:String!): Dragon
    statistic: Statistic
    finduser(email:String!): User
    items: [Item]
  }
  type Mutation{
    resetCount(usercount: Int, dragoncount: Int): Statistic
    addDragon(name:String, combination:String, birthday:String, price:Int, serial:String): Dragon
    addBook(title:String,author:String): Book
    registerUser(email:String!,username:String!,password:String!): User
    registerItem(email:String!): Item
    login(email:String!,password:String!): AuthPayload!
    addUserDragon(email: String!, comb: String, choice_comb: String, new_comb: String!, name: String): User
    removeUserDragon(email: String!, comb: String!): User
    editChoicecbg(email: String!, serial: String!, choice_cbg: String!): User
    editChoicesword(email: String!, serial: String!, choice_sword: String!): User
    editChoiceshield(email: String!, serial: String!, choice_shield: String!): User
  }
`
export default typeDefs
