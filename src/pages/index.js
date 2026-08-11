import React from 'react';
import Layout from '@theme/Layout';
import '../css/hero.css';

export default function Home() {
  return (
    <Layout
      title="Spaceflight Dynamics Framework – Spacecraft Simulation Platform"
      description="Modular open-source C++ framework for 6DoF spacecraft dynamics, propulsion, guidance, control, and real-time telemetry visualization">

      <main className="hero">
        <div className="heroOverlay">

          <h1>Spaceflight Dynamics Framework</h1>

          <p>
            Modular open-source C++ framework for 6DoF spacecraft dynamics,
            propulsion modeling, guidance and control development, numerical
            simulation, and real-time telemetry visualization with a Qt-based
            cockpit frontend.
          </p>

          <span>
            Pre-release Development · Milestone 1: 6DoF Core Simulation
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