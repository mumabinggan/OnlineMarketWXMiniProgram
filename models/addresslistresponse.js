import {
  JHBaseResponse
} from 'baseresponse.js'

import {
  Address
} from 'address.js'

class AddressListResponse extends JHBaseResponse {
  constructor() {
    super()
    this.data = []
  }

  static test() {
    let response = new AddressListResponse()
    response.code = 1
    response.msg = "εΎε°ζε"
    response.data = [Address.test(),
      Address.test(),
      Address.test(),
      Address.test(),
      Address.test(),
      Address.test(),
      Address.test(),
      Address.test(),
      Address.test(),
      Address.test()]
    return response
  }
}

export { AddressListResponse }