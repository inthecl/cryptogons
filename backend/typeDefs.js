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
  type Sword {
    number: String
    gold: Int
    diamond: Int
    trophy: Int
  }
  type Shield {
    number: String
    gold: Int
    diamond: Int
    trophy: Int
  }
  type Cbg {
    number: String
    gold: Int
    diamond: Int
    trophy: Int
  }
  type Item {
    sword: [Sword]
    shield: [Shield]
    cbg: [Cbg]
  }
  type Query{
    books: [Book]
    findbook(id:String!): Book
    users: [User]
    checkemail(email:String!): User
    dragons: [Dragon]
    sword: [Sword]
    finddragon(serial:String!): Dragon
    statistic: Statistic
    finduser(email:String!): User
    finditem(email:String!): Item
    items: [Item]
  }
  type Mutation{
    resetCount(usercount: Int, dragoncount: Int): Statistic
    addDragon(name:String, combination:String, birthday:String, price:Int, serial:String): Dragon
    addBook(title:String,author:String): Book
    registerUser(email:String!,username:String!,password:String!): User
    addUserDragon(email: String!, comb: String, choice_comb: String, new_comb: String!, name: String): User
    registerItem(email:String!): Item
    addItemSword(number: String!, gold: Int!, diamond: Int!, trophy: Int!): Item
    addItemShield(number: String!, gold: Int!, diamond: Int!, trophy: Int!): Item
    addItemCbg(number: String!, gold: Int!, diamond: Int!, trophy: Int!): Item
    login(email:String!,password:String!): AuthPayload!
    removeUserDragon(email: String!, comb: String!): User
    editChoicecbg(email: String!, serial: String!, choice_cbg: String!): User
    editChoicesword(email: String!, serial: String!, choice_sword: String!): User
    editChoiceshield(email: String!, serial: String!, choice_shield: String!): User
  }
`
export default typeDefs
