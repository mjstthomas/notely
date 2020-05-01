import React from 'react'
import GoBack from '../Folders/GoBack'

class NoteError extends React.Component{
	state = {
		hasError: false
	}

	static getDerivedStateFromError(error){
		return {hasError: true}
	}

	render(){
		return (
			this.state.hasError ? <h2>There was an error with your notes <GoBack /></h2> : this.props.children
			)
	}
}

export default NoteError