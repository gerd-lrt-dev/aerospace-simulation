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
            <li><strong>Frontend (UI / Cockpit):</strong> User interface for telemetry display and control</li>
            <li><strong>Backend (Simulation Engine):</strong> Computes physics, state updates, thrust, and g-load</li>
            <li><strong>CockpitPage:</strong> Main thread with UI logic</li>
            <li><strong>SimulationWorker:</strong> Worker thread and interface to the backend</li>
            <li><strong>SimControl:</strong> Simulation orchestrator and interface to the frontend</li>
            <li><strong>Spacecraft:</strong> Sole owner of all physical parameters. This is where the physical forces come together</li>
            <li><strong>Config / JSON:</strong> Contains simulation parameters and UI settings. Is transferred in the frontend via the homepage to the worker thread and finally to the backend via SimControl in the spacecraft class</li>
            <li><strong>Backend structs:</strong> Define a uniform data format for all states</li>
          </ul>
        </section>
      </main>
    </Layout>
  );
}
