import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import '../../css/architecture.css';

export default function Architecture() {
  return (
    <Layout
      title="Architecture | Spaceflight Dynamics Framework"
      description="Frontend, backend, physics, propulsion, command flow, and telemetry architecture of the Spaceflight Dynamics Framework">

      <main className="architectureContainer">
        <h1>Spaceflight Dynamics Framework Architecture</h1>

        <section>
          <h2>System Overview</h2>

          <p>
            The <strong>Spaceflight Dynamics Framework (SDF)</strong> is structured
            as a modular spacecraft simulation and research environment with
            separated frontend, backend, configuration, control, physics,
            propulsion, telemetry, and visualization layers.
          </p>

          <p>
            The current implementation supports three-dimensional translational
            spacecraft motion and is being developed toward a full-state
            6DOF-capable simulation architecture. The long-term direction is a
            reusable open-source framework for spacecraft dynamics research,
            control-system experimentation, telemetry workflows, and future
            frontend/backend decoupling.
          </p>

          <p>
            The architecture separates user interaction, command generation,
            propulsion modeling, numerical state propagation, telemetry
            generation, and visualization. This enables individual subsystems to
            be extended, validated, or replaced without restructuring the entire
            simulation.
          </p>
        </section>

        <section className="diagramSection">
          <img
            src={useBaseUrl('/img/architecture/architecture.drawio.svg')}
            alt="SDF system architecture and data flow diagram"
            className="archDiagram"
          />
        </section>

        <section>
          <h2>Component Descriptions</h2>

          <ul>
            <li>
              <strong>Frontend / Cockpit:</strong> Qt-based user interface for
              telemetry display, spacecraft selection, cockpit visualization,
              manual operator input, control reference pages, settings
              placeholders, and presentation-oriented simulation feedback.
            </li>
            <li>
              <strong>InputMapper:</strong> Frontend-side input processing class
              that maps keyboard input, and later controller input, into a
              structured <code>FlightCommand</code>.
            </li>
            <li>
              <strong>FlightCommand:</strong> Frontend command structure used as
              a high-level input contract between input devices and the
              simulation command path. It collects main engine, translational
              RCS, rotational RCS, stabilization, and assisted-control commands.
            </li>
            <li>
              <strong>SimulationWorker:</strong> Worker-thread component that
              executes simulation steps outside the UI thread and exchanges data
              between frontend and backend through the current Qt signal-slot
              interface.
            </li>
            <li>
              <strong>SimControl:</strong> Central simulation coordinator
              responsible for simulation flow, command forwarding, parameter
              validation, and interaction with the spacecraft instance.
            </li>
            <li>
              <strong>Backend / Simulation Core:</strong> C++ simulation layer
              containing spacecraft state propagation, physics models,
              propulsion models, control logic, sensor models, optimization
              components, and telemetry generation.
            </li>
            <li>
              <strong>Spacecraft:</strong> Owns the physical spacecraft state,
              including position, velocity, mass properties, propulsion state,
              integrity state, and dynamic quantities required for force-based
              simulation.
            </li>
            <li>
              <strong>Configuration / JSON:</strong> External configuration
              layer for spacecraft mass properties, initial conditions, fuel
              tanks, main engines, RCS engines, directions, positions, and
              engine-to-tank assignment.
            </li>
            <li>
              <strong>Frontend Telemetry DTOs:</strong> Frontend-side telemetry
              structures such as <code>RCSCockpitTelemetry</code> represent
              reduced cockpit data independently from backend domain structs.
            </li>
            <li>
              <strong>Telemetry Mapping Layer:</strong> Planned translation
              layer that maps backend domain state into frontend-facing DTOs and
              later ROS message contracts.
            </li>
          </ul>
        </section>

        <hr />

        <section>
          <h2>Frontend Architecture</h2>

          <p>
            The frontend has been refactored into a clearer Qt application
            structure. <code>MainWindow</code> now acts as the central application
            shell and frontend coordinator. It owns the persistent top navigation
            bar, the central page stack, the shared configuration manager, and
            the simulation worker thread.
          </p>

          <p>
            Individual pages are now treated as focused UI components rather than
            application controllers. The landing page only presents the project
            entry point and emits navigation requests. The spacecraft selection
            page handles configuration selection. The cockpit page handles
            telemetry visualization and operator interaction. Additional pages
            such as control help and settings can now be integrated without
            changing the overall navigation structure.
          </p>

          <p>
            This structure reduces coupling between pages, prevents nested page
            stacks, and prepares the frontend for future expansion such as
            settings, telemetry inspection, replay views, ROS communication
            monitoring, and additional research-oriented tools.
          </p>

          <section className="diagramSection">
            <img
              src={useBaseUrl('/img/architecture/FrontEnd.drawio.svg')}
              alt="SDF frontend architecture diagram"
              className="archDiagram"
            />
          </section>

          <h3>Frontend Components</h3>

          <ul>
            <li>
              <strong>MainWindow:</strong> Central Qt application shell. It owns
              the top bar, page stack, core pages, configuration manager,
              simulation thread, and worker interface.
            </li>
            <li>
              <strong>TopBarWidget:</strong> Persistent navigation bar for global
              frontend navigation, settings access, and control help access.
            </li>
            <li>
              <strong>QStackedWidget:</strong> Central page container used to
              switch between homepage, spacecraft selection, cockpit, controls
              help, and settings pages.
            </li>
            <li>
              <strong>Homepage:</strong> Pure landing page. It displays the SDF
              branding, development status, and primary entry points without
              owning worker threads or sub-pages.
            </li>
            <li>
              <strong>SpacecraftSelectionPage:</strong> UI page for selecting
              JSON-defined spacecraft configurations through the shared
              <code>ConfigManager</code>.
            </li>
            <li>
              <strong>cockpitPage:</strong> Main simulation cockpit page. It
              displays telemetry, forwards operator commands, and owns cockpit
              widgets such as <code>LandingView</code> and <code>inputmapper</code>.
            </li>
            <li>
              <strong>ControlsHelpPage:</strong> Static control reference page
              showing keyboard-first control bindings and planned controller
              readiness.
            </li>
            <li>
              <strong>SettingsPage:</strong> Placeholder page for the planned
              v0.2 SDF Research Release settings subsystem.
            </li>
            <li>
              <strong>inputmapper:</strong> Converts keyboard input into
              structured <code>FlightCommand</code> data.
            </li>
            <li>
              <strong>LandingView:</strong> Lightweight 2.5D visualization widget
              for spatial landing state, trajectory history, velocity vectors,
              and RCS activity indication.
            </li>
            <li>
              <strong>UIBuilder:</strong> Shared helper for consistent frontend
              UI elements, buttons, labels, page titles, and telemetry detail
              boxes.
            </li>
          </ul>

          <h3>Frontend Design Direction</h3>

          <ul>
            <li>Centralized page routing through <code>MainWindow</code></li>
            <li>Persistent global navigation through <code>TopBarWidget</code></li>
            <li>UI pages with focused responsibilities</li>
            <li>No nested application windows inside the homepage</li>
            <li>Simulation worker ownership located at application shell level</li>
            <li>Preparation for future settings, help, telemetry, and ROS tooling pages</li>
          </ul>
        </section>

        <hr />

        <section>
          <h2>Physics Architecture</h2>

          <p>
            The physics architecture is centered around modular force models,
            numerical integration, sensor feedback, and control components. The
            current scope focuses on three-dimensional translational dynamics.
            Rotational dynamics and full rigid-body 6DOF propagation are planned
            future extensions.
          </p>

          <section className="diagramSection">
            <img
              src={useBaseUrl('/img/architecture/physics_architecture.drawio.svg')}
              alt="SDF physics architecture diagram"
              className="archDiagram"
            />
          </section>

          <h3>Key Components and Relationships</h3>
          <ul>
            <li>
              <strong>IPhysicsModel:</strong> Abstract interface for physical
              force or acceleration models.
            </li>
            <li>
              <strong>BasicMoonGravity:</strong> Current lunar central-body
              gravity model used to compute gravitational acceleration.
            </li>
            <li>
              <strong>IIntegrator:</strong> Abstract numerical integration
              interface used to propagate spacecraft states.
            </li>
            <li>
              <strong>EulerIntegrator:</strong> Current discrete-time
              integration implementation.
            </li>
            <li>
              <strong>Dynamics:</strong> Dynamics component used to combine
              forces, accelerations, and state propagation.
            </li>
            <li>
              <strong>IController:</strong> Interface for feedback control
              modules.
            </li>
            <li>
              <strong>PD Controller:</strong> Velocity-control component used
              for descent control and target tracking.
            </li>
            <li>
              <strong>IAutopilot:</strong> Interface for automated guidance and
              control logic.
            </li>
            <li>
              <strong>Adaptive Descent Controller:</strong> Energy-based landing
              controller using brake-ratio-guided mode switching and adaptive
              gain scheduling.
            </li>
            <li>
              <strong>InputArbiter:</strong> Control arbitration component that
              separates or prioritizes manual input and automated control
              commands.
            </li>
            <li>
              <strong>ISensor / SensorModel:</strong> Sensor abstraction and
              implementation used to compute telemetry quantities such as
              g-load and provide feedback for control and visualization.
            </li>
          </ul>

          <h3>Flow Summary</h3>
          <ul>
            <li>The spacecraft provides the current physical state.</li>
            <li>Physics models compute environmental acceleration such as lunar gravity.</li>
            <li>Control and automation modules compute guidance or command outputs.</li>
            <li>The propulsion layer computes thrust forces from engine states.</li>
            <li>The dynamics and integrator components propagate the spacecraft state.</li>
            <li>Sensor models generate telemetry for feedback and frontend visualization.</li>
          </ul>
        </section>

        <hr />

        <section>
          <h2>Propulsion Architecture</h2>

          <p>
            The propulsion subsystem is built around a central Thrust
            Orchestrator. Instead of treating propulsion as a single scalar
            output, the system supports multiple engines, multiple tanks,
            engine-specific runtime states, RCS allocation, and vectorized thrust
            aggregation.
          </p>

          <p>
            The main engine and RCS thrusters are modeled separately, but expose
            a common interface through <code>IThrustModel</code>.
          </p>

          <section className="diagramSection">
            <img
              src={useBaseUrl('/img/architecture/thrustStructure.drawio.svg')}
              alt="SDF propulsion and thrust architecture diagram"
              className="archDiagram"
            />
          </section>

          <h3>Key Components and Relationships</h3>
          <ul>
            <li>
              <strong>Thrust Orchestrator:</strong> Central propulsion manager.
              It registers engine models, forwards commands, updates engine
              states, computes fuel usage, and aggregates individual engine
              thrust into resulting force vectors.
            </li>
            <li>
              <strong>IThrustModel:</strong> Abstract propulsion interface for
              main engines and RCS thrusters. It defines common access to engine
              identity, command input, thrust output, direction, fuel
              consumption, and tank assignment.
            </li>
            <li>
              <strong>BasicMainEngineModel:</strong> Implemented main engine
              model. It represents the main engine as scalar thrust magnitude
              with response dynamics, target tracking, direction handling, and
              propellant consumption.
            </li>
            <li>
              <strong>BasicRCSModel:</strong> Implemented low-order model of one
              individual RCS thruster. It represents a binary valve-controlled
              actuator with command delay, first-order rise and decay dynamics,
              scalar thrust output, and propellant consumption.
            </li>
            <li>
              <strong>RCSControlAllocator:</strong> Allocation helper that maps
              axis-based RCS vector commands to individual thruster commands.
              The vector command determines which thruster direction is required;
              the individual thruster receives its local command.
            </li>
            <li>
              <strong>EngineConfig:</strong> Static configuration for main
              engines, including identity, tank assignment, thrust parameters,
              response parameters, direction, and mounting position.
            </li>
            <li>
              <strong>RCSEngineConfig:</strong> Static configuration for RCS
              thrusters, including identity, axis assignment, tank assignment,
              nominal thrust, command delay, rise and decay time constants,
              direction, and mounting position.
            </li>
            <li>
              <strong>ME_ThrustState:</strong> Runtime state of the main engine.
              The main thrust value is represented as a scalar magnitude, with
              direction stored separately for vector force construction.
            </li>
            <li>
              <strong>RCS_ThrustState:</strong> Runtime state of one individual
              RCS thruster. It contains metadata, scalar current thrust, scalar
              target thrust, normalized target command, actuator state, and
              thrust direction.
            </li>
            <li>
              <strong>FuelTank:</strong> Tank representation used to assign and
              track fuel resources.
            </li>
            <li>
              <strong>FuelState:</strong> Runtime fuel state used by engine
              models to compute and apply mass flow.
            </li>
          </ul>

          <h3>Flow Summary</h3>
          <ul>
            <li>The JSON spacecraft configuration defines tanks, main engines, and RCS engines.</li>
            <li>The Thrust Orchestrator initializes one engine model per configured engine.</li>
            <li>Main engine commands are forwarded to the main engine model.</li>
            <li>RCS vector commands are mapped by the RCSControlAllocator to individual RCS thruster commands.</li>
            <li>Each engine model updates its own actuator state and fuel consumption.</li>
            <li>The Thrust Orchestrator combines scalar engine outputs with engine directions.</li>
            <li>The aggregated thrust vector is passed to the spacecraft dynamics model.</li>
          </ul>
        </section>

        <hr />

        <section>
          <h2>Command and Input Flow</h2>

          <p>
            Manual control input is processed separately from physical engine
            behavior. The frontend does not directly apply forces. Instead,
            operator input is converted into a command object, routed through the
            simulation control path, mapped to engine commands, and only then
            translated into physical thrust by propulsion models.
          </p>

          <h3>Current Command Path</h3>
          <ul>
            <li>Keyboard input is captured by the cockpit frontend.</li>
            <li>The InputMapper converts key states into a FlightCommand.</li>
            <li>The command is forwarded through the current Qt signal-slot interface.</li>
            <li>SimControl and Spacecraft forward propulsion-relevant commands to the Thrust Orchestrator.</li>
            <li>The Thrust Orchestrator separates main engine and RCS commands.</li>
            <li>RCS commands are allocated to individual thrusters by the RCSControlAllocator.</li>
            <li>Engine models update actuator state, thrust output, and fuel consumption.</li>
            <li>The resulting thrust vector is used by the dynamics layer in the next simulation step.</li>
          </ul>
        </section>

        <hr />

        <section>
          <h2>Telemetry and Frontend Data Boundary</h2>

          <p>
            The current implementation still uses some backend structs in the
            frontend, for example fuel tank and simulation data containers. This
            is recognized as an intermediate state and will be refactored.
          </p>

          <p>
            The target architecture introduces a strict boundary between backend
            domain models and frontend telemetry models. Backend structs describe
            simulation-internal state, while frontend DTOs describe only the data
            required for visualization and interaction.
          </p>

          <h3>Current Transition State</h3>
          <ul>
            <li>
              <strong>Backend domain structs:</strong> Used internally for
              spacecraft state, thrust state, fuel state, configuration, and
              simulation data.
            </li>
            <li>
              <strong>Frontend datastructs:</strong> Used for cockpit-specific
              telemetry such as <code>RCSCockpitTelemetry</code>.
            </li>
            <li>
              <strong>TelemetryMapper:</strong> Planned mapping component that
              will translate backend state into frontend telemetry DTOs.
            </li>
            <li>
              <strong>Issue D19 Wrapper:</strong> Planned wrapper layer that will
              translate backend structs into frontend DTOs and later ROS message
              contracts.
            </li>
          </ul>

          <h3>Target Direction</h3>
          <ul>
            <li>The frontend shall not depend on backend domain structs.</li>
            <li>The backend shall not depend on Qt frontend classes.</li>
            <li>Telemetry shall be transferred through explicit DTOs or ROS messages.</li>
            <li>The cockpit frontend shall be replaceable by another frontend without changing backend simulation logic.</li>
            <li>ROS will become the long-term communication interface between simulation backend and external consumers.</li>
          </ul>
        </section>

        <hr />

        <section>
          <h2>Optimization Components</h2>

          <p>
            The backend contains experimental optimization components based on
            NLopt. These components are currently used for thrust optimization
            experiments and are separated from the real-time control and
            propulsion path.
          </p>

          <ul>
            <li><strong>OptimizationModelParams:</strong> Parameter container for optimization runs.</li>
            <li><strong>OptimizationStruct:</strong> Data structure for optimization state and results.</li>
            <li><strong>ThrustOptimizationProblem:</strong> Problem formulation for thrust optimization.</li>
            <li><strong>ThrustOptimizer:</strong> Optimization driver using NLopt.</li>
          </ul>
        </section>

        <hr />

        <section>
          <h2>Architectural Design Principles</h2>

          <ul>
            <li>
              <strong>Separation of Concerns:</strong> Input handling, command
              routing, control, propulsion, physics, telemetry, and visualization
              are separated into distinct components.
            </li>
            <li>
              <strong>Interface-Based Extensibility:</strong> Physics, sensors,
              controllers, autopilots, integrators, and thrust models are exposed
              through interfaces where appropriate.
            </li>
            <li>
              <strong>Configuration-Driven Setup:</strong> Spacecraft engines,
              tanks, mass properties, and initial conditions are loaded from
              external configuration.
            </li>
            <li>
              <strong>Explicit Runtime State:</strong> Engine states,
              spacecraft states, telemetry states, and fuel states are modeled
              explicitly.
            </li>
            <li>
              <strong>Vector-Based Dynamics:</strong> Propulsion output and
              motion propagation use vector quantities to support
              three-dimensional dynamics and future 6DOF extension.
            </li>
            <li>
              <strong>Frontend/Backend Decoupling:</strong> Direct dependency of
              the frontend on backend domain structs is temporary and will be
              replaced by DTO and ROS-based communication layers.
            </li>
            <li>
              <strong>Research Orientation:</strong> The system is designed for
              reproducible simulation runs, telemetry export, model validation,
              and future autonomous landing research campaigns.
            </li>
            <li>
              <strong>Open Engineering Philosophy:</strong> The project is
              developed as an open-source framework with emphasis on transparent
              architecture, modularity, reproducibility, and contribution-friendly
              evolution.
            </li>
          </ul>
        </section>
      </main>
    </Layout>
  );
}