import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { monthlyRevenue, hourlyVisits, popularMenus, gradeHistory } from '../../data/mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#2D2323',
      titleFont: { family: "'Noto Serif KR', serif", size: 13 },
      bodyFont: { family: "'Noto Serif KR', serif", size: 12 },
      padding: 12,
      cornerRadius: 8,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        font: { family: "'Noto Serif KR', serif", size: 11 },
        color: '#998787',
      },
    },
    y: {
      grid: { color: 'rgba(245, 234, 224, 0.5)' },
      ticks: {
        font: { family: "'Noto Serif KR', serif", size: 11 },
        color: '#998787',
      },
    },
  },
};

function Statistics() {
  // 월별 매출 추이
  const revenueChartData = {
    labels: monthlyRevenue.labels,
    datasets: [
      {
        label: '매출',
        data: monthlyRevenue.data,
        borderColor: '#F2994A',
        backgroundColor: 'rgba(242, 153, 74, 0.12)',
        borderWidth: 2.5,
        pointRadius: 4,
        pointBackgroundColor: '#F2994A',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const revenueOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      tooltip: {
        ...commonOptions.plugins.tooltip,
        callbacks: {
          label: (ctx) => ` 매출: ${(ctx.parsed.y / 10000).toLocaleString()}만원`,
        },
      },
    },
    scales: {
      ...commonOptions.scales,
      y: {
        ...commonOptions.scales.y,
        ticks: {
          ...commonOptions.scales.y.ticks,
          callback: (v) => (v / 10000).toLocaleString() + '만',
        },
      },
    },
  };

  // 시간대별 방문 분포
  const hourlyChartData = {
    labels: hourlyVisits.labels,
    datasets: [
      {
        label: '방문자 수',
        data: hourlyVisits.data,
        backgroundColor: hourlyVisits.data.map((v) =>
          v >= 70 ? '#F2994A' : v >= 50 ? '#FFB380' : '#F5EAE0'
        ),
        borderRadius: 6,
        barThickness: 24,
      },
    ],
  };

  // 인기 메뉴 TOP 5
  const menuChartData = {
    labels: popularMenus.labels,
    datasets: [
      {
        label: '판매량',
        data: popularMenus.data,
        backgroundColor: ['#F2994A', '#FFB380', '#E86A58', '#FFE4CC', '#D9822B'],
        borderRadius: 6,
        barThickness: 20,
      },
    ],
  };

  const menuOptions = {
    ...commonOptions,
    indexAxis: 'y',
    scales: {
      x: {
        grid: { color: 'rgba(245, 234, 224, 0.5)' },
        ticks: {
          font: { family: "'Noto Serif KR', serif", size: 11 },
          color: '#998787',
        },
      },
      y: {
        grid: { display: false },
        ticks: {
          font: { family: "'Noto Serif KR', serif", size: 12 },
          color: '#2B1D1D',
        },
      },
    },
  };

  // 등급 변동 추이
  const gradeChartData = {
    labels: gradeHistory.labels,
    datasets: [
      {
        label: 'VIP',
        data: gradeHistory.datasets.VIP,
        borderColor: '#F2994A',
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 3,
        tension: 0.3,
      },
      {
        label: 'Gold',
        data: gradeHistory.datasets.Gold,
        borderColor: '#FFB380',
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 3,
        tension: 0.3,
      },
      {
        label: 'Silver',
        data: gradeHistory.datasets.Silver,
        borderColor: '#A3A0A0',
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 3,
        tension: 0.3,
      },
      {
        label: 'Bronze',
        data: gradeHistory.datasets.Bronze,
        borderColor: '#D9822B',
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 3,
        tension: 0.3,
      },
      {
        label: '일반',
        data: gradeHistory.datasets['일반'],
        borderColor: '#998787',
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 3,
        borderDash: [5, 5],
        tension: 0.3,
      },
    ],
  };

  const gradeOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          padding: 16,
          usePointStyle: true,
          pointStyleWidth: 10,
          font: { family: "'Noto Sans KR', sans-serif", size: 11 },
        },
      },
    },
  };

  return (
    <div>
      {/* Row 1: Revenue + Hourly Visits */}
      <div className="stats-grid">
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h3>월별 매출 추이</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>2026년</span>
          </div>
          <div className="admin-panel-body">
            <div className="chart-container">
              <Line data={revenueChartData} options={revenueOptions} />
            </div>
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-header">
            <h3>시간대별 방문 분포</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>일 평균</span>
          </div>
          <div className="admin-panel-body">
            <div className="chart-container">
              <Bar data={hourlyChartData} options={commonOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Popular Menus + Grade History */}
      <div className="stats-grid">
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h3>인기 메뉴 TOP 5</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>이번 달 판매량</span>
          </div>
          <div className="admin-panel-body">
            <div className="chart-container">
              <Bar data={menuChartData} options={menuOptions} />
            </div>
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-header">
            <h3>등급 변동 추이</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>최근 6개월</span>
          </div>
          <div className="admin-panel-body">
            <div className="chart-container">
              <Line data={gradeChartData} options={gradeOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
