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
            The Moonlander simulation began as a vertical landing model and is now evolving
            into a modular spacecraft simulation with multi-engine propulsion, vectorized
            thrust, and a 3D-ready backend architecture. The current implementation
            provides a stable point-mass flight model combined with a real-time Qt-based
            cockpit visualization frontend.
          </p>
        </section>

        <section className="simSection">
          <h2>Demonstration</h2>
          <p>
            The following excerpt illustrates a representative simulation run,
            including spacecraft motion, cockpit telemetry, and propulsion system
            response over time.
          </p>
            <div className="simCard">
              <img
                src={useBaseUrl('/img/simulation/Simulation_Startseite_small.png')}
                alt="Moonlander simulation start page"
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
            The simulation core is implemented in C++ and separated from the
            visualization layer through a well-defined interface.
          </p>
          <ul>
            <li>C++ simulation core for spacecraft dynamics and control</li>
            <li>Modular propulsion system with multi-engine thrust orchestration</li>
            <li>Telemetry interface between backend worker thread and Qt frontend</li>
            <li>Qt cockpit for real-time visualization and operator interaction</li>
          </ul>
          <a className="simButton secondary" href="/simulation/architecture">
            Explore Architecture
          </a>
        </section>

        <section className="simSection">
          <h2>Model Scope & Assumptions</h2>
          <ul>
            <li>Point-mass spacecraft model</li>
            <li>Central lunar gravity model</li>
            <li>Discrete-time numerical integration</li>
            <li>Vectorized thrust and multi-engine propulsion</li>
            <li>No rotational dynamics yet</li>
            <li>No full 6DOF rigid-body simulation yet</li>
          </ul>
          <p>
            A detailed mathematical formulation is provided in the Mathematics section.
          </p>
        </section>

        <section className="simSection">
          <h2>Stability & Validation</h2>
          <p>
            The simulation exhibits stable numerical behavior across multiple runs
            and serves as a foundation for future extensions toward multi-dimensional
            dynamics and closed-loop control.
          </p>
        </section>

      </main>
    </Layout>
  );
}
