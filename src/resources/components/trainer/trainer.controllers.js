const Trainer = require('./trainer.model')

async function searchByLocation(req, res) {
  const { city_id } = req.query

  if (!city_id) {
    return res.status(400).json({ error: { message: 'Invalid city name' } })
  }

  try {
    const trainers = await Trainer.find({ 'location.city_id': city_id })

    return res.json({ trainers })
  } catch (error) {
    return res.status(500).json({ error: { message: error.message } })
  }
}

module.exports = {
  searchByLocation
}
