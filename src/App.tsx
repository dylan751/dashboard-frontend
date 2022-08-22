import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import {
  Navbar,
  Sidebar,
  ThemeSettings,
  UserProfile,
  LogInForm,
  SignUpForm,
} from './components';
import {
  Ecommerce,
  Orders,
  Calendar,
  Employees,
  Tours,
  Destinations,
  Stacked,
  Pyramid,
  Kanban,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorPicker,
  ColorMapping,
  Editor,
  Reviews,
  BookingForms,
} from './pages';

import { StateContextType, useStateContext } from './contexts/ContextProvider';

import './App.css';
import RequireAuth from './components/Auth/RequireAuth';

const App: React.FC = () => {
  const {
    activeMenu,
    themeSettings,
    setThemeSettings,
    currentColor,
    currentMode,
  } = useStateContext() as StateContextType;

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      {/* <BrowserRouter> */}
      <RequireAuth>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent content="Settings" position="TopLeft">
              <button
                type="button"
                className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {/* --- Sidebar --- */}
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          {/* --- Navbar --- */}
          <div
            className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
              activeMenu ? 'md:ml-72' : 'flex-2'
            }`}
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>

            {/* --- Routing --- */}
            <div>
              {themeSettings && <ThemeSettings />}

              <Routes>
                {/* User */}
                <Route path="/login" element={<LogInForm />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/user-profile" element={<UserProfile />} />

                {/* Dashboard */}
                <Route path="/" element={<Ecommerce />} />
                <Route path="/ecommerce" element={<Ecommerce />} />

                {/* Pages */}
                <Route path="/orders" element={<Orders />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/tours" element={<Tours />} />
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/forms" element={<BookingForms />} />
                <Route path="/reviews" element={<Reviews />} />

                {/* Apss */}
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/color-picker" element={<ColorPicker />} />

                {/* Charts */}
                <Route path="line" element={<Line />} />
                <Route path="area" element={<Area />} />
                <Route path="bar" element={<Bar />} />
                <Route path="pie" element={<Pie />} />
                <Route path="financial" element={<Financial />} />
                <Route path="color-mapping" element={<ColorMapping />} />
                <Route path="pyramid" element={<Pyramid />} />
                <Route path="stacked" element={<Stacked />} />
              </Routes>
            </div>
          </div>
        </div>
      </RequireAuth>
      {/* </BrowserRouter> */}
    </div>
  );
};

export default App;
