import {
  JHBaseResponse
} from 'baseresponse.js'

import {
  ProductListProductItem
} from 'productlistitem.js'

class ProductListResponse extends JHBaseResponse {
  constructor() {
    super()
    this.data = []
  }

  static test() {
    let response = new ProductListResponse()
    response.code = 1
    response.msg = "εΎε°ζε"
    response.data = [ProductListProductItem.test(),
      ProductListProductItem.test(),
      ProductListProductItem.test(),
      ProductListProductItem.test(),
      ProductListProductItem.test(),
      ProductListProductItem.test(),
      ProductListProductItem.test(),
      ProductListProductItem.test()]
    return response
  }
}

export { ProductListResponse }