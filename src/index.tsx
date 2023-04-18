import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ApplicationLayout from './Layout';
import { StoreProvider } from './Providers';
import Main from './Pages/Main';
import DetailPage from './Pages/Detail';
import NotFound from './Pages/NotFound';
import "./services/i18n";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

const container = document.getElementById('root');
const root = createRoot(container);

const application = (
  <Router>
    <StoreProvider>
      <ApplicationLayout>
        <Routes>                    
          <Route path="/" element={<React.Suspense fallback="Loading..."><Main /></React.Suspense>} />          
          <Route path="/users/:userName" element={<DetailPage />} />          
          <Route path="*" element={<NotFound />} />          
        </Routes>
      </ApplicationLayout>
    </StoreProvider>
  </Router>
);

root.render(application);
