import React from 'react';
import Layout from '@theme/Layout';
import '../css/recruiting.css';

export default function Recruiting() {
  return (
    <Layout title="Recruiting & Collaboration">
      <main className="recruitingContainer">

        <h1>Recruiting & Collaboration</h1>

        <section className="recruitIntro">
          <div className="recruitIntroText">
            <p>
              Moonlander started as a small personal experiment in physics-based simulation
              and software architecture. Over time, the scope of the project has grown steadily — 
              both in technical depth and in conceptual ambition. All development is fully 
              <strong> open source</strong>, enabling contributors to view, modify, and extend the code freely.
            </p>
          </div>
          <div className="recruitIntroImage">
            <img src="/img/recruiting/join.png" alt="Join the Mission" />
            <p className="imageCredit">Image generated with AI</p>
          </div>
        </section>
        <section className="recruitSection">
          <h2>Project Philosophy</h2>
          <p>
            The project does not follow a strictly predefined roadmap or commercial objective.
            Instead, it is intended as an <strong>open, evolving environment</strong> where contributors 
            can actively shape both direction and implementation. The focus lies on gaining hands-on 
            experience, exploring software architecture, learning by doing, and enjoying the process of building technically meaningful software.
          </p>
        </section>

        <section className="recruitSection">
          <h2>Collaboration & Contribution</h2>
          <p>
            Contributions are not limited to predefined tasks. Participants are encouraged
            to bring in their own ideas, questions, and areas of interest. This includes:
          </p>
          <ul>
            <li>Physics and dynamics modeling</li>
            <li>Control algorithms and guidance logic</li>
            <li>Backend architecture and simulation loops</li>
            <li>Frontend UI and visualization</li>
            <li>Documentation, testing, and design discussions</li>
          </ul>
          <p>
            Because the project is <strong>open source</strong>, all contributions are visible and traceable.
            Contributors can experiment freely, propose improvements, and learn directly from the code.
          </p>
        </section>

        <section className="recruitSection">
          <h2>Expectations</h2>
          <p>
            Moonlander is not a production-driven project. There are no deadlines or pressure; what matters
            is curiosity, learning, and constructive collaboration.
          </p>
        </section>

        <section className="recruitSection">
          <h2>Who is this for?</h2>
          <p>
            The project is suitable for students, engineers, or developers interested in simulation, 
            control systems, and software architecture. Motivation and curiosity are valued more than 
            formal experience.
          </p>
        </section>
          <section className="recruitContact"> <h2>Get in Touch</h2> 
          <p> Interested in contributing? Reach out via email or check out the open source repository for more details. </p> 
          <a href="mailto:info@aerospace-simulation.dev" className="contactButton"> 
            info@aerospace-simulation.dev </a> 
        </section>

      </main>
    </Layout>
  );
}
