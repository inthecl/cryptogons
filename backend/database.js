import mongoose from 'mongoose'

export default mongoose.connect('mongodb://test:test@ds123658.mlab.com:23658/dudnwjsdb')
  .then(() => {
    console.log('몽구스 연결 성공')
  }).catch(() => {
    console.log('몽구스 연결 실패')
  })
