import React from 'react';
import Link from '@docusaurus/Link';
import '../css/topbar.css'; // wir legen CSS separat an

export default function Topbar() {
  return (
    <header className="topbar">
      <nav className="topbarNav">
        <div className="logo">
          <Link to="/">Moonlander</Link>
        </div>
        <ul className="navLinks">
          <li><Link to="/about">Explore Project Details</Link></li>
          <li><Link to="/simulation">Simulation</Link></li>
          <li><Link to="/docs">Mathematics</Link></li>
          <li><Link to="/team">Team</Link></li>
          <li><Link to="/recruiting">Recruiting</Link></li>
        </ul>
      </nav>
    </header>
  );
}
