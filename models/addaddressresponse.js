import {
  JHBaseResponse
} from 'baseresponse.js'

import {
  Address
} from 'address.js'

class AddAddressResponse extends JHBaseResponse {
  constructor() {
    super()
  }

  static test() {
    let item = new AddAddressResponse()
    item.code = 1
    item.msg = "εΎε°ζε"
    item.data = Address.test()
    return item
  }
}

export { AddAddressResponse }