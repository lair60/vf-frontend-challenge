import axios from 'axios';
import AppConfig from '../../Configs'

//--------------To get the user details---------------------------------
const FetchUser = (userName: string) => {
	const { global: {  apiUrl,apiToken } } = AppConfig	
	return axios.get(`${apiUrl}/users/`+userName, ((apiToken.length>0) && {
		headers: {
		  'Authorization': `token ${apiToken}`
		}
	  }))
}
//-------------To get the list of users----------------------------------
const ListUsers = (fullPath: string, per_page: number, since: number) => {
	const { global: { apiUrl, apiToken } } = AppConfig	
	return axios.get(fullPath ? fullPath : `${apiUrl}/users?since=`+ since + `&per_page=` + per_page ,((apiToken.length>0) && {
		headers: {			
		  'Authorization': `token ${apiToken}`
		}
	  }))
}

export {FetchUser, ListUsers}
