import React from 'react'
import "./css/header.css"
import SearchIcon from '@mui/icons-material/Search';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import { Avatar } from '@mui/material';

function header({photoURL}) {
  return (
    <div className="header">
        <div className="header__logo">
          <img src="https://fonts.gstatic.com/s/i/productlogos/drive_2020q4/v8/web-64dp/logo_drive_2020q4_color_2x_web_64dp.png" />
          <span>Drive</span>
        </div>
        <div className="header__search">
          <SearchIcon />
          <input type="text" placeholder="Search in drive" />
          <FormatAlignCenterIcon />
        </div>
        <div className="header__options">
          <span>
            <HelpOutlineIcon />
            <SettingsIcon />
          </span>
          <span>
            <AppsIcon />
            <Avatar src={photoURL} />
          </span>
        </div>
    </div>
  )
}

export default header;