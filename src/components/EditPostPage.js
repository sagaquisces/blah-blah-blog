import React from 'react'

const EditPostPage = (props) => {
    console.log(props)
    return (
        <div>
            <p>Edit Post Page. Id is: {props.match.params.id}</p>
        </div>
    )
}
    

export default EditPostPage