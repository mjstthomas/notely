import React from 'react'
import {Route, Link} from 'react-router-dom'
import AppContext from '../AppContext'

class Folders extends React.Component{
	static contextType = AppContext
	
	render(){
		const folder = this.context.folders.map(folder => <li className="links"><Link to={`/folders/${folder.id}`}><button className="folders">{folder.name}</button></Link></li>)
		return (
			<div>
				<ul>
					{folder}
				</ul>
				<Link to='/folders/:folderId/addfolder'><button>New Folders</button></Link>
			</div>
			)}
}
export default Folders