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
  } 
}
`
const dragons = gql`
query { dragons {
  name
  combination
  birthday
  price
  serial
} }
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
  dragons {
    name
    combination
    birthday
    price
    serial
    choice_cbg
    choice_sword
    choice_shield
  }
 }
}
`
const addUserDragon = gql`
mutation addUserDragon($email: String!, $new_comb: String!) {
  addUserDragon(email:$email, new_comb:$new_comb) {
    email
  username
  name
  diamond
  gold
  trophy
  iconNum
  cbg {
    number
    name
    description
    gold
    diamond
    trophy
  }
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
  dragons {
    name
    combination
    birthday
    price
    serial
    choice_cbg
    choice_sword
    choice_shield
  }
 }
}
`
const editChoicecbg = gql`
mutation editChoicecbg($email: String!, $serial: String!, $choice_cbg: String!) {
  editChoicecbg(email:$email, serial:$serial, choice_cbg:$choice_cbg) {
    email
    username
    name
    diamond
    gold
    iconNum
    cbg {
      number
      name
      description
      gold
      diamond
      trophy
    }
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
    dragons {
      name
      combination
      birthday
      price
      serial
      choice_cbg
      choice_sword
      choice_shield
    }
   }
  }
  `
const editChoicesword = gql`
mutation editChoicesword($email: String!, $serial: String!, $choice_sword: String!) {
  editChoicesword(email:$email, serial:$serial, choice_sword:$choice_sword) {
    email
    username
    name
    diamond
    gold
    iconNum
    cbg {
      number
      name
      description
      gold
      diamond
      trophy
    }
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
    dragons {
      name
      combination
      birthday
      price
      serial
      choice_cbg
      choice_sword
      choice_shield
    }
   }
  }
  `
const editChoiceshield = gql`
mutation editChoiceshield($email: String!, $serial: String!, $choice_shield: String!) {
  editChoiceshield(email:$email, serial:$serial, choice_shield:$choice_shield) {
    email
    username
    name
    diamond
    gold
    iconNum
    cbg {
      number
      name
      description
      gold
      diamond
      trophy
    }
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
    dragons {
      name
      combination
      birthday
      price
      serial
      choice_cbg
      choice_sword
      choice_shield
    }
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
    dragons {
      name
      combination
      birthday
      price
      serial
      choice_cbg
    }
   }
  }
  `

export { registerUser, login, CheckEmailquery, dragons, finddragon, finduser, addUserDragon, editChoicecbg, editChoicesword, editChoiceshield, finditem, itemPurchase }