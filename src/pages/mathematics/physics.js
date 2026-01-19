import React from 'react';
import Layout from '@theme/Layout';
import '../../css/mathematics.css';

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
            from the lunar center.
          </p>

          <pre>
{`r = R_moon + ||p||

g_vec = - (p̂) * (μ_moon / r²)`}
          </pre>

          <p>
            Where:
            <br />• <strong>p</strong> is the spacecraft position vector
            <br />• <strong>p̂</strong> is the normalized position vector
            <br />• <strong>R_moon</strong> is the lunar radius
            <br />• <strong>μ_moon</strong> is the lunar gravitational constant
          </p>
        </section>

        {/* ============================
            Acceleration Model
        ============================ */}
        <section className="mathSection">
          <h2>Total Acceleration</h2>

          <p>
            The total acceleration acting on the spacecraft is the superposition of
            thrust-induced acceleration and gravitational acceleration.
          </p>

          <pre>
{`F_thrust = T * d_thrust

a_total = (F_thrust / m) + g_vec`}
          </pre>

          <p>
            Where:
            <br />• <strong>T</strong> is the current thrust magnitude
            <br />• <strong>d_thrust</strong> is the unit thrust direction vector
            <br />• <strong>m</strong> is the total spacecraft mass
          </p>
        </section>

        {/* ============================
            Numerical Integration
        ============================ */}
        <section className="mathSection">
          <h2>Motion Integration</h2>

          <p>
            Position and velocity are updated using constant-acceleration kinematic equations
            over a discrete time step <code>Δt</code>.
          </p>

          <pre>
{`v(t + Δt) = v(t) + a * Δt

p(t + Δt) = p(t) + v(t) * Δt + 0.5 * a * Δt²`}
          </pre>

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

          <pre>
{`a_proper = a_total - g_vec

g_load = ||a_proper|| / g₀`}
          </pre>

          <p>
            Where <strong>g₀ = 9.80665 m/s²</strong> is standard Earth gravity.
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
