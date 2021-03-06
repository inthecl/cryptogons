cryptogons backend

// 마켓에 기본용 추가 : 가격(price)만 입력
mutation{
  addDragon(price: ?) {
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
// 이벤트용 추가 : 용/아이콘이미지를 폴더에 추가 -> addIcons 실행 -> 이벤트드래곤생성 egold or ediamond or etrophy(지불방법 2가지,3가지도 가능)
mutation{
  addeDragon(ename: "", edesc: "", enumber: "", eicon: "아이콘번호", ediamond: ?, eperio: 120000) {
    ename
    enumber
    eicon
    egold
    ediamond
    etrophy
    eperiod
    combination
    release_date
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
  icon {
    name
    description
    number
  }
  choice_icon
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

// cbg 추가
(type: "!", name:"!", description:"!", number:"!", gold: !, diamond: !, trophy: !)
// sword/shield 추가, option에 공격력/방어력 추가입력
(type: "!", name:"!", description:"!", option: "", number:"!", gold: !, diamond: !, trophy: !)
// 이벤트아이템 추가방법 : 아이템/아이콘이미지를 폴더에 추가 -> addIcons 실행 -> 이벤트아이템 생성, eicon(아이콘번호), eperiod 추가입력
(type: "!", name:"!", description:"!", option: "", number:"!", gold: !, diamond: !, trophy: !, eicon: "", eperiod: "")
mutation{
  addItemshop(type: "!", name:"!", description:"!", option: "", number:"!", gold: !, diamond: !, trophy: !) {
    sword {
      name
      description
      option
      number
      gold
      diamond
      trophy
    }
    shield {
      name
      description
      option
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

// 아이콘 추가 : 아이콘이미지 폴더에 추가 -> 아이콘추가조건(이벤트 제외)을 activity.js, mygon.js, myinfo.js 업데이트
mutation{
  addIcons(number:"01", name:"Starter", description:"begin") {
    name
    number
    description
  }
}

// 유저 아이콘 추가 
// 아이콘"01"은 registerUser 아이디생성시 추가
// 이벤트용/아이템의 증정 아이콘은 edragonPurchase, itemPurchase 구매시 추가
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
  activity
 }
}