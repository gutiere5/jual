import { Home, UserCircle, Lock } from 'lucide-react';
import { NavLink } from 'react-router';

function SidePanel() {
  const menuItems = [
    // Add a 'path' to each item that matches your router config
    {
      id: 'Inventory',
      label: 'Inventory',
      icon: Home,
      color: '#a8c7fa',
      path: '/',
    },
    {
      id: 'Personal',
      label: 'Personal',
      icon: UserCircle,
      color: '#81c995',
      path: '/personal',
    },
    {
      id: 'Security',
      label: 'Security',
      icon: Lock,
      color: '#78d9ec',
      path: '/security',
    },
  ];

  return (
    <aside>
      {menuItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) => `sidepanel-menu-item ${isActive ? 'active' : ''}`}
          >
            <div className="sidepanel-menu-icon-wrapper" style={{ backgroundColor: item.color }}>
              <IconComponent className="sidepanel-menu-icon" />
            </div>
            <span className="sidepanel-menu-label">{item.label}</span>
          </NavLink>
        );
      })}
    </aside>
  );
}

export default SidePanel;
