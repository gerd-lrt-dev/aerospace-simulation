import React from 'react';
import Layout from '@theme/Layout';
import '../../css/mathematics.css';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function ImpactModel() {
  return (
    <Layout
      title="Moonlander – Impact & Structural Integrity"
      description="Energy-based impact assessment and structural integrity model used in the Moonlander simulation">

      <main className="mathContainer">

        <h1>Impact & Structural Integrity Model</h1>

        <section className="mathSection">
          <p>
            This section describes the simplified impact and structural integrity
            model used in the Moonlander simulation framework.
          </p>

          <p>
            The implemented approach represents a deterministic low-order
            energy-based impact assessment model intended for real-time
            simulation and autonomous landing research.
          </p>

          <p>
            Instead of resolving detailed structural mechanics, material
            deformation, or landing gear dynamics, the model estimates landing
            severity from the translational kinetic energy associated with the
            touchdown event.
          </p>

          <p>
            The resulting impact severity is then mapped to a normalized
            spacecraft integrity state that controls simulation state
            transitions such as operational landing, crash, or complete
            destruction.
          </p>
        </section>

        <hr />

        {/* ========================================================= */}
        {/* IMPACT ENERGY */}
        {/* ========================================================= */}

        <section className="mathSection">
          <h2>Impact Energy Model</h2>

          <p>
            The impact model assumes that the translational kinetic energy
            associated with the vertical touchdown velocity is converted into
            structural loading during impact.
          </p>

          <p>
            The vertical impact energy is computed as:
          </p>

          <BlockMath
            math={`
              E_{impact}
              =
              \\frac{1}{2}
              mv_{impact}^{2}
            `}
          />

          <p>
            Where:
            <br />
            • <strong><InlineMath math={'E_{impact}'} /></strong> is the impact kinetic energy [J]
            <br />
            • <strong><InlineMath math={'m'} /></strong> is the current spacecraft mass [kg]
            <br />
            • <strong><InlineMath math={'v_{impact}'} /></strong> is the vertical touchdown velocity [m/s]
          </p>

          <p>
            This formulation ensures that both spacecraft mass and touchdown
            velocity contribute consistently to the resulting impact severity.
          </p>
        </section>

        <hr />

        {/* ========================================================= */}
        {/* REFERENCE ENERGY */}
        {/* ========================================================= */}

        <section className="mathSection">
          <h2>Reference Impact Energy</h2>

          <p>
            A reference impact energy is computed from the maximum allowed safe
            landing velocity.
          </p>

          <p>
            This reference defines the nominal structural loading level that the
            spacecraft is assumed to tolerate without critical damage.
          </p>

          <BlockMath
            math={`
              E_{ref}
              =
              \\frac{1}{2}
              mv_{safe}^{2}
            `}
          />

          <p>
            Where:
            <br />
            • <strong><InlineMath math={'E_{ref}'} /></strong> is the safe reference impact energy [J]
            <br />
            • <strong><InlineMath math={'v_{safe}'} /></strong> is the maximum safe landing velocity [m/s]
          </p>
        </section>

        <hr />

        {/* ========================================================= */}
        {/* DAMAGE RATIO */}
        {/* ========================================================= */}

        <section className="mathSection">
          <h2>Normalized Damage Metric</h2>

          <p>
            Structural loading is represented by a normalized impact severity
            metric comparing actual impact energy to the safe reference energy.
          </p>

          <BlockMath
            math={`
              D
              =
              \\frac{E_{impact}}{E_{ref}}
            `}
          />

          <p>
            Where:
            <br />
            • <strong><InlineMath math={'D'} /></strong> is the normalized damage metric [-]
          </p>

          <p>
            The ratio acts as a dimensionless measure of impact severity.
          </p>

          <p>
            Interpretation:
          </p>

          <BlockMath
            math={`
              D > 1
              \\Rightarrow
              E_{impact} > E_{ref}
            `}
          />

          <p>
            Thus, values greater than one indicate that the touchdown energy
            exceeds the predefined safe landing condition.
          </p>
        </section>

        <hr />

        {/* ========================================================= */}
        {/* STRUCTURAL INTEGRITY */}
        {/* ========================================================= */}

        <section className="mathSection">
          <h2>Structural Integrity State</h2>

          <p>
            Spacecraft structural condition is represented by a normalized
            integrity state variable:
          </p>

          <BlockMath
            math={`
              I
              \\in
              [0,1]
            `}
          />

          <p>
            Where:
            <br />
            • <strong><InlineMath math={'I=1'} /></strong> represents a fully intact spacecraft
            <br />
            • <strong><InlineMath math={'I=0'} /></strong> represents complete structural failure
          </p>

          <p>
            The integrity variable does not represent a directly measurable
            physical material property. Instead, it acts as a normalized
            survivability state used for simulation logic and mission-state
            evaluation.
          </p>
        </section>

        <hr />

        {/* ========================================================= */}
        {/* DAMAGE APPLICATION */}
        {/* ========================================================= */}

        <section className="mathSection">
          <h2>Integrity Degradation Model</h2>

          <p>
            Structural degradation is modeled by reducing the integrity state
            according to the normalized damage metric.
          </p>

          <p>
            A configurable damage scaling coefficient is introduced:
          </p>

          <BlockMath
            math={`
              k_D
              \\in
              [0,1]
            `}
          />

          <p>
            The updated structural integrity becomes:
          </p>

          <BlockMath
            math={`
              I_{new}
              =
              I_{old}
              -
              k_D D
            `}
          />

          <p>
            To prevent invalid numerical states, the resulting value is clamped
            to the physically meaningful interval:
          </p>

          <BlockMath
            math={`
              I_{new}
              =
              \\max
              \\left(
              0,
              \\min
              \\left(
              1,
              I_{old}-k_D D
              \\right)
              \\right)
            `}
          />

          <p>
            The coefficient <InlineMath math={'k_D'} /> allows tuning the
            effective structural robustness of the spacecraft model without
            modifying the underlying impact energy formulation.
          </p>
        </section>

        <hr />

        {/* ========================================================= */}
        {/* SPACECRAFT STATES */}
        {/* ========================================================= */}

        <section className="mathSection">
          <h2>Spacecraft State Classification</h2>

          <p>
            The continuous integrity state is mapped to discrete spacecraft
            operational states.
          </p>

          <p>
            This enables the simulation framework to derive mission-level
            consequences from impact severity.
          </p>

          <h3>Destroyed</h3>

          <BlockMath
            math={`
              I \\leq 0
            `}
          />

          <p>
            The spacecraft has lost all structural survivability and is treated
            as completely destroyed.
          </p>

          <h3>Crashed</h3>

          <BlockMath
            math={`
              0 < I < I_{structural}
            `}
          />

          <p>
            The spacecraft remains partially intact but below the minimum
            structural survivability threshold required for continued mission
            operation.
          </p>

          <h3>Landed</h3>

          <BlockMath
            math={`
              z \\leq 0
              \\land
              I \\geq I_{structural}
            `}
          />

          <p>
            The spacecraft has successfully reached the lunar surface while
            remaining above the required structural integrity threshold.
          </p>

          <h3>Operational</h3>

          <BlockMath
            math={`
              z > 0
              \\land
              I > I_{structural}
            `}
          />

          <p>
            The spacecraft remains airborne and structurally operational.
          </p>
        </section>

        <hr />

        {/* ========================================================= */}
        {/* MODEL ASSUMPTIONS */}
        {/* ========================================================= */}

        <section className="mathSection">
          <h2>Model Assumptions and Limitations</h2>

          <p>
            The current implementation intentionally simplifies the physical
            impact process in favor of deterministic real-time execution and
            transparent simulation behavior.
          </p>

          <p>
            The model currently neglects:
          </p>

          <ul>
            <li>lateral impact velocity components</li>
            <li>rotational impact momentum</li>
            <li>landing gear compression and damping</li>
            <li>distributed structural loading</li>
            <li>plastic deformation mechanics</li>
            <li>fracture propagation and material failure models</li>
            <li>terrain-dependent impact effects</li>
          </ul>

          <p>
            Consequently, the model should be interpreted as a low-order
            impact-assessment framework rather than a high-fidelity structural
            crash simulation.
          </p>
        </section>

        <hr />

        {/* ========================================================= */}
        {/* DESIGN RATIONALE */}
        {/* ========================================================= */}

        <section className="mathSection">
          <h2>Design Rationale</h2>

          <p>
            The implemented formulation separates:
          </p>

          <ul>
            <li>impact physics estimation</li>
            <li>structural degradation modeling</li>
            <li>simulation-state classification</li>
          </ul>

          <p>
            This modular structure keeps the implementation computationally
            efficient, numerically robust, and extensible for future research
            campaigns.
          </p>

          <p>
            The framework can later be extended toward:
          </p>

          <ul>
            <li>multi-axis impact analysis</li>
            <li>component-level damage models</li>
            <li>landing gear energy absorption</li>
            <li>terrain interaction models</li>
            <li>probabilistic structural failure estimation</li>
            <li>high-fidelity crash dynamics</li>
          </ul>
        </section>

        <hr />

        {/* ========================================================= */}
        {/* SUMMARY */}
        {/* ========================================================= */}

        <section className="mathSection">
          <h2>Key Characteristics</h2>

          <ul>
            <li>Energy-based impact severity estimation</li>
            <li>Deterministic low-order structural survivability model</li>
            <li>Normalized damage metric formulation</li>
            <li>Configurable structural robustness scaling</li>
            <li>Discrete spacecraft state classification</li>
            <li>Real-time capable implementation</li>
          </ul>
        </section>

      </main>
    </Layout>
  );
}