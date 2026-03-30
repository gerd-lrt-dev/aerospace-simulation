import React from 'react';
import Layout from '@theme/Layout';
import Topbar from '../components/Topbar'; // Pfad ggf. anpassen
import '../css/hero.css';

export default function Home() {
  return (
    <Layout
      title="Moonlander – Lunar Research Simulation Platform"
      description="Modular C++ research platform for lunar spacecraft simulation, propulsion, guidance, and future 3D flight dynamics">
        
      <main className="hero">
        <div className="heroOverlay">
          <h1>Moonlander</h1>
          <p>
            <p>
            Modular C++ simulation platform evolving toward a research-oriented
            environment for lunar spacecraft dynamics, propulsion, guidance, and
            real-time telemetry with a Qt-based cockpit frontend.
          </p>
          </p>
          <span>Simulation · Physics · Control</span>

          {/* Explore / About Button */}
          <div className="exploreButtonContainer">
            <a className="aboutButton" href="/about">Explore Project Details</a>
          </div>
        </div>

        {/* AI-Hinweis direkt im Hero-Container */}
        <span className="heroAiCredit">AI-generated image</span>
      </main>

    </Layout>
  );
}


