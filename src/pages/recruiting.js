import React from 'react';
import Layout from '@theme/Layout';
import '../css/recruiting.css';

export default function Recruiting() {
  return (
    <Layout
      title="Recruiting & Collaboration | Spaceflight Dynamics Framework"
      description="Open-source collaboration, contribution philosophy, and community participation within the Spaceflight Dynamics Framework">

      <main className="recruitingContainer">

        <h1>Recruiting & Collaboration</h1>

        <section className="recruitIntro">

          <div className="recruitIntroText">

            <p>
              <strong>Spaceflight Dynamics Framework (SDF)</strong> started as a
              small personal experiment in physics-based simulation, software
              architecture, and control-system development. Over time, the scope
              of the project has grown steadily — both in technical depth and in
              conceptual ambition.
            </p>

            <p>
              What originally began as a lunar landing simulation is now evolving
              toward a broader open-source framework for spacecraft dynamics,
              propulsion modeling, telemetry-driven analysis, and future
              autonomous flight research.
            </p>

            <p>
              All development is fully <strong>open source</strong>, enabling
              contributors to explore, understand, modify, discuss, and extend
              the project architecture collaboratively.
            </p>

          </div>

          <div className="recruitIntroImage">

            <img
              src="/img/recruiting/join.png"
              alt="Join the SDF mission"
            />

            <p className="imageCredit">
              Image generated with AI
            </p>

          </div>

        </section>

        <section className="recruitSection">

          <h2>Project Philosophy</h2>

          <p>
            SDF does not follow a rigid commercial roadmap or a fixed production
            objective. Instead, the framework is intentionally developed as an
            <strong> open and evolving engineering environment</strong> where
            contributors can actively shape both technical direction and
            implementation strategy.
          </p>

          <p>
            The project emphasizes curiosity, experimentation, architectural
            transparency, and learning through practical engineering work.
            Contributors are encouraged to ask questions, challenge assumptions,
            propose ideas, discuss concepts, and participate in architectural
            evolution.
          </p>

          <p>
            Contribution is intentionally understood in a broad sense.
            Participating does <strong>not</strong> necessarily mean writing large
            amounts of production code. Valuable contribution can also include:
          </p>

          <ul>
            <li>Discussing architecture decisions</li>
            <li>Proposing simulation ideas or mission concepts</li>
            <li>Reviewing telemetry or UI concepts</li>
            <li>Suggesting mathematical improvements</li>
            <li>Testing simulation behavior</li>
            <li>Providing engineering feedback</li>
            <li>Creating diagrams or documentation</li>
            <li>Experimenting with small isolated features</li>
            <li>Exploring future research directions</li>
          </ul>

          <p>
            The framework is intentionally structured around modular subsystem
            boundaries so contributors can engage with isolated areas of interest
            without needing to understand the entire codebase immediately.
          </p>

        </section>

        <section className="recruitSection">

          <h2>Collaboration & Contribution</h2>

          <p>
            Contributions are not limited to predefined tasks. Participants are
            encouraged to bring in their own ideas, interests, technical
            questions, and research perspectives.
          </p>

          <p>
            Areas of collaboration currently include:
          </p>

          <ul>
            <li>Spacecraft dynamics and physics modeling</li>
            <li>Guidance and control systems</li>
            <li>RCS and propulsion modeling</li>
            <li>Simulation backend architecture</li>
            <li>Frontend UI and telemetry systems</li>
            <li>ROS and interface abstraction</li>
            <li>Optimization and numerical methods</li>
            <li>Dataflow and telemetry design</li>
            <li>Documentation and engineering diagrams</li>
            <li>Simulation validation and testing</li>
          </ul>

          <p>
            Because the framework is <strong>open source</strong>,
            collaboration within SDF is organized primarily through
            <strong> GitHub Issues</strong>. Planned features, architectural
            discussions, subsystem tasks, frontend improvements, and future
            research directions are tracked transparently through the issue system.
          </p>

          <p>
            Contributors interested in getting started are encouraged to explore
            issues marked with:
          </p>

          <ul>
            <li><strong>Help Wanted</strong> — areas where support or collaboration is actively welcome</li>
            <li><strong>Good First Issue</strong> — beginner-friendly tasks suitable for onboarding and first contributions</li>
          </ul>

          <p>
            While contributing does not necessarily require large-scale coding,
            practical collaboration currently assumes basic familiarity with
            GitHub workflows such as cloning repositories, creating branches,
            and working with issues or pull requests.
          </p>

          <p>
            If setup, onboarding, or development environment configuration becomes
            a hurdle, support can be provided directly. Feel free to reach out via
            the contact email for help with project setup, architecture orientation,
            or contribution onboarding.
          </p>
        

        </section>

        <section className="recruitSection">

          <h2>Current Development Direction</h2>

          <p>
            SDF is currently in an active pre-release development phase focused
            on the milestone:
            <strong> M1 - Full 6DOF Simulation</strong>.
          </p>

          <p>
            Current architectural work includes frontend restructuring,
            telemetry abstraction, propulsion-system expansion, DTO mapping,
            future ROS integration, and preparation for rigid-body spacecraft
            dynamics.
          </p>

          <p>
            The planned release line is:
            <strong> v0.2 - SDF Research Release</strong>.
          </p>

        </section>

        <section className="recruitSection">

          <h2>Expectations</h2>

          <p>
            SDF is not a pressure-driven production project. There are no strict
            deadlines or mandatory contribution quotas. What matters most is
            constructive collaboration, curiosity, technical interest, and the
            motivation to explore engineering concepts together.
          </p>

          <p>
            Small contributions, isolated experiments, discussions, and gradual
            involvement are completely welcome.
          </p>

        </section>

        <section className="recruitSection">

          <h2>Who is this for?</h2>

          <p>
            The project is suitable for students, engineers, developers, and
            technically curious contributors interested in simulation,
            spacecraft dynamics, control systems, telemetry workflows,
            aerospace software engineering, or modular system architecture.
          </p>

          <p>
            Motivation, curiosity, and openness to learning are valued more than
            formal experience level.
          </p>

        </section>

        <section className="recruitContact">

          <h2>Get in Touch</h2>

          <p>
            Interested in contributing, discussing ideas, or simply following
            the project evolution? Feel free to reach out or explore the
            open-source repository.
          </p>

          <a
            href="mailto:info@aerospace-simulation.dev"
            className="contactButton"
          >
            info@aerospace-simulation.dev
          </a>

        </section>

      </main>
    </Layout>
  );
}