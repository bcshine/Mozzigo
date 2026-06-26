import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { MapPin, Clock, Phone, ChevronDown } from 'lucide-react';
import AuthModal from '../components/AuthModal';
import { menuItems } from '../data/mockData';
import heroBanner from '../assets/images/hero_banner.png';
import mochiDesserts from '../assets/images/mochi_desserts.png';
import bubbleTea from '../assets/images/bubble_tea.png';
import mochiBungeoppang from '../assets/images/mochi_bungeoppang.png';

const images = {
  mochi_desserts: mochiDesserts,
  bubble_tea: bubbleTea,
  mochi_bungeoppang: mochiBungeoppang,
};

function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(null); // 'login' | 'signup' | null
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for changes on auth state (logged in, signed out, etc.)
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
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="navbar-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          🍡 모찌고
          <span>MOCHI-GO</span>
        </div>
        <div className="navbar-links">
          <a href="#menu">메뉴</a>
          <a href="#about">매장 안내</a>
          <Link to="/shop" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>쇼핑몰</Link>
          <a href="#instagram">인스타그램</a>
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

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <img src={heroBanner} alt="모찌고 카페" />
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-badge">행궁동 모찌 전문점</div>
          <h1 className="hero-title">
            달콤한 <span className="highlight">모찌</span>의
            <br />
            특별한 순간
          </h1>
          <p className="hero-subtitle">
            부드럽고 쫄깃한 수제 모찌 디저트와 시그니처 버블티
            <br />
            모찌고에서 따뜻한 행복을 만나보세요
          </p>
          <div className="hero-buttons">
            <a href="#menu" className="btn btn-primary btn-lg">메뉴 보기</a>
            <a href="#about" className="btn btn-outline btn-lg" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}>
              매장 안내
            </a>
          </div>
        </div>
        <div className="hero-scroll">
          <span>SCROLL</span>
          <ChevronDown size={20} />
        </div>
      </section>

      {/* Shop Preview Section */}
      <section className="section shop-preview-section" id="shop-preview" style={{ background: '#fcfaf8' }}>
        <div className="section-header">
          <div className="section-label">ONLINE SHOP</div>
          <h2 className="section-title">모찌고 온라인 스토어</h2>
          <p className="section-desc">
            집에서도 간편하게, 매장에서 먹던 겉바속쫀 그대로 즐겨보세요!
          </p>
        </div>
        <div className="menu-grid">
          <div className="menu-card animate-fade-in-up" style={{ animationDelay: '0s' }}>
            <div className="menu-card-img" style={{ background: '#f5efe6' }}>
              <img src={mochiBungeoppang} alt="[냉동] 단팥 모찌 붕어빵 (10개입)" />
            </div>
            <div className="menu-card-body">
              <h3 className="menu-card-title">[냉동] 단팥 모찌 붕어빵 (10개입)</h3>
              <p className="menu-card-desc">에어프라이어에 5분만 돌리면 갓 구운 붕어빵 완성!</p>
              <span className="menu-card-price">₩ 25,000</span>
            </div>
          </div>
          <div className="menu-card animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <div className="menu-card-img" style={{ background: '#f5efe6' }}>
              <img src={mochiDesserts} alt="프리미엄 모찌고 선물세트" />
            </div>
            <div className="menu-card-body">
              <h3 className="menu-card-title">프리미엄 모찌고 선물세트</h3>
              <p className="menu-card-desc">소중한 분들께 마음을 전하는 특별한 패키지</p>
              <span className="menu-card-price">₩ 35,000</span>
            </div>
          </div>
          <div className="menu-card animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="menu-card-img" style={{ background: '#f5efe6' }}>
              <img src={bubbleTea} alt="시그니처 버블 밀크티 키트" />
            </div>
            <div className="menu-card-body">
              <h3 className="menu-card-title">시그니처 버블 밀크티 키트</h3>
              <p className="menu-card-desc">집에서도 즐기는 모찌고만의 특별한 버블티</p>
              <span className="menu-card-price">₩ 18,000</span>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/shop" className="btn btn-primary btn-lg">
            쇼핑몰 전체보기
          </Link>
        </div>
      </section>

      {/* Menu Section */}
      <section className="section menu-section" id="menu">
        <div className="section-header">
          <div className="section-label">MENU</div>
          <h2 className="section-title">시그니처 메뉴</h2>
          <p className="section-desc">
            정성껏 만든 모찌고만의 특별한 디저트를 소개합니다
          </p>
        </div>
        <div className="menu-grid">
          {menuItems.map((item, index) => (
            <div
              className="menu-card animate-fade-in-up"
              key={item.id}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="menu-card-img">
                <img src={images[item.image]} alt={item.title} />
              </div>
              <div className="menu-card-body">
                <h3 className="menu-card-title">{item.title}</h3>
                <p className="menu-card-desc">{item.desc}</p>
                <span className="menu-card-price">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About / Store Info Section */}
      <section className="section about-section" id="about">
        <div className="about-grid">
          <div className="about-content">
            <div className="section-label">ABOUT US</div>
            <h3>모찌고를 소개합니다</h3>
            <p>
              모찌고는 수원 행궁동에 위치한 모찌 전문 카페입니다. 
              매일 아침 정성스럽게 만드는 수제 모찌 디저트와 
              특별한 모찌 토핑 버블티를 선보이고 있습니다.
              따뜻하고 아늑한 공간에서 달콤한 모찌의 매력에 빠져보세요.
            </p>
            <div className="info-list">
              <div className="info-item">
                <div className="info-icon">
                  <MapPin size={18} />
                </div>
                <div className="info-item-content">
                  <h4>위치</h4>
                  <p>수원 팔달구 정조로 873, 1층</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <Clock size={18} />
                </div>
                <div className="info-item-content">
                  <h4>영업시간</h4>
                  <p>매일 11:00 - 21:00 (월·화 정기휴무)</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <Phone size={18} />
                </div>
                <div className="info-item-content">
                  <h4>연락처</h4>
                  <p>031-000-0000</p>
                </div>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img src={mochiDesserts} alt="모찌고 매장" />
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="section instagram-section" id="instagram">
        <div className="section-header">
          <div className="section-label">INSTAGRAM</div>
          <h2 className="section-title">모찌고의 일상</h2>
          <p className="section-desc">
            인스타그램에서 모찌고의 새로운 소식을 확인하세요
          </p>
        </div>
        <a
          href="https://www.instagram.com/mochigo_cafe/"
          target="_blank"
          rel="noopener noreferrer"
          className="instagram-cta"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#E1306C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: '8px' }}
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
          <span>
            <span className="instagram-handle">@mochigo_cafe</span> 팔로우하기
          </span>
        </a>
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

export default HomePage;
