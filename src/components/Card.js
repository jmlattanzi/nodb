import React from 'react'
import styles from '../styles/Card.module.scss'
import Button from './Button'

// pretty simple, just render the info passed by the container render function
const card = (props) => {
    return (
        <div className={styles.card}>
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
                <div className={styles.name}>
                    <strong>{props.name}</strong>
                </div>
                <div>
                    <strong>Mana:</strong> <em>{props.mana}</em>
                </div>
                <div>
                    <strong>Rarity:</strong> <em>{props.rarity}</em>
                </div>
                <div>
                    <strong>Color: </strong>
                    <em>{props.color}</em>
                </div>
                <div>
                    <em>{props.type}</em>
                </div>
                <hr />
                <div>
                    <em>{props.text}</em>
                </div>
            </div>
            <Button function={(id) => props.addToDeck(props.id)}>
                add to deck
            </Button>
        </div>
    )
}

export default card
