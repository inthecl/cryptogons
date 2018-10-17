cryptogons backend

// dragons에 New추가
mutation{
  addDragon(price: 100) {
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

// dragons 배경, 검, 방패 수정
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

mutation addUserDragon($email: String!, $new_comb: String!, $parents: [String]!) {
  addUserDragon(email:$email, new_comb:$new_comb, parents: $parents) {
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
}

new_comb 가 user.dragons 에 추가됨(Breed)

mutation{
  removeUserDragon(email:"hjkim.email", comb:"0") {
    email
    username
    name
    diamond
    gold
    iconNum
    dragons {
      name
      combination
      birthday
      price
      serial
    }
  }
}

comb 가 user.dragons 에서 삭제됨
comb 가 "0" 이면 모든 dragons가 삭제됨

mutation{
  editChoicecbg(email:"hjkim.email", serial:"98674883035684525978", choice_cbg:"02") {
    email
    username
    name
    diamond
    gold
    iconNum
    cbg
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

user.dragons 에서 serial 이 매칭되는 dragons에 대해 choice_cbg를 업데이트 하는 mutation

mutation{
  addItemSword(name:"??", description:"??", number:"??", gold: ?, diamond: ?, trophy: ?) {
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
    cbg {
      name
      description
      number
      gold
      diamond
      trophy
    }
  }
}

아이템샵 Sword 추가 mutation, Shield,Cbg는 addItemSword에서 Sword만 변경