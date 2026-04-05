"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [credentials, setCredentials] = useState({ mobile: '', password: '' });
  const router = useRouter();

  // Typed handleKeyDown for TypeScript
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      const form = target.form;
      
      if (form) {
        // Find index of current input in the form
        const index = Array.from(form.elements).indexOf(target);
        const nextElement = form.elements[index + 1] as HTMLElement;

        if (nextElement && nextElement.tagName === "INPUT") {
          nextElement.focus();
        } else {
          handleLogin();
        }
      }
    }
  };

  const handleLogin = () => {
    // Keeping your specific JMD Admin credentials
    if (credentials.mobile === 'jmdmohan' && credentials.password === 'Mmm@1906d') {
      
      // 1. Save Admin state to LocalStorage
      localStorage.setItem('isAdminLoggedIn', 'true');
      
      alert("Welcome Admin Mohan!");

      // 2. Refresh and redirect to Home
      // window.location.href ensures the 'isAdminLoggedIn' state is picked up by all layouts
      window.location.href = "/"; 
      
    } else {
      alert("Invalid ID or Password!");
    }
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.loginCard}>
        <div style={styles.iconCircle}>🔐</div>
        <h2 style={styles.title}>Admin Login</h2>
        <p style={styles.subtitle}>Enter your special credentials</p>

        <form style={styles.form as React.CSSProperties}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Admin ID</label>
            <input
              type="text"
              placeholder="Your ID"
              style={styles.input}
              tabIndex={1}
              value={credentials.mobile}
              onKeyDown={handleKeyDown}
              onChange={(e) => setCredentials({ ...credentials, mobile: e.target.value })}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              style={styles.input}
              tabIndex={2}
              value={credentials.password}
              onKeyDown={handleKeyDown}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>

          <button type="button" onClick={handleLogin} style={styles.loginBtn}>
            Verify & Login
          </button>
        </form>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pageBackground: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  loginCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    backdropFilter: 'blur(10px)',
  },
  iconCircle: {
    width: '70px',
    height: '70px',
    background: '#f0f7ff',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '30px',
    margin: '0 auto 20px',
  },
  title: {
    margin: '0',
    color: '#333',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#777',
    fontSize: '14px',
    marginBottom: '30px',
  },
  form: {
    textAlign: 'left',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#555',
    marginBottom: '8px',
    marginLeft: '4px',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  loginBtn: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(to right, #00c6ff, #0072ff)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0, 114, 255, 0.3)',
    marginTop: '10px',
  }
};

export default Login;