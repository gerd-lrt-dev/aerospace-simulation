import React from 'react';
import Layout from '@theme/Layout';
import '../../css/mathematics.css';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function ImpactModel() {
  return (
    <Layout
      title="Impact & Structural Integrity"
      description="Energy-based impact and structural integrity model used in the Moonlander simulation">

      <main className="mathContainer">

        <h1>Impact & Structural Integrity Model</h1>

        <section className="mathSection">
          <p>
            This section describes the simplified impact and structural integrity model
            used in the Moonlander simulation. The model evaluates touchdown events by
            relating the vertical impact energy to a predefined safe landing reference.
          </p>
          <p>
            The approach is intentionally low-order and deterministic. It does not attempt
            to model material deformation, landing gear mechanics, or detailed crash
            dynamics. Instead, it provides a robust and extensible abstraction for
            simulation state transitions.
          </p>
        </section>

        {/* ===========================
            Impact Energy Model
        ============================ */}
        <section className="mathSection">
          <h2>Impact Energy Model</h2>

          <p>
            At touchdown, the impact severity is estimated from the kinetic energy
            associated with the vertical impact velocity.
          </p>

          <BlockMath math={`E_{impact} = \\frac{1}{2} m v_{impact}^{2}`} />

          <p>
            Where:
            <br />• <strong><InlineMath math={'E_{impact}'} /></strong> is the impact kinetic energy [J]
            <br />• <strong><InlineMath math={'m'} /></strong> is the current spacecraft mass [kg]
            <br />• <strong><InlineMath math={'v_{impact}'} /></strong> is the vertical impact velocity [m/s]
          </p>

          <p>
            This formulation ensures that both spacecraft mass and touchdown velocity
            contribute to the resulting impact load.
          </p>
        </section>

        {/* ===========================
            Reference Energy
        ============================ */}
        <section className="mathSection">
          <h2>Reference Energy</h2>

          <p>
            A reference energy is computed using the maximum safe landing velocity.
            It represents the impact energy that the spacecraft is assumed to tolerate
            without structural damage.
          </p>

          <BlockMath math={`E_{ref} = \\frac{1}{2} m v_{safe}^{2}`} />

          <p>
            Where:
            <br />• <strong><InlineMath math={'E_{ref}'} /></strong> is the safe reference impact energy [J]
            <br />• <strong><InlineMath math={'v_{safe}'} /></strong> is the maximum safe vertical landing velocity [m/s]
          </p>
        </section>

        {/* ===========================
            Damage Ratio
        ============================ */}
        <section className="mathSection">
          <h2>Damage Ratio</h2>

          <p>
            Structural loading is represented by a normalized damage ratio. This ratio
            compares the actual impact energy to the safe reference energy.
          </p>

          <BlockMath math={`D = \\frac{E_{impact}}{E_{ref}}`} />

          <p>
            Where:
            <br />• <strong><InlineMath math={'D'} /></strong> is the normalized damage ratio [-]
          </p>

          <p>
            A value of <InlineMath math={'D = 1'} /> corresponds to an impact at the
            predefined safe landing limit. Values greater than one indicate that the
            impact energy exceeds the nominal safe reference.
          </p>
        </section>

        {/* ===========================
            Integrity Update
        ============================ */}
        <section className="mathSection">
          <h2>Structural Integrity Update</h2>

          <p>
            The spacecraft structural integrity is modeled as a normalized state variable
            in the interval <InlineMath math={'[0, 1]'} />.
          </p>

          <BlockMath math={`I \\in [0, 1]`} />

          <p>
            The updated integrity value is computed by subtracting the damage ratio from
            the previous integrity value:
          </p>

          <BlockMath math={`I_{new} = I_{old} - D`} />

          <p>
            To avoid invalid numerical states, the resulting value is clamped to the
            physically meaningful interval:
          </p>

          <BlockMath math={`I_{new} = \\max\\left(0,\\min\\left(1, I_{old} - D\\right)\\right)`} />

          <p>
            Where:
            <br />• <strong><InlineMath math={'I = 1'} /></strong> represents a fully intact spacecraft
            <br />• <strong><InlineMath math={'I = 0'} /></strong> represents complete structural failure
          </p>
        </section>

        {/* ===========================
            State Classification
        ============================ */}
        <section className="mathSection">
          <h2>Spacecraft State Classification</h2>

          <p>
            The continuous integrity value is mapped to discrete spacecraft states.
            This allows the simulation to derive operational consequences from the
            damage model.
          </p>

          <h3>Destroyed</h3>
          <BlockMath math={`I \\leq 0`} />
          <p>
            The spacecraft has lost all structural integrity. This is treated as a
            terminal failure state.
          </p>

          <h3>Crashed</h3>
          <BlockMath math={`0 < I < I_{structural}`} />
          <p>
            The spacecraft is not completely destroyed, but its structural integrity is
            below the minimum required threshold. Mission continuation is no longer
            possible.
          </p>

          <h3>Landed</h3>
          <BlockMath math={`z \\leq 0 \\; \\land \\; I \\geq I_{structural}`} />
          <p>
            The spacecraft has reached the ground while remaining above the structural
            integrity threshold.
          </p>

          <h3>Operational</h3>
          <BlockMath math={`z > 0 \\; \\land \\; I > I_{structural}`} />
          <p>
            The spacecraft remains above the surface and retains sufficient structural
            integrity for continued operation.
          </p>
        </section>

        {/* ===========================
            Model Assumptions
        ============================ */}
        <section className="mathSection">
          <h2>Model Assumptions</h2>

          <ul>
            <li>Only the vertical impact velocity is considered.</li>
            <li>The spacecraft is treated as a lumped mass during impact evaluation.</li>
            <li>Landing gear deformation and material-specific crash mechanics are neglected.</li>
            <li>The safe landing velocity defines the reference energy threshold.</li>
            <li>Integrity is represented as a normalized scalar state.</li>
          </ul>
        </section>

        {/* ===========================
            Design Rationale
        ============================ */}
        <section className="mathSection">
          <h2>Design Rationale</h2>

          <p>
            The model separates impact physics, structural degradation, and discrete
            spacecraft state transitions. This keeps the implementation transparent and
            suitable for real-time simulation while preserving a physically interpretable
            relationship between touchdown velocity and vehicle damage.
          </p>

          <p>
            The formulation can later be extended toward multi-axis impact evaluation,
            component-level damage, landing gear absorption models, or probabilistic
            structural failure criteria.
          </p>
        </section>

        {/* ===========================
            Summary
        ============================ */}
        <section className="mathSection">
          <h2>Summary</h2>

          <ul>
            <li>Impact severity is estimated using vertical kinetic energy.</li>
            <li>A safe reference energy is derived from the maximum allowed landing velocity.</li>
            <li>Structural damage is represented by a normalized energy ratio.</li>
            <li>Spacecraft integrity is clamped to the interval <InlineMath math={'[0,1]'} />.</li>
            <li>Discrete spacecraft states are derived from integrity and altitude.</li>
          </ul>
        </section>

      </main>
    </Layout>
  );
}