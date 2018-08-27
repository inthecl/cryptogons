cryptogons backend

mutation{
  addUserDragon(email:"hjkim.email", comb:"123", choice_comb:"345",new_comb:"01050201020302030102020302",name:"dragon10") {
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
      serialw
      choice_cbg
    }
  }
}

new_comb 가 user.dragons 에 추가됨

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
  addItemSword(number:"??", gold: ?, diamond: ?, trophy: ?) {
    sword {
      number
      gold
      diamond
      trophy
    }
    shield {
      number
      gold
      diamond
      trophy
    }
    cbg {
      number
      gold
      diamond
      trophy
    }
  }
}

아이템샵 Sword 추가 mutation, Shield,Cbg는 addItemSword에서 Sword만 변경