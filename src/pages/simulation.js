import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import '../css/simulation.css';

export default function Simulation() {
  return (
    <Layout title="Simulation" description="Lunar landing simulation architecture and behavior">
      <main className="simulationPage">

      <section className="simIntro">
        <h1>Simulation</h1>
        <p>
          The Moonlander simulation is a modular spacecraft dynamics environment
          implemented in C++, designed for propulsion, guidance, and control
          experimentation.
        </p>

        <p>
          The current system supports three-dimensional translational dynamics
          with vectorized thrust representation and a multi-engine propulsion
          architecture. The simulation is structured to evolve toward full
          6-DOF spacecraft dynamics while maintaining clear subsystem boundaries.
        </p>
      </section>

    <section className="simSection">
      <h2>Simulation Demonstration</h2>
      <p>
        The following example shows a representative simulation run including
        spacecraft motion, propulsion response, and real-time telemetry
        visualization in the cockpit interface.
      </p>

      <div className="simCard">
        <img
          src={useBaseUrl('/img/simulation/Simulation_Startseite_small.png')}
          alt="Moonlander simulation cockpit"
          className="simImage"
        />
        <a className="simButton" href="/simulation/demo">
          View Simulation Demo
        </a>
      </div>
    </section>

    <section className="simSection">
      <h2>Architecture & Data Flow</h2>

      <p>
        The simulation is built around a modular C++ backend with a clear
        separation between physics, propulsion, control, and visualization.
      </p>

      <ul>
        <li><strong>Simulation Core:</strong> C++ backend for dynamics, propulsion, and control</li>
        <li><strong>Propulsion System:</strong> Central Thrust Orchestrator managing multiple engines and fuel tanks</li>
        <li><strong>Command Flow:</strong> Separation of commanded input, actuator state, and physical thrust output</li>
        <li><strong>Telemetry Interface:</strong> Thread-safe communication between backend and Qt frontend</li>
        <li><strong>Frontend:</strong> Qt-based cockpit for real-time visualization and operator interaction</li>
      </ul>

      <a className="simButton secondary" href="/simulation/architecture">
        Explore Architecture
      </a>
    </section>

    <section className="simSection">
      <h2>Propulsion Modeling</h2>

      <p>
        The propulsion subsystem is based on a multi-engine architecture with
        a centralized Thrust Orchestrator. Each engine is modeled independently
        and contributes to the overall thrust vector.
      </p>

      <ul>
        <li><strong>Main Engine:</strong> Scalar thrust model with dynamic response (ME_ThrustState)</li>
        <li><strong>RCS:</strong> Vector-based thrust commands for translational control (RCS_ThrustState)</li>
        <li><strong>Engine Selection:</strong> EngineType interface for querying subsystem or total thrust</li>
        <li><strong>Fuel System:</strong> Multi-tank support with engine-specific consumption</li>
      </ul>

      <p>
        This separation allows physically consistent modeling while supporting
        flexible control strategies and future actuator extensions.
      </p>
    </section>

    <section className="simSection">
      <h2>Model Scope & Assumptions</h2>

      <ul>
        <li>Three-dimensional translational spacecraft dynamics</li>
        <li>Central lunar gravity model</li>
        <li>Discrete-time numerical integration</li>
        <li>Vectorized thrust representation</li>
        <li>Multi-engine propulsion architecture</li>
      </ul>

      <p>
        The current model intentionally excludes rotational dynamics and full
        6-DOF rigid-body simulation. The architecture is designed to support
        these extensions in future development stages.
      </p>

      <p>
        A detailed mathematical formulation is provided in the Mathematics section.
      </p>
    </section>

      </main>
    </Layout>
  );
}
