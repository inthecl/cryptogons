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
    diamond
    gold
    trophy
    icon {
      name
      description
      number
    }
    choice_icon
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
  release_date
  gen
  cooldown
  parents
  child
  choice_cbg
  choice_sword
  choice_shield
  cintamani
  base_damage
  add_damage
  base_armor
  add_armor
  win
  lose
  winning_rate
  ranking
  } 
}
`
const edragons = gql`
query { edragons {
  ename
  edesc
  enumber
  eicon
  egold
  ediamond
  etrophy
  eperiod
  combination
  release_date
  serial
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
  diamond
  gold
  trophy
  icon {
    name
    description
    number
  }
  choice_icon
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
  myDragons
  battle_history {
    mydragon
    mycomb
    enemydragon
    enemycomb
    result
  }
  activity{
    type
    date
    contents
  }
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
    release_date
    gen
    cooldown
    parents
    child
    choice_cbg
    choice_sword
    choice_shield
    cintamani
    base_damage
    add_damage
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
    release_date
    gen
    cooldown
    parents
    child
    choice_cbg
    choice_sword
    choice_shield
    cintamani
    base_damage
    add_damage
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
    release_date
    gen
    cooldown
    parents
    child
    choice_cbg
    choice_sword
    choice_shield
    cintamani
    base_damage
    add_damage
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
    release_date
    gen
    cooldown
    parents
    child
    choice_cbg
    choice_sword
    choice_shield
    cintamani
    base_damage
    add_damage
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
    option
    gold
    diamond
    trophy
    eicon
    eperiod
  }
  shield {
    number
    name
    description
    option
    gold
    diamond
    trophy
    eicon
    eperiod
  }
  cbg {
    number
    name
    description
    option
    gold
    diamond
    trophy
    eicon
    eperiod
  }
 }
}
`
const itemPurchase = gql`
mutation itemPurchase($email: String!, $item: String!, $number: String!, $currency: String!) {
  itemPurchase(email:$email, item:$item, number:$number,  currency:$currency) {
    email
    username
    diamond
    gold
    trophy
    icon {
      name
      description
      number
    }
    choice_icon
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
    myDragons
    activity{
      type
      date
      contents
    }
   }
  }
  `

const editUserDragonState = gql`
  mutation editUserDragonState($serial: String!, $change_state: String!) {
    editUserDragonState(serial:$serial, change_state: $change_state) {
      email
      serial
      combination
      name
      birthday
      state
      price
      period
      release_date
      gen
      cooldown
      parents
      child
      choice_cbg
      choice_sword
      choice_shield
      cintamani
      base_damage
      add_damage
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
      release_date
      gen
      cooldown
      parents
      child
      choice_cbg
      choice_sword
      choice_shield
      cintamani
      base_damage
      add_damage
      base_armor
      add_armor
      win
      lose
      winning_rate
      ranking
   }
  }
  `
const edragonPurchase = gql`
  mutation edragonPurchase($email: String!, $serial: String!, $currency: String!) {
    edragonPurchase(email:$email, serial:$serial, currency:$currency) {
      email
      serial
      combination
      name
      birthday
      state
      price
      period
      release_date
      gen
      cooldown
      parents
      child
      choice_cbg
      choice_sword
      choice_shield
      cintamani
      base_damage
      add_damage
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
      release_date
      gen
      cooldown
      parents
      child
      choice_cbg
      choice_sword
      choice_shield
      cintamani
      base_damage
      add_damage
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
      release_date
      gen
      cooldown
      parents
      child
      choice_cbg
      choice_sword
      choice_shield
      cintamani
      base_damage
      add_damage
      base_armor
      add_armor
      win
      lose
      winning_rate
      ranking
    }
  }
  `

const dragonSiring = gql`
  mutation dragonSiring($serial: String!, $diamond: Int!, $period: Int!) {
    dragonSiring(serial:$serial, diamond:$diamond, period:$period) {
      email
      serial
      combination
      name
      birthday
      state
      price
      period
      release_date
      gen
      cooldown
      parents
      child
      choice_cbg
      choice_sword
      choice_shield
      cintamani
      base_damage
      add_damage
      base_armor
      add_armor
      win
      lose
      winning_rate
      ranking
    }
  }
  `

const dragonSiringCancel = gql`
  mutation dragonSiringCancel($serial: String!) {
    dragonSiringCancel(serial:$serial) {
      email
      serial
      combination
      name
      birthday
      state
      price
      period
      release_date
      gen
      cooldown
      parents
      child
      choice_cbg
      choice_sword
      choice_shield
      cintamani
      base_damage
      add_damage
      base_armor
      add_armor
      win
      lose
      winning_rate
      ranking
    }
  }
  `

const dragonSiringPurchase = gql`
  mutation dragonSiringPurchase($email: String!, $new_comb: String!, $parents: [String]!, $diamond: Int!) {
    dragonSiringPurchase(email:$email, new_comb:$new_comb, parents:$parents, diamond:$diamond) {
      email
      serial
      combination
      name
      birthday
      state
      price
      period
      release_date
      gen
      cooldown
      parents
      child
      choice_cbg
      choice_sword
      choice_shield
      cintamani
      base_damage
      add_damage
      base_armor
      add_armor
      win
      lose
      winning_rate
      ranking
   }
  }
  `

const dragonGift = gql`
  mutation dragonGift($email: String!, $serial: String!, $recipient: String!) {
    dragonGift(email:$email, serial:$serial, recipient:$recipient) {
      email
      serial
      combination
      name
      birthday
      state
      price
      period
      release_date
      gen
      cooldown
      parents
      child
      choice_cbg
      choice_sword
      choice_shield
      cintamani
      base_damage
      add_damage
      base_armor
      add_armor
      win
      lose
      winning_rate
      ranking
   }
  }
  `

const battleStart = gql`
  mutation battleStart($email: String!, $serial: String!) {
    battleStart(email:$email, serial:$serial) {
      email
      serial
      combination
      name
      birthday
      state
      price
      period
      release_date
      gen
      cooldown
      parents
      child
      choice_cbg
      choice_sword
      choice_shield
      cintamani
      base_damage
      add_damage
      base_armor
      add_armor
      win
      lose
      winning_rate
      ranking
   }
  }
  `

const battleCancle = gql`
  mutation battleCancle($email: String!, $serial: String!) {
    battleCancle(email:$email, serial:$serial) {
      email
      serial
      combination
      name
      birthday
      state
      price
      period
      release_date
      gen
      cooldown
      parents
      child
      choice_cbg
      choice_sword
      choice_shield
      cintamani
      base_damage
      add_damage
      base_armor
      add_armor
      win
      lose
      winning_rate
      ranking
   }
  }
  `

const battleUpdate = gql`
  mutation battleUpdate($email: String!){
    battleUpdate(email:$email) {
    email
    username
    diamond
    gold
    trophy
    icon {
      name
      description
      number
    }
    choice_icon
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
    myDragons
    battle_history {
      mydragon
      mycomb
      enemydragon
      enemycomb
      result
    }
    activity{
      type
      date
      contents
    }
   }
  }
  `

const editChoiceIcon = gql`
  mutation editChoiceIcon($email: String!, $number: String!){
    editChoiceIcon(email:$email, number:$number) {
    email
    username
    diamond
    gold
    trophy
    icon {
      name
      description
      number
    }
    choice_icon
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
    myDragons
    battle_history {
      mydragon
      mycomb
      enemydragon
      enemycomb
      result
    }
    activity{
      type
      date
      contents
    }
   }
  }
  `
const findbadge = gql`
  mutation findbadge($email: String!){
    findbadge(email:$email) {
    email
    username
    choice_icon
   }
  }
  `
const findprofile = gql`
query findprofile($username: String!){
  findprofile(username:$username) {
  email
  username
  diamond
  gold
  trophy
  icon {
    name
    description
    number
  }
  choice_icon
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
  myDragons
  battle_history {
    mydragon
    mycomb
    enemydragon
    enemycomb
    result
  }
  activity{
    type
    date
    contents
  }
 }
}
`
const dragonNameChange = gql`
mutation dragonNameChange($email: String!, $serial: String!, $name: String!) {
  dragonNameChange(email:$email, serial:$serial, name:$name) {
    email
    serial
    combination
    name
    birthday
    state
    price
    period
    release_date
    gen
    cooldown
    parents
    child
    choice_cbg
    choice_sword
    choice_shield
    cintamani
    base_damage
    add_damage
    base_armor
    add_armor
    win
    lose
    winning_rate
    ranking
   }
  }
  `

const addUserIcon = gql`
mutation addUserIcon($email: String!, $number: String!) {
  addUserIcon(email:$email, number:$number) {
    email
    username
    diamond
    gold
    trophy
    icon {
      name
      description
      number
    }
    choice_icon
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
    myDragons
    battle_history {
      mydragon
      mycomb
      enemydragon
      enemycomb
      result
    }
    activity{
      type
      date
      contents
    }
  }
}
`

export { registerUser, login, CheckEmailquery, dragons, finddragon, finduser, addUserDragon, editChoicecbg, editChoicesword, editChoiceshield, finditem, itemPurchase, editUserDragonState, dragonPurchase, dragonSell, dragonSellCancel, dragonSiring, dragonSiringCancel, dragonSiringPurchase, dragonGift, battleStart, battleCancle, battleUpdate, editChoiceIcon, findbadge, findprofile, dragonNameChange, edragons, edragonPurchase, addUserIcon }
