import React from "react";
import { Tabs } from "antd";
import Interviewee from "./pages/Interviewee";
import Interviewer from "./pages/Interviewer";

const { TabPane } = Tabs;

const App = () => {
  return (
    <div>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Interviewee" key="1">
          <Interviewee />
        </TabPane>
        <TabPane tab="Interviewer" key="2">
          <Interviewer />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default App;
