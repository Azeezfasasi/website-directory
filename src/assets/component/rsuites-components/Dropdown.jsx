import React from 'react';
import { Dropdown } from 'rsuite';
import 'rsuite/Button/styles/index.css';

function DropdownComponent() {
  return (
    <>
    <div className='border h-fit'>
        <Dropdown title="Dropdown">
            <Dropdown.Item>New File</Dropdown.Item>
            <Dropdown.Item>New File with Current Profile</Dropdown.Item>
            <Dropdown.Item>Download As...</Dropdown.Item>
            <Dropdown.Item>Export PDF</Dropdown.Item>
            <Dropdown.Item>Export HTML</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>About</Dropdown.Item>
        </Dropdown>
        </div>
    </>
  )
}

export default DropdownComponent;