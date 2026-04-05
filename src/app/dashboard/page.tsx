"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// --- TYPESCRIPT INTERFACE ---
interface VisitorLog {
  _id: string;
  visitedAt: string;
  mobile: string;
  propertyTitle?: string;
  propertyId?: string;
}

const VisitorDashboard = () => {
  const [logs, setLogs] = useState<VisitorLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      // Ensure this URL matches your deployed Railway backend URL
      
      const res = await axios.get('http://localhost:5000/api/visitor-logs');
      setLogs(res.data);
    } catch (err) {
      console.error("Error fetching logs:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- EXPORT TO EXCEL (CSV) FUNCTION ---
  const downloadExcel = () => {
    if (logs.length === 0) {
      alert("No data available to export");
      return;
    }

    const headers = "Date,Time,Visitor Mobile,Property Title,Property ID\n";
    
    const rows = logs.map(log => {
        const dateObj = new Date(log.visitedAt);
        const date = dateObj.toLocaleDateString('en-IN');
        const time = dateObj.toLocaleTimeString('en-IN');
        const mobile = log.mobile;
        const title = log.propertyTitle || "N/A";
        const id = log.propertyId || "N/A";
        return `${date},${time},${mobile},"${title}",${id}\n`;
    }).join("");

    const csvContent = headers + rows;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.setAttribute("href", url);
    link.setAttribute("download", `JMD_Leads_${new Date().toLocaleDateString('en-IN')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <div>
          <h2 style={{margin: 0, color: '#0078db'}}>Admin: Visitor Lead Dashboard</h2>
          <p style={{margin: '5px 0', color: '#666'}}>Tracking all verified property inquiries for JMD Properties</p>
        </div>
        <div style={styles.actionGroup}>
            <button onClick={fetchLogs} style={styles.refreshBtn}>🔄 Refresh</button>
            <button onClick={downloadExcel} style={styles.exportBtn}>📊 Export to Excel (CSV)</button>
        </div>
      </div>

      {loading ? (
        <div style={styles.msg}>Loading Visitor Logs...</div>
      ) : logs.length > 0 ? (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.thead}>
                <th style={styles.th}>Date & Time</th>
                <th style={styles.th}>Visitor Mobile</th>
                <th style={styles.th}>Property Interested In</th>
                <th style={styles.th}>Verification</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log._id} style={styles.tr}>
                  <td style={styles.td}>{new Date(log.visitedAt).toLocaleString('en-IN')}</td>
                  <td style={styles.td}><strong style={{color: '#333'}}>{log.mobile}</strong></td>
                  <td style={styles.td}>{log.propertyTitle || "General Inquiry"}</td>
                  <td style={styles.td}>
                    <span style={styles.badge}>OTP Verified</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={styles.msg}>No leads found yet. New inquiries from Rohini will appear here.</div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { maxWidth: '1100px', margin: '40px auto', padding: '30px', background: '#fff', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontFamily: 'Segoe UI, Arial, sans-serif' },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px' },
  actionGroup: { display: 'flex', gap: '10px' },
  exportBtn: { background: '#28a745', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' },
  refreshBtn: { background: '#f8f9fa', color: '#333', border: '1px solid #ddd', padding: '12px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' },
  tableWrapper: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse' },
  thead: { background: '#f4f7fb' },
  th: { padding: '15px', textAlign: 'left', color: '#333', borderBottom: '2px solid #eef0f2', fontSize: '0.9rem' },
  tr: { borderBottom: '1px solid #f1f1f1' },
  td: { padding: '15px', fontSize: '0.9rem', color: '#555' },
  badge: { background: '#e1fceb', color: '#1db954', padding: '5px 12px', borderRadius: '15px', fontSize: '0.75rem', fontWeight: 'bold' },
  msg: { textAlign: 'center', padding: '50px', color: '#888', fontSize: '1.1rem' }
};

export default VisitorDashboard;