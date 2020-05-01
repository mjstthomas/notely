import React from 'react'
import {Route, Link} from 'react-router-dom'
import AppContext from '../AppContext'
import FolderError from './FolderError'

class Folders extends React.Component{
	static contextType = AppContext
	
	render(){
		const folder = this.context.folders.map(folder => <li key={folder.id} className="links"><Link to={`/folders/${folder.id}`}><button className="folders">{folder.name}</button></Link></li>)
		return (
			<FolderError>
				<div>
					<ul>
						{folder}
					</ul>
					<Link to='/folders/:folderId/addfolder'><button>New Folders</button></Link>
				</div>
			</FolderError>
			)}
}
export default Folders