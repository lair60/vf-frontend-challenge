import ActionTypesEnum from '../Enums';
import { UsersType } from '.';

export type ActionTypes =
  | { type: ActionTypesEnum.UPDATE_FILTER | ActionTypesEnum.LIST_USERS | ActionTypesEnum.UPDATE_FOOTER,
     payload: UsersType, 
     headers: {link: string}, 
     filterVal : string, 
     since: number, 
     per_page: number, 
     firstBtnLink : string | null, 
     nextBtnLink: string | null, 
     prevBtnLink: string | null, 
     lastBtnLink: string | null, 
     isLoading:boolean
    }
