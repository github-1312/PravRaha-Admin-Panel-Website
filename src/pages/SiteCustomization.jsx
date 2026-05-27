import React, { useState } from 'react';
import { Upload, Palette, Type, Layout, Save, Eye, icons } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import SubHeaderCustomisation from '../components/Layout/SubHeaderCustomisation';

const SiteCustomization = () => {


  return (
    <div>
      <SubHeaderCustomisation/>

      <Outlet />


    </div>
  );
  
};

export default SiteCustomization;