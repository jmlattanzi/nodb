const express = require('express')
const { json } = require('body-parser')
const axios = require('axios')

const app = express()
const port = 3001 || process.env.PORT

let cards = []
let filteredCards = []
let deck = []
let id = 0
let deckID = 0

app.use(json())

const boot = () => {
    axios
        .get('https://api.magicthegathering.io/v1/cards')
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
                })
                id++
            })
            console.log(cards.length)
            console.log('cards loaded')
        })
        .catch((err) => console.log(err))
}

app.get('/api/cards', (req, res) => {
    res.json(filteredCards)
})

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
    })
    id++
    res.json(filteredCards)
})

// deck api routing
app.get('/api/deck', (req, res) => {
    res.json(deck)
})

// push a new card onto the deck, req.body will be provided
// an object passed in to the react axios call
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
    })
    id++
    res.json(deck)
})

// edit a card in your deck
// the object will be another card from cards that is sent in the body by axios
app.put('/api/deck/:id', (req, res) => {
    let rep
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
            }
            deck.splice(i, 1, rep)
        }
    })

    console.log(rep)
    res.json(deck)
})

// delete a card form you deck
app.delete('/api/deck/:id', (req, res) => {
    deck.forEach((card, i) => {
        if (card.id === +req.params.id) {
            deck.splice(i, 1)
        }
    })
    res.json(deck)
})

boot()
app.listen(port, console.log(`#### Listening on port ${port}...`))
