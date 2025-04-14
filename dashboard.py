import streamlit as st
import pandas as pd
import requests

st.title("📊 Monitorizare Pacienți")

data = requests.get("http://localhost:8000/vitals").json()
df = pd.DataFrame(data)

if not df.empty:
    st.write("Ultimele valori:")
    st.dataframe(df.tail(5))

    st.line_chart(df["heart_rate"])
