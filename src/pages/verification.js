import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import '../css/verification.css';

export default function VerificationOverview() {
  return (
    <Layout
      title="Verification | Spaceflight Dynamics Framework"
      description="Verification strategy, analytical reference cases, and reproducible evidence for the Spaceflight Dynamics Framework">

      <main className="verificationContainer">

        <section className="verificationHero">
          <div className="verificationEyebrow">Engineering evidence</div>
          <h1>Verification</h1>
          <p>
            SDF verification connects the mathematical model to its software implementation
            and demonstrates, through reproducible reference cases, that the implemented
            simulation reproduces the expected analytical behavior.
          </p>
        </section>

        <section className="verificationSection">
          <h2>From Model to Evidence</h2>
          <div className="verificationFlow">
            <div className="verificationFlowStep">
              <span>01</span>
              <strong>Mathematical Model</strong>
              <p>Define equations, assumptions, frames, and physical conventions.</p>
            </div>
            <div className="verificationFlowArrow">→</div>
            <div className="verificationFlowStep">
              <span>02</span>
              <strong>Software Implementation</strong>
              <p>Map the model into deterministic simulation components.</p>
            </div>
            <div className="verificationFlowArrow">→</div>
            <div className="verificationFlowStep">
              <span>03</span>
              <strong>Reference Case</strong>
              <p>Define an independent analytical or otherwise trusted solution.</p>
            </div>
            <div className="verificationFlowArrow">→</div>
            <div className="verificationFlowStep">
              <span>04</span>
              <strong>Automated Verification</strong>
              <p>Compare SDF output against the reference within explicit tolerances.</p>
            </div>
          </div>
        </section>

        <section className="verificationSection">
          <h2>Verification Cases</h2>

          <div className="verificationGrid">
            <article className="verificationCard verificationCardPass">
              <div className="verificationCardHeader">
                <span className="verificationId">VER-TRA-001</span>
                <span className="verificationStatus">PASS</span>
              </div>
              <h3>Free Translational Motion</h3>
              <p>
                Verifies uniform rectilinear motion under zero acceleration against the
                closed-form analytical solution for position and velocity.
              </p>
              <dl className="verificationMeta">
                <div><dt>Domain</dt><dd>Translational dynamics</dd></div>
                <div><dt>Reference</dt><dd>Analytical</dd></div>
                <div><dt>Execution</dt><dd>Automated / CTest</dd></div>
              </dl>
              <Link className="verificationButton" to="/verification/ver-tra-001">
                View verification case
              </Link>
            </article>

            <article className="verificationCard">
              <div className="verificationCardHeader">
                <span className="verificationId">VER-ROT-001</span>
                <span className="verificationStatus verificationStatusPlanned">PLANNED</span>
              </div>
              <h3>Constant Principal-Axis Torque</h3>
              <p>
                Planned analytical verification of angular acceleration, angular velocity,
                and quaternion attitude propagation under a controlled principal-axis torque.
              </p>
            </article>

            <article className="verificationCard">
              <div className="verificationCardHeader">
                <span className="verificationId">VER-FRM-001</span>
                <span className="verificationStatus verificationStatusPlanned">PLANNED</span>
              </div>
              <h3>Landing-Site Frame & Free-Fall Pipeline</h3>
              <p>
                Planned end-to-end verification of mission-frame initialization,
                transformations, free-fall propagation, and exported state consistency.
              </p>
            </article>
          </div>
        </section>

        <section className="verificationSection verificationCallout">
          <h2>Verification vs. Validation</h2>
          <p>
            <strong>Verification</strong> asks whether SDF correctly solves the mathematical
            model that has been implemented. <strong>Validation</strong> asks whether that
            mathematical model represents physical reality with sufficient fidelity for a
            given application. The current SDF release effort is focused on verification;
            validation against experimental or flight data is a separate activity.
          </p>
        </section>

      </main>
    </Layout>
  );
}
