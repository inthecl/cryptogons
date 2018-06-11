import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createConfirmEmailLink } from './utils/createConfirmEmailLink'

const resolvers = {
  Query: {
    books: async (obj, args, ctx) => ctx.models.Book.find(),
    findbook: async (obj, args, ctx) => ctx.models.Book.findOne({ id: args.id }),
    users: async (obj, args, ctx) => ctx.models.User.find(),
    checkemail: async (obj, args, ctx) => ctx.models.User.findOne({ email: args.email })
  },
  Mutation: {
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
      const newone = await new ctx.models.User(user)
      console.log(newone)
      const link = createConfirmEmailLink(user.username)
      console.log(link)
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
