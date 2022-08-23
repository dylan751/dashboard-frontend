import React from 'react';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Link, NavLink } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import {
  MdOutlineCancel,
  MdOutlineTour,
  MdOutlineLocationOn,
  MdOutlineRateReview,
} from 'react-icons/md';
import { FiEdit, FiPieChart, FiShoppingBag } from 'react-icons/fi';
import {
  AiOutlineAreaChart,
  AiOutlineBarChart,
  AiOutlineCalendar,
  AiOutlineShoppingCart,
  AiOutlineStock,
} from 'react-icons/ai';
import { IoMdContact, IoMdContacts, IoMdPaper } from 'react-icons/io';
import { RiShoppingBasket2Line, RiStockLine } from 'react-icons/ri';
import { BsBarChart, BsKanban } from 'react-icons/bs';
import { BiColorFill } from 'react-icons/bi';
import { GiLouvrePyramid } from 'react-icons/gi';
import { StateContextType, useStateContext } from '../contexts/ContextProvider';
import { useTranslation } from 'react-i18next';
// import { links } from '../data/dummy';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const links = [
    {
      title: `${t('sideBar.dashboard')}`,
      links: [
        {
          name: `${t('sideBar.ecommerce')}`,
          url: 'Ecommerce',
          icon: <FiShoppingBag />,
        },
      ],
    },

    {
      title: `${t('sideBar.pages')}`,
      links: [
        {
          name: `${t('sideBar.tours')}`,
          url: 'Tours',
          icon: <MdOutlineTour />,
        },
        {
          name: `${t('sideBar.destinations')}`,
          url: 'Destinations',
          icon: <MdOutlineLocationOn />,
        },
        {
          name: `${t('sideBar.bookingForm')}`,
          url: 'Forms',
          icon: <IoMdPaper />,
        },
        {
          name: `${t('sideBar.reviews')}`,
          url: 'Reviews',
          icon: <MdOutlineRateReview />,
        },
        {
          name: `${t('sideBar.contacts')}`,
          url: 'Contacts',
          icon: <IoMdContact />,
        },
        {
          name: `${t('sideBar.products')}`,
          url: 'Products',
          icon: <AiOutlineShoppingCart />,
        },
        {
          name: `${t('sideBar.orders')}`,
          url: 'Orders',
          icon: <RiShoppingBasket2Line />,
        },
        {
          name: `${t('sideBar.employees')}`,
          url: 'Employees',
          icon: <IoMdContacts />,
        },
      ],
    },
    {
      title: `${t('sideBar.apps')}`,
      links: [
        {
          name: `${t('sideBar.calendar')}`,
          url: 'Calendar',
          icon: <AiOutlineCalendar />,
        },
        {
          name: `${t('sideBar.kanban')}`,
          url: 'Kanban',
          icon: <BsKanban />,
        },
        {
          name: `${t('sideBar.editor')}`,
          url: 'Editor',
          icon: <FiEdit />,
        },
        {
          name: `${t('sideBar.colorPicker')}`,
          url: 'Color-Picker',
          icon: <BiColorFill />,
        },
      ],
    },
    {
      title: `${t('sideBar.charts')}`,
      links: [
        {
          name: `${t('sideBar.line')}`,
          url: 'Line',
          icon: <AiOutlineStock />,
        },
        {
          name: `${t('sideBar.area')}`,
          url: 'Area',
          icon: <AiOutlineAreaChart />,
        },

        {
          name: `${t('sideBar.bar')}`,
          url: 'Bar',
          icon: <AiOutlineBarChart />,
        },
        {
          name: `${t('sideBar.pie')}`,
          url: 'Pie',
          icon: <FiPieChart />,
        },
        {
          name: `${t('sideBar.financial')}`,
          url: 'Financial',
          icon: <RiStockLine />,
        },
        {
          name: `${t('sideBar.colorMapping')}`,
          url: 'Color-Mapping',
          icon: <BsBarChart />,
        },
        {
          name: `${t('sideBar.pyramid')}`,
          url: 'Pyramid',
          icon: <GiLouvrePyramid />,
        },
        {
          name: `${t('sideBar.stacked')}`,
          url: 'Stacked',
          icon: <AiOutlineBarChart />,
        },
      ],
    },
  ];

  const { activeMenu, setActiveMenu, screenSize, currentColor } =
    useStateContext() as StateContextType;

  const handleCloseSidebar = () => {
    if (activeMenu && screenSize && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2';
  const normalLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSidebar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <SiShopware /> <span>Zuong</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() =>
                  setActiveMenu((prevActiveMenu: boolean) => !prevActiveMenu)
                }
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          {/* --- Links --- */}
          <div className="mt-10">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 m-3 mt-4 uppercase">{item.title}</p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.url}`}
                    key={link.name}
                    onClick={handleCloseSidebar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
