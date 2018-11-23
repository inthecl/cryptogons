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
    release_date: String
    gen: Int
    cooldown: [String]
    parents: [String]
    child: [String]
    choice_cbg: String
    choice_sword: String
    choice_shield: String
    cintamani: [String]
    base_damage: Int
    add_damage: Int
    base_armor: Int
    add_armor: Int
    win: Int
    lose: Int
    winning_rate: Int
    ranking: Int
  }
  type eDragon {
    serial: String
    ename: String
    edesc: String
    enumber: String
    eicon: String
    egold: Int
    ediamond: Int
    etrophy: Int
    eperiod: String
    combination: String
    release_date: String
  }
  type BattleHistory {
    mydragon: String
    mycomb: String
    enemydragon: String
    enemycomb: String
    result: String
  }
  type Activity {
    type: String
    date: String
    contents : [String]
  }
  type User {
    email: String
    username: String
    diamond: Int
    gold: Int
    trophy: Int
    icon: [Icon]
    choice_icon: String
    cbg: [Cbg]
    sword: [Sword]
    shield: [Shield]
    myDragons: [String]
    battle_history: [BattleHistory]
    activity: [Activity]
  }
  type Statistic {
    usercount: Int
    dragoncount: Int
  }
  type AuthPayload {
    token: String!
    refreshToken: String!
  }
  type Icon {
    name: String
    description: String
    number: String
  }
  type Sword {
    name: String
    description: String
    option: String
    number: String
    gold: Int
    diamond: Int
    trophy: Int
    eicon: String
    eperiod: String
  }
  type Shield {
    name: String
    description: String
    option: String
    number: String
    gold: Int
    diamond: Int
    trophy: Int
    eicon: String
    eperiod: String
  }
  type Cbg {
    name: String
    description: String
    option: String
    number: String
    gold: Int
    diamond: Int
    trophy: Int
    eicon: String
    eperiod: String
  }
  type Item {
    sword: [Sword]
    shield: [Shield]
    cbg: [Cbg]
  }
  type Queue {
    queue: [String]
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
    findprofile(username:String!): User
    edragons: [eDragon]
  }
  type Mutation{
    resetCount(usercount: Int, dragoncount: Int): Statistic
    addDragon(name:String, price: Int!): Dragon
    addBook(title:String,author:String): Book
    registerUser(email:String!,username:String!,password:String!): User
    addUserDragon(email: String!, new_comb: String!, parents: [String]!): Dragon
    registerItem(email:String!): Item
    addItemshop(type: String!, name: String!, description: String!, option: String, number: String!, gold: Int!, diamond: Int!, trophy: Int!, eicon: String, eperiod: String): Item
    itemPurchase(email: String!, item: String!, number: String!, currency: String!): User
    login(email:String!,password:String!): AuthPayload!
    removeUserDragon(email: String!, comb: String!): User
    editChoicecbg(email: String!, serial: String!, choice_cbg: String!): Dragon
    editChoicesword(email: String!, serial: String!, choice_sword: String!): Dragon
    editChoiceshield(email: String!, serial: String!, choice_shield: String!): Dragon
    editUserDragonState(serial: String!, change_state: String!): Dragon
    dragonPurchase(email: String! serial: String!, diamond: Int!): Dragon
    dragonSell(serial: String!, diamond: Int!, period: Int!): Dragon
    dragonSellCancel(serial: String!): Dragon
    dragonSiring(serial: String!, diamond: Int!, period: Int!): Dragon
    dragonSiringCancel(serial: String!): Dragon
    dragonSiringPurchase(email: String!, new_comb: String!, parents: [String]!, diamond: Int!): Dragon
    dragonGift(email: String!, serial: String!, recipient: String!): Dragon
    battleStart(email: String!, serial: String!) : Dragon
    battleCancle(email: String!, serial: String!) : Dragon
    battleUpdate(email: String!) : User
    addUserIcon(email: String!, number: String!, name: String!, description: String!) : User
    editChoiceIcon(email: String!, number: String!) : User
    findbadge(email: String!) : User
    dragonNameChange(email: String!, serial: String! name: String!) : Dragon
    addeDragon(ename: String!, edesc: String!, enumber: String!, eicon: String!, egold: Int, ediamond: Int, etrophy: Int, eperiod: String!): eDragon
    edragonPurchase(email: String!, serial: String!, currency: String!): Dragon
  }
`
export default typeDefs
