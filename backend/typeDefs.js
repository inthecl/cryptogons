const typeDefs = `
  type Book {
    id: ID
    title: String
    author: String
  }
  type Dragon {
    email: String
    serial: String
    combination: String
    name: String
    birthday: String
    state: String
    price: Int
    period: Int
    gen: Int
    cooldown: [String]
    parents: [String]
    child: [String]
    choice_cbg: String
    choice_sword: String
    choice_shield: String
    cintamani: [String]
    base_attack: Int
    add_attack: Int
    base_armor: Int
    add_armor: Int
    win: Int
    lose: Int
    winning_rate: Int
    ranking: Int
  }
  type User {
    email: String
    username: String
    name: String
    diamond: Int
    gold: Int
    trophy: Int
    iconNum: Int
    cbg: [Cbg]
    sword: [Sword]
    shield: [Shield]
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
    name: String
    description: String
    number: String
    gold: Int
    diamond: Int
    trophy: Int
  }
  type Shield {
    name: String
    description: String
    number: String
    gold: Int
    diamond: Int
    trophy: Int
  }
  type Cbg {
    name: String
    description: String
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
    addDragon(name:String, price: Int!): Dragon
    addBook(title:String,author:String): Book
    registerUser(email:String!,username:String!,password:String!): User
    addUserDragon(email: String!, new_comb: String!, parents: [String]!): User
    registerItem(email:String!): Item
    addItemSword(name: String!, description: String!, number: String!, gold: Int!, diamond: Int!, trophy: Int!): Item
    addItemShield(name: String!, description: String!, number: String!, gold: Int!, diamond: Int!, trophy: Int!): Item
    addItemCbg(name: String!, description: String!, number: String!, gold: Int!, diamond: Int!, trophy: Int!): Item
    login(email:String!,password:String!): AuthPayload!
    removeUserDragon(email: String!, comb: String!): User
    editChoicecbg(email: String!, serial: String!, choice_cbg: String!): User
    editChoicesword(email: String!, serial: String!, choice_sword: String!): User
    editChoiceshield(email: String!, serial: String!, choice_shield: String!): User
    editUserDragonState(email: String!, serial: String!, change_state: String!): User
    itemPurchase(email: String!, item: String!, number: String!,  name: String!, description: String!, diamond: Int!, gold: Int!, trophy: Int!): User
  }
`
export default typeDefs
