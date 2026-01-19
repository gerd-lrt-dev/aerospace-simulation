import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import '../css/team.css';

export default function Team() {
  return (
    <Layout title="Team">
      <main className="teamContainer">

        <section className="teamIntro">
          <h1>Team</h1>
          <p>
            Moonlander is currently developed as a focused engineering project,
            combining physics-based simulation, control systems and software architecture.
          </p>
        </section>

        <section className="teamGrid">
          <Link to="/team/gerd" className="teamCard">
            <img src="/img/team/gerd.jpg" alt="Gerd profile" />
            <h3>Gerd Schendzielorz</h3>
            <span className="alias">gerd-lrt-dev</span>
            <p className="role">Project Lead & Simulation Engineer</p>
            <p className="degree">M.Sc. Aerospace Engineering</p>
            <div className="contact">
              <span>Email:</span>
              <a href="mailto:info@aerospace-simulation.dev">
                info@aerospace-simulation.dev
              </a>
            </div>
            <ul>
              <li>Physics-based simulation</li>
              <li>Control systems</li>
              <li>C++ backend architecture</li>
              <li>Qt & UI systems</li>
            </ul>
          </Link>
        </section>

        <section className="teamRecruiting">
          <h2>Interested in contributing?</h2>
          <p>
            If you are interested in simulation, control theory or aerospace software
            engineering, take a look at the recruiting section.
          </p>
          <Link className="recruitButton" to="/recruiting">
            View Recruiting
          </Link>
        </section>

      </main>
    </Layout>
  );
}
