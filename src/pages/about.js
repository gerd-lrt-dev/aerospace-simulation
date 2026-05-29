import React from 'react';
import Layout from '@theme/Layout';
import '../css/about.css';

export default function About() {
  return (
    <Layout
      title="About Spaceflight Dynamics Framework"
      description="Spaceflight Dynamics Framework (SDF) – A modular research-oriented environment for spacecraft dynamics, propulsion, guidance, control, and telemetry-driven simulation">

      <main className="aboutContainer">

        <h1>About Spaceflight Dynamics Framework</h1>

        <section>
          <p>
            <strong>Spaceflight Dynamics Framework (SDF)</strong> is an open-source
            modular C++ research and simulation environment for spacecraft dynamics,
            propulsion modeling, guidance, control development, and telemetry-driven
            analysis.
          </p>

          <p>
            The project originated as a lunar landing simulation and is now evolving
            into a broader framework for spaceflight dynamics research, subsystem
            experimentation, and future autonomous flight applications.
          </p>

          <p>
            SDF follows an open engineering philosophy focused on transparency,
            modularity, reproducibility, and collaborative development. The project is
            intended to provide a technically accessible platform for experimentation,
            learning, contribution, and long-term architectural evolution.
          </p>

          <p>
            The focus is not gameplay, but explicit physical modeling, clean system
            boundaries, reproducible simulation behavior, and extensible architecture
            design suitable for future frontend/backend decoupling and research workflows.
          </p>

          <p>
            The current development milestone focuses on establishing a complete
            full-state 6DOF-capable simulation architecture as the technical foundation
            for future spacecraft dynamics research.
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
            The current implementation provides a modular translational spacecraft
            dynamics environment while the software architecture is already prepared
            for extension toward full rigid-body 6DOF simulation, including attitude
            dynamics and rotational RCS control.
          </p>
        </section>

        <section>
          <h2>System Architecture</h2>

          <p>
            SDF follows a subsystem-oriented simulation architecture in which user
            input, command routing, propulsion modeling, physics propagation,
            telemetry, and visualization are separated.
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
            SDF supports both manual and automated control paths through a modular
            command routing and control architecture. Operator input is processed
            in the frontend through the <strong>InputMapper</strong>, transferred as
            a structured flight command, and routed through the simulation backend.
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
            The next architectural step is the introduction of a dedicated mapping
            layer that translates backend domain data into frontend-facing telemetry
            DTOs. This prepares the system for a future ROS-based interface where the
            frontend can be replaced without changing backend simulation logic.
          </p>
        </section>

        <section>
          <h2>Current Development Status</h2>

          <p>
            Current development status:
            <strong> Pre-release Development Build</strong>
            <br />
            Active milestone:
            <strong> M1 - Full 6DOF Simulation</strong>
          </p>

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
            <li>Preparation for DTO mapping, telemetry export, ROS interface, and future 6-DOF dynamics</li>
          </ul>
        </section>

        <section>
          <h2>Release Strategy</h2>

          <p>
            SDF is currently under active pre-release development. The project has
            not yet published a formal release version. Current work is focused on
            completing the first major architectural milestone:
            <strong> M1 - Full 6DOF Simulation</strong>.
          </p>

          <p>
            The planned research release line will introduce a more stable public
            project baseline, clearer frontend/backend boundaries, improved telemetry
            interfaces, and a stronger foundation for reproducible simulation studies.
          </p>

          <ul>
            <li><strong>Current state:</strong> Pre-release development build</li>
            <li><strong>Active milestone:</strong> M1 - Full 6DOF Simulation</li>
            <li><strong>Planned release line:</strong> v0.2 - SDF Research Release</li>
            <li><strong>Strategic direction:</strong> From lunar landing simulation toward a reusable spaceflight dynamics research framework</li>
          </ul>
        </section>

        <section>
          <h2>Goals and Vision</h2>

          <p>
            The long-term objective of SDF is to evolve into a flexible and extensible
            spaceflight dynamics research framework supporting spacecraft simulation,
            guidance research, telemetry workflows, control-system experimentation,
            and future distributed simulation architectures.
          </p>

          <ul>
            <li>Extension toward full 6-DOF rigid-body spacecraft dynamics</li>
            <li>Rotational RCS control and attitude stabilization</li>
            <li>ROS-based frontend/backend decoupling</li>
            <li>Telemetry export for reproducible analysis and post-processing</li>
            <li>Scenario-based autonomous landing research campaigns</li>
            <li>Advanced guidance, control, and optimization methods</li>
            <li>Support for broader mission phases including deorbit, descent, landing, orbital transfer, and multi-body scenarios</li>
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