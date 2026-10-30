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
          <h2>SDF Light Verification Progress</h2>
          <p>
            Release verification progress is tracked against the planned T03–T15 verification
            workstream. Eight of thirteen tasks are currently complete.
          </p>

          <div className="verificationProgress" aria-label="SDF Light verification progress: 62 percent">
            <div className="verificationProgressHeader">
              <strong>8 / 13 tasks complete</strong>
              <span>62%</span>
            </div>
            <div className="verificationProgressTrack">
              <div className="verificationProgressFill" style={{width: '61.5%'}} />
            </div>
            <div className="verificationProgressFooter">
              <span>Completed: T03, T04, T05, T06, T07, T13, T14, T15</span>
              <span>Open: T08–T12</span>
            </div>
          </div>
        </section>

        <section className="verificationSection">
          <h2>Dynamics</h2>

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
              <div className="verificationLinks">
                <Link className="verificationButton" to="/verification/ver-tra-001">
                  View verification case
                </Link>
                <Link className="verificationTextLink" to="/mathematics/physics">
                  Open mathematical model
                </Link>
              </div>
            </article>

            <article className="verificationCard verificationCardPass">
              <div className="verificationCardHeader">
                <span className="verificationId">VER-ROT-001</span>
                <span className="verificationStatus">PASS</span>
              </div>
              <h3>Constant Principal-Axis Torque</h3>
              <p>
                Verifies rigid-body angular acceleration, angular velocity, and quaternion
                attitude propagation under a constant torque about a principal body axis.
              </p>
              <dl className="verificationMeta">
                <div><dt>Domain</dt><dd>Rotational dynamics</dd></div>
                <div><dt>Reference</dt><dd>Analytical</dd></div>
                <div><dt>Execution</dt><dd>Automated / CTest</dd></div>
              </dl>
              <div className="verificationLinks">
                <Link className="verificationButton" to="/verification/ver-rot-001">
                  View verification case
                </Link>
                <Link className="verificationTextLink" to="/mathematics/rotationalDynamics">
                  Open mathematical model
                </Link>
              </div>
            </article>
          </div>
        </section>

        <section className="verificationSection">
          <h2>Reference Frames and Coordinate Transformations</h2>

          <div className="verificationGrid">
            <article className="verificationCard verificationCardPass">
              <div className="verificationCardHeader">
                <span className="verificationId">VER-FRM-001</span>
                <span className="verificationStatus">PASS</span>
              </div>
              <h3>Landing-Site Frame & Free-Fall Pipeline</h3>
              <p>
                End-to-end verification of configuration parsing, authoritative MCI
                initialization, one-step free fall, landing-site-relative state, and backend
                telemetry consistency.
              </p>
              <dl className="verificationMeta">
                <div><dt>Domain</dt><dd>Frame pipeline integration</dd></div>
                <div><dt>Reference</dt><dd>Analytical + consistency</dd></div>
                <div><dt>Execution</dt><dd>Automated / CTest</dd></div>
              </dl>
              <div className="verificationLinks">
                <Link className="verificationButton" to="/verification/ver-frm-001">
                  View verification case
                </Link>
                <Link className="verificationTextLink" to="/mathematics/coordinateTransformation">
                  Open mathematical model
                </Link>
              </div>
            </article>

            <article className="verificationCard verificationCardPass">
              <div className="verificationCardHeader">
                <span className="verificationId">VER-FRM-002</span>
                <span className="verificationStatus">PASS</span>
              </div>
              <h3>MCMF ↔ Moon Surface Coordinates</h3>
              <p>
                Verifies reference geometry, longitude wraparound, near-pole numerical
                behavior, and bidirectional MCMF/MSC roundtrip consistency.
              </p>
              <dl className="verificationMeta">
                <div><dt>Domain</dt><dd>MCMF / MSC</dd></div>
                <div><dt>Reference</dt><dd>Analytical geometry</dd></div>
                <div><dt>Execution</dt><dd>Automated / CTest</dd></div>
              </dl>
              <div className="verificationLinks">
                <Link className="verificationButton" to="/verification/ver-frm-002">
                  View verification case
                </Link>
                <Link className="verificationTextLink" to="/mathematics/coordinateTransformation">
                  Open mathematical model
                </Link>
              </div>
            </article>

            <article className="verificationCard verificationCardPass">
              <div className="verificationCardHeader">
                <span className="verificationId">VER-FRM-003</span>
                <span className="verificationStatus">PASS</span>
              </div>
              <h3>ENU Basis and Local Transformations</h3>
              <p>
                Verifies ENU basis construction at representative surface locations,
                near-pole fallback behavior, local position/velocity transforms, and
                bidirectional roundtrips.
              </p>
              <dl className="verificationMeta">
                <div><dt>Domain</dt><dd>ENU local frame</dd></div>
                <div><dt>Reference</dt><dd>Analytical basis construction</dd></div>
                <div><dt>Execution</dt><dd>Automated / CTest</dd></div>
              </dl>
              <div className="verificationLinks">
                <Link className="verificationButton" to="/verification/ver-frm-003">
                  View verification case
                </Link>
                <Link className="verificationTextLink" to="/mathematics/coordinateTransformation">
                  Open mathematical model
                </Link>
              </div>
            </article>

            <article className="verificationCard verificationCardPass">
              <div className="verificationCardHeader">
                <span className="verificationId">VER-FRM-004</span>
                <span className="verificationStatus">PASS</span>
              </div>
              <h3>MCI ↔ MCMF Lunar Rotation</h3>
              <p>
                Verifies time-zero, principal-axis and arbitrary-angle transformations,
                velocity transport terms, physical positive lunar rotation, and roundtrip
                consistency between inertial and Moon-fixed frames.
              </p>
              <dl className="verificationMeta">
                <div><dt>Domain</dt><dd>MCI / MCMF</dd></div>
                <div><dt>Reference</dt><dd>Analytical rotation</dd></div>
                <div><dt>Execution</dt><dd>Automated / CTest</dd></div>
              </dl>
              <div className="verificationLinks">
                <Link className="verificationButton" to="/verification/ver-frm-004">
                  View verification case
                </Link>
                <Link className="verificationTextLink" to="/mathematics/coordinateTransformation">
                  Open mathematical model
                </Link>
              </div>
            </article>

            <article className="verificationCard verificationCardPass">
              <div className="verificationCardHeader">
                <span className="verificationId">VER-FRM-005</span>
                <span className="verificationStatus">PASS</span>
              </div>
              <h3>SBF ↔ MCI Attitude Transformation</h3>
              <p>
                Verifies quaternion conventions, principal-axis rotations, arbitrary
                normalized attitudes, quaternion sign equivalence, state transformation,
                inverse mapping, and roundtrip consistency.
              </p>
              <dl className="verificationMeta">
                <div><dt>Domain</dt><dd>SBF / MCI</dd></div>
                <div><dt>Reference</dt><dd>Analytical quaternion rotation</dd></div>
                <div><dt>Execution</dt><dd>Automated / CTest</dd></div>
              </dl>
              <div className="verificationLinks">
                <Link className="verificationButton" to="/verification/ver-frm-005">
                  View verification case
                </Link>
                <Link className="verificationTextLink" to="/mathematics/coordinateTransformation">
                  Open mathematical model
                </Link>
              </div>
            </article>

            <article className="verificationCard verificationCardPass">
              <div className="verificationCardHeader">
                <span className="verificationId">VER-FRM-006</span>
                <span className="verificationStatus">PASS</span>
              </div>
              <h3>LVLH Construction and Projection</h3>
              <p>
                Verifies LVLH frame construction for representative orbital states,
                degenerate radial and pole-aligned fallback cases, local projection, inverse
                mapping, and roundtrip behavior.
              </p>
              <dl className="verificationMeta">
                <div><dt>Domain</dt><dd>LVLH frame</dd></div>
                <div><dt>Reference</dt><dd>Analytical basis construction</dd></div>
                <div><dt>Execution</dt><dd>Automated / CTest</dd></div>
              </dl>
              <div className="verificationLinks">
                <Link className="verificationButton" to="/verification/ver-frm-006">
                  View verification case
                </Link>
                <Link className="verificationTextLink" to="/mathematics/coordinateTransformation">
                  Open mathematical model
                </Link>
              </div>
            </article>

            <article className="verificationCard verificationCardPass">
              <div className="verificationCardHeader">
                <span className="verificationId">VER-FRM-007</span>
                <span className="verificationStatus">PASS</span>
              </div>
              <h3>Frame Robustness and Chained Roundtrips</h3>
              <p>
                Verifies repeated and chained frame transformations, 1000-cycle MCI/MCMF
                roundtrips, high-altitude and near-surface states, near-pole behavior,
                longitude wraparound, and finite representative outputs.
              </p>
              <dl className="verificationMeta">
                <div><dt>Domain</dt><dd>Frame robustness</dd></div>
                <div><dt>Reference</dt><dd>Roundtrip + invariants</dd></div>
                <div><dt>Execution</dt><dd>Automated / CTest</dd></div>
              </dl>
              <div className="verificationLinks">
                <Link className="verificationButton" to="/verification/ver-frm-007">
                  View verification case
                </Link>
                <Link className="verificationTextLink" to="/mathematics/coordinateTransformation">
                  Open mathematical model
                </Link>
              </div>
            </article>
          </div>
        </section>

        <section className="verificationSection">
          <h2>Propulsion</h2>

          <div className="verificationGrid">
            <article className="verificationCard verificationCardPass">
              <div className="verificationCardHeader">
                <span className="verificationId">VER-PROP-001</span>
                <span className="verificationStatus">PASS</span>
              </div>
              <h3>Propulsion Force and Torque Generation</h3>
              <p>
                Verifies main-engine thrust buildup and direction, single-thruster force and
                torque generation, force and torque aggregation, pure-force and pure-torque
                RCS configurations, combined commands, and ±X/±Y/±Z body-axis sign
                conventions.
              </p>
              <dl className="verificationMeta">
                <div><dt>Domain</dt><dd>Main engine + RCS</dd></div>
                <div><dt>Reference</dt><dd>Analytical first-order response and τ = r × F</dd></div>
                <div><dt>Execution</dt><dd>Automated / CTest</dd></div>
              </dl>
              <div className="verificationLinks">
                <Link className="verificationButton" to="/verification/ver-prop-001">
                  View verification case
                </Link>
                <Link className="verificationTextLink" to="/mathematics/thrust">
                  Open thrust model
                </Link>
                <Link className="verificationTextLink" to="/mathematics/RCSBasicModel">
                  Open RCS actuator model
                </Link>
                <Link className="verificationTextLink" to="/mathematics/RCSControlAllocation">
                  Open RCS allocation model
                </Link>
              </div>
            </article>
          </div>
        </section>

        <section className="verificationSection verificationCallout">
          <h2>Current Verification Baseline</h2>
          <p>
            The current SDF Light verification baseline covers free translational motion,
            principal-axis rigid-body rotation, the complete implemented coordinate-frame
            chain, and propulsion force/torque generation. These automated cases are
            maintained as permanent regression evidence and are executed through GoogleTest
            and CTest.
          </p>
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
