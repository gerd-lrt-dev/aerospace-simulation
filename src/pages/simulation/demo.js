import React from 'react';
import Layout from '@theme/Layout';
import '../../css/simulation.css';

export default function SimulationDemo() {
return ( <Layout
   title="Simulation Demonstration | Spaceflight Dynamics Framework"
   description="Lunar landing demonstration, spacecraft configuration workflow, cockpit telemetry, and 6DoF simulation within the Spaceflight Dynamics Framework"
 > <main className="simulationPage">

<section className="simSection">
  <h1>Spacecraft Configuration</h1>

  <p className="simIntroText">
    The <strong>Spaceflight Dynamics Framework (SDF)</strong> uses
    externally defined spacecraft configurations to initialize the
    physical, propulsion, control, and simulation parameters of each
    vehicle.
  </p>

  <p className="simIntroText">
    Spacecraft profiles are defined in JSON configuration files and provide
    the properties required by the C++ simulation core, including mass
    properties, inertia, propulsion geometry, fuel tanks, initial state,
    and controller-relevant parameters.
  </p>

  <p className="simIntroText">
    Spacecraft selection is optional. If the user does not explicitly select
    a vehicle, the first spacecraft defined in the loaded JSON configuration
    is automatically used as the default simulation vehicle.
  </p>

  <div className="simCard">
    <img
      src="/img/simulation/Screenshot_Spacecraft_Selected.png"
      className="simImage"
      alt="SDF spacecraft selection interface"
    />

    <p className="simCaption">
      <strong>Figure 0 — Spacecraft Selection Interface.</strong> &nbsp;
      The optional selection interface allows the user to override the default
      spacecraft before entering the cockpit. If no explicit selection is made,
      the first vehicle defined in the JSON configuration is loaded automatically.
    </p>
  </div>

  <p className="simDescription">
    The configuration workflow keeps vehicle definition separate from
    simulation logic. New spacecraft variants, propulsion layouts, fuel
    systems, inertia properties, actuator geometries, and initial conditions
    can therefore be introduced without modifying the core dynamics
    implementation.
  </p>

  <p className="simDescription">
    The default-selection behavior ensures that the simulation backend always
    receives a valid spacecraft configuration while preserving the option to
    select alternative vehicle profiles explicitly.
  </p>
</section>

    <section className="simIntro">
      <h1>Simulation Demonstration</h1>

      <p>
        The current demonstration uses a lunar descent scenario to showcase
        the integrated SDF simulation environment. It combines spacecraft
        dynamics, propulsion, guidance, control, telemetry, and cockpit
        visualization in a single real-time simulation workflow.
      </p>

      <p>
        The demonstration application is built on the same modular backend
        architecture used by the framework and therefore serves as both a
        visual application and an integration test environment for new
        simulation capabilities.
      </p>
    </section>

    <section className="simSection">
      <div className="simCard">
        <video
          src="/img/simulation/3DDemo.mp4"
          controls
          className="simVideo"
          poster="/img/simulation/Simulation_Beispiel3.png"
        >
          Your browser does not support the video tag.
        </video>

        <p className="simCaption">
          <strong>Figure 1 — 1500 m Descent Demonstration.</strong> &nbsp;
          Representative descent using the adaptive descent controller.
          The cockpit displays navigation state, propulsion activity,
          controller information, fuel state, and spacecraft status in
          real time.
        </p>
      </div>
    </section>

    <section className="simSection">
      <div className="simCard">
        <img
          src="/img/simulation/RCS_UI_Status.png"
          className="simImage"
          alt="SDF cockpit RCS telemetry indicators"
        />

        <p className="simCaption">
          <strong>Figure 2 — RCS Telemetry Integration.</strong> &nbsp;
          The cockpit exposes Reaction Control System activity at different
          abstraction levels. The vehicle visualization indicates active
          RCS control, the status section reports the number of active
          thrusters, and the propulsion display provides engine-level
          information when individual RCS thrusters are firing.
        </p>
      </div>
    </section>

    <section className="simSection">
      <h2>Research-Oriented Cockpit Interface</h2>

      <p className="simDescription">
        The cockpit is designed as an engineering interface rather than a
        purely visual representation of the landing scenario. It exposes
        selected vehicle, propulsion, navigation, control, and system-state
        information required to observe simulation behavior during
        development and validation.
      </p>

      <div className="interfaceBlock">
        <h3>NAV — Navigation State</h3>

        <p>
          The navigation section displays the spacecraft&apos;s translational
          state in the local navigation frame. Position and velocity are
          represented using the ENU convention: East, North, and Up.
        </p>

        <p>
          The cockpit is being extended to include the rotational component
          of the 6DoF state, particularly spacecraft angular velocity and
          attitude information.
        </p>
      </div>

      <div className="interfaceBlock">
        <h3>FUEL — Propellant and Tank State</h3>

        <p>
          Fuel telemetry is represented on a per-tank basis. Each configured
          tank can expose its remaining propellant mass and relative fill
          level, allowing spacecraft configurations with separate propulsion
          resources to be represented consistently.
        </p>

        <p>
          This provides direct visibility into fuel consumption during main
          engine and RCS operation and supports later quantitative analysis
          of controller and propulsion behavior.
        </p>
      </div>

      <div className="interfaceBlock">
        <h3>LANDING VIEW — Local Situational Visualization</h3>

        <p>
          The Landing View provides a lightweight 2.5D representation of the
          local landing scenario. It combines a side view for vertical motion
          with a top view for horizontal drift and target-relative movement.
        </p>

        <p>
          The visualization includes trajectory history, velocity vectors,
          target reference information, and RCS activity.
        </p>

        <p>
          The existing Landing View was originally designed around
          translational motion and cannot fully represent arbitrary
          three-dimensional spacecraft attitude. Its behavior is therefore
          being reviewed as part of the cockpit adaptation to the new 6DoF
          simulation state. Rotational information may be represented through
          dedicated attitude instrumentation rather than forcing all three
          rotational degrees of freedom into the existing 2D projection.
        </p>
      </div>

      <div className="interfaceBlock">
        <h3>ENGINE — Propulsion and RCS Activity</h3>

        <p>
          The propulsion section displays main-engine and Reaction Control
          System telemetry. Main-engine output is presented as current
          propulsion state, while individual RCS information is exposed when
          thrusters are active.
        </p>

        <p>
          RCS telemetry includes engine identity, axis assignment, current
          thrust, commanded thrust, and actuator state. This makes it possible
          to trace control commands down to individual propulsion actuators.
        </p>

        <p>
          The underlying propulsion model now also generates torque from
          off-center forces. These propulsion-induced torques are aggregated
          and supplied to the rotational dynamics model as part of the 6DoF
          simulation pipeline.
        </p>
      </div>

      <div className="interfaceBlock">
        <h3>CONTROL — Autopilot and Controller Output</h3>

        <p>
          The cockpit reports the state of automated guidance and control
          functions and exposes controller-relevant information during the
          simulation.
        </p>

        <p>
          The current demonstration includes adaptive descent guidance and
          velocity-control functionality. Future control extensions include
          dedicated RCS-based spacecraft attitude control around the roll,
          pitch, and yaw axes.
        </p>
      </div>

      <div className="interfaceBlock">
        <h3>STATUS — Spacecraft and Simulation State</h3>

        <p>
          The status section reports discrete spacecraft states such as
          <em> OPERATIONAL</em>, <em> LANDED</em>, <em> CRASHED</em>, or
          <em> DESTROYED</em>. These states provide a direct interpretation
          of the simulation outcome.
        </p>

        <p>
          The status display also summarizes current RCS activity by
          comparing active and configured thrusters, providing an immediate
          overview of propulsion activity without requiring inspection of
          every individual engine.
        </p>
      </div>
    </section>

    <section className="simSection">
      <h2>6DoF Simulation State</h2>

      <p className="simDescription">
        The current backend propagates the complete rigid-body spacecraft
        state across all six degrees of freedom.
      </p>

      <ul>
        <li>Three-dimensional position</li>
        <li>Three-dimensional velocity</li>
        <li>Translational acceleration</li>
        <li>Three-axis angular velocity</li>
        <li>Angular acceleration</li>
        <li>Quaternion-based spacecraft attitude</li>
      </ul>

      <p className="simDescription">
        Translational and rotational dynamics are evaluated through separate
        physical models. Propulsion forces contribute to translational motion,
        while propulsion-induced torques are processed by the rigid-body
        rotational dynamics model using spacecraft inertia and Euler&apos;s
        equations of motion.
      </p>

      <p className="simDescription">
        The cockpit is currently being adapted so that the complete rotational
        state is exposed to the operator in addition to the existing
        translational telemetry.
      </p>
    </section>

    <section className="simSection">
      <h2>Telemetry Pipeline</h2>

      <p className="simDescription">
        Simulation state remains authoritative inside the backend. Selected
        frontend-facing data is translated into explicit telemetry DTOs by the
        TelemetryMapper before being forwarded to the cockpit.
      </p>

      <p className="simDescription">
        This interface prevents the frontend from depending directly on
        backend domain structures and provides a stable foundation for future
        telemetry export, alternative frontends, and external communication
        interfaces.
      </p>
    </section>

    <section className="simSection">
      <h2>Engineering and Validation Use Case</h2>

      <p className="simDescription">
        The lunar descent demonstration acts as an integrated validation
        scenario for the broader Spaceflight Dynamics Framework. It provides
        a repeatable environment in which physical models, propulsion
        behavior, guidance algorithms, control logic, telemetry mapping, and
        frontend visualization can be evaluated together.
      </p>

      <p className="simDescription">
        The current 6DoF core is undergoing systematic physical and numerical
        verification. This includes validation of force and torque generation,
        sign conventions, coordinate transformations, rigid-body motion,
        numerical integration, and quaternion attitude propagation.
      </p>

      <p className="simDescription">
        Future extensions will add structured telemetry export, controller
        benchmarking, post-processing workflows, dedicated attitude-control
        RCS, and additional spacecraft dynamics models.
      </p>
    </section>

  </main>
</Layout>


);
}
