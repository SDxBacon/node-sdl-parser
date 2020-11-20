class SDLDataProp {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  public get(key: string) {
    console.log("Tell me, what do you want:", key);
  }

  public set(key: string, value: string | undefined) {}
}

export default SDLDataProp;
