import React from 'react';
import Layout from '@theme/Layout';
import '../css/about.css'; // separater CSS für About-Page

export default function About() {
  return (
    <Layout
      title="About Moonlander"
      description="Detailed overview of the Moonlander lunar lander simulation project">

      <main className="aboutContainer">
        <h1>About Moonlander</h1>

        <section>
          <h2>Overview</h2>
          <p>
            Moonlander is an educational C++ project inspired by the "Lunar Landing" example 
            from "Coding for Fun". It simulates lunar landings in one or more dimensions, 
            providing a modular backend and a Qt-based frontend.
          </p>
        </section>

        <section>
          <h2>Frontend & Backend</h2>
          <p>
            The project separates backend (physics, simulation, state, logging, controller testing)
            and frontend (Qt UI, cockpit, landing view, telemetry, real-time user interaction).
          </p>
        </section>

        <section>
          <h2>Current Features</h2>
          <ul>
            <li>Full separation of backend and frontend</li>
            <li>Real-time telemetry in cockpitPage</li>
            <li>Thread-safe simulation loop with Qt signal/slot integration</li>
            <li>Logger captures backend debug output without Qt</li>
            <li>Initial support for resource-based JSON configuration</li>
          </ul>
        </section>

        <section>
          <h2>Goals & Future Vision</h2>
          <p>
            Build a robust simulation environment for physics and control experiments, 
            enable modular UI development, and extend to 3D dynamics, orbital maneuvers, 
            and multi-spacecraft scenarios.
          </p>
        </section>

      </main>
    </Layout>
  );
}
