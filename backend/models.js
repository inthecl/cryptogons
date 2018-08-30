import mongoose from 'mongoose'
const SwordSchema = new mongoose.Schema({
  number: String,
  name: String,
  description: String,
  gold: Number,
  diamond: Number,
  trophy: Number
})
const ShieldSchema = new mongoose.Schema({
  number: String,
  name: String,
  description: String,
  gold: Number,
  diamond: Number,
  trophy: Number
})
const CbgSchema = new mongoose.Schema({
  number: String,
  name: String,
  description: String,
  gold: Number,
  diamond: Number,
  trophy: Number
})
const Sword = mongoose.model('sword', SwordSchema)
const Shield = mongoose.model('shield', ShieldSchema)
const Cbg = mongoose.model('cbg', CbgSchema)
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
  trophy: Number,
  iconNum: Number,
  cbg: [CbgSchema],
  sword: [SwordSchema],
  shield: [ShieldSchema],
  dragons: [DragonSchema]
})
const Item = mongoose.model('item', {
  sword: [SwordSchema],
  shield: [ShieldSchema],
  cbg: [CbgSchema]
})
const Statistic = mongoose.model('statistic', { usercount: Number, dragoncount: Number })

export default {
  Book, User, Dragon, Statistic, Item, Sword, Shield, Cbg
}
