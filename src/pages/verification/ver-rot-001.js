import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import '../../css/verification.css';

export default function VerRot001() {
  return (
    <Layout
      title="VER-ROT-001 | Constant Principal-Axis Torque"
      description="Analytical verification of rigid-body rotational dynamics in the Spaceflight Dynamics Framework">

      <main className="verificationContainer">

        <section className="verificationHero verificationHeroCompact">
          <div className="verificationEyebrow">VER-ROT-001 · PASS</div>
          <h1>Constant Principal-Axis Torque</h1>
          <p>
            This case verifies the SDF rigid-body rotational propagation path under a constant,
            known torque applied about one principal spacecraft axis.
          </p>
          <div className="verificationLinks">
            <Link className="verificationButton secondary" to="/mathematics/rotationalDynamics">
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
            The reference case isolates rotation about the positive spacecraft body-fixed
            x-axis. A diagonal inertia tensor eliminates products of inertia, while the
            initial angular velocity is zero and no torque acts about the remaining axes.
            Under these conditions, the gyroscopic cross-coupling term vanishes and the
            analytical solution remains directly calculable.
          </p>

          <div className="verificationScope">
            <div><strong>Verified</strong><span>Rigid-body rotational propagation</span></div>
            <div><strong>Reference</strong><span>Closed-form analytical solution</span></div>
            <div><strong>Frame</strong><span>Spacecraft body-fixed frame (SBF)</span></div>
            <div><strong>Automation</strong><span>GoogleTest + CTest</span></div>
          </div>
        </section>

        <section className="verificationSection">
          <h2>Mathematical Reference</h2>
          <p>
            SDF evaluates angular acceleration from Euler's rigid-body equation:
          </p>

          <BlockMath math={'\\dot{\\boldsymbol{\\omega}}_B = \\mathbf{I}_B^{-1} \\left[ \\boldsymbol{\\tau}_B - \\boldsymbol{\\omega}_B \\times (\\mathbf{I}_B \\boldsymbol{\\omega}_B) \\right]'} />

          <p>
            Because rotation is restricted to a principal axis,
            <InlineMath math={'\\boldsymbol{\\omega} \\times (\\mathbf{I}\\boldsymbol{\\omega}) = 0'} />.
            The x-axis acceleration therefore reduces to:
          </p>

          <BlockMath math={'\\alpha_x = \\frac{\\tau_x}{I_{xx}} = \\frac{10}{100} = 0.1\\;\\mathrm{rad/s^2}'} />

          <p>
            With zero initial angular velocity:
          </p>

          <BlockMath math={'\\omega_x(t) = \\alpha_x t'} />
          <BlockMath math={'\\theta_x(t) = \\frac{1}{2}\\alpha_x t^2'} />

          <p>
            At <InlineMath math={'t=10\\;\\mathrm{s}'} />, the analytical rotation angle is
            <InlineMath math={'\\theta_x=5\\;\\mathrm{rad}'} /> and the corresponding
            reference quaternion is:
          </p>

          <BlockMath math={'q_{ref} = [\\cos(2.5),\\;\\sin(2.5),\\;0,\\;0]'} />
        </section>

        <section className="verificationSection">
          <h2>Reference Configuration</h2>

          <div className="verificationDataGrid">
            <div>
              <span>Inertia tensor</span>
              <code>diag(100, 200, 300) kg·m²</code>
            </div>
            <div>
              <span>Applied torque</span>
              <code>{'{ 10, 0, 0 } N·m'}</code>
            </div>
            <div>
              <span>Initial angular velocity</span>
              <code>{'{ 0, 0, 0 } rad/s'}</code>
            </div>
            <div>
              <span>Initial attitude</span>
              <code>{'{ 1, 0, 0, 0 }'}</code>
            </div>
            <div>
              <span>Time step</span>
              <code>0.1 s</code>
            </div>
            <div>
              <span>Integration steps</span>
              <code>100</code>
            </div>
          </div>
        </section>

        <section className="verificationSection">
          <h2>Expected Final State</h2>

          <BlockMath math={'\\boldsymbol{\\alpha} = (0.1, 0, 0)\\;\\mathrm{rad/s^2}'} />
          <BlockMath math={'\\boldsymbol{\\omega}(10\\,s) = (1.0, 0, 0)\\;\\mathrm{rad/s}'} />
          <BlockMath math={'q_{ref} = (-0.8011436155,\\;0.5984721441,\\;0,\\;0)'} />

          <div className="verificationDataGrid">
            <div>
              <span>Angular acceleration tolerance</span>
              <code>1e-12 rad/s²</code>
            </div>
            <div>
              <span>Angular velocity tolerance</span>
              <code>1e-12 rad/s</code>
            </div>
            <div>
              <span>Quaternion component tolerance</span>
              <code>2.5e-2</code>
            </div>
            <div>
              <span>Quaternion norm tolerance</span>
              <code>1e-12</code>
            </div>
          </div>

          <p>
            The wider quaternion component tolerance is intentional. SDF propagates attitude
            numerically using explicit Euler integration with normalization and the updated
            angular velocity of the current simulation step. Angular acceleration and angular
            velocity remain tightly bounded because the principal-axis setup eliminates
            gyroscopic cross-coupling.
          </p>
        </section>

        <section className="verificationSection">
          <h2>SDF Execution Path</h2>
          <div className="verificationPipeline">
            <span>Torque + inertia</span>
            <b>→</b>
            <span>RigidBodyRotationalModel</span>
            <b>→</b>
            <span>physics::computeAngAcc</span>
            <b>→</b>
            <span>computeAngVel</span>
            <b>→</b>
            <span>computeAttitude</span>
            <b>→</b>
            <span>Analytical comparison</span>
          </div>
          <p>
            The verification follows the same rotational update order used by the production
            spacecraft propagation path: angular acceleration is evaluated first, angular
            velocity is advanced, and the updated angular velocity is then used for quaternion
            attitude propagation.
          </p>
        </section>

        <section className="verificationSection">
          <h2>Result</h2>
          <div className="verificationResultPass">
            <div className="verificationResultMark">PASS</div>
            <div>
              <strong>VER-ROT-001 satisfies the defined analytical reference bounds.</strong>
              <p>
                Angular acceleration, angular velocity, quaternion components, and quaternion
                normalization remain within their specified tolerances after 100 deterministic
                integration steps.
              </p>
            </div>
          </div>

          <pre className="verificationCode"><code>{`Start 4: VER_ROT_001_AxisTorque.MatchesAnalyticalSolution
4/4 tests passed
100% tests passed, 0 tests failed`}</code></pre>
        </section>

        <section className="verificationSection verificationCallout">
          <h2>Scope of Evidence</h2>
          <p>
            Passing VER-ROT-001 demonstrates correct bounded behavior of the rigid-body
            principal-axis rotational propagation path for this reference case. It does
            <strong> not</strong> verify general multi-axis gyroscopic coupling, RCS torque
            generation, external disturbance torques, coordinate transformations, or the
            complete 6DoF spacecraft simulation. Those behaviors require separate verification
            cases and system-level evidence.
          </p>
          <Link className="verificationButton secondary" to="/mathematics/rotationalDynamics">
            Review the rotational dynamics model
          </Link>
        </section>

      </main>
    </Layout>
  );
}
