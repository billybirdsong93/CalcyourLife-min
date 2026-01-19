"use client";

import { useState, useMemo } from "react";

export default function Calculator() {
  // Slider states
  const [financial, setFinancial] = useState(5);
  const [time, setTime] = useState(5);
  const [lifestyle, setLifestyle] = useState(5);

  // Only keep expected change in expenses
  const [expenseChange, setExpenseChange] = useState(0);

  // Overall decision score
  const score = Math.round((financial + time + lifestyle) / 3);

  // Savings calculation based only on expenseChange
  const { monthlySavings, yearlySavings } = useMemo(() => {
    const monthly = expenseChange;
    return { monthlySavings: monthly, yearlySavings: monthly * 12 };
  }, [expenseChange]);

  // Slider gradient from red → yellow → green
  const getGradient = (value) => {
    // value is 1-10
    let color;
    if (value <= 3) color = "#f87171"; // red
    else if (value <= 7) color = "#facc15"; // yellow
    else color = "#4ade80"; // green
    const percentage = ((value - 1) / 9) * 100;
    return {
      background: `linear-gradient(90deg, ${color} ${percentage}%, #374151 ${percentage}%)`,
    };
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#e5e7eb", padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", background: "#111827", padding: "30px", borderRadius: "16px", boxShadow: "0 20px 40px rgba(0,0,0,0.6)" }}>
        <h1 style={{ textAlign: "center", marginBottom: "10px" }}>Life Decision Calculator</h1>
        <p style={{ textAlign: "center", color: "#94a3b8", marginBottom: "30px" }}>Evaluate how a decision impacts your money, time and daily life.</p>

        {/* Financial Slider */}
        <label>Financial Stability — {financial}/10</label>
        <p style={{ color: "#94a3b8", marginBottom: "5px" }}>Consider income reliability, savings, debt and how well you could handle unexpected expenses without stress.</p>
        <input
          type="range"
          min="1"
          max="10"
          value={financial}
          onChange={(e) => setFinancial(Number(e.target.value))}
          style={{
            width: "100%",
            marginBottom: "20px",
            borderRadius: "8px",
            height: "8px",
            ...getGradient(financial),
            transition: "background 0.3s ease",
          }}
        />

        {/* Expected Change in Expenses */}
        <label>Expected Change in Expenses:</label>
        <input
          type="number"
          value={expenseChange}
          onChange={(e) => setExpenseChange(Number(e.target.value))}
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #374151",
            background: "#1f2937",
            color: "#e5e7eb",
            fontSize: "16px",
          }}
        />

        {/* Display Savings */}
        <div style={{ marginTop: "10px", padding: "15px", borderRadius: "12px", background: "#1f2937", border: "1px solid #374151", color: "#a5b4fc" }}>
          <p style={{ margin: "5px 0" }}>Estimated Monthly Savings: ${monthlySavings}</p>
          <p style={{ margin: "5px 0" }}>Estimated Yearly Savings: ${yearlySavings}</p>
        </div>

        {/* Time Slider */}
        <label style={{ marginTop: "20px" }}>Time Freedom — {time}/10</label>
        <p style={{ color: "#94a3b8", marginBottom: "5px" }}>Think about commute time, work hours, schedule flexibility and how much personal time you gain or lose with this decision.</p>
        <input
          type="range"
          min="1"
          max="10"
          value={time}
          onChange={(e) => setTime(Number(e.target.value))}
          style={{
            width: "100%",
            marginBottom: "20px",
            borderRadius: "8px",
            height: "8px",
            ...getGradient(time),
            transition: "background 0.3s ease",
          }}
        />

        {/* Lifestyle Slider */}
        <label>Lifestyle Satisfaction — {lifestyle}/10</label>
        <p style={{ color: "#94a3b8", marginBottom: "5px" }}>How this choice affects your daily stress, energy levels, family time, hobbies, health and overall enjoyment of life.</p>
        <input
          type="range"
          min="1"
          max="10"
          value={lifestyle}
          onChange={(e) => setLifestyle(Number(e.target.value))}
          style={{
            width: "100%",
            marginBottom: "20px",
            borderRadius: "8px",
            height: "8px",
            ...getGradient(lifestyle),
            transition: "background 0.3s ease",
          }}
        />

        {/* Overall Score */}
        <div style={{ marginTop: "20px", padding: "15px", borderRadius: "12px", background: "#0f172a", border: "1px solid #1e293b", textAlign: "center" }}>
          <h2 style={{ margin: "0 0 10px 0" }}>Overall Decision Score</h2>
          <p style={{ fontSize: "32px", fontWeight: "700", margin: 0 }}>{score} / 10</p>
        </div>
      </div>
    </div>
  );
}
