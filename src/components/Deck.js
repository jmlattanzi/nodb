import React, { Component } from 'react'
import styles from '../styles/Deck.module.scss'

class Deck extends Component {
    constructor(props) {
        super(props)

        this.state = {
            deck: [],
            input: '',
        }
    }

    handleChange = (e) => {
        this.setState({ input: e.target.value })
    }

    render() {
        return (
            <div className={styles.deck}>
                {this.props.deck.map((card) => {
                    return (
                        <div className={styles.deckItem} key={card.id}>
                            <div className={styles.thumb}>img</div>
                            <div className={styles.cardInfo}>
                                <div className={styles.cardDetails}>
                                    <h3>{card.name}</h3>
                                </div>
                                <div className={styles.controls}>
                                    <button>edit</button>
                                    <button
                                        onClick={(id) =>
                                            this.props.removeFromDeck(card.id)
                                        }>
                                        remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Deck
