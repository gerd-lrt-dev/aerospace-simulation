import React from 'react';
import Layout from '@theme/Layout';
import '../css/hero.css';

export default function Home() {
  return (
    <Layout
      title="Moonlander – Lunar Lander Simulation"
      description="Educational C++ lunar landing simulation with modular backend and Qt frontend">

      <main className="hero">
        <div className="heroOverlay">
          <h1>Moonlander</h1>
          <p>
            Educational C++ project simulating lunar landings with modular backend physics
            and a Qt-based frontend for real-time telemetry and visualization.
          </p>
          <span>Simulation · Physics · Control</span>

          {/* Navigation Buttons */}
          <div className="heroButtons">
            <a className="navButton" href="/team">Team</a>
            <a className="navButton" href="/docs">Mathematics</a>
            <a className="navButton" href="/simulation">Simulation</a>
          </div>

          {/* Explore / About Button */}
          <div className="exploreButtonContainer">
            <a className="aboutButton" href="/about">Explore Project Details</a>
          </div>
        </div>
      </main>

    </Layout>
  );
}
