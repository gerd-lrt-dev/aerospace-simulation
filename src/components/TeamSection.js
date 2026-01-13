import React from 'react';
import clsx from 'clsx';
import styles from './TeamSection.module.css';

// Beispiel-Daten. Später einfach erweitern oder von JSON laden
const teamMembers = [
  {
    name: 'Gerd',
    role: 'MSc Aerospace Engineering',
    skills: 'Control Systems, C++, Simulation',
    interests: 'Numerics, Autonomous Systems',
    photo: '/img/team/gerd.png', // lege Bild unter static/img/team/
  },
  {
    name: 'Member 2',
    role: 'Role / Job',
    skills: 'Skillset',
    interests: 'Private Interests',
    photo: '/img/team/member2.png',
  },
];

export default function TeamSection() {
  return (
    <section className={styles.teamSection}>
      <h2 className={styles.title}>Our Team</h2>
      <div className={styles.grid}>
        {teamMembers.map((member, idx) => (
          <div key={idx} className={styles.card}>
            <img
              src={member.photo}
              alt={member.name}
              className={styles.photo}
            />
            <h3>{member.name}</h3>
            <p className={styles.role}>{member.role}</p>
            <p className={styles.skills}><strong>Skills:</strong> {member.skills}</p>
            <p className={styles.interests}><strong>Interests:</strong> {member.interests}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
