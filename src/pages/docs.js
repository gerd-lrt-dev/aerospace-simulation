import React from 'react';
import Layout from '@theme/Layout';
import '../css/mathematics.css';

export default function Mathematics() {
  return (
    <Layout
      title="Moonlander – Mathematics"
      description="Overview of the mathematical models driving the Moonlander simulation"
    >
      <main className="mathContainer">
        <h1>Mathematics of Moonlander</h1>

        <section className="mathIntro">
          <p>
            This section provides an introduction to the mathematical models behind the Moonlander simulation.
            The aim is to give insight into how thrust, motion, and landing dynamics are calculated.
          </p>

          <p>
            The content is divided into several focused topics:
          </p>

          <div className="mathLinks">

            <a className="mathButton" href="/mathematics/thrust">
              <div className="mathTitle">Thrust Model</div>
              <div className="mathDesc">Engine thrust generation and limits</div>
            </a>

            <a className="mathButton" href="/mathematics/physics">
              <div className="mathTitle">Motion Calculations</div>
              <div className="mathDesc">Equations of motion and vehicle dynamics</div>
            </a>

            <a className="mathButton" href="/mathematics/impact">
              <div className="mathTitle">Impact & Structural Integrity</div>
              <div className="mathDesc">Landing loads and crash conditions</div>
            </a>

            <a className="mathButton" href="/mathematics/adaptiveDescentController">
              <div className="mathTitle">Adaptive Descent Controller</div>
              <div className="mathDesc">Guidance algorithm for controlled landing</div>
            </a>

          </div>

          <p className="note">
            Each subpage contains equations, explanations, and diagrams illustrating the physics
            and calculations used in the simulation.
          </p>
        </section>
      </main>
    </Layout>
  );
}