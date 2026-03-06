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

        {/* Recent Updates */}
        <section>
          <h2>Recent Updates</h2>
          <ul>
            <li>Implemented an <strong>Adaptive Descent Controller</strong> for automated landing</li>
            <li>Controller uses an <strong>energy-based guidance law</strong> to compute safe descent trajectories</li>
            <li>Introduced <strong>brake ratio based descent mode switching</strong> for adaptive control behavior</li>
            <li>Added <strong>PD velocity control with gravity compensation and thrust saturation handling</strong></li>
            <li>Implemented <strong>phase-based descent logic</strong> enabling stable landing across multiple descent regimes</li>
          </ul>
        </section>

        {/* Overview Section */}
        <section>
          <h2>Project Overview</h2>
          <p>
            Moonlander is an educational and research-oriented C++ project simulating lunar
            landings. Inspired by classical "Lunar Landing" examples, it combines rigorous
            physics-based simulation with an interactive Qt-based frontend. The simulation
            environment allows exploration of one-dimensional vertical descent as well as future multi-dimensional extensions.
          </p>
          <p>
            The project emphasizes modularity: the backend handles physics calculations,
            state propagation, and control logic, while the frontend provides real-time
            telemetry, cockpit visualization, and interactive user control.
          </p>
        </section>

        {/* Frontend & Backend Section */}
        <section>
          <h2>Frontend & Backend Architecture</h2>
          <p>
            The backend implements the lander's dynamics, numerical integration, sensors,
            optimization, and control loop in a thread-safe C++ simulation engine. It is fully
            decoupled from the UI, providing a robust foundation for automated testing, optimization,
            and interactive operation.
          </p>
          <p>Key backend components include:</p>
          <ul>
            <li><strong>Automation:</strong> IAutopilot, AdaptiveDescentController (energy-based landing with brake ratio guidance)</li>
            <li><strong>Control:</strong> InputArbiter (decides whether manual or autopilot control is active)</li>
            <li><strong>Controller:</strong> IController, PD_Controller (supports autopilot)</li>
            <li><strong>Integrators:</strong> IIntegrator, EulerIntegrator, Dynamics</li>
            <li><strong>Physics Models:</strong> IPhysicsModel, BasicMoonGravity, Physics (orchestrator)</li>
            <li><strong>Sensors & Perception:</strong> ISensor, SensorModel</li>
            <li><strong>Optimization:</strong> OptimizationModelParams, OptimizationStruct, ThrustOptimizationProblem, ThrustOptimizer</li>
            <li><strong>Thrust & Spacecraft:</strong> Thrust, CustomSpacecraftStruct, Spacecraft, SpacecraftStateStruct, StateVectorStruct, Quaternion, Vector3</li>
            <li><strong>Environment & Utilities:</strong> EnvironmentConfig, JsonConfigReader, SimDataStruct, SimControl, Logger, Spacemath (deprecated), Output (deprecated)</li>
          </ul>
          <p>
            The frontend, built with Qt, visualizes the lander state in real time, including
            altitude, velocity, thrust, fuel, and proper g-load. Users can interact with the
            simulation through the cockpit interface, adjusting thrust via sliders and managing
            the simulation without impacting backend stability.
          </p>
        </section>

        {/* Features Section */}
        <section>
          <h2>Current Features</h2>
          <ul>
            <li>Full separation of backend physics engine, integrators, optimization, and frontend UI for modular development</li>
            <li>Real-time telemetry and cockpit visualization of altitude, velocity, thrust, fuel, and g-load</li>
            <li>Thread-safe simulation loop with precise timing and Qt signal-slot integration</li>
            <li>Integrated logging system capturing backend debug output independently from the UI</li>
            <li>Configurable parameters via JSON for physics, control, and UI settings</li>
            <li>Interactive user controls with slider-based thrust adjustment and simulation management</li>
            <li>Experimental 1D thrust optimization using NLopt to minimize fuel while ensuring safe landing</li>
            <li>Adaptive Descent Controller for automated, phase-based landing guidance</li>
            <li>Support for future multi-dimensional dynamics and orbital maneuvers</li>
          </ul>
        </section>

        {/* Adaptive Descent Controller Section */}
        <section>
          <h2>Adaptive Descent Controller</h2>
          <p>
            The Adaptive Descent Controller is a modular system that guides the spacecraft safely during the final descent.
            It evaluates the current state of the spacecraft and dynamically adjusts thrust commands to ensure a smooth and safe landing.
          </p>

          <h3>Core Concepts</h3>
          <ul>
            <li><strong>Brake Ratio:</strong> Compares the remaining altitude to the distance needed to safely decelerate. Determines how aggressively the spacecraft must slow down.</li>
            <li><strong>Descent Phases:</strong> The controller switches between multiple phases depending on the brake ratio:
                MODE_A (Energy Dissipation), MODE_B (Controlled Descent), MODE_C (Terminal Approach), MODE_D (Critical Braking).
            </li>
            <li><strong>Guidance and Control:</strong> The controller uses a combination of predictive and feedback control to follow a safe descent trajectory. It adjusts velocity targets and thrust levels adaptively based on the current phase.</li>
            <li><strong>Characteristics:</strong> Adaptive gain scheduling, gravity compensation, thrust limits handling, and stable landing behavior across all descent phases.</li>
          </ul>
        </section>

        {/* Optimizer Section */}
        <section>
          <h2>Thrust Optimization (Experimental)</h2>
          <p>Moonlander now includes a backend module for 1D thrust optimization:</p>
          <ul>
            <li>Goal: Minimize fuel consumption while achieving target altitude and safe landing velocity</li>
            <li>Forward simulation uses EulerIntegrator to propagate spacecraft state under candidate thrust profiles</li>
            <li>Cost function accounts for terminal state, fuel usage, thrust smoothness, and descent encouragement</li>
            <li>Current status: Evaluates thrust sequences but still under tuning; mass floor enforcement prevents non-physical negative mass</li>
            <li>Next steps: Stabilize optimizer convergence, adjust cost weights, and integrate physical thrust limits</li>
          </ul>
        </section>

        {/* Goals & Vision Section */}
        <section>
          <h2>Goals & Future Vision</h2>
          <p>
            Moonlander aims to provide a robust, extensible platform for learning and experimentation
            in aerospace physics, spacecraft control systems, and optimization. Future directions include:
          </p>
          <ul>
            <li>Extension to multi-dimensional dynamics and orbital maneuvers</li>
            <li>Advanced control experiments, including closed-loop guidance and fuel-optimal automated landing</li>
            <li>Simulation of multiple landers or spacecraft in coordinated scenarios</li>
            <li>Enhanced visualization with 3D cockpit and landing views</li>
            <li>Integration with additional telemetry outputs for data analysis and validation</li>
            <li>Replay and record simulation sessions for research and teaching purposes</li>
          </ul>
          <p>
            The overarching goal is to create a platform that is educational, research-ready,
            and supports modular UI development, accurate physics simulation, and meaningful
            experimentation with spacecraft dynamics and control algorithms.
          </p>
        </section>

      </main>
    </Layout>
  );
}