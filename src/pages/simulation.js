import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import '../css/simulation.css';

export default function Simulation() {
  return (
    <Layout
      title="Simulation"
      description="Moonlander simulation architecture, model scope, and current spacecraft dynamics behavior">

      <main className="simulationPage">

        <section className="simIntro">
          <h1>Simulation</h1>

          <p>
            The Moonlander simulation is a modular spacecraft dynamics environment
            implemented in C++. It is designed for propulsion modeling, guidance,
            control, telemetry generation, and reproducible simulation-based
            experimentation.
          </p>

          <p>
            The current system supports three-dimensional translational dynamics
            with vectorized force representation, a multi-engine propulsion
            architecture, individual RCS thruster models, and real-time cockpit
            telemetry.
          </p>

          <p>
            The architecture is intentionally structured to evolve toward full
            6-DOF spacecraft dynamics while maintaining clear subsystem boundaries
            between frontend, backend, command flow, physics, propulsion, and
            telemetry.
          </p>
        </section>

        <section className="simSection">
          <h2>Simulation Demonstration</h2>

          <p>
            The following example shows a representative simulation run including
            spacecraft motion, propulsion response, RCS activity, fuel state, and
            real-time telemetry visualization in the cockpit interface.
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
            separation between physics, propulsion, control, configuration,
            telemetry, and visualization.
          </p>

          <ul>
            <li><strong>Simulation Core:</strong> C++ backend for dynamics, propulsion, control, sensors, optimization, and telemetry</li>
            <li><strong>Command Flow:</strong> Separation of operator input, structured flight commands, actuator commands, and physical force output</li>
            <li><strong>Propulsion System:</strong> Central Thrust Orchestrator managing main engine, RCS thrusters, thrust allocation, and fuel tanks</li>
            <li><strong>Telemetry Interface:</strong> Current Qt signal-slot communication between backend worker thread and frontend</li>
            <li><strong>Future Interface:</strong> DTO wrapper and ROS-based communication layer for frontend/backend decoupling</li>
            <li><strong>Frontend:</strong> Qt-based cockpit for real-time visualization, operator input, and presentation-oriented feedback</li>
          </ul>

          <a className="simButton secondary" href="/simulation/architecture">
            Explore Architecture
          </a>
        </section>

        <section className="simSection">
          <h2>Propulsion Modeling</h2>

          <p>
            The propulsion subsystem is based on a multi-engine architecture with
            a centralized Thrust Orchestrator. Each engine model owns its own
            actuator state and contributes to the resulting spacecraft thrust
            vector through its configured direction.
          </p>

          <ul>
            <li><strong>Main Engine:</strong> Scalar thrust force model with dynamic response, target tracking, direction handling, and fuel consumption</li>
            <li><strong>RCS Thrusters:</strong> Individual binary thruster models with command delay, first-order actuator dynamics, scalar thrust output, and propellant consumption</li>
            <li><strong>RCSControlAllocator:</strong> Maps translational axis commands to the corresponding individual RCS thrusters</li>
            <li><strong>Engine Selection:</strong> EngineType-based interface for querying total propulsion output, main engine output, or RCS output</li>
            <li><strong>Fuel System:</strong> Multi-tank support with engine-to-tank assignment and engine-specific mass flow</li>
          </ul>

          <p>
            This separation keeps actuator dynamics, command allocation, fuel
            consumption, and force aggregation modular and testable.
          </p>
        </section>

        <section className="simSection">
          <h2>Telemetry and Research Data</h2>

          <p>
            Runtime data is collected for cockpit visualization and future
            analysis workflows. The cockpit presents selected operational data,
            while the underlying telemetry path is being prepared for full export
            and post-processing.
          </p>

          <ul>
            <li><strong>Cockpit Telemetry:</strong> Position, velocity, thrust, target thrust, fuel state, g-load, hull state, and active RCS thrusters</li>
            <li><strong>Engine-Level RCS Data:</strong> Individual RCS engine identification, axis assignment, current thrust, target thrust, and actuator state</li>
            <li><strong>Frontend DTOs:</strong> Frontend-specific telemetry structures such as RCSCockpitTelemetry reduce dependency on backend domain structs</li>
            <li><strong>Future Export:</strong> XML/CSV-style telemetry output for reproducible research runs, plotting, and validation</li>
            <li><strong>Future Transport:</strong> ROS-based interface for replacing the frontend without changing backend simulation logic</li>
          </ul>
        </section>

        <section className="simSection">
          <h2>Model Scope & Assumptions</h2>

          <ul>
            <li>Three-dimensional translational spacecraft dynamics</li>
            <li>Central-body lunar gravity model</li>
            <li>Discrete-time numerical integration</li>
            <li>Vectorized force and thrust representation</li>
            <li>Multi-engine propulsion with main engine and RCS thrusters</li>
            <li>Individual RCS actuator dynamics for translational control</li>
          </ul>

          <p>
            The current model intentionally excludes full rotational dynamics and
            complete rigid-body 6-DOF propagation. However, engine positions,
            thrust directions, RCS states, and torque-relevant architecture are
            already being prepared for these future extensions.
          </p>

          <p>
            A detailed mathematical formulation is provided in the Mathematics
            section.
          </p>
        </section>

      </main>
    </Layout>
  );
}