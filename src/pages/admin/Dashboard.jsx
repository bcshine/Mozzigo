import { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Users, DollarSign, ShoppingCart, UserPlus, UserCheck, Gift, TrendingUp, ArrowUpRight } from 'lucide-react';
import { kpiData, gradeDistribution, recentActivities, newCustomers } from '../../data/mockData';

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const kpis = [
    {
      title: '전체 고객수',
      value: kpiData.totalCustomers.toLocaleString() + '명',
      change: `+${kpiData.customerGrowth}%`,
      positive: true,
      icon: Users,
    },
    {
      title: '누적 매출액',
      value: (kpiData.totalRevenue / 100000000).toFixed(1) + '억원',
      change: `+${kpiData.revenueGrowth}%`,
      positive: true,
      icon: DollarSign,
    },
    {
      title: '총 거래건수',
      value: kpiData.totalTransactions.toLocaleString() + '건',
      change: `+${kpiData.transactionGrowth}%`,
      positive: true,
      icon: ShoppingCart,
    },
    {
      title: '오늘 신규고객',
      value: kpiData.newCustomersToday + '명',
      change: `+${kpiData.newCustomerGrowth}%`,
      positive: true,
      icon: UserPlus,
    },
  ];

  const gradeChartData = {
    labels: Object.keys(gradeDistribution),
    datasets: [
      {
        data: Object.values(gradeDistribution),
        backgroundColor: [
          '#D4944C',
          '#E8B87C',
          '#B0B0B0',
          '#CD7F32',
          '#C9BFB5',
        ],
        borderColor: '#FFFFFF',
        borderWidth: 3,
        hoverOffset: 8,
      },
    ],
  };

  const gradeChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 16,
          usePointStyle: true,
          pointStyleWidth: 10,
          font: {
            family: "'Noto Sans KR', sans-serif",
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: '#3D2C2C',
        titleFont: { family: "'Noto Sans KR', sans-serif" },
        bodyFont: { family: "'Noto Sans KR', sans-serif" },
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const pct = ((context.parsed / total) * 100).toFixed(1);
            return ` ${context.label}: ${context.parsed}명 (${pct}%)`;
          },
        },
      },
    },
    cutout: '65%',
  };

  const activityIcons = {
    register: UserPlus,
    point: Gift,
    purchase: ShoppingCart,
    upgrade: TrendingUp,
  };

  return (
    <div>
      {/* KPI Cards */}
      <div className="kpi-grid">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div className="kpi-card" key={i}>
              <div className="kpi-card-header">
                <span className="kpi-card-title">{kpi.title}</span>
                <div className="kpi-card-icon">
                  <Icon size={20} />
                </div>
              </div>
              <div className="kpi-card-value">{kpi.value}</div>
              <span className={`kpi-card-change ${kpi.positive ? 'positive' : 'negative'}`}>
                <ArrowUpRight size={14} style={{ marginRight: '2px', verticalAlign: 'middle' }} />
                전월 대비 {kpi.change}
              </span>
            </div>
          );
        })}
      </div>

      {/* Dashboard Grid */}
      <div className="dashboard-grid">
        {/* 실시간 고객등록 */}
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h3>실시간 활동</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>최근 업데이트</span>
          </div>
          <div className="admin-panel-body">
            <div className="timeline">
              {recentActivities.map((activity) => {
                const Icon = activityIcons[activity.type] || UserCheck;
                return (
                  <div className="timeline-item" key={activity.id}>
                    <div className="timeline-dot">
                      <Icon />
                    </div>
                    <div className="timeline-content">
                      <h4>{activity.name}</h4>
                      <p>
                        {activity.action} · {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 등급별 분포 */}
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h3>등급별 분포</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              총 {Object.values(gradeDistribution).reduce((a, b) => a + b, 0).toLocaleString()}명
            </span>
          </div>
          <div className="admin-panel-body">
            <div className="chart-container">
              <Doughnut data={gradeChartData} options={gradeChartOptions} />
            </div>
          </div>
        </div>

        {/* 신규 고객 목록 */}
        <div className="admin-panel full-width">
          <div className="admin-panel-header">
            <h3>신규 고객 목록</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>최근 가입</span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>이름</th>
                <th>연락처</th>
                <th>가입일</th>
                <th>첫 구매</th>
              </tr>
            </thead>
            <tbody>
              {newCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.joinDate}</td>
                  <td>{customer.firstPurchase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
