import React from 'react'
import {Route, Link} from 'react-router-dom'

export default function Folders(props){
	const folder = props.folders.map(folder => <li className="links"><Link to={`/folders/${folder.id}`}><button className="folders">{folder.name}</button></Link></li>)
	return (
		<div>
			<ul>
				{folder}
			</ul>
			<button>New Folders</button>
		</div>
		)
}