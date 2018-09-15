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
    finddragon: async (obj, args, ctx) => ctx.models.Dragon.findOne({ serial: args.serial }),
    statistic: async (obj, args, ctx) => ctx.models.Statistic.findOne(),
    finduser: async (obj, args, ctx) => ctx.models.User.findOne({ email: args.email }),
    finditem: async (obj, args, ctx) => ctx.models.Item.findOne(),
    items: async (obj, args, ctx) => ctx.models.Item.find()
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
      user.dragonsNumber.push(serial)

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

      let test = Object.assign({
        email: args.email,
        serial: serial,
        combination: args.new_comb,
        name: 'dragon_name',
        birthday: String(Date.now()),
        state: 'Egg',
        price: 0,
        period: 0,
        gen: ngen,
        cooldown: ['Very fast', coodTimeY],
        parents: args.parents,
        child: [],
        choice_cbg: 'null',
        choice_sword: 'null',
        choice_shield: 'null',
        cintamani: [],
        base_attack: Math.floor(Math.random() * 8) + 20,
        add_attack: 0,
        base_armor: Math.floor(Math.random() * 10) + 5,
        add_armor: 0,
        win: 0,
        lose: 0,
        winning_rate: 0,
        ranking: 0
      })
      const bdragon = await ctx.models.Dragon(test)

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
    // dragons에 New용 추가
    addDragon: async (obj, args, ctx) => { 
      console.log(args)
      const dragon = Object.assign(args)
      const statistic = await ctx.models.Statistic.findOne()
      dragon.email = 'devman'
      dragon.name = `dragon${statistic.dragoncount}`
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
      dragon.combination = tmp
      dragon.birthday = String(Date.now())
      dragon.state = 'New'
      dragon.price = args.price
      dragon.period = 0
      dragon.gen = 0
      dragon.cooldown = ['Very fast', '0']
      dragon.parents = ['devman']
      dragon.child = []
      dragon.choice_cbg = 'null'
      dragon.choice_sword = 'null'
      dragon.choice_shield = 'null'
      dragon.cintamani = []
      dragon.base_attack = Math.floor(Math.random() * 8) + 20
      dragon.add_attack = 0
      dragon.base_armor = Math.floor(Math.random() * 10) + 5
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
    // dragons 배경, 검, 방패 수정
    editChoicecbg: async (obj, args, ctx) => {
      const dragon = await ctx.models.Dragon.findOne({ serial: args.serial })
      dragon.choice_cbg = args.choice_cbg
      return dragon.save()
    },
    editChoicesword: async (obj, args, ctx) => {
      const dragon = await ctx.models.Dragon.findOne({ serial: args.serial })
      dragon.choice_sword = args.choice_sword
      return dragon.save()
    },
    editChoiceshield: async (obj, args, ctx) => {
      const dragon = await ctx.models.Dragon.findOne({ serial: args.serial })
      dragon.choice_shield = args.choice_shield
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
      user.iconNum = 1
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
    addItemSword: async (obj, args, ctx) => {
      const test = Object.assign({
        name: args.name,
        description: args.description,
        number: args.number,
        gold: args.gold,
        diamond: args.diamond,
        trophy: args.trophy
      })
      const item = await ctx.models.Item.findOne()
      item.sword.push(test)
      return item.save()
    },
    addItemShield: async (obj, args, ctx) => {
      const test = Object.assign({
        name: args.name,
        description: args.description,
        number: args.number,
        gold: args.gold,
        diamond: args.diamond,
        trophy: args.trophy
      })
      const item = await ctx.models.Item.findOne()
      item.shield.push(test)
      return item.save()
    },
    addItemCbg: async (obj, args, ctx) => {
      const test = Object.assign({
        name: args.name,
        description: args.description,
        number: args.number,
        gold: args.gold,
        diamond: args.diamond,
        trophy: args.trophy
      })
      const item = await ctx.models.Item.findOne()
      item.cbg.push(test)
      return item.save()
    },
    itemPurchase: async (obj, args, ctx) => {
      const user = await ctx.models.User.findOne({ email: args.email })
      if (args.diamond !== 0) {
        user.diamond -= args.diamond
      }
      if (args.gold !== 0) {
        user.gold -= args.gold
      }
      if (args.trophy !== 0) {
        user.trophy -= args.trophy
      }
      if (args.item === 'sword') {
        const sword = Object.assign({
          name: args.name,
          description: args.description,
          number: args.number,
          gold: args.gold,
          diamond: args.diamond,
          trophy: args.trophy
        })
        user.sword.push(sword)
      }
      if (args.item === 'shield') {
        const shield = Object.assign({
          name: args.name,
          description: args.description,
          number: args.number,
          gold: args.gold,
          diamond: args.diamond,
          trophy: args.trophy
        })
        user.shield.push(shield)
      }
      if (args.item === 'custom_bg') {
        const cbg = Object.assign({
          name: args.name,
          description: args.description,
          number: args.number,
          gold: args.gold,
          diamond: args.diamond,
          trophy: args.trophy
        })
        user.cbg.push(cbg)
      }
      return user.save()
    },
    dragonPurchase: async (obj, args, ctx) => {
      const user = await ctx.models.User.findOne({ email: args.email })
      user.diamond -= args.diamond
      const dragon = await ctx.models.Dragon.findOne({ serial: args.serial })
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
      return user.save(), dragon.save()
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
