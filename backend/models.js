import mongoose from 'mongoose'

const IconNumSchema = new mongoose.Schema({
  number: String,
  name: String,
  description: String
})
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
const BattleHistorySchema = new mongoose.Schema({
  mydragon: String,
  mycomb: String,
  enemydragon: String,
  enemycomb: String,
  result: String
})
const IconNum = mongoose.model('iconNum', IconNumSchema)
const Sword = mongoose.model('sword', SwordSchema)
const Shield = mongoose.model('shield', ShieldSchema)
const Cbg = mongoose.model('cbg', CbgSchema)
const BattleHistory = mongoose.model('battlehistory', BattleHistorySchema)
const Book = mongoose.model('book', { id: String, title: String, author: String })
const User = mongoose.model('user', {
  email: {
    type: String
  },
  username: String,
  password: String,
  confirmed: Boolean,
  diamond: Number,
  gold: Number,
  trophy: Number,
  iconNum: [IconNumSchema],
  choice_icon: String,
  cbg: [CbgSchema],
  sword: [SwordSchema],
  shield: [ShieldSchema],
  myDragons: [String],
  battle_history: [BattleHistorySchema],
  activity: [String]
})
const Dragon = mongoose.model('dragon', {
  email: String,
  serial: String,
  combination: String,
  name: String,
  birthday: String,
  state: String,
  price: Number,
  period: Number,
  gen: Number,
  cooldown: [String],
  parents: [String],
  child: [String],
  choice_cbg: String,
  choice_sword: String,
  choice_shield: String,
  cintamani: [String],
  base_damage: Number,
  add_damage: Number,
  base_armor: Number,
  add_armor: Number,
  win: Number,
  lose: Number,
  winning_rate: Number,
  ranking: Number
})
const Item = mongoose.model('item', {
  sword: [SwordSchema],
  shield: [ShieldSchema],
  cbg: [CbgSchema]
})
const Queue = mongoose.model('queue', {
  queue: [String]
})
const Statistic = mongoose.model('statistic', { usercount: Number, dragoncount: Number })

export default {
  Book, User, Dragon, Statistic, Item, IconNum, Sword, Shield, Cbg, Queue, BattleHistory
}
