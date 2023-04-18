import React from 'react';
import {render, fireEvent, screen, waitFor} from '@testing-library/react'
import Main from '../Pages/Main'
import {MemoryRouter,  BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DetailPage from '../Pages/Detail';
import NotFound from '../Pages/NotFound';
import ActionTypesEnum from '../Enums';
import {StoreContext} from  '../Providers';

import {rest} from 'msw'
import {setupServer} from 'msw/node'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import AppConfig from '../Configs'

const { global: {  apiUrl } } = AppConfig

const mockUser = {
    avatar_url : "https://avatars.githubusercontent.com/u/1?v=4",
    name : 'Tom Preston-Werner',
    location : "San Francisco",
    email : "",
    html_url : "https://github.com/mojombo"
}


const server = setupServer(
    //Method to get the list of users
    rest.get(`${apiUrl}/users`, (req, res, ctx) => {                
        return res(ctx.json([]))
      }),
    //Method to get the user details
    rest.get(`${apiUrl}/users/:userName`, (req, res, ctx) => {                
      return res(ctx.json({avatar_url: mockUser.avatar_url, name: mockUser.name, location : mockUser.location, email: mockUser.email, html_url: mockUser.html_url}))
    }),
  )
  
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

test('Initial Id From & Page Size', async () => {
    
    render(
        <MemoryRouter initialEntries={["/"]}>
            <Routes>
                <Route path="/" element={<React.Suspense fallback="Loading..."><Main /></React.Suspense>} />          
                <Route path="/users/:userName" element={<DetailPage />} />          
                <Route path="*" element={<NotFound />} />     
            </Routes>    
        </MemoryRouter>
    );    
    expect(screen.getByTestId('idFrom').value).toEqual("0");
    expect(screen.getByTestId('idSize').value).toEqual("30");
});

test('onClick Search', async () => {
    const state = {
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
        lastBtnLink : null
    }
    const dispatchMock = jest.fn();
    
    render(        
            <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route path="/" element={                        
                        <StoreContext.Provider value={{ state : state, dispatch: dispatchMock }}>
                            <Main />
                        </StoreContext.Provider>
                        } />                       
                </Routes>    
            </MemoryRouter>        
    );
    await screen.findByTestId('idBtnSearch');
    expect(screen.getByTestId("idBtnSearch")).toBeEnabled()
    userEvent.click(screen.getByTestId( 'idBtnSearch' ))     
    expect(dispatchMock).toHaveBeenCalledWith(expect.objectContaining({type: ActionTypesEnum.LIST_USERS}));    
});

test('onCLick Next Page', async () => {
    const state = {
        appConfig: AppConfig,
        users: null,  
        filterVal : "",
        actionType : ActionTypesEnum,
        since : 0,
        per_page : 30,
        isLoading : false,
        firstBtnLink : null,
        nextBtnLink : "Next_URL",
        prevBtnLink : null,
        lastBtnLink : null
    }
    const dispatchMock = jest.fn();
    
    render(        
            <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route path="/" element={                        
                        <StoreContext.Provider value={{ state : state, dispatch: dispatchMock }}>
                            <Main />
                        </StoreContext.Provider>
                        } />                       
                </Routes>    
            </MemoryRouter>        
    );
    await screen.findByTestId('idBtnNextPage');
    expect(screen.getByTestId("idBtnNextPage")).toBeEnabled()
    userEvent.click(screen.getByTestId( 'idBtnNextPage' )) 
    expect(dispatchMock).toHaveBeenCalledWith(expect.objectContaining({type: ActionTypesEnum.LIST_USERS}));    
});

test('User Detail page', async () => {    
    const { findByTestId, getByTestId } = render(
            <MemoryRouter initialEntries={["/users/mojombo"]}>
                <Routes>
                    <Route path="/users/:userName" element={<DetailPage />} />   
                </Routes>    
            </MemoryRouter>);
    await findByTestId('idUserName');    
    expect( getByTestId( 'idUserName' ) ).toHaveTextContent( mockUser.name ); 
    await findByTestId('idUserAvatar');          
    expect( getByTestId( 'idUserAvatar' ) ).toHaveAttribute('src', mockUser.avatar_url);
    await findByTestId('idUserLocation');        
    expect( getByTestId( 'idUserLocation' ) ).toHaveTextContent( mockUser.location );    
    await findByTestId('idUserEmail');    
    expect( getByTestId( 'idUserEmail' ) ).toHaveTextContent( mockUser.email );    
    await findByTestId('idUserUrl');   
    expect( getByTestId( 'idUserUrl' ) ).toHaveTextContent( mockUser.html_url );   
});

test('Bad Route page', async () => {        
    render(
            <MemoryRouter initialEntries={["/some/bad/route"]}>
                <Routes>
                    <Route path="/" element={<React.Suspense fallback="Loading..."><Main /></React.Suspense>} />          
                    <Route path="/users/:userName" element={<DetailPage />} />          
                    <Route path="*" element={<NotFound />} />     
                </Routes>    
            </MemoryRouter>
        );
    expect(screen.getByText("Not Found!")).toBeInTheDocument()  
});




  