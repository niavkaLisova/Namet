import React from 'react'

export default function CounterMessages(props) {
    return (
        <div>
            {props.name} {props.unread}
            {(props.active) ? 'Kessa': 'Doar'}      
        </div>
    )
}