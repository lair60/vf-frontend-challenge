import React, {useRef} from 'react';
import { NavLink } from 'react-router-dom';
import {useStateContext} from  '../../../Providers';
import ActionTypesEnum from '../../../Enums';

import { useTranslation } from "react-i18next";
import './ListComponent.css';

const ListComponent = () => {  
    const { t } = useTranslation();
    const myRef = useRef(null);  
    const { dispatch, state } = useStateContext();
    const { filterVal, users , isLoading} = state;    

    const handleFilter = (event:any) =>{        
        //update the filter string
        dispatch({type: ActionTypesEnum.UPDATE_FILTER, filterVal: myRef.current.value})
    }

    let listUsers = []
    if(users && (filterVal != "")){
        for(var i= 0; i< users.length; i++){            
            if (users[i].login.toLowerCase().indexOf(filterVal.toLowerCase()) != -1){                
                listUsers.push((
                <tr key={users[i].id}>
                    <td>{users[i].id}</td>
                    <td>
                        <div>
                            <img src={users[i].avatar_url}></img>
                            <NavLink to={`/users/${users[i].login}`} >{users[i].login}</NavLink>          
                        </div>                        
                    </td>  
                    <td>{users[i].type}</td>          
                </tr>));
            }
        }
    }else{
        listUsers = users ? users.map( user =>
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                    <div>
                        <img src={user.avatar_url}></img>
                        <NavLink to={`/users/${user.login}`}>{user.login}</NavLink>          
                    </div>
                    
                </td>      
                <td>{user.type}</td> 

            </tr>
          ) : [];
    }
    
    return (
        <>
            {isLoading && <div>Loading...</div>}
            {!isLoading && 
                <div>
                    <h2 data-testid="idTitleTable">{t("users_header")}({users ? users.length : 0})</h2>
                    <table>                
                        <thead>
                            <tr>
                                <th>{t("id_table")}</th>
                                <th>{t("name_table")}<input className="filterInput" onInput ={handleFilter} placeholder={t("placeholder_filter")} ref={myRef} defaultValue={filterVal}></input></th>
                                <th>{t("type_table")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUsers} 
                        </tbody>
                    </table>        
                </div>
            }
        </>
    )
};
export default ListComponent;