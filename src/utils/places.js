const algoliasearch = require('algoliasearch')
const places = algoliasearch.initPlaces()

async function getCities(req, res) {
  const { text } = req.query

  if (!text || text.trim().length < 3) {
    return res.json({
      error: { message: 'Text needs to be more than 2 characters long' }
    })
  }

  // for more params, see https://community.algolia.com/places/documentation.html#api-options-type
  const apiParams = {
    query: text,
    type: 'city',
    language: 'en'
  }

  try {
    // for the resulting object, see https://community.algolia.com/places/api-clients.html#json-answer
    const apiResult = await places.search(apiParams)
    const cities = apiResult.hits
      .filter(({ is_city, is_suburb }) => is_city && !is_suburb)
      .map(({ objectID, country, locale_names }) => ({
        id: objectID,
        name: locale_names[0],
        country
      }))

    return res.json({ cities })
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } })
  }
}

module.exports = function placesRoutes(app) {
  app.get('/api/places', getCities)
}
