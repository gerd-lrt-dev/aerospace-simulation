import React from 'react';
import Layout from '@theme/Layout';
import '../../css/mathematics.css';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function ThrustModel() {
  return (
    <Layout
      title="Moonlander – Thrust Model"
      description="Mathematical model for thrust force generation and fuel consumption in the Moonlander simulation">

      <main className="mathContainer">
        <h1>Thrust Model</h1>

        <section className="mathSection">
          <p>
            The main propulsion system in Moonlander is modeled as a first-order
            dynamic system. The actual thrust force approaches the commanded
            thrust force exponentially, with a time constant representing the
            engine response delay.
          </p>

          <p><strong>Assumptions:</strong></p>

          <p>
            The engine cannot change its thrust force instantaneously. Instead,
            it behaves like a first-order system (PT1 / first-order lag) with
            time constant <InlineMath math={'\\tau'} />.
          </p>

          <p>
            This model class is mathematically equivalent to:
            <br />
            - RC circuits
            <br />
            - Thermal inertia
            <br />
            - Motor spin-up dynamics
            <br />
            - Low-pass filters
          </p>

          <p><strong>Physical / System Formulation:</strong></p>

          <p>
            The rate of change of thrust force is proportional to the difference
            between commanded and actual thrust force:
          </p>

          <BlockMath
            math={`
              \\dot{F}_T
              \\propto
              (F_{T,cmd}-F_T)
            `}
          />

          <p>
            Introducing the proportionality constant
            <InlineMath math={'\\frac{1}{\\tau}'} />:
          </p>

          <BlockMath
            math={`
              \\dot{F}_T
              =
              \\frac{1}{\\tau}
              (F_{T,cmd}-F_T)
            `}
          />

          <p><strong>Interpretation:</strong></p>

          <p>
            - <strong><InlineMath math={'F_{T,cmd}'} /></strong>: commanded thrust force [N]
            <br />
            - <strong><InlineMath math={'F_T'} /></strong>: actual thrust force [N]
            <br />
            - <strong><InlineMath math={'\\tau'} /></strong>: engine response time / inertia [s]
          </p>

          <p>
            Limiting cases:
            <br />
            - <InlineMath math={'\\tau \\rightarrow 0'} /> → instantaneous response
            <br />
            - Large <InlineMath math={'\\tau'} /> → slow engine response
          </p>

          <p><strong>Discrete Form (from ODE)</strong></p>

          <p>
            Starting from:
          </p>

          <BlockMath
            math={`
              \\dot{F}_T
              =
              \\frac{F_{T,cmd}-F_T}{\\tau}
            `}
          />

          <p>
            Assuming <InlineMath math={'F_{T,cmd}'} /> is constant over a timestep
            <InlineMath math={'\\Delta t'} />, the analytical solution becomes:
          </p>

          <BlockMath
            math={`
              F_T(t+\\Delta t)
              =
              F_T(t)e^{-\\Delta t/\\tau}
              +
              F_{T,cmd}
              (1-e^{-\\Delta t/\\tau})
            `}
          />

          <p>
            Rearranged:
          </p>

          <BlockMath
            math={`
              F_{T,k+1}
              =
              F_{T,k}
              +
              (1-e^{-\\Delta t/\\tau})
              (F_{T,cmd,k}-F_{T,k})
            `}
          />
        </section>

        {/* ----------------- Differential Equation Solution ----------------- */}

        <hr />

        <section className="mathSection">
          <h2>Step-by-Step Solution of the Differential Equation</h2>

          <p>
            We solve the first-order ODE:
          </p>

          <BlockMath
            math={`
              \\dot{F}_T
              =
              \\frac{F_{T,cmd}-F_T}{\\tau}
            `}
          />

          <p><strong>Step 1: Rearrange</strong></p>

          <p>
            Bring the equation into standard linear form:
          </p>

          <BlockMath
            math={`
              \\dot{F}_T
              +
              \\frac{1}{\\tau}F_T
              =
              \\frac{F_{T,cmd}}{\\tau}
            `}
          />

          <p>
            Denote:
          </p>

          <BlockMath
            math={`
              a=\\frac{1}{\\tau},
              \\quad
              b=\\frac{F_{T,cmd}}{\\tau}
            `}
          />

          <p><strong>Step 2: Homogeneous Solution</strong></p>

          <p>
            Solve:
          </p>

          <BlockMath
            math={`
              \\dot{F}_{T,h}
              +
              aF_{T,h}
              =
              0
            `}
          />

          <p>
            Using exponential ansatz:
          </p>

          <BlockMath
            math={`
              F_{T,h}(t)
              =
              Ce^{-at}
              =
              Ce^{-t/\\tau}
            `}
          />

          <p><strong>Step 3: Particular Solution</strong></p>

          <p>
            Since the forcing term is constant, use:
            <InlineMath math={'F_{T,p}=k'} />.
          </p>

          <p>
            Substituting into the ODE:
          </p>

          <BlockMath
            math={`
              0+ak=b
              \\implies
              k=F_{T,cmd}
            `}
          />

          <p><strong>Step 4: General Solution</strong></p>

          <BlockMath
            math={`
              F_T(t)
              =
              F_{T,h}(t)
              +
              F_{T,p}
              =
              Ce^{-t/\\tau}
              +
              F_{T,cmd}
            `}
          />

          <p><strong>Step 5: Apply Initial Condition</strong></p>

          <p>
            At <InlineMath math={'t=0'} />,
            <InlineMath math={'F_T(0)=F_{T,0}'} />:
          </p>

          <BlockMath
            math={`
              F_{T,0}
              =
              C+F_{T,cmd}
              \\implies
              C
              =
              F_{T,0}-F_{T,cmd}
            `}
          />

          <p><strong>Step 6: Evaluate at t + Δt</strong></p>

          <BlockMath
            math={`
              F_T(t+\\Delta t)
              =
              (F_{T,0}-F_{T,cmd})
              e^{-\\Delta t/\\tau}
              +
              F_{T,cmd}
            `}
          />

          <p>
            Expanding using
            <InlineMath math={'F_{T,0}=F_T(t)'} />:
          </p>

          <BlockMath
            math={`
              F_T(t+\\Delta t)
              =
              F_T(t)e^{-\\Delta t/\\tau}
              +
              F_{T,cmd}
              (1-e^{-\\Delta t/\\tau})
            `}
          />

          <p><strong>Step 7: Intuition</strong></p>

          <p>
            - The system always converges toward
            <InlineMath math={'F_{T,cmd}'} />.
            <br />
            - The convergence speed is governed by
            <InlineMath math={'\\tau'} />.
            <br />
            - Smaller <InlineMath math={'\\tau'} /> → faster response.
            <br />
            - Larger <InlineMath math={'\\tau'} /> → slower response.
          </p>
        </section>

        <hr />

        {/* ----------------- End Differential Equation Solution ----------------- */}

        <section className="mathSection">
          <h2>Illustration</h2>

          <p>
            The figure below shows the thrust force approaching the commanded
            target over time.
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
            The specific impulse is defined as:
          </p>

          <BlockMath
            math={`
              I_{sp}
              =
              \\frac{F_T}{\\dot{m}g_0}
            `}
          />

          <p>
            Where:
            <br />
            - <strong><InlineMath math={'I_{sp}'} /></strong>: specific impulse [s]
            <br />
            - <strong><InlineMath math={'F_T'} /></strong>: thrust force [N]
            <br />
            - <strong><InlineMath math={'g_0 \\approx 9.81'} /></strong>: standard gravity [m/s²]
          </p>

          <p>
            Solving for mass flow rate:
          </p>

          <BlockMath
            math={`
              \\dot{m}
              =
              \\frac{F_T}{I_{sp}g_0}
            `}
          />

          <p>
            Fuel mass decreases according to:
          </p>

          <BlockMath
            math={`
              \\dot{m}_f
              =
              -
              \\frac{F_T}{I_{sp}g_0}
            `}
          />
        </section>

        <p>Typical values for common propulsion systems:</p>

        <table>
          <thead>
            <tr>
              <th>Engine Type</th>
              <th>Fuel / Propellant</th>
              <th><InlineMath math={'I_{sp}\\,[s]'} /></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Liquid Rocket</td>
              <td>LOX/LH2</td>
              <td>450–465</td>
            </tr>

            <tr>
              <td>Liquid Rocket</td>
              <td>LOX/Kerosene</td>
              <td>300–350</td>
            </tr>

            <tr>
              <td>Solid Rocket</td>
              <td>HTPB / Black Powder</td>
              <td>200–300</td>
            </tr>

            <tr>
              <td>Ion / Electric</td>
              <td>Xenon, Hall / Electrostatic</td>
              <td>1500–4000</td>
            </tr>

            <tr>
              <td>Hybrid Rocket</td>
              <td>HTPB + N₂O</td>
              <td>250–300</td>
            </tr>
          </tbody>
        </table>

        <section className="mathSection">
          <h2>Key Characteristics</h2>

          <ul>
            <li>First-order exponential response to commanded thrust force</li>
            <li>Stable analytical discrete-time formulation</li>
            <li>Real-time capable low-order propulsion model</li>
            <li>Physically coupled fuel consumption</li>
            <li>Suitable for guidance and control simulation</li>
            <li>Numerically stable for variable simulation timesteps</li>
          </ul>
        </section>

      </main>
    </Layout>
  );
}