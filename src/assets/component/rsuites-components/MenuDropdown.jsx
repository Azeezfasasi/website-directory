// import { Dropdown } from 'rsuite';
// import Link from 'next/link';
// import 'rsuite/Button/styles/index.css';

// const MenuDropdown = () => (
//   <Dropdown title="Menu">
//     <Dropdown.Item as={Link} href="/guide/introduction">
//       Guide
//     </Dropdown.Item>
//     <Dropdown.Item as={Link} href="/components/overview">
//       Components
//     </Dropdown.Item>
//     <Dropdown.Item as={Link} href="/resources/palette">
//       Resources
//     </Dropdown.Item>
//   </Dropdown>
// );

// export default MenuDropdown

import React from 'react';
import { Dropdown } from 'rsuite';
// import Link from 'next/link';
import 'rsuite/Button/styles/index.css';
import { Link } from 'react-router-dom';

function MenuDropdown() {
  return (
    <>
        <div>
            <Dropdown title="Menu">
                <Dropdown.Item as={Link} href="/guide/introduction">
                Guide
                </Dropdown.Item>
                <Dropdown.Item as={Link} href="/components/overview">
                Components
                </Dropdown.Item>
                <Dropdown.Item as={Link} href="/resources/palette">
                Resources
                </Dropdown.Item>
            </Dropdown>
        </div>
    </>
  )
}

export default MenuDropdown