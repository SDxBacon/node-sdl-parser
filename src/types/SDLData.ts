import produce, { enableMapSet } from "immer";

enableMapSet();

// const BEGIN_STR = "TOKEN";
const STOP_STR = "End";

export interface SDLDataElement {
  Value?: String;
  Props?: String[];
}

/**
 * SDLData class
 */
class SDLData {
  private _map;
  private _targetKey?: string;
  private _cacheElement?: SDLDataElement;

  constructor() {
    this._map = new Map<string, SDLDataElement>();
  }

  // memorized
  public memorized() {
    const key = this._targetKey;
    const value = this._cacheElement;
    if (key && value) {
      this._map = produce(this._map, (draft) => draft.set(key, value));
    }
  }

  public get(key: string) {
    return this._map.get(key)?.Value;
  }

  // TODO: 很簡略拼湊一下
  public parseLine(key: string, value?: string) {
    if (key === "Name") {
      this._targetKey = value;
      this._cacheElement = {};
    } else if (key === STOP_STR) {
      this.memorized();
    } else if (key === "Value" && this._cacheElement) {
      this._cacheElement.Value = value;
    }
  }
}

export default SDLData;
