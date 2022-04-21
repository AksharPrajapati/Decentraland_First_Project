export class Arissa extends Entity {
  constructor(model: GLTFShape, transform: Transform) {
    super();
    engine.addEntity(this);
    this.addComponent(model);
    this.addComponent(transform);

    this.addComponent(new Animator());
    this.getComponent(Animator).addClip(
      new AnimationState("MRun", { looping: true })
    );
    this.getComponent(Animator).addClip(
      new AnimationState("BreathIdle", { looping: true })
    );
  }
  // Play running animation
  playRunning() {
    this.getComponent(Animator).getClip("MRun").play();
  }

  // Play idle animation
  playIdle() {
    this.getComponent(Animator).getClip("BreathIdle").play();
  }
}
