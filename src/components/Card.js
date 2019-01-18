import React from 'react'
import styles from '../styles/Card.module.scss'

const card = (props) => {
    return (
        <div
            className={
                props.styleType === 'card' ? styles.card : styles.deckItem
            }>
            <img src='' alt='' />
            <div>
                {props.name}
                <div>{props.mana}</div>
                <div>{props.rarity}</div>
                <div>{props.color}</div>
                <div>{props.type}</div>
            </div>
            <button onClick={(id) => props.addToDeck(props.id)}>
                add to deck
            </button>
        </div>
    )
}

export default card
