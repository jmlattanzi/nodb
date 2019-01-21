// imports
import React, { Component } from 'react'
import axios from 'axios'
import Card from './Card'
import Deck from './Deck'
import styles from '../styles/Container.module.scss'
import cardback from '../img/cardback.jpg'
import Search from './Search'

// this class is the general layout component, most of our state is managed here
class Container extends Component {
    constructor() {
        super()

        this.state = {
            cards: [], // this is populated when we ask the server for the filteredCards array
            inDeck: [], // this holds all the cards in your deck
            defaultImage: cardback, // some cards don't have an image, heres the fallback
            searchResults: [], // store search results
            // you cant add to the deck from the search results, addToDeck relies on this.state.cards
            containerStyle: styles.container,
        }
    }

    // go ahead and fill our state
    componentDidMount() {
        axios
            .get('/api/cards')
            .then((res) => {
                this.setState({ cards: res.data })
            })
            .catch((err) => console.log(err))

        // get cards in deck
        axios
            .get('/api/deck')
            .then((res) => this.setState({ inDeck: res.data }))
            .catch((err) => console.log(err))
    }

    // this function is triggered when the add button in the Card comp is clicked
    addToDeck = (id) => {
        console.log('addToDeck triggered: ' + id) // lemme know what happens
        // loop through our cards and find the one that matches the ID we received
        this.state.cards.forEach((card) => {
            if (card.id === id) {
                // send a post request to add it into our server deck
                axios
                    .post('/api/deck', {
                        id: id,
                        name: card.name,
                        cardID: card.cardID,
                        types: card.type,
                        mana: card.manaCost,
                        rarity: card.rarity,
                        text: card.text,
                        colors: card.colors,
                        image: card.image,
                    })
                    .then((res) => this.setState({ inDeck: res.data }))
                    .catch((err) => console.log(err))
            }
        })
        console.log(this.state.inDeck) // i should really remove all these console.logs
    }

    // this function gets fired when the remove button is pressed in the DeckItem comp
    removeFromDeck = (id) => {
        console.log('card selected for removal: ' + id) // more logs
        this.state.inDeck.forEach((card) => {
            if (card.id === id) {
                // if we find a match in the deck array, delete it from our server
                // and receive the updated deck back
                axios
                    .delete(`/api/deck/${id}`)
                    .then((res) => this.setState({ inDeck: res.data }))
                    .catch((err) => console.log(err))
            }
        })
    }

    // edit a card in our deck, tbh this is just here to have an edit feature lol
    // it gets triggered when you click on a DeckItem's edit button
    editCard = (id, input) => {
        console.log('card edited: ' + id) // sweet sweet console.log
        this.state.inDeck.forEach((card) => {
            if (card.id === id) {
                // find a matching card and PUT a new name in it then send the updated one back
                axios
                    .put(`/api/deck/${id}`, {
                        ...card,
                        name: input,
                    })
                    .then((res) => this.setState({ inDeck: res.data }))
                    .catch((err) => console.log(err))
            }
        })
    }

    // this is fired when you hit the search button, duh
    handleSearch = (input) => {
        console.log(`search function called with: ${input}`) // tell me what the query is
        // make sure it's not blank
        if (input.length !== 0 && input !== ' ') {
            // make a request to find all cards that include the query
            axios
                .get(`/api/cards/search?search=${input}`)
                .then((res) => {
                    console.log(res.data)
                    if (res.data.length !== 0) {
                        // if the search found cards, do this
                        this.setState({ searchResults: res.data })
                    } else {
                        window.alert('no results found') // alert the user that theyre out of luck
                    }
                })
                .catch((err) => console.log(err))
        } else {
            window.alert('Search cant be empty') // tell the user they can't get away with anything
        }

        if (input === 'elian') {
            this.setState({ containerStyle: styles.elianContainer })
        }
    }

    // the big mess
    render() {
        console.log(this.state.cards) // log our cards, just for dev purposes
        return (
            <div className={styles.outerContainer}>
                <Search
                    handleChange={this.handleChange}
                    searchCards={this.handleSearch}
                />
                <div className={this.state.containerStyle}>
                    {this.state.searchResults.length === 0 ? (
                        <div className={styles.cards}>
                            {this.state.cards.length !== 0 ? (
                                this.state.cards.map((card) => (
                                    <Card
                                        key={card.id}
                                        id={card.id}
                                        name={card.name}
                                        mana={card.mana}
                                        rarity={card.rarity}
                                        color={card.colors}
                                        type={card.types}
                                        text={card.text}
                                        image={card.image}
                                        cardback={this.state.defaultImage}
                                        addToDeck={this.addToDeck}
                                    />
                                ))
                            ) : (
                                <h1>Loading....</h1>
                            )}
                        </div>
                    ) : (
                        <div className={styles.cards}>
                            {this.state.cards.length !== 0 ? (
                                this.state.searchResults.map((card) => (
                                    <Card
                                        key={card.id}
                                        id={card.id}
                                        name={card.name}
                                        mana={card.mana}
                                        rarity={card.rarity}
                                        color={card.colors}
                                        type={card.types}
                                        text={card.text}
                                        image={card.image}
                                        cardback={this.state.defaultImage}
                                        addToDeck={this.addToDeck}
                                    />
                                ))
                            ) : (
                                <h1>Loading....</h1>
                            )}
                        </div>
                    )}
                    <div className={styles.deck}>
                        <Deck
                            deck={this.state.inDeck}
                            removeFromDeck={this.removeFromDeck}
                            editCard={this.editCard}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

// export it
export default Container
