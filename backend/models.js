import mongoose from 'mongoose'
const DragonSchema = new mongoose.Schema({
  name: String,
  combination: String,
  birthday: Number,
  price: Number,
  serial: String,
  choice_cbg: String,
  choice_sword: String,
  choice_shield: String
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
  sword: [String],
  shield: [String],
  dragons: [DragonSchema]
})
const Item = mongoose.model('item', {
  sword: [String],
  shield: [String],
  cbg: [String]
})
const Statistic = mongoose.model('statistic', { usercount: Number, dragoncount: Number })

export default {
  Book, User, Dragon, Statistic, Item
}
