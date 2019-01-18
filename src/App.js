import React, { Component } from 'react'
import Container from './components/Container'
import './App.css'

class App extends Component {
    render() {
        return (
            <div className='App'>
                <h1>deck builder</h1>
                <div>
                    <Container />
                </div>
            </div>
        )
    }
}

export default App
