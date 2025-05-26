import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

function Dashboard() {
  const [patients, setPatients] = useState([]);  // Stocăm pacienții
  const [selectedPatient, setSelectedPatient] = useState(null);  // Pacientul selectat
  const [data, setData] = useState([]);  // Datele vitale ale pacientului selectat

  // Obține pacienții
  useEffect(() => {
    axios.get("http://localhost:8000/patients")
      .then(res => {
        setPatients(res.data.patients);  // Salvează pacienții în state
      });
  }, []);

  // Preia datele vitale pentru pacientul selectat
  const fetchDataForPatient = (patientId) => {
    axios.get(`http://localhost:8000/vitals/${patientId}`)
      .then(res => {
        console.log('Vitals data:', res.data);  // Add this line to debug
        setData(res.data);  // Salvează datele vitale
      });
  };

  return (
    <>
      <style>
        {`
          body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.7; }
            100% { transform: scale(1); opacity: 0.5; }
          }
        `}
      </style>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1A237E 0%, #0D47A1 100%)',
        position: 'relative',
        overflow: 'hidden',
        margin: 0,
        padding: '2rem',
        boxSizing: 'border-box',
        width: '100vw'
      }}>
        {/* Animated background elements */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          animation: 'pulse 4s ease-in-out infinite',
          top: 0,
          left: 0
        }} />

        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <span role="img" aria-label="hospital" style={{
                fontSize: '3rem',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }}>🏥</span>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: 'white',
                margin: 0,
                textShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}>
                Patient Dashboard
              </h2>
            </div>
            
            <div style={{
              position: 'relative',
              width: '300px',
              minWidth: '250px'
            }}>
              <select 
                onChange={(e) => { 
                  const patientId = e.target.value; 
                  setSelectedPatient(patientId); 
                  fetchDataForPatient(patientId);
                }}
                style={{
                  width: '100%',
                  padding: '1rem 1rem 1rem 3rem',
                  borderRadius: '12px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  fontSize: '1rem',
                  outline: 'none',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  boxShadow: '0 4px 6px rgba(26, 35, 126, 0.2)',
                  cursor: 'pointer',
                  appearance: 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                <option value="" style={{ backgroundColor: '#0D47A1', color: 'white' }}>Select a patient</option>
                {patients.map((patient) => (
                  <option key={patient} value={patient} style={{ backgroundColor: '#0D47A1', color: 'white' }}>{patient}</option>
                ))}
              </select>
              <span style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'white',
                pointerEvents: 'none'
              }}>👤</span>
            </div>
          </div>

          {selectedPatient && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                padding: '1.5rem',
                borderRadius: '15px',
                boxShadow: '0 4px 6px rgba(26, 35, 126, 0.2)',
                transition: 'transform 0.3s ease',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <h3 style={{
                  color: 'white',
                  marginBottom: '1rem',
                  fontSize: '1.5rem',
                  fontWeight: '600'
                }}>Patient Overview</h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '1.1rem'
                }}>ID: {selectedPatient}</p>
              </div>
            </div>
          )}

          {selectedPatient && (
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              padding: '2rem',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(26, 35, 126, 0.2)',
              marginBottom: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h3 style={{
                color: 'white',
                marginBottom: '1.5rem',
                fontSize: '1.5rem',
                fontWeight: '600'
              }}>Vital Signs Monitor</h3>
              
              <div style={{
                height: '400px',
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '10px',
                padding: '1rem'
              }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <XAxis 
                      dataKey="id" 
                      stroke="rgba(255, 255, 255, 0.7)"
                      tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
                    />
                    <YAxis 
                      stroke="rgba(255, 255, 255, 0.7)"
                      tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Legend 
                      wrapperStyle={{
                        color: 'white'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="heart_rate" 
                      stroke="#FF6B6B" 
                      name="Heart Rate"
                      strokeWidth={2}
                      dot={{ r: 4, fill: '#FF6B6B' }}
                      activeDot={{ r: 6, fill: '#FF6B6B' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="bp_sys" 
                      stroke="#4ECDC4" 
                      name="BP Systolic"
                      strokeWidth={2}
                      dot={{ r: 4, fill: '#4ECDC4' }}
                      activeDot={{ r: 6, fill: '#4ECDC4' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="bp_dia" 
                      stroke="#FFE66D" 
                      name="BP Diastolic"
                      strokeWidth={2}
                      dot={{ r: 4, fill: '#FFE66D' }}
                      activeDot={{ r: 6, fill: '#FFE66D' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="spo2" 
                      stroke="#95E1D3" 
                      name="SpO2"
                      strokeWidth={2}
                      dot={{ r: 4, fill: '#95E1D3' }}
                      activeDot={{ r: 6, fill: '#95E1D3' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {selectedPatient && (
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              padding: '2rem',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(26, 35, 126, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h4 style={{
                color: 'white',
                marginBottom: '1.5rem',
                fontSize: '1.3rem',
                fontWeight: '600'
              }}>Detailed Vital Signs</h4>
              
              <div style={{
                overflowX: 'auto',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)'
              }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'separate',
                  borderSpacing: 0,
                  textAlign: 'left'
                }}>
                  <thead>
                    <tr>
                      <th style={{
                        padding: '1rem',
                        borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        fontWeight: '600'
                      }}>Date</th>
                      <th style={{
                        padding: '1rem',
                        borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        fontWeight: '600'
                      }}>Heart Rate (bpm)</th>
                      <th style={{
                        padding: '1rem',
                        borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        fontWeight: '600'
                      }}>Blood Pressure (Sys/Dia)</th>
                      <th style={{
                        padding: '1rem',
                        borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        fontWeight: '600'
                      }}>Oxygen (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((record, index) => (
                      <tr 
                        key={index}
                        style={{
                          transition: 'background-color 0.2s ease',
                          ':hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)'
                          }
                        }}
                      >
                        <td style={{
                          padding: '1rem',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          color: 'white'
                        }}>{new Date(record.timestamp).toLocaleString()}</td>
                        <td style={{
                          padding: '1rem',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          color: 'white'
                        }}>{record.heart_rate}</td>
                        <td style={{
                          padding: '1rem',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          color: 'white'
                        }}>{record.bp_sys}/{record.bp_dia}</td>
                        <td style={{
                          padding: '1rem',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          color: 'white'
                        }}>{record.spo2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
