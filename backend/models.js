import mongoose from 'mongoose'
const DragonSchema = new mongoose.Schema({
  name: String,
  combination: String,
  birthday: Number,
  price: Number,
  serial: String,
  choice_cbg: String
})
const Dragon = mongoose.model('dragon', DragonSchema)
const Book = mongoose.model('book', { id: String, title: String, author: String })
const User = mongoose.model('user', {
  email: {
    type: String
  },
  username: String,
  password: String,
  name: String,
  confirmed: Boolean,
  diamond: Number,
  gold: Number,
  iconNum: Number,
  cbg: [String],
  dragons: [DragonSchema]
})

const Statistic = mongoose.model('statistic', { usercount: Number, dragoncount: Number })

export default {
  Book, User, Dragon, Statistic
}
