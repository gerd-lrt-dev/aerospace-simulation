import React from 'react';
import Layout from '@theme/Layout';
import '../../css/mathematics.css';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function adaptiveDescentController() {
  return (
    <Layout
      title="Moonlander – Adpative Descent Controller"
      description="Mathmatical model of three phase autopilot controller">

      <main className="mathContainer">
        <h1>Adpative Descent Controller</h1>

        <section className="mathSection">

          <p><strong>Overview:</strong></p>
          <p>
            The Adaptive Descent Controller implements an energy-guided landing strategy for a planetary or lunar lander. <br/>
            Its objective is to safely guide the spacecraft from an initial descent state to a soft touchdown while respecting actuator limits and physical constraints.
          </p>  
            <p>
            The controller dynamically adjusts: <br/>
            - target descent velocity <br/>
            - controller gains <br/>
            - descent mode <br/>
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
          <table class="param-table">
            <thead>
                <tr>
                <th>Symbol</th>
                <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td><InlineMath math={'v'}></InlineMath></td>
                <td>Current vertical velocity</td>
                </tr>
                <tr>
                <td><InlineMath math={'h'}></InlineMath></td>
                <td>Current altitude</td>
                </tr>
                <tr>
                <td><InlineMath math={'m'}></InlineMath></td>
                <td>Current spacecraft mass</td>
                </tr>
                <tr>
                <td><InlineMath math={'g'}></InlineMath></td>
                <td>Local gravitational acceleration</td>
                </tr>
                <tr>
                <td><InlineMath math={'T_{max}'}></InlineMath></td>
                <td>Maximum available thrust</td>
                </tr>
                <tr>
                <td><InlineMath math={'dt'}></InlineMath></td>
                <td>Simulation timestep</td>
                </tr>
            </tbody>
            </table>
        <p><strong>Output</strong></p>
        <p>
            The controller produces:
            <BlockMath math={`T_{cmd}`} /> 
            which represents the <strong>thrust command in Newtons</strong> for the next timestep.
        </p>
        </section>

        {/* ----------------- Maximum Achievable Acceleration ----------------- */}

        <hr />
        <section className="mathSection">
        <h2>Maximum Achievable Acceleration</h2>
        <p>
        The maximum upward acceleration available to the lander is determined by the thrust-to-weight ratio.
        <BlockMath math={`a_{max} = \\dfrac{T_{max}}{m} - g`} /> 

        To avoid numerical issues the implementation ensures
        <BlockMath math={`a_{max} \\geq \\epsilon`} /> 
        where <InlineMath math={'\\epsilon'} /> is a small constant.
        </p>
        </section>

        {/* ----------------- Braking Distance ----------------- */}
        <hr />
        <section className="mathSection">
        <h2>Braking Distance</h2>
        <p>
        The Controller estimates the <strong>minimum distance required to stop the current descent velocity</strong> using basic kinematics.
        <BlockMath math={`d_{brake} = \\dfrac{v²}{2 \\cdot a_{max}}`} /> 
        </p>
        </section>
        

          {/* ----------------- Differential Equation Solution ----------------- */}
          <hr />
          <section className="mathSection">
            <h2>Brake Ratio</h2>
            <p>
              The <strong>brake ratio</strong> determines how much altitude remains relative to the required stopping distance.
              <BlockMath math={`R_{brake} = \\dfrac{h}{d_{brake}}`} />
            Interpretation:
                      <table class="param-table">
            <thead>
                <tr>
                <th>Symbol</th>
                <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td><InlineMath math={'R_{brake} >> 1'}></InlineMath></td>
                <td>Plenty of altitude available</td>
                </tr>
                <tr>
                <td><InlineMath math={'R_{brake} \\approx 1'}></InlineMath></td>
                <td>Braking must start</td>
                </tr>
                <tr>
                <td><InlineMath math={'R_{brake} < 1'}></InlineMath></td>
                <td>Critical braking required</td>
                </tr>
            </tbody>
            </table>
            This parameter drives both:<br/>
            - descent mode selection<br/>
            - controller gain scheduling
            </p>
          </section>
          <hr />

          {/* ----------------- Target Descent Velocity ----------------- */}
          <section className="mathSection">
            <h2>Target Descent Velocity</h2>
            <p>
                The desired descent velocity is computed using an energy-based guidance law.
                <BlockMath math={'v_{target} = - \\sqrt{2 \\cdot k_r \\cdot a_{max} \\cdot h}'} />
                where
                <BlockMath math={'k_r'} />
                is a <strong>reserve factor</strong> that provides additional safety margin. <br/>
                The negative sign ensures downward motion.
            </p>
          </section>

          <hr />

          {/* ----------------- PD Velocity Controller----------------- */}
          <section className="mathSection">
            <h2>PD Velocity Controller</h2>
            The controller attempts to track the target velocitys using a <strong>Proportional-Derivative (PD)</strong> controller.<br/>
            <strong>Control Error</strong>
            <BlockMath math={'e = v_{target} - v'} />
            <strong>Derivative Term</strong>
            <BlockMath math={'\\dot{e} = \\dfrac{e - e_{old}}{dt}'} />
            <strong>Control Acceleration</strong>
            <BlockMath math={'a_{ctrl} = K_p \\cdot e + K_d \\cdot \\dot{e}'}/>
            where<br/>
            - <InlineMath math={'K_p'}/> = Proportional gain <br/>
            - <InlineMath math={'K_d'}/> = derivative gain <br/>
            These gains are <strong>adaptively interpolated based on the brake ration</strong>.
          </section>
          <hr />

          {/* ----------------- Gravity Compensation----------------- */}   
          <section className="mathSection">
          <h2>Gravity Compensation</h2>
          <p>
          To maintain stable descent, the controller adds a hover thrust component that compensates gravity.
          <BlockMath math={'T_{hover} = m \\cdot g'}/>
          </p>
          </section>
          <hr />

          {/* ----------------- Total Thrust Command----------------- */}
          <h2>Total Thrust Command</h2>   
          <p>The final thrust command combines gravity compensation and the control acceleration.
            <BlockMath math={'T_{cmd} = T_{hover} + m \\cdot a_{ctrl}'}/>
          </p>
          <hr />

          {/* ----------------- Thrust Saturation----------------- */}
          <section className="mathSection">
          <h2>Thrust Saturation</h2>
          <p>
            The commanded thrust is limited to the physically available actuator range.
            <BlockMath math={'T_{cmd} = min(max(T_{cmd}, 0), T_{max})'}/>
          </p>
          </section>
          
          <hr/>
          {/* ----------------- Normalized Throttle Output----------------- */}
          <h2>Normalized Throttle Output</h2>
          <p>
            For actuator interfaces expecting a normalized throttle command:
            <BlockMath math={'u = \\dfrac{T_{cmd}}{T_{max}}'}/>
            where
            <BlockMath math={'0 \\geq u \\geq 1'}/>
          </p>

          <hr/>
          {/* ----------------- Descent Mode----------------- */}
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
                <td>
                    <InlineMath math={'R_{brake} > 3'} />
                </td>
                <td>Energy Dissipation</td>
                </tr>

                <tr>
                <td>MODE_B</td>
                <td>
                    <InlineMath math={'1.5 < R_{brake} \\leq 3'} />
                </td>
                <td>Controlled Descent</td>
                </tr>

                <tr>
                <td>MODE_C</td>
                <td>
                    <InlineMath math={'R_{brake} < 1'} />
                </td>
                <td>Terminal Approach</td>
                </tr>

                <tr>
                <td>MODE_D</td>
                <td>otherwise</td>
                <td>Critical Braking</td>
                </tr>
            </tbody>
            </table>

            <p>
            Each mode corresponds to different values of:
            </p>

            <ul>
            <li>
                reserve factor <InlineMath math={'k_r'} />
            </li>
            <li>
                proportional gain <InlineMath math={'K_p'} />
            </li>
            <li>
                derivative gain <InlineMath math={'K_d'} />
            </li>
            </ul>
          <hr/>

          {/* ----------------- Control loop summary----------------- */}
          <h2>Control Loop Summary</h2>

            <p>
            Each simulation step performs the following control sequence.
            The controller evaluates the current vehicle state and computes a thrust
            command that guides the spacecraft toward a safe landing trajectory.
            </p>

            <ol>

            <li>
            Compute the maximum achievable acceleration
            <br/>
            <InlineMath math={'a_{max}'} />
            </li>

            <li>
            Estimate the braking distance required to reduce the current vertical velocity
            <br/>
            <InlineMath math={'d_{brake}'} />
            </li>

            <li>
            Compute the brake ratio
            <br/>
            <InlineMath math={'R_{brake} = \\frac{h}{d_{brake}}'} />
            </li>

            <li>
            Determine the current descent mode based on
            <InlineMath math={'R_{brake}'} />
            </li>

            <li>
            Interpolate controller parameters
            <br/>
            <InlineMath math={'k_r, K_p, K_d'} />
            </li>

            <li>
            Compute the target descent velocity
            <br/>
            <InlineMath math={'v_{target}'} />
            </li>

            <li>
            Apply the PD velocity controller
            </li>

            <li>
            Add gravity compensation
            </li>

            <li>
            Apply actuator saturation
            </li>

            <li>
            Output the thrust command
            </li>

            </ol>

          <hr/>

          {/* ----------------- Control Law----------------- */}
            <h3>Control Law</h3>

            <p>
            The thrust command is generated using a PD velocity controller
            combined with gravity compensation.
            </p>

            <BlockMath math={'a_{cmd} = K_p (v_{target} - v) + K_d (0 - \\dot{v})'} />

            <p>
            The commanded acceleration is converted into thrust while compensating
            for gravitational acceleration.
            </p>

            <BlockMath math={'T = m (a_{cmd} + g)'} />

            <p>
            Finally the thrust command is limited by the available engine capability.
            </p>

            <BlockMath math={'0 \\le T \\le T_{max}'} />


          <hr/>

          {/* ----------------- Control Law----------------- */}
          <section className="mathSection">
            <h2>Illustration</h2>
            <p>
              The figure below shows the dynamic mode seeting due to brake ratio and descent progress.
            </p>
            <img 
              src="/img/math/DescentModes.png" 
              alt="Descent Phase Diagram" 
              className="mathImage"
            />
          </section>
          <hr/>

          {/* ----------------- Characteristics of the Controller----------------- */}

            <h2>Characteristics of the Controller</h2>

            <p><strong>Advantages</strong></p>

            <ul>
            <li>Energy-based descent planning</li>
            <li>Adaptive gain scheduling</li>
            <li>Gravity compensation</li>
            <li>Actuator saturation handling</li>
            </ul>

            <p>
            The controller therefore provides stable, safe and efficient landing
            behavior across different phases of the descent trajectory.
            </p>
          <hr/>
      </main>
    </Layout>
  );
}
