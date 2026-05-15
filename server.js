// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({extended: true}))

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid()
app.engine('liquid', engine.express())

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')

//base url om code wat simpeler te maken, moet wel met ` gebruiken.
const baseUrl = 'https://fdnd-agency.directus.app/items/preludefonds_instruments/'

app.get('/', async function (request, response) {
  const params = new URLSearchParams()
  params.append('limit', '-1')

  const instrumentResponse = await fetch(`${baseUrl}?${params.toString()}`)
  const instrumentResponseJSON = await instrumentResponse.json()
  console.log(instrumentResponseJSON)
  const allInstruments = instrumentResponseJSON.data

  const totalItems       = allInstruments.length
  const totalPrelude     = allInstruments.filter(instrument => instrument.property?.toLowerCase() === 'preludefonds').length
  const totalAnders      = allInstruments.filter(instrument => instrument.property && instrument.property.toLowerCase() !== 'preludefonds').length
  const totalBeschikbaar = allInstruments.filter(instrument => instrument.status?.toLowerCase() === 'beschikbaar').length
  const totalUitgeleend  = allInstruments.filter(instrument => instrument.status?.toLowerCase() === 'uitgeleend').length
  const totalReparatie   = allInstruments.filter(instrument => instrument.status?.toLowerCase() === 'in reparatie').length

  console.log('Statussen:', allInstruments.map(i => i.status))

  response.render('home.liquid', {
    totalItems,
    totalPrelude,
    totalAnders,
    totalBeschikbaar,
    totalUitgeleend,
    totalReparatie,
  })
})

app.get('/instrumenten', async function (request, response) {
  
  const apiResponse = await fetch('https://fdnd-agency.directus.app/items/preludefonds_instruments')
  const apiResponseJSON = await apiResponse.json()
  const instruments = apiResponseJSON.data

  response.render('overzicht.liquid', { instruments, page: 'overzicht' })
 })

app.get('/instrumenten/nieuw', async function (request, response) {
  response.render('nieuw.liquid')
})

app.post('/instrumenten/nieuw', async function (request, response){
  response.redirect(303, `/instrumenten/`)
})


app.get('/actielog', async function (request, response) {
  response.render('actielog.liquid')
})

app.get('/instrumenten/:key', async function (request, response) {
  const instrumentResponse = await fetch(`${baseUrl}?filter[key]=${request.params.key}`)
  const instrumentResponseJSON = await instrumentResponse.json()

  response.render('detail.liquid', { instrument: instrumentResponseJSON.data[0] })
})

app.get('/instrumenten/:key/uitlenen', async function (request, response) {
  const instrumentResponse = await fetch(`${baseUrl}?filter[key]=${request.params.key}`)
  const instrumentResponseJSON = await instrumentResponse.json()

  response.render('uitlenen.liquid', { 
    instrument: instrumentResponseJSON.data[0],
    melding: request.query.melding
  })
})

app.post('/instrumenten/:key/uitlenen', async function (request, response) {

  try {
    const fetchResponse = await fetch("https://fdnd-agency.directus.app/items/preludefonds_log",{
      method: "POST",
      body: JSON.stringify({
        type_action: 'Uitlenen',

        performed_by: request.body.docentName,

        involved_party: request.body.studentName,

        instrument: request.body.id
      }),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
    const patchResponse = await fetch(`${baseUrl}${request.body.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        status: "Uitgeleend"
      }),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
  })

  const fetchResponseJSON = await fetchResponse.json()
  console.log(fetchResponseJSON)
  const patchResponseJSON = await patchResponse.json()
  console.log(patchResponseJSON)

  if (patchResponse.ok) {
      // API zegt: Gelukt! We sturen success=true mee
      response.redirect(303, "/instrumenten/" + request.params.key + "/uitlenen?melding=success#status")
    } else {
      // API zegt: Fout! (bijv. server error of verkeerd ID). We sturen error=true mee
      response.redirect(303, "/instrumenten/" + request.params.key + "/uitlenen?melding=error#status")
    }

  } catch (error) {
    // De fetch zelf is gecrasht (bijv. geen internet). Ook een error dus.
    response.redirect(303, "/instrumenten/" + request.params.key + "/uitlenen?melding=error#status")
  }
})

app.get('/instrumenten/:key/innemen', async function (request, response) {
  const instrumentResponse = await fetch(`${baseUrl}?filter[key]=${request.params.key}`)
  const instrumentResponseJSON = await instrumentResponse.json()

  response.render('innemen.liquid', { instrument: instrumentResponseJSON.data[0] })
})

app.post('/instrumenten/:key/innemen', async function (request, response) {
  response.redirect(303, `/instrumenten/${request.params.key}`)
})

app.get('/instrumenten/:key/aanpassen', async function (request, response) {
  const instrumentResponse = await fetch(`${baseUrl}?filter[key]=${request.params.key}`)
  const instrumentResponseJSON = await instrumentResponse.json()

  response.render('aanpassen.liquid', { instrument: instrumentResponseJSON.data[0] })
})

app.post('/instrumenten/:key/aanpassen', async function (request, response) {
  response.redirect(303, `/instrumenten/${request.params.key}`)
})

app.get('/instrumenten/:key/schade', async function (request, response) {
  const instrumentResponse = await fetch(`${baseUrl}?filter[key]=${request.params.key}`)
  const instrumentResponseJSON = await instrumentResponse.json()

  response.render('schade.liquid', { instrument: instrumentResponseJSON.data[0] })
})

app.post('/instrumenten/:key/schade', async function (request, response) {
  response.redirect(303, `/instrumenten/${request.params.key}`)
})

// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  console.log(`Project draait via http://localhost:${app.get('port')}/\n\nSucces deze sprint. En maak mooie dingen! 🙂`)
})