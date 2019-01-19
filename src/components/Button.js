import React from 'react'

const button = (props) => {
    return (
        <div>
            <button onClick={props.function}>{props.children}</button>
        </div>
    )
}

export default button
