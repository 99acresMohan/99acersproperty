"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const AboutUs = () => {
  const router = useRouter();

  return (
    <div style={styles.pageWrapper}>
     

      <div style={styles.container}>
        <h1 style={styles.mainTitle}>About 99acers Property</h1>
        <p style={styles.subtitle}>Redefining the Property Experience in India</p>

        <section style={styles.section}>
          <p style={styles.text}>
            Welcome to <strong>99acers Property</strong>, your premier destination for residential and commercial property solutions. 
            Established with a vision to bring transparency and professional integrity to the Delhi real estate market, 
            we specialize in helping families find their dream homes and investors secure high-yield assets in 
            <strong> India.</strong>
          </p>
          <p style={styles.text}>
            At 99acers Property, we understand that buying or selling a property is not just a financial transaction; 
            it is a life-changing milestone. That is why we have built a platform that combines 
            <strong> local expertise</strong> with <strong>modern technology</strong> to make your property journey seamless.
          </p>
        </section>

        <div style={styles.mission}>
          <h3 style={styles.sectionTitle}>Our Mission</h3>
          <p style={styles.text}>
            To become the most trusted and technologically advanced real estate gateway in Delhi, 
            empowering every citizen to own a piece of this vibrant city with absolute confidence 
            through technology and integrity.
          </p>
        </div>

        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Why Choose 99acers Property?</h3>
          <ul style={styles.list}>
            <li><strong>Verified Listings:</strong> Strict internal checks for accurate area and floor info.</li>
            <li><strong>Direct Communication:</strong> Secure OTP system to connect with genuine owners.</li>
            <li><strong>Local Experts:</strong> Specializing in Rohini Sector-24, 28, 34, and DDA Flats.</li>
            <li><strong>End-to-End Support:</strong> Handling documentation and DDA policy navigation.</li>
          </ul>
        </section>

        <div style={styles.contactCard}>
          <h3 style={{...styles.sectionTitle, color: '#0078db'}}>Visit Our Office</h3>
          <p style={styles.contactText}>📍 <strong>Address:</strong> Sector-34, Rohini, Delhi - 110085</p>
          <p style={styles.contactText}>📞 <strong>Phone:</strong> +91 9891992544</p>
          <p style={styles.contactText}>✉️ <strong>Email:</strong> info@jmdrealestate.com</p>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pageWrapper: { backgroundColor: '#f9fbff', minHeight: '100vh', padding: '2px' },
  navBar: {
    maxWidth: '800px',
    margin: '0 auto 20px',
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  navBtn: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: '1px solid #0078db',
    backgroundColor: '#fff',
    color: '#0078db',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
    transition: 'all 0.2s'
  },
  adminBtn: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#333',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
    marginLeft: 'auto'
  },
  container: { 
    maxWidth: '800px', 
    margin: '0 auto', 
    textAlign: 'left', 
    fontFamily: '"Segoe UI", Roboto, Arial, sans-serif',
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
  },
  mainTitle: { color: '#333', fontSize: '2.5rem', marginBottom: '10px', textAlign: 'center' },
  subtitle: { color: '#0078db', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center' },
  section: { marginBottom: '30px' },
  sectionTitle: { fontSize: '1.5rem', color: '#222', borderBottom: '2px solid #0078db', display: 'inline-block', marginBottom: '15px' },
  text: { fontSize: '1.1rem', color: '#555', lineHeight: '1.7', marginBottom: '15px' },
  list: { paddingLeft: '20px', fontSize: '1.05rem', color: '#555', lineHeight: '2' },
  mission: { 
    margin: '40px 0', 
    padding: '30px', 
    backgroundColor: '#f0f7ff', 
    borderRadius: '12px', 
    borderLeft: '5px solid #0078db' 
  },
  contactCard: { 
    marginTop: '40px', 
    padding: '25px', 
    border: '1px solid #e0e0e0', 
    borderRadius: '12px', 
    backgroundColor: '#fff',
    textAlign: 'center'
  },
  contactText: { fontSize: '1.1rem', margin: '8px 0', color: '#444' }
};

export default AboutUs;