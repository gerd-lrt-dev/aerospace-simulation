import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import '../../css/architecture.css'; // CSS Pfad anpassen

export default function Architecture() {
  return (
    <Layout
      title="Moonlander Architecture"
      description="Overview of the Moonlander Simulation architecture and data flow">

      <main className="architectureContainer">
        <h1>Moonlander Architecture</h1>

        <section>
          <h2>System Overview</h2>
          <p>
            The diagram below illustrates the main components of the Moonlander Simulation,
            including the frontend, backend, logger, and configuration flow.
          </p>
        </section>

        <section className="diagramSection">
          <img
            src={useBaseUrl('/img/architecture/architecture.drawio.svg')}
            alt="Moonlander Architecture Diagram"
            className="archDiagram"
          />
        </section>

        <section>
          <h2>Component Descriptions</h2>
        <ul>
          <li><strong>Frontend (UI / Cockpit):</strong> User interface for telemetry display, cockpit visualization, and interactive control</li>
          <li><strong>Backend (Simulation Engine):</strong> Computes physics, state updates, thrust, g-load, and runs optimization routines</li>
          <li><strong>CockpitPage:</strong> Qt widget running in the main thread handling UI logic and telemetry display</li>
          <li><strong>SimulationWorker:</strong> Dedicated worker thread interfacing between frontend and backend, executing simulation steps safely</li>
          <li><strong>SimControl:</strong> Orchestrates simulation steps, validates parameters, and forwards commands between frontend and spacecraft</li>
          <li><strong>Spacecraft:</strong> Sole owner of physical state (position, velocity, mass, orientation, thrust). Computes dynamics based on applied forces</li>
          <li><strong>Physics & Integrators:</strong> IPhysicsModel, BasicMoonGravity, Physics (orchestrator), IIntegrator, EulerIntegrator – modular propagation of dynamics</li>
          <li><strong>Sensors & Perception:</strong> ISensor, SensorModel – compute proper g-load, telemetry, and optional sensor noise</li>
          <li><strong>Thrust & Optimization:</strong> Thrust, OptimizationModelParams, ThrustOptimizationProblem, ThrustOptimizer – handles fuel-efficient landing sequences</li>
          <li><strong>Config / JSON:</strong> Simulation and UI parameters loaded via JSON in the frontend homepage, passed to the worker and finally to the backend</li>
          <li><strong>Backend structs:</strong> Uniform data structures for spacecraft state, integrator state, simulation data, and environment configuration</li>
          <li><strong>Logger:</strong> Captures debug output from backend without UI dependency</li>
        </ul>
        </section>
      </main>
    </Layout>
  );
}
