import React from 'react';
import Layout from '@theme/Layout';
import '../../css/mathematics.css';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function RotationalDynamics() {
return ( <Layout
   title="SDF – Rotational Dynamics"
   description="Rigid-body rotational dynamics and quaternion-based attitude propagation used in the Spaceflight Dynamics Framework">

```
  <main className="mathContainer">

    <h1>Rotational Dynamics</h1>

    <section className="mathSection">
      <p>
        This section describes the rotational rigid-body dynamics implemented
        in the Spaceflight Dynamics Framework (SDF). The model propagates the
        rotational state of a spacecraft from externally applied torques,
        its inertia tensor, and its current angular velocity.
      </p>

      <p>
        Rotational dynamics are treated independently from the translational
        equations of motion. The resulting model describes the three
        rotational degrees of freedom of the spacecraft and, together with
        the separately evaluated translational dynamics, forms the complete
        six-degree-of-freedom simulation.
      </p>

      <p>
        The rotational state is represented by the angular velocity vector
        and a unit quaternion describing spacecraft attitude. All dynamic
        quantities involved in Euler's rotational equations are expressed
        in the spacecraft body-fixed frame (SBF).
      </p>
    </section>

    <hr />

    {/* ========================================================= */}
    {/* ROTATIONAL STATE */}
    {/* ========================================================= */}

    <section className="mathSection">
      <h2>Rotational State</h2>

      <p>
        The rotational motion of the spacecraft is described by its angular
        velocity and attitude.
      </p>

      <p>
        The angular velocity vector expressed in the spacecraft body-fixed
        frame is:
      </p>

      <BlockMath
        math={`
          \\boldsymbol{\\omega}_B
          =
          \\begin{bmatrix}
          \\omega_x \\\\
          \\omega_y \\\\
          \\omega_z
          \\end{bmatrix}
        `}
      />

      <p>
        Where:
        <br />
        • <strong><InlineMath math={'\\omega_x'} /></strong> is the angular velocity about the SBF x-axis [rad/s]
        <br />
        • <strong><InlineMath math={'\\omega_y'} /></strong> is the angular velocity about the SBF y-axis [rad/s]
        <br />
        • <strong><InlineMath math={'\\omega_z'} /></strong> is the angular velocity about the SBF z-axis [rad/s]
      </p>

      <p>
        Spacecraft attitude is represented by the unit quaternion:
      </p>

      <BlockMath
        math={`
          \\mathbf{q}
          =
          \\begin{bmatrix}
          q_w \\\\
          q_x \\\\
          q_y \\\\
          q_z
          \\end{bmatrix}
        `}
      />

      <p>
        where <InlineMath math={'q_w'} /> denotes the scalar component and
        <InlineMath math={'q_x'} />, <InlineMath math={'q_y'} /> and
        <InlineMath math={'q_z'} /> form the vector component.
      </p>
    </section>

    <hr />

    {/* ========================================================= */}
    {/* TORQUE */}
    {/* ========================================================= */}

    <section className="mathSection">
      <h2>Torque Generation</h2>

      <p>
        A force generates a rotational moment whenever its line of action
        does not pass through the spacecraft center of mass. For each force
        source, the resulting torque is determined from the cross product
        between the lever-arm vector and the applied force vector.
      </p>

      <BlockMath
        math={`
          \\boldsymbol{\\tau}_B
          =
          \\mathbf{r}_B
          \\times
          \\mathbf{F}_B
        `}
      />

      <p>
        Where:
        <br />
        • <strong><InlineMath math={'\\boldsymbol{\\tau}_B'} /></strong> is the resulting torque vector in SBF [N·m]
        <br />
        • <strong><InlineMath math={'\\mathbf{r}_B'} /></strong> is the position of the force application point relative to the spacecraft center of mass [m]
        <br />
        • <strong><InlineMath math={'\\mathbf{F}_B'} /></strong> is the applied force vector expressed in SBF [N]
      </p>

      <p>
        The magnitude of the generated torque is:
      </p>

      <BlockMath
        math={`
          ||\\boldsymbol{\\tau}||
          =
          ||\\mathbf{r}||
          ||\\mathbf{F}||
          \\sin(\\theta)
        `}
      />

      <p>
        where <InlineMath math={'\\theta'} /> is the angle between the
        lever-arm vector and the applied force vector. Consequently, a force
        acting directly through the center of mass produces no torque,
        whereas an off-center force may generate rotational acceleration
        about one or multiple body axes.
      </p>
    </section>

    <hr />

    {/* ========================================================= */}
    {/* TORQUE AGGREGATION */}
    {/* ========================================================= */}

    <section className="mathSection">
      <h2>Total Applied Torque</h2>

      <p>
        Multiple propulsion elements or other torque-producing models may
        act on the spacecraft simultaneously. The rotational dynamics model
        operates on the net external torque obtained through vector
        superposition of all individual moments.
      </p>

      <BlockMath
        math={`
          \\boldsymbol{\\tau}_{B,total}
          =
          \\sum_{i=1}^{n}
          \\boldsymbol{\\tau}_{B,i}
        `}
      />

      <p>
        All individual torques must be expressed about the same reference
        point and in the same coordinate frame before aggregation. Within
        the current implementation, propulsion-generated torques are
        evaluated about the spacecraft center of mass and represented in
        the spacecraft body-fixed frame.
      </p>
    </section>

    <hr />

    {/* ========================================================= */}
    {/* INERTIA */}
    {/* ========================================================= */}

    <section className="mathSection">
      <h2>Spacecraft Inertia Tensor</h2>

      <p>
        The rotational response of a rigid spacecraft depends on the
        distribution of its mass relative to the body-fixed axes. This
        property is represented by the inertia tensor:
      </p>

      <BlockMath
        math={`
          \\mathbf{I}_B
          =
          \\begin{bmatrix}
          I_{xx} & I_{xy} & I_{xz} \\\\
          I_{yx} & I_{yy} & I_{yz} \\\\
          I_{zx} & I_{zy} & I_{zz}
          \\end{bmatrix}
        `}
      />

      <p>
        Where:
        <br />
        • <strong><InlineMath math={'I_{xx}, I_{yy}, I_{zz}'} /></strong> are the moments of inertia about the body-fixed axes [kg·m²]
        <br />
        • <strong><InlineMath math={'I_{xy}, I_{xz}, I_{yz}'} /></strong> are the products of inertia [kg·m²]
      </p>

      <p>
        If the body-fixed coordinate system is aligned with the principal
        axes of inertia, the products of inertia vanish and the tensor
        becomes diagonal:
      </p>

      <BlockMath
        math={`
          \\mathbf{I}_B
          =
          \\begin{bmatrix}
          I_{xx} & 0 & 0 \\\\
          0 & I_{yy} & 0 \\\\
          0 & 0 & I_{zz}
          \\end{bmatrix}
        `}
      />

      <p>
        The current SDF spacecraft configuration uses a body-fixed inertia
        tensor defined with respect to the spacecraft center of mass.
      </p>
    </section>

    <hr />

    {/* ========================================================= */}
    {/* EULER RIGID BODY EQUATION */}
    {/* ========================================================= */}

    <section className="mathSection">
      <h2>Euler's Rigid-Body Equation</h2>

      <p>
        The rotational acceleration of the spacecraft is determined using
        Euler's equation of motion for a rigid body. Expressed in the
        rotating spacecraft body frame, the equation is:
      </p>

      <BlockMath
        math={`
          \\boldsymbol{\\tau}_B
          =
          \\mathbf{I}_B
          \\dot{\\boldsymbol{\\omega}}_B
          +
          \\boldsymbol{\\omega}_B
          \\times
          \\left(
          \\mathbf{I}_B
          \\boldsymbol{\\omega}_B
          \\right)
        `}
      />

      <p>
        Solving for angular acceleration gives the form used by the
        rotational dynamics model:
      </p>

      <BlockMath
        math={`
          \\dot{\\boldsymbol{\\omega}}_B
          =
          \\mathbf{I}_B^{-1}
          \\left[
          \\boldsymbol{\\tau}_B
          -
          \\boldsymbol{\\omega}_B
          \\times
          \\left(
          \\mathbf{I}_B
          \\boldsymbol{\\omega}_B
          \\right)
          \\right]
        `}
      />

      <p>
        Where:
        <br />
        • <strong><InlineMath math={'\\dot{\\boldsymbol{\\omega}}_B'} /></strong> is the angular acceleration vector [rad/s²]
        <br />
        • <strong><InlineMath math={'\\boldsymbol{\\omega}_B'} /></strong> is the current angular velocity vector [rad/s]
        <br />
        • <strong><InlineMath math={'\\boldsymbol{\\tau}_B'} /></strong> is the total externally applied torque [N·m]
        <br />
        • <strong><InlineMath math={'\\mathbf{I}_B'} /></strong> is the spacecraft inertia tensor [kg·m²]
      </p>
    </section>

    <hr />

    {/* ========================================================= */}
    {/* GYROSCOPIC COUPLING */}
    {/* ========================================================= */}

    <section className="mathSection">
      <h2>Gyroscopic Coupling</h2>

      <p>
        The second term in Euler's rigid-body equation represents the
        gyroscopic coupling caused by expressing the angular momentum in the
        rotating body-fixed frame:
      </p>

      <BlockMath
        math={`
          \\boldsymbol{\\omega}_B
          \\times
          \\left(
          \\mathbf{I}_B
          \\boldsymbol{\\omega}_B
          \\right)
        `}
      />

      <p>
        This term couples rotation about the individual body axes. As a
        consequence, angular acceleration may occur about an axis even when
        the externally applied torque component about that axis is zero.
      </p>

      <p>
        For a diagonal inertia tensor, Euler's equations can be written
        component-wise as:
      </p>

      <BlockMath
        math={`
          \\dot{\\omega}_x
          =
          \\frac{
          \\tau_x
          -
          (I_{zz}-I_{yy})\\omega_y\\omega_z
          }{
          I_{xx}
          }
        `}
      />

      <BlockMath
        math={`
          \\dot{\\omega}_y
          =
          \\frac{
          \\tau_y
          -
          (I_{xx}-I_{zz})\\omega_z\\omega_x
          }{
          I_{yy}
          }
        `}
      />

      <BlockMath
        math={`
          \\dot{\\omega}_z
          =
          \\frac{
          \\tau_z
          -
          (I_{yy}-I_{xx})\\omega_x\\omega_y
          }{
          I_{zz}
          }
        `}
      />

      <p>
        These coupled equations describe the characteristic rotational
        behavior of an asymmetric rigid spacecraft and are retained by the
        vector formulation implemented in SDF.
      </p>
    </section>

    <hr />

    {/* ========================================================= */}
    {/* ANGULAR VELOCITY INTEGRATION */}
    {/* ========================================================= */}

    <section className="mathSection">
      <h2>Angular Velocity Integration</h2>

      <p>
        After evaluating Euler's equation, the resulting angular
        acceleration is numerically integrated to propagate the spacecraft
        angular velocity.
      </p>

      <p>
        For the current explicit Euler integration scheme:
      </p>

      <BlockMath
        math={`
          \\boldsymbol{\\omega}_B(t+\\Delta t)
          =
          \\boldsymbol{\\omega}_B(t)
          +
          \\dot{\\boldsymbol{\\omega}}_B(t)
          \\Delta t
        `}
      />

      <p>
        Where:
        <br />
        • <strong><InlineMath math={'\\boldsymbol{\\omega}_B(t)'} /></strong> is the angular velocity at the current simulation step [rad/s]
        <br />
        • <strong><InlineMath math={'\\dot{\\boldsymbol{\\omega}}_B(t)'} /></strong> is the current angular acceleration [rad/s²]
        <br />
        • <strong><InlineMath math={'\\Delta t'} /></strong> is the simulation timestep [s]
      </p>
    </section>

    <hr />

    {/* ========================================================= */}
    {/* QUATERNION KINEMATICS */}
    {/* ========================================================= */}

    <section className="mathSection">
      <h2>Quaternion Attitude Kinematics</h2>

      <p>
        The angular velocity describes the instantaneous rotational motion
        of the spacecraft but does not by itself define its orientation.
        Spacecraft attitude is therefore propagated independently using a
        unit quaternion.
      </p>

      <p>
        For quaternion kinematics, the body-fixed angular velocity vector is
        represented as the pure quaternion:
      </p>

      <BlockMath
        math={`
          \\boldsymbol{\\Omega}_B
          =
          \\begin{bmatrix}
          0 \\\\
          \\omega_x \\\\
          \\omega_y \\\\
          \\omega_z
          \\end{bmatrix}
        `}
      />

      <p>
        The time derivative of the attitude quaternion is then obtained
        from:
      </p>

      <BlockMath
        math={`
          \\dot{\\mathbf{q}}
          =
          \\frac{1}{2}
          \\mathbf{q}
          \\otimes
          \\boldsymbol{\\Omega}_B
        `}
      />

      <p>
        Where:
        <br />
        • <strong><InlineMath math={'\\dot{\\mathbf{q}}'} /></strong> is the quaternion time derivative
        <br />
        • <strong><InlineMath math={'\\mathbf{q}'} /></strong> is the current attitude quaternion
        <br />
        • <strong><InlineMath math={'\\boldsymbol{\\Omega}_B'} /></strong> is the pure quaternion representation of body angular velocity
        <br />
        • <strong><InlineMath math={'\\otimes'} /></strong> denotes quaternion multiplication
      </p>

      <p>
        The multiplication order follows the attitude convention used by
        the SDF coordinate transformation model and assumes angular velocity
        expressed in the spacecraft body-fixed frame.
      </p>
    </section>

    <hr />

    {/* ========================================================= */}
    {/* QUATERNION INTEGRATION */}
    {/* ========================================================= */}

    <section className="mathSection">
      <h2>Quaternion Integration</h2>

      <p>
        The quaternion differential equation is integrated over the
        simulation timestep using the configured numerical integration
        scheme. For explicit Euler integration:
      </p>

      <BlockMath
        math={`
          \\mathbf{q}(t+\\Delta t)
          =
          \\mathbf{q}(t)
          +
          \\dot{\\mathbf{q}}(t)
          \\Delta t
        `}
      />

      <p>
        Numerical integration introduces small floating-point deviations
        from the unit-length constraint required for a valid rotation
        quaternion. The propagated quaternion is therefore normalized after
        each integration step:
      </p>

      <BlockMath
        math={`
          \\mathbf{q}
          \\leftarrow
          \\frac{
          \\mathbf{q}
          }{
          ||\\mathbf{q}||
          }
        `}
      />

      <p>
        A valid spacecraft attitude quaternion consequently satisfies:
      </p>

      <BlockMath
        math={`
          ||\\mathbf{q}|| = 1
        `}
      />

      <p>
        Quaternion representation avoids the kinematic singularities
        associated with Euler-angle attitude representations and is therefore
        well suited for unrestricted three-dimensional spacecraft rotation.
      </p>
    </section>

    <hr />

    {/* ========================================================= */}
    {/* COMPUTATIONAL PIPELINE */}
    {/* ========================================================= */}

    <section className="mathSection">
      <h2>Rotational State Propagation</h2>

      <p>
        The complete rotational state propagation performed during one
        simulation timestep can be summarized as:
      </p>

      <BlockMath
        math={`
          \\mathbf{F}_{B,i}
          \\;\\longrightarrow\\;
          \\boldsymbol{\\tau}_{B,i}
          \\;\\longrightarrow\\;
          \\boldsymbol{\\tau}_{B,total}
          \\;\\longrightarrow\\;
          \\dot{\\boldsymbol{\\omega}}_B
          \\;\\longrightarrow\\;
          \\boldsymbol{\\omega}_B
          \\;\\longrightarrow\\;
          \\mathbf{q}
        `}
      />

      <p>
        First, individual force application points generate body-fixed
        torques. These torques are aggregated and passed to the rotational
        physics model. Euler's rigid-body equation determines angular
        acceleration, which is subsequently integrated to obtain angular
        velocity. Finally, quaternion kinematics propagate the spacecraft
        attitude.
      </p>

      <p>
        The separation between torque generation, rigid-body dynamics and
        numerical integration allows the individual components to be
        modified or replaced without changing the complete rotational
        simulation architecture.
      </p>
    </section>

    <hr />

    {/* ========================================================= */}
    {/* MODEL ASSUMPTIONS */}
    {/* ========================================================= */}

    <section className="mathSection">
      <h2>Model Assumptions and Current Limitations</h2>

      <p>
        The current rotational dynamics implementation is based on a rigid
        spacecraft model. The following assumptions define the present
        validity range of the model:
      </p>

      <ul>
        <li>The spacecraft is treated as a rigid body.</li>
        <li>The inertia tensor is defined in the spacecraft body-fixed frame.</li>
        <li>The current model does not represent structural flexibility.</li>
        <li>Propellant slosh is not modeled.</li>
        <li>Dynamic center-of-mass migration is currently neglected.</li>
        <li>Reaction wheels and control moment gyroscopes are not currently modeled.</li>
        <li>Environmental disturbance torques are not yet included.</li>
        <li>Aerodynamic moments are not currently considered.</li>
      </ul>

      <p>
        These assumptions provide a deterministic rigid-body baseline that
        can be extended by additional physical models without changing the
        fundamental rotational dynamics interface.
      </p>
    </section>

    <hr />

    {/* ========================================================= */}
    {/* SUMMARY */}
    {/* ========================================================= */}

    <section className="mathSection">
      <h2>Key Characteristics</h2>

      <ul>
        <li>Three-axis rigid-body rotational dynamics</li>
        <li>Body-fixed torque generation and aggregation</li>
        <li>Full inertia tensor representation</li>
        <li>Euler rigid-body equations including gyroscopic coupling</li>
        <li>Numerical angular velocity propagation</li>
        <li>Quaternion-based spacecraft attitude representation</li>
        <li>Normalized quaternion attitude integration</li>
        <li>Explicit separation from translational dynamics</li>
        <li>Modular and extensible rotational physics architecture</li>
      </ul>
    </section>

  </main>
</Layout>
);
}