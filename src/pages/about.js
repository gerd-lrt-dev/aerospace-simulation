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

        {/* Overview Section */}
        <section>
          <h2>Project Overview</h2>
          <p>
            Moonlander is an educational and research-oriented C++ project simulating lunar
            landings. Inspired by classical "Lunar Landing" examples, it combines rigorous
            physics-based simulation with an interactive Qt-based frontend. The simulation
            environment is designed to allow exploration of one-dimensional vertical descent
            as well as future multi-dimensional extensions.
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
            The backend implements the lander's dynamics, numerical integration, and control
            loop in a thread-safe C++ simulation engine. It is fully decoupled from the UI,
            providing a robust foundation for both automated testing and interactive
            operation.
          </p>
          <p>
            The frontend, built with Qt, visualizes the lander state in real time, including
            altitude, velocity, thrust, fuel, and g-load. Users can interact with the
            simulation through the cockpit interface, adjusting thrust via a slider, observing
            system status, and controlling the simulation (start, pause, stop) without
            impacting backend stability.
          </p>
          <p>
            Communication between backend and frontend leverages signals and slots for
            efficient telemetry updates, ensuring responsiveness even under high-frequency
            state changes.
          </p>
        </section>

        {/* Features Section */}
        <section>
          <h2>Current Features</h2>
          <ul>
            <li>Separation of backend physics engine and frontend UI for modular development</li>
            <li>Real-time telemetry and cockpit visualization of altitude, velocity, thrust, and fuel</li>
            <li>Thread-safe simulation loop with precise timing and Qt signal-slot integration</li>
            <li>Integrated logging system capturing backend debug output independently from the UI</li>
            <li>Configurable parameters via JSON for physics, control, and UI settings</li>
            <li>Interactive user controls with slider-based thrust adjustment and simulation management</li>
          </ul>
        </section>

        {/* Goals & Vision Section */}
        <section>
          <h2>Goals & Future Vision</h2>
          <p>
            Moonlander aims to provide a robust, extensible platform for learning and experimentation
            in aerospace physics and control systems. Future directions include:
          </p>
          <ul>
            <li>Extension to multi-dimensional dynamics and orbital maneuvers</li>
            <li>Advanced control experiments, including closed-loop guidance and landing optimization</li>
            <li>Simulation of multiple landers or spacecraft in coordinated scenarios</li>
            <li>Enhanced visualization with 3D cockpit and landing views</li>
            <li>Integration with additional telemetry outputs for data analysis and validation</li>
          </ul>
          <p>
            The overarching goal is to create a platform that is both educational and
            research-ready, supporting modular UI development, accurate physics simulation,
            and meaningful experimentation with spacecraft dynamics.
          </p>
        </section>

      </main>
    </Layout>
  );
}
