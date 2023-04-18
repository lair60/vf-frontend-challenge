import React, { useContext, useReducer, useMemo, createContext } from 'react';
import ActionTypesEnum from '../../Enums';
import Reducer from '../../Reducers';
import AppConfig from '../../Configs';
import { StateInterface, StoreInterface, ProviderInterface } from '../../Interfaces';

export const initialState: StateInterface = {
  appConfig: AppConfig,
  users: null,  
  filterVal : "",
  actionType : ActionTypesEnum,
  since : 0,
  per_page : 30,
  isLoading : false,
  firstBtnLink : null,
  nextBtnLink : null,
  prevBtnLink : null,
  lastBtnLink : null,
};

export const StoreContext = createContext({
  state: initialState,
} as StoreInterface);

export const useStateContext = () => useContext(StoreContext);

export const StoreProvider = ({ children }: ProviderInterface) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const StoreProviderValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <StoreContext.Provider value={StoreProviderValue}>{children}</StoreContext.Provider>;
};
