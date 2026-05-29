import React from 'react';
import Layout from '@theme/Layout';
import Topbar from '../components/Topbar'; // Pfad ggf. anpassen
import '../css/hero.css';

export default function Home() {
  return (
    <Layout
      title="Spaceflight Dynamics Framework – Research Simulation Platform"
      description="Modular C++ research framework for spacecraft dynamics, propulsion modeling, guidance, control, and real-time telemetry visualization">

      <main className="hero">
        <div className="heroOverlay">
          <h1>Spaceflight Dynamics Framework</h1>

          <p>
            Modular C++ simulation framework for spacecraft dynamics,
            propulsion modeling, guidance, control development, and
            real-time telemetry visualization with a Qt-based cockpit frontend.
          </p>

          <span>
            Pre-release Development · Milestone 1: Full 6DOF Simulation
          </span>

          <div className="exploreButtonContainer">
            <a className="aboutButton" href="/about">
              Explore Project Details
            </a>
          </div>
        </div>

        <span className="heroAiCredit">AI-generated image</span>
      </main>

    </Layout>
  );
}