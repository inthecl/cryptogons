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
      const user = await new ctx.User(args)
      console.log(user)
      return user.save()
    }
  }
}

export default resolvers
