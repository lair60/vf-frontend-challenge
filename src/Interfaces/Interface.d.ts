import React, { Dispatch } from 'react';
import { AppConfigType } from '../Configs/AppConfig/AppConfigType.d';
import { UserType } from '../Types';

export interface StateInterface {
  appConfig: AppConfigType;
  users: UserType[] | null;
  actionType : ActionTypesEnum,  
  since : number,
  isLoading : boolean,
  per_page : number,
  filterVal : string,
  firstBtnLink : string | null,
  nextBtnLink : string | null,
  prevBtnLink : string | null,
  lastBtnLink : string | null,
}

export interface StoreInterface {
  // eslint-disable-next-line no-undef
  dispatch: Dispatch<Action>;
  state: StateInterface;
}

export interface ProviderInterface {
  children: React.ReactNode;
}
