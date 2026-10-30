import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import '../../css/verification.css';

export default function VerificationCase() {
  return (
    <Layout
      title="VER-FRM-002 | MCMF ↔ Moon Surface Coordinates"
      description="VER-FRM-002 verification case for the Spaceflight Dynamics Framework">

      <main className="verificationContainer">

        <section className="verificationHero verificationHeroCompact">
          <div className="verificationEyebrow">VER-FRM-002 · PASS</div>
          <h1>MCMF ↔ Moon Surface Coordinates</h1>
          <p>Verifies bidirectional transformation between Moon-Centered Moon-Fixed coordinates and Moon Surface Coordinates, including representative geometry and numerical edge cases.</p>
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
          <p>Verifies bidirectional transformation between Moon-Centered Moon-Fixed coordinates and Moon Surface Coordinates, including representative geometry and numerical edge cases.</p>
          <div className="verificationScope">
            <div><strong>Domain</strong><span>Coordinate transformations</span></div>
            <div><strong>Reference</strong><span>Analytical spherical geometry and roundtrip invariants.</span></div>
            <div><strong>Automation</strong><span>GoogleTest + CTest</span></div>
            <div><strong>Status</strong><span>PASS</span></div>
          </div>
        </section>

        <section className="verificationSection">
          <h2>Verified Cases</h2>
          <ul>
            <li>Reference geometry</li>
            <li>Longitude wraparound</li>
            <li>Near-pole numerical behavior</li>
            <li>MCMF → MSC → MCMF roundtrip</li>
            <li>MSC → MCMF → MSC roundtrip</li>
          </ul>
        </section>

        <section className="verificationSection">
          <h2>Result</h2>
          <div className="verificationResultPass">
            <div className="verificationResultMark">PASS</div>
            <div>
              <strong>VER-FRM-002 satisfies the defined reference cases.</strong>
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
