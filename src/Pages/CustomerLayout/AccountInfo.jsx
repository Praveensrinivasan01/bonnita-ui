import React, { useState } from 'react';
import '../../Styles/ordersummery.css'

const AccountInfo = () => {
  const [activeTab, setActiveTab] = useState('MyOrder');

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className=''>
      <div className="orderSummery PaddingTop container-md mb-5" >
        <div className="topic">Bonnita</div>
        <div className="content123 ">
          <input type="radio" name="slider" checked={activeTab === 'MyOrder'} id="MyOrder" onChange={() => handleTabChange('MyOrder')} />
          <input type="radio" name="slider" checked={activeTab === 'Mycoupons'} id="Mycoupons" onChange={() => handleTabChange('Mycoupons')} />
          <input type="radio" name="slider" checked={activeTab === 'AllNotification'} id="AllNotification" onChange={() => handleTabChange('AllNotification')} />
          <input type="radio" name="slider" checked={activeTab === 'Whishlist'} id="Whishlist" onChange={() => handleTabChange('Whishlist')} />
          <input type="radio" name="slider" checked={activeTab === 'Profile'} id="Profile" onChange={() => handleTabChange('Profile')} />

          <div className="list">
            <label htmlFor="MyOrder" className={activeTab === 'MyOrder' ? 'MyOrder active' : 'MyOrder'}>
              <span>My Order</span>
            </label>
            <label htmlFor="Mycoupons" className={activeTab === 'Mycoupons' ? 'Mycoupons active' : 'Mycoupons'}>
              <span>My Coupons</span>
            </label>
            <label htmlFor="AllNotification" className={activeTab === 'AllNotification' ? 'AllNotification active' : 'AllNotification'}>
              <span>All Notification</span>
            </label>
            <label htmlFor="Whishlist" className={activeTab === 'Whishlist' ? 'Whishlist active' : 'Whishlist'}>
              <span>My Whishlist</span>
            </label>
            <label htmlFor="Profile" className={activeTab === 'Profile' ? 'Profile active' : 'Profile'}>
              <span>Profile Info</span>
            </label>
            <div className="slider" style={{ top: `${activeTab === 'MyOrder' ? 0 : (activeTab === 'Mycoupons' ? 60 : (activeTab === 'AllNotification' ? 120 : (activeTab === 'Whishlist' ? 180 : 240)))}px` }} />
          </div>

          <div className="text-content">
            <div className={`MyOrder text ${activeTab === 'MyOrder' ? 'active' : ''}`}>
              <div className="title">My Order</div>
             
            </div>
            <div className={`Mycoupons text ${activeTab === 'Mycoupons' ? 'active' : ''}`}>
              <div className="title">Mycoupons Content</div>
            </div>
            <div className={`AllNotification text ${activeTab === 'AllNotification' ? 'active' : ''}`}>
              <div className="title">AllNotification</div>
            </div>
            <div className={`Whishlist text ${activeTab === 'Whishlist' ? 'active' : ''}`}>
              <div className="title">Whishlist</div>
            </div>
            <div className={`Profile text ${activeTab === 'Profile' ? 'active' : ''}`}>
              <div className="title">Profile</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
