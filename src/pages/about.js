import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import '../css/about.css';

const capabilityCards = [
  {
    kicker: 'SIMULATE',
    title: 'Spacecraft motion in 6DoF',
    text: 'Run translational and rotational spacecraft dynamics with propulsion, fuel, reference frames, and attitude propagation.',
  },
  {
    kicker: 'DEVELOP',
    title: 'Guidance and control',
    text: 'Build and test manual control, controllers, autopilot logic, and physically modeled main-engine and RCS actuation.',
  },
  {
    kicker: 'EXPERIMENT',
    title: 'Models and configurations',
    text: 'Define spacecraft in JSON, exchange subsystem models, and use the modular C++ architecture as an engineering testbed.',
  },
  {
    kicker: 'ANALYZE',
    title: 'Engineering telemetry',
    text: 'Inspect simulation state in the cockpit and export recorded telemetry to XML for validation and post-processing.',
  },
];

const audienceCards = [
  {
    title: 'Students & Engineers',
    text: 'Inspect how spacecraft dynamics, coordinate frames, propulsion, control, and software architecture work together.',
  },
  {
    title: 'GNC & Simulation Developers',
    text: 'Prototype controllers, spacecraft configurations, physical models, and verification scenarios in a transparent simulation stack.',
  },
  {
    title: 'Open-Source Contributors',
    text: 'Contribute to a real C++/Qt aerospace project with separated subsystems, explicit interfaces, tests, and public engineering documentation.',
  },
];

export default function About() {
  const aboutLogo = useBaseUrl('/img/about/logo.svg');
  const fallbackLogo = useBaseUrl('/img/logo.svg');
  const aboutVideo = useBaseUrl('/img/about/application-demo.mp4');
  const fallbackVideo = useBaseUrl('/img/simulation/3DDemo.mp4');

  return (
    <Layout
      title="About | Spaceflight Dynamics Framework"
      description="Discover SDF: an open-source C++/Qt framework for 6DoF spacecraft dynamics, guidance, control, telemetry, and simulation research.">
      <main className="aboutPage">
        <section className="aboutHero">
          <div className="aboutHeroCopy">
            <div className="aboutLogoRow">
              <img
                src={aboutLogo}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = fallbackLogo;
                }}
                alt="Spaceflight Dynamics Framework logo"
                className="aboutHeroLogo"
              />
              <span className="aboutEyebrow">OPEN-SOURCE SPACEFLIGHT SIMULATION</span>
            </div>

            <h1>Understand, control, and analyze spacecraft motion.</h1>
            <p className="aboutHeroLead">
              <strong>Spaceflight Dynamics Framework (SDF)</strong> is a modular C++/Qt
              simulation framework for spacecraft dynamics, propulsion, guidance,
              control, and engineering telemetry.
            </p>
            <p className="aboutHeroText">
              It turns the complete path from spacecraft configuration and control input
              to physical motion and recorded telemetry into an inspectable,
              modifiable engineering environment.
            </p>

            <div className="aboutHeroActions">
              <Link className="button button--primary button--lg" to="/simulation">
                Explore the Simulation
              </Link>
              <a
                className="button button--secondary button--lg"
                href="https://github.com/gerd-lrt-dev/spaceflight-dynamics-framework"
                target="_blank"
                rel="noreferrer">
                View on GitHub
              </a>
            </div>

            <div className="aboutTechLine" aria-label="Core technologies and capabilities">
              <span>C++</span>
              <span>Qt</span>
              <span>6DoF</span>
              <span>GNC</span>
              <span>Telemetry</span>
              <span>Open Source</span>
            </div>
          </div>

          <div className="aboutHeroVisual">
            <video
              className="aboutHeroVideo"
              autoPlay
              muted
              loop
              playsInline
              controls
              poster={useBaseUrl('/img/simulation/Simulation_Beispiel3.png')}>
              <source src={aboutVideo} type="video/mp4" />
              <source src={fallbackVideo} type="video/mp4" />
              Your browser does not support embedded video.
            </video>
            <p className="aboutVisualCaption">
              Current application footage. The demo asset will be replaced as the UI evolves.
            </p>
          </div>
        </section>

        <section className="aboutSection aboutCenteredSection">
          <span className="aboutSectionKicker">WHAT CAN I DO WITH SDF?</span>
          <h2>A simulation framework built for engineering work</h2>
          <p className="aboutSectionLead">
            SDF is not a fixed lunar-landing demo. The lunar scenario is the current
            proving ground for a reusable spacecraft simulation architecture.
          </p>

          <div className="aboutCardGrid aboutCapabilityGrid">
            {capabilityCards.map((card) => (
              <article className="aboutCard aboutCapabilityCard" key={card.kicker}>
                <span className="aboutCardKicker">{card.kicker}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="aboutSection aboutWhySection">
          <div className="aboutSectionHeading">
            <span className="aboutSectionKicker">WHY SDF?</span>
            <h2>Make the simulation understandable, not just executable.</h2>
          </div>

          <div className="aboutWhyGrid">
            <article>
              <span className="aboutWhyNumber">01</span>
              <h3>Physics you can inspect</h3>
              <p>
                Dynamics, propulsion, coordinate systems, control, numerical integration,
                and telemetry are explicit software components rather than a black box.
              </p>
            </article>
            <article>
              <span className="aboutWhyNumber">02</span>
              <h3>Built for experimentation</h3>
              <p>
                Spacecraft configurations and simulation subsystems are separated so the
                framework can evolve with new models, controllers, scenarios, and research questions.
              </p>
            </article>
            <article>
              <span className="aboutWhyNumber">03</span>
              <h3>Engineering data, not just visuals</h3>
              <p>
                The cockpit is one consumer of the simulation. Recorded telemetry and XML
                export make the same simulation useful for verification and post-processing.
              </p>
            </article>
          </div>
        </section>

        <section className="aboutSection">
          <div className="aboutSectionHeading aboutCenteredHeading">
            <span className="aboutSectionKicker">SEE IT IN CONTEXT</span>
            <h2>One framework, several engineering viewpoints</h2>
          </div>

          <div className="aboutFeatureRows">
            <article className="aboutFeatureRow">
              <div className="aboutFeatureVisual aboutFeatureVisual--dynamics">
                <span>6DoF</span>
              </div>
              <div className="aboutFeatureCopy">
                <span className="aboutCardKicker">SPACECRAFT DYNAMICS</span>
                <h3>Translation, rotation, attitude, and frames</h3>
                <p>
                  Propagate a rigid-body spacecraft state while keeping inertial, lunar-fixed,
                  landing-site-relative, orbital, and body-frame representations available to
                  the subsystems that need them.
                </p>
                <Link to="/simulation/architecture">Explore the architecture →</Link>
              </div>
            </article>

            <article className="aboutFeatureRow aboutFeatureRow--reverse">
              <div className="aboutFeatureVisual aboutFeatureVisual--control">
                <span>GNC</span>
              </div>
              <div className="aboutFeatureCopy">
                <span className="aboutCardKicker">GUIDANCE & CONTROL</span>
                <h3>From command to physical response</h3>
                <p>
                  Manual commands, automated control, main-engine thrust, and RCS actuation
                  interact with the same physics core rather than bypassing the vehicle model.
                </p>
                <Link to="/simulation/data-flow">Follow the runtime data flow →</Link>
              </div>
            </article>

            <article className="aboutFeatureRow">
              <div className="aboutFeatureVisual aboutFeatureVisual--telemetry">
                <span>XML</span>
              </div>
              <div className="aboutFeatureCopy">
                <span className="aboutCardKicker">TELEMETRY & ANALYSIS</span>
                <h3>Turn a simulation run into inspectable data</h3>
                <p>
                  Runtime telemetry feeds the Qt cockpit and can be recorded and exported
                  for later analysis, debugging, and systematic verification work.
                </p>
                <Link to="/simulation">See the simulation frontend →</Link>
              </div>
            </article>
          </div>
        </section>

        <section className="aboutSection aboutAudienceSection">
          <div className="aboutSectionHeading aboutCenteredHeading">
            <span className="aboutSectionKicker">WHO IS IT FOR?</span>
            <h2>For people who want to look inside the simulation</h2>
          </div>

          <div className="aboutCardGrid aboutAudienceGrid">
            {audienceCards.map((card) => (
              <article className="aboutCard" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="aboutStatusSection">
          <div>
            <span className="aboutSectionKicker">SDF TODAY</span>
            <h2>Pre-release, with the 6DoF core in place.</h2>
            <p>
              Development is currently focused on release readiness and systematic
              verification of the simulation core before the first lightweight public release.
            </p>
          </div>

          <dl className="aboutStatusGrid">
            <div>
              <dt>Status</dt>
              <dd>Pre-release development</dd>
            </div>
            <div>
              <dt>Core</dt>
              <dd>6DoF spacecraft dynamics</dd>
            </div>
            <div>
              <dt>Current focus</dt>
              <dd>Verification & release readiness</dd>
            </div>
            <div>
              <dt>Project model</dt>
              <dd>Open-source C++ / Qt</dd>
            </div>
          </dl>
        </section>

        <section className="aboutExploreSection">
          <h2>Go deeper</h2>
          <p>Use the technical pages when you want implementation detail.</p>
          <div className="aboutExploreLinks">
            <Link to="/simulation/architecture">Architecture</Link>
            <Link to="/simulation/data-flow">Runtime Data Flow</Link>
            <Link to="/docs">Mathematics</Link>
            <a
              href="https://github.com/gerd-lrt-dev/spaceflight-dynamics-framework"
              target="_blank"
              rel="noreferrer">
              GitHub
            </a>
          </div>
        </section>
      </main>
    </Layout>
  );
}
