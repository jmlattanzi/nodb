import React, { Component } from 'react'
import axios from 'axios'
import Card from './Card'
import Deck from './Deck'
import styles from '../styles/Container.module.scss'

class Container extends Component {
    constructor() {
        super()

        this.state = {
            cards: [],
            inDeck: [],
        }
    }

    // card duplication???
    componentDidMount() {
        axios
            .get('/api/cards')
            .then((res) => {
                this.setState({ cards: res.data })
            })
            .catch((err) => console.log(err))

        //axios get cards in deck
        axios
            .get('/api/deck')
            .then((res) => this.setState({ inDeck: res.data }))
            .catch((err) => console.log(err))
    }

    // change this to an axios post request
    addToDeck = (id) => {
        console.log('addToDeck triggered: ' + id)
        this.state.cards.forEach((card) => {
            if (card.id === id) {
                axios
                    .post('/api/deck', {
                        id: id,
                        name: card.name,
                        cardID: card.id,
                        types: card.type,
                        mana: card.manaCost,
                        rarity: card.rarity,
                        text: card.text,
                        colors: card.colors,
                    })
                    .then((res) => this.setState({ inDeck: res.data }))
                    .catch((err) => console.log(err))
            }
        })
        console.log(this.state.inDeck)
    }

    // remove a card from the deck
    removeFromDeck = (id) => {
        console.log('card selected for removal: ' + id)
        this.state.inDeck.forEach((card) => {
            if (card.id === id) {
                axios
                    .delete(`/api/deck/${id}`)
                    .then((res) => this.setState({ inDeck: res.data }))
                    .catch((err) => console.log(err))
            }
        })
    }
    
    // edit acrd in deck
    editCard = (id, input) => {
        // pull in id and input
    }

    render() {
        console.log(this.state.cards)
        return (
            <div className={styles.container}>
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
                                styleType={'card'}
                                addToDeck={this.addToDeck}
                            />
                        ))
                    ) : (
                        <h1>Loading....</h1>
                    )}
                </div>
                <div className={styles.deck}>
                    <Deck
                        deck={this.state.inDeck}
                        removeFromDeck={this.removeFromDeck}
                    />
                </div>
            </div>
        )
    }
}

export default Container
