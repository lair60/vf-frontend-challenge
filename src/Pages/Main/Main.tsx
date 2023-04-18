import React, { useEffect } from 'react';
import HeaderComponent from './Header/HeaderComponent';
import ListComponent from './List/ListComponent';
import FooterComponent from './Footer/FooterComponent';
import {useStateContext} from  '../../Providers';
import {ListUsers} from '../../Dispatchers';
import ActionTypesEnum from '../../Enums';
import './Main.css';

const Main = () => {    
    const { dispatch, state } = useStateContext();
    const { users, since, per_page } = state;

    useEffect(() => {
        let active = true;
        if (users === null) {
          ListUsers( null, per_page, since).then((res) => {            
            if (active){
              dispatch({ 
                type: ActionTypesEnum.LIST_USERS, 
                payload: res.data,
                /*
                ...(since && {since : since}),			
                ...(per_page && {per_page : per_page}),
                */
                headers: res.headers
              })
              
            }}
          )
          // eslint-disable-next-line no-console
          .catch((error) => console.error('An error occurred: ', error));              
        }      
        return () => {
          active = false;
        };    
      }, [users]);
      
  return (
    <div className='blockMain'>
        <HeaderComponent></HeaderComponent>
        <ListComponent></ListComponent>
        <FooterComponent></FooterComponent>
    </div>
  )
};
export default Main;