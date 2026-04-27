import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import '../../css/architecture.css';

export default function Architecture() {
  return (
    <Layout
      title="Moonlander Architecture"
      description="Architecture and data flow of the Moonlander research-oriented spacecraft simulation platform">

      <main className="architectureContainer">
        <h1>Moonlander Architecture</h1>

        <section>
          <h2>System Overview</h2>
          <p>
            Moonlander is structured as a modular spacecraft simulation platform with
            clearly separated frontend, backend, configuration, control, physics,
            propulsion, and telemetry layers. The architecture is designed to support
            ongoing development from the current three-dimensional translational
            simulation toward future 6-DOF spacecraft dynamics.
          </p>
          <p>
            The system separates user interaction, command generation, propulsion
            modeling, numerical state propagation, and telemetry output. This allows
            individual components to be extended or replaced without restructuring the
            complete simulation framework.
          </p>
        </section>

        <section className="diagramSection">
          <img
            src={useBaseUrl('/img/architecture/architecture.drawio.svg')}
            alt="Moonlander system architecture and data flow diagram"
            className="archDiagram"
          />
        </section>

        <section>
          <h2>Component Descriptions</h2>
          <ul>
            <li>
              <strong>Frontend / Cockpit:</strong> Qt-based user interface for telemetry
              display, spacecraft selection, cockpit visualization, and manual operator
              interaction.
            </li>
            <li>
              <strong>InputMapper:</strong> Frontend-side input processing component that
              maps keyboard input, and later controller input, into structured flight
              commands for main engine and RCS control.
            </li>
            <li>
              <strong>SimulationWorker:</strong> Dedicated worker-thread component that
              executes simulation steps outside the UI thread and provides safe data
              exchange between frontend and backend.
            </li>
            <li>
              <strong>SimControl:</strong> Central simulation coordinator responsible for
              simulation flow, command forwarding, parameter validation, and interaction
              with the spacecraft object.
            </li>
            <li>
              <strong>Backend / Simulation Core:</strong> C++ simulation layer for physics,
              propulsion, control, state propagation, telemetry generation, and future
              research-oriented model extensions.
            </li>
            <li>
              <strong>Spacecraft:</strong> Owns the physical spacecraft state, including
              position, velocity, mass properties, propulsion state, and dynamic quantities
              required for force-based simulation.
            </li>
            <li>
              <strong>Physics and Integrators:</strong> Modular interfaces and
              implementations for force modeling and numerical propagation, including
              IPhysicsModel, BasicMoonGravity, Physics, IIntegrator, and EulerIntegrator.
            </li>
            <li>
              <strong>Control and Automation:</strong> Includes manual command arbitration,
              controller interfaces, PD-based velocity control, and the Adaptive Descent
              Controller for automated landing guidance.
            </li>
            <li>
              <strong>Propulsion:</strong> Multi-engine propulsion architecture based on a
              central Thrust Orchestrator, engine-specific models, thrust states, fuel tanks,
              and vectorized thrust aggregation.
            </li>
            <li>
              <strong>Configuration / JSON:</strong> External spacecraft and simulation
              configuration layer for mass properties, tanks, engines, initial states, and
              simulation parameters.
            </li>
            <li>
              <strong>Backend Structs:</strong> Standardized data containers for state
              vectors, spacecraft state, simulation output, engine states, fuel tanks, and
              environment configuration.
            </li>
            <li>
              <strong>Logger:</strong> Backend logging component that captures diagnostic
              output independently of the user interface.
            </li>
          </ul>
        </section>

        <hr />

        <section>
          <h2>Physics Architecture</h2>
          <p>
            The physics architecture is centered around a modular Physics orchestrator.
            This component coordinates physics models, integrators, controller outputs,
            autopilot logic, and sensor feedback without embedding all physical models
            directly into a single monolithic class.
          </p>
          <p>
            The current model scope focuses on three-dimensional translational spacecraft
            dynamics. Rotational dynamics and full rigid-body 6-DOF propagation are planned
            future extensions.
          </p>

          <section className="diagramSection">
            <img
              src={useBaseUrl('/img/architecture/physics_architecture.drawio.svg')}
              alt="Moonlander physics architecture diagram"
              className="archDiagram"
            />
          </section>

          <h3>Key Components and Relationships</h3>
          <ul>
            <li>
              <strong>Physics Orchestrator:</strong> Central coordination layer for
              physics-related simulation tasks. It delegates computations to the active
              physics model, integrator, control modules, and sensor components.
            </li>
            <li>
              <strong>IPhysicsModel:</strong> Abstract interface for physical force models.
              Concrete implementations can be exchanged to represent different
              environmental or force-model assumptions.
            </li>
            <li>
              <strong>BasicMoonGravity:</strong> Current lunar gravity model used to compute
              gravitational acceleration acting on the spacecraft.
            </li>
            <li>
              <strong>IIntegrator:</strong> Abstract numerical integration interface used to
              propagate the spacecraft state over time.
            </li>
            <li>
              <strong>EulerIntegrator:</strong> Current integration implementation for
              discrete-time propagation of the translational spacecraft state.
            </li>
            <li>
              <strong>IController:</strong> Interface for feedback control modules that
              compute control commands from the current spacecraft state.
            </li>
            <li>
              <strong>PD Controller:</strong> Velocity-control component used to track
              target velocities with gravity compensation and thrust-limit handling.
            </li>
            <li>
              <strong>IAutopilot:</strong> Interface for automated guidance and control
              logic.
            </li>
            <li>
              <strong>Adaptive Descent Controller:</strong> Energy-based landing controller
              using brake-ratio-guided mode switching for phase-dependent descent behavior.
            </li>
            <li>
              <strong>BasicRCSControlModel:</strong> Planned RCS control model responsible
              for translating RCS-related flight commands into suitable thruster commands.
              This component is currently under construction and will provide the control
              connection between commanded translational inputs and RCS engine behavior.
            </li>
            <li>
              <strong>ISensor / SensorModel:</strong> Sensor abstraction and implementation
              used to compute telemetry quantities such as g-load and provide feedback to
              higher-level control logic.
            </li>
          </ul>

          <h3>Flow Summary</h3>
          <ul>
            <li>The Physics orchestrator receives the current spacecraft state and active commands.</li>
            <li>Physics models compute environmental forces such as lunar gravity.</li>
            <li>Controllers and automation modules compute guidance or control commands.</li>
            <li>The BasicRCSControlModel will map RCS commands to thruster-level behavior once completed.</li>
            <li>The propulsion layer provides thrust forces to the dynamics model.</li>
            <li>The integrator advances the spacecraft state in discrete simulation steps.</li>
            <li>Sensors compute feedback and telemetry for control and visualization.</li>
          </ul>

          <p>
            This structure supports systematic model development by separating physical
            assumptions, numerical propagation, control logic, and sensor feedback into
            independent components.
          </p>
        </section>

        <hr />

        <section>
          <h2>Propulsion Architecture</h2>
          <p>
            The propulsion subsystem has been refactored into a modular Thrust Orchestrator
            architecture. Instead of treating propulsion as a single scalar output, the
            system now supports multiple engines, multiple tanks, engine-specific state
            handling, and vectorized thrust representation.
          </p>
          <p>
            This design allows the main engine and RCS thrusters to be modeled separately,
            while still exposing a unified thrust interface to the spacecraft dynamics.
          </p>

          <section className="diagramSection">
            <img
              src={useBaseUrl('/img/architecture/thrustStructure.drawio.svg')}
              alt="Moonlander propulsion and thrust architecture diagram"
              className="archDiagram"
            />
          </section>

          <h3>Key Components and Relationships</h3>
          <ul>
            <li>
              <strong>Thrust Orchestrator:</strong> Central propulsion manager of the
              spacecraft. It coordinates registered engine models, forwards commands,
              updates engine states, manages fuel usage, and aggregates individual engine
              outputs into a resulting thrust vector.
            </li>
            <li>
              <strong>IThrustModel:</strong> Abstract interface for propulsion models. It
              defines common behavior such as command handling, thrust-state update,
              fuel-consumption calculation, and thrust-output access.
            </li>
            <li>
              <strong>BasicMainEngineModel:</strong> Concrete main engine implementation.
              It models scalar thrust magnitude, target tracking, response dynamics, and
              fuel consumption based on the configured engine parameters.
            </li>
            <li>
              <strong>BasicRCSModel:</strong> Planned RCS thruster model for discrete,
              vector-based translational control. The model will represent RCS behavior
              separately from the main engine and is intended to support future extensions
              toward attitude and 6-DOF modeling.
            </li>
            <li>
              <strong>EngineConfig:</strong> Static configuration data for each engine,
              including identifier, name, type, controlled axis, tank assignment, maximum
              thrust, specific impulse, response parameters, thrust direction, and mounting
              position.
            </li>
            <li>
              <strong>EngineType:</strong> Type-safe selector used to query either the total
              propulsion output or a specific subsystem such as the main engine or RCS.
            </li>
            <li>
              <strong>ME_ThrustState:</strong> Dynamic main engine state. The primary thrust
              quantity is represented as a scalar magnitude, while the engine direction is
              handled separately to derive a physical thrust vector.
            </li>
            <li>
              <strong>RCS_ThrustState:</strong> Dynamic RCS state. RCS commands and thrust
              quantities are represented as Vector3 values because translational RCS control
              acts along multiple axes.
            </li>
            <li>
              <strong>FuelTank:</strong> Static and dynamic tank representation used to
              assign fuel resources to propulsion models and track remaining fuel mass.
            </li>
            <li>
              <strong>FuelState:</strong> Runtime fuel data used to calculate and apply
              engine-specific mass flow during simulation.
            </li>
          </ul>

          <h3>Flow Summary</h3>
          <ul>
            <li>The JSON spacecraft configuration defines engines, tanks, directions, positions, and engine-to-tank assignments.</li>
            <li>The Thrust Orchestrator initializes propulsion models from the provided EngineConfig objects.</li>
            <li>Main engine and RCS commands are received through separate command paths.</li>
            <li>The main engine model updates scalar thrust magnitude using its response model.</li>
            <li>The RCS model receives vector-based commands for translational control.</li>
            <li>Each engine model computes thrust output and fuel consumption according to its own state and configuration.</li>
            <li>The Thrust Orchestrator aggregates individual thrust contributions into a total thrust vector.</li>
            <li>The resulting propulsion force is passed to the spacecraft dynamics model.</li>
          </ul>

          <p>
            The propulsion layer explicitly separates configuration, command input,
            dynamic state, actuator behavior, and physical thrust output. This makes the
            subsystem extensible, testable, and suitable for future research-oriented
            propulsion and control experiments.
          </p>
        </section>

        <hr />

        <section>
          <h2>Command and Input Flow</h2>
          <p>
            Manual control input is processed separately from the physical propulsion
            models. The frontend InputMapper converts operator input into structured
            flight commands, while backend components decide how those commands affect
            engine states and spacecraft dynamics.
          </p>

          <h3>Current Command Path</h3>
          <ul>
            <li>
              Keyboard input is captured in the cockpit frontend.
            </li>
            <li>
              The InputMapper converts key states into main engine or RCS flight commands.
            </li>
            <li>
              Commands are forwarded through the Qt signal-slot interface to the simulation backend.
            </li>
            <li>
              SimControl and the spacecraft backend forward propulsion-related commands to the Thrust Orchestrator.
            </li>
            <li>
              The Thrust Orchestrator updates the corresponding engine model or thrust state.
            </li>
            <li>
              The resulting thrust vector is used by the dynamics layer during the next simulation step.
            </li>
          </ul>

          <p>
            This separation is important because user input does not directly modify
            physical forces. Instead, input is transformed into commands, commands update
            actuator states, and actuator states generate physical thrust. This distinction
            supports realistic modeling and future extension to controller input,
            autopilot commands, and actuator dynamics.
          </p>
        </section>

        <hr />

        <section>
          <h2>Architectural Design Principles</h2>
          <ul>
            <li>
              <strong>Separation of Concerns:</strong> User input, command processing,
              propulsion modeling, physics propagation, and visualization are handled by
              distinct components.
            </li>
            <li>
              <strong>Explicit State Representation:</strong> Runtime states such as
              ME_ThrustState and RCS_ThrustState distinguish commanded values from actual
              actuator output.
            </li>
            <li>
              <strong>Vector-Based Dynamics:</strong> Forces are represented as Vector3
              quantities, enabling three-dimensional translational dynamics and future
              6-DOF extensions.
            </li>
            <li>
              <strong>Configuration-Driven Setup:</strong> Spacecraft engines, tanks, and
              initial properties are loaded from external JSON definitions.
            </li>
            <li>
              <strong>Interface-Based Extensibility:</strong> Physics, control, sensor,
              and propulsion models are accessed through abstract interfaces where possible.
            </li>
          </ul>
        </section>
      </main>
    </Layout>
  );
}