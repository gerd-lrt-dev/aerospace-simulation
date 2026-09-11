import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import '../../css/data-flow.css';

function FlowBlock({ children }) {
  return <pre className="flowBlock"><code>{children}</code></pre>;
}

export default function RuntimeDataFlow() {
  return (
    <Layout
      title="Runtime Data Flow | Spaceflight Dynamics Framework"
      description="Detailed runtime data paths, state ownership, frame resolution, physics propagation, and telemetry flow in the Spaceflight Dynamics Framework">

      <main className="dataFlowContainer">
        <h1>SDF Runtime Data Flow</h1>

        <p className="dataFlowLead">
          This page complements the <Link to="/simulation/architecture">system architecture overview</Link>.
          The architecture page explains which subsystems exist and how responsibilities are separated;
          this page focuses on how configuration, commands, forces, state, reference frames, and telemetry
          move through the running simulation.
        </p>

        <div className="flowNote">
          <strong>Core rule:</strong> the configured initial state may be expressed in ENU or MCI,
          but after one-time initialization the authoritative translational runtime state is propagated in MCI.
          MCMF, MSC, ENU, LVLH, and SBF representations are derived from that runtime state.
        </div>

        <nav className="dataFlowNav" aria-label="Runtime data flow sections">
          <a href="#initialization">Initialization</a>
          <a href="#control">Control</a>
          <a href="#forces">Forces</a>
          <a href="#propagation">Propagation</a>
          <a href="#frames">Frames</a>
          <a href="#telemetry">Telemetry</a>
          <a href="#lifecycle">Lifecycle</a>
          <a href="#ownership">Ownership</a>
        </nav>

        <section id="initialization" className="flowSection">
          <h2>1. Configuration to Authoritative Runtime State</h2>

          <p>
            Spacecraft configuration describes how the initial position and velocity are expressed.
            The configuration layer does not define the runtime propagation frame. Current SDF supports
            two consistent initialization modes: ENU/ENU and MCI/MCI. Mixed position and velocity frame
            combinations are rejected.
          </p>

          <FlowBlock>{`JSON spacecraft configuration
        ↓
jsonConfigReader
        ↓
customSpacecraft + MissionContext
        ↓
Mission-frame initialization
        ↓
Configured initial-state resolution
        ↓
Authoritative StateVector
(MCI position + MCI velocity)`}</FlowBlock>

          <div className="flowGrid">
            <div className="flowCard">
              <h3>Landing-site-relative ENU</h3>
              <FlowBlock>{`Landing Site (MSC)
        ↓
MCMF landing-site state
        ↓
Landing-site ENU frame
        ↓
Configured ENU state
        ↓
ENU → MCMF → MCI
        ↓
StateVector`}</FlowBlock>
              <p>
                ENU is an input and mission/navigation representation. It is resolved once during initialization.
              </p>
            </div>

            <div className="flowCard">
              <h3>Direct MCI</h3>
              <FlowBlock>{`Configured MCI state
        ↓
Direct assignment
        ↓
StateVector`}</FlowBlock>
              <p>
                Direct MCI initialization remains available for orbital, low-level, analytical, and verification scenarios.
              </p>
            </div>
          </div>
        </section>

        <section id="control" className="flowSection">
          <h2>2. Control Input to Actuation</h2>

          <p>
            Frontend input and automated control produce commands, not forces. The propulsion subsystem owns
            the conversion from those commands into engine and RCS actuator states.
          </p>

          <FlowBlock>{`Manual path:
User Input
  ↓
inputmapper
  ↓
FlightCommandDTO
  ↓
cockpitPage
  ↓
SimulationWorker
  ↓
TelemetryMapper
  ↓
ControlCommand
  ↓
InputArbiter
  ↓
simcontrol
  ↓
spacecraft
  ↓
Thrust

Autopilot path:
spacecraft state
  ↓
AdaptiveDescentController
  ↓
PD Controller
  ↓
ControlCommand
  ↓
InputArbiter`}</FlowBlock>

          <p>
            Translational and rotational RCS requests are routed through the propulsion allocator before reaching
            individual thruster models. Main-engine commands are forwarded to the main-engine model.
          </p>
        </section>

        <section id="forces" className="flowSection">
          <h2>3. Propulsion Force Generation to Physics</h2>

          <p>
            Main-engine and RCS models generate forces and torques in the spacecraft body frame. The Thrust
            orchestrator aggregates propulsion outputs before the translational force vector is transformed into MCI.
          </p>

          <FlowBlock>{`Main Engine + RCS
        ↓
Thrust Orchestrator
(SBF forces + torques)
        ↓
SBF → MCI force transform
        ↓
physics::computeAcc()
        ↓
BasicMoonGravityModel
        ↓
Gravity + thrust / mass
        ↓
Total MCI acceleration`}</FlowBlock>

          <div className="flowNote">
            Controller output is an actuation request. It is not a parallel physical force source.
            Propulsion owns command-to-force conversion; physics owns state-derivative evaluation.
          </div>
        </section>

        <section id="propagation" className="flowSection">
          <h2>4. Physics Calculation to State Propagation</h2>

          <p>
            <code>spacecraft::updateMovementData()</code> coordinates dynamics and integration. The physics and
            integrator layers compute new values, while the spacecraft object commits them to the authoritative state.
          </p>

          <FlowBlock>{`Authoritative StateVector
        ↓
spacecraft::updateMovementData()
        ↓
SBF thrust → MCI
        ↓
Translational acceleration
        ↓
EulerIntegrator
        ↓
MCI velocity + position

SBF torque
        ↓
Rotational physics
        ↓
Angular acceleration
        ↓
EulerIntegrator
        ↓
SBF angular velocity + IB attitude
        ↓
StateVector commit`}</FlowBlock>

          <p>
            The current runtime state combines MCI translational quantities with quaternion-based attitude and
            body-fixed angular velocity. Derived navigation frames are updated after the state commit.
          </p>
        </section>

        <section id="frames" className="flowSection">
          <h2>5. Mission Context and Derived Runtime Frames</h2>

          <p>
            SDF separates stable mission references from state-dependent frame representations.
            <code>MissionContext</code> contains mission-level references; <code>SimulationFrameContext</code>
            contains frame representations derived from the current spacecraft state.
          </p>

          <div className="flowGrid">
            <div className="flowCard">
              <h3>MissionContext</h3>
              <ul>
                <li>Canonical landing site in MSC</li>
                <li>Derived landing-site state in MCMF</li>
                <li>Derived landing-site state in MCI</li>
                <li>Landing-site ENU frame</li>
              </ul>
              <p>These are mission references, not integrated spacecraft state.</p>
            </div>

            <div className="flowCard">
              <h3>SimulationFrameContext</h3>
              <ul>
                <li>MCI spacecraft state</li>
                <li>MCMF spacecraft state</li>
                <li>MSC latitude / longitude / altitude</li>
                <li>ENU spacecraft state and ENU frame</li>
                <li>LVLH spacecraft state and LVLH frame</li>
                <li>SBF frame derived from spacecraft attitude and origin</li>
              </ul>
            </div>
          </div>

          <FlowBlock>{`Authoritative StateVector
        ↓
spacecraft::updateFrames(time)
        ↓
MCI_State
        ↓
MCMF_State
   ├──→ MSC_State
   └──→ ENU_State

MCI_State
   └──→ LVLH_State

StateVector attitude + origin
   └──→ SBF_Frame`}</FlowBlock>
        </section>

        <section id="telemetry" className="flowSection">
          <h2>6. Backend State to Frontend Telemetry</h2>

          <p>
            Backend domain state remains inside the simulation engine. The frontend receives explicit telemetry DTOs
            across the Qt thread boundary.
          </p>

          <FlowBlock>{`StateVector ────────────────┐
SimulationFrameContext ──────┼──→ simData ──→ TelemetryMapper ──→ TelemetryDTO
MissionContext ──────────────┘

spacecraft propulsion / tanks / G-load / integrity
        └──────────────────────────────→ simData

TelemetryDTO
        ↓
SimulationWorker::stateUpdated
        ↓
Qt thread boundary
        ↓
cockpitPage / visualization`}</FlowBlock>

          <p>
            Current telemetry exposes the authoritative MCI navigation state together with derived MCI, MCMF, MSC,
            ENU, and LVLH frame data. This provides a stable interface for cockpit visualization and future export,
            validation, replay, and ROS-oriented workflows.
          </p>
        </section>

        <section id="lifecycle" className="flowSection">
          <h2>7. Simulation Lifecycle</h2>

          <FlowBlock>{`ConfigManager
        ↓
MainWindow
        ↓
SimulationWorker
        ↓
TelemetryMapper
        ↓
simcontrol
        ↓
jsonConfigReader
        ↓
customSpacecraft + MissionContext
        ↓
spacecraft construction
        ↓
Mission-frame initialization
        ↓
Initial-state resolution
        ↓
Authoritative MCI StateVector
        ↓
QTimer-driven simulation loop`}</FlowBlock>

          <p>
            During each simulation step, propulsion is advanced, movement is propagated, frame representations are
            reconstructed from the updated state, landing/integrity logic is evaluated, and telemetry is generated.
          </p>
        </section>

        <section id="ownership" className="flowSection">
          <h2>8. State Ownership Summary</h2>

          <div className="flowGrid">
            <div className="flowCard">
              <h3>Authoritative runtime state</h3>
              <p>
                <strong>StateVector</strong> is owned by <strong>spacecraft</strong> and is the source of truth for
                propagated position, velocity, attitude, and angular velocity.
              </p>
            </div>

            <div className="flowCard">
              <h3>Mission references</h3>
              <p>
                <strong>MissionContext</strong> holds stable mission-specific navigation references such as the
                landing site and its derived reference frames.
              </p>
            </div>

            <div className="flowCard">
              <h3>Derived frame state</h3>
              <p>
                <strong>SimulationFrameContext</strong> is reconstructed from the authoritative state and is not
                integrated directly by the physics engine.
              </p>
            </div>

            <div className="flowCard">
              <h3>Telemetry snapshot</h3>
              <p>
                <strong>simData</strong> aggregates runtime state and subsystem telemetry for mapping into the
                frontend-facing <strong>TelemetryDTO</strong>.
              </p>
            </div>
          </div>
        </section>

        <section className="flowSourceLink">
          <h2>Contributor-Level Reference</h2>
          <p>
            The website intentionally presents the stable architectural view. The code-near reference, including
            detailed subsystem responsibilities and implementation-oriented data-flow notes, is maintained with the
            simulation source in <a href="https://github.com/gerd-lrt-dev/spaceflight-dynamics-framework/blob/main/docs/data-flow-diagrams.md">docs/data-flow-diagrams.md</a>.
          </p>
          <p>
            Return to the <Link to="/simulation/architecture">SDF Architecture overview</Link> for subsystem structure,
            physics, propulsion, frontend, and backend architecture.
          </p>
        </section>
      </main>
    </Layout>
  );
}
