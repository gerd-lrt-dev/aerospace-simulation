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
            This section describes the translational motion model used in the
            Moonlander simulation framework. The implemented model combines
            Newtonian gravitation, thrust-induced acceleration, and discrete-time
            numerical integration to propagate spacecraft motion.
          </p>

          <p>
            The current implementation focuses on computational efficiency,
            numerical robustness, and deterministic reproducibility for
            real-time simulation and autonomous landing research.
          </p>
        </section>

        <hr />

        {/* ========================================================= */}
        {/* GRAVITY DERIVATION */}
        {/* ========================================================= */}

        <section className="mathSection">
          <h2>Origin of the Lunar Gravity Model</h2>

          <p>
            The gravitational acceleration model is derived from Newton's law
            of universal gravitation combined with Newton's second law of motion.
          </p>

          <p>
            Newton's law of gravitation states that two masses attract each
            other with the force:
          </p>

          <BlockMath
            math={`
              F_G
              =
              G
              \\frac{m_1m_2}{r^2}
            `}
          />

          <p>
            Where:
            <br />
            • <strong><InlineMath math={'F_G'} /></strong> is the gravitational force [N]
            <br />
            • <strong><InlineMath math={'G'} /></strong> is the universal gravitational constant
            <br />
            • <strong><InlineMath math={'m_1,m_2'} /></strong> are the interacting masses [kg]
            <br />
            • <strong><InlineMath math={'r'} /></strong> is the distance between both masses [m]
          </p>

          <p>
            Using Newton's second law:
          </p>

          <BlockMath math={`F=ma`} />

          <p>
            and solving for acceleration yields:
          </p>

          <BlockMath
            math={`
              a
              =
              G
              \\frac{M}{r^2}
            `}
          />

          <p>
            Since celestial mechanics frequently uses the combined quantity:
          </p>

          <BlockMath math={`\\mu = GM`} />

          <p>
            the gravitational acceleration becomes:
          </p>

          <BlockMath
            math={`
              a
              =
              \\frac{\\mu}{r^2}
            `}
          />

          <p>
            This expression describes only the scalar magnitude of the
            gravitational acceleration.
          </p>

          <p>
            To obtain the full vector acceleration directed toward the lunar
            center, the normalized position vector is introduced:
          </p>

          <BlockMath
            math={`
              \\hat{\\mathbf{r}}
              =
              \\frac{\\mathbf{r}}{||\\mathbf{r}||}
            `}
          />

          <p>
            The resulting vector formulation becomes:
          </p>

          <BlockMath
            math={`
              \\mathbf{a}_{grav}
              =
              -
              \\frac{\\mu}{||\\mathbf{r}||^3}
              \\mathbf{r}
            `}
          />

          <p>
            The negative sign indicates that the gravitational acceleration
            always points toward the center of the Moon.
          </p>
        </section>

        <hr />

        {/* ========================================================= */}
        {/* LUNAR GRAVITY */}
        {/* ========================================================= */}

        <section className="mathSection">
          <h2>Lunar Gravity Model</h2>

          <p>
            The Moonlander simulation currently uses a central-body gravity
            model based on Newtonian point-mass gravitation.
          </p>

          <p>
            The gravitational acceleration acting on the spacecraft is computed
            as:
          </p>

          <BlockMath
            math={`
              \\mathbf{a}_{grav}
              =
              -
              \\frac{\\mu}{||\\mathbf{r}||^3}
              \\mathbf{r}
            `}
          />

          <p>
            Where:
            <br />
            • <strong><InlineMath math={'\\mathbf{a}_{grav}'} /></strong> is the gravitational acceleration vector [m/s²]
            <br />
            • <strong><InlineMath math={'\\mu'} /></strong> is the lunar gravitational parameter [m³/s²]
            <br />
            • <strong><InlineMath math={'\\mathbf{r}'} /></strong> is the spacecraft position vector [m]
            <br />
            • <strong><InlineMath math={'||\\mathbf{r}||'} /></strong> is the spacecraft distance from the lunar center [m]
          </p>

          <p>
            This formulation naturally produces the inverse-square dependence
            of gravity while preserving the correct radial acceleration
            direction.
          </p>
        </section>

        <hr />

        {/* ========================================================= */}
        {/* THRUST */}
        {/* ========================================================= */}

        <section className="mathSection">
          <h2>Thrust Acceleration</h2>

          <p>
            The spacecraft propulsion system generates acceleration by applying
            a thrust force vector along the engine thrust direction.
          </p>

          <p>
            The generated thrust force vector is:
          </p>

          <BlockMath
            math={`
              \\mathbf{F}_{thr}
              =
              F_T
              \\hat{\\mathbf{d}}
            `}
          />

          <p>
            Where:
            <br />
            • <strong><InlineMath math={'F_T'} /></strong> is the scalar thrust force magnitude [N]
            <br />
            • <strong><InlineMath math={'\\hat{\\mathbf{d}}'} /></strong> is the normalized thrust direction vector [-]
          </p>

          <p>
            Applying Newton's second law yields the thrust-induced acceleration:
          </p>

          <BlockMath
            math={`
              \\mathbf{a}_{thrust}
              =
              \\frac{\\mathbf{F}_{thr}}{m}
              =
              \\frac{F_T\\hat{\\mathbf{d}}}{m}
            `}
          />

          <p>
            Where:
            <br />
            • <strong><InlineMath math={'\\mathbf{a}_{thrust}'} /></strong> is the thrust acceleration vector [m/s²]
            <br />
            • <strong><InlineMath math={'m'} /></strong> is the current spacecraft mass [kg]
          </p>
        </section>

        <hr />

        {/* ========================================================= */}
        {/* TOTAL ACCELERATION */}
        {/* ========================================================= */}

        <section className="mathSection">
          <h2>Total Translational Acceleration</h2>

          <p>
            The total translational acceleration acting on the spacecraft is
            obtained through superposition of gravitational acceleration and
            thrust-induced acceleration.
          </p>

          <BlockMath
            math={`
              \\mathbf{a}
              =
              \\mathbf{a}_{grav}
              +
              \\mathbf{a}_{thrust}
            `}
          />

          <p>
            Substituting both acceleration models gives:
          </p>

          <BlockMath
            math={`
              \\mathbf{a}
              =
              -
              \\frac{\\mu}{||\\mathbf{r}||^3}
              \\mathbf{r}
              +
              \\frac{F_T\\hat{\\mathbf{d}}}{m}
            `}
          />
        </section>

        <hr />

        {/* ========================================================= */}
        {/* NUMERICAL INTEGRATION */}
        {/* ========================================================= */}

        <section className="mathSection">
          <h2>Discrete-Time Motion Integration</h2>

          <p>
            Spacecraft motion is propagated in discrete simulation steps using
            constant-acceleration kinematic relations over one timestep
            <InlineMath math={'\\Delta t'} />.
          </p>

          <p>
            Velocity propagation:
          </p>

          <BlockMath
            math={`
              \\mathbf{v}(t+\\Delta t)
              =
              \\mathbf{v}(t)
              +
              \\mathbf{a}\\Delta t
            `}
          />

          <p>
            Position propagation:
          </p>

          <BlockMath
            math={`
              \\mathbf{p}(t+\\Delta t)
              =
              \\mathbf{p}(t)
              +
              \\mathbf{v}(t)\\Delta t
              +
              \\frac{1}{2}
              \\mathbf{a}
              \\Delta t^2
            `}
          />

          <p>
            Substituting the complete acceleration model yields:
          </p>

          <BlockMath
            math={`
              \\mathbf{v}(t+\\Delta t)
              =
              \\mathbf{v}(t)
              +
              \\left(
              -
              \\frac{\\mu}{||\\mathbf{r}||^3}
              \\mathbf{r}
              +
              \\frac{F_T\\hat{\\mathbf{d}}}{m}
              \\right)
              \\Delta t
            `}
          />

          <BlockMath
            math={`
              \\mathbf{p}(t+\\Delta t)
              =
              \\mathbf{p}(t)
              +
              \\mathbf{v}(t)\\Delta t
              +
              \\frac{1}{2}
              \\left(
              -
              \\frac{\\mu}{||\\mathbf{r}||^3}
              \\mathbf{r}
              +
              \\frac{F_T\\hat{\\mathbf{d}}}{m}
              \\right)
              \\Delta t^2
            `}
          />

          <p>
            This integration scheme provides a numerically stable and
            computationally efficient propagation method suitable for
            deterministic real-time simulation.
          </p>
        </section>

        <hr />

        {/* ========================================================= */}
        {/* G LOAD */}
        {/* ========================================================= */}

        <section className="mathSection">
          <h2>Proper Acceleration and G-Load</h2>

          <p>
            The experienced spacecraft g-load is computed from the proper
            acceleration, which excludes gravitational free-fall acceleration.
          </p>

          <BlockMath
            math={`
              \\mathbf{a}_{proper}
              =
              \\mathbf{a}
              -
              \\mathbf{a}_{grav}
            `}
          />

          <p>
            The corresponding g-load becomes:
          </p>

          <BlockMath
            math={`
              g_{load}
              =
              \\frac{
              ||\\mathbf{a}_{proper}||
              }{
              g_0
              }
            `}
          />

          <p>
            Where:
            <br />
            • <strong><InlineMath math={'g_0'} /></strong> is standard Earth gravity [m/s²]
          </p>

          <p>
            This quantity represents the acceleration experienced by the
            spacecraft structure and potential crew.
          </p>
        </section>

        <hr />

        {/* ========================================================= */}
        {/* SUMMARY */}
        {/* ========================================================= */}

        <section className="mathSection">
          <h2>Key Characteristics</h2>

          <ul>
            <li>Newtonian central-body gravity model</li>
            <li>Vector-based thrust force representation</li>
            <li>Physically consistent translational acceleration model</li>
            <li>Discrete-time rigid-body motion propagation</li>
            <li>Proper acceleration and g-load estimation</li>
            <li>Deterministic and real-time capable implementation</li>
          </ul>
        </section>

      </main>
    </Layout>
  );
}