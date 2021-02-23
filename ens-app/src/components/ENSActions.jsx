import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { FormRegisterDomain } from "../forms";

export const ENSActions = () => (
  <Tabs>
    <TabList>
      <Tab>Overview</Tab>
      <Tab>Register</Tab>
      <Tab>Subdomains</Tab>
      <Tab>Transfer</Tab>
      <Tab>Set Records</Tab>
      <Tab>Renew</Tab>
    </TabList>

    {/* Overview */}
    <TabPanel>
      <h2>Overview</h2>
    </TabPanel>
    {/* Register */}
    <TabPanel>
      <h2>Register Address</h2>
      <FormRegisterDomain />
    </TabPanel>
    {/* Subdomains */}
    <TabPanel>
      <h2>Subdomains</h2>
    </TabPanel>
    {/* Transfer */}
    <TabPanel>
      <h2>Transfer Registrant and Contoller</h2>
    </TabPanel>
    {/* Set Records */}
    <TabPanel>
      <h2>Record Management</h2>
    </TabPanel>
  </Tabs>
);

export default ENSActions;
