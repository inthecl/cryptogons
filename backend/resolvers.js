import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const resolvers = {
  Query: {
    books: async (obj, args, ctx) => ctx.Book.find(),
    findbook: async (obj, args, ctx) => ctx.Book.findOne({ id: args.id }),
    users: async (obj, args, ctx) => ctx.User.find()
  },
  Mutation: {
    addBook: async (obj, args, ctx) => {
      const one = await new ctx.Book(args)
      one.id = one._id
      console.log(one)
      return one.save()
    },
    registerUser: async (obj, args, ctx) => {
      const user = args
      user.password = await bcrypt.hash(user.password, 12)
      const newone = await new ctx.User(user)
      console.log(newone)
      return newone.save()
    },
    login: async (obj, args, ctx) => {
      console.log(args)
      const user = await ctx.User.findOne({ email: args.email })
      if (!user) {
        throw new Error('아이디없음')
      }
      const valid = await bcrypt.compare(args.password, user.password)
      if (!valid) {
        throw new Error('암호틀림')
      }

      const token = jwt.sign({ user: user.email }, 'TESTSECRET', { expiresIn: '1y' })
      console.log(token)
      return token
    }
  }
}

export default resolvers
