import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import generator from 'generate-serial-number'
import { createConfirmEmailLink } from './utils/createConfirmEmailLink'
import { sendEmail } from './utils/sparkPost'

const resolvers = {
  Query: {
    books: async (obj, args, ctx) => ctx.models.Book.find(),
    findbook: async (obj, args, ctx) => ctx.models.Book.findOne({ id: args.id }),
    users: async (obj, args, ctx) => ctx.models.User.find(),
    checkemail: async (obj, args, ctx) => ctx.models.User.findOne({ email: args.email }),
    dragons: async (obj, args, ctx) => ctx.models.Dragon.find(),
    edragons: async (obj, args, ctx) => ctx.models.eDragon.find(),
    finddragon: async (obj, args, ctx) => ctx.models.Dragon.findOne({ serial: args.serial }),
    statistic: async (obj, args, ctx) => ctx.models.Statistic.findOne(),
    finduser: async (obj, args, ctx) => ctx.models.User.findOne({ email: args.email }),
    finditem: async (obj, args, ctx) => ctx.models.Item.findOne(),
    items: async (obj, args, ctx) => ctx.models.Item.find(),
    findprofile: async (obj, args, ctx) => ctx.models.User.findOne({ username: args.username })
  },
  Mutation: {
    resetCount: async (obj, args, ctx) => {
      const one = await new ctx.models.Statistic(args)
      return one.save()
    },
    // Breed 내꺼끼리 교배
    addUserDragon: async (obj, args, ctx) => {
      let serial = String(generator.generate(20))

      const user = await ctx.models.User.findOne({ email: args.email }) // 유저 dragonsNumber에 새로운 용 시리얼 추가
      user.myDragons.push(serial)

      const xdragon = await ctx.models.Dragon.findOne({ serial: args.parents[0] })
      const coodTimeX = Date.now() + 120000 // 임시 2분 쿨타임
      xdragon.state = 'Resting' // 부의 state 변경
      xdragon.child.push(serial) // 부의 child에 자식 시리얼 추가
      xdragon.cooldown = ['Very fast', coodTimeX] // 현재 cooldown[0] 쿨타임등급, cooldown[1] 쿨타임시간 미설정

      const ydragon = await ctx.models.Dragon.findOne({ serial: args.parents[1] })
      const coodTimeY = Date.now() + 120000 // 임시 2분 쿨타임
      ydragon.state = 'brooding' // 모의 state 변경
      ydragon.child.push(serial) // 모의 child에 자식 시리얼 추가
      ydragon.cooldown = ['Very fast', coodTimeY]// 현재 cooldown[0] 쿨타임등급, cooldown[1] 쿨타임시간 미설정

      // 새로운 용의 세대 계산
      let ngen = null
      if (xdragon.gen === ydragon.gen) {
        ngen = xdragon.gen + 1
      }
      if (xdragon.gen < ydragon.gen) {
        ngen = ydragon.gen + 1
      }
      if (xdragon.gen > ydragon.gen) {
        ngen = xdragon.gen + 1
      }

      const evolution = args.new_comb.substring(0, 2)
      let baseDamage = null
      let baseArmor = null
      if (evolution === '01') {
        baseDamage = Math.floor(Math.random() * 5) + 5 // 5 ~ 9
        baseArmor = Math.floor(Math.random() * 5) + 5 // 5 ~ 9
      }
      if (evolution === '02' || evolution === '04') {
        baseDamage = Math.floor(Math.random() * 5) + 7 // 7 ~ 11
        baseArmor = Math.floor(Math.random() * 5) + 7 // 7 ~ 11
      }
      if (evolution === '03') {
        baseDamage = Math.floor(Math.random() * 5) + 9 // 9 ~ 13
        baseArmor = Math.floor(Math.random() * 5) + 9 // 9 ~ 13
      }
      let test = Object.assign({
        email: args.email,
        serial: serial,
        combination: args.new_comb,
        name: 'dragon_name',
        birthday: String(Date.now()),
        state: 'Egg',
        price: 0,
        period: 0,
        release_date: null,
        gen: ngen,
        cooldown: ['Very fast', coodTimeY],
        parents: args.parents,
        child: [],
        choice_cbg: 'null',
        choice_sword: 'null',
        choice_shield: 'null',
        cintamani: [],
        base_damage: baseDamage,
        add_damage: 0,
        base_armor: baseArmor,
        add_armor: 0,
        win: 0,
        lose: 0,
        winning_rate: 0,
        ranking: 0
      })
      const bdragon = await ctx.models.Dragon(test)

      const activity = Object.assign({
        type: 'breed',
        date: Date(),
        contents: [xdragon.serial, ydragon.serial, serial] // 규칙 부 시리얼, 모 시리얼, 자 시리얼
      })
      user.activity.push(activity)

      return bdragon.save(), user.save(), xdragon.save(), ydragon.save()
    },
    removeUserDragon: async (obj, args, ctx) => {
      const user = await ctx.models.User.findOne({email:args.email})
      if (args.comb === '0') {
        user.dragons = []
      } else {
        let idx = user.dragons.findIndex((elem) => {
          return elem.combination == args.comb
        })
        delete user.dragons[idx]
      }
      console.log(user)
      return user.save()
    },
    // market에 New용 추가
    addDragon: async (obj, args, ctx) => { 
      console.log(args)
      const dragon = Object.assign(args)
      const statistic = await ctx.models.Statistic.findOne()
      dragon.email = 'devman'
      let tmp = '01'
      const dragons = await ctx.models.Dragon.find()
      console.log(dragons)
      while (dragons.length !== 0) {
        tmp += `0${String(Math.floor(Math.random() * 5) + 1)}`
        for (let i = 0; i < 11; i += 1) {
          tmp += `0${String(Math.floor(Math.random() * 3) + 1)}`
        }
        let i = 0
        for (i = 0; i < dragons.length; i += 1) {
          if (dragons[i].combination === tmp) {
            break
          }
        }
        if (i === dragons.length) {
          break
        }
      }
      dragon.name = `dragon${statistic.dragoncount}`
      dragon.combination = tmp
      dragon.state = 'New'
      dragon.cooldown = ['Very fast', null]
      dragon.birthday = String(Date.now())
      dragon.price = args.price
      dragon.period = 0
      dragon.release_date = String(Date.now())
      dragon.gen = 0
      dragon.parents = ['devman']
      dragon.child = []
      dragon.choice_cbg = 'null'
      dragon.choice_sword = 'null'
      dragon.choice_shield = 'null'
      dragon.cintamani = []
      dragon.base_damage = Math.floor(Math.random() * 5) + 5 // 출시 할 1단계용과 이벤트용의 기본데미지, 기본아머는 같다
      dragon.add_damage = 0
      dragon.base_armor = Math.floor(Math.random() * 5) + 5
      dragon.add_armor = 0
      dragon.win = 0
      dragon.lose = 0
      dragon.winning_rate = 0
      dragon.ranking = 0
      const one = await new ctx.models.Dragon(dragon)
      one.serial = one._id
      console.log(one)
      statistic.dragoncount += 1
      statistic.save()
      return one.save()
    },
    addeDragon: async (obj, args, ctx) => {
      const edragon = args
      const property = `0${String(Math.floor(Math.random() * 5) + 1)}` // 속성, 2자리 01~05까지 랜덤
      edragon.ename = args.ename
      edragon.edesc = args.edesc
      edragon.enumber = args.enumber
      edragon.eicon = args.eicon
      edragon.egold = args.egold
      edragon.ediamond = args.ediamond
      edragon.etrophy = args.etrophy
      edragon.eperiod = Date.now() + Number(args.eperiod)
      edragon.combination = '05' + property + args.enumber + args.eicon
      edragon.release_date = String(Date.now())
      const newevent = await new ctx.models.eDragon(edragon)
      newevent.serial = newevent._id
      return newevent.save()
    },
    // dragons 배경, 검, 방패 수정
    editChoicecbg: async (obj, args, ctx) => {
      const dragon = await ctx.models.Dragon.findOne({ serial: args.serial })
      dragon.choice_cbg = args.choice_cbg
      return dragon.save()
    },
    editChoicesword: async (obj, args, ctx) => {
      const dragon = await ctx.models.Dragon.findOne({ serial: args.serial })
      const items = await ctx.models.Item.findOne()
      dragon.choice_sword = args.choice_sword
      if (args.choice_sword !== 'null') {
        dragon.add_damage = items.sword[args.choice_sword.substring(1) - 1].option
      } else {
        dragon.add_damage = 0
      }
      return dragon.save()
    },
    editChoiceshield: async (obj, args, ctx) => {
      const dragon = await ctx.models.Dragon.findOne({ serial: args.serial })
      const items = await ctx.models.Item.findOne()
      dragon.choice_shield = args.choice_shield
      if (args.choice_shield !== 'null') {
        dragon.add_armor = items.shield[args.choice_shield.substring(1) - 1].option
      } else {
        dragon.add_armor = 0
      }
      return dragon.save()
    },
    editUserDragonState: async (obj, args, ctx) => {
      const dragon = await ctx.models.Dragon.findOne({ serial: args.serial })
      dragon.state = args.change_state
      return dragon.save()
    },
    addBook: async (obj, args, ctx) => {
      const one = await new ctx.models.Book(args)
      one.id = one._id
      console.log(one)
      return one.save()
    },
    registerUser: async (obj, args, ctx) => {
      const user = args
      user.password = await bcrypt.hash(user.password, 12)
      user.confirmed = false
      user.diamond = 3000
      user.gold = 1000
      user.trophy = 10
      user.icon = []
      const test = Object.assign({
        number: '01',
        name: 'Starter',
        description: 'begin'
      })
      user.icon.push(test)
      user.choice_icon = '01'
      const newone = await new ctx.models.User(user)
      console.log(newone)
      //const link = createConfirmEmailLink(user.username)
      //console.log(link)
      //sendEmail(user.email, link)
      return newone.save()
    },
    registerItem: async (obj, args, ctx) => {
      const item = args
      item.sword = []
      item.shield = []
      item.cbg = []
      const newone = await new ctx.models.Item(item)
      console.log(newone)
      //const link = createConfirmEmailLink(user.username)
      //console.log(link)
      //sendEmail(user.email, link)
      return newone.save()
    },
    battleStart: async (obj, args, ctx) => {
      const user = await ctx.models.User.findOne({ email: args.email }) // 1p 유저
      let enemyuser = null // 2p 유저
      const dragon = await ctx.models.Dragon.findOne({ serial: args.serial }) // 1p 용
      let enemydragon = null // 2p 용
      const queues = await ctx.models.Queue.findOne() // 대기열
      let waiting = false
      if (!queues.queue[0]) { // 대기열이 없을때 ????
        waiting = false
        queues.queue.push(args.serial)
        dragon.state = 'Matching'
      } else {
        waiting = true
        enemydragon = await ctx.models.Dragon.findOne({ serial: queues.queue[0] }) // ????
        enemyuser = await ctx.models.User.findOne({ myDragons: queues.queue[0] })

        let userScout = (dragon.base_damage + dragon.add_damage) - (enemydragon.base_armor + enemydragon.add_armor) // 1p 공격력
        let enemyScout = (enemydragon.base_damage + enemydragon.add_damage) - (dragon.base_armor + dragon.add_armor) // 2p 공격력

        // 속성에 따른 데미지 01(목), 02(화), 03(토), 04(금), 05(수)
        const property1p = dragon.combination.substring(2, 4)
        const property2p = enemydragon.combination.substring(2, 4)
        if (property1p === '01' && property2p === '04') {
          userScout -= 1
        }
        if (property1p === '01' && property2p === '03') {
          userScout += 1
        }
        if (property1p === '03' && property2p === '01') {
          userScout -= 1
        }
        if (property1p === '03' && property2p === '05') {
          userScout += 1
        }
        if (property1p === '05' && property2p === '03') {
          userScout -= 1
        }
        if (property1p === '05' && property2p === '02') {
          userScout += 1
        }
        if (property1p === '02' && property2p === '05') {
          userScout -= 1
        }
        if (property1p === '02' && property2p === '04') {
          userScout += 1
        }
        if (property1p === '04' && property2p === '02') {
          userScout -= 1
        }
        if (property1p === '04' && property2p === '01') {
          userScout += 1
        }

        if (userScout === enemyScout) {
          const luck = Math.floor(Math.random() * 2)
          if (luck === 0) {
            userScout += 1
          } else {
            enemyScout += 1
          }
        }
        if (userScout > enemyScout) {
          const input1p = Object.assign({
            mydragon: args.serial,
            mycomb: dragon.combination,
            enemydragon: queues.queue[0],
            enemycomb: enemydragon.combination,
            result: 'win'
          })
          user.battle_history.push(input1p)
          const input2p = Object.assign({
            mydragon: queues.queue[0],
            mycomb: enemydragon.combination,
            enemydragon: args.serial,
            enemycomb: dragon.combination,
            result: 'lose'
          })
          enemyuser.battle_history.push(input2p)
        }
        if (userScout < enemyScout) {
          const input1p = Object.assign({
            mydragon: args.serial,
            mycomb: dragon.combination,
            enemydragon: queues.queue[0],
            enemycomb: enemydragon.combination,
            result: 'lose'
          })
          user.battle_history.push(input1p)
          const input2p = Object.assign({
            mydragon: queues.queue[0],
            mycomb: enemydragon.combination,
            enemydragon: args.serial,
            enemycomb: dragon.combination,
            result: 'win'
          })
          enemyuser.battle_history.push(input2p)
        }

        dragon.state = 'during battle'
        enemydragon.state = 'during battle'
        dragon.cooldown = ['Very fast', Date.now() + 120000] // 임시 2분 쿨타임
        enemydragon.cooldown = ['Very fast', Date.now() + 120000]
      }

      if (!waiting) { // 대기열이 없을때
        return queues.save(), dragon.save()
      }
      if (waiting) {
        queues.queue.shift()
        return queues.save(), user.save(), enemyuser.save(), enemydragon.save(), dragon.save()
      }
    },
    battleCancle: async (obj, args, ctx) => {
      const dragon = await ctx.models.Dragon.findOne({ serial: args.serial }) // 나의 용
      const queues = await ctx.models.Queue.findOne() // 대기열
      if (dragon.state === 'Matching') {
        dragon.state = 'Normal'
        queues.queue.pull(dragon.serial)
      }
      return queues.save(), dragon.save()
    },
    battleUpdate: async (obj, args, ctx) => {
      const user = await ctx.models.User.findOne({ email: args.email })

      const input1p = await ctx.models.Dragon.findOne({ serial: user.battle_history[user.battle_history.length - 1].mydragon })
      const input2p = await ctx.models.Dragon.findOne({ serial: user.battle_history[user.battle_history.length - 1].enemydragon })
      if (user.battle_history[user.battle_history.length - 1].result === 'win') {
        input1p.win += 1
        input2p.lose += 1
      }
      if (user.battle_history[user.battle_history.length - 1].result === 'lose') {
        input1p.lose += 1
        input2p.win += 1
      }
      input1p.winning_rate = parseInt((input1p.win / (input1p.win + input1p.lose)) * 100, 10)
      input2p.winning_rate = parseInt((input2p.win / (input2p.win + input2p.lose)) * 100, 10)
      input1p.state = 'Normal'
      input2p.state = 'Normal'

      return input1p.save(), input2p.save(), user.save()
    },
    addItemshop: async (obj, args, ctx) => {
      const test = Object.assign({
        name: args.name,
        description: args.description,
        option: args.option,
        number: args.number,
        gold: args.gold,
        diamond: args.diamond,
        trophy: args.trophy,
        eicon: args.eicon,
        eperiod: Date.now() + Number(args.eperiod)
      })
      const item = await ctx.models.Item.findOne()
      if (args.type === 'sword') {
        item.sword.push(test)
      }
      if (args.type === 'shield') {
        item.shield.push(test)
      }
      if (args.type === 'cbg') {
        item.cbg.push(test)
      }
      return item.save()
    },
    itemPurchase: async (obj, args, ctx) => {
      const user = await ctx.models.User.findOne({ email: args.email }) // 구매자
      const items = await ctx.models.Item.findOne() // 구매아이템
      const itemType = args.item
      const num = args.number
      const curr = args.currency
      let price = null
      let inputDia = null
      let inputGold = null
      let inputTrophy = null
      let payment = false

      let purchaseItem = null
      if (itemType === 'sword') {
        purchaseItem = items.sword[num.substring(1) - 1]
      }
      if (itemType === 'shield') {
        purchaseItem = items.shield[num.substring(1) - 1]
      }
      if (itemType === 'custom_bg') {
        purchaseItem = items.cbg[num.substring(1) - 1]
      }

      if (curr === 'diamond') {
        if (user.diamond >= purchaseItem.diamond) {
          user.diamond -= purchaseItem.diamond
          price = purchaseItem.diamond
          payment = true
          inputDia = purchaseItem.diamond
          inputGold = 0
          inputTrophy = 0
        }
      }
      if (curr === 'gold') {
        if (user.gold >= purchaseItem.gold) {
          user.gold -= purchaseItem.gold
          price = purchaseItem.gold
          payment = true
          inputDia = 0
          inputGold = purchaseItem.gold
          inputTrophy = 0
        }
      }
      if (curr === 'trophy') {
        if (user.trophy >= purchaseItem.trophy) {
          user.trophy -= purchaseItem.trophy
          price = purchaseItem.trophy
          payment = true
          inputDia = 0
          inputGold = 0
          inputTrophy = purchaseItem.trophy
        }
      }

      if (payment === true) {
        if (itemType === 'sword') {
          const sword = Object.assign({
            name: purchaseItem.name,
            description: purchaseItem.description,
            option: purchaseItem.option,
            number: purchaseItem.number,
            diamond: inputDia,
            gold: inputGold,
            trophy: inputTrophy
          })
          user.sword.push(sword)
        }
        if (args.item === 'shield') {
          const shield = Object.assign({
            name: purchaseItem.name,
            description: purchaseItem.description,
            option: purchaseItem.option,
            number: purchaseItem.number,
            diamond: inputDia,
            gold: inputGold,
            trophy: inputTrophy
          })
          user.shield.push(shield)
        }
        if (args.item === 'custom_bg') {
          const cbg = Object.assign({
            name: purchaseItem.name,
            description: purchaseItem.description,
            option: purchaseItem.option,
            number: purchaseItem.number,
            diamond: inputDia,
            gold: inputGold,
            trophy: inputTrophy
          })
          user.cbg.push(cbg)
        }

        let activity = null
        // 일반아이템 activity 추가
        if (purchaseItem.eicon === null) {
          activity = Object.assign({
            type: 'item',
            date: Date(),
            contents: [itemType, purchaseItem.name, curr, price] // 규칙 아이템종류, 아이템이름, 지불방법, 가격
          })
        } else {
          // 이벤트아이콘 추가
          let ownicon = false
          for (let i = 0; i < user.icon.length; i += 1) {
            if (user.icon[i].number === purchaseItem.eicon) {
              ownicon = true
            }
          }
          if (ownicon === false) {
            const test = Object.assign({
              number: purchaseItem.eicon,
              name: purchaseItem.name,
              description: purchaseItem.description
            })
            user.icon.push(test)
          }
          // 이벤트아이템 activity 추가
          activity = Object.assign({
            type: 'eitem',
            date: Date(),
            contents: [itemType, purchaseItem.name, curr, price]
          })
        }
        user.activity.push(activity)
      }

      return user.save()
    },
    dragonPurchase: async (obj, args, ctx) => {
      const dragon = await ctx.models.Dragon.findOne({ serial: args.serial }) // 판매용
      let seller = null // 판매자
      const buyer = await ctx.models.User.findOne({ email: args.email }) // 구매자

      if (buyer.diamond >= args.diamond) {
        if (Date.now() <= dragon.cooldown[1] || dragon.cooldown[1] === null) {
          if (dragon.state === 'New' || dragon.state === 'Sell') {
            buyer.diamond -= args.diamond
            buyer.myDragons.push(args.serial)

            if (dragon.email === 'devman') {
              dragon.email = args.email
              dragon.state = 'Normal'

              const activity = Object.assign({
                type: 'dragonPurchase',
                date: Date(),
                contents: ['devman', buyer.username, dragon.serial, args.diamond] // 규칙 판매자 이름, 구매자 이름, 용 시리얼, 가격
              })
              buyer.activity.push(activity)
            } else {
              seller = await ctx.models.User.findOne({ email: dragon.email })
              seller.diamond += args.diamond
              seller.myDragons.pull(args.serial)

              dragon.email = args.email
              dragon.name = 'Purchased Dragons'
              dragon.state = 'Normal'
              dragon.choice_cbg = 'null'
              dragon.choice_sword = 'null'
              dragon.choice_shield = 'null'
              dragon.win = 0
              dragon.lose = 0
              dragon.winning_rate = 0
              dragon.ranking = 0

              const activity = Object.assign({
                type: 'dragonPurchase',
                date: Date(),
                contents: [seller.username, buyer.username, dragon.serial, args.diamond] // 규칙 판매자 이름, 구매자 이름, 용 시리얼, 가격
              })
              seller.activity.push(activity)
              buyer.activity.push(activity)
            }
          }
        }
      }

      if (seller === null) {
        return buyer.save(), dragon.save()
      }
      if (seller !== null) {
        return seller.save(), buyer.save(), dragon.save()
      }
    },
    edragonPurchase: async (obj, args, ctx) => {
      const edragon = await ctx.models.eDragon.findOne({ serial: args.serial }) // 판매용
      const buyer = await ctx.models.User.findOne({ email: args.email }) // 구매자
      const curr = args.currency // 지불방법
      let one = null // 새로운 용
      let payment = false
      let price = null

      if (Date.now() <= edragon.eperiod) { // 이벤트기간인지 확인
        if (curr === 'gold') {
          if (buyer.gold >= edragon.egold) {
            buyer.gold -= edragon.egold
            payment = true
            price = edragon.egold
          }
        }
        if (curr === 'dia') {
          if (buyer.diamond >= edragon.ediamond) {
            buyer.diamond -= edragon.ediamond
            payment = true
            price = edragon.ediamond
          }
        }
        if (curr === 'trophy') {
          if (buyer.trophy >= edragon.etrophy) {
            buyer.trophy -= edragon.etrophy
            payment = true
            price = edragon.etrophy
          }
        }

        if (payment === true) { // 지불 확인 후 이벤트용 생성
          const property = `0${String(Math.floor(Math.random() * 5) + 1)}` // 속성, 2자리 01~05까지 랜덤
          const dragon = Object.assign(args)
          dragon.email = args.email
          dragon.name = edragon.ename
          dragon.combination = '05' + property + edragon.enumber + edragon.eicon
          dragon.state = 'Normal'
          dragon.cooldown = ['Very fast', null]
          dragon.birthday = String(Date.now())
          dragon.price = price
          dragon.period = 0
          dragon.release_date = edragon.release_date
          dragon.gen = 0
          dragon.parents = ['devman']
          dragon.child = []
          dragon.choice_cbg = 'null'
          dragon.choice_sword = 'null'
          dragon.choice_shield = 'null'
          dragon.cintamani = []
          dragon.base_damage = Math.floor(Math.random() * 5) + 7 // 2단계용과 이벤트용의 기본데미지, 기본아머는 같다
          dragon.add_damage = 0
          dragon.base_armor = Math.floor(Math.random() * 5) + 7
          dragon.add_armor = 0
          dragon.win = 0
          dragon.lose = 0
          dragon.winning_rate = 0
          dragon.ranking = 0
          one = await new ctx.models.Dragon(dragon)
          one.serial = one._id
          buyer.myDragons.push(one.serial)

          let ownicon = false
          for (let i = 0; i < buyer.icon.length; i += 1) {
            if (buyer.icon[i].number === edragon.eicon) {
              ownicon = true
            }
          }
          if (ownicon === false) {
            const test = Object.assign({
              number: edragon.eicon,
              name: edragon.ename,
              description: edragon.edesc
            })
            buyer.icon.push(test)
          }

          const activity = Object.assign({
            type: 'edragonPurchase',
            date: Date(),
            contents: [one.serial, curr, price] // 규칙 이벤트용 시리얼, 지불방법, 가격
          })
          buyer.activity.push(activity)
        }
      }
      return buyer.save(), one.save()
    },
    dragonSell: async (obj, args, ctx) => {
      const dragon = await ctx.models.Dragon.findOne({ serial: args.serial }) // 판매할 용
      dragon.state = 'Sell'
      dragon.price = args.diamond
      dragon.release_date = String(Date.now())
      let period = null
      if (args.period === 1) {
        period = 60000
      }
      if (args.period === 2) {
        period = 120000
      }
      if (args.period === 3) {
        period = 180000
      }
      dragon.cooldown = ['Very fast', Date.now() + period] // 임시로 쿨타임. args.period로 입력받아야함
      return dragon.save()
    },
    dragonSellCancel: async (obj, args, ctx) => {
      const dragon = await ctx.models.Dragon.findOne({ serial: args.serial }) // 판매할 용
      dragon.state = 'Normal'
      dragon.cooldown = ['Very fast', Date.now()] // 배틀용 리스트는 쿨타임으로 판단한다.
      return dragon.save()
    },
    dragonSiringPurchase: async (obj, args, ctx) => {
      const xdragon = await ctx.models.Dragon.findOne({ serial: args.parents[0] }) // 판매용
      const seller = await ctx.models.User.findOne({ email: xdragon.email }) // 판매자
      const buyer = await ctx.models.User.findOne({ email: args.email }) // 구매자

      let bdragon = null
      let ydragon = null
      if (xdragon.state === 'Siring' && Date.now() <= xdragon.cooldown[1]) {
        // 가격 지불
        seller.diamond += args.diamond
        buyer.diamond -= args.diamond

        // 새로운 용 생성
        const serial = String(generator.generate(20))

        buyer.myDragons.push(serial) // 유저 dragonsNumber에 새로운 용 시리얼 추가

        const coodTimeX = Date.now() + 120000 // 임시 2분 쿨타임
        xdragon.state = 'Resting' // 부의 state 변경
        xdragon.child.push(serial) // 부의 child에 자식 시리얼 추가
        xdragon.cooldown = ['Very fast', coodTimeX] // 현재 cooldown[0] 쿨타임등급, cooldown[1] 쿨타임시간 미설정

        ydragon = await ctx.models.Dragon.findOne({ serial: args.parents[1] })
        const coodTimeY = Date.now() + 120000 // 임시 2분 쿨타임
        ydragon.state = 'brooding' // 모의 state 변경
        ydragon.child.push(serial) // 모의 child에 자식 시리얼 추가
        ydragon.cooldown = ['Very fast', coodTimeY]// 현재 cooldown[0] 쿨타임등급, cooldown[1] 쿨타임시간 미설정

        // 새로운 용의 세대 계산
        let ngen = null
        if (xdragon.gen === ydragon.gen) {
          ngen = xdragon.gen + 1
        }
        if (xdragon.gen < ydragon.gen) {
          ngen = ydragon.gen + 1
        }
        if (xdragon.gen > ydragon.gen) {
          ngen = xdragon.gen + 1
        }

        const evolution = args.new_comb.substring(0, 2)
        let baseDamage = null
        let baseArmor = null
        if (evolution === '01') {
          baseDamage = Math.floor(Math.random() * 5) + 5 // 5 ~ 9
          baseArmor = Math.floor(Math.random() * 5) + 5 // 5 ~ 9
        }
        if (evolution === '02' || evolution === '04') {
          baseDamage = Math.floor(Math.random() * 5) + 7 // 7 ~ 11
          baseArmor = Math.floor(Math.random() * 5) + 7 // 7 ~ 11
        }
        if (evolution === '03') {
          baseDamage = Math.floor(Math.random() * 5) + 9 // 9 ~ 13
          baseArmor = Math.floor(Math.random() * 5) + 9 // 9 ~ 13
        }

        let test = Object.assign({
          email: args.email,
          serial: serial,
          combination: args.new_comb,
          name: 'Siring_dragon',
          birthday: String(Date.now()),
          state: 'Egg',
          price: 0,
          period: 0,
          release_date: null,
          gen: ngen,
          cooldown: ['Very fast', coodTimeY],
          parents: args.parents,
          child: [],
          choice_cbg: 'null',
          choice_sword: 'null',
          choice_shield: 'null',
          cintamani: [],
          base_damage: baseDamage,
          add_damage: 0,
          base_armor: baseArmor,
          add_armor: 0,
          win: 0,
          lose: 0,
          winning_rate: 0,
          ranking: 0
        })
        bdragon = await ctx.models.Dragon(test)
      }

      // 규칙 판매자 이름, 구매자 이름, 판매용 시리얼, 구매용 시리얼, 새로운용 시리얼, 가격
      const activity = Object.assign({
        type: 'siringPurchase',
        date: Date(),
        contents: [seller.username, buyer.username, xdragon.serial, ydragon.serial, bdragon.serial, args.diamond]
      })
      buyer.activity.push(activity)
      seller.activity.push(activity)

      return seller.save(), buyer.save(), bdragon.save(), xdragon.save(), ydragon.save()
    },
    dragonSiring: async (obj, args, ctx) => {
      const dragon = await ctx.models.Dragon.findOne({ serial: args.serial }) // 판매할 용
      dragon.state = 'Siring'
      dragon.price = args.diamond
      dragon.release_date = String(Date.now())
      let period = null
      if (args.period === 1) {
        period = 60000
      }
      if (args.period === 2) {
        period = 120000
      }
      if (args.period === 3) {
        period = 180000
      }
      dragon.cooldown = ['Very fast', Date.now() + period] // 임시로 쿨타임. args.period로 입력받아야함
      return dragon.save()
    },
    dragonSiringCancel: async (obj, args, ctx) => {
      const dragon = await ctx.models.Dragon.findOne({ serial: args.serial }) // 판매할 용
      dragon.state = 'Normal'
      dragon.cooldown = ['Very fast', Date.now()] // 배틀용 리스트는 쿨타임으로 판단한다.
      return dragon.save()
    },
    dragonGift: async (obj, args, ctx) => {
      const dragon = await ctx.models.Dragon.findOne({ serial: args.serial }) // 선물할 용
      const presenter = await ctx.models.User.findOne({ email: args.email }) // 선물하는 사람
      const recipient = await ctx.models.User.findOne({ email: args.recipient }) // 선물받는 사람

      if (dragon.email === args.email && recipient !== null) {
        presenter.myDragons.pull(args.serial)
        recipient.myDragons.push(args.serial)
        dragon.email = args.recipient
        dragon.name = 'Gifts Dragon'
        dragon.state = 'Normal'
        dragon.choice_cbg = 'null'
        dragon.choice_sword = 'null'
        dragon.choice_shield = 'null'
        dragon.win = 0
        dragon.lose = 0
        dragon.winning_rate = 0
        dragon.ranking = 0
      }

      const activity = Object.assign({
        type: 'gift',
        date: Date(),
        contents: [presenter.username, recipient.username, dragon.serial] // 규칙 선물하는사람 이름, 선물받는사람 이름, 선물할 용 시리얼
      })
      presenter.activity.push(activity)
      recipient.activity.push(activity)

      return presenter.save(), recipient.save(), dragon.save()
    },
    dragonNameChange: async (obj, args, ctx) => {
      const dragon = await ctx.models.Dragon.findOne({ serial: args.serial })
      dragon.name = args.name
      return dragon.save()
    },
    addUserIcon: async (obj, args, ctx) => {
      const user = await ctx.models.User.findOne({ email: args.email })
      const test = Object.assign({
        number: args.number,
        name: args.name,
        description: args.description
      })
      user.icon.push(test)
      return user.save()
    },
    editChoiceIcon: async (obj, args, ctx) => {
      const user = await ctx.models.User.findOne({ email: args.email })
      user.choice_icon = args.number
      return user.save()
    },
    findbadge: async (obj, args, ctx) => {
      const user = await ctx.models.User.findOne({ email: args.email })
      return user.save()
    },
    login: async (obj, args, ctx) => {
      console.log(args)
      const user = await ctx.models.User.findOne({ email: args.email })
      if (!user) {
        throw new Error('아이디없음')
      }
      const valid = await bcrypt.compare(args.password, user.password)
      if (!valid) {
        throw new Error('암호틀림')
      }
      if (!user.confirmed) {
        throw new Error('이메일 확인 필요')
      }

      const token = jwt.sign({ user: user.email }, '!@TESTSECRET!@', { expiresIn: '120m' })
      const refreshToken = jwt.sign({ user: user.email }, '!@TESTSECRET!@', { expiresIn: '7d' })
      console.log(token)
      console.log(refreshToken)
      return { token, refreshToken }
    }
  }
}

export default resolvers
