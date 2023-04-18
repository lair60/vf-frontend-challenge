import React, {useRef } from 'react';
import {useStateContext} from  '../../../Providers';
import {ListUsers} from '../../../Dispatchers';
import ActionTypesEnum from '../../../Enums';

import { useTranslation } from "react-i18next";

const HeaderComponent = () => {   
  const { t } = useTranslation();
  const myRefSince = useRef(null);
  const myRefSizePage = useRef(null);
  const myRefButton = useRef(null);
  const { dispatch, state } = useStateContext();  
  const {since, per_page, isLoading} = state;

  const enableCtrls = () => {
      myRefButton.current.disabled = false;  
      myRefSince.current.disabled = false;
      myRefSizePage.current.disabled = false;
      dispatch({       
        type: ActionTypesEnum.UPDATE_FOOTER,  
        isLoading : false,
      });
  }
  const disableCtrls = () => {
      myRefButton.current.disabled = true;  
      myRefSince.current.disabled = true;
      myRefSizePage.current.disabled = true;
      dispatch({       
        type: ActionTypesEnum.UPDATE_FOOTER,
        isLoading : true, 
      });
  }

  
  const handleInput = (event: any) => {
    if ((event.keyCode === 13)&& (myRefSince.current.value>=0)) {  
      disableCtrls();        
      ListUsers( null, myRefSizePage.current.value, myRefSince.current.value,).then((res) => {                
          enableCtrls();
          dispatch({ 
            type: ActionTypesEnum.LIST_USERS, 
            payload: res.data,
            since : myRefSince.current.value,			
            per_page : myRefSizePage.current.value,
            headers: res.headers
          })
          
        }
      )
      // eslint-disable-next-line no-console
      .catch((error) => {
          console.error('An error occurred: ', error)
          enableCtrls();           
        }); 
    }
  }
  

  let sizes = []
    for(var i =0; i<100;i++){
        sizes.push(i+1)
    }
    
  return (
    <div className='blockHeader'>
        
        <label htmlFor="sizePage" title={t("tooltipSize")}>{t("labelSize")}</label>
        <select name="selectSize" data-testid="idSize" title={t("tooltipSize")} ref={myRefSizePage}  disabled={isLoading} defaultValue={per_page} id="sizePage" className="selectSize">
            {sizes.map(i => (
                i==per_page ? <option key={""+i} value={i}>{i}</option> : <option key={""+i} value={i}>{i}</option>   
            ))}
            {sizes}
        </select>  


        <label htmlFor="idFrom" title={t("tooltipSince")}>{t("labelSince")}</label>  
        <input id="idFrom" data-testid="idFrom" type="number" ref={myRefSince} defaultValue={since} disabled={isLoading} title={t("tooltipSince")} onKeyDown ={handleInput} className="inputPage"/>
        <button type="button" data-testid="idBtnSearch" className="btnSearch" ref={myRefButton} disabled={isLoading} onClick={(ev) => {  
          console.log("CLICK")          
          console.log("myRefSince.current.value: "+myRefSince.current.value)          
            if (myRefSince.current.value>=0){                      
              disableCtrls();  
              ListUsers( null, myRefSizePage.current.value, myRefSince.current.value,).then((res) => {                      
                  enableCtrls();                     
                  dispatch({ 
                    type: ActionTypesEnum.LIST_USERS, 
                    payload: res.data,
                    since : myRefSince.current.value,			
                    per_page : myRefSizePage.current.value,
                    headers: res.headers
                  })
                  
                }
              )
              // eslint-disable-next-line no-console
              .catch((error) => {enableCtrls(); console.error('An error occurred: ', error)}); 
            }
        }}>{t("search_button")}</button>
    </div>
  )
};
export default HeaderComponent;