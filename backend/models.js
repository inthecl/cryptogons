import mongoose, { Schema } from 'mongoose'

const Book = mongoose.model('book', { id: String, title: String, author: String })
const User = mongoose.model('user', {
  email: {
    type: String
  },
  username: String,
  password: String,
  name: String
})

export default { Book, User }
