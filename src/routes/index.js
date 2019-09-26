const Trainer = require('../resources/components/trainer/trainer.model')

const conversations = async (req, res) => {
  try {
    const userData = {
      userID: req.body.userID
    }

    const returnData = await Trainer.findById(userData.userID).limit(15)

    res.status(200).json({ returnData })
  } catch (error) {
    return res.status(422).json({ message: 'could not find resource' })
  }
}

module.exports = {
  conversations: conversations
}
