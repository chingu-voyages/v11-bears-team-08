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
    language: 'en',
    aroundLatLngViaIP: false
  }

  try {
    // for the resulting object, see https://community.algolia.com/places/api-clients.html#json-answer
    const apiResult = await places.search(apiParams)
    const cities = apiResult.hits
      .filter(
        ({ is_city, is_suburb, objectID }) => is_city && !is_suburb && objectID
      )
      .map(({ objectID, country, county, locale_names, administrative }) => ({
        id: objectID,
        name: locale_names[0],
        country,
        administrative: administrative[0],
        // For some big cities, county property is not available. e.g Berlin
        county: county && county[0]
      }))

    return res.json({ cities })
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } })
  }
}

module.exports = function placesRoutes(app) {
  app.get('/api/places', getCities)
}
