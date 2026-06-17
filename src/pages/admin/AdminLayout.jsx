import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, BarChart3, Home, LogOut } from 'lucide-react';
import Dashboard from './Dashboard';
import CustomerManagement from './CustomerManagement';
import Statistics from './Statistics';

const tabs = [
  { id: 'dashboard', label: '대시보드', icon: LayoutDashboard },
  { id: 'customers', label: '고객관리', icon: Users },
  { id: 'statistics', label: '통계/리포트', icon: BarChart3 },
];

function AdminLayout() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'customers':
        return <CustomerManagement />;
      case 'statistics':
        return <Statistics />;
      default:
        return <Dashboard />;
    }
  };

  const today = new Date();
  const dateStr = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar" id="admin-sidebar">
        <div className="admin-sidebar-logo">
          <h2>🍡 모찌고</h2>
          <p>Admin Panel</p>
        </div>

        <nav className="admin-nav">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`admin-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                id={`admin-tab-${tab.id}`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            <Home size={16} />
            홈페이지로 돌아가기
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <div className="admin-header">
          <h1>{tabs.find((t) => t.id === activeTab)?.label}</h1>
          <span className="admin-header-date">{dateStr}</span>
        </div>
        {renderContent()}
      </main>
    </div>
  );
}

export default AdminLayout;
