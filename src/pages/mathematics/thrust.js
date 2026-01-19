import React from 'react';
import Layout from '@theme/Layout';
import '../../css/mathematics.css';

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

          <p>
            Fuel consumption is calculated from the instantaneous thrust using the engine's 
            specific impulse. The equations below summarize the model:
          </p>

          <pre>
{`Thrust dynamics:
T(t + Δt) = T(t) + (1 - exp(-Δt / τ)) * (T_target - T(t))

Fuel Consumption:
m_f(t + Δt) = m_f(t) - ṁ_f * Δt
ṁ_f = T(t) / (I_sp * g_0)`}
          </pre>

          <p>
            Where: <br/>
            - <strong>T(t)</strong> = current thrust [N] <br/>
            - <strong>T_target</strong> = desired thrust [N] <br/>
            - <strong>τ</strong> = engine time constant [s] <br/>
            - <strong>m_f(t)</strong> = current fuel mass [kg] <br/>
            - <strong>ṁ_f</strong> = mass flow rate [kg/s] <br/>
            - <strong>I_sp</strong> = specific impulse [s] <br/>
            - <strong>g_0</strong> = gravitational acceleration [9.81 m/s²]
          </p>

          <p>
            In the simulation, these equations are updated at each time step <code>Δt</code>. 
            This allows the thrust to smoothly track the user's input while consuming fuel accordingly.
          </p>
        </section>

        <section className="mathSection">
          <h2>Illustration</h2>
          <p>
            The figure below shows the thrust approaching the target over time, demonstrating
            the exponential response of the engine.
          </p>
          <img 
            src="/img/mathematics/thrust-response.png" 
            alt="Thrust response curve" 
            className="mathImage"
          />
        </section>

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
