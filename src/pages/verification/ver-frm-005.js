import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import '../../css/verification.css';

export default function VerificationCase() {
  return (
    <Layout
      title="VER-FRM-005 | SBF ↔ MCI Attitude Transformation"
      description="VER-FRM-005 verification case for the Spaceflight Dynamics Framework">

      <main className="verificationContainer">

        <section className="verificationHero verificationHeroCompact">
          <div className="verificationEyebrow">VER-FRM-005 · PASS</div>
          <h1>SBF ↔ MCI Attitude Transformation</h1>
          <p>Verifies spacecraft-body-fixed to inertial vector and state transformations using the production quaternion convention.</p>
          <div className="verificationLinks">
            <Link className="verificationButton secondary" to="/mathematics/coordinateTransformation">
              Open mathematical model
            </Link>
            <Link className="verificationTextLink" to="/verification">
              Back to Verification
            </Link>
          </div>
        </section>

        <section className="verificationSection">
          <h2>Verification Objective</h2>
          <p>Verifies spacecraft-body-fixed to inertial vector and state transformations using the production quaternion convention.</p>
          <div className="verificationScope">
            <div><strong>Domain</strong><span>Coordinate transformations</span></div>
            <div><strong>Reference</strong><span>Analytical quaternion rotations, inverse transformation, and roundtrip invariants.</span></div>
            <div><strong>Automation</strong><span>GoogleTest + CTest</span></div>
            <div><strong>Status</strong><span>PASS</span></div>
          </div>
        </section>

        <section className="verificationSection">
          <h2>Verified Cases</h2>
          <ul>
            <li>Identity quaternion</li>
            <li>± principal-axis orientation checks</li>
            <li>Arbitrary normalized quaternion</li>
            <li>Quaternion sign equivalence</li>
            <li>State transformation</li>
            <li>SBF → MCI → SBF roundtrip</li>
          </ul>
        </section>


        <section className="verificationSection">
          <h2>Reference Data and Tolerances</h2>
          <div className="verificationDataGrid">
            <div><span>Quaternion cases</span><code>identity, +90° about X/Y/Z</code></div>
            <div><span>Additional attitude case</span><code>arbitrary normalized quaternion</code></div>
            <div><span>Sign equivalence</span><code>q and -q produce identical rotation</code></div>
            <div><span>State test position</span><code>{'{ 100, 200, 300 } m'}</code></div>
            <div><span>State test velocity</span><code>{'{ 4, 5, 6 } m/s'}</code></div>
            <div><span>Inverse / roundtrip</span><code>SBF → MCI → SBF</code></div>
            <div><span>Vector tolerance</span><code>1e-12</code></div>
            <div><span>State tolerance</span><code>1e-9</code></div>
          </div>
        </section>

        <section className="verificationSection">
          <h2>Result</h2>
          <div className="verificationResultPass">
            <div className="verificationResultMark">PASS</div>
            <div>
              <strong>VER-FRM-005 satisfies the defined reference cases.</strong>
              <p>
                The production coordinate-transformation path remains within the
                expected analytical, roundtrip, and numerical consistency bounds
                for the cases listed above.
              </p>
            </div>
          </div>
        </section>

        <section className="verificationSection verificationCallout">
          <h2>Scope of Evidence</h2>
          <p>
            This verification case demonstrates correctness for the bounded reference
            scenarios above. It does not by itself validate the physical fidelity of the
            complete spacecraft model.
          </p>
          <Link className="verificationTextLink" to="/mathematics/coordinateTransformation">
            Review the coordinate transformation model
          </Link>
        </section>

      </main>
    </Layout>
  );
}
