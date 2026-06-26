import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AuthModal from '../components/AuthModal';
import mochiDesserts from '../assets/images/mochi_desserts.png';
import bubbleTea from '../assets/images/bubble_tea.png';
import mochiBungeoppang from '../assets/images/mochi_bungeoppang.png';

function ShopPage() {
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(null); // 'login' | 'signup' | null
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar" style={{ background: scrolled ? 'rgba(255, 255, 255, 0.95)' : '#fff', color: '#4a3f35', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div className="navbar-logo" onClick={() => navigate('/')}>
          🍡 모찌고
          <span>MOCHI-GO</span>
        </div>
        <div className="navbar-links">
          <Link to="/#menu">메뉴</Link>
          <Link to="/#about">매장 안내</Link>
          <Link to="/shop" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>쇼핑몰</Link>
          <a href="/#instagram">인스타그램</a>
        </div>
        <div className="navbar-actions">
          {user ? (
            <>
              <span style={{ marginRight: '1rem', fontSize: '0.9rem' }}>{user.email}님</span>
              <button className="btn btn-outline btn-sm" onClick={() => supabase.auth.signOut()}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-ghost" onClick={() => setShowModal('login')} id="login-btn">
                로그인
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => setShowModal('signup')} id="signup-btn">
                회원가입
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <section className="section" style={{ paddingTop: '120px', minHeight: '70vh', background: '#fcfaf8' }}>
        <div className="section-header">
          <div className="section-label">MOCHIGO SHOP</div>
          <h2 className="section-title">모찌고 온라인 스토어</h2>
          <p className="section-desc">
            집에서도 간편하게, 매장에서 먹던 겉바속쫀 그대로 즐겨보세요!
          </p>
        </div>

        <div className="menu-grid" style={{ marginTop: '2rem' }}>
          {/* Product 1 */}
          <div className="menu-card animate-fade-in-up" style={{ animationDelay: '0s' }}>
            <div className="menu-card-img" style={{ background: '#f5efe6' }}>
              <img src={mochiBungeoppang} alt="[냉동] 단팥 모찌 붕어빵 (10개입)" />
            </div>
            <div className="menu-card-body">
              <h3 className="menu-card-title">[냉동] 단팥 모찌 붕어빵 (10개입)</h3>
              <p className="menu-card-desc">에어프라이어에 5분만 돌리면 갓 구운 붕어빵 완성!</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <span className="menu-card-price" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>₩ 25,000</span>
                <button className="btn btn-primary btn-sm">장바구니 담기</button>
              </div>
            </div>
          </div>

          {/* Product 2 */}
          <div className="menu-card animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <div className="menu-card-img" style={{ background: '#f5efe6' }}>
              <img src={mochiDesserts} alt="프리미엄 모찌고 선물세트" />
            </div>
            <div className="menu-card-body">
              <h3 className="menu-card-title">프리미엄 모찌고 선물세트</h3>
              <p className="menu-card-desc">소중한 분들께 마음을 전하는 특별한 패키지</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <span className="menu-card-price" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>₩ 35,000</span>
                <button className="btn btn-primary btn-sm">장바구니 담기</button>
              </div>
            </div>
          </div>

          {/* Product 3 */}
          <div className="menu-card animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="menu-card-img" style={{ background: '#f5efe6' }}>
              <img src={bubbleTea} alt="시그니처 버블 밀크티 키트" />
            </div>
            <div className="menu-card-body">
              <h3 className="menu-card-title">시그니처 버블 밀크티 키트</h3>
              <p className="menu-card-desc">집에서도 즐기는 모찌고만의 특별한 버블티</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <span className="menu-card-price" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>₩ 18,000</span>
                <button className="btn btn-primary btn-sm">장바구니 담기</button>
              </div>
            </div>
          </div>
          
          {/* Product 4 */}
          <div className="menu-card animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
            <div className="menu-card-img" style={{ background: '#f5efe6' }}>
              <img src={mochiDesserts} alt="[냉장] 수제 생과일 모찌 (6구)" />
            </div>
            <div className="menu-card-body">
              <h3 className="menu-card-title">[냉장] 수제 생과일 모찌 (6구)</h3>
              <p className="menu-card-desc">매일 아침 빚어내는 신선하고 쫄깃한 과일 모찌 세트</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <span className="menu-card-price" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>₩ 22,000</span>
                <button className="btn btn-primary btn-sm">장바구니 담기</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="footer">
        <div className="footer-content">
          <div>
            <div className="footer-logo">🍡 모찌고</div>
            <p className="footer-text" style={{ marginTop: '8px' }}>
              수원 행궁동 모찌 전문 카페
            </p>
          </div>
          <p className="footer-text">
            © 2026 MOCHI-GO. All rights reserved.
          </p>
          <div className="footer-links">
            <a href="https://www.instagram.com/mochigo_cafe/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/admin'); }}>
              관리자
            </a>
          </div>
        </div>
      </footer>

      {/* Login/Signup Modal */}
      <AuthModal 
        isOpen={!!showModal} 
        onClose={() => setShowModal(null)} 
        initialView={showModal} 
      />
    </div>
  );
}

export default ShopPage;
