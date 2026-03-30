import React from 'react';
import Layout from '@theme/Layout';
import '../css/about.css'; // separater CSS für About-Page

export default function About() {
  return (
    <Layout
      title="About Moonlander"
      description="Overview of the Moonlander simulation platform and its evolving architecture">

      <main className="aboutContainer">
        <h1>About Moonlander</h1>

        {/* Recent Updates */}
        <section>
          <h2>Recent Updates</h2>
          <ul>
            <li>Implemented an <strong>Adaptive Descent Controller</strong> for automated landing</li>
            <li>Introduced an <strong>energy-based guidance law</strong> for safe descent trajectory generation</li>
            <li>Added <strong>brake-ratio-based descent mode switching</strong> for adaptive control behavior</li>
            <li>Implemented <strong>PD velocity control with gravity compensation and thrust saturation handling</strong></li>
            <li>Added <strong>phase-based descent logic</strong> for stable control across multiple landing regimes</li>
            <li>Introduced a <strong>Spacecraft Selection interface</strong> for choosing spacecraft configurations before simulation start</li>
            <li>Added a <strong>JSON-based spacecraft configuration system</strong> for external vehicle definitions</li>
            <li>Implemented a centralized <strong>ConfigManager</strong> for configuration loading and distribution</li>
            <li>Refactored the propulsion subsystem into a <strong>Thrust orchestrator</strong> with support for <strong>multiple engines</strong>, <strong>multiple tanks</strong>, and <strong>vectorized thrust</strong></li>
            <li>Prepared the backend architecture for the ongoing transition toward a more complete <strong>3D spacecraft simulation</strong></li>
          </ul>
        </section>

        {/* Overview Section */}
        <section>
          <h2>Project Overview</h2>
          <p>
            Moonlander is a modular C++ simulation platform for lunar spacecraft dynamics,
            currently evolving toward a research-oriented environment for propulsion,
            guidance, control, and future 3D flight dynamics.
          </p>
          <p>
            The project started from a classical lunar landing scenario and is gradually
            being transformed into a broader simulation framework. The current baseline
            combines a point-mass flight model, modular backend systems, real-time telemetry,
            and an interactive Qt-based cockpit frontend.
          </p>
          <p>
            A strong emphasis is placed on modularity and extensibility: physics, propulsion,
            control, telemetry, and visualization are organized as separate subsystems so
            that they can evolve independently as the project matures.
          </p>
          <p>
            Spacecraft definitions are loaded externally from JSON files, allowing new
            vehicle configurations, engine layouts, and future propulsion concepts to be
            introduced without recompiling the simulation code.
          </p>
        </section>

        {/* Frontend & Backend Section */}
        <section>
          <h2>Frontend & Backend Architecture</h2>
          <p>
            The backend implements spacecraft dynamics, numerical integration, propulsion,
            sensors, optimization, and control logic in a modular C++ simulation core.
            It is separated from the UI through a dedicated worker-thread-based interface,
            providing a solid basis for future experimentation, telemetry export, and
            architectural evolution.
          </p>

          <p>Key backend components include:</p>

          <ul>
            <li><strong>Automation:</strong> IAutopilot, AdaptiveDescentController (energy-based landing with brake ratio guidance)</li>
            <li><strong>Control:</strong> InputArbiter (manual vs. automated control arbitration)</li>
            <li><strong>Controller:</strong> IController, PD_Controller</li>
            <li><strong>Integrators:</strong> IIntegrator, EulerIntegrator, Dynamics</li>
            <li><strong>Physics Models:</strong> IPhysicsModel, BasicMoonGravity, Physics (orchestrator)</li>
            <li><strong>Sensors & Perception:</strong> ISensor, SensorModel</li>
            <li><strong>Optimization:</strong> OptimizationModelParams, OptimizationStruct, ThrustOptimizationProblem, ThrustOptimizer</li>
            <li><strong>Propulsion:</strong> Thrust orchestrator, IThrustModel, BasicMainEngineModel, EngineConfig, FuelState, FuelTank</li>
            <li><strong>Spacecraft Core:</strong> CustomSpacecraftStruct, Spacecraft, SpacecraftStateStruct, StateVectorStruct, Quaternion, Vector3</li>
            <li><strong>Configuration:</strong> ConfigManager and JsonConfigReader for spacecraft and simulation configuration</li>
            <li><strong>Simulation Control:</strong> SimControl coordinating simulation flow and backend/frontend interaction</li>
            <li><strong>Utilities:</strong> EnvironmentConfig, SimDataStruct, Logger</li>
          </ul>

          <p>
            The frontend, built with Qt, visualizes the current spacecraft state in real
            time, including telemetry, propulsion behavior, fuel status, and control output.
            It also provides user interaction through the cockpit UI and spacecraft selection.
          </p>

          <p>
            The <strong>SpacecraftSelectionPage</strong> allows users to choose between different
            spacecraft profiles defined in JSON. The selected spacecraft is then forwarded
            to the simulation backend and used to initialize the full simulation environment.
          </p>
        </section>

        {/* Features Section */}
        <section>
          <h2>Current Features</h2>
          <ul>
            <li>Separation of backend simulation systems and frontend UI for modular development</li>
            <li>Real-time telemetry and cockpit visualization using a Qt-based frontend</li>
            <li>Thread-safe simulation loop with Qt signal-slot integration</li>
            <li>Integrated logging of backend debug output independent of the UI</li>
            <li>JSON-based spacecraft configuration and selection workflow</li>
            <li>Adaptive Descent Controller for automated, phase-based landing guidance</li>
            <li>PD-based velocity control with gravity compensation</li>
            <li>Vectorized thrust representation in the backend</li>
            <li>Multi-engine propulsion architecture with a dedicated Thrust orchestrator</li>
            <li>Initial support for multiple fuel tanks and engine-specific propulsion modeling</li>
            <li>Experimental 1D thrust optimization using NLopt</li>
            <li>Ongoing transition toward broader 3D spacecraft simulation capabilities</li>
          </ul>
        </section>

        {/* Adaptive Descent Controller Section */}
        <section>
          <h2>Adaptive Descent Controller</h2>
          <p>
            The Adaptive Descent Controller is a modular landing guidance system for the
            final descent phase. It evaluates the current spacecraft state and adjusts
            thrust commands in order to maintain a safe and stable landing trajectory.
          </p>

          <h3>Core Concepts</h3>
          <ul>
            <li><strong>Brake Ratio:</strong> Compares remaining altitude with the distance required to decelerate safely.</li>
            <li><strong>Descent Phases:</strong> The controller switches between multiple operating modes depending on the current brake ratio and flight condition.</li>
            <li><strong>Guidance and Control:</strong> Combines predictive guidance with feedback control to track safe velocity targets.</li>
            <li><strong>Characteristics:</strong> Adaptive gain scheduling, gravity compensation, thrust limit handling, and robust landing behavior.</li>
          </ul>
        </section>

        {/* Optimizer Section */}
        <section>
          <h2>Thrust Optimization (Experimental)</h2>
          <p>
            Moonlander includes an experimental backend module for thrust optimization.
            The current implementation focuses on simplified 1D descent scenarios and is
            primarily used to explore architecture, numerical behavior, and cost function design.
          </p>
          <ul>
            <li>Goal: Minimize fuel consumption while achieving target altitude and safe landing velocity</li>
            <li>Forward simulation currently uses Euler-based propagation for candidate thrust profiles</li>
            <li>Cost function accounts for terminal state, fuel usage, thrust smoothness, and descent encouragement</li>
            <li>Current status: still under tuning and not yet a finalized research-grade optimization workflow</li>
            <li>Future direction: extend optimization toward richer propulsion models and more realistic spacecraft dynamics</li>
          </ul>
        </section>

        {/* Goals & Vision Section */}
        <section>
          <h2>Goals & Vision</h2>
          <p>
            Moonlander is being developed toward a research-oriented simulation platform
            for lunar spacecraft dynamics, propulsion, guidance, and control.
          </p>

          <ul>
            <li>Expand from the current point-mass baseline toward richer 3D spacecraft dynamics</li>
            <li>Develop a robust propulsion architecture with multiple engines, tanks, and configurable thrust models</li>
            <li>Enable advanced control experiments, including automated landing and closed-loop guidance strategies</li>
            <li>Support future work on orbital scenarios, deorbit maneuvers, and multi-phase missions</li>
            <li>Improve visualization with richer cockpit instrumentation and future 3D views</li>
            <li>Establish a telemetry and data flow architecture suitable for analysis, replay, and later research workflows</li>
          </ul>

          <p>
            The long-term objective is not just to demonstrate a landing scenario, but to
            build a modular simulation environment that can support systematic development
            and experimentation with spacecraft subsystems and flight dynamics concepts.
          </p>
        </section>

      </main>
    </Layout>
  );
}