import React from 'react';

import Layout from '@theme/Layout';

import '../css/recruiting.css';

export default function Recruiting() {
return ( <Layout
   title="Recruiting & Collaboration | Spaceflight Dynamics Framework"
   description="Open-source collaboration, contribution workflow, GitHub Issues, and community participation within the Spaceflight Dynamics Framework">

  <main className="recruitingContainer">

    <h1>Recruiting & Collaboration</h1>

    <section className="recruitIntro">

      <div className="recruitIntroText">

        <p>
          <strong>Spaceflight Dynamics Framework (SDF)</strong> started as a
          small personal experiment in physics-based simulation, software
          architecture, and control-system development. Over time, the scope
          of the project has grown steadily — both in technical depth and
          conceptual ambition.
        </p>

        <p>
          What originally began as a lunar landing simulation is now evolving
          into a broader open-source framework for spacecraft dynamics,
          propulsion modeling, guidance and control, telemetry-driven analysis,
          and aerospace simulation research.
        </p>

        <p>
          All development is fully <strong>open source</strong>, allowing
          contributors to explore, understand, modify, discuss, validate, and
          extend the project collaboratively.
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
        contributors can actively influence technical direction,
        implementation strategy, validation, and future research capabilities.
      </p>

      <p>
        The project emphasizes curiosity, experimentation, architectural
        transparency, scientific consistency, and learning through practical
        engineering work. Contributors are encouraged to ask questions,
        challenge assumptions, propose ideas, discuss concepts, and participate
        in architectural evolution.
      </p>

      <p>
        Contribution is intentionally understood in a broad sense.
        Participating does <strong>not</strong> necessarily mean writing large
        amounts of production code. Valuable contributions can also include:
      </p>

      <ul>
        <li>Discussing architecture decisions</li>
        <li>Proposing simulation ideas or mission concepts</li>
        <li>Reviewing mathematical and physical models</li>
        <li>Validating simulation behavior</li>
        <li>Reviewing telemetry or UI concepts</li>
        <li>Suggesting numerical or mathematical improvements</li>
        <li>Providing aerospace engineering feedback</li>
        <li>Creating diagrams or technical documentation</li>
        <li>Experimenting with isolated features</li>
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
        encouraged to bring their own ideas, technical questions, engineering
        experience, and research perspectives into the project.
      </p>

      <p>
        Areas of collaboration currently include:
      </p>

      <ul>
        <li>6DoF spacecraft dynamics and physical modeling</li>
        <li>Guidance, navigation, and control</li>
        <li>RCS and propulsion modeling</li>
        <li>Attitude-control systems</li>
        <li>Simulation backend architecture</li>
        <li>Frontend UI and telemetry visualization</li>
        <li>ROS2 and interface abstraction</li>
        <li>Optimization and numerical integration</li>
        <li>Telemetry and research-data workflows</li>
        <li>Documentation and engineering diagrams</li>
        <li>Simulation verification and validation</li>
      </ul>

    </section>

    <section className="recruitSection">

      <h2>Issue-Based Development</h2>

      <p>
        SDF follows an <strong>issue-based development process</strong>.
        Every implementation, validation task, bugfix, architectural change,
        or major documentation activity should be associated with a GitHub
        Issue before development begins.
      </p>

      <p>
        This keeps technical decisions traceable, makes the development
        roadmap transparent, and allows contributors to understand why a
        change exists before examining the implementation itself.
      </p>

      <p>
        Open development tasks and discussions can be found directly in the
        project&apos;s GitHub Issue tracker:
      </p>

      <div className="buttonCenter">
        <a
          href="https://github.com/gerd-lrt-dev/spaceflight-dynamics-framework/issues"
          className="contactButton"
          target="_blank"
          rel="noopener noreferrer"
        >
          Explore GitHub Issues
        </a>
      </div>

      <p>
        Contributors interested in getting started should particularly look
        for issues labeled <strong>Help Wanted</strong> or <strong>Good First Issue</strong>.
      </p>

      <ul>
        <li>
          <strong>Help Wanted:</strong> Tasks where technical discussion,
          implementation support, testing, review, or engineering expertise
          is actively welcome.
        </li>

        <li>
          <strong>Good First Issue:</strong> Smaller or well-isolated tasks
          suitable for learning the codebase and contribution workflow.
        </li>
      </ul>

    </section>

    <section className="recruitSection">

      <h2>Understanding SDF Issue IDs</h2>

      <p>
        SDF uses a lightweight issue-key convention to make the purpose of
        development tasks immediately visible. An issue identifier consists
        of a category letter followed by a sequential number.
      </p>

      <p>
        For example, an issue named <strong>D23 - Basic RCS Model</strong>
        identifies the task as a developer-oriented implementation issue.
        The same identifier is then reused in branches and commit messages.
      </p>

      <ul>
        <li>
          <strong>D — Developer Task:</strong> Implementation work, code
          changes, or smaller technical features
        </li>

        <li>
          <strong>M — Mathematical Model:</strong> Equations, physics models,
          guidance laws, controller formulations, or optimization models
        </li>

        <li>
          <strong>A — Architecture:</strong> Interfaces, subsystem boundaries,
          structural changes, or major refactoring
        </li>

        <li>
          <strong>W — Website / Documentation:</strong> Technical
          documentation, diagrams, mathematical documentation, or website work
        </li>

        <li>
          <strong>P — Project Management:</strong> Milestones, roadmap,
          repository organization, or planning activities
        </li>

        <li>
          <strong>F — Feature Proposal:</strong> Larger functional extensions
          or new framework capabilities
        </li>

        <li>
          <strong>B — Bugfix:</strong> Incorrect behavior, defects, or runtime
          errors
        </li>

        <li>
          <strong>R — Refactoring:</strong> Internal restructuring without an
          intended functional change
        </li>

        <li>
          <strong>T — Tests / Validation:</strong> Verification, validation,
          analytical comparison, or simulation testing
        </li>
      </ul>

      <p>
        The identifier remains visible throughout the development history.
        A typical development flow may therefore look like:
      </p>

      <ul>
        <li><strong>Issue:</strong> D23 - Basic RCS Model</li>
        <li><strong>Branch:</strong> feature/D23-Basic-RCS-Model</li>
        <li><strong>Commit:</strong> D23 - Implement RCS actuator dynamics</li>
      </ul>

      <p>
        Development should take place on an issue-specific branch and the
        resulting Pull Request should reference the corresponding issue.
        This keeps implementation, discussion, review, and project history
        connected.
      </p>

    </section>

    <section className="recruitSection">

      <h2>Contribution Workflow</h2>

      <p>
        The typical contribution workflow is intentionally lightweight:
      </p>

      <ol>
        <li>Find an existing GitHub Issue or create a new one.</li>
        <li>Discuss the intended change where appropriate.</li>
        <li>Fork or clone the repository.</li>
        <li>Create an issue-specific feature branch.</li>
        <li>Implement and document the change.</li>
        <li>Commit using the corresponding issue identifier.</li>
        <li>Submit a Pull Request referencing the issue.</li>
      </ol>

      <p>
        Practical collaboration therefore assumes basic familiarity with
        Git and GitHub workflows. Contributors do not need to be experts,
        and support with repository setup, architecture orientation, or the
        contribution process is welcome.
      </p>

      <p>
        The complete engineering and contribution guidelines are maintained
        in the repository documentation.
      </p>

      <div className="buttonCenter">
        <a
          href="https://github.com/gerd-lrt-dev/spaceflight-dynamics-framework/blob/main/docs/contributing.md"
          className="contactButton"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read Contribution Guidelines
        </a>
      </div>

    </section>

    <section className="recruitSection">

      <h2>Current Development Direction</h2>

      <p>
        SDF is currently in active pre-release development around its first
        major technical milestone:
        <strong> M1 - 6DoF Core Simulation</strong>.
      </p>

      <p>
        The complete translational and rotational rigid-body dynamics pipeline
        has been implemented. Current work focuses on systematic physical and
        numerical verification, cockpit integration of the rotational state,
        and extension of the RCS architecture toward dedicated attitude
        control.
      </p>

      <p>
        Further development will expand telemetry analysis, numerical methods,
        control capabilities, environmental models, and external interfaces
        while preserving the modular architecture of the simulation core.
      </p>

    </section>

    <section className="recruitSection">

      <h2>Engineering Standards</h2>

      <p>
        Contributions should preserve the core design principles of the
        framework. In particular, SDF favors modular and interface-driven
        implementations, explicit physical assumptions, clear subsystem
        boundaries, and reproducible simulation behavior.
      </p>

      <ul>
        <li>Physical quantities should use SI units.</li>
        <li>Public APIs and important functions should include Doxygen documentation.</li>
        <li>Mathematical models should document equations, variables, assumptions, and limitations.</li>
        <li>Frontend components should not depend directly on backend implementation details.</li>
        <li>Simulation data exposed externally should use explicit telemetry structures.</li>
        <li>Architecture and mathematical documentation should be updated when major models or interfaces change.</li>
      </ul>

      <p>
        Scientific consistency and maintainability should take priority over
        implementation convenience.
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
        Small contributions, isolated experiments, technical discussions,
        documentation improvements, validation work, and gradual involvement
        are completely welcome.
      </p>

    </section>

    <section className="recruitSection">

      <h2>Who is this for?</h2>

      <p>
        The project is suitable for students, engineers, software developers,
        researchers, and technically curious contributors interested in
        simulation, spacecraft dynamics, control systems, telemetry workflows,
        numerical methods, aerospace software engineering, or modular system
        architecture.
      </p>

      <p>
        Formal aerospace experience is not a prerequisite. Motivation,
        curiosity, technical rigor, and openness to learning are valued more
        than a specific professional background.
      </p>

    </section>

    <section className="recruitContact">

      <h2>Get in Touch</h2>

      <p>
        Interested in contributing, discussing an idea, reviewing a model,
        or simply following the project? Explore the open issues, join a
        technical discussion, or get in touch directly.
      </p>

      <a
        href="https://github.com/gerd-lrt-dev/spaceflight-dynamics-framework/issues"
        className="contactButton"
        target="_blank"
        rel="noopener noreferrer"
      >
        View Open Issues
      </a>

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
