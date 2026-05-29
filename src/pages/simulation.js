import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import '../css/simulation.css';

export default function Simulation() {
  return (
    <Layout
      title="Simulation | Spaceflight Dynamics Framework"
      description="Simulation architecture, propulsion modeling, telemetry flow, and spacecraft dynamics research within the Spaceflight Dynamics Framework">

      <main className="simulationPage">

        <section className="simIntro">
          <h1>Simulation</h1>

          <p>
            The simulation environment of the
            <strong> Spaceflight Dynamics Framework (SDF)</strong> is designed
            as a modular spacecraft dynamics and research platform implemented
            in modern C++.
          </p>

          <p>
            SDF combines propulsion modeling, guidance and control logic,
            telemetry generation, subsystem-oriented architecture design,
            and real-time visualization within a reproducible simulation workflow.
          </p>

          <p>
            The current development milestone focuses on establishing a complete
            full-state 6DOF-capable simulation architecture while maintaining
            clean separation between frontend, backend, command flow, physics
            propagation, propulsion systems, and telemetry transport layers.
          </p>

          <p>
            Rather than targeting a single fixed scenario, the framework is
            intended to evolve toward a reusable research environment for future
            spacecraft dynamics experimentation and autonomous flight studies.
          </p>
        </section>

        <section className="simSection">
          <h2>Simulation Demonstration</h2>

          <p>
            The following example shows a representative research-oriented
            simulation scenario including spacecraft motion, propulsion response,
            RCS activity, fuel state, and real-time telemetry visualization in
            the cockpit interface.
          </p>

          <div className="simCard">
            <img
              src={useBaseUrl('/img/simulation/Simulation_Startseite_SDF.png')}
              alt="Spaceflight Dynamics Framework simulation cockpit"
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
            telemetry, visualization, and frontend/backend interface boundaries.
          </p>

          <ul>
            <li><strong>Simulation Core:</strong> C++ backend for dynamics, propulsion, control, sensors, optimization, and telemetry</li>
            <li><strong>Command Flow:</strong> Separation of operator input, structured flight commands, actuator commands, and physical force output</li>
            <li><strong>Propulsion System:</strong> Central Thrust Orchestrator managing main engine, RCS thrusters, thrust allocation, and fuel tanks</li>
            <li><strong>Telemetry Interface:</strong> Current Qt signal-slot communication between backend worker thread and frontend</li>
            <li><strong>Frontend Architecture:</strong> Refactored Qt-based application shell with centralized page routing, telemetry visualization, and modular cockpit pages</li>
            <li><strong>Future Interface:</strong> DTO mapping and ROS-based communication layer for frontend/backend decoupling</li>
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
            consumption, and force aggregation modular, traceable, and testable.
          </p>
        </section>

        <section className="simSection">
          <h2>Telemetry and Research Data</h2>

          <p>
            Runtime data is collected for cockpit visualization and future
            analysis workflows. The cockpit presents selected operational data,
            while the underlying telemetry path is being prepared for full export,
            post-processing, and frontend-independent transport.
          </p>

          <ul>
            <li><strong>Cockpit Telemetry:</strong> Position, velocity, thrust, target thrust, fuel state, g-load, hull state, and active RCS thrusters</li>
            <li><strong>Engine-Level RCS Data:</strong> Individual RCS engine identification, axis assignment, current thrust, target thrust, and actuator state</li>
            <li><strong>Frontend DTOs:</strong> Frontend-specific telemetry structures such as RCSCockpitTelemetry reduce dependency on backend domain structs</li>
            <li><strong>Telemetry Mapping Layer:</strong> Dedicated frontend telemetry DTO mapping prepared for future backend/frontend decoupling</li>
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
            The current simulation milestone intentionally focuses on translational
            spacecraft dynamics while the surrounding software architecture is
            already prepared for future rigid-body 6DOF extension.
          </p>

          <p>
            Engine positions, thrust directions, RCS states, and torque-relevant
            architecture are already being prepared for future rotational dynamics,
            attitude stabilization, and full spacecraft state propagation.
          </p>

          <p>
            A detailed mathematical formulation is provided in the Mathematics
            section.
          </p>
        </section>

        <section className="simSection">
          <h2>Research Direction</h2>

          <p>
            SDF is currently transitioning from a dedicated lunar landing
            simulation toward a broader spaceflight dynamics research framework.
          </p>

          <p>
            The architectural focus is shifting toward modularity, subsystem
            separation, telemetry abstraction, frontend/backend decoupling, and
            extensibility for future simulation workflows.
          </p>

          <ul>
            <li><strong>Current milestone:</strong> M1 - Full 6DOF Simulation</li>
            <li><strong>Current state:</strong> Pre-release development build</li>
            <li><strong>Planned release line:</strong> v0.2 - SDF Research Release</li>
            <li><strong>Future direction:</strong> Extensible spacecraft dynamics and control research environment</li>
          </ul>
        </section>

      </main>
    </Layout>
  );
}