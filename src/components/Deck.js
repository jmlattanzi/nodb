import React, { Component } from 'react'
import styles from '../styles/Deck.module.scss'
import DeckItem from './DeckItem'

// this function used to handle rendering all the cards in our deck, but I changed it.
// now it's pretty much just the container and really shouldn't be a class
// in fact, this really has no purpose
class Deck extends Component {
    render() {
        return (
            <div className={styles.deck}>
                <DeckItem
                    deck={this.props.deck}
                    removeFromDeck={this.props.removeFromDeck}
                    editCard={this.props.editCard}
                />
            </div>
        )
    }
}

export default Deck
