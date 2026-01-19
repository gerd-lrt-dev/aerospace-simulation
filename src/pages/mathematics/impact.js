import React from 'react';
import Layout from '@theme/Layout';
import '../../css/mathematics.css';

export default function ImpactModel() {
  return (
    <Layout
      title="Impact & Structural Integrity"
      description="Energy-based impact model and spacecraft state transitions">

      <main className="mathContainer">

        <h1>Impact & Structural Integrity Model</h1>

        {/* ===========================
            INTRODUCTION
        ============================ */}
        <section className="mathSection">
          <p>
            This page describes how landing impacts are evaluated in the Moonlander simulation.
            The model connects physical impact energy with structural integrity and derives
            discrete spacecraft states from this continuous damage representation.
          </p>
          <p>
            The approach is intentionally simplified, focusing on clarity, robustness, and
            extensibility rather than material-specific crash mechanics.
          </p>
        </section>

        {/* ===========================
            LEVEL 1 – ENERGY MODEL
        ============================ */}
        <section className="mathSection">
          <h2>Level 1 — Energy Model</h2>

          <p>
            Landing damage is evaluated using the kinetic energy of the spacecraft at the
            moment of ground contact.
          </p>

          <div className="mathFormula">
            E = 1 / 2 · m · v²
          </div>

          <ul>
            <li><strong>m</strong> — total spacecraft mass</li>
            <li><strong>v</strong> — vertical impact velocity</li>
          </ul>

          <p>
            This formulation ensures that both velocity and mass naturally influence the
            resulting structural load.
          </p>
        </section>

        {/* ===========================
            REFERENCE ENERGY
        ============================ */}
        <section className="mathSection">
          <h3>Reference Energy (Safe Landing)</h3>

          <p>
            A reference energy is computed using a predefined maximum safe landing velocity.
            This value represents the highest impact energy the structure can absorb without damage.
          </p>

          <div className="mathFormula">
            E<sub>ref</sub> = 1 / 2 · m · v<sub>safe</sub>²
          </div>
        </section>

        {/* ===========================
            IMPACT ENERGY
        ============================ */}
        <section className="mathSection">
          <h3>Impact Energy</h3>

          <p>
            The actual energy at touchdown is calculated from the measured impact velocity:
          </p>

          <div className="mathFormula">
            E<sub>impact</sub> = 1 / 2 · m · v<sub>impact</sub>²
          </div>
        </section>

        {/* ===========================
            LEVEL 2 – INTEGRITY MODEL
        ============================ */}
        <section className="mathSection">
          <h2>Level 2 — Integrity Model</h2>

          <p>
            Structural damage is expressed as a normalized ratio between impact energy and
            reference energy:
          </p>

          <div className="mathFormula">
            D = E<sub>impact</sub> / E<sub>ref</sub>
          </div>

          <p>
            The spacecraft integrity is reduced proportionally to this damage value:
          </p>

          <div className="mathFormula">
            I<sub>new</sub> = I<sub>old</sub> − D
          </div>

          <p>
            To maintain numerical stability, integrity is clamped to a physically meaningful range:
          </p>

          <div className="mathFormula">
            I ∈ [0, 1]
          </div>

          <ul>
            <li><strong>I = 1.0</strong> — fully intact</li>
            <li><strong>I = 0.0</strong> — complete structural failure</li>
          </ul>
        </section>

        {/* ===========================
            LEVEL 3 – STATE MACHINE
        ============================ */}
        <section className="mathSection">
          <h2>Level 3 — Spacecraft State Machine</h2>

          <p>
            The spacecraft state is derived deterministically from the current integrity
            value and the vertical position of the lander.
          </p>

          <h3>Destroyed (Terminal)</h3>
          <div className="mathFormula">
            I ≤ 0
          </div>
          <p>
            The spacecraft is completely destroyed. This is a terminal state and the simulation ends.
          </p>

          <h3>Crashed (Terminal but Stable)</h3>
          <div className="mathFormula">
            0 &lt; I &lt; I<sub>structural</sub>
          </div>
          <p>
            Structural failure occurred, but the spacecraft remains physically stable.
            Mission continuation is no longer possible.
          </p>

          <h3>Landed (Successful Touchdown)</h3>
          <div className="mathFormula">
            z ≤ 0 ∧ I ≥ I<sub>structural</sub>
          </div>
          <p>
            The spacecraft touched down successfully within structural limits.
          </p>

          <h3>Operational</h3>
          <div className="mathFormula">
            z &gt; 0 ∧ I &gt; I<sub>structural</sub>
          </div>
          <p>
            The spacecraft remains controllable. If <strong>I &lt; 1</strong>, the system is
            considered operational but damaged.
          </p>
        </section>

        {/* ===========================
            DESIGN RATIONALE
        ============================ */}
        <section className="mathSection">
          <h2>Design Rationale</h2>
          <p>
            This three-layer model cleanly separates physical impact energy, structural damage,
            and discrete system behavior. It avoids arbitrary thresholds while remaining intuitive,
            testable, and extensible.
          </p>
          <p>
            The structure is well suited for future extensions such as multi-axis impacts,
            component-based damage models, or material-specific absorption limits.
          </p>
        </section>

      </main>
    </Layout>
  );
}
