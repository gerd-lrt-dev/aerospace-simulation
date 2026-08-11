import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import '../css/simulation.css';

export default function Simulation() {
  return (
    <Layout
      title="Simulation | Spaceflight Dynamics Framework"
      description="6DoF spacecraft simulation, propulsion, guidance, control, and real-time visualization within the Spaceflight Dynamics Framework">

      <main className="simulationPage">

        <section className="simIntro">
          <h1>Simulation</h1>

          <p>
            The <strong>Spaceflight Dynamics Framework (SDF)</strong> provides
            a modular C++ simulation environment for spacecraft dynamics,
            propulsion, guidance, control, and real-time telemetry.
          </p>

          <p>
            The current simulation core supports full six-degree-of-freedom
            rigid-body motion, combining three-dimensional translation with
            rotational dynamics and quaternion-based spacecraft attitude.
          </p>

          <p>
            SDF is designed as a reusable simulation framework rather than a
            single fixed scenario. Physical models, propulsion systems,
            numerical methods, control algorithms, and visualization are
            separated through modular interfaces.
          </p>
        </section>


        <section className="simSection">
          <h2>Simulation Demonstration</h2>

          <p>
            The current demonstration application uses an autonomous lunar
            landing scenario to showcase the simulation framework, including
            spacecraft dynamics, propulsion response, RCS activity, guidance,
            fuel state, and real-time cockpit telemetry.
          </p>

          <div className="simCard">
            <img
              src={useBaseUrl('/img/simulation/Simulation_Startseite_SDF.png')}
              alt="Spaceflight Dynamics Framework simulation cockpit"
              className="simImage"
            />

            <a className="simButton" href="/simulation/demo">
              View Simulation Demo
            </a>
          </div>
        </section>


        <section className="simSection">
          <h2>Simulation Capabilities</h2>

          <ul>
            <li>Full 6DoF rigid-body spacecraft dynamics</li>
            <li>Three-dimensional translational motion</li>
            <li>Three-axis rotational dynamics</li>
            <li>Quaternion-based spacecraft attitude</li>
            <li>Central-body lunar gravity</li>
            <li>Multi-engine propulsion and fuel system</li>
            <li>Individual RCS thruster simulation</li>
            <li>Manual and automated flight control</li>
            <li>Adaptive lunar descent guidance</li>
            <li>Real-time telemetry and Qt cockpit visualization</li>
            <li>JSON-based spacecraft configuration</li>
          </ul>
        </section>


        <section className="simSection">
          <h2>Model Scope</h2>

          <p>
            The current simulation represents the spacecraft as a rigid body.
            Translational and rotational dynamics are evaluated independently
            and combined into the complete 6DoF spacecraft state.
          </p>

          <p>
            The model currently excludes higher-order effects such as structural
            flexibility, propellant slosh, dynamic center-of-mass migration,
            and environmental disturbance torques.
          </p>

          <p>
            The 6DoF simulation core is currently undergoing systematic physical
            and numerical verification as the final validation step of the first
            major SDF development milestone.
          </p>
        </section>


        <section className="simSection">
          <h2>Technical Details</h2>

          <p>
            Detailed descriptions of the software architecture, demonstration
            application, and mathematical models are available in the dedicated
            documentation sections.
          </p>

          <div className="simButtonContainer">
            <a className="simButton secondary" href="/simulation/architecture">
              Architecture
            </a>

            <a className="simButton secondary" href="/simulation/demo">
              Demonstration
            </a>

            <a className="simButton secondary" href="/docs">
              Mathematics
            </a>
          </div>
        </section>

      </main>
    </Layout>
  );
}