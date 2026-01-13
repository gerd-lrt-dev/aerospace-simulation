import React from 'react';
import Layout from '@theme/Layout';
import '../css/underConstruction.css';

export default function UnderConstruction({ title = "Page" }) {
  return (
    <Layout title={`${title} - Under Construction`}>
      <main className="underConstruction">
        <h1>{title}</h1>
        <p>This page is currently under construction. Please check back soon!</p>
      </main>
    </Layout>
  );
}
