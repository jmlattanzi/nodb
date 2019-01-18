import React, { Component } from 'react'
import styles from '../styles/Search.module.scss'

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
                    placeholder='search'
                />
                <button
                    className={styles.submit}
                    onClick={(input) =>
                        this.props.searchCards(this.state.input)
                    }>
                    search
                </button>
            </div>
        )
    }
}

export default Search
