import React from 'react';
import Layout from '@theme/Layout';
import '../../css/mathematics.css';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function AdaptiveDescentController() {
  return (
    <Layout
      title="Moonlander – Adaptive Descent Controller"
      description="Mathematical model of the energy-based adaptive descent controller">

      <main className="mathContainer">
        <h1>Adaptive Descent Controller</h1>

        <section className="mathSection">
          <p>
            The Adaptive Descent Controller implements an energy-based landing
            guidance strategy for a lunar lander. Its objective is to guide the
            spacecraft from an initial descent state toward a controlled soft
            touchdown while respecting gravitational acceleration, actuator
            limits, and available thrust authority.
          </p>

          <p>
            The controller combines three main elements:
          </p>

          <ul>
            <li>energy-based target descent velocity generation</li>
            <li>brake-ratio-based descent mode selection</li>
            <li>PD velocity tracking with gravity compensation and thrust saturation</li>
          </ul>

          <p>
            The main output of the controller is a commanded thrust force
            <InlineMath math={'F_{T,cmd}'} />, which is passed to the propulsion
            system.
          </p>
        </section>

        <hr />

        <section className="mathSection">
          <h2>System Inputs and Output</h2>

          <p>
            The controller operates on the current vertical descent state and
            the available propulsion authority.
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
                <td><InlineMath math={'v_z'} /></td>
                <td>Current vertical velocity [m/s]</td>
              </tr>

              <tr>
                <td><InlineMath math={'h'} /></td>
                <td>Current altitude above the landing surface [m]</td>
              </tr>

              <tr>
                <td><InlineMath math={'m'} /></td>
                <td>Current spacecraft mass [kg]</td>
              </tr>

              <tr>
                <td><InlineMath math={'g'} /></td>
                <td>Local gravitational acceleration magnitude [m/s²]</td>
              </tr>

              <tr>
                <td><InlineMath math={'F_{T,max}'} /></td>
                <td>Maximum available thrust force [N]</td>
              </tr>

              <tr>
                <td><InlineMath math={'\\Delta t'} /></td>
                <td>Simulation timestep [s]</td>
              </tr>
            </tbody>
          </table>

          <p>
            The controller output is the commanded scalar thrust force:
          </p>

          <BlockMath math={`F_{T,cmd}`} />

          <p>
            This command is later limited by actuator saturation and converted
            into a normalized throttle command if required by the engine
            interface.
          </p>
        </section>

        <hr />

        <section className="mathSection">
          <h2>Maximum Achievable Deceleration</h2>

          <p>
            The maximum upward acceleration available for braking is determined
            by the ratio between maximum thrust force and current spacecraft
            mass, corrected by local gravity.
          </p>

          <BlockMath math={`a_{max}=\\frac{F_{T,max}}{m}-g`} />

          <p>
            To avoid singularities in later calculations, the implementation
            enforces a lower numerical bound:
          </p>

          <BlockMath math={`a_{max}\\geq\\epsilon`} />

          <p>
            where <InlineMath math={'\\epsilon'} /> is a small positive
            constant.
          </p>
        </section>

        <hr />

        <section className="mathSection">
          <h2>Required Braking Distance</h2>

          <p>
            The controller estimates the minimum altitude required to reduce
            the current descent velocity to zero under maximum available
            braking acceleration.
          </p>

          <BlockMath math={`d_{brake}=\\frac{v_z^2}{2a_{max}}`} />

          <p>
            This expression follows from the constant-acceleration kinematic
            relation and provides a local estimate of whether the spacecraft
            still has sufficient altitude to brake safely.
          </p>
        </section>

        <hr />

        <section className="mathSection">
          <h2>Brake Ratio</h2>

          <p>
            The brake ratio compares available altitude with the currently
            required braking distance:
          </p>

          <BlockMath math={`R_{brake}=\\frac{h}{d_{brake}}`} />

          <p>
            It acts as the central scheduling variable of the controller.
          </p>

          <table className="param-table">
            <thead>
              <tr>
                <th>Condition</th>
                <th>Interpretation</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td><InlineMath math={'R_{brake}\\gg1'} /></td>
                <td>Large altitude margin available</td>
              </tr>

              <tr>
                <td><InlineMath math={'R_{brake}\\approx1'} /></td>
                <td>Braking distance approximately equals remaining altitude</td>
              </tr>

              <tr>
                <td><InlineMath math={'R_{brake}<1'} /></td>
                <td>Critical braking condition</td>
              </tr>
            </tbody>
          </table>

          <p>
            The brake ratio is used for both descent mode selection and
            adaptive gain scheduling.
          </p>
        </section>

        <hr />

        <section className="mathSection">
          <h2>Energy-Based Target Descent Velocity</h2>

          <p>
            The target descent velocity is derived from an energy-consistent
            braking relation. The controller computes a velocity that remains
            compatible with the available braking authority and remaining
            altitude.
          </p>

          <BlockMath math={`v_{z,target}=-\\sqrt{2k_r a_{max}h}`} />

          <p>
            Where:
            <br />
            • <strong><InlineMath math={'v_{z,target}'} /></strong> is the commanded vertical descent velocity [m/s]
            <br />
            • <strong><InlineMath math={'k_r'} /></strong> is a reserve or safety factor [-]
            <br />
            • <strong><InlineMath math={'a_{max}'} /></strong> is the maximum achievable braking acceleration [m/s²]
            <br />
            • <strong><InlineMath math={'h'} /></strong> is the current altitude [m]
          </p>

          <p>
            The negative sign indicates downward motion in the selected local
            vertical convention.
          </p>
        </section>

        <hr />

        <section className="mathSection">
          <h2>PD Velocity Tracking</h2>

          <p>
            The velocity controller tracks the target descent velocity using a
            proportional-derivative control law.
          </p>

          <p><strong>Velocity error:</strong></p>

          <BlockMath math={`e_v=v_{z,target}-v_z`} />

          <p><strong>Error derivative:</strong></p>

          <BlockMath math={`\\dot{e}_v=\\frac{e_v-e_{v,prev}}{\\Delta t}`} />

          <p><strong>Control acceleration:</strong></p>

          <BlockMath math={`a_{ctrl}=K_p e_v+K_d\\dot{e}_v`} />

          <p>
            The gains <InlineMath math={'K_p'} /> and
            <InlineMath math={'K_d'} /> are scheduled as a function of the brake
            ratio. This allows the controller to behave more gently when
            sufficient altitude is available and more aggressively during
            terminal braking.
          </p>
        </section>

        <hr />

        <section className="mathSection">
          <h2>Gravity Compensation</h2>

          <p>
            A hover thrust component is added to compensate the local
            gravitational force.
          </p>

          <BlockMath math={`F_{T,hover}=mg`} />

          <p>
            This term represents the scalar thrust force required to maintain
            zero vertical acceleration in the absence of additional control
            action.
          </p>
        </section>

        <hr />

        <section className="mathSection">
          <h2>Total Thrust Command</h2>

          <p>
            The final unsaturated thrust command combines gravity compensation
            and the commanded control acceleration:
          </p>

          <BlockMath math={`F_{T,cmd}=F_{T,hover}+ma_{ctrl}`} />

          <p>
            Substituting the hover thrust term gives:
          </p>

          <BlockMath math={`F_{T,cmd}=m(g+a_{ctrl})`} />
        </section>

        <hr />

        <section className="mathSection">
          <h2>Thrust Saturation</h2>

          <p>
            The commanded thrust force is constrained by the physically
            available actuator range:
          </p>

          <BlockMath math={`F_{T,cmd}=\\min\\left(\\max\\left(F_{T,cmd},0\\right),F_{T,max}\\right)`} />

          <p>
            This prevents the controller from requesting negative thrust or
            thrust above the configured propulsion limit.
          </p>
        </section>

        <hr />

        <section className="mathSection">
          <h2>Normalized Throttle Output</h2>

          <p>
            For propulsion interfaces expecting a normalized throttle command,
            the saturated thrust command is converted into:
          </p>

          <BlockMath math={`u_T=\\frac{F_{T,cmd}}{F_{T,max}}`} />

          <BlockMath math={`0\\leq u_T\\leq1`} />

          <p>
            This normalized command can be passed to engine models that operate
            on percentage or throttle input.
          </p>
        </section>

        <hr />

        <section className="mathSection">
          <h2>Descent Modes</h2>

          <p>
            The controller operates in discrete descent modes determined by the
            brake ratio. These modes define the control strategy and gain
            scheduling regime.
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
                <td><InlineMath math={'R_{brake}>3'} /></td>
                <td>Energy dissipation with large altitude margin</td>
              </tr>

              <tr>
                <td>MODE_B</td>
                <td><InlineMath math={'1.5<R_{brake}\\leq3'} /></td>
                <td>Controlled descent with moderate braking demand</td>
              </tr>

              <tr>
                <td>MODE_C</td>
                <td><InlineMath math={'R_{brake}<1'} /></td>
                <td>Terminal approach under critical braking condition</td>
              </tr>

              <tr>
                <td>MODE_D</td>
                <td>otherwise</td>
                <td>Transition or conservative fallback mode</td>
              </tr>
            </tbody>
          </table>
        </section>

        <hr />

        <section className="mathSection">
          <h2>Descent Phase Diagram</h2>

          <p>
            Figure 1 visualizes the relationship between altitude 
            <InlineMath math={'h'} /> and descent speed
            <InlineMath math={'|v_z|'} /> during the landing phase.
          </p>

          <figure className="diagram">
            <img src="/img/math/ADC1.png" alt="Descent phase diagram" />

            <figcaption>
              <strong>Figure 1 — Safe Descent Corridor.</strong> 
              <p>
                The black curve shows the minimum altitude required to decelerate to zero vertical velocity with maximum braking acceleration <InlineMath math={'a_{max}'}/>.
                State above the curve (green area) provide sufficient altitude margin <InlineMath math={'R_{brake} > 1'}/>,
                while states below the curve (red area)  are dynamically infeasible and require immediate maxium braking.
              </p>

            </figcaption>
          </figure>
        </section>

        <section className="mathSection">
          <p>
            The figure below illustrates how the controller switches between
            descent modes depending on the brake ratio during the landing
            trajectory.
          </p>

          <figure className="diagram">
            <img src="/img/math/ADC2.png" alt="Descent modes diagram" />

            <figcaption>
              <strong>Figure 2 — Descent Mode Selection.</strong>
              <p>
                The brake ratio <InlineMath math={'R_{brake}'}/> governs the controller's operating mode. As the spacecraft descends and <InlineMath math={'R_{brake}'}/> decreasees, 
                the controller transitions from energy dissipation (MODE A) to controlled descen (MODE B), then to a conservative transitions (MODE D),
                and finally to the terminal braking phase (MODE C) until touchdown.
              </p>
            </figcaption>
          </figure>
        </section>

        <hr />

        <section className="mathSection">
          <h2>Controller Characteristics</h2>

          <ul>
            <li>Energy-based target descent velocity generation</li>
            <li>Brake-ratio-based descent mode selection</li>
            <li>Adaptive gain scheduling</li>
            <li>Gravity compensation</li>
            <li>Thrust saturation handling</li>
            <li>Compatible with normalized propulsion interfaces</li>
          </ul>

          <p>
            The controller provides a structured guidance and control baseline
            for reproducible lunar landing simulations. It is not intended as a
            flight-certified landing controller, but as a transparent and
            extensible research model for autonomous descent experiments.
          </p>
        </section>
      </main>
    </Layout>
  );
}