import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, MapPin, Phone, Mail } from 'lucide-react';

import { setupNewsletter } from "./utils/news.letter.system";
import { setupTermsAndConditionsTrigger } from "./scripts/trigger.terms.conditions";
import { setupPrivacyPolicyTrigger } from "./scripts/trigger.privacy.policy";

import './App.css'

import HomePage from './pages/home.page';
import AboutUsPage from './pages/about.page';
import MinistryPage from './pages/ministry.page';
import ProjectsPage from './pages/project.page';
import GalleryPage from './pages/gallery.page';
import BlogPage from './pages/blog.page';
import TestimonialsPage from './pages/testimonials.page';
import ServePage from './pages/serve.page';
import OutreachPage from './pages/outreach.page';
import MemorialTributePage from './pages/memorial.tribute.page';
import CCCFamilyPage from './pages/ccc-family.page';
import BatchEncounterPage from './pages/batch.encounter.page';
import UpcomingEventsPage from './pages/upcoming.events.page';
import GivingPage from './pages/giving.page';
import VisitUsPage from './pages/visit.page';
import PrivacyPolicyPage from './pages/privacy.policy.page';

// Navigation configuration - maps display names to routes
const navigationConfig = {
  'Home': '/',
  'About Us': '/about-us',
  'Ministry': '/ministry',
  'Projects': '/projects',
  'Gallery': '/gallery',
  'Blog': '/blog',
  'Testimonials': '/testimonials',
  'Serve': '/serve',
  'Outreach': '/outreach',
  'Memorial Tribute': '/memorial-tribute',
  'CCC Family': '/ccc-family',
  'Batch Encounter': '/batch-encounter',
  'Upcoming Events': '/upcoming-events',
  'Giving': '/giving',
  'Visit Us': '/visit-us',
  'Privacy Policy': '/privacy-policy'
};

// Layout component that wraps all pages
const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  {/*
  useEffect(() => {
    setTimeout(() => {
      setupNewsletter();
    }, 1000);
  }, []);
*/}
useEffect(() => {
  // Wait for DOM to load, then run newsletter setup
  const timer = setTimeout(() => {
    setupNewsletter();
  }, 300);

  return () => clearTimeout(timer);
}, []);

useEffect(() => {
  setupPrivacyPolicyTrigger();
  setupTermsAndConditionsTrigger();
}, []);

  const navigationItems = [
    'About Us', 'Ministry', 'Projects', 'Gallery', 'Blog',
    'Testimonials', 'Serve', 'Outreach', 'Memorial Tribute',
    'CCC Family', 'Batch Encounter', 'Upcoming Events', 'Giving', 'Visit Us', 'Privacy Policy'
  ];

  // Get current page name from route
  const getCurrentPage = () => {
    const entry = Object.entries(navigationConfig).find(([_, route]) => route === location.pathname);
    return entry ? entry[0] : 'Home';
  };

  // Handle navigation click
  const handleNavClick = (page: string) => {
    const route = navigationConfig[page as keyof typeof navigationConfig];
    navigate(route);
    setIsMenuOpen(false);
  };

  const currentPage = getCurrentPage();

  // CSS Custom Properties (Root Variables)
  const rootStyles = `
    :root {
      /* Typography */
      --font-main: 'Poppins', sans-serif;
      --font-size-h1: 2.75rem;
      --font-size-h2: 2.25rem;
      --font-size-h3: 1.75rem;
      --font-size-h4: 1.25rem;
      --font-size-p: 1rem;
      --font-size-span: 0.875rem;
      --font-size-caption: 0.75rem;

      --font-weight-black: 900;
      --font-weight-bold: 700;
      --font-weight-medium: 500;
      --font-weight-regular: 400;
      --font-weight-light: 300;

      /* Color Palette */
      --color-black: #000000;
      --color-black-90: #1a1a1a;
      --color-black-80: #333333;
      --color-black-60: #666666;
      --color-black-40: #999999;
      --color-black-20: #cccccc;
      --color-white: #ffffff;
      --color-gray: #f5f5f5;

      /* Backgrounds */
      --bg-main: var(--color-white);
      --bg-main-box:rgb(255, 255, 255);
      --bg-top-layer: var(--color-gray);
      --bg-secondary:rgba(0, 0, 0, 0.71);

      /* Shadow */
      --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    body {
      font-family: var(--font-main);
      background: var(--bg-main);
      margin: 0;
      padding: 0;
    }

    .custom-h1 {
      font-size: var(--font-size-h1);
      font-weight: var(--font-weight-black);
      color: var(--color-black);
      line-height: 1.2;
    }

    .custom-h2 {
      font-size: var(--font-size-h2);
      font-weight: var(--font-weight-bold);
      color: var(--color-black);
      line-height: 1.3;
    }

    .custom-h3 {
      font-size: var(--font-size-h3);
      font-weight: var(--font-weight-medium);
      color: var(--color-black);
      line-height: 1.4;
    }

    .custom-h4 {
      font-size: var(--font-size-h4);
      font-weight: var(--font-weight-regular);
      color: var(--color-white);
      line-height: 1.4;
    }

    .custom-p {
      font-size: var(--font-size-p);
      font-weight: var(--font-weight-regular);
      color: #8433fb;
      line-height: 1.6;
    }

    .custom-span {
      font-size: var(--font-size-span);
      font-weight: var(--font-weight-regular);
      color: var(--color-black-60);
    }

    .custom-caption {
      font-size: var(--font-size-caption);
      font-weight: var(--font-weight-light);
      color: var(--color-black-40);
    }

    .custom-box {
      background: var(--bg-main-box);
      padding: 1.5rem;
      border-radius: 0.75rem;
      box-shadow: var(--box-shadow);
    }

    .custom-button {
      background: var(--color-black-90);
      color: var(--color-white);
      font-weight: var(--font-weight-bold);
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .custom-button:hover {
      background: var(--color-black);
      transform: translateY(-2px);
      box-shadow: var(--box-shadow);
    }

    @media (max-width: 768px) {
      .custom-h1 { font-size: 2rem; }
      .custom-h2 { font-size: 1.75rem; }
      .custom-h3 { font-size: 1.5rem; }
    }
  `;
  
  return (
    <>
    {/* Root Styles */}
    <style>{rootStyles}</style>

    <div className="min-h-screen bg-white">
      {/* Header */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between h-20">
              
              {/* Logo Section */}
              <div className="flex items-center space-x-4">
                {/* Logo Image Placeholder */}
                <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"> {/* bg-gradient-to-br from-blue-600 to-purple-600 */}
                  {/*
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                  */}
                  <img id="church-logo-image" src="src/assets/photos/icons/ag.png" alt="Church Logo" className="w-14 h-14" />
                </div>
                
                {/* Logo Text */}
                <div className="hidden md:block">
                  <h1 id="church-logo-text" className="custom-h4 mb-0 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Assembly of God
                  </h1>
                  <p className="custom-caption text-gray-600 -mt-1">
                    Shelter of Praise
                  </p>
                </div>

                {/* Mobile Logo Text */}
                <div className="md:hidden">
                  <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Assembly of God
                  </h1>
                  <p className="text-xs text-gray-600 -mt-1">
                    Shelter of Praise
                  </p>
                </div>
              </div>

              {/* Desktop Navigation Tabs */}
              <nav className="hidden lg:flex items-center space-x-1">
                {/* Home Tab */}
                <button
                  onClick={() => handleNavClick('Home')}
                  className={`px-4 py-2 text-sm font-medium rounded-md shadow-sm transition-all duration-200 ${
                    currentPage === 'Home'
                      ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-md'
                      : 'text-gray-700 hover:text-black hover:bg-gray-50'
                  }`}
                >
                  Home
                </button>
                
                {/* Other Navigation Tabs */}
                {navigationItems.slice(0, 7).map((item) => (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 relative group ${
                      currentPage === item
                        ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600'
                        : 'text-gray-700 hover:text-black hover:bg-gray-50'
                    }`}
                  >
                    {item}
                    {currentPage !== item && (
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                    )}
                  </button>
                ))}
                
                {/* More Dropdown */}
                <div className="relative group">
                  <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-md transition-colors duration-200">
                    More 
                    <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-1">
                    <div className="py-2">
                      {navigationItems.slice(7).map((item) => (
                        <button
                          key={item}
                          onClick={() => handleNavClick(item)}
                          className={`block w-full text-left px-4 py-2 text-sm transition-all duration-200 ${
                            currentPage === item
                              ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-black font-medium'
                              : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-black'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </nav>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-gray-700" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-700" />
                )}
              </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="lg:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-sm">
                <div className="flex flex-col space-y-1">
                  {/* Home Tab for Mobile */}
                  <button
                    onClick={() => handleNavClick('Home')}
                    className={`text-left px-3 py-3 text-sm font-medium rounded-md mx-2 transition-colors duration-200 ${
                      currentPage === 'Home'
                        ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600'
                        : 'text-gray-700 hover:text-black hover:bg-gray-50'
                    }`}
                  >
                    Home
                  </button>
                  
                  {/* Other Navigation Items for Mobile */}
                  {navigationItems.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleNavClick(item)}
                      className={`text-left px-3 py-3 text-sm font-medium rounded-md mx-2 transition-colors duration-200 ${
                        currentPage === item
                          ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600'
                          : 'text-gray-700 hover:text-black hover:bg-gray-50'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

      {/* Main Content Area - Routes are rendered here */}
      <main id="main" className="flex-1 min-h-[60vh]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/ministry" element={<MinistryPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/serve" element={<ServePage />} />
          <Route path="/outreach" element={<OutreachPage />} />
          <Route path="/memorial-tribute" element={<MemorialTributePage />} />
          <Route path="/ccc-family" element={<CCCFamilyPage />} />
          <Route path="/batch-encounter" element={<BatchEncounterPage />} />
          <Route path="/upcoming-events" element={<UpcomingEventsPage />} />
          <Route path="/giving" element={<GivingPage />} />
          <Route path="/visit-us" element={<VisitUsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 mt-auto">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              
              {/* 1. Church Info */}
              <div className="space-y-4">
                <h4 className="custom-h4 text-white mb-6">Church Info</h4>
                <div className="space-y-4">
                  <p className="custom-p text-gray-300 font-medium">
                    Shelter of Praise Assembly of God
                  </p>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                    <p className="custom-span text-gray-300">
                      Brgy. Lampanusan, Kalilangan, Bukidnon<br />
                      Northern Mindanao, Philippines
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <p className="custom-span text-gray-300">(+63) 912 345 6789</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <p className="custom-span text-gray-300">conquerorscoheirsag@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* 2. Social Media Icons */}
              <div>
                <h4 className="custom-h4 text-white mb-6">Follow Us</h4>
                <div className="flex flex-wrap gap-3">
                  <a href="https://www.facebook.com/profile.php?id=100066738213169" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                    {/*<Facebook className="w-6 h-6" />*/}
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAgVBMVEUAAAAQcP8IZf8IZ/8JZv8HZf8IZv8IZv8IaP8JZ/8HZv8IZv8FZf8YcP9FjP+TvP/g7P/////R4/9Vlf8QYP+Es/9kn/8IZv8nef8JZf8AYP/v9f/Q4v/B2P9GjP8HZv+yz//Q4/83g/8HZv/g6/+Dsv8HZf/n7//////////e6//ZLyHjAAAAK3RSTlMAEGCfz+//XyCQj98w/////////xD//6D/kBD/////7////8///5Cgz+/vONkvXQAAAPJJREFUeAF9kkUCwzAMBGVSGMrM3P//rxBaB+e6s0YREFJpw2y0cgS1cT3DQLmNWPjcwK/XA24RWIuEdg4j7OtHUX0NYedxko5+jCeZMc0En8FsVDDHSd1WDoFdIlogX46awopozWA+ythsd7s9ZxymJBkcs3wcMZC0YHDKhDNbKLowuGYC21zINIWUbQ7EwwJT7YogqgTTKaTY4tIp7HDIRadwwzVlKVyv11HG9cekFBxam8FbTInuQ4LCd3cL2Uzd+4UV/VkHfUIgMLRdQuBi7JsCxh5rQEAfrO9NYSWojruwBOOhDoR8PF+j0fuipNX+AmbCIviMIiwCAAAAAElFTkSuQmCC" alt="Facebook" className="w-6 h-6" />
                  </a>
                  <a href="https://www.youtube.com/@CONQUERORSCOHEIRSAG" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                    {/*<Youtube className="w-6 h-6" />*/}
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABJklEQVR4Ae2WpVaFQRSFcaeS4QVwIjTiLbgk7D1w9xeg4FQcOu6acHeXtNnDmsFd7in/WetLI+f7dbYDAFEsAUvgoeAQ5k5iSQFpIH1kkMyQFXJMTsgpwTuc6jlHes2M3qNP71mge7g76DLNg8gygZ1QckGmuSdZJ7Azq8RDCSQTCJGgBCoFBWqVQLegQJcSmPnWIr9oICMXcIr4C4FJJbD9rUX+NtzX+CIQlfVbgS0lcP4jAVNt/UCA7acCZ0oAPxfQdXMLFNUBvpHflvgbAVM7h0B6zrfeD3kB+Ucg/xLKf4biPyLJX3GH9GFUogRSBQUSTSBZEwskQpFs1USyl6E0gRSRJtJPhsnci1B69oVQeqzXzOo9+kmj3juBeDw2BkSxBCyBO+9s03HRLVCoAAAAAElFTkSuQmCC" alt="Youtube" className="w-6 h-6" />
                  </a>
                  <a href="https://www.instagram.com/conquerors_and_coheirs" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                    {/*<Instagram className="w-6 h-6" />*/}
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAABOFBMVEVHcExxF/13F/1zFf2AFv2MCu+iBOmyAuLEAd7SANraBMzwHpedI+XeANfmANHmAr+PF/6fD/vxAL7qArV7GP21FvnRVurnZ+P2Z9roQeDzGtXzB8v7AqvWiPn+7fn////7ftv/A7z0BKH3v/H+3fT+ruj+AJr/9/r/RcD/bMDKFff/Bo3iG+r8GrX/AIH+H5r/yeP+BHj/t9n/V5r+Am7+H37+BGT/ssX/Imz/RXv/ucz+e4z+JFT/XI3/MGL+LUf/u7f/yc7/Alr+OUf+MSz+QzT+R0T+iHD+SRj+VzH+WQX+AkL+c2L/0sT+aCX+cBL/7+j+aQL+eRv/oUX/fwL+iBD/wXz+jgD/3rr/1rn+dgz+nAP9FpT+lw7+qgH+tQD+vQD/w1f9kwf/xAD9PFn9ogj/ywD9uAfgLZLBAAAAaHRSTlMAW9H+////////xEsC///N////zFz/////////////////uP////7///////////7////////////////////////////////////////////////////////F/7VQ///+/87/vsj/uqL0GQwAAAHcSURBVHgBRMlFehwxEEDhV1VS04yZ7U04m+AmcBjfLLscJ4xLHyA0YGqSlJ7P9MT6BRC52EEQuDjlFITx2eWvXJsDQWYIKgJj4VQW5gBJAg75K5vTgZDTFUEu/kUEzqGaiC6DMBbhpqQyoyKTNYD1Hp+Ui6J0ZH1HhXNA0RfzyRIZl5WprroK3BZwwvx0aUGdB87HCIN5VBUVP9i468ZLxWLv+pg6vJmDaSiSW2eyIRNg84/HxfVJmTD3DxFWGmWjrosRpxMNGr3iIqYbG7IGK5lKvZE3jVuTynsDzHRoD3xpxaTQvIKumGBWgCouM9bPKEisJg0VTV4X0aBqQEuXQ2kGlmVmZCtgCoxBJfeAz0b8NQbWI7wOAKCZMgbn9E6tItG1HFTKRQ4jgSYpiiPu6BFJW1fW9J7oDFWWgpf0MH09YnB6yIEYnIJhLhqkpw3aC4OuUJ4QlDzX55/Um5m4Ue6dmXr59LwkBM0xy/ieVNV7zSSTZMU3fs8UNBomr+v3jQx5X1XmB7tdgnNu1JqDl+0nbnp+HpLp+WM5bB0mIMJFc/ouSgjd+U99O1qYONOhFEMonPcZCZ6eGp9eRcSwhWkSRCIxKnfeIMBh1WRcFOhTaENo/096OTA7AACDzKODDThakgAAAABJRU5ErkJggg==" alt="Instagram" className="w-6 h-6" />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                    {/*<Music className="w-6 h-6" />*/}
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEL0lEQVR4AWIgFsjdSeKRu51kKXcL0Hs5ANmxhFH4xbY1q2fbtm3PnWe/mIXYtm3bto21Ylur71QmqcndmTWqTt3p7t/qXvN/Y585DCzle7Ogb+3x/Z8RZj4h2gwLzoDiygi2UDDX2PvjEWPPjwkg2QMJ0ByGdjY8JgZXyrLigHBfEYR8auw11yD0qhRkElfhXYWMjwMirMKZVV4JL7qg+KyEZQfIOIOsjgHhVoUMKYe4JpgEc6IE5BASkTkuIMxXPW3l5AzCiWLKFWAE0XWPhPKksEOYlBvKHZHoYERahVJ7H2p+lqGcZ78mTqPrI//QV6ZiV7sQXwAxWL0OzLB7vTe57AZPD9YDwQSwBP7d0B7NSMdAuwL+ik7vLScj37vZawxehTCYWVDGiLIK14z7KZ9/5GpF/1zQiLCKQ1MF2gcUSQxqB5Yj56RXi0L3wzXlEb6SEM9xes3he9kfYFYpI9T3FLLb4vG+VF1FRCnIEoQfIqaXw4CLGh62cUU5D2T9LPgCpj/5bUgKmrHfmPX/rH9E0VvyHqWVjYifCjoNCYr5NR/0QdC2QPYJh56D8Dym8P/vP145DIOhL5iN9ZEqTpDoUVRJ4BIg/+YOtRoy/7ENKnKjyw7+np/9Xg6+BNZ/3aLCykDlJthGHAax8ETzGyel4LzL0Eqy74TxKHmHFi8WEGYVYT3EScfZQBmw1EPpSV1AELUAX+GR0nA3CCKkAZyFsHc/4X+ZPVPjFiwiCoedBslwu4Mmsz7nVwcLlILNbrcah38HRGbuEsGgEjJKabW74GI6k3GdlwFXOPw+IPrnQnhbC5oXwI+gIULb4GV70EKKwBcofQK6KgGRPxVwGFMWGV9At1IR8TbAOwXxnM1HQCjfCl1SGvVxCrqd0A/HoG9QXqNWlJVPhgSEmTU5X+thwAIZMDTDc5yQgjNSCE5rnco7BprdDWrXmhhTnb1VbjIxdoBS8J/HKyfR9moENE3Bt+A1Jt5TPLse5fdJCvA19r4HLaGbpag5DEoQP9ikyecSOU3DP8kVgmgZF4K9nN12PafVQ335uMWKUJillV/Gb+larKtEmvnsyVcIw+7QDNArSnWUTmsfxIFHuYapXAaOC8EhhP0kzzVOwTiwDGwC28Bmez0aNEHYq0SlnIzBkAoaMpKRRgdMh7749cvI9AoTSMjgNXseoRsCQs16yj0dUUT970F7BZ3f3fwSol1y6tGBrK0oH4Wi4x7eL8PICv4Pko9V4XnwIDmFrve9nmQd8+BJ1pYCLuT1T0gFFVuuGUBaeAOUT3Oe6+ksI3LhWT4aB6tm9B8TRaJDjtQEE1NhT89z95oINT+0u+NK5hXDoxuRgsNzcp7FPwZMRY1bhM3UYHHOBY+5cVBDRgPMbrWc+UNYCYx5TBMO6Dm+EKwH68ACMECznZnyqCZcRuWmAMFguk4gWsrvAAAAAElFTkSuQmCC" alt="Spotify" className="w-6 h-6" />
                  </a>
                </div>
                <p className="custom-caption text-gray-400 mt-4">
                  Stay connected with our community and join our online fellowship.
                </p>
              </div>

              {/* 3. Newsletter Signup */}
              <div>
                <h4 className="custom-h4 text-white mb-6">Newsletter</h4>
                <p className="custom-span text-gray-300 mb-4">
                  Get updates, devotionals, events, and church news delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input id="email-newsletter" name="email-newsletter"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg text-gray-900 custom-span border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200" required/>
                  <button id="subscribe-button" className="custom-button w-full hover:scale-105">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* 4. Bible Verse / Motto */}
              <div>
                <h4 className="custom-h4 text-white mb-6">Our Foundation</h4>
                <div className="p-4 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg border-l-4 border-blue-400 shadow-lg">
                  <div className="flex items-start space-x-2 mb-3">
                    <span className="text-2xl">🕊️</span>
                    <div>
                      <p className="custom-span text-gray-200 italic leading-relaxed">
                        "As for me and my house, we will serve the Lord."
                      </p>
                      <p className="custom-caption text-blue-300 mt-2 font-medium">
                        — Joshua 24:15
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Copyright & Legal */}
            <div className="pt-8 border-t border-gray-800">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p id="copyright-holder-ag" className="custom-span text-gray-400">
                  {/*© 2025 Shelter of Praise Assembly of God - All rights reserved.*/}
                  © {new Date().getFullYear()} Shelter of Praise Assembly of God - All rights reserved.
                </p>
                <div className="flex flex-wrap justify-center md:justify-end gap-6">
                  <button 
                    id="terms-button" 
                    onClick={() => handleNavClick('Privacy Policy')}
                    className="custom-span text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                  >
                    Terms & Conditions
                  </button>
                  <span className="custom-span text-gray-600">|</span>
                  <button
                    id="privacy-policy-button" 
                    onClick={() => handleNavClick('Privacy Policy')}
                    className="custom-span text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                  >
                    Privacy Policy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </footer>
    </div>
    </>
  );
};

// Main App component
const App = () => {
  
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;