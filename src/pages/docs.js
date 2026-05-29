import React from 'react';
import Layout from '@theme/Layout';
import '../css/mathematics.css';

export default function Mathematics() {
  return (
    <Layout
      title="Spaceflight Dynamics Framework – Mathematics"
      description="Overview of the mathematical models, propulsion systems, control algorithms, and spacecraft dynamics formulations used within the Spaceflight Dynamics Framework"
    >
      <main className="mathContainer">

        <h1>Mathematics of Spaceflight Dynamics Framework</h1>

        <section className="mathIntro">

          <p>
            This section provides an overview of the mathematical models and
            engineering formulations used throughout the
            <strong> Spaceflight Dynamics Framework (SDF)</strong>.
          </p>

          <p>
            The framework is developed as a research-oriented simulation
            environment focused on spacecraft dynamics, propulsion modeling,
            guidance and control, telemetry generation, and future 6DOF
            spacecraft state propagation.
          </p>

          <p>
            The current mathematical scope focuses primarily on translational
            spacecraft dynamics, propulsion force generation, RCS actuator
            behavior, landing control, and numerical state propagation.
            Future extensions will introduce rigid-body rotational dynamics,
            attitude propagation, torque modeling, and more advanced
            guidance architectures.
          </p>

          <p>
            The content is divided into several focused topics:
          </p>

          <div className="mathLinks">

            <a className="mathButton" href="/mathematics/physics">
              <div className="mathTitle">Motion Calculations</div>
              <div className="mathDesc">
                Equations of motion, vector-based force aggregation,
                numerical integration, and spacecraft dynamics
              </div>
            </a>

            <a className="mathButton" href="/mathematics/thrust">
              <div className="mathTitle">Thrust Model</div>
              <div className="mathDesc">
                Main engine thrust generation, response dynamics,
                fuel consumption, and propulsion force modeling
              </div>
            </a>

            <a className="mathButton" href="/mathematics/RCSBasicModel">
              <div className="mathTitle">Reaction Control System</div>
              <div className="mathDesc">
                Binary thruster dynamics, actuator delay,
                first-order response behavior, and RCS propulsion modeling
              </div>
            </a>

            <a className="mathButton" href="/mathematics/impact">
              <div className="mathTitle">Impact & Structural Integrity</div>
              <div className="mathDesc">
                Landing loads, impact velocity evaluation,
                crash conditions, and integrity assessment
              </div>
            </a>

            <a className="mathButton" href="/mathematics/adaptiveDescentController">
              <div className="mathTitle">Adaptive Descent Controller</div>
              <div className="mathDesc">
                Energy-based guidance, brake-ratio logic,
                adaptive control behavior, and descent stabilization
              </div>
            </a>

          </div>

          <p className="note">
            Each subpage contains equations, diagrams, implementation-oriented
            explanations, and engineering rationale for the corresponding
            simulation subsystem.
          </p>

          <p className="note">
            The mathematical documentation is intended not only as reference
            material for the current implementation, but also as part of the
            long-term transition toward a reusable and extensible spacecraft
            dynamics research framework.
          </p>

        </section>

      </main>
    </Layout>
  );
}