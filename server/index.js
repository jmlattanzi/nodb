// imports
const express = require('express')
const { json } = require('body-parser')
const axios = require('axios')

// setup
const app = express()
const port = 3001

// variables
let cards = [] // this stores all of the cards asked for
let filteredCards = [] // this stores all the cards but with the info we actually want
let deck = [] // this is populated by the cards that you choose to add to your deck
let id = 0 // you know what this is

// use body-parser's json method as middleware
app.use(json())

// this is the boot function
// it is the first thing to run and grabs all of the cards from the external api
// and filters the card data because there is a lot of garbage
const boot = () => {
    axios
        .get('https://api.magicthegathering.io/v1/cards')
        .then((res) => {
            // this is probably unnecessary but I wanted to have an array of ALL card info, just in case
            cards = res.data.cards
            cards.forEach((card) => {
                filteredCards.push({
                    id: id, // the default ID of these cards is all RNG i believe so I'll use my own
                    name: card.name,
                    cardID: card.id,
                    types: card.type,
                    mana: card.manaCost,
                    rarity: card.rarity,
                    text: card.text,
                    colors: card.colors,
                    image: card.imageUrl,
                })
                id++ // increment the ID
            })

            // gimme the status update
            console.log(cards.length)
            console.log('cards loaded')
        })
        .catch((err) => console.log(err))

    // get page 2, same logic as above. I just wanted more cards on the screen
    axios
        .get('https://api.magicthegathering.io/v1/cards?page=2')
        .then((res) => {
            cards = res.data.cards
            cards.forEach((card) => {
                filteredCards.push({
                    id: id,
                    name: card.name,
                    cardID: card.id,
                    types: card.type,
                    mana: card.manaCost,
                    rarity: card.rarity,
                    text: card.text,
                    colors: card.colors,
                    image: card.imageUrl,
                })
                id++
            })
            console.log(cards.length)
            console.log('cards loaded')
        })
        .catch((err) => console.log(err))
}

// get all the cards that we've filtered
app.get('/api/cards', (req, res) => {
    res.json(filteredCards)
})

// search for a card using req.query.search
app.get('/api/cards/search', (req, res) => {
    let searchResults = []
    filteredCards.forEach((card) => {
        if (card.name.includes(req.query.search)) {
            searchResults.push({
                id: id,
                name: card.name,
                cardID: card.cardID,
                types: card.type,
                mana: card.mana,
                rarity: card.rarity,
                text: card.text,
                color: card.colors,
                image: card.imageUrl, // for whatever reason the image falls back to the default
            })
        }
    })

    // respond to the user with a list of cards matching the data in the request
    res.json(searchResults)
})

// get all the cards of a specific color
app.get('/api/cards/color', (req, res) => {
    let colors = []
    filteredCards.forEach((card) => {
        if (card.colors.includes(req.query.color)) {
            colors.push({
                id: id,
                name: card.name,
                cardID: card.cardID,
                types: card.type,
                mana: card.mana,
                rarity: card.rarity,
                text: card.text,
                color: card.colors,
                image: card.imageUrl,
            })
        }
    })

    res.json(colors)
})

app.get('/api/cards/:rarity', (req, res) => {
    let rarirtyCards = filteredCards.filter((card) => {
        return card.rarity === req.params.rarity
    })

    res.json(rarirtyCards)
})

// add a new card to the filtered array
app.post('/api/cards', (req, res) => {
    filteredCards.push({
        id: id,
        name: req.body.name,
        cardID: req.body.cardID,
        types: req.body.type,
        mana: req.body.mana,
        rarity: req.body.rarity,
        text: req.body.text,
        color: req.body.colors,
        image: card.imageUrl,
    })
    id++ // increment the data
    res.json(filteredCards) // send it on back
})

///////////////////////////////////////
/**********  DECK ROUTES   **********/
/////////////////////////////////////
// (i should probably move this to a controller)

// send all cards in the deck back to the user
app.get('/api/deck', (req, res) => {
    res.json(deck)
})

// push a new card onto the deck, req.body will be provided
// an object passed in to the client axios call
app.post('/api/deck', (req, res) => {
    deck.push({
        id: id,
        name: req.body.name,
        cardID: req.body.cardID,
        types: req.body.type,
        mana: req.body.mana,
        rarity: req.body.rarity,
        text: req.body.text,
        color: req.body.colors,
        image: req.body.image,
    })
    id++
    res.json(deck)
})

// edit a card in your deck
// the object will be another card from cards that is sent in the body by axios
app.put('/api/deck/:id', (req, res) => {
    let rep // just a place holder to pass into the splice function
    deck.forEach((card, i) => {
        if (card.id === +req.params.id) {
            rep = {
                id: card.id,
                name: req.body.name || card.name,
                cardID: req.body.cardID || card.cardID,
                types: req.body.type || card.type,
                mana: req.body.mana || card.mana,
                rarity: req.body.rarity || card.rarity,
                text: req.body.text || card.text,
                color: req.body.color || card.color,
                image: req.body.image || card.imageUrl,
            }
            deck.splice(i, 1, rep) // throw the edits in place
        }
    })
    // send the edited deck back
    res.json(deck)
})

// delete a card form you deck
app.delete('/api/deck/:id', (req, res) => {
    // this is pretty simple, find the matching card and splice it
    deck.forEach((card, i) => {
        if (card.id === +req.params.id) {
            deck.splice(i, 1) // remove that trash
        }
    })
    res.json(deck)
})

boot()
app.listen(port, console.log(`#### Listening on port ${port}...`))
