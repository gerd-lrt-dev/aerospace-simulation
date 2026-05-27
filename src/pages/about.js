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

        <section>
          <p>
            <strong>Moonlander</strong> is a research-oriented C++ simulation platform
            for spacecraft dynamics, propulsion modeling, guidance, control, and
            telemetry-driven analysis.
          </p>

          <p>
            The project is evolving from a classical lunar landing simulation into
            a modular engineering environment for developing, validating, and
            comparing spacecraft subsystem models.
          </p>

          <p>
            The focus is not gameplay, but explicit physical modeling, clean system
            boundaries, reproducible simulation behavior, and an architecture that can
            support future autonomous landing research.
          </p>
        </section>

        <section>
          <h2>Research Platform Overview</h2>

          <p>
            The backend is implemented as a modular C++ simulation core with
            separated subsystems for dynamics, propulsion, control, automation,
            sensing, configuration, optimization, and telemetry.
          </p>

          <p>
            The current implementation supports three-dimensional translational
            spacecraft dynamics with vectorized force representation. The software
            architecture is prepared for future extension toward full 6-DOF rigid-body
            dynamics, including attitude dynamics and rotational RCS control.
          </p>
        </section>

        <section>
          <h2>System Architecture</h2>

          <p>
            Moonlander follows a subsystem-oriented architecture in which user input,
            command routing, propulsion modeling, physics propagation, telemetry, and
            visualization are separated.
          </p>

          <ul>
            <li><strong>Dynamics:</strong> 3D translational spacecraft dynamics with vector-based force aggregation</li>
            <li><strong>Physics:</strong> Modular force models including lunar central-body gravity</li>
            <li><strong>Propulsion:</strong> Multi-engine architecture with Thrust Orchestrator, main engine model, and RCS thruster models</li>
            <li><strong>Control:</strong> Manual and automated command paths using InputMapper, InputArbiter, controller modules, and autopilot logic</li>
            <li><strong>Configuration:</strong> JSON-based spacecraft setup for engines, tanks, mass properties, initial state, and geometry</li>
            <li><strong>Telemetry:</strong> Runtime simulation output for cockpit visualization, debugging, export, and future research workflows</li>
            <li><strong>Frontend:</strong> Qt-based cockpit interface for real-time visualization and operator interaction</li>
          </ul>
        </section>

        <section>
          <h2>Propulsion System</h2>

          <p>
            The propulsion subsystem is built around a centralized
            <strong> Thrust Orchestrator</strong>. It manages multiple engines,
            fuel tanks, engine-specific runtime states, command forwarding, fuel
            consumption, and vectorized thrust aggregation.
          </p>

          <p>
            The current propulsion system separates command input, actuator state,
            and resulting physical force:
          </p>

          <ul>
            <li><strong>Main Engine:</strong> Scalar thrust model with dynamic response, target tracking, thrust direction, and fuel consumption</li>
            <li><strong>RCS Thrusters:</strong> Individual binary actuator models with command delay, first-order rise and decay dynamics, scalar thrust output, and propellant consumption</li>
            <li><strong>RCSControlAllocator:</strong> Axis-based command allocation from translational RCS vector commands to individual thruster commands</li>
            <li><strong>Fuel System:</strong> Multi-tank support with tank assignment and engine-specific mass-flow computation</li>
            <li><strong>Telemetry:</strong> Engine-level RCS state export for cockpit visualization and future analysis workflows</li>
          </ul>

          <p>
            This design allows the main engine and RCS thrusters to be modeled
            independently while still exposing a unified propulsion interface to the
            spacecraft dynamics layer.
          </p>
        </section>

        <section>
          <h2>Guidance and Control</h2>

          <p>
            Moonlander supports both manual and automated control paths. Operator
            input is processed in the frontend through the <strong>InputMapper</strong>,
            transferred as a structured flight command, and routed through the
            simulation backend.
          </p>

          <p>
            The current control stack includes:
          </p>

          <ul>
            <li><strong>Adaptive Descent Controller:</strong> Energy-based landing guidance with brake-ratio-based mode switching</li>
            <li><strong>PD Velocity Control:</strong> Gravity-compensated velocity tracking with thrust saturation handling</li>
            <li><strong>InputArbiter:</strong> Separation and arbitration between manual and automated control commands</li>
            <li><strong>Manual RCS Control:</strong> Translational axis commands mapped to individual RCS thrusters through the allocator</li>
          </ul>
        </section>

        <section>
          <h2>Configuration and Data Flow</h2>

          <p>
            Spacecraft are defined using external JSON configuration files. These
            definitions include mass properties, inertia values, initial state,
            fuel tanks, main engines, RCS thrusters, thrust directions, mounting
            positions, and engine-to-tank assignments.
          </p>

          <p>
            Runtime data is collected into structured simulation and telemetry
            containers. The current frontend still uses some backend data structures,
            but this is a transitional state.
          </p>

          <p>
            The next architectural step is the introduction of a dedicated wrapper
            layer that translates backend domain data into frontend-facing telemetry
            DTOs. This prepares the system for a future ROS-based interface where the
            frontend can be replaced without changing backend simulation logic.
          </p>
        </section>

        <section>
          <h2>Current Development Status</h2>

          <ul>
            <li>3D translational spacecraft dynamics implemented</li>
            <li>Vectorized thrust aggregation implemented</li>
            <li>Multi-engine propulsion architecture implemented</li>
            <li>Main engine model with dynamic response implemented</li>
            <li>Individual RCS thruster model implemented</li>
            <li>RCS command allocation from axis commands to individual thrusters implemented</li>
            <li>Multi-tank fuel system implemented</li>
            <li>JSON-based spacecraft configuration system implemented</li>
            <li>Qt cockpit telemetry for main engine, RCS activity, fuel, state, and navigation data</li>
            <li>Adaptive descent guidance for automated landing</li>
            <li>Preparation for DTO wrapper, telemetry export, ROS interface, and future 6-DOF dynamics</li>
          </ul>
        </section>

        <section>
          <h2>Goals and Vision</h2>

          <p>
            The long-term objective of Moonlander is to evolve into a flexible
            research platform for spacecraft propulsion, guidance, control, and
            flight dynamics experimentation.
          </p>

          <ul>
            <li>Extension toward full 6-DOF rigid-body spacecraft dynamics</li>
            <li>Rotational RCS control and attitude stabilization</li>
            <li>ROS-based frontend/backend decoupling</li>
            <li>Telemetry export for reproducible analysis and post-processing</li>
            <li>Scenario-based autonomous landing research campaigns</li>
            <li>Advanced guidance, control, and optimization methods</li>
            <li>Support for broader mission phases including deorbit, descent, landing, and later orbital scenarios</li>
          </ul>

          <p>
            The project is intended to provide a technically robust and extensible
            simulation environment rather than a fixed single-scenario demo.
          </p>
        </section>

      </main>
    </Layout>
  );
}