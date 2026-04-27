import React from 'react';
import Layout from '@theme/Layout';
import '../../css/simulation.css';

export default function SimulationDemo() {
  return (
    <Layout
      title="Simulation Demonstration"
      description="Research-oriented cockpit and telemetry interface of the Moonlander simulation"
    >
      <main className="simulationPage">

        <section className="simSection">
          <h1>Spacecraft Configuration</h1>

          <p className="simIntroText">
            The Moonlander simulator is designed as a research-oriented testbed for
            descent guidance, control algorithms and propulsion system evaluation.
            Before starting a simulation run, users select a spacecraft configuration
            from a set of JSON-defined mission profiles. Each configuration defines
            the physical and propulsion-related parameters used by the C++ simulation backend.
          </p>

          <div className="simCard">
            <img
              src="/img/simulation/Screenshot_Spacecraft_Selected.png"
              className="simImage"
              alt="Spacecraft selection interface"
            />

            <p className="simCaption">
              <strong>Figure 0 — Spacecraft Selection Interface.</strong> &nbsp;
              Spacecraft configurations are selected before entering the cockpit.
              Each lander profile is defined externally and contains mass properties,
              propulsion data, tank definitions, controller-relevant limits and initial
              mission conditions.
            </p>
          </div>

          <p className="simDescription">
            The selection interface separates configuration management from the simulation
            engine. This allows new spacecraft variants, propulsion layouts or fuel tank
            architectures to be introduced without modifying the core simulation code.
          </p>

          <p className="simDescription">
            If no spacecraft is selected explicitly, the first configuration defined in the
            JSON file is used as the default. This guarantees that the backend always receives
            a valid and reproducible initialization state.
          </p>
        </section>

        <section className="simIntro">
          <h1>Simulation Demonstration</h1>
          <p>
            The following demonstration shows the cockpit interface during a representative
            descent run. The interface is intended not only as a visual cockpit, but also as
            an engineering and analysis tool for evaluating landing controllers, propulsion
            behavior and vehicle state evolution. All displayed quantities are computed by
            the underlying C++ physics model and updated in real time.
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
              <strong>Figure 1 — 1500 m Descent Demonstration.</strong>
              Representative descent from 1500 meters using an adaptive descent controller.
              The cockpit displays navigation state, fuel consumption, propulsion activity,
              controller output and spacecraft status in real time.
            </p>
          </div>
        </section>

        <section className="simSection">
          <h2>Research-Oriented Cockpit Interface</h2>

          <p className="simDescription">
            The cockpit interface has been restructured to support a more scientific workflow.
            Instead of only presenting a simplified landing animation, the interface now exposes
            the vehicle state, propulsion state and controller-relevant telemetry in a way that
            supports debugging, controller comparison and future data export.
          </p>

          <div className="interfaceBlock">
            <h3>NAV — Navigation State</h3>
            <p>
              The navigation section displays the lander's current kinematic state in the
              local navigation frame. The interface is prepared around the ENU convention:
              East, North and Up. This makes the displayed state directly usable for landing
              analysis, lateral drift evaluation and controller debugging.
            </p>
          </div>

          <div className="interfaceBlock">
            <h3>FUEL — Propellant and Tank State</h3>
            <p>
              The fuel section has been extended from a single global fuel display to a
              dynamic tank-based representation. Each configured fuel tank can be displayed
              individually with its name, role, remaining propellant mass and fill ratio.
              A visual fill bar shows the remaining propellant relative to the tank capacity.
            </p>
            <p>
              This supports spacecraft configurations with multiple tanks, such as separate
              main engine and RCS propellant reservoirs, and makes fuel usage easier to analyze
              during controller tests.
            </p>
          </div>

          <div className="interfaceBlock">
            <h3>LANDING VIEW — 2.5D Situational Visualization</h3>
            <p>
              The landing visualization has been upgraded from a simple one-dimensional
              altitude display to a lightweight 2.5D situational view. It shows the lander
              in a local ENU frame using a side view for vertical motion and a top view for
              horizontal drift and target-relative motion.
            </p>
            <p>
              The view includes trajectory history, velocity vectors, target reference and
              yaw indication. This provides a clearer interpretation of how the vehicle moves
              through space without requiring full 3D rendering.
            </p>
          </div>

          <div className="interfaceBlock">
            <h3>ENGINE — Propulsion and Loads</h3>
            <p>
              The propulsion section displays thrust-related telemetry and vehicle loads.
              The interface is being prepared for more complex propulsion systems where
              multiple thrusters or tank connections may contribute to the resulting force
              and torque acting on the lander.
            </p>
          </div>

          <div className="interfaceBlock">
            <h3>CONTROL — Autopilot and Controller Output</h3>
            <p>
              The cockpit reports whether the autopilot is active and displays controller
              output such as active mode information. This is especially relevant for testing
              different descent controllers and comparing their behavior under identical
              simulation conditions.
            </p>
          </div>

          <div className="interfaceBlock">
            <h3>STATUS — Spacecraft State Machine</h3>
            <p>
              The status section reports discrete spacecraft states such as
              <em> OPERATIONAL</em>, <em> LANDED</em>, <em> CRASHED</em> or
              <em> DESTROYED</em>. These states provide a clear interpretation of the
              simulation outcome and can be used later for automated evaluation of landing
              performance.
            </p>
          </div>
        </section>

        <section className="simSection">
          <h2>Scientific Use Case</h2>

          <p className="simDescription">
            The simulator is intended to support the development and evaluation of lunar
            landing control strategies. The cockpit interface therefore focuses on telemetry
            visibility, reproducibility and system observability rather than visual realism
            alone.
          </p>

          <p className="simDescription">
            Planned extensions include structured simulation data export, controller comparison
            workflows and plotting tools for post-run analysis. Relevant quantities include
            altitude, vertical velocity, lateral drift, fuel consumption, thrust commands,
            tank usage and final touchdown conditions.
          </p>
        </section>

      </main>
    </Layout>
  );
}