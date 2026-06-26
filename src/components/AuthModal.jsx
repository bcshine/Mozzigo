import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { X, Eye, EyeOff } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialView = 'login' }) {
  const [view, setView] = useState(initialView);
  const [loading, setLoading] = useState(false);
  
  // Login fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  // Signup fields
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState(''); // 6 digits
  const [gender, setGender] = useState('M'); // M or F
  
  useEffect(() => {
    if (isOpen) {
      setView(initialView);
      // Reset fields
      setEmail('');
      setPassword('');
      setPasswordConfirm('');
      setName('');
      setPhone('');
      setBirthDate('');
      setGender('M');
      setAutoLogin(true);
    }
  }, [isOpen, initialView]);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      // If autoLogin is false, we technically just let it be for now and rely on default persistence,
      // But we can listen for window close in App.jsx. For now, Supabase doesn't easily support 
      // dynamically switching storage. We'll just set a flag in sessionStorage.
      if (!autoLogin) {
        sessionStorage.setItem('temp_session', 'true');
      } else {
        sessionStorage.removeItem('temp_session');
      }
      
      alert('로그인 성공!');
      onClose();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return alert('비밀번호가 일치하지 않습니다.');
    }
    if (birthDate.length !== 6) {
      return alert('주민번호 앞자리는 6자리여야 합니다.');
    }
    
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            name,
            phone,
            birth_date: birthDate,
            gender
          }
        }
      });
      if (error) throw error;
      alert('회원가입 완료! (현재 설정에 따라 이메일 확인이 필요할 수 있습니다.)');
      onClose();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd', fontSize: '0.9rem' };
  const labelStyle = { display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold', color: '#555' };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999 }}>
      <div 
        className="modal" 
        onClick={(e) => e.stopPropagation()} 
        style={{ width: view === 'signup' ? '500px' : '400px', maxWidth: '90vw', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}
      >
        <button
          className="btn btn-ghost"
          onClick={onClose}
          style={{ position: 'absolute', top: '12px', right: '12px' }}
        >
          <X size={20} />
        </button>
        <h2 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem', textAlign: 'center' }}>
          🍡 {view === 'login' ? '모찌고 로그인' : '모찌고 회원가입'}
        </h2>
        
        {view === 'login' ? (
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
              <label style={labelStyle}>이메일</label>
              <input 
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                style={inputStyle} placeholder="이메일을 입력하세요"
              />
            </div>
            <div style={{ marginBottom: '1rem', textAlign: 'left', position: 'relative' }}>
              <label style={labelStyle}>비밀번호</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
                  style={{...inputStyle, paddingRight: '2.5rem'}} placeholder="비밀번호를 입력하세요"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <div style={{ marginBottom: '1.5rem', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input 
                type="checkbox" 
                id="autoLogin"
                checked={autoLogin}
                onChange={(e) => setAutoLogin(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: 'var(--primary-color)' }}
              />
              <label htmlFor="autoLogin" style={{ fontSize: '0.9rem', color: '#555', cursor: 'pointer' }}>자동 로그인</label>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem' }} disabled={loading}>
              {loading ? '처리 중...' : '로그인'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ textAlign: 'left', gridColumn: 'span 2' }}>
                <label style={labelStyle}>이메일</label>
                <input 
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle} placeholder="example@email.com"
                />
              </div>
              
              <div style={{ textAlign: 'left', position: 'relative' }}>
                <label style={labelStyle}>비밀번호</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
                    style={{...inputStyle, paddingRight: '2.5rem'}} placeholder="비밀번호"
                  />
                  <button 
                    type="button" onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div style={{ textAlign: 'left', position: 'relative' }}>
                <label style={labelStyle}>비밀번호 확인</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showPasswordConfirm ? "text" : "password"} required value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}
                    style={{...inputStyle, paddingRight: '2.5rem'}} placeholder="비밀번호 확인"
                  />
                  <button 
                    type="button" onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}
                  >
                    {showPasswordConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div style={{ textAlign: 'left' }}>
                <label style={labelStyle}>이름</label>
                <input 
                  type="text" required value={name} onChange={(e) => setName(e.target.value)}
                  style={inputStyle} placeholder="홍길동"
                />
              </div>

              <div style={{ textAlign: 'left' }}>
                <label style={labelStyle}>전화번호</label>
                <input 
                  type="tel" required value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^0-9-]/g, ''))}
                  style={inputStyle} placeholder="010-1234-5678"
                />
              </div>

              <div style={{ textAlign: 'left' }}>
                <label style={labelStyle}>주민번호 앞자리</label>
                <input 
                  type="text" required value={birthDate} maxLength={6} onChange={(e) => setBirthDate(e.target.value.replace(/[^0-9]/g, ''))}
                  style={inputStyle} placeholder="YYMMDD"
                />
              </div>

              <div style={{ textAlign: 'left' }}>
                <label style={labelStyle}>성별</label>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                    <input type="radio" name="gender" value="M" checked={gender === 'M'} onChange={(e) => setGender(e.target.value)} style={{ accentColor: 'var(--primary-color)' }} /> 남성
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                    <input type="radio" name="gender" value="F" checked={gender === 'F'} onChange={(e) => setGender(e.target.value)} style={{ accentColor: 'var(--primary-color)' }} /> 여성
                  </label>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem', marginTop: '1rem' }} disabled={loading}>
              {loading ? '처리 중...' : '가입하기'}
            </button>
          </form>
        )}
        
        <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', textAlign: 'center' }}>
          {view === 'login' ? (
            <p>계정이 없으신가요? <span style={{ color: 'var(--primary-color)', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setView('signup')}>회원가입</span></p>
          ) : (
            <p>이미 계정이 있으신가요? <span style={{ color: 'var(--primary-color)', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setView('login')}>로그인</span></p>
          )}
        </div>
      </div>
    </div>
  );
}
