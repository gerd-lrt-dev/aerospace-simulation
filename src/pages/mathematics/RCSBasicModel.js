import React from 'react';
import Layout from '@theme/Layout';
import '../../css/mathematics.css';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function RCSModel() {
  return (
    <Layout
      title="Moonlander – Reaction Control System Model"
      description="Mathematical low-order model of the Reaction Control System used in the Moonlander simulation">

      <main className="mathContainer">

        <h1>Reaction Control System (RCS) Model</h1>

        <section className="mathSection">
          <p>
            The Reaction Control System (RCS) in Moonlander is modeled as a
            low-order binary thruster system with command delay, first-order
            actuator dynamics, thrust force generation, and propellant consumption.
          </p>

          <p>
            The model is intentionally designed as a computationally efficient
            and numerically stable actuator representation suitable for:
          </p>

          <ul>
            <li>Autonomous landing research</li>
            <li>Guidance and control validation</li>
            <li>Monte-Carlo simulation campaigns</li>
            <li>Real-time simulation</li>
            <li>Telemetry generation and export</li>
          </ul>

          <p>
            Instead of modeling combustion physics or fluid dynamics in detail,
            the RCS is represented as a binary valve-controlled propulsion
            actuator with configurable dynamic response behavior.
          </p>
        </section>

        <section className="mathSection">
          <h2>Binary Thruster Command Model</h2>

          <p>
            Each RCS engine is modeled as a binary actuator:
          </p>

          <BlockMath math={`u(t) \\in \\{0,1\\}`} />

          <p>
            Where:
            <br />
            • <strong><InlineMath math={'u(t)=0'} /></strong> → thruster inactive
            <br />
            • <strong><InlineMath math={'u(t)=1'} /></strong> → thruster firing
          </p>

          <p>
            The current implementation intentionally restricts the RCS model to
            binary valve logic. This reflects the behavior of many practical
            spacecraft control thrusters operating in pulse mode.
          </p>
        </section>

        <section className="mathSection">
          <h2>Command Delay Model</h2>

          <p>
            Real RCS systems cannot react instantaneously. Electronic signal
            propagation, valve motion, and actuator latency introduce a finite
            command delay between requested and physically executed thrust.
          </p>

          <BlockMath math={`u_d(t)=u(t-t_d)`} />

          <p>
            Where:
            <br />
            • <strong><InlineMath math={'u(t)'} /></strong> is the commanded input
            <br />
            • <strong><InlineMath math={'u_d(t)'} /></strong> is the delayed actuator command
            <br />
            • <strong><InlineMath math={'t_d'} /></strong> is the command delay [s]
          </p>

          <p>
            Internally, the delay is implemented using a FIFO command buffer
            containing time-stamped command samples.
          </p>
        </section>

        <section className="mathSection">
          <h2>First-Order Actuator Dynamics</h2>

          <p>
            The internal actuator state is represented by a normalized state
            variable:
          </p>

          <BlockMath math={`s(t) \\in [0,1]`} />

          <p>
            The state follows a first-order differential equation:
          </p>

          <BlockMath math={`\\dot{s}=\\frac{u_d-s}{\\tau}`} />

          <p>
            Where:
            <br />
            • <strong><InlineMath math={'s'} /></strong> is the normalized actuator state
            <br />
            • <strong><InlineMath math={'u_d'} /></strong> is the delayed binary command
            <br />
            • <strong><InlineMath math={'\\tau'} /></strong> is the actuator time constant
          </p>

          <p>
            This formulation models the finite valve opening and closing
            dynamics of the RCS thruster.
          </p>
        </section>

        <section className="mathSection">
          <h2>Asymmetric Rise and Decay Dynamics</h2>

          <p>
            The model supports different dynamic response behavior for thruster
            activation and deactivation:
          </p>

          <BlockMath
            math={`
              \\tau =
              \\begin{cases}
              \\tau_{on}, & u_d = 1 \\\\
              \\tau_{off}, & u_d = 0
              \\end{cases}
            `}
          />

          <p>
            This allows more realistic actuator behavior because physical valve
            opening and valve closing characteristics are often asymmetric in
            real propulsion systems.
          </p>

          <p>
            Typical interpretation:
            <br />
            • <strong><InlineMath math={'\\tau_{on}'} /></strong> → valve opening dynamics
            <br />
            • <strong><InlineMath math={'\\tau_{off}'} /></strong> → valve closing dynamics
          </p>
        </section>

        <section className="mathSection">
          <h2>Exact Discrete First-Order Solution</h2>

          <p>
            Instead of relying solely on explicit Euler integration, the model
            additionally supports the exact discrete solution of the first-order
            system for constant input over one time step.
          </p>

          <p>
            Starting from:
          </p>

          <BlockMath math={`\\dot{s}=\\frac{u-s}{\\tau}`} />

          <p>
            the exact discrete update equation becomes:
          </p>

          <BlockMath
            math={`
              s_{k+1}
              =
              s_k +
              \\left(1-e^{-\\Delta t / \\tau}\\right)
              (u_k-s_k)
            `}
          />

          <p>
            This formulation improves numerical stability and avoids timestep-
            dependent response distortions.
          </p>

          <p>
            Where:
            <br />
            • <strong><InlineMath math={'\\Delta t'} /></strong> is the simulation timestep
            <br />
            • <strong><InlineMath math={'s_k'} /></strong> is the current actuator state
            <br />
            • <strong><InlineMath math={'s_{k+1}'} /></strong> is the updated actuator state
          </p>
        </section>

        <section className="mathSection">
          <h2>Thrust Force Generation</h2>

          <p>
            The generated scalar thrust force magnitude is computed from the
            normalized actuator state:
          </p>

          <BlockMath math={`F_T(t)=F_{T,nom}\\,s(t)`} />

          <p>
            Where:
            <br />
            • <strong><InlineMath math={'F_T(t)'} /></strong> is the scalar thrust force magnitude [N]
            <br />
            • <strong><InlineMath math={'F_{T,nom}'} /></strong> is the nominal maximum thrust force [N]
            <br />
            • <strong><InlineMath math={'s(t)'} /></strong> is the normalized actuator state [-]
          </p>

          <p>
            The thrust force vector is then generated externally by combining
            the scalar thrust force magnitude with the configured thrust
            direction:
          </p>

          <BlockMath math={`\\mathbf{F}_{thr}(t)=F_T(t)\\hat{\\mathbf{d}}`} />

          <p>
            Where:
            <br />
            • <strong><InlineMath math={'\\mathbf{F}_{thr}(t)'} /></strong> is the generated thrust force vector [N]
            <br />
            • <strong><InlineMath math={'F_T(t)'} /></strong> is the scalar thrust force magnitude [N]
            <br />
            • <strong><InlineMath math={'\\hat{\\mathbf{d}}'} /></strong> is the normalized thrust direction vector [-]
          </p>
        </section>

        <section className="mathSection">
          <h2>Torque Generation</h2>

          <p>
            Since RCS thrusters are mounted at specific locations relative to
            the spacecraft center of gravity, they additionally generate torque.
          </p>

          <p>
            The generated torque is computed using the moment arm and thrust
            force vector:
          </p>

          <BlockMath
            math={`
              \\mathbf{M}_{thr}(t)
              =
              \\left(
              \\mathbf{r}_{thr}
              -
              \\mathbf{r}_{CG}
              \\right)
              \\times
              \\mathbf{F}_{thr}(t)
            `}
          />

          <p>
            Where:
            <br />
            • <strong><InlineMath math={'\\mathbf{r}_{thr}'} /></strong> is the thruster position
            <br />
            • <strong><InlineMath math={'\\mathbf{r}_{CG}'} /></strong> is the spacecraft center of gravity
            <br />
            • <strong><InlineMath math={'\\mathbf{F}_{thr}'} /></strong> is the generated thrust force vector
          </p>

          <p>
            This formulation enables direct coupling to spacecraft rigid-body
            rotational dynamics.
          </p>
        </section>

        <section className="mathSection">
          <h2>Propellant Consumption</h2>

          <p>
            The instantaneous propellant mass flow rate is computed using the
            specific impulse formulation:
          </p>

          <BlockMath math={`\\dot{m}=\\frac{F_T}{I_{sp}g_0}`} />

          <p>
            Where:
            <br />
            • <strong><InlineMath math={'\\dot{m}'} /></strong> is the propellant mass flow rate [kg/s]
            <br />
            • <strong><InlineMath math={'F_T'} /></strong> is the generated scalar thrust force [N]
            <br />
            • <strong><InlineMath math={'I_{sp}'} /></strong> is the specific impulse [s]
            <br />
            • <strong><InlineMath math={'g_0'} /></strong> is standard gravity [m/s²]
          </p>

          <p>
            The remaining fuel mass evolves according to:
          </p>

          <BlockMath math={`m_f(t+\\Delta t)=m_f(t)-\\dot{m}\\Delta t`} />
        </section>

        <section className="mathSection">
          <h2>Numerical Integration Methods</h2>

          <p>
            The current implementation supports multiple numerical integration
            strategies:
          </p>

          <ul>
            <li>Explicit Euler Integration</li>
            <li>Exact Discrete First-Order Solution</li>
          </ul>

          <p>
            The exact discrete formulation is currently preferred because it
            provides improved stability and timestep independence.
          </p>
        </section>

        <section className="mathSection">
          <h2>Model Assumptions and Simplifications</h2>

          <p>
            The current implementation intentionally focuses on low-order
            actuator realism and computational efficiency.
          </p>

          <p>
            The following effects are currently neglected:
          </p>

          <ul>
            <li>Combustion dynamics</li>
            <li>Thermal effects</li>
            <li>Valve hysteresis</li>
            <li>Minimum impulse bit constraints</li>
            <li>Plume interaction</li>
            <li>Flexible-body dynamics</li>
            <li>Pressure-dependent thrust variation</li>
          </ul>

          <p>
            These simplifications are intentional and support stable real-time
            simulation as well as reproducible research workflows.
          </p>
        </section>

        <section className="mathSection">
          <h2>Typical RCS Parameters</h2>

          <table>
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Typical Range</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><InlineMath math={'F_{T,nom}'} /></td>
                <td>10 – 500 N</td>
              </tr>
              <tr>
                <td><InlineMath math={'I_{sp}'} /></td>
                <td>200 – 320 s</td>
              </tr>
              <tr>
                <td><InlineMath math={'t_d'} /></td>
                <td>5 – 50 ms</td>
              </tr>
              <tr>
                <td><InlineMath math={'\\tau_{on}'} /></td>
                <td>20 – 150 ms</td>
              </tr>
              <tr>
                <td><InlineMath math={'\\tau_{off}'} /></td>
                <td>20 – 150 ms</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="mathSection">
          <h2>Key Characteristics</h2>

          <ul>
            <li>Binary valve-controlled RCS actuator model</li>
            <li>Explicit command-delay simulation</li>
            <li>Separate rise and decay actuator dynamics</li>
            <li>Exact discrete first-order integration</li>
            <li>Physically coupled propellant consumption</li>
            <li>Vector-based force and torque generation</li>
            <li>Research-oriented telemetry support</li>
            <li>Real-time capable low-order implementation</li>
          </ul>
        </section>

      </main>
    </Layout>
  );
}