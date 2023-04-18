import React, { useState,useEffect } from 'react';
import {FetchUser} from '../../Dispatchers';
import { useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import './Detail.css';

const DetailPage = () => {
    const { t } = useTranslation();
    const { userName } = useParams();    
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (user === null) FetchUser( userName).then(res =>{
            setUser(res.data)
        });
      }, [user]);
    return (
        <div className='blockDetail'>            
          <h3>{t("headerTitleDetail")}</h3>  
          {user &&
            <div>
              <img data-testid="idUserAvatar" src={user.avatar_url}></img>
            </div>
          }
          {user &&
            <div>          
              <strong>{t("labelNameDetail")}</strong>
              <div data-testid="idUserName">
                  {user.name}
              </div>
            </div>
          }
          <br/>
          {user &&
            <div>
              <strong>{t("labelLocationDetail")}</strong>
              <div data-testid="idUserLocation">
                  {user.location}
              </div>
            </div>
          }
          <br/>
          {user &&
            <div>
              <strong>{t("labelEmailDetail")}</strong>
              <div data-testid="idUserEmail">
                  {user.email}
              </div>
            </div>
          }
          <br/>
          {user &&
            <div>
              <strong>{t("labelUrlDetail")}</strong>
              <br/>
              <a data-testid="idUserUrl" href={user ? user.html_url: ""} target="_blank">
                  {user.html_url}
              </a>
            </div>
          }
        </div>
    )
    };
    
export default DetailPage;