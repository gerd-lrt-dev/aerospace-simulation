import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import '../../css/verification.css';

export default function VerificationCase() {
  return (
    <Layout
      title="VER-FRM-001 | Landing-Site Frame & Free-Fall Pipeline"
      description="VER-FRM-001 verification case for the Spaceflight Dynamics Framework">

      <main className="verificationContainer">

        <section className="verificationHero verificationHeroCompact">
          <div className="verificationEyebrow">VER-FRM-001 · PASS</div>
          <h1>Landing-Site Frame & Free-Fall Pipeline</h1>
          <p>Verifies the end-to-end frame pipeline from configuration parsing and authoritative MCI initialization through one-step free fall, landing-site-relative state generation, and backend telemetry consistency.</p>
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
          <p>Verifies the end-to-end frame pipeline from configuration parsing and authoritative MCI initialization through one-step free fall, landing-site-relative state generation, and backend telemetry consistency.</p>
          <div className="verificationScope">
            <div><strong>Domain</strong><span>Coordinate transformations</span></div>
            <div><strong>Reference</strong><span>Analytical one-step propagation plus internal consistency checks across the frame pipeline.</span></div>
            <div><strong>Automation</strong><span>GoogleTest + CTest</span></div>
            <div><strong>Status</strong><span>PASS</span></div>
          </div>
        </section>

        <section className="verificationSection">
          <h2>Verified Cases</h2>
          <ul>
            <li>Configuration parsing</li>
            <li>Initialization to authoritative MCI state</li>
            <li>One-step free fall against analytical reference</li>
            <li>Landing-site-relative state consistency</li>
            <li>Backend telemetry consistency</li>
          </ul>
        </section>


        <section className="verificationSection">
          <h2>Reference Data and Tolerances</h2>
          <div className="verificationDataGrid">
            <div><span>Lunar radius</span><code>1,737,400 m</code></div>
            <div><span>Lunar rotation rate</span><code>2.6617e-6 rad/s</code></div>
            <div><span>Initial ENU position</span><code>{'{ 0, 0, 300 } m'}</code></div>
            <div><span>Initial ENU velocity</span><code>{'{ 0, 0, -20 } m/s'}</code></div>
            <div><span>Landing site</span><code>lat 0, lon 0, alt 0</code></div>
            <div><span>Time step</span><code>0.1 s</code></div>
            <div><span>Expected initial MCI position</span><code>{'{ 1737700, 0, 0 } m'}</code></div>
            <div><span>Expected initial MCI velocity</span><code>{'{ -20, 4.62523609, 0 } m/s'}</code></div>
            <div><span>Expected post-step MCI position</span><code>{'{ 1737697.9918278225, 0.462523609, 0 } m'}</code></div>
            <div><span>Expected post-step MCI velocity</span><code>{'{ -20.1634435509398, 4.62523609, 0 } m/s'}</code></div>
            <div><span>Position tolerance</span><code>1e-6 m</code></div>
            <div><span>Velocity tolerance</span><code>1e-9 m/s</code></div>
            <div><span>Basis / angular tolerance</span><code>1e-12</code></div>
            <div><span>Local lateral tolerance</span><code>1e-4</code></div>
          </div>
        </section>

        <section className="verificationSection">
          <h2>Result</h2>
          <div className="verificationResultPass">
            <div className="verificationResultMark">PASS</div>
            <div>
              <strong>VER-FRM-001 satisfies the defined reference cases.</strong>
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
