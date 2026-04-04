"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const blinkStyle = `
  @keyframes blink {
    0% { opacity: 1; }
    50% { opacity: 0.3; }
    100% { opacity: 1; }
  }
`;

const TopBar = () => {
  const router = useRouter();

  const openMap = () => {
    window.open('/ROHINI MAP PDF.pdf', '_blank');
  };

  return (
    <nav style={styles.nav}>
      <style dangerouslySetInnerHTML={{ __html: blinkStyle }} />
      
      <h2 style={{cursor:'pointer', color:'#000', margin: 0}} onClick={()=>router.push('/')}>
        JMD PROPERTIES
      </h2>

      <div style={styles.links}>
        <button style={styles.btn} onClick={()=>router.push('/')}>Home</button>
        <button style={styles.btn} onClick={()=>router.push('/about')}>About</button>
        <button style={styles.btn} onClick={()=>router.push('/contact')}>Contact</button>
        
        <button style={styles.taxBtn} onClick={() => router.push('/tax-guide')}>
          💰 Capital Gain Tax
        </button>

        <button style={styles.emiBtn} onClick={() => router.push('/emi-calculator')}>
          📊 EMI Calculator
        </button>

        <button style={styles.mapBtn} onClick={openMap}>
          🗺️ Rohini Map
        </button>
        
        <button style={styles.postBtn} onClick={() => router.push('/admin')}>
          <span style={styles.freeTag}>FREE</span> Post Property
        </button>
      </div>
    </nav>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  nav: { 
    height: '60px', 
    background: 'linear-gradient(45deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: '0 5%', 
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)', 
    position: 'sticky', 
    top: 0, 
    zIndex: 100 
  },
  links: { display: 'flex', gap: '15px', alignItems: 'center', marginLeft: 'auto' },
  btn: { background: 'transparent', border: 'none', color: '#000', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' },
  taxBtn: { background: '#28a745', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem', animation: 'blink 2s infinite' },
  emiBtn: { background: '#0078db', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem', animation: 'blink 1.5s infinite' },
  mapBtn: { background: '#000', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' },
  postBtn: { background: '#000', color: '#FFD700', border: '1px solid #FFD700', padding: '10px 18px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
  freeTag: { backgroundColor: '#ff0000', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', animation: 'blink 1s infinite' }
};

export default TopBar;