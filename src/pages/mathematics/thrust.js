import React from 'react';
import Layout from '@theme/Layout';
import '../../css/mathematics.css';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function ThrustModel() {
  return (
    <Layout
      title="Moonlander – Thrust Model"
      description="Mathematical model for thrust and fuel consumption in the Moonlander simulation">

      <main className="mathContainer">
        <h1>Thrust Model</h1>

        <section className="mathSection">
          <p>
            The thrust system in Moonlander is modeled as a first-order dynamic system. 
            The actual thrust approaches the target thrust exponentially, with a time constant 
            representing the engine's response delay.
          </p>

          <p><strong>Assumptions:</strong></p>
          <p>
            The engine cannot change its thrust instantaneously. Instead, it behaves like a first-order system (PT1 / first-order lag) with time constant <InlineMath math={'\\tau'} />.
          </p>
          <p>
            This model class is the same as: <br/>
            - RC circuits <br/>
            - Thermal inertia <br/>
            - Motor spin-up dynamics <br/>
            - Low-pass filters
          </p>

          <p><strong>Physical / System Formulation:</strong></p>
          <p>
            The rate of change of thrust is proportional to the difference between commanded and actual thrust:
            <BlockMath math={`\\dot{F} \\propto (F_{cmd} - F)`} /> 
            Introducing the proportionality constant <InlineMath math={'\\frac{1}{\\tau}'} />:
            <BlockMath math={`\\dot{F} = \\frac{1}{\\tau} (F_{cmd} - F)`} /> 
          </p>

          <p><strong>Interpretation:</strong><br/>
            - <strong><InlineMath math={'F_{cmd}'} /></strong>: commanded thrust [N]<br/>
            - <strong><InlineMath math={'F'} /></strong>: actual thrust [N]<br/>
            - <strong><InlineMath math={'\\tau'} /></strong>: engine response time / inertia [s]<br/>
            Limited cases: <br/>
            - <InlineMath math={'\\tau \\rightarrow 0'} />: instantaneous response <br/>
            - Large <InlineMath math={'\\tau'} />: slow engine response
          </p>

          <p><strong>Discrete Form (from ODE)</strong><br/>
            Start from:
            <BlockMath math={`\\dot{F} = \\frac{(F_{cmd} - F)}{\\tau}`} /> 
            Assuming <InlineMath math={'F_{cmd}'} /> is constant over a timestep <InlineMath math={'\\Delta t'} />, the solution is: 
            <BlockMath math={`F(t + \\Delta t) = F(t) e^{-\\Delta t / \\tau} + F_{cmd} (1 - e^{-\\Delta t / \\tau})`} /> 
            Rearranged:
            <BlockMath math={`F_{k + 1} = F_k + (1 - e^{-\\Delta t / \\tau})(F_{cmd, k} - F_k)`} /> 
          </p>
        </section>

          {/* ----------------- Differential Equation Solution ----------------- */}
          <hr />
          <section className="mathSection">
            <h2>Step-by-Step Solution of the Differential Equation</h2>
            <p>
              We solve the first-order ODE:
              <BlockMath math={`\\dot{F} = \\frac{F_{cmd} - F}{\\tau}`} />
            </p>

            <p><strong>Step 1: Rearrange</strong><br/>
              Bring into standard linear form:
              <BlockMath math={'\\dot{F} + \\frac{1}{\\tau} F = \\frac{F_{cmd}}{\\tau}'} />
              Denote:
              <BlockMath math={'a = \\frac{1}{\\tau}, \\quad b = \\frac{F_{cmd}}{\\tau}'} />
            </p>

            <p><strong>Step 2: Homogeneous Solution</strong><br/>
              Solve <BlockMath math={'\\dot{F}_h + a F_h = 0'} />
              Using exponential ansatz:
              <BlockMath math={'F_h(t) = C e^{-a t} = C e^{-t/\\tau}'} />
            </p>

            <p><strong>Step 3: Particular Solution</strong><br/>
              Since the forcing term is constant, try <InlineMath math={'F_p = k'} />.<br/>
              Substitute into ODE:
              <BlockMath math={'0 + a k = b \\implies k = F_{cmd}'} />
            </p>

            <p><strong>Step 4: General Solution</strong><br/>
              <BlockMath math={'F(t) = F_h(t) + F_p = C e^{-t/\\tau} + F_{cmd}'} />
            </p>

            <p><strong>Step 5: Apply Initial Condition</strong><br/>
              At <InlineMath math={'t = 0'} />, <InlineMath math={'F(0) = F_0'} />:
              <BlockMath math={'F_0 = C + F_{cmd} \\implies C = F_0 - F_{cmd}'} />
            </p>

            <p><strong>Step 6: Evaluate at t + Δt</strong><br/>
              <BlockMath math={'F(t + \\Delta t) = (F_0 - F_{cmd}) e^{-\\Delta t/\\tau} + F_{cmd}'} />
              Expanding using <InlineMath math={'F_0 = F(t)'} />:
              <BlockMath math={'F(t + \\Delta t) = F(t) e^{-\\Delta t / \\tau} + F_{cmd} (1 - e^{-\\Delta t / \\tau})'} />
            </p>

            <p><strong>Step 7: Intuition</strong><br/>
              - The system always moves toward <InlineMath math={'F_{cmd}'} />.<br/>
              - The speed of convergence is governed by <InlineMath math={'\\tau'} />.<br/>
              - Smaller <InlineMath math={'\\tau'} /> → faster response.<br/>
              - Larger <InlineMath math={'\\tau'} /> → slower response.
            </p>
          </section>
          <hr />
          {/* ----------------- End Differential Equation Solution ----------------- */}

          <section className="mathSection">
            <h2>Illustration</h2>
            <p>
              The figure below shows the thrust approaching the target over time.
            </p>
            <img 
              src="/img/math/thrust-response.png" 
              alt="Thrust response curve" 
              className="mathImage"
            />
          </section>

          <section className='mathSection'>
            <h2>Fuel Consumption</h2>
            <p>
              <strong>Specific impulse</strong> is defined as:
              <BlockMath math={'I_{sp} = \\frac{F}{\\dot{m} g_0}'} />
              Where:<br/>
              - <strong><InlineMath math={'I_{sp}'} /> </strong>: specific impulse [s]<br/>
              - <strong><InlineMath math={'F'} /> </strong>: thrust [N]<br/>
              - <strong><InlineMath math={'g_0 \\approx 9.81'} /> </strong>: standard gravity [m/s²]
            </p>
            <p>
              Solving for mass flow rate:
              <BlockMath math={'\\dot{m} = \\frac{F}{I_{sp} g_0}'} />
              Fuel mass decreases:
              <BlockMath math={'\\dot{m}_f = -\\frac{F}{I_{sp} g_0}'} />
            </p>
          </section>

           <p>Typical values for common engines:</p>
          <table>
            <thead>
              <tr>
                <th>Engine Type</th>
                <th>Fuel / Propellant</th>
                <th><InlineMath math={'I_{sp} \\, [s]'}/></th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Liquid Rocket</td><td>LOX/LH2</td><td>450–465</td></tr>
              <tr><td>Liquid Rocket</td><td>LOX/Kerosene</td><td>300–350</td></tr>
              <tr><td>Solid Rocket</td><td>HTPB / Black Powder</td><td>200–300</td></tr>
              <tr><td>Ion / Electric</td><td>Xenon, Hall / Electrostatic</td><td>1500–4000</td></tr>
              <tr><td>Hybrid Rocket</td><td>HTPB + N₂O</td><td>250–300</td></tr>
            </tbody>
          </table>

          <section className="mathSection">
            <h2>Key Points</h2>
            <ul>
              <li>First-order exponential response to target thrust</li>
              <li>Real-time fuel consumption derived from thrust and specific impulse</li>
              <li>Time step update allows smooth and stable simulation</li>
            </ul>
          </section>
      </main>
    </Layout>
  );
}
