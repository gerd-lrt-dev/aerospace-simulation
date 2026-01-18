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
            The following screenshot shows the primary cockpit interface of the Moonlander
            simulation during a representative descent run. All quantities are expressed
            in SI units and updated in real time based on the underlying C++ physics model.
          </p>
        </section>

        <section className="simSection">
          <div className="simCard">
            <img
              src="/img/simulation/Simulation_Beispiel.png"
              alt="Moonlander simulation cockpit view"
              className="simImage"
            />
            <p className="simCaption">
              <strong>Figure 1 — Simulation cockpit view.</strong> Navigation data, fuel state,
              propulsion parameters and system status during a controlled descent.
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
              above ground level, the lander visibly approaches the surface. Thrust can be
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
              Reports discrete system states such as <em>OPERATIONAL</em>, <em>LANDED</em> or
              <em>DESTROYED</em>, providing an explicit overview of the simulation state machine.
            </p>
          </div>
        </section>

      </main>
    </Layout>
  );
}
