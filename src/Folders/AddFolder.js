import React from 'react'
import AppContext from '../AppContext'

class AddFolder extends React.Component{
	state = {
		id: this.context.folders.length.toString(),
		name: ''
	}

	static contextType = AppContext
	handleChange= event =>{
		this.setState({name: event.target.value})
	}
	handleSubmit=event=>{
		event.preventDefault()
		fetch('http://localhost:9090/folders', {
			method: 'POST',
			body: JSON.stringify(this.state),
			headers: {'content-type': 'application/json'}
		})
		.then(this.context.handleFolderSubmit())
	}
	render(){
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type="text" onChange={this.handleChange} />
					<button type="submit" >add folder</button>
				</form>
			</div>
			)
	}
}
export default AddFolder