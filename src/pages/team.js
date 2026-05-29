import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import '../css/team.css';

export default function Team() {
  return (
    <Layout
      title="Team | Spaceflight Dynamics Framework"
      description="Core contributors, project leadership, and open-source collaboration within the Spaceflight Dynamics Framework">

      <main className="teamContainer">

        <section className="teamIntro">

          <h1>Team</h1>

          <p>
            <strong>Spaceflight Dynamics Framework (SDF)</strong> is currently
            developed as a focused open-source aerospace engineering and
            simulation project combining spacecraft dynamics, propulsion
            modeling, guidance and control systems, telemetry workflows,
            and modular software architecture.
          </p>

          <p>
            The project originated as a lunar landing simulation and is evolving
            toward a broader research-oriented framework for spacecraft dynamics
            experimentation, frontend/backend decoupling, telemetry-driven
            analysis, and future autonomous flight applications.
          </p>

          <p>
            Development follows an open engineering philosophy with emphasis on
            transparency, modularity, reproducibility, and contribution-friendly
            architecture design.
          </p>

        </section>

        <section className="teamGrid">

          <Link to="/team/gerd" className="teamCard">

            <img
              src="/img/team/gerd.jpg"
              alt="Gerd Schendzielorz profile"
            />

            <h3>Gerd Schendzielorz</h3>

            <span className="alias">gerd-lrt-dev</span>

            <p className="role">
              Project Lead & Simulation Engineer
            </p>

            <p className="degree">
              M.Sc. Aerospace Engineering
            </p>

            <div className="contact">
              <span>Email:</span>

              <a href="mailto:info@aerospace-simulation.dev">
                info@aerospace-simulation.dev
              </a>
            </div>

            <ul>
              <li>Spacecraft dynamics simulation</li>
              <li>Guidance and control systems</li>
              <li>C++ simulation backend architecture</li>
              <li>Qt frontend and telemetry systems</li>
              <li>Propulsion and RCS modeling</li>
              <li>Research-oriented software architecture</li>
            </ul>

          </Link>

          <Link to="/team/janko" className="teamCard">

          <img
            src="/img/team/janko.jpeg"
            alt="Janko Kremer profile"
          />

          <h3>Janko Kremer</h3>

          <span className="alias">
            kremerjanko0-maker
          </span>

          <p className="role">
            Co-Project Lead & Software Developer
          </p>

          <p className="degree">
            B.Sc. Student in Business Informatics
          </p>

          <div className="contact">
            <span>Email:</span>

              <a href="mailto:info@aerospace-simulation.dev">
                info@aerospace-simulation.dev
              </a>
          </div>

          <ul>
            <li>Coordinate transformation systems</li>
            <li>Software architecture and backend development</li>
            <li>Web development and frontend integration</li>
            <li>Java and object-oriented software engineering</li>
            <li>Simulation framework implementation</li>
            <li>Open-source collaboration and tooling</li>
          </ul>

        </Link>

        </section>

        <section className="teamRecruiting">

          <h2>Open-Source Collaboration</h2>

          <p>
            SDF is currently transitioning toward a more collaborative
            open-source development model. Contributions in simulation,
            control theory, aerospace software engineering, telemetry,
            ROS integration, frontend systems, optimization, and
            spacecraft dynamics are highly welcome.
          </p>

          <p>
            The framework is intentionally structured around modular
            subsystem boundaries to make contribution, experimentation,
            and future architectural evolution easier.
          </p>

          <Link className="recruitButton" to="/recruiting">
            View Recruiting
          </Link>

        </section>

      </main>
    </Layout>
  );
}