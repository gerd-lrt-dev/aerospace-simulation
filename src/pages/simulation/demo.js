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

        <section className="simIntro">
          <h1>Simulation Demonstration</h1>
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
              poster="/img/simulation/Simulation_Beispiel.png"
            >
              Your browser does not support the video tag.
            </video>
            <p className="simCaption">
              <strong>Figure 0 — 1500m Descent Landing Demonstration.</strong> A complete descent
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