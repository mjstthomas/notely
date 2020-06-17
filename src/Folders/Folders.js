import React from 'react'
import {Route, Link} from 'react-router-dom'
import AppContext from '../AppContext'
import FolderError from './FolderError'

class Folders extends React.Component{
	static contextType = AppContext
	handleDelete = event => {
		event.preventDefault()
		const {id} = event.target
		fetch(`http://localhost:8000/api/folders/${id}`, {
      		method: 'DELETE',
      		headers: {'content-type': 'application/json'},
    		})
			.catch(error => console.log(error))
			this.context.deleteFolder(id)
			this.props.history.push('/')
		}
	render(){
		const folder = this.context.folders.map(folder => <li key={folder.id} className="links"><div className="deleteBtn-container"><button id={folder.id} className="deleteBtn" onClick={this.handleDelete}>-</button></div><Link to={`/folders/${folder.id}`}><button className="folders">{folder.folderName}</button></Link></li>)
		return (
			<FolderError>
				<div>
					<ul>
						{folder}
					</ul>
					<Link to='/folders/:folderId/addfolder'><button className="addBtn">+</button></Link>
				</div>
			</FolderError>
			)}
}
export default Folders