import React from 'react';
import Layout from '@theme/Layout';
import '../css/about.css';

export default function About() {
  return (
    <Layout
      title="About Moonlander"
      description="Moonlander – A research-oriented spacecraft simulation platform for propulsion, guidance, and control">

      <main className="aboutContainer">

        <h1>About Moonlander</h1>

        {/* Intro */}
        <section>
          <p>
            <strong>Moonlander</strong> is a research-oriented C++ simulation platform for
            spacecraft dynamics, propulsion modeling, guidance and control.
            The project is evolving from a classical lunar landing simulation into
            a modular engineering environment for developing and testing spacecraft
            subsystems.
          </p>

          <p>
            Rather than focusing on visualization or gameplay, the platform is
            designed around clear system boundaries, explicit physical modeling,
            and extensible software architecture. The goal is to provide a
            technically sound environment for experimentation with propulsion,
            control systems, and flight dynamics.
          </p>
        </section>

        {/* Research Platform */}
        <section>
          <h2>Research Platform Overview</h2>

          <p>
            The simulation backend is implemented as a modular C++ core with
            clearly separated subsystems for dynamics, propulsion, control,
            configuration, and telemetry. Spacecraft configurations are defined
            externally via JSON, allowing new vehicle concepts to be introduced
            without modifying the simulation code.
          </p>

          <p>
            The current simulation supports three-dimensional translational
            spacecraft dynamics with vectorized force representation and is
            architecturally prepared for future extension toward full 6-DOF
            rigid-body dynamics.
          </p>
        </section>

        {/* Architecture */}
        <section>
          <h2>System Architecture</h2>

          <p>
            Moonlander follows a modular architecture where each subsystem can be
            developed and extended independently. The backend simulation core is
            decoupled from the frontend through a thread-safe interface using
            Qt signal-slot communication.
          </p>

          <ul>
            <li><strong>Dynamics:</strong> 3D translational spacecraft dynamics with vector-based force aggregation</li>
            <li><strong>Propulsion:</strong> Multi-engine architecture with centralized Thrust Orchestrator</li>
            <li><strong>Control:</strong> Manual and automated control via InputArbiter and controller modules</li>
            <li><strong>Configuration:</strong> JSON-based spacecraft and simulation setup via ConfigManager</li>
            <li><strong>Telemetry:</strong> Structured simulation output via SimData for UI and analysis</li>
            <li><strong>Frontend:</strong> Qt-based cockpit interface with real-time visualization</li>
          </ul>
        </section>

        {/* Propulsion */}
        <section>
          <h2>Propulsion System</h2>

          <p>
            The propulsion subsystem is built around a centralized
            <strong> Thrust Orchestrator</strong> that manages multiple engines
            and fuel tanks. Each engine is modeled independently and contributes
            to the overall thrust vector through a unified interface.
          </p>

          <p>
            A clear separation is made between command input, actuator state, and
            resulting physical thrust:
          </p>

          <ul>
            <li><strong>Main Engine:</strong> Scalar thrust model with dynamic response (ME_ThrustState)</li>
            <li><strong>RCS:</strong> Vector-based command structure for translational control (RCS_ThrustState)</li>
            <li><strong>Engine Selection:</strong> EngineType-based interface for querying individual or aggregated thrust</li>
            <li><strong>Fuel System:</strong> Multi-tank support with engine-specific fuel consumption</li>
          </ul>

          <p>
            This architecture allows realistic modeling of propulsion behavior
            while remaining extensible for future actuator and control models.
          </p>
        </section>

        {/* Control */}
        <section>
          <h2>Guidance and Control</h2>

          <p>
            Moonlander supports both manual and automated control paths.
            User input is processed through a dedicated <strong>InputMapper</strong> &nbsp;
            and combined with automated control commands via an
            <strong> InputArbiter</strong>.
          </p>

          <p>
            The current control stack includes:
          </p>

          <ul>
            <li><strong>Adaptive Descent Controller:</strong> Energy-based landing guidance with phase switching</li>
            <li><strong>PD Velocity Control:</strong> Gravity-compensated velocity tracking with thrust limits</li>
            <li><strong>Manual RCS Control:</strong> Discrete command mapping to 3D translational inputs</li>
          </ul>
        </section>

        {/* Config */}
        <section>
          <h2>Configuration and Data Flow</h2>

          <p>
            Spacecraft are defined using external JSON configuration files,
            including mass properties, inertia, engine layouts, and fuel systems.
            This enables rapid prototyping of new vehicle configurations.
          </p>

          <p>
            Simulation data is collected in structured output containers and
            transmitted to the frontend, enabling real-time visualization and
            future extensions toward data logging and analysis workflows.
          </p>
        </section>

        {/* Status */}
        <section>
          <h2>Current Development Status</h2>

          <ul>
            <li>3D translational spacecraft dynamics implemented</li>
            <li>Multi-engine propulsion architecture with thrust aggregation</li>
            <li>Separation of main engine and RCS control models</li>
            <li>JSON-based spacecraft configuration system</li>
            <li>Manual input mapping for RCS and main engine control</li>
            <li>Adaptive descent guidance for automated landing</li>
            <li>Preparation for RCS actuator modeling and future 6-DOF dynamics</li>
          </ul>
        </section>

        {/* Vision */}
        <section>
          <h2>Goals and Vision</h2>

          <p>
            The long-term objective of Moonlander is to evolve into a flexible
            research platform for spacecraft propulsion, guidance, and control.
          </p>

          <ul>
            <li>Extension toward full 6-DOF rigid-body dynamics</li>
            <li>Detailed RCS thruster modeling and actuator dynamics</li>
            <li>Advanced guidance and control strategies</li>
            <li>Support for multi-phase missions including orbital operations</li>
            <li>Improved telemetry, logging, and analysis capabilities</li>
          </ul>

          <p>
            The focus remains on building a technically robust simulation
            environment that enables structured experimentation with spacecraft
            systems rather than a fixed, scenario-specific application.
          </p>
        </section>

      </main>
    </Layout>
  );
}