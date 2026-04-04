"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropertyTile from '@/components/PropertyTile';

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const router = useRouter();

  const bannerImages = [
    '/images/delhi-hero.jpg', 
    '/images/delhi-hero2.jpg', 
    '/images/delhi-hero3.jpg', 
    '/images/delhi-hero4.jpg',
    '/images/delhi-hero5.jpg', 
    '/images/delhi-hero6.jpg', 
    '/images/delhi-hero7.jpg', 
    '/images/delhi-hero8.jpg',
    '/images/delhi-hero9.jpg', 
    '/images/delhi-hero1.jpg'
  ];

  // Banner Animation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev === bannerImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [bannerImages.length]);

  // Auth & Data Fetching
  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdminLoggedIn');
    setIsAdmin(adminStatus === 'true');

    // Fetch from your Next.js API route
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        setProperties(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    window.location.reload(); 
  };

  return (
    <div style={styles.pageWrapper}>
      {/* 1. HERO BANNER */}
      <div style={styles.hero}>
        {bannerImages.map((img, index) => (
          <img 
            key={index}
            src={img} 
            alt="Delhi Real Estate" 
            style={{
              ...styles.heroImg,
              opacity: currentImgIndex === index ? 1 : 0,
              transition: 'opacity 1s ease-in-out'
            }} 
          />
        ))}
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>JMD Properties Delhi NCR</h1>
          <p style={styles.heroSubtitle}>Premium Residences • Commercial Hubs • Verified Leads</p>
        </div>
      </div>

      {/* 2. MAIN LAYOUT (25/75) */}
      <div style={styles.mainLayout}>
        {/* LEFT PANEL */}
        <div style={styles.leftPanel}>
          <div style={styles.sidebar}>
            <button onClick={() => router.push('/admin')} style={styles.postBtn}>
              <span style={{ marginRight: '10px' }}>➕</span> Post Your Property
            </button>
            
            
            <div style={styles.menuBox}>
              <div style={styles.menuHeader}>MAIN MENU</div>
              <div onClick={() => router.push('/')} style={styles.menuItem}>🏠 Home / Listings</div>
              <div onClick={() => router.push('/about')} style={styles.menuItem}>ℹ️ About Us</div>
              <div onClick={() => router.push('/contact')} style={styles.menuItem}>📞 Contact Us</div>
              
              <hr style={styles.divider} />
              
              <div style={styles.menuHeader}>ADMIN CONTROLS</div>
              {isAdmin ? (
                <>
                  <div onClick={() => router.push('/admin/logs')} style={styles.menuItem}>📋 Visitor Lead Logs</div>
                  <div onClick={() => router.push('/admin')} style={styles.menuItem}>⚙️ Manage Properties</div>
                  <div onClick={handleLogout} style={{...styles.menuItem, color: '#dc3545', fontWeight: 'bold'}}>
                    🚪 Logout Admin
                  </div>
                </>
              ) : (
                <div onClick={() => router.push('/login')} style={styles.menuItem}>🔑 Admin Login</div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={styles.rightContent}>
          <div style={styles.contentHeader}>
            <h2 style={{margin: 0}}>Properties in Rohini & Delhi</h2>
            <div style={styles.countBadge}>{properties.length} Listings Found</div>
          </div>

          {loading ? (
            <div style={styles.statusMsg}>Loading properties...</div>
          ) : properties.length > 0 ? (
            <div style={styles.listContainer}>
              {properties.map((item: any) => (
                <PropertyTile key={item._id} property={item} />
              ))}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <h3>No Properties Found</h3>
              <p>Check back later or post a property yourself.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  pageWrapper: { backgroundColor: '#f0f2f5', minHeight: '100vh', fontFamily: 'Arial' },
  hero: { position: 'relative', height: '400px', width: '100%', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', backgroundColor: '#000' },
  heroImg: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 },
  heroContent: { position: 'relative', textAlign: 'right', padding: '20px 40px', zIndex: 2 },
  heroTitle: { fontSize: '2.8rem', fontWeight: '800', margin: 0, color: 'white', textShadow: '2px 2px 10px rgba(0,0,0,1)' },
  heroSubtitle: { fontSize: '1.2rem', fontWeight: '600', color: 'white', marginTop: '0px', textShadow: '2px 2px 8px rgba(0,0,0,1)' },
  mainLayout: { display: 'flex', maxWidth: '1300px', margin: '0 auto', padding: '30px 20px' },
  leftPanel: { width: '25%', position: 'sticky', top: '80px', height: 'fit-content' },
  sidebar: { background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' },
  postBtn: { width: '100%', padding: '15px', background: '#0078db', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '20px' },
  menuBox: { textAlign: 'left' },
  menuHeader: { fontSize: '0.7rem', color: '#888', fontWeight: 'bold', marginBottom: '10px', marginTop: '15px' },
  menuItem: { padding: '12px 10px', color: '#333', cursor: 'pointer', fontSize: '0.95rem', borderRadius: '6px' },
  divider: { border: '0', borderTop: '1px solid #eee', margin: '15px 0' },
  rightContent: { width: '75%', marginLeft: '35px' },
  contentHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' },
  countBadge: { background: '#fff', padding: '5px 15px', borderRadius: '20px', fontSize: '0.85rem', color: '#666', border: '1px solid #ddd' },
  listContainer: { display: 'flex', flexDirection: 'column', gap: '20px' },
  statusMsg: { textAlign: 'center', padding: '40px' },
  emptyState: { textAlign: 'center', padding: '60px', background: '#fff', borderRadius: '12px' }
};