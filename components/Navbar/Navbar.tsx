'use client';
import Link from "next/link";
import Image from 'next/image';
import './Navbar.scss';
import { useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";

interface PageIcon {
  id: number;
  iconUrl: string;
  name: string;
  linkUrl: string;
  isTopIcon: boolean;
}

const listPages: Array<PageIcon> = [
  {
    id: 1,
    iconUrl: '/assets/icons/home.svg',
    name: 'Home',
    linkUrl: '/',
    isTopIcon: true,
  },
  {
    id: 2,
    iconUrl: '/assets/icons/calendar.svg',
    name: 'Schedule',
    linkUrl: '/',
    isTopIcon: true,
  },
  {
    id: 3,
    iconUrl: '/assets/icons/account.svg',
    name: 'Account',
    linkUrl: 'javascript:void(0)',
    isTopIcon: false,
  },
];

const accountSubnavButtons = [
  {
    id: 1,
    iconUrl: '/assets/icons/profile.svg',
    name: 'View Profile',
    linkUrl: '/',
    isLink: true,
  },
  {
    id: 2,
    iconUrl: '/assets/icons/setting.svg',
    name: 'Setting',
    linkUrl: '/',
    isLink: true,
  },{
    id: 3,
    iconUrl: '/assets/icons/sign-out.svg',
    name: 'Sign Out',
    linkUrl: '#',
    action: () => signOut(),
    isLink: false,
  },
]

const clickedItemStyles = {
  backgroundColor: '#F5F5F7',
  borderBottom: '1px solid #00B4D8'
}

const Navbar = () => {
  const [currentClickedNavItem, setCurrentClickedNavItem] = useState(listPages[0]);
  const [isSubnavOpened, setIsSubnavOpened] = useState(false);

  const nav = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSubnavOpened && !nav.current?.contains(event.target as Node)) {
        console.log("eeeeeeee", isSubnavOpened)
        setIsSubnavOpened(isSubnavOpened => !isSubnavOpened);
        nav.current?.classList.remove('appear');
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [isSubnavOpened]);

  const handleClickOnNavItem = (item: PageIcon): void => {
    setCurrentClickedNavItem(item);

    if(item.name === "Account") {
      setIsSubnavOpened(isSubnavOpened => !isSubnavOpened);
      nav.current = document.getElementsByClassName('account-subnav')[0] as HTMLElement;
      if(isSubnavOpened) {
        nav.current.classList.remove('appear');
      } else {
        nav.current.classList.add('appear');
      }
    }
  }

  return (
    <div className="nav-wrapper">
      <div className="nav">
        <ul>
        {listPages.map((item) => item.isTopIcon && (
          <li key={item.id} 
            style={
              currentClickedNavItem.id === item.id 
              ? clickedItemStyles
              : {}
            }
            onClick={() => handleClickOnNavItem(item)} 
          >
            <Link href={item.linkUrl}>
              <Image src={item.iconUrl} alt={item.name} width={24} height={24}/>
              <p>{item.name}</p>
            </Link>
          </li>
        ))}
        </ul>

        <ul>
        {listPages.map((item) => !item.isTopIcon && (
          <li key={item.id} 
            style={
              currentClickedNavItem.id === item.id 
              ? clickedItemStyles
              : {}
            }
            onClick={() => handleClickOnNavItem(item)} 
          >
            <Link href={item.linkUrl}>
              <Image src={item.iconUrl} alt={item.name} width={24} height={24}/>
              <p>{item.name}</p>
            </Link>

            {
            item.name === "Account" && 
            <ul className="account-subnav">
              {
                accountSubnavButtons.map(btn => (
                  btn.isLink ?
                  <li key={btn.id} onClick={btn.action}>
                    <Link href={btn.linkUrl}>
                      <p>{btn.name}</p>
                      <Image 
                        className="option-icon" 
                        src={btn.iconUrl} 
                        width={16} 
                        height={16} 
                        alt={btn.name}
                      />
                    </Link>
                  </li>
                  : 
                  <li key={btn.id} onClick={btn.action}>
                    <div>
                      <p>{btn.name}</p>
                      <Image 
                        className="option-icon" 
                        src={btn.iconUrl} 
                        width={16} 
                        height={16} 
                        alt={btn.name}
                      />
                    </div>
                  </li>
                ))
              }
            </ul>
            }
          </li>
        ))}
        </ul>
        
      </div>
    </div>
  );
}

export default Navbar;