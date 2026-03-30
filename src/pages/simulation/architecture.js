import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import '../../css/architecture.css'; // CSS Pfad anpassen

export default function Architecture() {
  return (
    <Layout
      title="Moonlander Architecture"
      description="Overview of the Moonlander Simulation architecture and data flow">

      <main className="architectureContainer">
        <h1>Moonlander Architecture</h1>

        <section>
          <h2>System Overview</h2>
          <p>
            The diagram below illustrates the main components of the Moonlander Simulation,
            including the frontend, backend, logger, and configuration flow.
          </p>
        </section>

        <section className="diagramSection">
          <img
            src={useBaseUrl('/img/architecture/architecture.drawio.svg')}
            alt="Moonlander Architecture Diagram"
            className="archDiagram"
          />
        </section>

        <section>
          <h2>Component Descriptions</h2>
        <ul>
          <li><strong>Frontend (UI / Cockpit):</strong> User interface for telemetry display, spacecraft selection, cockpit visualization, and interactive control.</li>
          <li><strong>Backend (Simulation Engine):</strong> Executes physics computations, state updates, thrust calculations, g-loads, and optimization routines.</li>
          <li><strong>CockpitPage:</strong> Qt widget in the main thread handling UI logic, telemetry display, and user interactions.</li>
          <li><strong>SimulationWorker:</strong> Dedicated worker thread that safely executes simulation steps and interfaces between frontend and backend.</li>
          <li><strong>SimControl:</strong> Orchestrates simulation steps, validates parameters, and forwards commands between frontend and spacecraft.</li>
          <li><strong>Spacecraft:</strong> Owns the complete physical state (position, velocity, mass, orientation, thrust) and computes dynamics from applied forces.</li>
          <li><strong>Physics & Integrators:</strong> Interfaces and implementations (IPhysicsModel, BasicMoonGravity, Physics, IIntegrator, EulerIntegrator) for modular dynamics propagation.</li>
          <li><strong>Sensors & Perception:</strong> Sensor interfaces and models (ISensor, SensorModel) computing g-load, telemetry, and optional sensor noise.</li>
          <li><strong>Thrust & Optimization:</strong> Modules for thrust computation and fuel-efficient landing (Thrust, OptimizationModelParams, ThrustOptimizationProblem, ThrustOptimizer).</li>
          <li><strong>Config / JSON:</strong> Simulation and UI parameters loaded from JSON in the frontend, passed to the worker, and forwarded to the backend.</li>
          <li><strong>Backend structs:</strong> Standardized data structures for spacecraft state, integrator state, simulation data, and environment configuration.</li>
          <li><strong>Logger:</strong> Captures debug output from backend independently of the UI.</li>
        </ul>
        </section>

        <hr />
        <section>
          <h2>Physics Architecture</h2>
          <p>
            The diagram illustrates the core modular architecture of the Moonlander simulation backend, 
            centered around the <strong>Physics orchestrator</strong>. This orchestrator serves as the 
            central hub for all physics-related computations, coordinating the interactions between 
            integrators, physics models, controllers, autopilot logic, and sensors.
          </p>

          <section className="diagramSection">
            <img
              src={useBaseUrl('/img/architecture/physics_architecture.drawio.svg')}
              alt="Moonlander Architecture Diagram"
              className="archDiagram"
            />
          </section>
          <h3>Key Components and Relationships</h3>
          <ul>
            <li>
              <strong>Physics Orchestrator:</strong> The main entry point for all physics calculations. 
              Delegates computations to the active physics model, integrator, and control modules without 
              performing calculations itself.
            </li>
            <li>
              <strong>Physics Models (iPhysicsModel):</strong> Abstract interface for all physics computations. 
              The concrete implementation, <strong>BasicMoonGravity</strong>, provides lunar gravitational forces 
              applied to the spacecraft.
            </li>
            <li>
              <strong>Integrators (iIntegrator):</strong> Responsible for numerically integrating the spacecraft 
              state over time. <strong>EulerIntegrator</strong> is a concrete example that advances the lander’s 
              position, velocity, and other dynamic states each simulation step.
            </li>
            <li>
              <strong>Controllers (iController):</strong> Handle velocity and guidance control. 
              <strong>PD Controller</strong> is used to track target velocities and provide acceleration commands 
              to the thrust system.
            </li>
            <li>
              <strong>Autopilot / Automation (iAutopilot):</strong> Generates thrust commands for automated landings. 
              The <strong>Adaptive Descent Controller</strong> implements an energy-based landing strategy with 
              brake-ratio-guided mode switching.
            </li>
            <li>
              <strong>Sensors (iSensor):</strong> Abstract interface for all sensor feedback. 
              <strong>SensorModel</strong> computes telemetry such as proper g-load, which informs the controller 
              and autopilot decisions.
            </li>
          </ul>

          <h3>Flow Summary</h3>
          <ul>
            <li>The Physics orchestrator coordinates all inputs and outputs.</li>
            <li>Physics models define the forces acting on the spacecraft.</li>
            <li>Integrators update the spacecraft state over time.</li>
            <li>Controllers and the Adaptive Descent Controller calculate acceleration and thrust commands.</li>
            <li>Sensors provide real-time feedback for adaptive control and telemetry.</li>
          </ul>

          <p>
            This modular architecture ensures that each component can be developed, tested, and swapped 
            independently, supporting a robust and flexible simulation framework.
          </p>
        </section>

        <hr />
        <section>
          <h2>Propulsion Architecture</h2>
          <p>
            The propulsion subsystem has been refactored into a modular <strong>Thrust orchestrator</strong>&nbsp;
            architecture. Instead of modeling thrust as a single scalar engine output, the system now supports
            <strong> multiple engines</strong>, <strong>multiple tanks</strong>, and a fully
            <strong> vectorized thrust representation</strong> suitable for future 3D spacecraft dynamics.
          </p>

          <section className="diagramSection">
            <img
              src={useBaseUrl('/img/architecture/thrustStructure.drawio.svg')}
              alt="Moonlander Thrust Architecture Diagram"
              className="archDiagram"
            />
          </section>

          <h3>Key Components and Relationships</h3>
          <ul>
            <li>
              <strong>Thrust Orchestrator:</strong> Central propulsion manager of the spacecraft. It does not
              implement engine physics itself, but coordinates all registered engine models, updates their state,
              aggregates their thrust vectors, and manages fuel usage across the available tanks.
            </li>
            <li>
              <strong>EngineConfig:</strong> Static configuration data for a single engine. It defines the engine’s
              identity and physical properties such as <strong>max thrust</strong>, <strong>specific impulse</strong>,
              <strong>response dynamics</strong>, <strong>direction</strong>, and <strong>position</strong> in the
              spacecraft body frame. Multiple <code>EngineConfig</code> instances can exist for one spacecraft.
            </li>
            <li>
              <strong>ThrustState:</strong> Dynamic runtime state of an engine or propulsion element. It stores
              values such as current thrust and target thrust, which evolve over time during the simulation.
            </li>
            <li>
              <strong>FuelState:</strong> Dynamic runtime fuel data. It tracks current fuel mass, tank-related
              values, and fuel consumption during simulation. This allows the propulsion system to support
              multiple tanks and future engine-to-tank assignment logic.
            </li>
            <li>
              <strong>iThrustModel:</strong> Abstract interface for all engine models. It defines the common
              behavior expected by the Thrust orchestrator, such as updating thrust over time, handling target
              commands, computing fuel consumption, and exposing the resulting thrust output.
            </li>
            <li>
              <strong>BasicMainEngineModel:</strong> Concrete implementation of <code>iThrustModel</code>. It
              currently represents the default main engine behavior and models thrust buildup, target tracking,
              and fuel reduction using the configured engine parameters.
            </li>
            <li>
              <strong>Future Engine Models:</strong> The interface-based design allows additional propulsion
              models to be introduced later, such as attitude control thrusters, vernier engines, translation
              thrusters, or more specialized propulsion concepts.
            </li>
          </ul>

          <h3>Flow Summary</h3>
          <ul>
            <li>
              The spacecraft configuration provides a list of <strong>EngineConfig</strong> objects and fuel tank
              definitions.
            </li>
            <li>
              The <strong>Thrust orchestrator</strong> initializes one engine model per engine configuration and
              registers the available tanks.
            </li>
            <li>
              During each simulation step, control logic or autopilot modules send target thrust commands to
              specific engines through the orchestrator.
            </li>
            <li>
              The orchestrator forwards these commands to the corresponding <strong>iThrustModel</strong>
              implementations.
            </li>
            <li>
              Each concrete engine model updates its internal <strong>ThrustState</strong> according to its
              response model and computes the resulting thrust output.
            </li>
            <li>
              Fuel consumption is computed from the engine model and applied to the corresponding
              <strong>FuelState</strong> / tank data.
            </li>
            <li>
              The orchestrator then combines all individual engine outputs into a single resulting
              <strong> thrust vector</strong> that is passed to the spacecraft dynamics and physics layer.
            </li>
          </ul>

          <p>
            This propulsion architecture separates <strong>configuration</strong>, <strong>dynamic state</strong>,
            and <strong>behavioral models</strong>. As a result, the engine system becomes significantly more
            extensible, testable, and maintainable than a single-engine or scalar-thrust implementation.
          </p>
        </section>
      </main>
    </Layout>
  );
}
