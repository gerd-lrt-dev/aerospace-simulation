import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import '../../css/verification.css';

export default function VerTra001() {
  return (
    <Layout
      title="VER-TRA-001 | Free Translational Motion"
      description="Analytical verification of free translational motion in the Spaceflight Dynamics Framework">

      <main className="verificationContainer">

        <section className="verificationHero verificationHeroCompact">
          <div className="verificationEyebrow">VER-TRA-001 · PASS</div>
          <h1>Free Translational Motion</h1>
          <p>
            This case verifies the SDF translational propagation path under zero acceleration
            against the analytical solution of uniform rectilinear motion.
          </p>
          <div className="verificationLinks">
            <Link className="verificationButton secondary" to="/mathematics/physics">
              Open mathematical model
            </Link>
            <Link className="verificationTextLink" to="/verification">
              Back to Verification
            </Link>
          </div>
        </section>

        <section className="verificationSection">
          <h2>Verification Objective</h2>
          <p>
            The case isolates translational state propagation from gravity, propulsion,
            coordinate transformations, and rotational dynamics. A controlled physics model
            returns exactly zero acceleration while the production SDF physics façade and
            Euler integration path propagate position and velocity.
          </p>

          <div className="verificationScope">
            <div><strong>Verified</strong><span>Translational propagation path</span></div>
            <div><strong>Reference</strong><span>Closed-form analytical solution</span></div>
            <div><strong>Frame</strong><span>Inertial translational state vectors</span></div>
            <div><strong>Automation</strong><span>GoogleTest + CTest</span></div>
          </div>
        </section>

        <section className="verificationSection">
          <h2>Mathematical Reference</h2>
          <p>
            With zero translational acceleration,
            <InlineMath math={'\\dot{\\mathbf{v}} = 0'} />, velocity remains constant.
          </p>

          <BlockMath math={'\\mathbf{v}(t) = \\mathbf{v}_0'} />

          <p>
            Position therefore follows uniform rectilinear motion:
          </p>

          <BlockMath math={'\\mathbf{r}(t) = \\mathbf{r}_0 + \\mathbf{v}_0 t'} />

          <p>
            This is a useful first verification case because the analytical solution is exact
            and the expected state can be determined independently of the SDF implementation.
          </p>
        </section>

        <section className="verificationSection">
          <h2>Reference Configuration</h2>

          <div className="verificationDataGrid">
            <div>
              <span>Initial position</span>
              <code>{'{ 1000, -2000, 3000 } m'}</code>
            </div>
            <div>
              <span>Initial velocity</span>
              <code>{'{ 10, -5, 2 } m/s'}</code>
            </div>
            <div>
              <span>Acceleration</span>
              <code>{'{ 0, 0, 0 } m/s²'}</code>
            </div>
            <div>
              <span>Time step</span>
              <code>0.1 s</code>
            </div>
            <div>
              <span>Duration</span>
              <code>10.0 s</code>
            </div>
            <div>
              <span>Integration steps</span>
              <code>100</code>
            </div>
          </div>
        </section>

        <section className="verificationSection">
          <h2>Expected Final State</h2>

          <BlockMath math={'\\mathbf{v}(10\\,s) = (10, -5, 2)\\;\\mathrm{m/s}'} />
          <BlockMath math={'\\mathbf{r}(10\\,s) = (1100, -2050, 3020)\\;\\mathrm{m}'} />

          <div className="verificationDataGrid">
            <div>
              <span>Position tolerance</span>
              <code>1e-9 m</code>
            </div>
            <div>
              <span>Velocity tolerance</span>
              <code>1e-12 m/s</code>
            </div>
          </div>
        </section>

        <section className="verificationSection">
          <h2>SDF Execution Path</h2>
          <div className="verificationPipeline">
            <span>Initial state</span>
            <b>→</b>
            <span>ZeroAccelerationModel</span>
            <b>→</b>
            <span>physics::computePos / computeVel</span>
            <b>→</b>
            <span>EulerIntegrator</span>
            <b>→</b>
            <span>Analytical comparison</span>
          </div>
          <p>
            The controlled acceleration model is a test double. The propagation itself uses
            the production SDF physics façade and numerical integrator, so the case verifies
            the software path that advances the translational state without introducing
            unrelated model effects.
          </p>
        </section>

        <section className="verificationSection">
          <h2>Result</h2>
          <div className="verificationResultPass">
            <div className="verificationResultMark">PASS</div>
            <div>
              <strong>VER-TRA-001 matches the analytical reference.</strong>
              <p>
                The final position and velocity remain within the defined numerical
                tolerances after 100 deterministic integration steps.
              </p>
            </div>
          </div>

          <pre className="verificationCode"><code>{`Start 3: VER_TRA_001_FreeTranslation.MatchesAnalyticalSolution
3/3 tests passed
100% tests passed, 0 tests failed`}</code></pre>
        </section>

        <section className="verificationSection verificationCallout">
          <h2>Scope of Evidence</h2>
          <p>
            Passing VER-TRA-001 demonstrates correct propagation of free translational motion
            for this bounded reference case. It does <strong>not</strong> verify lunar gravity,
            thrust generation, coordinate transformations, rotational dynamics, or the complete
            spacecraft simulation. Those behaviors require separate verification cases.
          </p>
          <Link className="verificationButton secondary" to="/mathematics/physics">
            Review the translational motion model
          </Link>
        </section>

      </main>
    </Layout>
  );
}
