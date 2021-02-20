import React from 'react'

const Show =(props) => {
    console.log(props.name)
    return (
        <div>
            {props.name.map(message => (
                <label>message</label>
            ))}
        </div>
    )
}
export default Show
