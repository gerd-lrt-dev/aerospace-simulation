import React from 'react';
import Layout from '@theme/Layout';
import '../css/about.css';

export default function About() {
  return (
    <Layout
      title="About Spaceflight Dynamics Framework"
      description="Spaceflight Dynamics Framework (SDF) – A modular open-source C++ framework for 6DoF spacecraft dynamics, propulsion, guidance, control, telemetry, and aerospace simulation research">

      <main className="aboutContainer">

        <h1>About Spaceflight Dynamics Framework</h1>

        <section>
          <p>
            <strong>Spaceflight Dynamics Framework (SDF)</strong> is an open-source
            modular C++ simulation framework for spacecraft dynamics, propulsion
            modeling, guidance, control development, telemetry, and aerospace
            simulation research.
          </p>

          <p>
            The project originated as an autonomous lunar landing simulation and
            has since evolved into a broader framework for spacecraft dynamics,
            subsystem experimentation, control-system development, and future
            research-oriented simulation workflows.
          </p>

          <p>
            SDF follows an open engineering philosophy focused on transparency,
            modularity, reproducibility, and collaborative development. The project
            is intended to provide a technically accessible platform for
            experimentation, learning, contribution, model validation, and
            long-term architectural evolution.
          </p>

          <p>
            The focus is not gameplay, but explicit physical modeling, well-defined
            system boundaries, reproducible simulation behavior, and an extensible
            software architecture suitable for real-time simulation and future
            scientific analysis.
          </p>

          <p>
            The current development milestone establishes the complete
            <strong> 6DoF Core Simulation</strong>, including translational and
            rotational rigid-body dynamics, force and torque propagation,
            angular-velocity integration, and quaternion-based spacecraft attitude.
            The remaining milestone work focuses on systematic physical and numerical
            verification of the complete motion pipeline.
          </p>
        </section>

        <section>
          <h2>Research Platform Overview</h2>

          <p>
            The backend is implemented as a modular C++ simulation core with
            separated subsystems for dynamics, propulsion, control, automation,
            sensing, configuration, numerical integration, optimization, coordinate
            transformation, and telemetry.
          </p>

          <p>
            The current implementation provides a complete rigid-body 6DoF
            spacecraft dynamics pipeline. Translational and rotational motion are
            evaluated through separate physical models while sharing a common
            numerical integration architecture.
          </p>

          <p>
            The rotational simulation includes torque generation, torque aggregation,
            spacecraft inertia, Euler rigid-body dynamics, angular velocity
            propagation, and quaternion-based attitude kinematics.
          </p>
        </section>

        <section>
          <h2>System Architecture</h2>

          <p>
            SDF follows a subsystem-oriented simulation architecture in which user
            input, command routing, propulsion modeling, physical state propagation,
            telemetry generation, and visualization are separated through explicit
            interfaces.
          </p>

          <ul>
            <li>
              <strong>Dynamics:</strong> Full rigid-body 6DoF spacecraft dynamics
              including translational and rotational state propagation
            </li>

            <li>
              <strong>Physics:</strong> Modular translational and rotational physics
              models including lunar central-body gravity and Euler rigid-body
              rotational dynamics
            </li>

            <li>
              <strong>Propulsion:</strong> Multi-engine architecture with Thrust
              Orchestrator, main engine model, individual RCS thruster models,
              force aggregation, and torque generation
            </li>

            <li>
              <strong>Control:</strong> Manual and automated command paths using
              InputMapper, InputArbiter, controller modules, and autopilot logic
            </li>

            <li>
              <strong>Configuration:</strong> JSON-based spacecraft setup for
              engines, tanks, mass properties, inertia tensor, initial state,
              actuator geometry, and mission parameters
            </li>

            <li>
              <strong>Telemetry:</strong> Explicit telemetry DTOs and mapping
              between backend domain state and frontend visualization
            </li>

            <li>
              <strong>Coordinate Transformation:</strong> Dedicated transformation
              architecture for spacecraft, local, lunar-fixed, and inertial
              reference frames
            </li>

            <li>
              <strong>Frontend:</strong> Qt-based cockpit interface for real-time
              telemetry visualization and operator interaction
            </li>
          </ul>
        </section>

        <section>
          <h2>Propulsion System</h2>

          <p>
            The propulsion subsystem is built around a centralized
            <strong> Thrust Orchestrator</strong>. It manages multiple engines,
            fuel tanks, engine-specific runtime states, command forwarding,
            actuator updates, fuel consumption, and aggregation of the resulting
            body-fixed forces and torques.
          </p>

          <p>
            The propulsion architecture separates command input, actuator state,
            force generation, and resulting rotational moments:
          </p>

          <ul>
            <li>
              <strong>Main Engine:</strong> Scalar thrust model with dynamic
              response, target tracking, thrust direction, fuel consumption,
              and propulsion-induced torque representation
            </li>

            <li>
              <strong>RCS Thrusters:</strong> Individual binary actuator models
              with command delay, first-order rise and decay dynamics, scalar
              thrust output, mounting position, thrust direction, torque
              generation, and propellant consumption
            </li>

            <li>
              <strong>RCSControlAllocator:</strong> Axis-based allocation from
              translational RCS commands to individual thruster commands
            </li>

            <li>
              <strong>Force and Torque Aggregation:</strong> Individual propulsion
              outputs are combined into total body-fixed force and torque vectors
              for use by the 6DoF dynamics pipeline
            </li>

            <li>
              <strong>Fuel System:</strong> Multi-tank support with tank assignment
              and engine-specific mass-flow computation
            </li>

            <li>
              <strong>Telemetry:</strong> Engine-level state export for cockpit
              visualization, debugging, and future analysis workflows
            </li>
          </ul>

          <p>
            This design allows main engines and RCS thrusters to be modeled
            independently while exposing a unified propulsion interface to the
            spacecraft dynamics layer.
          </p>
        </section>

        <section>
          <h2>Guidance and Control</h2>

          <p>
            SDF supports both manual and automated control paths through a modular
            command-routing and control architecture. Operator input is processed
            in the frontend through the <strong>InputMapper</strong>, transferred
            as a structured flight command, and routed through the simulation
            backend.
          </p>

          <p>
            The current control stack includes:
          </p>

          <ul>
            <li>
              <strong>Adaptive Descent Controller:</strong> Energy-based landing
              guidance with brake-ratio-based mode switching
            </li>

            <li>
              <strong>PD Velocity Control:</strong> Gravity-compensated velocity
              tracking with thrust saturation handling
            </li>

            <li>
              <strong>InputArbiter:</strong> Separation and arbitration between
              manual and automated control commands
            </li>

            <li>
              <strong>Manual Translational RCS Control:</strong> Body-axis
              translation commands mapped to individual RCS thrusters through
              the allocator
            </li>
          </ul>

          <p>
            Dedicated RCS-based attitude control is the next propulsion-control
            extension. Future rotational RCS allocation will provide commanded
            roll, pitch, and yaw authority through physically modeled thruster
            combinations rather than artificial torque inputs.
          </p>
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
            Runtime simulation state remains internal to the backend. Frontend-facing
            telemetry is exposed through dedicated DTOs instead of directly exposing
            backend domain structures.
          </p>

          <p>
            The <strong>TelemetryMapper</strong> translates the authoritative
            backend spacecraft state into frontend-facing telemetry structures.
            This establishes a stable communication boundary between the simulation
            engine and cockpit frontend and provides the architectural basis for
            future transport mechanisms such as ROS2.
          </p>

          <p>
            The current 6DoF state includes translational quantities together with
            angular velocity and quaternion-based spacecraft attitude. The cockpit
            frontend is being adapted to visualize these additional rotational
            state variables.
          </p>
        </section>

        <section>
          <h2>Current Development Status</h2>

          <p>
            Current development status:
            <strong> Pre-release Development Build</strong>
            <br />
            Active milestone:
            <strong> M1 - 6DoF Core Simulation</strong>
          </p>

          <ul>
            <li>Three-dimensional translational spacecraft dynamics implemented</li>
            <li>Three-axis rigid-body rotational dynamics implemented</li>
            <li>Euler rigid-body equations including gyroscopic coupling implemented</li>
            <li>Spacecraft inertia tensor integrated into rotational dynamics</li>
            <li>Angular velocity propagation implemented</li>
            <li>Quaternion-based attitude propagation implemented</li>
            <li>Force and torque aggregation implemented</li>
            <li>Multi-engine propulsion architecture implemented</li>
            <li>Main engine model with dynamic response implemented</li>
            <li>Individual RCS thruster model implemented</li>
            <li>Translational RCS command allocation implemented</li>
            <li>Multi-tank fuel system implemented</li>
            <li>JSON-based spacecraft configuration system implemented</li>
            <li>Telemetry DTO and TelemetryMapper architecture implemented</li>
            <li>Qt cockpit telemetry and operator interface implemented</li>
            <li>Adaptive descent guidance for automated landing implemented</li>
            <li>Systematic 6DoF physics verification pending as the M1 exit criterion</li>
            <li>Cockpit adaptation to rotational state currently planned</li>
            <li>Dedicated RCS attitude-control development planned</li>
          </ul>
        </section>

        <section>
          <h2>Release Strategy</h2>

          <p>
            SDF is currently under active pre-release development. The project has
            not yet published a formal stable release. Current work is focused on
            completing and validating the first major technical milestone:
            <strong> M1 - 6DoF Core Simulation</strong>.
          </p>

          <p>
            Completion of M1 requires systematic verification of the complete
            translational and rotational motion pipeline, including coordinate
            transformations, force and torque signs, numerical propagation,
            quaternion attitude behavior, and physical plausibility.
          </p>

          <p>
            After this verification baseline, development can proceed toward a
            lightweight public SDF release and subsequently toward research-oriented
            extensions such as advanced numerical integration, telemetry analysis,
            controller benchmarking, and additional physical models.
          </p>

          <ul>
            <li>
              <strong>Current state:</strong> Pre-release development build
            </li>

            <li>
              <strong>Active milestone:</strong> M1 - 6DoF Core Simulation
            </li>

            <li>
              <strong>Current milestone exit criterion:</strong> Complete physical
              and numerical verification of the 6DoF motion pipeline
            </li>

            <li>
              <strong>Strategic direction:</strong> From autonomous lunar landing
              simulation toward a reusable spacecraft dynamics framework
            </li>
          </ul>
        </section>

        <section>
          <h2>Goals and Vision</h2>

          <p>
            The long-term objective of SDF is to evolve into a flexible and extensible
            spaceflight dynamics framework supporting spacecraft simulation,
            guidance research, telemetry workflows, control-system experimentation,
            model validation, and future distributed simulation architectures.
          </p>

          <ul>
            <li>Systematic verification and validation of the 6DoF simulation core</li>
            <li>Dedicated rotational RCS control and attitude stabilization</li>
            <li>Advanced spacecraft guidance and control algorithms</li>
            <li>Higher-order numerical integration methods</li>
            <li>Extended environmental and disturbance models</li>
            <li>ROS2-based external communication and integration</li>
            <li>Telemetry export for reproducible analysis and post-processing</li>
            <li>Controller benchmarking and simulation comparison workflows</li>
            <li>Scenario-based autonomous landing research campaigns</li>
            <li>
              Support for broader mission phases including deorbit, descent,
              landing, orbital transfer, and multi-body scenarios
            </li>
          </ul>

          <p>
            The project is intended to provide a technically robust and extensible
            simulation environment rather than a fixed single-scenario demonstration.
          </p>
        </section>

      </main>
    </Layout>
  );
}