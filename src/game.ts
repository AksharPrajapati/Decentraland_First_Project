import * as utils from "@dcl/ecs-scene-utils";
import { Arissa } from "./arissa";

// Base
const base = new Entity();
base.addComponent(new GLTFShape("models/scene.glb"));
engine.addEntity(base);

// Arissa
const arissa = new Arissa(
  new GLTFShape("models/run204.glb"),
  new Transform({
    position: new Vector3(0, -0.85, -0.1),
    scale: new Vector3(1, 1, 1),
  })
);
arissa.setParent(Attachable.AVATAR);

// Hide avatars
const hideAvatarsEntity = new Entity();
hideAvatarsEntity.addComponent(
  new AvatarModifierArea({
    area: { box: new Vector3(1000, 1000, 1000) },
    modifiers: [AvatarModifiers.HIDE_AVATARS],
  })
);
// hideAvatarsEntity.addComponent(
//   new Transform({ position: new Vector3(7.41, 0.88, 16) })
// );
engine.addEntity(hideAvatarsEntity);

// Create to show Arissa avatar
// hideAvatarsEntity.addComponent(
//   new utils.TriggerComponent(
//     new utils.TriggerBoxShape(new Vector3(100, 4, 100), Vector3.Zero()),
//     {
//       onCameraEnter: () => {
//         arissa.getComponent(Transform).scale.setAll(1);
//       },
//       onCameraExit: () => {
//         arissa.getComponent(Transform).scale.setAll(0);
//       },
//     }
//   )
// );

// Check if player is moving
const currentPosition = new Vector3();

class CheckPlayerIsMovingSystem implements ISystem {
  update() {
    if (currentPosition.equals(Camera.instance.position)) {
      arissa.playIdle();
    } else {
      currentPosition.copyFrom(Camera.instance.position);
      arissa.playRunning();
    }
  }
}
engine.addSystem(new CheckPlayerIsMovingSystem());
