import gql from 'graphql-tag'

const registerUser = gql`
mutation registerUser($email: String!, $username: String!, $password: String!) {
  registerUser(email:$email, username: $username, password: $password) {
    email
    username
  }
}
`
const login = gql`
mutation login($email: String!, $password: String!) {
  login(email:$email,  password:$password) {
    token
    refreshToken
  }
}
`
const CheckEmailquery = gql`
query CheckEmail($email: String!){
  checkemail(email:$email) {
    email
    username
    iconNum
    diamond
    gold
    trophy
  } 
}
`
const dragons = gql`
query { dragons {
  email
  serial
  combination
  name
  birthday
  state
  price
  period
  gen
  cooldown
  parents
  child
  choice_cbg
  choice_sword
  choice_shield
  cintamani
  base_attack
  add_attack
  base_armor
  add_armor
  win
  lose
  winning_rate
  ranking
  } 
}
`
const finddragon = gql`
query finddragon($serial: String!){
  finddragon(serial:$serial) {
  name
  combination
  birthday
  price
  serial
  } 
}
`
const finduser = gql`
query finduser($email: String!){
  finduser(email:$email) {
  email
  username
  name
  diamond
  gold
  trophy
  iconNum
  cbg {
    name
    description
    number
    gold
    diamond
    trophy
  }
  sword {
    name
    description
    number
    gold
    diamond
    trophy
  }
  shield {
    name
    description
    number
    gold
    diamond
    trophy
  }
  dragonsNumber
 }
}
`
const addUserDragon = gql`
mutation addUserDragon($email: String!, $new_comb: String!, $parents: [String]! ) {
  addUserDragon(email:$email, new_comb:$new_comb, parents: $parents ) {
    email
    serial
    combination
    name
    birthday
    state
    price
    period
    gen
    cooldown
    parents
    child
    choice_cbg
    choice_sword
    choice_shield
    cintamani
    base_attack
    add_attack
    base_armor
    add_armor
    win
    lose
    winning_rate
    ranking
 }
}
`
const editChoicecbg = gql`
mutation editChoicecbg($email: String!, $serial: String!, $choice_cbg: String!) {
  editChoicecbg(email:$email, serial:$serial, choice_cbg:$choice_cbg) {
    email
    serial
    combination
    name
    birthday
    state
    price
    period
    gen
    cooldown
    parents
    child
    choice_cbg
    choice_sword
    choice_shield
    cintamani
    base_attack
    add_attack
    base_armor
    add_armor
    win
    lose
    winning_rate
    ranking
   }
  }
  `
const editChoicesword = gql`
mutation editChoicesword($email: String!, $serial: String!, $choice_sword: String!) {
  editChoicesword(email:$email, serial:$serial, choice_sword:$choice_sword) {
    email
    serial
    combination
    name
    birthday
    state
    price
    period
    gen
    cooldown
    parents
    child
    choice_cbg
    choice_sword
    choice_shield
    cintamani
    base_attack
    add_attack
    base_armor
    add_armor
    win
    lose
    winning_rate
    ranking
   }
  }
  `
const editChoiceshield = gql`
mutation editChoiceshield($email: String!, $serial: String!, $choice_shield: String!) {
  editChoiceshield(email:$email, serial:$serial, choice_shield:$choice_shield) {
    email
    serial
    combination
    name
    birthday
    state
    price
    period
    gen
    cooldown
    parents
    child
    choice_cbg
    choice_sword
    choice_shield
    cintamani
    base_attack
    add_attack
    base_armor
    add_armor
    win
    lose
    winning_rate
    ranking
   }
  }
  `
const finditem = gql`
query finditem($email: String!){
  finditem(email:$email) {
  sword {
    number
    name
    description
    gold
    diamond
    trophy
  }
  shield {
    number
    name
    description
    gold
    diamond
    trophy
  }
  cbg {
    number
    name
    description
    gold
    diamond
    trophy
  }
 }
}
`
const itemPurchase = gql`
mutation itemPurchase($email: String!, $number: String!, $item: String!, $name: String!, $description: String!, $diamond: Int!, $gold: Int!, $trophy: Int!) {
  itemPurchase(email:$email, number:$number, item:$item, name:$name, description:$description, diamond:$diamond, gold:$gold, trophy:$trophy) {
    email
    username
    name
    diamond
    gold
    trophy
    iconNum
    cbg {
      name
      description
      number
      gold
      diamond
      trophy
    }
    sword {
      name
      description
      number
      gold
      diamond
      trophy
    }
    shield {
      name
      description
      number
      gold
      diamond
      trophy
    }
    dragonsNumber
   }
  }
  `

const editUserDragonState = gql`
  mutation editUserDragonState($email: String!, $serial: String!, $change_state: String!) {
    editUserDragonState(email:$email, serial:$serial, change_state: $change_state) {
      email
      serial
      combination
      name
      birthday
      state
      price
      period
      gen
      cooldown
      parents
      child
      choice_cbg
      choice_sword
      choice_shield
      cintamani
      base_attack
      add_attack
      base_armor
      add_armor
      win
      lose
      winning_rate
      ranking
   }
  }
  `
const dragonPurchase = gql`
  mutation dragonPurchase($email: String!, $serial: String!, $diamond: Int!) {
    dragonPurchase(email:$email, serial:$serial, diamond:$diamond) {
      email
      serial
      combination
      name
      birthday
      state
      price
      period
      gen
      cooldown
      parents
      child
      choice_cbg
      choice_sword
      choice_shield
      cintamani
      base_attack
      add_attack
      base_armor
      add_armor
      win
      lose
      winning_rate
      ranking
   }
  }
  `

const dragonSell = gql`
  mutation dragonSell($serial: String!, $diamond: Int!, $period: Int!) {
    dragonSell(serial:$serial, diamond:$diamond, period:$period) {
      email
      serial
      combination
      name
      birthday
      state
      price
      period
      gen
      cooldown
      parents
      child
      choice_cbg
      choice_sword
      choice_shield
      cintamani
      base_attack
      add_attack
      base_armor
      add_armor
      win
      lose
      winning_rate
      ranking
    }
  }
  `

const dragonSellCancel = gql`
  mutation dragonSellCancel($serial: String!) {
    dragonSellCancel(serial:$serial) {
      email
      serial
      combination
      name
      birthday
      state
      price
      period
      gen
      cooldown
      parents
      child
      choice_cbg
      choice_sword
      choice_shield
      cintamani
      base_attack
      add_attack
      base_armor
      add_armor
      win
      lose
      winning_rate
      ranking
    }
  }
  `

export { registerUser, login, CheckEmailquery, dragons, finddragon, finduser, addUserDragon, editChoicecbg, editChoicesword, editChoiceshield, finditem, itemPurchase, editUserDragonState, dragonPurchase, dragonSell, dragonSellCancel }
