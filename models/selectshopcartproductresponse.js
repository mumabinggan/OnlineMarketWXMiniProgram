import {
  AddCartResponse
} from 'addcartresponse.js'

import {
  SelectShopCartProduct
} from 'selectshopcartproduct.js'

class SelectShopCartProductResponse extends AddCartResponse {
  constructor() {
    super()
  }

  static test() {
    let item = new SelectShopCartProductResponse()
    item.code = 1
    item.msg = "εΎε°ζε"
    item.data = SelectShopCartProduct.test()
    return item
  }
}

export { SelectShopCartProductResponse }