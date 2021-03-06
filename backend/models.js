import mongoose from 'mongoose'

const IconSchema = new mongoose.Schema({
  number: String,
  name: String,
  description: String
})
const SwordSchema = new mongoose.Schema({
  number: String,
  name: String,
  description: String,
  option: String,
  gold: Number,
  diamond: Number,
  trophy: Number,
  eicon: String,
  eperiod: String
})
const ShieldSchema = new mongoose.Schema({
  number: String,
  name: String,
  description: String,
  option: String,
  gold: Number,
  diamond: Number,
  trophy: Number,
  eicon: String,
  eperiod: String
})
const CbgSchema = new mongoose.Schema({
  number: String,
  name: String,
  description: String,
  option: String,
  gold: Number,
  diamond: Number,
  trophy: Number,
  eicon: String,
  eperiod: String
})
const BattleHistorySchema = new mongoose.Schema({
  mydragon: String,
  mycomb: String,
  enemydragon: String,
  enemycomb: String,
  result: String
})
const ActivitySchema = new mongoose.Schema({
  type: String,
  date: String,
  contents: [String]
})
const Icon = mongoose.model('icon', IconSchema)
const Sword = mongoose.model('sword', SwordSchema)
const Shield = mongoose.model('shield', ShieldSchema)
const Cbg = mongoose.model('cbg', CbgSchema)
const BattleHistory = mongoose.model('battlehistory', BattleHistorySchema)
const Activity = mongoose.model('activity', ActivitySchema)
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
  icon: [IconSchema],
  choice_icon: String,
  cbg: [CbgSchema],
  sword: [SwordSchema],
  shield: [ShieldSchema],
  myDragons: [String],
  battle_history: [BattleHistorySchema],
  activity: [ActivitySchema]
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
  release_date: String,
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
const eDragon = mongoose.model('edragon', {
  serial: String,
  ename: String,
  edesc: String,
  enumber: String,
  eicon: String,
  egold: Number,
  ediamond: Number,
  etrophy: Number,
  eperiod: String,
  combination: String,
  release_date: String
})
const Item = mongoose.model('item', {
  sword: [SwordSchema],
  shield: [ShieldSchema],
  cbg: [CbgSchema]
})
const Icons = mongoose.model('icons', {
  number: String,
  name: String,
  description: String
})
const Queue = mongoose.model('queue', {
  queue: [String]
})
const Statistic = mongoose.model('statistic', { usercount: Number, dragoncount: Number })

export default {
  Book, User, Dragon, Statistic, Item, Icon, Sword, Shield, Cbg, Queue, BattleHistory, Activity, eDragon, Icons
}
