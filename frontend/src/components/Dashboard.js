import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

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
        setData(res.data);  // Salvează datele vitale
      });
  };

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: '#f8f9fa'
    }}>
      <h2 style={{
        color: '#2c3e50',
        marginBottom: '2rem',
        fontSize: '2rem',
        fontWeight: '600'
      }}>📊 Patient Dashboard</h2>
      
      <div style={{
        marginBottom: '2rem',
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <select 
          onChange={(e) => { 
            const patientId = e.target.value; 
            setSelectedPatient(patientId); 
            fetchDataForPatient(patientId);
          }}
          style={{
            width: '100%',
            padding: '0.8rem',
            borderRadius: '5px',
            border: '1px solid #ddd',
            fontSize: '1rem',
            outline: 'none',
            backgroundColor: 'white'
          }}
        >
          <option value="">Select a patient</option>
          {patients.map((patient) => (
            <option key={patient} value={patient}>{patient}</option>
          ))}
        </select>
      </div>

      {selectedPatient && (
        <div>
          <h3 style={{
            color: '#2c3e50',
            marginBottom: '1.5rem',
            fontSize: '1.5rem'
          }}>Vital Signs for Patient {selectedPatient}</h3>
          
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <LineChart width={800} height={400} data={data}>
              <XAxis dataKey="id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="heart_rate" stroke="#8884d8" name="Heart Rate" />
              <Line type="monotone" dataKey="bp_sys" stroke="#82ca9d" name="BP Systolic" />
              <Line type="monotone" dataKey="bp_dia" stroke="#ff7300" name="BP Diastolic" />
              <Line type="monotone" dataKey="spo2" stroke="#d0d0d0" name="SpO2" />
            </LineChart>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h4 style={{
              color: '#2c3e50',
              marginBottom: '1rem',
              fontSize: '1.2rem'
            }}>Detailed Vital Signs</h4>
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left'
              }}>
                <thead>
                  <tr style={{
                    backgroundColor: '#f8f9fa',
                    borderBottom: '2px solid #dee2e6'
                  }}>
                    <th style={{ padding: '1rem' }}>Date</th>
                    <th style={{ padding: '1rem' }}>Heart Rate (bpm)</th>
                    <th style={{ padding: '1rem' }}>Blood Pressure (Sys/Dia)</th>
                    <th style={{ padding: '1rem' }}>Oxygen (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((record, index) => (
                    <tr key={index} style={{
                      borderBottom: '1px solid #dee2e6',
                      ':hover': {
                        backgroundColor: '#f8f9fa'
                      }
                    }}>
                      <td style={{ padding: '1rem' }}>{index + 1}</td>
                      <td style={{ padding: '1rem' }}>{record.heart_rate}</td>
                      <td style={{ padding: '1rem' }}>{record.bp_sys}/{record.bp_dia}</td>
                      <td style={{ padding: '1rem' }}>{record.spo2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
