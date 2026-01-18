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
            The Moonlander simulation models the vertical descent of a lunar lander using
            a modular C++ backend and a real-time Qt-based visualization frontend.
            The current implementation demonstrates stable and reproducible
            one-dimensional landing dynamics.
          </p>
        </section>

        <section className="simSection">
          <h2>Demonstration</h2>
          <p>
            The following excerpt illustrates a representative simulation run,
            including altitude, velocity and thrust response over time.
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
            <li>C++ physics core (state propagation and control)</li>
            <li>Interface layer for telemetry exchange</li>
            <li>Qt frontend for real-time visualization</li>
          </ul>
          <a className="simButton secondary" href="/simulation/architecture">
            Explore Architecture
          </a>
        </section>

        <section className="simSection">
          <h2>Model Scope & Assumptions</h2>
          <ul>
            <li>One-dimensional vertical motion</li>
            <li>Constant lunar gravity</li>
            <li>Discrete-time integration</li>
            <li>Deterministic control input</li>
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
