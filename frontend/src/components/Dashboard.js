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
    <div>
      <h2>📊 Dashboard Pacienți</h2>
      <select onChange={(e) => { 
        const patientId = e.target.value; 
        setSelectedPatient(patientId); 
        fetchDataForPatient(patientId);  // Obține datele pacientului
      }}>
        <option value="">Selectează un pacient</option>
        {patients.map((patient) => (
          <option key={patient} value={patient}>{patient}</option>
        ))}
      </select>

      {selectedPatient && (
        <div>
          <h3>Date vitale pentru pacientul {selectedPatient}</h3>
          <LineChart width={800} height={400} data={data}>
            <XAxis dataKey="id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="heart_rate" stroke="#8884d8" />
            <Line type="monotone" dataKey="bp_sys" stroke="#82ca9d" />
            <Line type="monotone" dataKey="bp_dia" stroke="#ff7300" />
            <Line type="monotone" dataKey="spo2" stroke="#d0d0d0" />
          </LineChart>
          <div style={{ marginTop: "20px" }}>
            <h4>Alte date vitale:</h4>
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Puls (bpm)</th>
                  <th>Tensiune arterială (Sys/Dia)</th>
                  <th>Oxigen (%)</th>
                </tr>
              </thead>
              <tbody>
                {data.map((record, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{record.heart_rate}</td>
                    <td>{record.bp_sys}/{record.bp_dia}</td>
                    <td>{record.spo2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
