import { useState, useMemo } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { customers, totalPoints, kpiData } from '../../data/mockData';

const ITEMS_PER_PAGE = 10;

function CustomerManagement() {
  const [filters, setFilters] = useState({
    gender: '',
    ageRange: '',
    grade: '',
    frequency: '',
    minPurchase: '',
    maxPurchase: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [appliedFilters, setAppliedFilters] = useState({});

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const f = appliedFilters;
      if (f.gender && c.gender !== f.gender) return false;
      if (f.grade && c.grade !== f.grade) return false;
      if (f.ageRange) {
        const [min, max] = f.ageRange.split('-').map(Number);
        if (c.age < min || c.age > max) return false;
      }
      if (f.frequency) {
        if (f.frequency === 'high' && c.visitCount < 30) return false;
        if (f.frequency === 'medium' && (c.visitCount < 10 || c.visitCount >= 30)) return false;
        if (f.frequency === 'low' && c.visitCount >= 10) return false;
      }
      if (f.minPurchase && c.totalPurchase < Number(f.minPurchase)) return false;
      if (f.maxPurchase && c.totalPurchase > Number(f.maxPurchase)) return false;
      return true;
    });
  }, [appliedFilters]);

  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleApply = () => {
    setAppliedFilters({ ...filters });
    setCurrentPage(1);
  };

  const handleReset = () => {
    const empty = { gender: '', ageRange: '', grade: '', frequency: '', minPurchase: '', maxPurchase: '' };
    setFilters(empty);
    setAppliedFilters({});
    setCurrentPage(1);
  };

  const gradeClass = (grade) => {
    const map = { VIP: 'badge-vip', Gold: 'badge-gold', Silver: 'badge-silver', Bronze: 'badge-bronze', '일반': 'badge-general' };
    return map[grade] || 'badge-general';
  };

  const totalPurchaseSum = customers.reduce((s, c) => s + c.totalPurchase, 0);

  return (
    <div>
      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <div className="summary-card-label">전체 고객</div>
          <div className="summary-card-value">{kpiData.totalCustomers.toLocaleString()}명</div>
        </div>
        <div className="summary-card">
          <div className="summary-card-label">누적 매출액</div>
          <div className="summary-card-value">{(kpiData.totalRevenue / 10000).toLocaleString()}만원</div>
        </div>
        <div className="summary-card">
          <div className="summary-card-label">지급 포인트</div>
          <div className="summary-card-value">{totalPoints.toLocaleString()}P</div>
        </div>
      </div>

      {/* Customer Table with Filters */}
      <div className="admin-panel">
        <div className="admin-panel-header">
          <h3>고객 명단</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            {filteredCustomers.length}명 조회됨
          </span>
        </div>

        {/* Filters */}
        <div className="filters-bar">
          <div className="filter-group">
            <label className="filter-label">성별</label>
            <select
              className="filter-select"
              value={filters.gender}
              onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
            >
              <option value="">전체</option>
              <option value="남">남</option>
              <option value="여">여</option>
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">연령대</label>
            <select
              className="filter-select"
              value={filters.ageRange}
              onChange={(e) => setFilters({ ...filters, ageRange: e.target.value })}
            >
              <option value="">전체</option>
              <option value="10-19">10대</option>
              <option value="20-29">20대</option>
              <option value="30-39">30대</option>
              <option value="40-49">40대</option>
              <option value="50-99">50대 이상</option>
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">고객등급</label>
            <select
              className="filter-select"
              value={filters.grade}
              onChange={(e) => setFilters({ ...filters, grade: e.target.value })}
            >
              <option value="">전체</option>
              <option value="VIP">VIP</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Bronze">Bronze</option>
              <option value="일반">일반</option>
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">구매빈도</label>
            <select
              className="filter-select"
              value={filters.frequency}
              onChange={(e) => setFilters({ ...filters, frequency: e.target.value })}
            >
              <option value="">전체</option>
              <option value="high">높음 (30회+)</option>
              <option value="medium">보통 (10~29회)</option>
              <option value="low">낮음 (10회 미만)</option>
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">구매금액 (최소)</label>
            <input
              type="number"
              className="filter-input"
              placeholder="0"
              value={filters.minPurchase}
              onChange={(e) => setFilters({ ...filters, minPurchase: e.target.value })}
            />
          </div>
          <div className="filter-group">
            <label className="filter-label">구매금액 (최대)</label>
            <input
              type="number"
              className="filter-input"
              placeholder="∞"
              value={filters.maxPurchase}
              onChange={(e) => setFilters({ ...filters, maxPurchase: e.target.value })}
            />
          </div>
          <button className="filter-btn" onClick={handleApply} id="filter-apply-btn">
            <Search size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
            검색
          </button>
          <button className="filter-btn-reset" onClick={handleReset} id="filter-reset-btn">
            <RotateCcw size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
            초기화
          </button>
        </div>

        {/* Table */}
        <table className="data-table">
          <thead>
            <tr>
              <th>이름</th>
              <th>성별</th>
              <th>나이</th>
              <th>등급</th>
              <th>연락처</th>
              <th>총 구매액</th>
              <th>포인트</th>
              <th>방문횟수</th>
              <th>최근 방문</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCustomers.map((c) => (
              <tr key={c.id}>
                <td style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{c.name}</td>
                <td>{c.gender}</td>
                <td>{c.age}세</td>
                <td>
                  <span className={`badge ${gradeClass(c.grade)}`}>{c.grade}</span>
                </td>
                <td>{c.phone}</td>
                <td>{c.totalPurchase.toLocaleString()}원</td>
                <td>{c.points.toLocaleString()}P</td>
                <td>{c.visitCount}회</td>
                <td>{c.lastVisit}</td>
              </tr>
            ))}
            {paginatedCustomers.length === 0 && (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>
                  조건에 맞는 고객이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={currentPage === page ? 'active' : ''}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerManagement;
