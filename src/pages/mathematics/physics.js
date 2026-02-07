import React from 'react';
import Layout from '@theme/Layout';
import '../../css/mathematics.css';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function PhysicsModel() {
  return (
    <Layout
      title="Moonlander – Physics & Motion Model"
      description="Mathematical and physical motion model used in the Moonlander simulation">

      <main className="mathContainer">
        <h1>Physics & Motion Model</h1>

        <section className="mathSection">
          <p>
            This section describes the physical motion model used in the Moonlander simulation.
            It covers gravitational modeling, thrust-induced acceleration, numerical integration
            of motion, and the computation of experienced g-loads.
          </p>
        </section>

        {/* ============================
            Gravitational Model
        ============================ */}
        <section className="mathSection">
          <h2>Lunar Gravity Model</h2>

          <p>
            The gravitational acceleration is modeled as a radial force pointing toward
            the center of the Moon. Its magnitude decreases with the square of the distance
            from the lunar center.<br/>
            From orbital mechanics follows:
          </p>

          <BlockMath math={`\\vec{a}_{grav} = - \\frac{\\mu}{||\\vec{r}||³} \\vec{r}`} />
          Or rather:
          <BlockMath math={`\\vec{a}_{grav} = - \\frac{\\mu}{||\\vec{r}||2}`} />

          <p>
            Where:
            <br />• <strong><InlineMath math={'\\vec{r}'} /></strong> is the spacecraft position vector
            <br />• <strong><InlineMath math={'||\\vec{r}||'} /></strong>distance from the lunar center
            <br />• <strong><InlineMath math={'\\mu'} /></strong> is the lunar gravitational constant
          </p>
        </section>

        {/* ============================
            Acceleration Model
        ============================ */}
          <section className="mathSection">
          <h2>Thrust Acceleration</h2>
          <p>
          The acceleration produced by the spacecraft's engines is calculated by dividing the 
          thrust force by the spacecraft mass and applying it along the thrust direction:
          </p>
          <BlockMath math={`\\vec{a}_{thrust} = \\vec{d} \\cdot \\frac{F_{T}}{m}`} />
          <p>
            Where:
            <br />• <strong><InlineMath math={'\\vec{a}_{thrust}'} /></strong> is the thrust acceleration vector [m/s²]
            <br />• <strong><InlineMath math={'\\vec{d}'} /></strong> is the unit vector in the direction of the thrust force
            <br />• <strong><InlineMath math={'F_{T}'} /></strong> is the thrust magnitude produced by the engine [N]
            <br />• <strong><InlineMath math={'m'} /></strong> is the current spacecraft mass [kg]
          </p>
          </section>
        <section className="mathSection">
          <h2>Total Acceleration</h2>

          <p>
            The total acceleration acting on the spacecraft is the superposition of
            thrust-induced acceleration and gravitational acceleration.
          </p>

          <BlockMath math={`\\vec{a} = \\vec{a}_{grav} + \\vec{a}_{thrust}`} />
          <BlockMath math={`\\vec{a} = \\frac{\\mu}{||\\vec{r}||³} \\vec{r} + \\vec{d} \\cdot \\frac{F_{T}}{m}`} />
        </section>

        {/* ============================
            Numerical Integration
        ============================ */}
        <section className="mathSection">
          <h2>Motion Integration</h2>

          <p>
            Position and velocity are updated using constant-acceleration kinematic equations
            over a discrete time step <InlineMath math={'\\Delta t'} />.
          </p>

          <BlockMath math={`\\vec{v}(t + \\Delta t) = \\vec{v}(t) + \\vec{a} \\cdot \\Delta t`} />
          Or rather: 
          <BlockMath math={`\\vec{v}(t + \\Delta t) = \\vec{v}(t) + (\\frac{\\mu}{||\\vec{r}||³} \\vec{r} + \\vec{d} \\cdot \\frac{F_{T}}{m}) \\cdot \\Delta t`} />
          As well as position:
          <BlockMath math={`\\vec{p}(t + \\Delta t) = \\vec{p}(t) + \\vec{v}(t) \\cdot \\Delta t + \\frac{1}{2} \\vec{a} \\cdot \\Delta t^2`} />
          Or rather:
          <BlockMath math={`\\vec{p}(t + \\Delta t) = \\vec{p}(t) + \\vec{v}(t) \\cdot \\Delta t + \\frac{1}{2} (\\frac{\\mu}{||\\vec{r}||³} \\vec{r} + \\vec{d} \\cdot \\frac{F_{T}}{m}) \\cdot \\Delta t^2`} />

          <p>
            This approach provides a stable and computationally efficient integration scheme
            suitable for real-time simulation.
          </p>
        </section>

        {/* ============================
            G-Load Computation
        ============================ */}
        <section className="mathSection">
          <h2>G-Load (Proper Acceleration)</h2>

          <p>
            The experienced g-load is computed from the proper acceleration, which excludes
            gravitational acceleration.
          </p>

          <BlockMath math={`a_{proper} = a_{total} - \\vec{g}`} />
          <BlockMath math={`g_{load} = \\frac{\\|a_{proper}\\|}{g_0}`} />

          <p>
            Where <strong>g_0 = 9.80665 m/s^2</strong> is standard Earth gravity.
            This value represents the acceleration actually felt by the spacecraft structure
            and crew.
          </p>
        </section>

        {/* ============================
            Summary
        ============================ */}
        <section className="mathSection">
          <h2>Summary</h2>
          <ul>
            <li>Radial inverse-square gravity model for the Moon</li>
            <li>Vector-based thrust and acceleration computation</li>
            <li>Discrete-time kinematic integration</li>
            <li>Physically correct g-load estimation</li>
          </ul>
        </section>

      </main>
    </Layout>
  );
}
