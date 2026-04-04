"use client";
import React, { useState, useEffect } from 'react';

const PropertyTile = ({ property, refreshList }: { property: any, refreshList?: () => void }) => {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1); 
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [sellerData, setSellerData] = useState<{ name: string; phone: string } | null>(null);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdminLoggedIn');
    setIsAdmin(adminStatus === 'true');
  }, []);

  const formatPrice = (val: any) => {
    if (!val) return "Price on Request";
    let num = parseFloat(val.toString().replace(/,/g, ''));
    if (isNaN(num)) return val; 
    if (num >= 10000000) return (num / 10000000).toFixed(2) + " Cr";
    if (num >= 100000) return (num / 100000).toFixed(2) + " Lac";
    return num.toLocaleString('en-IN');
  };

  const handleVerifyOtp = async () => {
    if (otp === '1234') { 
      try {
        // Updated to use fetch and your local Next.js API
        const response = await fetch('/api/register-visitor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mobile: mobile, propertyId: property._id })
        });
        const data = await response.json();
        
        if (data.success) {
          setSellerData({ name: data.sellerName, phone: data.sellerPhone });
          setStep(3); 
        }
      } catch (err) { alert("Server Error connecting to API"); }
    } else { alert("Use 1234"); }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        const response = await fetch(`/api/properties?id=${property._id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert("Deleted successfully");
          if(refreshList) refreshList(); 
          else window.location.reload();
        }
      } catch (err) { alert("Delete failed"); }
    }
  };

  return (
    <div style={styles.tile as React.CSSProperties}>
      <div style={styles.imageColumn as React.CSSProperties}>
        <div style={styles.imageSection as React.CSSProperties}>
          {property.imageUrl ? (
            <img src={property.imageUrl} alt={property.title} style={styles.propertyImg as React.CSSProperties} />
          ) : (
            <div style={styles.placeholder as React.CSSProperties}>No Image Available</div>
          )}
          <div style={styles.dateTag as React.CSSProperties}>Verified</div>
        </div>
        <div style={styles.postedUnderImage as React.CSSProperties}>
            <div style={styles.postedText as React.CSSProperties}>📅 Posted: {new Date(property.postedAt).toLocaleDateString('en-GB')}</div>
            <div style={styles.postedText as React.CSSProperties}>👤 By: <span style={{color: '#0078db'}}>{property.postedBy || 'Owner'}</span></div>
        </div>
      </div>

      <div style={styles.details as React.CSSProperties}>
        <div style={styles.headerRow as React.CSSProperties}>
          <h3 style={styles.price as React.CSSProperties}>₹{formatPrice(property.price)}</h3>
          <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
            <span style={styles.propIdBadge as React.CSSProperties}>ID: {property.propertyId || '...'}</span>
            <span style={styles.bhkBadge as React.CSSProperties}>
              {property.propertyType === 'Plot' ? 'Plot' : `${property.bhk} BHK`}
            </span>
          </div>
        </div>
        
        <h4 style={styles.title as React.CSSProperties}>{property.title}</h4>
        <p style={styles.loc as React.CSSProperties}>📍 {property.location}</p>

        <p style={{ fontSize: '0.85rem', color: '#555', margin: '0 0 10px 0', whiteSpace: 'pre-line' }}>
          {showFullDesc 
            ? (property.description || "No description provided.") 
            : `${(property.description || "No description").substring(0, 100)}...`}
        </p>

        <div style={styles.infoRow as React.CSSProperties}>
          <div style={styles.infoItem as React.CSSProperties}>
            <span style={styles.label as React.CSSProperties}>Area:</span> 
            <span style={styles.val as React.CSSProperties}>
              {property.areaSize || property.area} 
              <span style={styles.unitTag as React.CSSProperties}>
                {property.areaUnit ? property.areaUnit : (property.propertyType === 'Plot' ? 'Sq. Yds' : 'sq.ft.')}
              </span>
            </span>
          </div>

          <div style={styles.infoItem as React.CSSProperties}>
            <span style={styles.label as React.CSSProperties}>Road:</span> 
            <span style={styles.val as React.CSSProperties}>{property.road || 'N/A'}</span>
          </div>
          
          <div style={styles.infoItem as React.CSSProperties}>
            <span style={styles.label as React.CSSProperties}>Facing:</span> 
            <span style={styles.val as React.CSSProperties}>{property.facing || 'N/A'}</span>
          </div>

          <div style={styles.infoItem as React.CSSProperties}>
            <span style={styles.label as React.CSSProperties}>Corner:</span> 
            <span style={styles.val as React.CSSProperties}>{property.isCorner || 'No'}</span>
          </div>

          {property.propertyType !== 'Plot' && (
            <div style={styles.infoItem as React.CSSProperties}>
              <span style={styles.label as React.CSSProperties}>Floor:</span> 
              <span style={styles.val as React.CSSProperties}>{property.floor || 'N/A'}</span>
            </div>
          )}
        </div>

        <div style={styles.actions as React.CSSProperties}>
          <button style={styles.viewBtn as React.CSSProperties} onClick={() => setShowFullDesc(!showFullDesc)}>
            {showFullDesc ? "Hide Details" : "View Details"}
          </button>
          <button onClick={() => setShowModal(true)} style={styles.contactBtn as React.CSSProperties}>
            {sellerData ? `Call ${sellerData.name}` : "Contact Seller"}
          </button>
          {isAdmin && <button onClick={handleDelete} style={styles.deleteBtn as React.CSSProperties}>🗑 Delete</button>}
        </div>

        {showModal && (
          <div style={styles.modalOverlay as React.CSSProperties}>
            <div style={styles.modal as React.CSSProperties}>
              {step === 1 && (
                <div>
                  <h3>Mobile Verification</h3>
                  <input type="text" placeholder="Mobile Number" style={styles.input as React.CSSProperties} value={mobile} onChange={(e)=>setMobile(e.target.value)} />
                  <button onClick={() => setStep(2)} style={styles.mainBtn as React.CSSProperties}>Get OTP</button>
                </div>
              )}
              {step === 2 && (
                <div>
                  <h3>Verify OTP</h3>
                  <input type="text" placeholder="Enter 1234" style={styles.input as React.CSSProperties} value={otp} onChange={(e)=>setOtp(e.target.value)} />
                  <button onClick={handleVerifyOtp} style={styles.mainBtn as React.CSSProperties}>Verify</button>
                </div>
              )}
              {step === 3 && sellerData && (
                <div style={{textAlign: 'center'}}>
                  <h3 style={{color: '#28a745'}}>Verified!</h3>
                  <div style={styles.sellerCard as React.CSSProperties}>
                    <p><strong>Owner:</strong> {sellerData.name}</p>
                    <p style={{fontSize: '1.2rem', color: '#0078db', fontWeight:'bold'}}>{sellerData.phone}</p>
                  </div>
                  <button onClick={() => setShowModal(false)} style={styles.mainBtn as React.CSSProperties}>Close</button>
                </div>
              )}
              {step !== 3 && <button onClick={() => setShowModal(false)} style={styles.closeBtn as React.CSSProperties}>Cancel</button>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  tile: { display: 'flex', flexWrap: 'wrap', background: '#fff', borderRadius: '12px', border: '1px solid #ddd', marginBottom: '20px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', width: '100%' },
  imageColumn: { flex: '0 0 280px', display: 'flex', flexDirection: 'column', background: '#fcfcfc', borderRight: '1px solid #eee' },
  imageSection: { width: '280px', height: '210px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f0f0' },
  propertyImg: { width: '100%', height: '100%', objectFit: 'cover' },
  postedUnderImage: { padding: '10px' },
  postedText: { fontSize: '0.75rem', color: '#777', marginBottom: '3px' },
  details: { flex: '1 1 300px', padding: '20px', display: 'flex', flexDirection: 'column' },
  placeholder: { color: '#aaa' },
  dateTag: { position: 'absolute', top: '10px', left: '10px', background: '#28a745', color: '#fff', padding: '3px 8px', fontSize: '0.65rem', borderRadius:'3px' },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  price: { margin: 0, fontSize: '1.5rem', color: '#000', fontWeight: 'bold' },
  propIdBadge: { color: '#888', fontSize: '0.7rem', border: '1px solid #eee', padding: '3px 7px', borderRadius: '4px' },
  bhkBadge: { background: '#f0f7ff', color: '#0078db', padding: '4px 10px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' },
  title: { margin: '8px 0', fontSize: '1.1rem', color: '#333' },
  loc: { color: '#666', fontSize: '0.9rem', marginBottom: '10px' },
  infoRow: { display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '15px', padding: '10px 0', borderTop: '1px solid #f5f5f5', borderBottom: '1px solid #f5f5f5', alignItems: 'center' },
  infoItem: { fontSize: '0.82rem', display: 'flex', alignItems: 'center' },
  label: { color: '#888', marginRight: '4px' },
  val: { fontWeight: '600', color: '#444' },
  actions: { display: 'flex', gap: '10px' },
  viewBtn: { padding: '8px 15px', border: '1px solid #0078db', color: '#0078db', background: '#fff', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  contactBtn: { padding: '8px 15px', background: '#0078db', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  deleteBtn: { background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', fontSize: '0.85rem' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 },
  modal: { background: '#fff', padding: '25px', borderRadius: '12px', width: '300px' },
  input: { width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' },
  mainBtn: { width: '100%', padding: '10px', background: '#0078db', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  closeBtn: { background: 'none', border: 'none', color: '#999', marginTop: '10px', cursor: 'pointer', width: '100%' },
  sellerCard: { background: '#f0f7ff', padding: '10px', borderRadius: '8px', margin: '10px 0' },
  unitTag: { marginLeft: '5px', fontSize: '0.7rem', background: '#eee', padding: '2px 5px', borderRadius: '3px', textTransform: 'uppercase' as any }
};

export default PropertyTile;