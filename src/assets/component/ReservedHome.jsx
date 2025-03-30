import React, { useState } from "react";
import '../css/ScrollBar.css';
import ButtomBuy from "./ButtomBuy";
import { Link } from "react-router-dom";

const TenantApps = () => {
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);

    //Tenants Data
  const tenants = {
    Ecommerce: [
      { name: "Tomiwa Fashion Store", description: "Tomiwa Fashions have been in business for more than 25 years in America and 40 years in Nigeria. Our business is designed to provide quality, beautiful products and render rewarding services to our clients." },
      { name: "Best Price Retails", description: "Best Price Retail is an online shopping store that focus on organic food" },
      { name: "Noble Baby Store", description: "Noble Baby Store is an online shopping store that focus on baby wears and accessories" },
      { name: "Resin By Saidat", description: "This is an ecommerce website to purchase resin materials" },
    ],

    "Church Website": [
      { name: "Christ Ambassador Church", description: "Christ Ambassador Church is a religion center that help individuals DISCOVER, DEVELOP AND DEPLOY personal talents towards achieving the Kingdom purpose." },
      { name: "CAC Lightway Assembly", description: "CAC Lightway Assembly is a vibrant community of believers committed to loving God, loving people, and making a positive impact in our world." },
    ],

    "Cargo Website": [
        { name: "Modest Cargo", description: "Modest Cargo is a modern and efficient shipping and haulage company that gets your parcel to the desired destination from USA to Nigeria or from Nigeria to the USA on time and at the cheapest cost you could ever imagine." },
        { name: "Tofar Logistics Agency", description: "Tofar Logistics Agency is a modern and efficient shipping company that gets your parcel to the desired destination" },
        { name: "Sugor Cargo", description: "Sugor Cargo is a modern and efficient shipping company that gets your parcel to the desired destination" },
    ],

    "School Website": [
        { name: "Royal Pride School", description: "Royal Pride School is committed to providing an academically rigorous education to students who will walk out of school ready for lives of leadership and service to their community." },
        { name: "School ERP", description: "School ERP is an online platform that showcase all the features a school should have" },
        { name: "Sense Academy", description: "Sense Academy is a Learning Management System" },
    ],

    'Portfolio Website': [
        { name: "Portfolio v1", description: "To showcase the professional skills" },
        { name: "Portfolio v2", description: "To showcase the professional skills" },
        { name: "Portfolio v3", description: "To showcase the professional skills" },
        { name: "Portfolio v4", description: "To showcase the professional skills" },
        { name: "Portfolio v5", description: "To showcase the professional skills" },
    ],

    'Business Websites': [
        { name: "Anetly Global Concept", description: "Anetly Global Concept is proudly one of the #1 ad sites in Nigeria, trusted by countless users across the country for seamless ad placements and effective outreach." },
        { name: "Paysholly Exchange", description: "Paysholly is an only trading platform for Bitcoin and other Crypocurrencies." },
    ],

    "React Project": [
        { name: "Equip1000 Project", description: "This is an online learning platform for students to learn tech skills" },
        { name: "Resin By Saidat", description: "This is an ecommerce website to purchase resin materials" },
        { name: "Fidar App", description: "Fidar is a powerful SaaS product that revolutionizes file management, communication, and document creation." },
        { name: "Registration Form", description: "This is an user interface for different forms" },
        { name: "App Directory", description: "This is a webpage that can be used to organize all apps" },
    ],

    "Stactic Website": [
        { name: "Portfolio", description: "" },
        { name: "Sense Tech", description: "" },
        { name: "Portfolio v3", description: "" },
        { name: "Sense Shopping", description: "" },
        { name: "Weather App", description: "" },
        { name: "Account Dashboard", description: "" },
        { name: "Musiq", description: "" },
        { name: "Keyboard", description: "" },
        { name: "Computer Store", description: "" },
        { name: "Sense Book", description: "" },
    ],
    Others: [
        { name: "Other websites", description: "This is for reseved webistes" },
    ],
    // Add more tenants and their apps here
  };

    //Programs data list
  const apps = {

      // Ecommerce
    'Tomiwa Fashion Store': [
      { title: "Tomiwa Fashion Store", name: "Production", description: "Tomiwa Fashions have been in business for more than 25 years in America and 40 years in Nigeria. Our business is designed to provide quality, beautiful products and render rewarding services to our clients.", link: "https://tomiwafashions.com" },
    ],
    'Best Price Retails': [
      { title: "Best Price Retails", name: "Production", description: "Best Price Retail is an online shopping store that focus on organic food", link: "https://bestpriceretails.com.ng" },
    ],
    'Noble Baby Store': [
      { title: "Noble Baby Store", name: "Production", description: "Noble Baby Store is an online shopping store that focus on baby wears and accessories", link: "https://noblebabiesandmart.com" },
    ],
    "Resin By Saidat": [
      { title: "Resin By Saidat", name: "Production", description: "This is an ecommerce website to purchase resin materials", link: "https://saidatsokoya.github.io/resin-by-saidat" },
    ],

    // Church
    "Christ Ambassador Church": [
      { title: "Christ Ambassador Church", name: "Production", description: "Christ Ambassador Church is a religion center that help individuals DISCOVER, DEVELOP AND DEPLOY personal talents towards achieving the Kingdom purpose.", link: "https://christambassadorshouston.org" },
    ],
    "CAC Lightway Assembly": [
      { title: "CAC Lightway Assembly", name: "Production", description: "CAC Lightway Assembly is a vibrant community of believers committed to loving God, loving people, and making a positive impact in our world.", link: "https://caclightway.com" },
    ],

    // Cargo
    "Modest Cargo": [
      { title: "Modest Cargo", name: "Production", description: "Modest Cargo is a modern and efficient shipping and haulage company that gets your parcel to the desired destination from USA to Nigeria or from Nigeria to the USA on time and at the cheapest cost you could ever imagine.", link: "https://modestcargo.com" },
    ],
    'Tofar Logistics Agency': [
      { title: "Tofar Logistics Agency", name: "Under Development", description: "Tofar Logistics Agency is a modern and efficient shipping company that gets your parcel to the desired destination", link: "https://tofarlogisticsagency.com" },
    ],
    'Sugor Cargo': [
      { title: "Sugor Cargo", name: "Under Development", description: "Sugor Cargo is a modern and efficient shipping company that gets your parcel to the desired destination", link: "#" },
    ],

    // School
    'Royal Pride School': [
      { title: "Royal Pride School", name: "Production", description: "Royal Pride School is committed to providing an academically rigorous education to students who will walk out of school ready for lives of leadership and service to their community.", link: "https://royalprideschool.com" },
    ],
    'School ERP': [
      { title: "School ERP", name: "Production", description: "School ERP is an online platform that showcase all the features a school should have", link: "https://azeezfasasi.github.io/School-ERP" },
    ],
    'Sense Academy': [
      { title: "Sense Academy", name: "Production", description: "Sense Academy is a Learning Management System", link: "https://azeezfasasi.github.io/sense-academy" },
    ],

    // Portfolio
    'Portfolio v1': [
      { title: "Portfolio v1", name: "Production", description: "To showcase the professional skills", link: "https://azeezfasasi.github.io/portfolio" },
    ],
    'Portfolio v2': [
      { title: "Portfolio v2", name: "Production", description: "To showcase the professional skills", link: "https://azeezfasasi.github.io/azeez-portfolio" },
    ],
    'Portfolio v3': [
      { title: "Portfolio v3", name: "Production", description: "To showcase the professional skills", link: "https://azeezfasasi.github.io/my-portfolio" },
    ],
    'Portfolio v4': [
      { title: "Portfolio v4", name: "Production", description: "To showcase the professional skills", link: "https://azeezfasasi.github.io/portfolio-website" },
    ],
    'Portfolio v5': [
      { title: "Portfolio v5", name: "Production", description: "To showcase the professional skills", link: "https://azeezfasasi.github.io/One-page-portfolio" },
    ],

    // Business
    'Anetly Global Concept': [
      { title: "Anetly Global Concept", name: "Production", description: "Anetly Global Concept is proudly one of the #1 ad sites in Nigeria, trusted by countless users across the country for seamless ad placements and effective outreach.", link: "https://anetlyglobalconcept.com" },
    ],
    'Paysholly Exchange': [
      { title: "Paysholly Exchange", name: "Production", description: "Paysholly is an only trading platform for Bitcoin and other Crypocurrencies.", link: "https://paysholly.anetlyglobalconcept.com" },
    ],

    // React
    'Equip1000 Project': [
      { title: "Equip1000 Project", name: "Production", description: "This is an online learning platform for students to learn tech skills", link: "https://anetlyglobalconcept.com" },
    ],
    'Fidar App': [
      { title: "Equip1000 Project", name: "Production", description: "This is an online learning platform for students to learn tech skills", link: "https://anetlyglobalconcept.com" },
    ],
    'Registration Form': [
      { title: "Registration Form", name: "Production", description: "This is an user interface for different forms", link: "https://paysholly.anetlyglobalconcept.com" },
    ],
    'App Directory': [
      { title: "App Directory", name: "Production", description: "This is a webpage that can be used to organize all apps", link: "https://paysholly.anetlyglobalconcept.com" },
    ],

    // Static
    'Portfolio': [
      { title: "Portfolio", name: "Production", description: "To showcase the professional skills", link: "#" },
    ],
    'Sense Tech': [
      { title: "Sense Tech", name: "Production", description: "", link: "#" },
    ],
    'Sense Shopping': [
      { title: "Sense Shopping", name: "Production", description: "", link: "#" },
    ],
    'Weather App': [
      { title: "Weather App", name: "Production", description: "", link: "#" },
    ],
    'Account Dashboard': [
      { title: "Account Dashboard", name: "Production", description: "", link: "#" },
    ],
    'Musiq': [
      { title: "Musiq", name: "Production", description: "", link: "#" },
    ],
    'Keyboard': [
      { title: "Keyboard", name: "Production", description: "", link: "#" },
    ],
    'Computer Store': [
      { title: "Computer Store", name: "Production", description: "", link: "#" },
    ],
    'Sense Book': [
      { title: "Sense Book", name: "Production", description: "", link: "#" },
    ],

    // Others
    'Other websites': [
      { title: "Other websites", name: "Production", description: "", link: "#" },
    ],
  };

  const handleTenantClick = (tenant) => {
    setSelectedTenant(tenant);
    setSelectedApp(null); // Reset selected app when tenant changes
  };

  const handleAppClick = (app) => {
    setSelectedApp(app);
  };

  return (
    <>
    <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-center pt-[40px] m-auto h-screen overflow-hidden">

        {/* Tenants section */}
      <div className="tenant-scroll flex flex-col justify-start items-start w-[90%] lg:w-[30%] h-[290px] lg:h-[90%] pl-[20px] mt-[-50px] lg:mt-0">
        <div className="title w-full">
          <h2 className="text-[22.5px] font-bold mb-[30px] border-b lg:border-none w-full">Tenant Categories</h2>
        </div>
        <div className="flex flex-col justify-start items-start w-full h-full overflow-y-scroll overflow-x-hidden">
          {Object.keys(tenants).map((tenant) => (
            <h3 key={tenant} onClick={() => handleTenantClick(tenant)} 
            className={`text-[17.55px] w-[95%] py-[10px] px-[10px] hover:bg-[#189f06] hover:text-white hover:cursor-pointer relative 
                ${selectedTenant === tenant ? "bg-[#189f06] text-white" : ""}`}
            >
              <p className="text-[17.5px] font-[500] w-full my-[10px]">{tenant}</p>
              <i className="fa-solid fa-angle-right  absolute top-[25px] right-[20px]" />
            </h3>
          ))}
        </div>
      </div>

      {/* Apps Selection section */}
        <div className="tenant-scroll flex flex-col justify-start items-start w-[90%] lg:w-[30%] h-[290px] lg:h-[90%] pl-[20px]">
            <div className="title w-full">
                <h2 className="text-[22.5px] font-bold mb-[30px] border-b lg:border-none w-full">Tenants</h2>
            </div>
            <div className="w-full overflow-x-hidden overflow-y-scroll">
                {!selectedTenant ? (
                    <p className="text-gray-500 text-[16px] font-medium italic">
                        <i className="fa fa-arrow-left"></i> Select a tenant category from the list
                    </p>
                ) : (
                    tenants[selectedTenant].map((app) => (
                        <div 
                            key={app.name}
                            onClick={() => handleAppClick(app.name)}
                            className={`text-[17.55px] w-[95%] py-[10px] px-[10px] hover:bg-[#189f06] hover:text-white hover:cursor-pointer relative 
                                ${selectedApp === app.name ? "bg-[#189f06] text-white" : ""}`}
                        >
                            <p className="font-[700] cursor-pointer text-[17px] w-[90%]">
                                {app.name} 
                                <i className="fa-solid fa-angle-right absolute top-[50px] right-[15px] hover:text-white" />
                            </p>
                            <span className="text-[13px] font-normal text-inherit mt-[3px] mb-[30px] w-[90%]">
                                {app.description}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>


      {/* Releases section */}
      <div className="flex flex-col justify-start items-start overflow-hidden w-[90%] lg:w-[30%] h-[200px] lg:h-[400px] pl-[20px]">
        <div className="title w-full">
          <h2 className="text-[22.5px] font-bold mb-[30px] border-b lg:border-none w-full">Apps</h2>
        </div>
        <div className="release-d w-full">
          {!selectedApp ? (
            <p className="text-gray-500 text-[16px] font-medium italic"><i className="fa fa-arrow-left"></i> Select a tenant from the list</p>
        ) : ( apps[selectedApp].map((release) => (
            <div className='py-[3px] px-[10px] w-[98%] relative hover:bg-[#189f06] hover:text-white ' key={release.name}>
                <a href={release.link} target="_blank" className="font-[600]">{release.title}</a>
                <br />
                <a className='cursor-pointer font-[400] w-[90%] decoration-0' 
                  href={release.link} target="_blank">
                  {release.name}
                  <i class="fa-solid fa-up-right-from-square absolute top-[20px] right-[20px]"></i>
                  <p className='text-[13px] font-normal mt-[3px] mb-[30px] w-[80%]'>{release.description}</p>
                </a>
            </div>
          )))}
        </div>
      </div>
      {/* <ButtomBuy /> */}
    </div>
    </>
  );
};

export default TenantApps;
