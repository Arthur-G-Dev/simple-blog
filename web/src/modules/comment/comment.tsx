import React, { FC } from 'react'

interface Props {
    text: string
}

const Comment: FC<Props> = (props) => {
    return (
       <p>{props.text}</p>
    )
}

export default Comment
