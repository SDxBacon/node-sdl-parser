enum SpecialTokens {
  SectionStart = "Name",
  SectionEnd = "End",
  Value = "Value",
  Condition = "Token",
}

export interface SDLSectionData {
  PropertyName?: String;
  Value?: String;
  _isConditionTruthy: boolean;
}

function isOperatorMeansEqual(operator: string) {
  return operator === "=";
}

/**
 * SDLData class
 */
class SDLData {
  private _map;
  private _propertyName?: string;
  private _cacheElement?: SDLSectionData;

  constructor() {
    this._map = new Map<string, SDLSectionData>();
  }

  /**
   * 當解析到 Name={PropertyName}時，代表一個section的開始。
   * 紀錄propertyName與生成cache element
   */
  private handleSectionStart(propertyName: string) {
    this._propertyName = propertyName;
    this._cacheElement = {
      _isConditionTruthy: true,
    };
  }

  /**
   * 處理condition line的函式, condition可能結構如下：
   *    1. expr1=expr2
   *    2. expr1!=expr2
   *
   * @param condition
   * @method
   * @private
   */
  private handleConditionLine(condition: string) {
    const regexp = new RegExp(/(\w*)(\!?=)(.*)/);
    const result = regexp.exec(condition);
    if (result) {
      const [_, expr1, operator, expr2] = result;
      const isExprTruthy = isOperatorMeansEqual(operator)
        ? this.get(expr1) === expr2
        : this.get(expr1) !== expr2;

      /** 若判斷結果非truthy, 拋棄當前section的cache element */
      if (!isExprTruthy && this._cacheElement) {
        this._cacheElement._isConditionTruthy = false;
      }
    }
  }

  /**
   * getter of a property
   * @param propertyName
   */
  public get(propertyName: string) {
    return this._map.get(propertyName)?.Value;
  }

  // memorized
  public handleSectionEnd() {
    const propertyName = this._propertyName;
    const value = this._cacheElement;
    if (propertyName && value?._isConditionTruthy) {
      this._map.set(propertyName, value);
    }
  }

  public parseLine(key: string, value?: string) {
    switch (key) {
      /**
       * 當解析到 Name={PropertyName}時，代表一個section的開始。
       */
      case SpecialTokens.SectionStart:
        if (value) this.handleSectionStart(value);
        return;
      /**
       * 當解析到 END 時，代表一個section的結束。
       */
      case SpecialTokens.SectionEnd:
        this.handleSectionEnd();
        return;
      /**
       * 當解析到 Value={value}時，此時的的value為該PropertyName的值。
       * 用來行程 key-value pair
       */
      case SpecialTokens.Value:
        if (this._cacheElement) this._cacheElement.Value = value;
        return;
      /**
       * 當遇到 Token = {value}時，此時的value為condition判斷式。
       */
      case SpecialTokens.Condition:
        if (value) this.handleConditionLine(value);
        return;
      /**
       * 其餘情況先Discard，若有需要再補上
       */
      default:
        return;
    }
  }
}

export default SDLData;
