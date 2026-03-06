import React from 'react';
import Layout from '@theme/Layout';
import '../../css/mathematics.css';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function adaptiveDescentController() {
  return (
    <Layout
      title="Moonlander – Adaptive Descent Controller"
      description="Mathematical model of an adaptive descent autopilot controller">

      <main className="mathContainer">
        <h1>Adaptive Descent Controller</h1>

        <section className="mathSection">

          <p><strong>Overview:</strong></p>

          <p>
            The Adaptive Descent Controller implements an energy-guided landing strategy for a planetary or lunar lander.<br/>
            Its objective is to safely guide the spacecraft from an initial descent state to a soft touchdown while respecting actuator limits and physical constraints.
          </p>  

          <p>
            The controller dynamically adjusts:<br/>
            - target descent velocity<br/>
            - controller gains<br/>
            - descent mode
          </p>

          <p>
            based on the <strong>brake ratio</strong>, which compares the remaining altitude to the required braking distance.
            The final thrust command is generated using a PD velocity controller combined with gravity compensation.<br/>
            Both the controller and the regulator are derived from a virtual base class, enabling modular interchangeability of the respective models at runtime (see architecture).
          </p>

        </section>


        {/* ----------------- System Inputs and Outputs ----------------- */}

        <hr />

        <section className="mathSection">

          <h2>System Inputs and Outputs</h2>

          <p><strong>Inputs</strong></p>

          <p>
            The controller requires the following physical parameters:
          </p>

          <table className="param-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Description</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td><InlineMath math={'v'} /></td>
                <td>Current vertical velocity</td>
              </tr>

              <tr>
                <td><InlineMath math={'h'} /></td>
                <td>Current altitude</td>
              </tr>

              <tr>
                <td><InlineMath math={'m'} /></td>
                <td>Current spacecraft mass</td>
              </tr>

              <tr>
                <td><InlineMath math={'g'} /></td>
                <td>Local gravitational acceleration</td>
              </tr>

              <tr>
                <td><InlineMath math={'T_{max}'} /></td>
                <td>Maximum available thrust</td>
              </tr>

              <tr>
                <td><InlineMath math={'dt'} /></td>
                <td>Simulation timestep</td>
              </tr>

            </tbody>
          </table>

          <p><strong>Output</strong></p>

          <p>
            The controller produces:
          </p>

          <BlockMath math={`T_{cmd}`} />

          <p>
            which represents the <strong>thrust command in Newtons</strong> for the next timestep.
          </p>

        </section>


        {/* ----------------- Maximum Achievable Acceleration ----------------- */}

        <hr />

        <section className="mathSection">

          <h2>Maximum Achievable Acceleration</h2>

          <p>
            The maximum upward acceleration available to the lander is determined by the thrust-to-weight ratio.
          </p>

          <BlockMath math={`a_{max} = \\dfrac{T_{max}}{m} - g`} />

          <p>
            To avoid numerical issues the implementation ensures
          </p>

          <BlockMath math={`a_{max} \\geq \\epsilon`} />

          <p>
            where <InlineMath math={'\\epsilon'} /> is a small constant.
          </p>

        </section>


        {/* ----------------- Braking Distance ----------------- */}

        <hr />

        <section className="mathSection">

          <h2>Braking Distance</h2>

          <p>
            The controller estimates the <strong>minimum distance required to stop the current descent velocity</strong> using basic kinematics.
          </p>

          <BlockMath math={`d_{brake} = \\dfrac{v^2}{2 \\cdot a_{max}}`} />

        </section>


        {/* ----------------- Brake Ratio ----------------- */}

        <hr />

        <section className="mathSection">

          <h2>Brake Ratio</h2>

          <p>
            The <strong>brake ratio</strong> determines how much altitude remains relative to the required stopping distance.
          </p>

          <BlockMath math={`R_{brake} = \\dfrac{h}{d_{brake}}`} />

          <p>Interpretation:</p>

          <table className="param-table">

            <thead>
              <tr>
                <th>Symbol</th>
                <th>Description</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td><InlineMath math={'R_{brake} >> 1'} /></td>
                <td>Plenty of altitude available</td>
              </tr>

              <tr>
                <td><InlineMath math={'R_{brake} \\approx 1'} /></td>
                <td>Braking must start</td>
              </tr>

              <tr>
                <td><InlineMath math={'R_{brake} < 1'} /></td>
                <td>Critical braking required</td>
              </tr>

            </tbody>

          </table>

          <p>
            This parameter drives both:<br/>
            - descent mode selection<br/>
            - controller gain scheduling
          </p>

        </section>


        {/* ----------------- Target Velocity ----------------- */}

        <hr />

        <section className="mathSection">

          <h2>Target Descent Velocity</h2>

          <p>
            The desired descent velocity is computed using an energy-based guidance law.
          </p>

          <BlockMath math={'v_{target} = - \\sqrt{2 \\cdot k_r \\cdot a_{max} \\cdot h}'} />

          <p>
            where the reserve factor <InlineMath math={'k_r'} /> provides an additional safety margin.<br/>
            The negative sign ensures downward motion.
          </p>

        </section>


        {/* ----------------- PD Controller ----------------- */}

        <hr />

        <section className="mathSection">

          <h2>PD Velocity Controller</h2>

          <p>
            The controller attempts to track the target velocity using a <strong>Proportional-Derivative (PD)</strong> controller.
          </p>

          <strong>Control Error</strong>

          <BlockMath math={'e = v_{target} - v'} />

          <strong>Derivative Term</strong>

          <BlockMath math={'\\dot{e} = \\dfrac{e - e_{old}}{dt}'} />

          <strong>Control Acceleration</strong>

          <BlockMath math={'a_{ctrl} = K_p \\cdot e + K_d \\cdot \\dot{e}'} />

          <p>
            where<br/>
            - <InlineMath math={'K_p'} /> = proportional gain<br/>
            - <InlineMath math={'K_d'} /> = derivative gain<br/>
            These gains are <strong>adaptively interpolated based on the brake ratio</strong>.
          </p>

        </section>


        {/* ----------------- Gravity Compensation ----------------- */}

        <hr />

        <section className="mathSection">

          <h2>Gravity Compensation</h2>

          <p>
            To maintain stable descent, the controller adds a hover thrust component that compensates gravity.
          </p>

          <BlockMath math={'T_{hover} = m \\cdot g'} />

        </section>


        {/* ----------------- Total Thrust ----------------- */}

        <hr />

        <h2>Total Thrust Command</h2>

        <p>
          The final thrust command combines gravity compensation and the control acceleration.
        </p>

        <BlockMath math={'T_{cmd} = T_{hover} + m \\cdot a_{ctrl}'} />


        {/* ----------------- Saturation ----------------- */}

        <hr />

        <section className="mathSection">

          <h2>Thrust Saturation</h2>

          <p>
            The commanded thrust is limited to the physically available actuator range.
          </p>

          <BlockMath math={'T_{cmd} = min(max(T_{cmd}, 0), T_{max})'} />

        </section>


        {/* ----------------- Normalized Output ----------------- */}

        <hr />

        <h2>Normalized Throttle Output</h2>

        <p>
          For actuator interfaces expecting a normalized throttle command:
        </p>

        <BlockMath math={'u = \\dfrac{T_{cmd}}{T_{max}}'} />

        <BlockMath math={'0 \\leq u \\leq 1'} />


        {/* ----------------- Descent Modes ----------------- */}

        <hr />

        <h2>Descent Modes</h2>

        <p>
          The descent controller operates in four phases determined by the brake ratio.
        </p>

        <table className="param-table">

          <thead>
            <tr>
              <th>Mode</th>
              <th>Condition</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>MODE_A</td>
              <td><InlineMath math={'R_{brake} > 3'} /></td>
              <td>Energy Dissipation</td>
            </tr>

            <tr>
              <td>MODE_B</td>
              <td><InlineMath math={'1.5 < R_{brake} \\leq 3'} /></td>
              <td>Controlled Descent</td>
            </tr>

            <tr>
              <td>MODE_C</td>
              <td><InlineMath math={'R_{brake} < 1'} /></td>
              <td>Terminal Approach</td>
            </tr>

            <tr>
              <td>MODE_D</td>
              <td>otherwise</td>
              <td>Critical Braking</td>
            </tr>

          </tbody>

        </table>


        {/* ----------------- Figures ----------------- */}

        <hr />

        <section className="mathSection">

          <h2>Descent Phase Diagram</h2>

          <p>
            The diagram in Figure 1 visualizes the relationship between altitude <InlineMath math={'h'} /> and descent velocity <InlineMath math={'|v|'} /> during the landing phase.
          </p>

          <BlockMath math={'h = \\dfrac{v^2}{2a_{max}}'} />

          <p>
            This curve represents the minimum altitude required to decelerate the spacecraft to zero velocity when applying maximum thrust.
          </p>

          <figure className="diagram">

            <img src="/img/math/VelAlt.png" alt="Descent phase diagram" />

            <figcaption>
              <strong>Figure 1 — Safe Descent Corridor.</strong>
            </figcaption>

          </figure>

        </section>


        <section className="mathSection">

          <p>
            The figure below illustrates how the controller switches between descent modes depending on the brake ratio during the landing trajectory.
          </p>

          <figure className="diagram">

            <img src="/img/math/DescentModes.png" alt="Descent modes diagram" />

            <figcaption>
              <strong>Figure 2 — Descent Mode Selection.</strong>
            </figcaption>

          </figure>

        </section>


        {/* ----------------- Characteristics ----------------- */}

        <hr />

        <h2>Characteristics of the Controller</h2>

        <p><strong>Advantages</strong></p>

        <ul>
          <li>Energy-based descent planning</li>
          <li>Adaptive gain scheduling</li>
          <li>Gravity compensation</li>
          <li>Actuator saturation handling</li>
        </ul>

        <p>
          The controller therefore provides stable, safe and efficient landing behaviour across different phases of the descent trajectory.
        </p>

        <hr/>

      </main>

    </Layout>
  );
}