class JHBaseResponse {
  constructor() {
    this.code = 0;
    this.msg = '';
    this.data = null
  }

  success() {
    return this.code == 0
  }
}

export { JHBaseResponse }