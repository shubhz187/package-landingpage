import React from 'react';
import './index.css';
import { Composition } from 'remotion';
import { PackageDeployConnect } from './PackageDeployConnect';
import { Scene01_ColdOpen } from './scenes/Scene01_ColdOpen';
import { Scene02_Trigger } from './scenes/Scene02_Trigger';
import { Scene03_Extraction } from './scenes/Scene03_Extraction';
import { Scene04_ArtifactStorage } from './scenes/Scene04_ArtifactStorage';
import { Scene05_Package } from './scenes/Scene05_Package';
import { Scene06_CrossAccount } from './scenes/Scene06_CrossAccount';
import { Scene07_DeployPipeline } from './scenes/Scene07_DeployPipeline';
import { Scene08_DataLake } from './scenes/Scene08_DataLake';
import { Scene09_BigPicture } from './scenes/Scene09_BigPicture';
import {
  TOTAL_FRAMES,
  FPS,
  WIDTH,
  HEIGHT,
  SCENES,
} from './theme/constants';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Main full-length composition */}
      <Composition
        id="PackageDeployConnect"
        component={PackageDeployConnect}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      {/* Individual scene previews for fast iteration */}
      <Composition
        id="Scene01-ColdOpen"
        component={Scene01_ColdOpen}
        durationInFrames={SCENES.scene01.duration}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Scene02-Trigger"
        component={Scene02_Trigger}
        durationInFrames={SCENES.scene02.duration}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Scene03-Extraction"
        component={Scene03_Extraction}
        durationInFrames={SCENES.scene03.duration}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Scene04-ArtifactStorage"
        component={Scene04_ArtifactStorage}
        durationInFrames={SCENES.scene04.duration}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Scene05-Package"
        component={Scene05_Package}
        durationInFrames={SCENES.scene05.duration}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Scene06-CrossAccount"
        component={Scene06_CrossAccount}
        durationInFrames={SCENES.scene06.duration}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Scene07-DeployPipeline"
        component={Scene07_DeployPipeline}
        durationInFrames={SCENES.scene07.duration}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Scene08-DataLake"
        component={Scene08_DataLake}
        durationInFrames={SCENES.scene08.duration}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Scene09-BigPicture"
        component={Scene09_BigPicture}
        durationInFrames={SCENES.scene09.duration}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
