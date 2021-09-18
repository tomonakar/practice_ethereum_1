import React from 'react';
import styles from './index.module.css';
import factory from '../ethereum/factory';

export async function Index() {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  console.log({ campaigns });
  return <> campaigns</>;
}

export default Index;
