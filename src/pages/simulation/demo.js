import React from 'react';
import Layout from '@theme/Layout';
import '../../css/simulation.css';

export default function SimulationDemo() {
  return (
    <Layout
      title="Simulation Demonstration"
      description="Representative cockpit view of the Moonlander simulation"
    >
      <main className="simulationPage">

        {/* Spacecraft Selection Section */}
        <section className="simSection">
        <h1>Select Spacecraft Page</h1>
    
        <p className="simIntroText">
          On this page, you can explore the key features of the Moonlander simulation.
          First, users can select a spacecraft configuration from the available mission profiles.
          Then, the cockpit interface provides a live demonstration of the lander's descent,
          showing real-time telemetry, propulsion, and system status. All values are computed
          by the underlying physics engine and updated continuously.
        </p>
          <div className="simCard">

            <img
              src="/img/simulation/Screenshot_Spacecraft_Selected.png"
              className="simImage"
              alt="Spacecraft selection interface"
            />

            <p className="simCaption">
              <strong>Figure 0 — Spacecraft Selection Interface.</strong>
              Before entering the simulation cockpit, users can select a spacecraft
              configuration from the available mission profiles.
              Each spacecraft is defined by a JSON configuration that specifies
              mass properties, propulsion parameters, and initial mission conditions.
            </p>
          </div>
              <p className="simDescription">
              The selection interface presents all available spacecraft defined
              in the configuration file. The list on the left displays the available
              spacecraft names, while the panel on the right shows the detailed
              configuration parameters of the currently highlighted spacecraft.
              These parameters include mass distribution, thrust limits, specific
              impulse, initial position and velocity, and structural limits.
            </p>

            <p className="simDescription">
              If the user does not explicitly select a spacecraft, the system automatically
              chooses the first spacecraft defined in the JSON configuration as the default.
              This ensures that the simulation backend always receives a valid spacecraft
              configuration, even if no selection is made in the UI.
            </p>

            <p className="simDescription">
              Once a spacecraft is selected (or the default is applied), its configuration
              is transmitted to the simulation backend, where it initializes the physical
              model of the lander. This design separates configuration management from
              the simulation engine, allowing new spacecraft variants to be introduced
              simply by updating the configuration file without modifying simulation code.
            </p>
        </section>

        <h1>Simulation demonstration</h1>
        <section className="simIntro">
          <p>
            The following videos shows the primary cockpit interface of the Moonlander
            simulation during a representative descent run. All quantities are expressed
            in SI units and updated in real time based on the underlying C++ physics model.
          </p>
        </section>

        {/* Video Section */}
        <section className="simSection">
          <div className="simCard">
            <video
              src="/img/simulation/3PhasenRegler.mp4"
              controls
              className="simVideo"
              poster="/img/simulation/Simulation_Beispiel2.png"
            >
              Your browser does not support the video tag.
            </video>
            <p className="simCaption">
              <strong>Figure 1 — 1500m Descent Landing Demonstration.</strong> A complete descent
              from 1500 meters, showing the lander's response to the Adaptive Descent Controller
              and thrust adjustments in real time.
            </p>
          </div>
        </section>

        <section className="simSection">
          <h2>Interface Overview</h2>

          <div className="interfaceBlock">
            <h3>NAV — Navigation</h3>
            <p>
              Displays the primary kinematic state of the lander, including simulation time,
              altitude above ground level, vertical velocity and horizontal velocity.
            </p>
          </div>

          <div className="interfaceBlock">
            <h3>FUEL — Propellant State</h3>
            <p>
              Shows the remaining propellant mass and the current mass flow rate.
              Fuel consumption directly influences thrust availability and mission outcome.
            </p>
          </div>

          <div className="interfaceBlock">
            <h3>LANDING VIEW — Descent Visualization</h3>
            <p>
              Provides a visual representation of the lander during descent. Below 1000 meters
              above ground level, the lander visibly approaches the surface. The autopilot can be activated by clicking on the autopilot button. Thrust can be
              controlled via a continuous slider (0–100%), and the simulation can be started,
              paused or stopped at any time.
            </p>
          </div>

          <div className="interfaceBlock">
            <h3>ENGINE — Propulsion & Loads</h3>
            <p>
              Displays the current thrust output and the user-defined target thrust, both
              expressed in Newton. The resulting acceleration and g-load acting on the lander
              are computed internally and updated in real time.
            </p>
          </div>

          <div className="interfaceBlock">
            <h3>STATUS — System State</h3>
            <p>
              Reports discrete system states such as <em>OPERATIONAL</em>&nbsp;, <em>LANDED</em>&nbsp; or&nbsp;
              <em>DESTROYED</em>, providing an explicit overview of the simulation state machine.
              It also reports in wheter the autopilot is activated or not plus the current information provided by autopilot such as the activated mode.
            </p>
          </div>
        </section>

      </main>
    </Layout>
  );
}