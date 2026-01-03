import { Home, UserCircle, Lock } from 'lucide-react';
import { useState } from 'react';

function SidePanel() {
  const [activeMenuItem, setActiveMenuItem] = useState('Home');

  const menuItems = [
    { id: 'Home', label: 'Home', icon: Home, color: '#a8c7fa' },
    {
      id: 'Personal',
      label: 'Personal info',
      icon: UserCircle,
      color: '#81c995',
    },
    {
      id: 'Security',
      label: 'Security & sign-in',
      icon: Lock,
      color: '#78d9ec',
    },
  ];

  return (
    <aside>
      {menuItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <button
            key={item.id}
            className={`sidepanel-menu-item ${activeMenuItem === item.id ? 'active' : ''}`}
            onClick={() => setActiveMenuItem(item.id)}
          >
            <div
              className="sidepanel-menu-icon-wrapper"
              style={{ backgroundColor: item.color }}
            >
              <IconComponent className="sidepanel-menu-icon" />
            </div>
            <span className="sidepanel-menu-label">{item.label}</span>
          </button>
        );
      })}
    </aside>
  );
}

export default SidePanel;
