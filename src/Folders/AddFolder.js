import React from 'react'
import AppContext from '../AppContext'

class AddFolder extends React.Component{
	state = {
		id: this.context.folders.length.toString(),
		name: '',
		touched: false,
		errorMessage: ''
	}
	static contextType = AppContext

	handleChange= event =>{
		this.setState({
			name: event.target.value,
			touched: true})
		this.validateName()
		console.log(this.state.touched)
	}
	validateName = () =>{
		if (this.state.name.length < 3){
			this.setState({errorMessage: "you must input a valid name"})
		} else {
			this.setState({errorMessage: null})
		}
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
					<input type="text" onChange={this.handleChange} ref={this.folderInput} />
					<p>{this.state.touched && this.state.errorMessage}</p>
					<button type="submit" >add folder</button>
				</form>
			</div>
			)
	}
}
export default AddFolder