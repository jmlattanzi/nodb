import React from 'react'
import styles from '../styles/Card.module.scss'

// pretty simple, just render the info passed by the container render function
const card = (props) => {
    return (
        <div
            className={
                props.styleType === 'card' ? styles.card : styles.deckItem
            }>
            <img
                className={styles.thumb}
                src={
                    props.image === undefined || props.image === null
                        ? props.cardback
                        : props.image
                }
                alt='url broken'
            />
            <div className={styles.info}>
                <strong>{props.name}</strong>
                <div>
                    <strong>Mana:</strong> <em>{props.mana}</em>
                </div>
                <div>
                    <strong>Rarity:</strong> <em>{props.rarity}</em>
                </div>
                <div>
                    <strong>Color:</strong>
                    <em>{props.color}</em>
                </div>
                <div>
                    <em>{props.type}</em>
                </div>
            </div>
            <button onClick={(id) => props.addToDeck(props.id)}>
                add to deck
            </button>
        </div>
    )
}

export default card
