import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createConfirmEmailLink } from './utils/createConfirmEmailLink'
import { sendEmail } from './utils/sparkPost'

const resolvers = {
  Query: {
    books: async (obj, args, ctx) => ctx.models.Book.find(),
    findbook: async (obj, args, ctx) => ctx.models.Book.findOne({ id: args.id }),
    users: async (obj, args, ctx) => ctx.models.User.find(),
    checkemail: async (obj, args, ctx) => ctx.models.User.findOne({ email: args.email }),
    dragons: async (obj, args, ctx) => ctx.models.Dragon.find(),
    finddragon: async (obj, args, ctx) => ctx.models.Dragon.findOne({serial: args.serial}),
    statistic: async (obj, args, ctx) => ctx.models.Statistic.findOne(),
    finduser: async (obj, args, ctx) => {
      const user = await ctx.models.User.findOne({ email: args.email })
      const Alldragons = await ctx.models.Dragon.find()
      let dragons = [ Alldragons[0], Alldragons[1], Alldragons[2] ]
      let one = Object.assign({}, user._doc)
      one.dragons = dragons
      return one
    }
  },
  Mutation: {
    resetCount: async (obj, args, ctx) => {
      const one = await new ctx.models.Statistic(args)
      return one.save()
    },
    addDragon: async (obj, args, ctx) => {
      console.log(args)
      const dragon = Object.assign(args)
      const statistic = await ctx.models.Statistic.findOne()
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
      dragon.price = 1000
      const one = await new ctx.models.Dragon(dragon)
      one.serial = one._id
      console.log(one)
      statistic.dragoncount += 1
      statistic.save()
      return one.save()
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
      user.diamond = 300
      user.gold = 1000
      user.iconNum = 1
      const newone = await new ctx.models.User(user)
      console.log(newone)
      const link = createConfirmEmailLink(user.username)
      console.log(link)
      sendEmail(user.email, link)
      return newone.save()
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
