import React, { Component } from 'react'
import styles from '../styles/Search.module.scss'
import Button from './Button'

// pretty simple, this class just handles the search controls and input
class Search extends Component {
    constructor(props) {
        super(props)

        this.state = {
            input: '',
        }
    }

    // set our input to the changed value
    handleChange = (e) => {
        this.setState({ input: e.target.value })
    }

    render() {
        return (
            <div className={styles.searchBox}>
                <input
                    className={styles.search}
                    type='text'
                    onChange={(e) => this.handleChange(e)}
                    placeholder='search for cards'
                />
                <Button
                    className={styles.submit}
                    function={(input) =>
                        this.props.searchCards(this.state.input)
                    }>
                    search
                </Button>
            </div>
        )
    }
}

export default Search
