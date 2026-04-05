"use client";

import React, { useState } from 'react';

const TaxGuide = () => {
  // Calculator State with Types
  const [salePrice, setSalePrice] = useState<string>('');
  const [purchasePrice, setPurchasePrice] = useState<string>('');
  const [gain, setGain] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);

  const calculateTax = () => {
    const s = parseFloat(salePrice) || 0;
    const p = parseFloat(purchasePrice) || 0;
    const netGain = s - p;
    
    setGain(netGain > 0 ? netGain : 0);
    // Applying new 12.5% LTCG rate (Budget 2024 rules active in 2026)
    setTax(netGain > 0 ? netGain * 0.125 : 0);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        
        <header style={styles.header}>
          <h1 style={styles.mainTitle}>Real Estate Capital Gains Guide (2026)</h1>
          <p style={styles.subtitle}>Professional Taxation & Reinvestment Resource</p>
        </header>

        {/* --- TAX CALCULATOR AT TOP --- */}
        <section style={styles.section}>
          <div style={styles.calculatorBox}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '15px', color: '#fff', fontWeight: '700' }}>
              📊 Quick Tax Estimator (LTCG)
            </h2>
            <div style={styles.calcRow}>
              <div style={{ flex: 1 }}>
                <label style={styles.labelWhite}>Total Sale Price (₹)</label>
                <input 
                  type="number" 
                  style={styles.calcInput} 
                  placeholder="e.g. 80,00,000" 
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)} 
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={styles.labelWhite}>Original Purchase Price (₹)</label>
                <input 
                  type="number" 
                  style={styles.calcInput} 
                  placeholder="e.g. 30,00,000" 
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)} 
                />
              </div>
            </div>
            <button onClick={calculateTax} style={styles.calcBtn}>Calculate Now</button>
            
            {gain > 0 && (
              <div style={styles.resultBox}>
                <div style={styles.resultItem}>Total Capital Gain: <span>₹{gain.toLocaleString('en-IN')}</span></div>
                <div style={styles.resultItemTax}>Estimated Tax (12.5%): <span>₹{tax.toLocaleString('en-IN')}</span></div>
                <p style={styles.taxNote}>*Calculated based on 2024 Budget rules without indexation.</p>
              </div>
            )}
          </div>
        </section>

        {/* 1. Basics */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>1. Types of Capital Gains</h2>
          <div style={styles.grid}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Short-Term (STCG)</h3>
              <p style={styles.cardText}>Holding period <b>less than 24 months</b>.</p>
              <div style={styles.taxBadge}>Taxed at your Slab Rate</div>
            </div>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Long-Term (LTCG)</h3>
              <p style={styles.cardText}>Holding period <b>24 months or more</b>.</p>
              <div style={styles.taxBadgeGreen}>12.5% Flat Tax</div>
            </div>
          </div>
        </section>

        {/* 2. Tax Saving Sections */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>2. How to Save Tax (Exemptions)</h2>
          <div style={styles.infoBox}>
            <div style={styles.infoItem}>
              <span style={styles.icon}>🏠</span>
              <div>
                <strong>Section 54: Residential Reinvestment</strong>
                <p style={styles.cardText}>Exemption available by buying a new house (within 2 years) or construction (within 3 years). Maximum limit: ₹10 Crores.</p>
              </div>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.icon}>📜</span>
              <div>
                <strong>Section 54EC: Capital Gain Bonds</strong>
                <p style={styles.cardText}>Invest profit in NHAI/REC bonds within 6 months. Max limit ₹50 Lakhs per year. 5-year lock-in.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3 & 4. Investment & Family */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>3. Ownership & Family Rules</h2>
          <div style={styles.cardFull}>
             <p style={styles.cardText}>• <b>Multiple Properties:</b> If total gain is &lt; ₹2 Cr, you can invest in <b>Two</b> residential houses (Once in a lifetime option).</p>
             <p style={styles.cardText}>• <b>Family Purchases:</b> Investing in the name of a married daughter usually leads to tax rejection. Always keep the <b>Seller as the 1st Owner</b> to ensure the exemption is valid.</p>
          </div>
        </section>

        {/* 5. Capital Gains Account Scheme (CGAS) */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>5. Capital Gains Account Scheme (CGAS)</h2>
          <div style={styles.alertBoxBlue}>
            <p><strong>Important:</strong> If you haven't reinvested the funds before the Income Tax Return (ITR) filing deadline, you must deposit the money into a <b>CGAS Account</b> at a nationalized bank to claim the tax benefit.</p>
          </div>
        </section>

        <footer style={styles.footer}>
          <p>© 2026 JMD Properties - Professional Property Dealing in Rohini.</p>
        </footer>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: { background: '#f0f2f5', minHeight: '100vh', padding: '30px 15px', fontFamily: 'Segoe UI, sans-serif' },
  container: { maxWidth: '850px', margin: '0 auto', background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
  header: { textAlign: 'center', marginBottom: '25px' },
  mainTitle: { fontSize: '1.8rem', color: '#1a1a1a', fontWeight: '800' },
  subtitle: { color: '#666', marginTop: '5px' },
  section: { marginBottom: '30px' },
  sectionTitle: { color: '#0078db', fontSize: '1.25rem', borderLeft: '4px solid #0078db', paddingLeft: '12px', marginBottom: '15px', fontWeight: '700' },
  grid: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
  card: { flex: '1 1 300px', padding: '15px', border: '1px solid #eee', borderRadius: '8px', background: '#f9fafb' },
  cardFull: { padding: '15px', border: '1px solid #eee', borderRadius: '8px', background: '#fff' },
  cardTitle: { margin: '0 0 8px 0', fontSize: '1.1rem', fontWeight: '600' },
  cardText: { fontSize: '0.92rem', color: '#444', lineHeight: '1.5' },
  taxBadge: { marginTop: '10px', background: '#fff1f0', color: '#cf1322', padding: '6px', borderRadius: '4px', textAlign: 'center', fontWeight: '700', fontSize: '0.8rem' },
  taxBadgeGreen: { marginTop: '10px', background: '#f6ffed', color: '#389e0d', padding: '6px', borderRadius: '4px', textAlign: 'center', fontWeight: '700', fontSize: '0.8rem' },
  infoBox: { display: 'flex', flexDirection: 'column', gap: '12px' },
  infoItem: { display: 'flex', gap: '15px', background: '#f0f7ff', padding: '15px', borderRadius: '8px', border: '1px solid #d0e4ff' },
  icon: { fontSize: '1.5rem' },
  alertBoxBlue: { padding: '15px', background: '#e6f7ff', borderLeft: '5px solid #1890ff', borderRadius: '4px', color: '#003a8c', fontSize: '0.9rem' },
  calculatorBox: { background: '#003a8c', padding: '25px', borderRadius: '12px', color: '#fff' },
  calcRow: { display: 'flex', gap: '20px', marginBottom: '15px', flexWrap: 'wrap' },
  labelWhite: { display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px', color: '#e6f7ff' },
  calcInput: { width: '100%', padding: '12px', borderRadius: '6px', border: 'none', fontSize: '1rem', boxSizing: 'border-box' },
  calcBtn: { width: '100%', padding: '14px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '800', fontSize: '1rem', textTransform: 'uppercase' },
  resultBox: { marginTop: '20px', padding: '15px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' },
  resultItem: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '1.1rem' },
  resultItemTax: { display: 'flex', justifyContent: 'space-between', color: '#ffccc7', fontWeight: '800', fontSize: '1.2rem' },
  taxNote: { fontSize: '0.75rem', color: '#adc6ff', marginTop: '10px', fontStyle: 'italic' },
  footer: { textAlign: 'center', marginTop: '30px', color: '#999', fontSize: '0.8rem' }
};

export default TaxGuide;