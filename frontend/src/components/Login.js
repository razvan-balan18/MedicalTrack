// src/pages/Login.js
import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1A237E 0%, #0D47A1 100%)',
        position: 'relative',
        overflow: 'hidden',
        width: '100vw',
        margin: 0,
        padding: 0
      }}>
        {/* Animated background elements */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          animation: 'pulse 4s ease-in-out infinite'
        }} />
        
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          padding: '2.5rem',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          width: '100%',
          maxWidth: '400px',
          backdropFilter: 'blur(10px)',
          transform: 'translateY(0)',
          transition: 'transform 0.3s ease',
          margin: '1rem',
          boxSizing: 'border-box'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <h2 style={{
              color: '#1A237E',
              fontSize: '2.2rem',
              fontWeight: '700',
              marginBottom: '0.5rem'
            }}>Welcome Back</h2>
            <p style={{
              color: '#0D47A1',
              fontSize: '1rem'
            }}>Please sign in to continue</p>
          </div>

          <form onSubmit={handleLogin} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem',
            width: '100%'
          }}>
            <div style={{
              position: 'relative',
              width: '100%'
            }}>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                style={{
                  width: '100%',
                  padding: '1rem 1rem 1rem 3rem',
                  borderRadius: '10px',
                  border: '2px solid #E3F2FD',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  backgroundColor: 'white',
                  boxSizing: 'border-box',
                  color: '#1A237E',
                  ':focus': {
                    borderColor: '#1A237E',
                    boxShadow: '0 0 0 3px rgba(26, 35, 126, 0.1)'
                  }
                }}
              />
              <span style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#1A237E',
                pointerEvents: 'none'
              }}>📧</span>
            </div>

            <div style={{
              position: 'relative',
              width: '100%'
            }}>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                style={{
                  width: '100%',
                  padding: '1rem 1rem 1rem 3rem',
                  borderRadius: '10px',
                  border: '2px solid #E3F2FD',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  backgroundColor: 'white',
                  boxSizing: 'border-box',
                  color: '#1A237E',
                  ':focus': {
                    borderColor: '#1A237E',
                    boxShadow: '0 0 0 3px rgba(26, 35, 126, 0.1)'
                  }
                }}
              />
              <span style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#1A237E',
                pointerEvents: 'none'
              }}>🔒</span>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '1rem',
                background: 'linear-gradient(45deg, #1A237E, #0D47A1)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px rgba(26, 35, 126, 0.2)',
                ':hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 8px rgba(26, 35, 126, 0.3)'
                },
                ':active': {
                  transform: 'translateY(0)'
                }
              }}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
