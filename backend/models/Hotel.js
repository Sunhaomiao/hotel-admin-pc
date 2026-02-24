const mongoose = require('mongoose');

// 房间类型子文档结构
const RoomTypeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  _id: true // 自动生成子文档ID
});

const HotelSchema = new mongoose.Schema({
  nameCn: {
    type: String,
    required: true,
    trim: true
  },
  nameEn: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  starRating: {
    type: Number,
    required: true,
    min: 3,
    max: 5
  },
  openingDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'approved', 'rejected', 'offline'],
    default: 'pending'
  },
  reason: {
    type: String,
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  roomTypes: [RoomTypeSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Hotel', HotelSchema);
