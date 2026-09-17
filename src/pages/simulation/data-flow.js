import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import '../../css/data-flow.css';

function FlowBlock({ children }) {
  return <pre className="flowBlock"><code>{children}</code></pre>;
}

function LayerLegend() {
  return (
    <div className="layerLegend" aria-label="Architecture layer legend">
      <span className="layerLegendItem"><span className="layerLegendSwatch layerLegendFrontend" />Frontend</span>
      <span className="layerLegendItem"><span className="layerLegendSwatch layerLegendInterface" />Interface Layer</span>
      <span className="layerLegendItem"><span className="layerLegendSwatch layerLegendBackend" />Backend</span>
    </div>
  );
}

export default function RuntimeDataFlow() {
  return (
    <Layout
      title="Runtime Data Flow | Spaceflight Dynamics Framework"
      description="Runtime data paths, state ownership, frame resolution, command timing, telemetry recording, and XML export in the Spaceflight Dynamics Framework">

      <main className="dataFlowContainer">
        <h1>SDF Runtime Data Flow</h1>

        <p className="dataFlowLead">
          This page complements the <Link to="/simulation/architecture">system architecture overview</Link>.
          The architecture page explains which subsystems exist and how responsibilities are separated;
          this page focuses on how configuration, commands, forces, state, reference frames, telemetry,
          and recorded simulation data move through the running application.
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
          <a href="#recording">Recording & XML</a>
          <a href="#lifecycle">Lifecycle</a>
          <a href="#ownership">Ownership</a>
        </nav>

        <section id="initialization" className="flowSection">
          <h2>1. Configuration to Authoritative Runtime State</h2>

          <p>
            Spacecraft configuration describes how the initial position and velocity are expressed.
            It does not define the runtime propagation frame. Current SDF supports two consistent
            initialization modes: ENU/ENU and MCI/MCI. Mixed position and velocity frame combinations
            are rejected by the configuration reader.
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
            conversion from those commands into main-engine and RCS actuator states.
          </p>

          <LayerLegend />

          <div className="layerFlow">
            <div className="archLayer archLayerFrontend">
              <div className="archLayerLabel">Frontend</div>
              <FlowBlock>{`User Input
  ↓
inputmapper
  ↓
FlightCommandDTO
  ↓
cockpitPage
  ↓
SimulationWorker`}</FlowBlock>
            </div>

            <div className="layerBoundaryArrow" aria-hidden="true">↓</div>

            <div className="archLayer archLayerInterface">
              <div className="archLayerLabel">Interface Layer</div>
              <FlowBlock>{`TelemetryMapper
  ↓
ControlCommand`}</FlowBlock>
            </div>

            <div className="layerBoundaryArrow" aria-hidden="true">↓</div>

            <div className="archLayer archLayerBackend">
              <div className="archLayerLabel">Backend</div>
              <FlowBlock>{`Manual ControlCommand ───────┐
                           ↓
                      InputArbiter
                           ↑
spacecraft state → AdaptiveDescentController → PD Controller
                           ↓
                       simcontrol
                           ↓
                       spacecraft
                           ↓
                         Thrust`}</FlowBlock>
            </div>
          </div>

          <p>
            The visual grouping marks the application boundaries explicitly: UI input and worker scheduling remain in
            the frontend/application layer, <code>TelemetryMapper</code> and the DTO/domain-command translation form
            the interface boundary, and arbitration, simulation orchestration, spacecraft logic, and propulsion are
            backend responsibilities. Manual and automated control paths meet at <code>InputArbiter</code>.
          </p>

          <h3>Per-step command timing</h3>
          <p>
            Commands are transferred before the backend simulation advances. This prevents a one-step delay
            between frontend input and backend actuation.
          </p>

          <FlowBlock>{`sendControlCommands()
        ↓
runStepSimulation(dt)
        ↓
getQTTelemetryData()
        ↓
append telemetry history
        ↓
emit stateUpdated(...)`}</FlowBlock>
        </section>

        <section id="forces" className="flowSection">
          <h2>3. Propulsion Force Generation to Physics</h2>

          <p>
            Main-engine and RCS models generate forces and torques in the spacecraft body frame. The Thrust
            orchestrator aggregates those outputs before the translational force vector is transformed into MCI.
          </p>

          <FlowBlock>{`Main Engine + RCS
        ↓
Thrust Orchestrator
(SBF forces + torques)
        ↓
Current spacecraft attitude
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
            The SBF thrust vector is transformed using the <strong>current spacecraft attitude</strong>, not a static
            initialization orientation. Controller output remains an actuation request; propulsion owns command-to-force
            conversion and physics owns state-derivative evaluation.
          </div>
        </section>

        <section id="propagation" className="flowSection">
          <h2>4. Physics Calculation to State Propagation</h2>

          <p>
            <code>spacecraft::updateMovementData()</code> coordinates dynamics and integration. The physics and
            integrator layers compute updated quantities, while <code>spacecraft</code> commits them to the authoritative state.
          </p>

          <FlowBlock>{`Authoritative StateVector
        ↓
spacecraft::updateMovementData()
        ↓
Current-attitude SBF thrust → MCI
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
StateVector commit
        ↓
spacecraft::updateFrames(time)`}</FlowBlock>

          <p>
            Derived frame representations are reconstructed only after the current step has been committed.
            <code>SimulationFrameContext</code> therefore represents one coherent snapshot of the authoritative state.
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
              <p>These are persistent mission references, not propagated spacecraft state.</p>
            </div>

            <div className="flowCard">
              <h3>SimulationFrameContext</h3>
              <ul>
                <li>MCI spacecraft state</li>
                <li>MCMF spacecraft state</li>
                <li>MSC latitude / longitude / altitude</li>
                <li>ENU spacecraft state and ENU frame</li>
                <li>LVLH spacecraft state and LVLH frame</li>
                <li>SBF frame derived from current attitude and origin</li>
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
            Backend domain state remains inside the simulation engine. After each completed step, one coherent
            backend snapshot is mapped into a frontend-facing <code>TelemetryDTO</code>.
          </p>

          <LayerLegend />

          <div className="layerFlow">
            <div className="archLayer archLayerBackend">
              <div className="archLayerLabel">Backend</div>
              <FlowBlock>{`spacecraft::time ───────────┐
StateVector ─────────────────┤
SimulationFrameContext ──────┼──→ simData
MissionContext ──────────────┤
propulsion / tanks / sensors ┘`}</FlowBlock>
            </div>

            <div className="layerBoundaryArrow" aria-hidden="true">↓</div>

            <div className="archLayer archLayerInterface">
              <div className="archLayerLabel">Interface Layer</div>
              <FlowBlock>{`TelemetryMapper
      ↓
TelemetryDTO`}</FlowBlock>
            </div>

            <div className="layerBoundaryArrow" aria-hidden="true">↓</div>

            <div className="archLayer archLayerFrontend">
              <div className="archLayerLabel">Frontend / Application</div>
              <FlowBlock>{`SimulationWorker
   ├──→ telemetry history
   └──→ stateUpdated(...)
             ↓
       Qt thread boundary
             ↓
       cockpit / visualization`}</FlowBlock>
            </div>
          </div>

          <p>
            The same layer colors are intentionally reused in the reverse direction. Backend state is aggregated into
            <code>simData</code>, translated at the interface boundary into <code>TelemetryDTO</code>, and then consumed
            by the worker/application layer for history recording and UI delivery.
          </p>

          <h3>Authoritative simulation time</h3>
          <FlowBlock>{`spacecraft::time
        ↓
simData::time
        ↓
TelemetryMapper
        ↓
TelemetryDTO::time
        ↓
Cockpit / Export`}</FlowBlock>

          <p>
            The worker does not maintain a second simulation clock. The backend time used for time-dependent frame
            derivation is the same time exposed to telemetry consumers and scientific export.
          </p>
        </section>

        <section id="recording" className="flowSection">
          <h2>7. Telemetry Recording and XML Export</h2>

          <p>
            Scientific export reuses the same <code>TelemetryDTO</code> snapshots consumed by the frontend.
            Recording is owned by <code>SimulationWorker</code>; XML serialization is delegated to
            <code>TelemetryXmlExporter</code>.
          </p>

          <FlowBlock>{`simData
   ↓
TelemetryMapper
   ↓
TelemetryDTO
   ↓
SimulationWorker
   ├──→ stateUpdated → Cockpit / Visualization
   └──→ telemetryHistory_
                  ↓ export request
          TelemetryXmlExporter
                  ↓
            XML telemetry file`}</FlowBlock>

          <ul>
            <li>One snapshot is recorded after each completed backend simulation step.</li>
            <li>Pause adds no snapshots because no backend steps are executed.</li>
            <li>Stop terminates the active session but does not silently overwrite recorded history.</li>
            <li>Starting a new run with existing history requires explicit overwrite confirmation before clearing it.</li>
            <li><code>TelemetryXmlExporter</code> serializes existing history; it does not generate simulation state.</li>
          </ul>

          <div className="flowNote">
            Cockpit visualization and XML export therefore share one telemetry contract and one coherent per-step snapshot.
          </div>
        </section>

        <section id="lifecycle" className="flowSection">
          <h2>8. Simulation Lifecycle</h2>

          <p>
            The runtime lifecycle distinguishes initial start, pause/resume, and stop/reset. Resume continues the
            existing backend state; it must not reinitialize the spacecraft.
          </p>

          <FlowBlock>{`Configuration available
        ↓
Start requested
        ↓
initialized?
   ├── no ─→ existing history?
   │             ├── yes → overwrite confirmation → clear history
   │             └── no
   │                    ↓
   │              backend initialize
   │                    ↓
   └── yes ─────────→ start QTimer
                         ↓
                   simulation steps

Pause → stop QTimer only
        ↓
 preserve backend state + time + fuel + attitude
        ↓
Resume → start QTimer, no reinitialization

Stop → stop QTimer
       → reset UI telemetry
       → backend reset
       → initialized = false`}</FlowBlock>

          <ul>
            <li><strong>Initial start:</strong> creates and initializes the backend simulation session.</li>
            <li><strong>Pause:</strong> freezes the step timer while preserving the complete backend state.</li>
            <li><strong>Resume:</strong> continues the existing initialized session.</li>
            <li><strong>Stop:</strong> terminates/resets the active simulation session.</li>
            <li><strong>Restart after stop:</strong> creates a new session from configuration after any required history confirmation.</li>
          </ul>
        </section>

        <section id="ownership" className="flowSection">
          <h2>9. State Ownership Summary</h2>

          <div className="flowGrid">
            <div className="flowCard">
              <h3>Authoritative runtime state</h3>
              <p>
                <strong>StateVector</strong> is owned by <strong>spacecraft</strong> and is the source of truth for
                propagated position, velocity, attitude, and angular velocity.
              </p>
            </div>

            <div className="flowCard">
              <h3>Simulation time</h3>
              <p>
                <strong>spacecraft::time</strong> is the authoritative backend simulation clock and is propagated
                through <strong>simData</strong> into <strong>TelemetryDTO</strong>.
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
                <strong>SimulationFrameContext</strong> is reconstructed from the authoritative state after each
                commit and is not independently integrated.
              </p>
            </div>

            <div className="flowCard">
              <h3>Telemetry snapshot</h3>
              <p>
                <strong>simData</strong> aggregates one backend step into the frontend/export-facing
                <strong> TelemetryDTO</strong> contract.
              </p>
            </div>

            <div className="flowCard">
              <h3>Recorded telemetry</h3>
              <p>
                <strong>SimulationWorker</strong> owns the telemetry history. <strong>TelemetryXmlExporter</strong>
                serializes that history without owning simulation state.
              </p>
            </div>
          </div>
        </section>

        <section className="flowSourceLink">
          <h2>Contributor-Level Reference</h2>
          <p>
            This website presents the stable architectural view. The code-near reference, including detailed
            subsystem responsibilities and implementation-oriented data-flow notes, is maintained with the simulation
            source in <a href="https://github.com/gerd-lrt-dev/spaceflight-dynamics-framework/blob/main/docs/data-flow-diagrams.md">docs/data-flow-diagrams.md</a>.
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
