'use client';
import Link from "next/link";
import Image from 'next/image';
import './Navbar.scss';
import { useState } from "react";

interface PageIcon {
  id: number;
  iconUrl: string;
  name: string;
  linkUrl: string;
}

const listPages: Array<PageIcon> = [
  {
    id: 1,
    iconUrl: '/assets/icons/home.png',
    name: 'Home',
    linkUrl: '/',
  },
  {
    id: 2,
    iconUrl: '/assets/icons/schedule.png',
    name: 'Schedule',
    linkUrl: '/',
  }
];

const clickedItemStyles = {
  backgroundColor: '#F5F5F7',
  borderBottom: '1px solid #00B4D8'
}

const Navbar = () => {
  const [currentClickedNavItem, setCurrentClickedNavItem] = useState(listPages[0]);

  const handleClickOnNavItem = (item: PageIcon): void => {
    setCurrentClickedNavItem(item);
  }
  return (
    <div className="nav">
      <ul>
        {listPages.map((item) => (
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
    </div>
  );
}

export default Navbar;