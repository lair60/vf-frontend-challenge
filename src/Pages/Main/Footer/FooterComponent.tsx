import React, {useRef }  from 'react';
import {useStateContext} from  '../../../Providers';
import {ListUsers} from '../../../Dispatchers';
import ActionTypesEnum from '../../../Enums';

import { useTranslation } from "react-i18next";

const FooterComponent = () => {    
    const { t } = useTranslation();
    const myFirstBtn = useRef(null);
    const myPrevBtn = useRef(null);
    const myNextBtn = useRef(null);
    const myLastBtn = useRef(null);

    const { dispatch, state } = useStateContext();
    const { firstBtnLink, nextBtnLink, prevBtnLink, lastBtnLink , since, per_page, isLoading} = state;

    const enableCtrls = () => {
        if (firstBtnLink)
            myFirstBtn.current.disabled = false;  
        if (prevBtnLink)
             myPrevBtn.current.disabled = false
        if (nextBtnLink)
             myNextBtn.current.disabled = false
        if (lastBtnLink)
             myLastBtn.current.disabled = false
        dispatch({       
          type: ActionTypesEnum.UPDATE_FOOTER,  
          isLoading : false,
        });
    }
    const disableCtrls = () => {
        if (firstBtnLink)
            myFirstBtn.current.disabled = true;  
        if (prevBtnLink)
            myPrevBtn.current.disabled = true;
        if (nextBtnLink)
            myNextBtn.current.disabled = true;
        if (lastBtnLink)
            myLastBtn.current.disabled = true;
        dispatch({       
          type: ActionTypesEnum.UPDATE_FOOTER,
          isLoading : true, 
        });
    }    

  return (
    <div className='blockFooter'>    
        { firstBtnLink &&    
            <button type="button" data-testid="idBtnFirstPage" disabled={isLoading} ref={myFirstBtn} className="btnFirst" onClick={(ev) => {                
                disableCtrls();
                ListUsers( null, per_page, since).then((res) => {     
                    enableCtrls();          
                    dispatch({ 
                      type: ActionTypesEnum.LIST_USERS, 
                      payload: res.data,         
                      headers: res.headers
                    })                    
                  }
                )
                // eslint-disable-next-line no-console
                .catch((error) => {enableCtrls() ; console.error('An error occurred: ', error)});
            }}>{t("first_btn")}</button>
        }
        { prevBtnLink &&    
            <button type="button" data-testid="idBtnPrevPage" disabled={isLoading} ref={myPrevBtn} className="btnPrev" onClick={(ev) => {
                disableCtrls();
                ListUsers( prevBtnLink,null, null).then((res) => {      
                    enableCtrls();            
                    dispatch({ 
                        type: ActionTypesEnum.LIST_USERS, 
                        payload: res.data,              
                        headers: res.headers
                    })
                    
                    }
                )
                // eslint-disable-next-line no-console
                .catch((error) => {enableCtrls(); console.error('An error occurred: ', error)});                                            
            }}>{t("prev_btn")}</button>
        }
        
        { lastBtnLink &&   
            <button type="button" data-testid="idBtnLastPage" disabled={isLoading} ref={myLastBtn} className="btnLast" onClick={(ev) => {
                disableCtrls();
                ListUsers( lastBtnLink,null, null).then((res) => {  
                    enableCtrls();                
                    dispatch({ 
                        type: ActionTypesEnum.LIST_USERS, 
                        payload: res.data,
                        headers: res.headers
                    })
                    
                    }
                )
                // eslint-disable-next-line no-console
                .catch((error) => {enableCtrls();console.error('An error occurred: ', error)});                                 
            }}>{t("last_btn")}</button>
        }

        { nextBtnLink &&    
            <button type="button" data-testid="idBtnNextPage" disabled={isLoading} ref={myNextBtn} className="btnNext" onClick={(ev) => { 
                disableCtrls();
                ListUsers( nextBtnLink,null, null).then((res) => {   
                    enableCtrls();                 
                    dispatch({ 
                        type: ActionTypesEnum.LIST_USERS, 
                        payload: res.data,        
                        headers: res.headers
                    })                    
                    }
                )
                // eslint-disable-next-line no-console
                .catch((error) => {enableCtrls();console.error('An error occurred: ', error)});                          
            }}>{t("next_btn")}</button>
        }
        
    </div>
  )
};
export default FooterComponent;