import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import '../../css/verification.css';

export default function VerificationCase() {
  return (
    <Layout
      title="VER-FRM-003 | ENU Basis and Local Transformations"
      description="VER-FRM-003 verification case for the Spaceflight Dynamics Framework">

      <main className="verificationContainer">

        <section className="verificationHero verificationHeroCompact">
          <div className="verificationEyebrow">VER-FRM-003 · PASS</div>
          <h1>ENU Basis and Local Transformations</h1>
          <p>Verifies East-North-Up basis construction and local position/velocity transformations between ENU and MCMF.</p>
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
          <p>Verifies East-North-Up basis construction and local position/velocity transformations between ENU and MCMF.</p>
          <div className="verificationScope">
            <div><strong>Domain</strong><span>Coordinate transformations</span></div>
            <div><strong>Reference</strong><span>Analytical orthonormal basis construction and bidirectional roundtrip invariants.</span></div>
            <div><strong>Automation</strong><span>GoogleTest + CTest</span></div>
            <div><strong>Status</strong><span>PASS</span></div>
          </div>
        </section>

        <section className="verificationSection">
          <h2>Verified Cases</h2>
          <ul>
            <li>Equator / prime meridian basis</li>
            <li>Longitude 90° basis</li>
            <li>Arbitrary latitude / longitude</li>
            <li>Near-pole fallback</li>
            <li>ENU ↔ MCMF position and velocity</li>
            <li>Bidirectional roundtrips</li>
          </ul>
        </section>

        <section className="verificationSection">
          <h2>Result</h2>
          <div className="verificationResultPass">
            <div className="verificationResultMark">PASS</div>
            <div>
              <strong>VER-FRM-003 satisfies the defined reference cases.</strong>
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
