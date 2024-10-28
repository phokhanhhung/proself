"use client"
import Image from "next/image";
import "./Profile.scss";
import { useEffect, useRef } from "react";

const Profile = () => {

  const tabButtons = useRef<HTMLElement | null>(null);

  useEffect(() => {
    tabButtons.current = document.getElementsByClassName(`profile-tabs`)[0] as HTMLElement;
  }, [])

  const profileTabs = [
    {
      id: 1,
      tabName: "Overview" 
    },
    {
      id: 2,
      tabName: "My Calendar" 
    },
    {
      id: 3,
      tabName: "Security" 
    },
  ]

  const handleChangeTab = (tabId: number) => {
    switch(tabId) {
      case 1: 
        tabButtons.current?.classList.remove("move-to-second-tab", "move-to-third-tab");
        return;
      case 2:
        tabButtons.current?.classList.add("move-to-second-tab");
        tabButtons.current?.classList.remove("move-to-third-tab");
        return;
      case 3:
        tabButtons.current?.classList.add("move-to-third-tab");
        tabButtons.current?.classList.remove("move-to-second-tab");
        return;
      default:
        return;
    }
  }

  return (
    <div className="profile">
      <div className="profile-background">
        <button>
          <Image 
            src="/assets/icons/camera.svg" 
            alt="camera" 
            height={20} 
            width={24}
          ></Image>
          Edit cover
        </button>
      </div>
      <div className="profile-body">
        <div className="profile-account">
          <div className="profile-account-image">
            <div className="profile-account-avatar-wrapper">
              <div className="profile-account-avatar">
                <Image 
                  src="/assets/icons/default-avatar.svg" 
                  alt="default-image" 
                  height={240} 
                  width={240}
                ></Image>
              </div>
              <button>
                <Image 
                  src="/assets/icons/camera.svg" 
                  alt="camera" 
                  height={20} 
                  width={24}
                ></Image>
              </button>
            </div>
          </div>
          <div className="profile-account-info">
            <div className="profile-account-name">
              <h2>Huynh Thanh Liem</h2>
              <p>@ht.liam</p>
            </div>
            <div className="profile-account-bio">
              Hi! <br/>
              Welcome to Proself!
            </div>
            <div className="profile-account-others">
              <div className="profile-account-other-info">
                <Image 
                  src="/assets/icons/location.svg" 
                  alt="camera" 
                  height={13} 
                  width={16}
                ></Image>
                <p>Ho Chi Minh City, Vietnam </p>
              </div>
              <div className="profile-account-other-info">
                <Image 
                  src="/assets/icons/mail.svg" 
                  alt="camera" 
                  height={16} 
                  width={13}
                ></Image>
                <p>liemht23@gmail.com</p>
              </div>
              <div className="profile-account-other-info">
                <Image 
                  src="/assets/icons/phone.svg" 
                  alt="camera" 
                  height={16} 
                  width={16}
                ></Image>
                <p>037 557 7127</p>
              </div>
              <div className="profile-account-other-info">
                <Image 
                  src="/assets/icons/facebook.svg" 
                  alt="camera" 
                  height={16} 
                  width={16}
                ></Image>
                <p>facebook.com/liemht.2303/</p>
              </div>
            </div>
            <button>
              <Image 
                src="/assets/icons/edit.svg" 
                alt="camera" 
                height={23} 
                width={24}
              ></Image>
              Edit profile
            </button>
          </div>
        </div>
        <div className="profile-other-info">
          <div className="profile-other-info-header">
            <div className="profile-tabs">
              {profileTabs.map(tab => (
                <div key={tab.id} className="profile-tab" onClick={() => handleChangeTab(tab.id)}>{tab.tabName}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;