import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import '../../css/architecture.css';

export default function Architecture() {
  return (
    <Layout
      title="Architecture | Spaceflight Dynamics Framework"
      description="Component architecture, subsystem boundaries, and structural relationships of the Spaceflight Dynamics Framework">

      <main className="architectureContainer">
        <h1>Spaceflight Dynamics Framework Architecture</h1>

        <section>
          <h2>System Overview</h2>

          <p>
            The <strong>Spaceflight Dynamics Framework (SDF)</strong> is organized as a
            modular simulation application with explicit boundaries between the Qt
            frontend, the simulation worker, the interface layer, and the C++ simulation
            backend. Within the backend, simulation orchestration, spacecraft state,
            coordinate transformations, physics, propulsion, control, sensors, and
            numerical integration are represented by dedicated components. The current
            control architecture additionally contains dedicated automatic rotational
            control for angular-rate damping and quaternion attitude hold.
          </p>

          <p>
            This page focuses on the <strong>concrete components</strong>, where they are
            located in the architecture, and which neighboring components they interact
            with. Runtime sequencing, state ownership over time, command timing, and the
            detailed movement of data through those components are documented separately
            on the <Link to="/simulation/data-flow"><strong>SDF Runtime Data Flow</strong></Link> page.
          </p>
        </section>

        <section className="diagramSection">
          <img
            src={useBaseUrl('/img/architecture/OverviewStructureNEW.drawio.svg')}
            alt="SDF system overview showing frontend, simulation worker, XML export, interface layer, backend simulation engine, physics, propulsion, and coordinate transformation components"
            className="archDiagram"
          />
        </section>

        <section>
          <h2>Architectural Layers</h2>

          <ul>
            <li>
              <strong>Frontend / Application Layer:</strong> Qt-based UI components,
              page navigation, configuration selection, cockpit presentation, the
              simulation worker, telemetry history management, and XML export control.
            </li>
            <li>
              <strong>Interface Layer:</strong> DTOs and mapping components that form the
              stable software boundary between frontend-facing representations and backend
              domain types.
            </li>
            <li>
              <strong>Backend / Simulation Engine:</strong> Simulation orchestration,
              spacecraft state, coordinate systems, physics, propulsion, controllers,
              sensors, configuration interpretation, and numerical integration.
            </li>
            <li>
              <strong>Simulation Models:</strong> Replaceable implementations behind
              interfaces for physics, propulsion, control, sensing, integration, and
              research-oriented extensions.
            </li>
          </ul>
        </section>

        <hr />

        <section>
          <h2>Frontend and Application Architecture</h2>

          <p>
            The frontend is structured around <code>MainWindow</code> as the application
            shell. It owns the persistent navigation, the page stack, shared application
            services, and the simulation thread boundary. Individual pages remain focused
            UI components rather than simulation controllers.
          </p>

          <p>
            <code>SimulationWorker</code> is the application-side boundary to the simulation
            thread. It is connected to the UI through Qt signals and slots and collaborates
            with the interface layer for command and telemetry translation. It also owns
            application-level simulation-session concerns such as telemetry history and
            export requests.
          </p>

          <p>
            Scientific telemetry export is represented by the dedicated
            <code>TelemetryXmlExporter</code>. The exporter is associated with the worker-side
            telemetry history and is responsible only for XML serialization. It does not
            belong to the physics backend and does not own simulation state.
          </p>

          <section className="diagramSection">
            <img
              src={useBaseUrl('/img/architecture/FrontEnd.drawio.svg')}
              alt="SDF frontend architecture showing MainWindow, pages, SimulationWorker, telemetry history, XML export, and the interface boundary"
              className="archDiagram"
            />
          </section>

          <h3>Frontend and Application Components</h3>

          <ul>
            <li>
              <strong>MainWindow:</strong> Central Qt application shell. It connects the
              top bar, page stack, configuration management, simulation thread, and
              <code>SimulationWorker</code>.
            </li>
            <li>
              <strong>TopBarWidget:</strong> Persistent application navigation and global
              controls. It is owned by <code>MainWindow</code> and provides access to
              application-wide functions including telemetry export controls.
            </li>
            <li>
              <strong>QStackedWidget:</strong> Page container owned by
              <code>MainWindow</code> for switching between the application pages.
            </li>
            <li>
              <strong>Homepage:</strong> Landing page and navigation entry point. It does
              not own simulation infrastructure.
            </li>
            <li>
              <strong>SpacecraftSelectionPage:</strong> Configuration-selection UI that
              works with the shared <code>ConfigManager</code>.
            </li>
            <li>
              <strong>cockpitPage:</strong> Main simulation presentation page. It is
              connected to <code>SimulationWorker</code> for telemetry and command exchange
              and contains cockpit-specific widgets. The cockpit exposes dedicated
              <strong> Kill Rotation</strong> and <strong>Stabilize</strong> controls for
              automatic rotational control.
            </li>
            <li>
              <strong>ControlsHelpPage:</strong> Static user-facing control reference.
            </li>
            <li>
              <strong>SettingsPage:</strong> Application page reserved for the settings
              subsystem planned for the research-oriented release line.
            </li>
            <li>
              <strong>ConfigManager:</strong> Shared frontend/application service for
              selecting and supplying JSON spacecraft configurations.
            </li>
            <li>
              <strong>inputmapper:</strong> Cockpit-side input component that creates
              manual translational and rotational RCS commands. Automatic attitude-mode
              flags remain owned by the dedicated cockpit controls and are preserved when
              manual axis commands are updated.
            </li>
            <li>
              <strong>LandingView:</strong> Cockpit visualization component for landing
              geometry, trajectory, velocity, and RCS indication.
            </li>
            <li>
              <strong>UIBuilder:</strong> Shared helper for consistent frontend widgets,
              labels, controls, and telemetry presentation elements.
            </li>
            <li>
              <strong>SimulationWorker:</strong> Simulation-thread boundary and application
              coordinator for the active simulation session. It communicates with
              <code>cockpitPage</code>/<code>MainWindow</code>, the interface layer, and
              telemetry recording/export components.
            </li>
            <li>
              <strong>TelemetryXmlExporter:</strong> XML serialization component used by
              the worker-side export feature. It consumes recorded telemetry snapshots and
              writes the scientific telemetry document without depending on backend physics
              classes.
            </li>
          </ul>
        </section>

        <hr />

        <section>
          <h2>Interface Layer Architecture</h2>

          <p>
            The interface layer is the explicit software boundary between the Qt
            application and the backend domain model. It prevents frontend classes from
            depending directly on backend spacecraft, physics, propulsion, or frame
            structures.
          </p>

          <h3>Interface Components</h3>

          <ul>
            <li>
              <strong>FlightCommandDTO:</strong> Frontend-facing command contract used by
              cockpit/input components and <code>SimulationWorker</code>. In addition to
              manual engine and RCS commands, the DTO contains explicit
              <code>killRotation</code> and <code>stabilize</code> mode requests.
            </li>
            <li>
              <strong>TelemetryDTO:</strong> Frontend-facing telemetry contract used by
              cockpit visualization, worker-side recording, and XML export. It includes
              the active automatic attitude-control state so verification data can be
              associated unambiguously with Kill Rotation or Stabilize operation.
            </li>
            <li>
              <strong>TelemetryMapper:</strong> Translation component connecting DTOs with
              backend command and simulation-data structures. It is used by
              <code>SimulationWorker</code> on the application side and communicates with
              <code>simcontrol</code>/<code>simData</code> on the backend side.
            </li>
          </ul>

          <p>
            The DTOs are value-oriented contracts rather than shared backend domain
            objects. This boundary can later be reused or adapted for additional
            transports such as ROS2 without coupling cockpit widgets to simulation-core
            classes.
          </p>
        </section>

        <hr />

        <section>
          <h2>Backend Architecture</h2>

          <p>
            The backend is a modular C++ simulation engine centered around
            <code>spacecraft</code> and its associated runtime state. The backend separates
            orchestration, configuration interpretation, coordinate handling, physical
            models, propulsion, integration, control, and sensing into distinct
            responsibilities.
          </p>

          <p>
            Eigen provides the common mathematical foundation for vectors, matrices, and
            quaternions across the simulation core. Coordinate-system concerns are kept in
            dedicated context and transformation components rather than embedded in the UI
            or configuration layer.
          </p>

          <section className="diagramSection">
            <img
              src={useBaseUrl('/img/architecture/BackEnd.drawio.svg')}
              alt="SDF backend architecture showing SimControl, spacecraft, state and frame contexts, coordinate transformation, physics, propulsion, configuration, and research components"
              className="archDiagram"
            />
          </section>

          <h3>Backend Core Components</h3>

          <ul>
            <li>
              <strong>simcontrol:</strong> Backend orchestration component. It connects the
              interface boundary with the active <code>spacecraft</code> instance and
              coordinates backend subsystem participation in a simulation session.
            </li>
            <li>
              <strong>spacecraft:</strong> Central backend domain object. It owns the
              authoritative <code>StateVector</code> and collaborates with propulsion,
              physics, mission/frame contexts, coordinate transformation, sensors, and
              configuration-derived vehicle data.
            </li>
            <li>
              <strong>StateVector:</strong> Dynamic spacecraft-state container owned by
              <code>spacecraft</code>. It provides the state consumed by physics, frame
              derivation, control, sensing, and telemetry aggregation.
            </li>
            <li>
              <strong>MissionContext:</strong> Mission-reference component associated with
              <code>spacecraft</code>. It contains persistent mission references such as
              the configured landing-site definition and the corresponding reference-frame
              representations.
            </li>
            <li>
              <strong>SimulationFrameContext:</strong> Runtime frame-view component
              associated with <code>spacecraft</code>. It groups the spacecraft state as
              represented in MCI, MCMF, MSC, ENU, LVLH, and SBF-related forms for consumers
              that require those representations.
            </li>
            <li>
              <strong>CoordinateTransformer:</strong> Stateless/compute-oriented coordinate
              subsystem used by <code>spacecraft</code> and frame-context construction for
              transformations between MCI, MCMF, MSC, ENU, LVLH, and SBF representations.
            </li>
            <li>
              <strong>jsonConfigReader:</strong> Backend configuration interpreter. It
              creates backend configuration structures from external JSON and supplies
              spacecraft, propulsion, fuel, initial-state, and mission-reference data.
            </li>
            <li>
              <strong>customSpacecraft:</strong> Configuration-side spacecraft data model
              populated by <code>jsonConfigReader</code> and consumed during spacecraft
              construction/initialization.
            </li>
            <li>
              <strong>simData:</strong> Backend-facing aggregate representation used at the
              interface boundary. It references state, frame, mission, propulsion, fuel,
              sensor, integrity, console, automatic attitude-control mode, and
              simulation-time information without exposing the complete
              <code>spacecraft</code> object to the frontend.
            </li>
          </ul>

          <h3>Backend Structural Relationships</h3>

          <ul>
            <li><code>simcontrol</code> is the backend entry point used by the interface layer.</li>
            <li><code>simcontrol</code> owns or manages the active <code>spacecraft</code> instance.</li>
            <li><code>spacecraft</code> is the hub connecting state, propulsion, physics, frames, and sensing.</li>
            <li><code>StateVector</code>, <code>MissionContext</code>, and <code>SimulationFrameContext</code> remain distinct domain structures with different responsibilities.</li>
            <li><code>CoordinateTransformer</code> is shared by frame-related backend components rather than duplicated across subsystems.</li>
            <li><code>simData</code> forms the backend side of the telemetry/interface boundary.</li>
          </ul>
        </section>

        <hr />

        <section>
          <h2>Physics Architecture</h2>

          <p>
            The physics subsystem contains the components responsible for translational
            and rotational rigid-body dynamics and the numerical integration interfaces
            used by the spacecraft model. Physical models, integration algorithms, and
            feedback-control components are intentionally represented by separate
            abstractions. Automatic attitude control remains outside the rigid-body
            equations and influences spacecraft motion only through the normal RCS
            actuation path.
          </p>

          <section className="diagramSection">
            <img
              src={useBaseUrl('/img/architecture/physicsStructure.drawio.svg')}
              alt="SDF physics architecture showing translational and rotational models, integration interfaces, dynamics coordination, controllers, and sensors"
              className="archDiagram"
            />
          </section>

          <h3>Physics and Control Components</h3>

          <ul>
            <li>
              <strong>IPhysicsModel:</strong> Abstract interface for translational
              environmental/acceleration models used by the physics subsystem.
            </li>
            <li>
              <strong>BasicMoonGravityModel:</strong> Current lunar gravity-model
              implementation behind the translational physics interface.
            </li>
            <li>
              <strong>IRotationalPhysicsModel:</strong> Interface for rotational
              rigid-body models.
            </li>
            <li>
              <strong>RigidBodyRotationalModel:</strong> Euler-equation-based rotational
              dynamics implementation used with spacecraft inertia and body angular state.
            </li>
            <li>
              <strong>IIntegrator:</strong> Numerical integration abstraction shared by
              translational, rotational, and quaternion state updates.
            </li>
            <li>
              <strong>EulerIntegrator:</strong> Current concrete implementation of
              <code>IIntegrator</code>.
            </li>
            <li>
              <strong>Dynamics:</strong> Coordination component connecting spacecraft
              state, physical models, applied loads, and the selected integrator.
            </li>
            <li>
              <strong>IController:</strong> Generic feedback-controller interface. In
              addition to scalar control operations, it exposes a quaternion-based
              three-axis control function used by the attitude-control subsystem.
            </li>
            <li>
              <strong>PD Controller:</strong> Concrete feedback-controller implementation
              used by both the descent-control architecture and the quaternion attitude
              controller. For attitude control, it combines quaternion-error feedback with
              body angular-rate damping.
            </li>
            <li>
              <strong>IAttitudeControl:</strong> Dedicated interface for automatic
              rotational-control modes. It separates the attitude-control contract from
              both simulation orchestration and the physical rigid-body model.
            </li>
            <li>
              <strong>AttitudeController:</strong> Concrete implementation of
              <code>IAttitudeControl</code>. It provides <strong>Kill Rotation</strong>
              for angular-rate damping and <strong>Stabilize</strong> for quaternion
              attitude hold. Stabilize captures the current orientation as its reference
              attitude and applies a hysteresis band around the settled state to reduce
              repeated RCS switching.
            </li>
            <li>
              <strong>IAutopilot:</strong> Interface for automated guidance/control logic.
            </li>
            <li>
              <strong>Adaptive Descent Controller:</strong> Current automated descent
              controller connected to the main-engine control subsystem.
            </li>
            <li>
              <strong>InputArbiter:</strong> Control-authority component positioned between
              manual and automated command producers and the backend actuation path. Main
              engine, translational RCS, and rotational RCS authority can be resolved
              independently so automatic attitude control does not replace unrelated
              manual channels.
            </li>
            <li>
              <strong>ISensor / SensorModel:</strong> Sensor abstraction and concrete
              sensor components attached to the simulation state for telemetry and
              feedback consumers.
            </li>
          </ul>

          <h3>Structural Relationships</h3>
          <ul>
            <li><code>spacecraft</code> uses the physics/dynamics subsystem for state propagation.</li>
            <li><code>Dynamics</code> connects physics-model and integrator abstractions.</li>
            <li>Propulsion supplies the loads consumed by the dynamics subsystem.</li>
            <li>Controllers and autopilot components are separated from the physical models and connect through the control architecture.</li>
            <li><code>AttitudeController</code> consumes spacecraft attitude and angular velocity but does not directly modify the <code>StateVector</code>.</li>
            <li>Automatic rotational commands are resolved by <code>InputArbiter</code> before reaching the RCS actuation subsystem.</li>
            <li>Sensor components observe simulation state without becoming state owners.</li>
          </ul>
        </section>

        <hr />

        <section>
          <h2>Propulsion Architecture</h2>

          <p>
            The propulsion subsystem models main engines, RCS thrusters, fuel assignment,
            actuator state, and propulsion-induced loads behind a common orchestration
            layer. Main-engine and RCS models are separate concrete implementations but
            share the <code>IThrustModel</code> abstraction where appropriate.
          </p>

          <section className="diagramSection">
            <img
              src={useBaseUrl('/img/architecture/thrustStructure.drawio.svg')}
              alt="SDF propulsion architecture showing Thrust orchestrator, main-engine and RCS models, allocator, configuration, runtime states, and fuel components"
              className="archDiagram"
            />
          </section>

          <h3>Propulsion Components</h3>

          <ul>
            <li>
              <strong>Thrust Orchestrator:</strong> Central propulsion component owned or
              used by <code>spacecraft</code>. It manages engine-model instances and forms
              the connection between spacecraft control requests, propulsion models, fuel,
              and the dynamics subsystem.
            </li>
            <li>
              <strong>IThrustModel:</strong> Common engine-model interface exposing engine
              identity, command/state access, thrust, direction, torque, fuel consumption,
              and tank assignment.
            </li>
            <li>
              <strong>BasicMainEngineModel:</strong> Concrete main-engine model implementing
              the main propulsion actuator behavior.
            </li>
            <li>
              <strong>BasicRCSModel:</strong> Concrete model for an individual RCS thruster.
            </li>
            <li>
              <strong>RCSControlAllocator:</strong> RCS allocation component positioned
              between spacecraft control requests and individual RCS engine models. It is
              also the actuator-side consumer of automatic rotational commands generated
              by Kill Rotation or Stabilize.
            </li>
            <li>
              <strong>EngineConfig / RCSEngineConfig:</strong> Static configuration objects
              supplied from spacecraft configuration and associated with the corresponding
              engine-model instances.
            </li>
            <li>
              <strong>ME_ThrustState / RCS_ThrustState:</strong> Runtime propulsion-state
              structures associated with main-engine and RCS models and exposed to
              telemetry consumers.
            </li>
            <li>
              <strong>FuelTank / FuelState:</strong> Propellant-resource components shared
              by the configured propulsion models and spacecraft mass/fuel accounting.
            </li>
          </ul>

          <h3>Structural Relationships</h3>
          <ul>
            <li><code>spacecraft</code> connects the control side, <code>Thrust</code>, and the dynamics subsystem.</li>
            <li><code>Thrust</code> owns/manages the concrete main-engine and RCS model instances.</li>
            <li><code>RCSControlAllocator</code> is specific to the RCS branch of the propulsion architecture.</li>
            <li>Engine configurations are static inputs; thrust-state structures represent the corresponding runtime actuator state.</li>
            <li>Fuel components are referenced by propulsion models and spacecraft-level resource accounting.</li>
          </ul>
        </section>

        <hr />

        <section>
          <h2>Telemetry, Recording, and Export Architecture</h2>

          <p>
            Telemetry spans three architectural areas: backend aggregation,
            interface-layer translation, and frontend/application consumption. The
            components are deliberately separated so cockpit presentation and scientific
            export can use the same frontend-facing telemetry contract without depending
            directly on backend domain classes.
          </p>

          <h3>Telemetry Components and Connections</h3>
          <ul>
            <li>
              <strong>simData:</strong> Backend aggregate attached to
              <code>spacecraft</code>/<code>simcontrol</code> and consumed by the interface
              layer.
            </li>
            <li>
              <strong>TelemetryMapper:</strong> Interface-layer component connecting
              backend <code>simData</code> with the frontend-facing
              <code>TelemetryDTO</code> representation.
            </li>
            <li>
              <strong>TelemetryDTO:</strong> Shared application-facing value contract used
              by <code>cockpitPage</code>, <code>SimulationWorker</code> telemetry history,
              and the export subsystem. The DTO contains explicit automation-state fields
              for <code>killRotationActive</code> and <code>stabilizeActive</code>.
            </li>
            <li>
              <strong>SimulationWorker:</strong> Application-side owner of telemetry
              history and the connection point between simulation-thread telemetry,
              frontend presentation, and export requests.
            </li>
            <li>
              <strong>TelemetryXmlExporter:</strong> Dedicated serializer connected to the
              recorded telemetry history. It produces XML output while remaining separate
              from backend simulation and physics components.
            </li>
            <li>
              <strong>cockpitPage / LandingView:</strong> UI consumers connected to the
              worker-provided telemetry representation.
            </li>
          </ul>

          <p>
            For snapshot timing, recording semantics, history handling, lifecycle
            behavior, and the detailed relationship between cockpit output and XML export,
            see <Link to="/simulation/data-flow">Runtime Data Flow</Link>.
          </p>
        </section>

        <hr />

        <section>
          <h2>Optimization Components</h2>

          <p>
            The backend contains experimental optimization components based on NLopt.
            They are structurally separated from the real-time simulation loop and remain
            research-oriented extensions rather than dependencies of the core simulation
            architecture.
          </p>

          <ul>
            <li><strong>OptimizationModelParams:</strong> Parameter container for optimization runs.</li>
            <li><strong>OptimizationStruct:</strong> Data structure for optimization state and results.</li>
            <li><strong>ThrustOptimizationProblem:</strong> Optimization problem formulation.</li>
            <li><strong>ThrustOptimizer:</strong> NLopt-based optimization driver.</li>
          </ul>
        </section>

        <hr />

        <section>
          <h2>Architectural Design Principles</h2>

          <ul>
            <li>
              <strong>Separation of Concerns:</strong> UI, application/session management,
              interface translation, backend orchestration, physics, propulsion, control,
              sensing, and export are represented by distinct components.
            </li>
            <li>
              <strong>Explicit Boundaries:</strong> DTOs and <code>TelemetryMapper</code>
              isolate frontend/application code from backend domain structures.
            </li>
            <li>
              <strong>Centralized Spacecraft Domain:</strong> <code>spacecraft</code> is the
              backend hub for state and vehicle-specific subsystem composition, while
              supporting contexts remain separate domain structures.
            </li>
            <li>
              <strong>Interface-Based Extensibility:</strong> Physics, rotational models,
              integrators, propulsion models, generic controllers, attitude-control
              implementations, autopilots, and sensors expose replaceable interfaces where
              appropriate.
            </li>
            <li>
              <strong>Configuration-Driven Composition:</strong> Spacecraft, mission,
              propulsion, fuel, and initial-state configuration are supplied externally and
              interpreted by dedicated configuration components.
            </li>
            <li>
              <strong>Dedicated Coordinate Subsystem:</strong> Frame transformations and
              mission/runtime frame representations remain explicit backend components.
            </li>
            <li>
              <strong>Reusable Telemetry Contract:</strong> Cockpit visualization,
              recording, and XML export share the same application-facing telemetry
              representation rather than creating independent simulation interfaces.
            </li>
            <li>
              <strong>Research Orientation:</strong> Optimization and future communication
              extensions can be attached without collapsing the existing subsystem
              boundaries.
            </li>
          </ul>
        </section>
      </main>
    </Layout>
  );
}
