import React from 'react';
import Layout from '@theme/Layout';
import '../css/mathematics.css';

export default function Mathematics() {
  return (
    <Layout
      title="Moonlander – Mathematics"
      description="Overview of the mathematical models driving the Moonlander simulation">

      <main className="mathContainer">
        <h1>Mathematics of Moonlander</h1>

        <section className="mathIntro">
          <p>
            This section provides an introduction to the mathematical models behind the Moonlander simulation.
            The aim is to give insight into how thrust, motion, and landing dynamics are calculated, and how
            the system reacts in real time.
          </p>

          <p>
            The content is divided into several focused topics. You can explore each topic in detail by
            clicking the links below:
          </p>

          <div className="mathLinks">
            <a className="mathButton" href="/mathematics/thrust">Thrust Model</a>
            <a className="mathButton" href="/mathematics/physics">Motion Calculations</a>
            <a className="mathButton" href="/mathematics/impact">Impact & Structural Integrity</a>
            <a className="mathButton" href="/mathematics/adaptiveDescentController">Adaptive Descent Controller</a>
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
