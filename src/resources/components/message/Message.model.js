const mongoose = require('mongoose')

const Schema = mongoose.Schema // extract Schema from mongoose.Schema

const messageSchema = new Schema(
  {
    message: {
      text: { type: String, required: true }
    },

    users: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },
        sender: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true
        }
      }
    ],

    read: { type: Date }
  },
  {
    timestamps: true
  }
)

const Message = mongoose.model('Message', messageSchema)
module.exports = Message
