import React, { useState } from 'react';
import Layout from './components/Layout';
import AskMeAnything from './components/AskMeAnything';
import QuickSummarizer from './components/QuickSummarizer';
import IdeaGenerator from './components/IdeaGenerator';
import DefinitionFinder from './components/DefinitionFinder';
import { ToolType } from './types';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>(ToolType.ASK);

  const renderTool = () => {
    switch (activeTool) {
      case ToolType.ASK:
        return <AskMeAnything />;
      case ToolType.SUMMARIZE:
        return <QuickSummarizer />;
      case ToolType.IDEAS:
        return <IdeaGenerator />;
      case ToolType.DEFINE:
        return <DefinitionFinder />;
      default:
        return <AskMeAnything />;
    }
  };

  return (
    <Layout activeTool={activeTool} setActiveTool={setActiveTool}>
      {renderTool()}
    </Layout>
  );
};

export default App;