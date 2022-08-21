import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { DropDownButtonComponent } from '@syncfusion/ej2-react-splitbuttons';

import { useNavigate } from 'react-router-dom';

import avatar from '../public/images/avatar.jpg';
import { Cart, Chat, Notification, UserProfile } from '.';
import { StateContextType, useStateContext } from '../contexts/ContextProvider';

import { useTranslation } from 'react-i18next';
import languageMap, {
  languageItems,
  LanguageMapType,
} from '../locales/languageMap';

interface NavButtonInterface {
  title?: string;
  customFunc?: () => any;
  icon?: React.ReactElement;
  color?: string;
  dotColor?: string;
}

const NavButton = ({
  title,
  customFunc,
  icon,
  color,
  dotColor,
}: NavButtonInterface) => {
  return (
    <TooltipComponent content={title} position="BottomCenter">
      <button
        type="button"
        onClick={customFunc}
        style={{ color }}
        className="relative text-xl rounded-full p-3 hover:bg-light-gray"
      >
        <span
          style={{ background: dotColor }}
          className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
        />
        {icon}
      </button>
    </TooltipComponent>
  );
};

const Navbar: React.FC = () => {
  const { i18n } = useTranslation();
  const {
    setActiveMenu,
    isClicked,
    handleClick,
    screenSize,
    setScreenSize,
    currentColor,
  } = useStateContext() as StateContextType;
  const navigate = useNavigate();
  const { currentUser, setUser } = useStateContext() as StateContextType;

  // If on mobile -> Initially close the Sidebar
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);

    handleResize(); // Call initially

    // Clean up function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenSize && screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <NavButton
        title="Menu"
        customFunc={() =>
          setActiveMenu((prevActiveMenu: boolean) => !prevActiveMenu)
        }
        color={currentColor}
        icon={<AiOutlineMenu />}
      />

      <div className="flex">
        {/* Select languages */}
        <DropDownButtonComponent
          items={languageItems}
          select={(value) => i18n.changeLanguage(value.item.properties.id)}
        >
          {languageMap[i18n.resolvedLanguage as keyof LanguageMapType]}
        </DropDownButtonComponent>

        <NavButton
          title="Cart"
          customFunc={() => handleClick('cart')}
          color={currentColor}
          icon={<FiShoppingCart />}
        />
        <NavButton
          title="Chat"
          dotColor="#03C9D7"
          customFunc={() => handleClick('chat')}
          color={currentColor}
          icon={<BsChatLeft />}
        />
        <NavButton
          title="Notification"
          dotColor="#03C9D7"
          customFunc={() => handleClick('notification')}
          color={currentColor}
          icon={<RiNotification3Line />}
        />
        {!currentUser ? (
          <TooltipComponent content="Profile" position="BottomCenter">
            <div
              className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg ml-4"
              // onClick={() => handleClick('userProfile')}
              onClick={() => navigate('/user-profile')}
            >
              <img className="rounded-full w-8 h-8" src={avatar} />
              <p>
                <span className="text-gray-400 text-14">Hi, </span>{' '}
                <span className="text-gray-400 font-bold ml-1 text-14">
                  Zuong
                </span>
              </p>
              <MdKeyboardArrowDown className="text-gray-400 text-14" />
            </div>
          </TooltipComponent>
        ) : (
          <button
            onClick={() => setUser(undefined)}
            className="border-none rounded py-0 px-4 text-white ml-4"
            style={{ background: currentColor }}
          >
            Log out
          </button>
        )}

        {/* Login Button */}
        {!currentUser && (
          <button
            onClick={() => {
              navigate('/login');
            }}
          >
            Login
          </button>
        )}

        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
