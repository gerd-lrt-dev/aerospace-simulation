import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import '../../css/verification.css';

export default function VerProp001() {
  return (
    <Layout
      title="VER-PROP-001 | Propulsion Force and Torque Generation"
      description="Analytical verification of main-engine and RCS force and torque generation in the Spaceflight Dynamics Framework">

      <main className="verificationContainer">

        <section className="verificationHero verificationHeroCompact">
          <div className="verificationEyebrow">VER-PROP-001 · PASS</div>
          <h1>Propulsion Force and Torque Generation</h1>
          <p>
            This verification package demonstrates that the SDF propulsion subsystem produces
            the expected main-engine and RCS thrust vectors, force aggregation, torque
            generation, and body-axis sign conventions.
          </p>
          <div className="verificationLinks">
            <Link className="verificationButton secondary" to="/mathematics/thrust">Open thrust model</Link>
            <Link className="verificationTextLink" to="/mathematics/RCSBasicModel">Open RCS actuator model</Link>
            <Link className="verificationTextLink" to="/mathematics/RCSControlAllocation">Open RCS allocation model</Link>
            <Link className="verificationTextLink" to="/verification">Back to Verification</Link>
          </div>
        </section>

        <section className="verificationSection">
          <h2>Verification Objective</h2>
          <p>
            VER-PROP-001 verifies the production propulsion path from commanded engine state
            to resulting spacecraft-body-fixed force and torque. The cases isolate propulsion
            behavior from downstream frame transformation and translational state propagation,
            so force and torque generation can be assessed independently.
          </p>
          <div className="verificationScope">
            <div><strong>Verified</strong><span>Main-engine and RCS force/torque generation</span></div>
            <div><strong>Reference</strong><span>Analytical first-order response and vector mechanics</span></div>
            <div><strong>Frame</strong><span>Spacecraft Body Frame (SBF)</span></div>
            <div><strong>Automation</strong><span>GoogleTest + CTest</span></div>
          </div>
        </section>

        <section className="verificationSection">
          <h2>Mathematical Reference</h2>
          <h3>Main-Engine Thrust Response</h3>
          <BlockMath math={'T(t)=T_{target}\\left(1-e^{-t/\\tau}\\right)'} />
          <p>
            For the deterministic verification configuration,
            <InlineMath math={'T_{target}=1000\\;\\mathrm{N}'} /> and
            <InlineMath math={'\\tau=0.5\\;\\mathrm{s}'} />. The reference values after one
            and five time constants are therefore:
          </p>
          <BlockMath math={'T(0.5\\,s)=1000\\left(1-e^{-1}\\right)=632.1205588\\;\\mathrm{N}'} />
          <BlockMath math={'T(2.5\\,s)=1000\\left(1-e^{-5}\\right)=993.2620530\\;\\mathrm{N}'} />
          <h3>Force Vector</h3>
          <BlockMath math={'\\mathbf{F}_{SBF}=T\\,\\hat{\\mathbf{d}}'} />
          <h3>Torque</h3>
          <BlockMath math={'\\boldsymbol{\\tau}=\\mathbf{r}\\times\\mathbf{F}'} />
          <p>Total force and total torque are obtained by linear superposition:</p>
          <BlockMath math={'\\mathbf{F}_{total}=\\sum_i \\mathbf{F}_i'} />
          <BlockMath math={'\\boldsymbol{\\tau}_{total}=\\sum_i \\boldsymbol{\\tau}_i'} />
        </section>

        <section className="verificationSection">
          <h2>Reference Configuration</h2>
          <div className="verificationDataGrid">
            <div><span>Main-engine target thrust</span><code>1000 N</code></div>
            <div><span>Main-engine time constant</span><code>0.5 s</code></div>
            <div><span>Main-engine direction</span><code>{'{ 0, 0, -1 } SBF'}</code></div>
            <div><span>Main-engine position</span><code>{'{ 0, 0, 0 } m'}</code></div>
            <div><span>Simulation time step</span><code>0.05 s</code></div>
            <div><span>RCS nominal thrust</span><code>40 N</code></div>
            <div><span>RCS rise time constant</span><code>0.05 s</code></div>
            <div><span>RCS command delay</span><code>0.0 s</code></div>
          </div>
          <p>The zero RCS command delay isolates force and torque generation from actuator-delay behavior.</p>
        </section>

        <section className="verificationSection">
          <h2>Verification Cases</h2>
          <div className="verificationDataGrid">
            <div><span>Main engine</span><code>Analytical magnitude, SBF direction, zero torque through CoM</code></div>
            <div><span>Single off-center RCS</span><code>Known force and torque from r × F</code></div>
            <div><span>Symmetric RCS pair</span><code>Pure translation, zero net torque</code></div>
            <div><span>Opposed RCS pair</span><code>Near-zero net force, pure torque</code></div>
            <div><span>Combined RCS command</span><code>Simultaneous force and torque aggregation</code></div>
            <div><span>Axis sweep</span><code>±X, ±Y, ±Z SBF sign convention</code></div>
          </div>
        </section>

        <section className="verificationSection">
          <h2>SDF Execution Path</h2>
          <div className="verificationPipeline">
            <span>Engine / RCS command</span><b>→</b>
            <span>Thrust orchestrator</span><b>→</b>
            <span>Engine actuator model</span><b>→</b>
            <span>SBF force vector</span><b>→</b>
            <span>r × F torque</span><b>→</b>
            <span>Force / torque aggregation</span>
          </div>
          <p>
            The verification uses the production <code>Thrust</code>,
            <code>basicMainEngineModel</code>, <code>basicRCSModel</code>, and
            RCS control-allocation paths. No alternate propulsion implementation is introduced.
          </p>
        </section>

        <section className="verificationSection">
          <h2>Tolerances</h2>
          <div className="verificationDataGrid">
            <div><span>Force tolerance</span><code>1e-8 N</code></div>
            <div><span>Torque tolerance</span><code>1e-8 N·m</code></div>
            <div><span>Zero-reference tolerance</span><code>1e-10</code></div>
          </div>
          <p>The analytical references are evaluated from the governing equations rather than rounded display values.</p>
        </section>

        <section className="verificationSection">
          <h2>Result</h2>
          <div className="verificationResultPass">
            <div className="verificationResultMark">PASS</div>
            <div>
              <strong>VER-PROP-001 satisfies all defined propulsion reference cases.</strong>
              <p>Main-engine thrust response, RCS force vectors, aggregation, torque generation and SBF axis conventions all remain within tolerance.</p>
            </div>
          </div>
          <pre className="verificationCode"><code>{'VER_PROP_001_PropulsionGeneration.MainEngineMatchesAnalyticalMagnitudeDirectionAndZeroTorque\\nVER_PROP_001_PropulsionGeneration.SingleOffCenterRCSMatchesAnalyticalForceAndTorque\\nVER_PROP_001_PropulsionGeneration.SymmetricRCSPairProducesPureTranslation\\nVER_PROP_001_PropulsionGeneration.OpposedRCSPairProducesPureTorque\\nVER_PROP_001_PropulsionGeneration.CombinedRCSCommandsProduceExpectedForceAndTorque\\nVER_PROP_001_PropulsionGeneration.TranslationAxisSweepMatchesBodyAxisSignConvention\\n\\nPASS — all VER-PROP-001 reference cases passed'}</code></pre>
        </section>

        <section className="verificationSection verificationCallout">
          <h2>Scope of Evidence</h2>
          <p>
            Passing VER-PROP-001 demonstrates that propulsion force and torque generation is
            internally consistent in SBF for the bounded reference cases above. It does
            <strong> not</strong> verify downstream SBF-to-MCI transformation, acceleration
            calculation, state propagation, or complete spacecraft response.
          </p>
          <div className="verificationLinks">
            <Link className="verificationButton secondary" to="/mathematics/thrust">Review the thrust model</Link>
            <Link className="verificationTextLink" to="/mathematics/RCSBasicModel">Review the RCS actuator model</Link>
            <Link className="verificationTextLink" to="/mathematics/RCSControlAllocation">Review the RCS allocation model</Link>
          </div>
        </section>

      </main>
    </Layout>
  );
}
