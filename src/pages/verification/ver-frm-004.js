import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import '../../css/verification.css';

export default function VerificationCase() {
  return (
    <Layout
      title="VER-FRM-004 | MCI ↔ MCMF Lunar Rotation"
      description="VER-FRM-004 verification case for the Spaceflight Dynamics Framework">

      <main className="verificationContainer">

        <section className="verificationHero verificationHeroCompact">
          <div className="verificationEyebrow">VER-FRM-004 · PASS</div>
          <h1>MCI ↔ MCMF Lunar Rotation</h1>
          <p>Verifies the inertial-to-Moon-fixed transformation, including the lunar rotation sign convention and velocity transport term.</p>
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
          <p>Verifies the inertial-to-Moon-fixed transformation, including the lunar rotation sign convention and velocity transport term.</p>
          <div className="verificationScope">
            <div><strong>Domain</strong><span>Coordinate transformations</span></div>
            <div><strong>Reference</strong><span>Analytical rotation about the lunar +Z axis with independent physical sign checks.</span></div>
            <div><strong>Automation</strong><span>GoogleTest + CTest</span></div>
            <div><strong>Status</strong><span>PASS</span></div>
          </div>
        </section>

        <section className="verificationSection">
          <h2>Verified Cases</h2>
          <ul>
            <li>Time-zero identity</li>
            <li>Quarter- and half-turn principal-axis cases</li>
            <li>Arbitrary angle/state</li>
            <li>Moon-fixed point under positive lunar rotation</li>
            <li>MCI ↔ MCMF roundtrips</li>
          </ul>
        </section>


        <section className="verificationSection">
          <h2>Reference Data and Tolerances</h2>
          <div className="verificationDataGrid">
            <div><span>Lunar rotation rate</span><code>2.6617e-6 rad/s</code></div>
            <div><span>Time-zero state</span><code>{'r={1000,2000,3000}, v={10,20,30}'}</code></div>
            <div><span>Principal-axis cases</span><code>quarter turn and half turn</code></div>
            <div><span>Physical sign check</span><code>Moon-fixed +X point moves toward +Y in MCI</code></div>
            <div><span>Arbitrary-state case</span><code>{'r={1e6,-2e5,3e5} m'}</code></div>
            <div><span>Roundtrip epochs</span><code>123456.789 s, 345678.9 s, 765432.1 s</code></div>
            <div><span>Position tolerance</span><code>1e-6 m</code></div>
            <div><span>Velocity tolerance</span><code>1e-9 m/s</code></div>
          </div>
        </section>

        <section className="verificationSection">
          <h2>Result</h2>
          <div className="verificationResultPass">
            <div className="verificationResultMark">PASS</div>
            <div>
              <strong>VER-FRM-004 satisfies the defined reference cases.</strong>
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
