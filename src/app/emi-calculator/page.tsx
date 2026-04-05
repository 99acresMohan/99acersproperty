"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState<number>(5000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(20);
  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const router = useRouter();

  // EMI Calculation Logic: [P x R x (1+R)^N]/[(1+R)^N-1]
  useEffect(() => {
    const p = loanAmount;
    const r = interestRate / 12 / 100; // monthly interest
    const n = tenure * 12; // monthly tenure

    if (r === 0) {
      setEmi(Math.round(p / n));
      setTotalPayment(p);
      setTotalInterest(0);
    } else {
      const emiCalc = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setEmi(Math.round(emiCalc));
      setTotalPayment(Math.round(emiCalc * n));
      setTotalInterest(Math.round((emiCalc * n) - p));
    }
  }, [loanAmount, interestRate, tenure]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        
        <h2 style={styles.title}>Home Loan EMI Calculator</h2>
        <p style={styles.subtitle}>Plan your property purchase in India with ease</p>

        <div style={styles.flexBox}>
          {/* INPUT SECTION */}
          <div style={styles.inputSection}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Loan Amount (₹) - {loanAmount.toLocaleString('en-IN')}</label>
              <input 
                type="number" 
                value={loanAmount} 
                onChange={(e) => setLoanAmount(Number(e.target.value))} 
                style={styles.input}
              />
              <input 
                type="range" min="100000" max="50000000" step="50000"
                value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))}
                style={styles.slider}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Interest Rate (% P.A.) - {interestRate}%</label>
              <input 
                type="number" 
                value={interestRate} 
                onChange={(e) => setInterestRate(Number(e.target.value))} 
                style={styles.input}
              />
              <input 
                type="range" min="5" max="20" step="0.1"
                value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))}
                style={styles.slider}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Tenure (Years) - {tenure} yrs</label>
              <input 
                type="number" 
                value={tenure} 
                onChange={(e) => setTenure(Number(e.target.value))} 
                style={styles.input}
              />
              <input 
                type="range" min="1" max="30" step="1"
                value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
                style={styles.slider}
              />
            </div>
          </div>

          {/* RESULTS SECTION */}
          <div style={styles.resultSection}>
            <div style={styles.resultCard}>
              <span style={styles.resultLabel}>Monthly EMI</span>
              <h1 style={styles.resultValue}>₹ {emi.toLocaleString('en-IN')}</h1>
            </div>
            
            <div style={styles.statsRow}>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Total Interest</span>
                <span style={styles.statValue}>₹ {totalInterest.toLocaleString('en-IN')}</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Total Amount</span>
                <span style={styles.statValue}>₹ {totalPayment.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button style={styles.applyBtn} onClick={() => alert("Connecting you with our Banking Partners...")}>
              Get Loan Assistance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: { 
    minHeight: '100vh', 
    background: 'linear-gradient(135deg, #0078db 0%, #00d4ff 100%)', 
    padding: '40px 20px',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  },
  container: { 
    maxWidth: '900px', 
    width: '100%',
    background: 'rgba(255, 255, 255, 0.95)', 
    borderRadius: '24px', 
    padding: '40px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
    backdropFilter: 'blur(10px)'
  },
  //backBtn: { background: 'none', border: 'none', color: '#0078db', cursor: 'pointer', fontWeight: 'bold', marginBottom: '20px' },
  title: { color: '#1a1a1a', margin: '0', fontSize: '2rem', textAlign: 'center' },
  subtitle: { textAlign: 'center', color: '#666', marginBottom: '40px' },
  flexBox: { display: 'flex', gap: '40px', flexWrap: 'wrap' },
  inputSection: { flex: 1, minWidth: '300px' },
  inputGroup: { marginBottom: '30px' },
  label: { display: 'block', marginBottom: '10px', fontWeight: '600', color: '#444' },
  input: { 
    width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #eee', 
    fontSize: '1.1rem', fontWeight: 'bold', color: '#0078db', marginBottom: '10px', outline: 'none'
  },
  slider: { width: '100%', cursor: 'pointer', accentColor: '#0078db' },
  resultSection: { 
    flex: 1, minWidth: '300px', background: '#f8fbff', padding: '30px', 
    borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
    border: '1px solid #e1efff'
  },
  resultCard: { textAlign: 'center', marginBottom: '30px' },
  resultLabel: { color: '#666', fontSize: '1.1rem' },
  resultValue: { color: '#28a745', fontSize: '2.8rem', margin: '10px 0' },
  statsRow: { display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #ddd', paddingTop: '20px' },
  statItem: { display: 'flex', flexDirection: 'column' },
  statLabel: { fontSize: '0.85rem', color: '#777' },
  statValue: { fontWeight: 'bold', color: '#333' },
  applyBtn: { 
    marginTop: '30px', padding: '15px', background: '#ff9f00', color: '#fff', 
    border: 'none', borderRadius: '10px', fontSize: '1.1rem', fontWeight: 'bold', 
    cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 4px 15px rgba(255,159,0,0.3)'
  }
};

export default EMICalculator;