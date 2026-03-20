import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { COLORS, SCENES } from './theme/constants';
import { CircuitBackground } from './components/backgrounds/CircuitBackground';
import { Scene01_ColdOpen } from './scenes/Scene01_ColdOpen';
import { Scene02_Trigger } from './scenes/Scene02_Trigger';
import { Scene03_Extraction } from './scenes/Scene03_Extraction';
import { Scene04_ArtifactStorage } from './scenes/Scene04_ArtifactStorage';
import { Scene05_Package } from './scenes/Scene05_Package';
import { Scene06_CrossAccount } from './scenes/Scene06_CrossAccount';
import { Scene07_DeployPipeline } from './scenes/Scene07_DeployPipeline';
import { Scene08_DataLake } from './scenes/Scene08_DataLake';
import { Scene09_BigPicture } from './scenes/Scene09_BigPicture';

export const PackageDeployConnect: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      {/* Global circuit background — rendered once, visible throughout */}
      <CircuitBackground />

      <Sequence from={SCENES.scene01.start} durationInFrames={SCENES.scene01.duration}>
        <Scene01_ColdOpen />
      </Sequence>

      <Sequence from={SCENES.scene02.start} durationInFrames={SCENES.scene02.duration}>
        <Scene02_Trigger />
      </Sequence>

      <Sequence from={SCENES.scene03.start} durationInFrames={SCENES.scene03.duration}>
        <Scene03_Extraction />
      </Sequence>

      <Sequence from={SCENES.scene04.start} durationInFrames={SCENES.scene04.duration}>
        <Scene04_ArtifactStorage />
      </Sequence>

      <Sequence from={SCENES.scene05.start} durationInFrames={SCENES.scene05.duration}>
        <Scene05_Package />
      </Sequence>

      <Sequence from={SCENES.scene06.start} durationInFrames={SCENES.scene06.duration}>
        <Scene06_CrossAccount />
      </Sequence>

      <Sequence from={SCENES.scene07.start} durationInFrames={SCENES.scene07.duration}>
        <Scene07_DeployPipeline />
      </Sequence>

      <Sequence from={SCENES.scene08.start} durationInFrames={SCENES.scene08.duration}>
        <Scene08_DataLake />
      </Sequence>

      <Sequence from={SCENES.scene09.start} durationInFrames={SCENES.scene09.duration}>
        <Scene09_BigPicture />
      </Sequence>
    </AbsoluteFill>
  );
};
