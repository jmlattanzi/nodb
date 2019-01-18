import React, { Component } from 'react'
import styles from '../styles/DeckItem.module.scss'
import cardback from '../img/cardback.jpg'

// this is a big class that handles all the rendering for the cards in your deck
class DeckItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            input: '',
            edit: false, // a relic of a failed test
        }
    }

    // handle some changes so we can send them back
    handleChange = (e) => {
        this.setState({ input: e.target.value })
    }

    // yet another relic
    editHandle = () => {
        this.setState({ edit: !this.state.edit })
    }

    // this one is a little weird, but I can assure it makes a little sense
    render() {
        return (
            <div className={styles.deck}>
                {this.props.deck.map((card) => {
                    return (
                        <div className={styles.deckItem} key={card.id}>
                            <div className={styles.thumb}>
                                <img
                                    className={styles.cardThumb}
                                    src={
                                        card.image === null ||
                                        card.image === undefined
                                            ? cardback
                                            : card.image
                                    }
                                    alt='img'
                                />
                            </div>
                            <div className={styles.cardInfo}>
                                <div className={styles.cardDetails}>
                                    <h3>{card.name}</h3>
                                    {this.state.edit ? (
                                        <div>
                                            <input
                                                type='text'
                                                onChange={(e) =>
                                                    this.handleChange(e)
                                                }
                                            />
                                            <button
                                                onClick={(id, input) =>
                                                    this.props.editCard(
                                                        card.id,
                                                        this.state.input
                                                    )
                                                }>
                                                edit
                                            </button>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </div>
                                <div className={styles.controls}>
                                    <button onClick={this.editHandle}>
                                        {this.state.edit ? 'close' : 'edit'}
                                    </button>
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

export default DeckItem
