import React from 'react'
import AppContext from '../AppContext'

class AddFolder extends React.Component{
	state = {
		id: this.context.folders.length.toString(),
		folderName: '',
		touched: false,
		errorMessage: ''
	}
	static contextType = AppContext

	handleChange= event =>{
		this.setState({
			folderName: event.target.value,
			touched: true})
		this.validateName()
		console.log(this.state.touched)
	}
	validateName = () =>{
		if (this.state.folderName.length < 3){
			this.setState({errorMessage: "you must input a valid name"})
		} else {
			this.setState({errorMessage: null})
		}
	}
	handleSubmit=event=>{
		event.preventDefault()
		const newFolder = {
			id: this.context.folders.length + 1,
			folderName: this.state.folderName
		}
		fetch('http://localhost:8000/api/folders', {
			method: 'POST',
			body: JSON.stringify(newFolder),
			headers: {'content-type': 'application/json'}
		})
		this.context.handleFolderSubmit()
		setTimeout(() =>{
			this.props.history.push('/')
		}, 3000)

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