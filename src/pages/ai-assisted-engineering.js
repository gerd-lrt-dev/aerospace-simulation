import React from 'react';
import Layout from '@theme/Layout';
import '../css/aiEngineering.css';

export default function AIEngineering() {
  return (
    <Layout
      title="AI-Assisted Engineering | Spaceflight Dynamics Framework"
      description="How AI-assisted workflows are integrated into the engineering, architecture, documentation, and development process of the Spaceflight Dynamics Framework"
    >
      <main className="aiContainer">

        <h1>AI-Assisted Engineering</h1>

        <section className="aiIntro">

          <p>
            The <strong>Spaceflight Dynamics Framework (SDF)</strong> is developed
            using a modern AI-assisted engineering workflow that combines classical
            software engineering, aerospace simulation development, and large-language-model-supported
            collaboration.
          </p>

          <p>
            The use of AI within the project is not intended to replace engineering
            decisions, architectural ownership, or technical understanding. Instead,
            AI is used as an <strong>engineering acceleration and structuring tool</strong>
            that supports iteration speed, documentation quality, architecture exploration,
            brainstorming, and workflow efficiency.
          </p>

          <p>
            The project itself — including the simulation backend, architecture decisions,
            subsystem design, propulsion modeling, frontend implementation, guidance logic,
            telemetry concepts, and overall technical direction — has primarily been developed
            independently. The project only recently received its first external contributor.
          </p>

          <p>
            AI support is therefore integrated as part of a pragmatic engineering workflow:
            repetitive work can be accelerated, documentation quality can be improved,
            architectural ideas can be explored faster, and implementation concepts can be
            discussed interactively while engineering ownership and validation remain human-driven.
          </p>

        </section>

        <section className="aiSection">

          <h2>Why AI-Assisted Engineering?</h2>

          <p>
            Modern engineering workflows are evolving rapidly. Large language models and
            AI-supported tooling are increasingly becoming part of software development,
            systems engineering, documentation workflows, and technical communication.
          </p>

          <p>
            Within SDF, AI is treated as a productivity and engineering support tool rather
            than an autonomous developer. The goal is not to automate engineering judgment,
            but to improve iteration speed, maintain architectural consistency, reduce
            repetitive workload, and accelerate exploration of technical ideas.
          </p>

          <p>
            This is especially valuable in a research-oriented project environment where
            architecture discussions, subsystem decomposition, documentation, and future
            design exploration consume significant development time in addition to actual
            implementation work.
          </p>

        </section>

        <section className="aiSection">

          <h2>Current Areas of AI Support</h2>

          <p>
            AI support is currently used in several non-critical but highly valuable
            engineering workflows throughout the project:
          </p>

          <ul>
            <li>Architecture brainstorming and subsystem decomposition</li>
            <li>Frontend structure and UI workflow discussions</li>
            <li>Documentation drafting and refinement</li>
            <li>Doxygen documentation support</li>
            <li>Diagram structure and visualization ideas</li>
            <li>Release communication and project presentation</li>
            <li>Issue refinement and milestone structuring</li>
            <li>Naming discussions and terminology consistency</li>
            <li>Open-source onboarding concepts</li>
            <li>Website content and engineering communication</li>
            <li>Refactoring planning and workflow analysis</li>
            <li>Research-oriented brainstorming and future direction exploration</li>
          </ul>

        </section>

        <section className="aiSection">

          <h2>Human Engineering Responsibility</h2>

          <p>
            AI-generated suggestions are treated as engineering support material
            and are reviewed before integration into the project.
          </p>

          <p>
            Architectural decisions, simulation behavior, propulsion models,
            mathematical formulations, subsystem interactions, validation logic,
            and implementation choices remain under direct human control.
          </p>

          <p>
            This is especially important in a technically-oriented simulation framework
            where correctness, maintainability, traceability, and subsystem consistency
            are critical.
          </p>

        </section>

        <section className="aiSection">

          <h2>Examples of AI-Assisted Workflow</h2>

          <p>
            Typical workflows within the project often combine human engineering
            direction with AI-assisted iteration support:
          </p>

          <ul>
            <li>Initial engineering idea or architectural problem definition</li>
            <li>Discussion of subsystem boundaries and responsibilities</li>
            <li>Exploration of alternative implementation structures</li>
            <li>Refinement of interfaces, DTOs, or dataflow concepts</li>
            <li>Generation of supporting documentation and diagrams</li>
            <li>Final engineering review and manual integration into the codebase</li>
          </ul>

          <p>
            This workflow allows repetitive engineering overhead to be reduced while
            preserving technical ownership and implementation responsibility.
          </p>

        </section>

        <section className="aiSection">

          <h2>AI-Generated Assets</h2>

          <p>
            Some visual assets used throughout the project — including concept art,
            presentation imagery, and project-related visual material — are generated
            using AI-assisted image generation workflows.
          </p>

          <p>
            Examples include:
          </p>

          <ul>
            <li>Website hero images</li>
            <li>Presentation visuals</li>
            <li>Recruiting graphics</li>
            <li>Logo brainstorming and design exploration</li>
            <li>Concept visualization for communication purposes</li>
          </ul>

          <p>
            AI-generated visual assets are primarily used to support communication,
            presentation, and project identity rather than technical validation.
          </p>

        </section>

        <section className="aiSection">

          <h2>Engineering Philosophy</h2>

          <p>
            The integration of AI into SDF reflects the belief that future engineering
            workflows will increasingly combine human expertise with AI-assisted tooling.
          </p>

          <p>
            Rather than replacing engineering thinking, these tools can improve
            accessibility, accelerate iteration, reduce repetitive workload,
            strengthen documentation quality, and support collaborative exploration
            of complex systems.
          </p>

          <p>
            The long-term goal is therefore not only to build a spacecraft dynamics
            framework, but also to explore how modern engineering workflows can evolve
            in an open, transparent, and technically responsible way.
          </p>

        </section>

      </main>
    </Layout>
  );
}