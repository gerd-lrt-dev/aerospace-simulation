import React from 'react';
import Layout from '@theme/Layout';
import '../../css/mathematics.css';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function CoordinateSystems() {
  return (
    <Layout
      title="SDF – Coordinate Systems & Transformations"
      description="Coordinate reference frames and mathematical transformations used in the Spaceflight Dynamics Framework">

      <main className="mathContainer">

        <h1>Coordinate Systems & Transformations</h1>

        <section className="mathSection">
          <p>
            This section describes the coordinate reference frames used by the
            Spaceflight Dynamics Framework and the mathematical transformations
            implemented in the <code>CoordinateTransformer</code> class.
          </p>

          <p>
            The framework uses a single simulation truth frame for physical
            propagation and derives all other coordinate representations from
            this state. This prevents conflicting state representations while
            still providing specialized frames for guidance, navigation,
            telemetry, visualization, and future orbital operations.
          </p>
        </section>

        <hr />

        <section className="mathSection">
          <h2>State Ownership and Frame Hierarchy</h2>

          <p>
            The translational state of the spacecraft is propagated in the
            Moon-Centered Inertial frame. The corresponding state vector is the
            single source of truth for spacecraft motion.
          </p>

          <BlockMath
            math={`
              \\mathbf{x}
              =
              \\left[
              \\mathbf{r}_{MCI},
              \\mathbf{v}_{MCI},
              q_{IB},
              \\boldsymbol{\\omega}_{SBF}
              \\right]
            `}
          />

          <p>
            Where:
            <br />
            • <strong><InlineMath math={'\\mathbf{r}_{MCI}'} /></strong> is the spacecraft position in MCI [m]
            <br />
            • <strong><InlineMath math={'\\mathbf{v}_{MCI}'} /></strong> is the spacecraft velocity in MCI [m/s]
            <br />
            • <strong><InlineMath math={'q_{IB}'} /></strong> is the body-to-inertial attitude quaternion
            <br />
            • <strong><InlineMath math={'\\boldsymbol{\\omega}_{SBF}'} /></strong> is the angular velocity expressed in the spacecraft body frame [rad/s]
          </p>

          <p>
            All other frames are derived views:
          </p>

          <pre>
{`MCI
├── MCMF
│   ├── MSC
│   └── ENU
│
├── LVLH
│
└── SBF`}
          </pre>
        </section>

        <hr />

        <section className="mathSection">
          <h2>Reference Frame Definitions</h2>

          <h3>MCI — Moon-Centered Inertial</h3>

          <p>
            The Moon-Centered Inertial frame is the primary physics frame of
            SDF. All translational dynamics are integrated in this frame.
          </p>

          <p>
            <strong>Origin:</strong> Center of the Moon
            <br />
            <strong>Axes:</strong>
            <br />
            • +Z = Lunar North Pole
            <br />
            • +X = Prime Meridian at reference epoch <InlineMath math={'t_0'} />
            <br />
            • +Y = <InlineMath math={'+Z \\times +X'} />
          </p>

          <p>
            MCI is moon-centered, inertial, non-rotating, and right-handed.
          </p>

          <h3>MCMF — Moon-Centered Moon-Fixed</h3>

          <p>
            The Moon-Centered Moon-Fixed frame is attached to the lunar body and
            rotates with the Moon. It is used for surface-fixed locations,
            landing sites, and lunar geography.
          </p>

          <p>
            <strong>Origin:</strong> Center of the Moon
            <br />
            <strong>Axes:</strong>
            <br />
            • +Z = Lunar North Pole
            <br />
            • +X = Current Prime Meridian
            <br />
            • +Y = <InlineMath math={'+Z \\times +X'} />
          </p>

          <p>
            MCMF is moon-centered, rotating, surface-fixed, non-inertial, and
            right-handed.
          </p>

          <h3>MSC — Moon Surface Coordinates</h3>

          <p>
            Moon Surface Coordinates provide a geodetic representation of a
            lunar surface or near-surface location.
          </p>

          <p>
            MSC is not a Cartesian frame. It is represented by latitude,
            longitude, and altitude:
          </p>

          <BlockMath
            math={`
              MSC
              =
              \\left(
              \\phi,
              \\lambda,
              h
              \\right)
            `}
          />

          <p>
            Where:
            <br />
            • <strong><InlineMath math={'\\phi'} /></strong> is lunar latitude [rad]
            <br />
            • <strong><InlineMath math={'\\lambda'} /></strong> is lunar longitude [rad]
            <br />
            • <strong><InlineMath math={'h'} /></strong> is altitude above the mean lunar radius [m]
          </p>

          <h3>ENU — East-North-Up</h3>

          <p>
            ENU is a local tangent frame attached to a mission reference point,
            typically the landing site. It is used for landing guidance,
            local navigation, and surface-relative telemetry.
          </p>

          <p>
            <strong>Origin:</strong> Landing site
            <br />
            <strong>Axes:</strong>
            <br />
            • +X = East
            <br />
            • +Y = North
            <br />
            • +Z = Up
          </p>

          <p>
            ENU is right-handed and locally defined. Its orientation depends on
            the chosen surface reference point.
          </p>

          <h3>LVLH — Local Vertical Local Horizontal</h3>

          <p>
            The LVLH frame is a spacecraft-centered orbital frame. It is useful
            for relative motion, rendezvous, docking, and orbital guidance.
          </p>

          <p>
            <strong>Origin:</strong> Current spacecraft position
            <br />
            <strong>Axes:</strong>
            <br />
            • +X = Forward
            <br />
            • +Y = Right
            <br />
            • +Z = Down, toward the lunar center
          </p>

          <p>
            The current implementation expresses LVLH velocities as projected
            relative velocities. Full rotating-frame velocity and acceleration
            terms are reserved for future high-fidelity dynamics.
          </p>

          <h3>SBF — Spacecraft Body Frame</h3>

          <p>
            The Spacecraft Body Frame is rigidly attached to the spacecraft and
            rotates with its attitude. It is the primary frame for propulsion,
            RCS, sensors, and control-related quantities.
          </p>

          <p>
            <strong>Origin:</strong> Spacecraft center of mass
            <br />
            <strong>Axes:</strong>
            <br />
            • +X = Forward
            <br />
            • +Y = Right
            <br />
            • +Z = Down
          </p>

          <p>
            Engine directions and RCS force directions are expressed in SBF.
            The current propulsion pipeline computes thrust in SBF and rotates
            it into MCI before passing it to the physics model.
          </p>
        </section>

        <hr />

        <section className="mathSection">
          <h2>MCI to MCMF Transformation</h2>

          <p>
            The MCMF frame rotates with the Moon relative to the inertial MCI
            frame. The lunar rotation angle is computed as:
          </p>

          <BlockMath
            math={`
              \\theta(t)
              =
              \\omega_M t
            `}
          />

          <p>
            Where:
            <br />
            • <strong><InlineMath math={'\\omega_M'} /></strong> is the lunar sidereal rotation rate [rad/s]
            <br />
            • <strong><InlineMath math={'t'} /></strong> is simulation time [s]
          </p>

          <p>
            The corresponding rotation quaternion is:
          </p>

          <BlockMath
            math={`
              q_M(t)
              =
              \\left[
              \\cos\\left(\\frac{\\theta}{2}\\right),
              0,
              0,
              \\sin\\left(\\frac{\\theta}{2}\\right)
              \\right]
            `}
          />

          <p>
            The position transformation is:
          </p>

          <BlockMath
            math={`
              \\mathbf{r}_{MCMF}
              =
              q_M
              \\,
              \\mathbf{r}_{MCI}
              \\,
              q_M^{-1}
            `}
          />

          <p>
            Since the target frame is rotating, the velocity transformation
            includes the transport term caused by the lunar angular velocity:
          </p>

          <BlockMath
            math={`
              \\mathbf{v}_{MCMF}
              =
              q_M
              \\left(
              \\mathbf{v}_{MCI}
              -
              \\boldsymbol{\\omega}_M
              \\times
              \\mathbf{r}_{MCI}
              \\right)
              q_M^{-1}
            `}
          />

          <p>
            with:
          </p>

          <BlockMath
            math={`
              \\boldsymbol{\\omega}_M
              =
              \\left[
              0,
              0,
              \\omega_M
              \\right]^T
            `}
          />
        </section>

        <hr />

        <section className="mathSection">
          <h2>MCMF to MCI Transformation</h2>

          <p>
            The inverse transformation rotates a Moon-fixed state back into the
            inertial frame. The inverse quaternion is used for the position
            mapping:
          </p>

          <BlockMath
            math={`
              \\mathbf{r}_{MCI}
              =
              q_M^{-1}
              \\,
              \\mathbf{r}_{MCMF}
              \\,
              q_M
            `}
          />

          <p>
            The inertial velocity is reconstructed by adding the rotating-frame
            velocity contribution:
          </p>

          <BlockMath
            math={`
              \\mathbf{v}_{MCI}
              =
              q_M^{-1}
              \\left(
              \\mathbf{v}_{MCMF}
              +
              \\boldsymbol{\\omega}_M
              \\times
              \\mathbf{r}_{MCMF}
              \\right)
              q_M
            `}
          />
        </section>

        <hr />

        <section className="mathSection">
          <h2>MCMF to Moon Surface Coordinates</h2>

          <p>
            A Cartesian position in the Moon-fixed frame can be converted into
            geodetic Moon Surface Coordinates.
          </p>

          <p>
            Given:
          </p>

          <BlockMath
            math={`
              \\mathbf{r}_{MCMF}
              =
              \\left[
              x,
              y,
              z
              \\right]^T
            `}
          />

          <p>
            The radial distance is:
          </p>

          <BlockMath
            math={`
              r
              =
              ||\\mathbf{r}_{MCMF}||
            `}
          />

          <p>
            Latitude, longitude, and altitude are computed as:
          </p>

          <BlockMath
            math={`
              \\phi
              =
              \\arcsin
              \\left(
              \\frac{z}{r}
              \\right)
            `}
          />

          <BlockMath
            math={`
              \\lambda
              =
              \\operatorname{atan2}(y,x)
            `}
          />

          <BlockMath
            math={`
              h
              =
              r
              -
              R_M
            `}
          />

          <p>
            Where <InlineMath math={'R_M'} /> is the mean lunar reference radius.
          </p>
        </section>

        <hr />

        <section className="mathSection">
          <h2>Moon Surface Coordinates to MCMF</h2>

          <p>
            The inverse mapping reconstructs the Moon-fixed Cartesian position
            from latitude, longitude, and altitude.
          </p>

          <BlockMath
            math={`
              r
              =
              R_M
              +
              h
            `}
          />

          <BlockMath
            math={`
              x
              =
              r
              \\cos\\phi
              \\cos\\lambda
            `}
          />

          <BlockMath
            math={`
              y
              =
              r
              \\cos\\phi
              \\sin\\lambda
            `}
          />

          <BlockMath
            math={`
              z
              =
              r
              \\sin\\phi
            `}
          />

          <p>
            The resulting velocity is initialized as zero in MCMF, because a
            fixed surface location is stationary in the Moon-fixed frame.
          </p>
        </section>

        <hr />

        <section className="mathSection">
          <h2>ENU Frame Construction</h2>

          <p>
            The ENU frame is constructed from a reference state expressed in
            MCMF. In the current simulation, this reference state is typically
            the mission landing site.
          </p>

          <p>
            The local up direction is the normalized radial direction:
          </p>

          <BlockMath
            math={`
              \\hat{\\mathbf{u}}
              =
              \\frac{
              \\mathbf{r}_{origin}
              }{
              ||\\mathbf{r}_{origin}||
              }
            `}
          />

          <p>
            A global reference axis is selected to construct the local tangent
            plane. Under nominal conditions, the lunar rotation axis is used:
          </p>

          <BlockMath
            math={`
              \\hat{\\mathbf{k}}
              =
              \\left[
              0,
              0,
              1
              \\right]^T
            `}
          />

          <p>
            The east and north directions are computed as:
          </p>

          <BlockMath
            math={`
              \\hat{\\mathbf{e}}
              =
              \\frac{
              \\hat{\\mathbf{k}}
              \\times
              \\hat{\\mathbf{u}}
              }{
              ||
              \\hat{\\mathbf{k}}
              \\times
              \\hat{\\mathbf{u}}
              ||
              }
            `}
          />

          <BlockMath
            math={`
              \\hat{\\mathbf{n}}
              =
              \\hat{\\mathbf{u}}
              \\times
              \\hat{\\mathbf{e}}
            `}
          />

          <p>
            Near the lunar poles, the implementation switches to a fallback
            reference axis to avoid singularities caused by nearly parallel
            vectors.
          </p>
        </section>

        <hr />

        <section className="mathSection">
          <h2>MCMF to ENU Transformation</h2>

          <p>
            To express a Moon-fixed spacecraft state in the local ENU frame,
            the relative vector from the ENU origin to the spacecraft is
            projected onto the ENU basis vectors.
          </p>

          <BlockMath
            math={`
              \\Delta\\mathbf{r}
              =
              \\mathbf{r}_{target}
              -
              \\mathbf{r}_{origin}
            `}
          />

          <BlockMath
            math={`
              \\mathbf{r}_{ENU}
              =
              \\left[
              \\Delta\\mathbf{r}\\cdot\\hat{\\mathbf{e}},
              \\Delta\\mathbf{r}\\cdot\\hat{\\mathbf{n}},
              \\Delta\\mathbf{r}\\cdot\\hat{\\mathbf{u}}
              \\right]^T
            `}
          />

          <p>
            The same projection is applied to relative velocity:
          </p>

          <BlockMath
            math={`
              \\Delta\\mathbf{v}
              =
              \\mathbf{v}_{target}
              -
              \\mathbf{v}_{origin}
            `}
          />

          <BlockMath
            math={`
              \\mathbf{v}_{ENU}
              =
              \\left[
              \\Delta\\mathbf{v}\\cdot\\hat{\\mathbf{e}},
              \\Delta\\mathbf{v}\\cdot\\hat{\\mathbf{n}},
              \\Delta\\mathbf{v}\\cdot\\hat{\\mathbf{u}}
              \\right]^T
            `}
          />
        </section>

        <hr />

        <section className="mathSection">
          <h2>ENU to MCMF Transformation</h2>

          <p>
            The inverse transformation reconstructs a Moon-fixed Cartesian
            state from local ENU coordinates and the stored ENU frame basis.
          </p>

          <BlockMath
            math={`
              \\mathbf{r}_{MCMF}
              =
              \\mathbf{r}_{origin}
              +
              x_{ENU}\\hat{\\mathbf{e}}
              +
              y_{ENU}\\hat{\\mathbf{n}}
              +
              z_{ENU}\\hat{\\mathbf{u}}
            `}
          />

          <BlockMath
            math={`
              \\mathbf{v}_{MCMF}
              =
              \\mathbf{v}_{origin}
              +
              v_x\\hat{\\mathbf{e}}
              +
              v_y\\hat{\\mathbf{n}}
              +
              v_z\\hat{\\mathbf{u}}
            `}
          />
        </section>

        <hr />

        <section className="mathSection">
          <h2>LVLH Frame Construction</h2>

          <p>
            The LVLH frame is constructed from the current inertial spacecraft
            state. It is centered on the spacecraft and aligned with the local
            orbital geometry.
          </p>

          <p>
            The down direction points toward the Moon center:
          </p>

          <BlockMath
            math={`
              \\hat{\\mathbf{d}}
              =
              -
              \\frac{
              \\mathbf{r}
              }{
              ||\\mathbf{r}||
              }
            `}
          />

          <p>
            The orbital angular momentum vector is:
          </p>

          <BlockMath
            math={`
              \\mathbf{h}
              =
              \\mathbf{r}
              \\times
              \\mathbf{v}
            `}
          />

          <p>
            The right direction is defined as:
          </p>

          <BlockMath
            math={`
              \\hat{\\mathbf{y}}_{LVLH}
              =
              -
              \\frac{
              \\mathbf{h}
              }{
              ||\\mathbf{h}||
              }
            `}
          />

          <p>
            The forward direction completes the right-handed basis:
          </p>

          <BlockMath
            math={`
              \\hat{\\mathbf{x}}_{LVLH}
              =
              \\hat{\\mathbf{y}}_{LVLH}
              \\times
              \\hat{\\mathbf{z}}_{LVLH}
            `}
          />

          <p>
            with <InlineMath math={'\\hat{\\mathbf{z}}_{LVLH} = \\hat{\\mathbf{d}}'} />.
          </p>

          <p>
            If the angular momentum magnitude approaches zero, a fallback axis
            is used to avoid a degenerate frame definition.
          </p>
        </section>

        <hr />

        <section className="mathSection">
          <h2>MCI to LVLH Transformation</h2>

          <p>
            A target state is expressed in LVLH by projecting the relative
            inertial state onto the LVLH basis vectors.
          </p>

          <BlockMath
            math={`
              \\Delta\\mathbf{r}
              =
              \\mathbf{r}_{target}
              -
              \\mathbf{r}_{origin}
            `}
          />

          <BlockMath
            math={`
              \\mathbf{r}_{LVLH}
              =
              \\left[
              \\Delta\\mathbf{r}\\cdot\\hat{\\mathbf{x}}_{LVLH},
              \\Delta\\mathbf{r}\\cdot\\hat{\\mathbf{y}}_{LVLH},
              \\Delta\\mathbf{r}\\cdot\\hat{\\mathbf{z}}_{LVLH}
              \\right]^T
            `}
          />

          <p>
            The same projection is currently applied to relative velocity.
            This represents projected relative velocity, not the complete
            time derivative in a rotating LVLH frame.
          </p>
        </section>

        <hr />

        <section className="mathSection">
          <h2>LVLH to MCI Transformation</h2>

          <p>
            The inverse transformation reconstructs an inertial state from LVLH
            coordinates using the stored LVLH basis vectors.
          </p>

          <BlockMath
            math={`
              \\mathbf{r}_{MCI}
              =
              \\mathbf{r}_{origin}
              +
              x_{LVLH}\\hat{\\mathbf{x}}_{LVLH}
              +
              y_{LVLH}\\hat{\\mathbf{y}}_{LVLH}
              +
              z_{LVLH}\\hat{\\mathbf{z}}_{LVLH}
            `}
          />

          <BlockMath
            math={`
              \\mathbf{v}_{MCI}
              =
              \\mathbf{v}_{origin}
              +
              v_x\\hat{\\mathbf{x}}_{LVLH}
              +
              v_y\\hat{\\mathbf{y}}_{LVLH}
              +
              v_z\\hat{\\mathbf{z}}_{LVLH}
            `}
          />
        </section>

        <hr />

        <section className="mathSection">
          <h2>MCI to SBF Transformation</h2>

          <p>
            The spacecraft body frame is defined by the spacecraft attitude
            quaternion and the current spacecraft origin state.
          </p>

          <p>
            The body-to-inertial quaternion is denoted:
          </p>

          <BlockMath
            math={`
              q_{IB}
            `}
          />

          <p>
            To transform an inertial state into the spacecraft body frame, the
            inverse attitude quaternion is applied to the relative state:
          </p>

          <BlockMath
            math={`
              \\mathbf{r}_{SBF}
              =
              q_{IB}^{-1}
              \\left(
              \\mathbf{r}_{MCI}
              -
              \\mathbf{r}_{origin}
              \\right)
              q_{IB}
            `}
          />

          <BlockMath
            math={`
              \\mathbf{v}_{SBF}
              =
              q_{IB}^{-1}
              \\left(
              \\mathbf{v}_{MCI}
              -
              \\mathbf{v}_{origin}
              \\right)
              q_{IB}
            `}
          />
        </section>

        <hr />

        <section className="mathSection">
          <h2>SBF to MCI Transformation</h2>

          <p>
            The inverse transformation maps body-frame coordinates back into
            the inertial MCI frame.
          </p>

          <BlockMath
            math={`
              \\mathbf{r}_{MCI}
              =
              \\mathbf{r}_{origin}
              +
              q_{IB}
              \\mathbf{r}_{SBF}
              q_{IB}^{-1}
            `}
          />

          <BlockMath
            math={`
              \\mathbf{v}_{MCI}
              =
              \\mathbf{v}_{origin}
              +
              q_{IB}
              \\mathbf{v}_{SBF}
              q_{IB}^{-1}
            `}
          />
        </section>

        <hr />

        <section className="mathSection">
          <h2>Generic Vector Transformations</h2>

          <p>
            Some quantities represent free vectors rather than position states.
            Examples include thrust vectors, acceleration vectors, sensor axes,
            and force directions.
          </p>

          <p>
            Such quantities are rotated between frames without applying a
            translational origin offset.
          </p>

          <BlockMath
            math={`
              \\mathbf{a}_{SBF}
              =
              q_{IB}^{-1}
              \\mathbf{a}_{MCI}
              q_{IB}
            `}
          />

          <BlockMath
            math={`
              \\mathbf{a}_{MCI}
              =
              q_{IB}
              \\mathbf{a}_{SBF}
              q_{IB}^{-1}
            `}
          />

          <p>
            This mechanism is used in the current thrust pipeline. Thrust is
            computed in SBF and rotated into MCI before it is passed to the
            physics model.
          </p>
        </section>

        <hr />

        <section className="mathSection">
          <h2>Implementation Characteristics</h2>

          <ul>
            <li>MCI remains the single translational truth frame.</li>
            <li>MCMF is obtained by lunar rotation from MCI.</li>
            <li>MSC is derived from Moon-fixed Cartesian coordinates.</li>
            <li>ENU is generated from a local MCMF reference point.</li>
            <li>LVLH is computed from instantaneous MCI position and velocity.</li>
            <li>SBF is defined by spacecraft attitude and MCI origin state.</li>
            <li>Generic vector transformations apply rotation only.</li>
          </ul>
        </section>

      </main>
    </Layout>
  );
}