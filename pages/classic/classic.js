// pages/classic/index.js
import { ClassicModel } from '../../viewmodels/classicmodel.js'

import { UserUtils } from '../../utils/userutil.js'

import { JHDeviceUtils } from '../../utils/deviceutils.js'

import {
  AddCartResponse, AddCart
} from '../../models/addcartresponse.js'
import { JHStorageUtils } from '../../utils/storageutils.js'

import { OMCartStorageUtils } from '../../utils/cartstorageutils.js'

import {
  JHObjectUtils
} from '../../utils/objectutils.js'

import {
  ShopCartProductLocalItem
} from '../../models/shopcartproductlocalitem.js'

import { ShopCartViewModel } 
from '../../viewmodels/shopcartviewmodel.js'
import { JHRouterUtils } from '../../utils/jsrouterutils.js'
import { JHArrayUtils } from '../../utils/arrayutils.js'

let classicModel = new ClassicModel()
let shopCartModel = new ShopCartViewModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedTitleIndex: 0,
    classic:[],
    subClassic: [],
    branches: [],
    spus:[],
    isRefreshing: false,  //正在下拉
    isLoadingMore: false, //正在上拉
    enableLoadingMore: true,
    isRequestSpus: false,
    pageNum: 1,
    pageSize: 15,
    spusRequest: null,
    refreshingTimeoutId: null,

    //选择sku弹出框
    shouldShowSelectSkuView: true,
    isShowingSelectSkuView: false,
    entrance: 2,
    product: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '分类',
    })
    console.log("====分类=====")
    wx.showLoading()
    classicModel.fetchClassic({
      success: (res) => {
        wx.hideLoading()
        if (res.code == 0) {
          this.setData({
            classic: res.data
          })
          this.setRefreshing(true, 0)
        } else {
          //todo:重试loading
          console.log("asdfasdfasdf")
          wx.showToast({
            title: '刷新后重试',
            duration: 2000,
            icon: 'none'
          })
          // wx.showToast("分类加载失败, 请重试")
        }
      },
      fail: (err) => {
        console.log(err)
        wx.hideLoading()
      }
    })
    // JHStorageUtils.addItemSync("caolimma", "sss")
    // JHStorageUtils.fetchItemAsync("caolimma")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // setTimeout(() => {
    //   this.setData({
    //     triggered: true,
    //   })
    // }, 1000)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  onHeaderRefresh() {
    this.setData({
      pageNum: 1
    })
    this.setRefreshing(true, 0)
    this.fetchProducts()
  },

  onFooterRefresh() {
    this.setData({
        isLoadingMore: true
    })
    this.fetchProducts()
  },

  onEndHeaderTriggered() {
    this.setRefreshing(false, 0)
  },

  onEndFooterTriggered() {
    this.setData({
      isLoadingMore: false
    })
  },

  handleTitleItem: function(e) {
    console.log("=====handleTitle======")
    const touchIndex = e.detail
    let data = this.data
    let spus = data.spus
    if (touchIndex == data.selectedTitleIndex && 
      spus != null &&
      spus.length > 0) {
        console.log("=====back======")
        return
    }
    this.setData({
      selectedTitleIndex: e.detail,
      // spus: [],
      pageNum: 1,
      isLoadingMore: false,
      offset: 0
    })
    this.setRefreshing(true, 0)
  },
  
  fetchProducts:function() {
    let classicItem = this.data.classic[this.data.selectedTitleIndex]
    console.log(classicItem.id)
    console.log("============pruduct=========")
    let json = JSON.stringify(classicItem)
    console.log(json)
    console.log("============pruduct=========")
    let model = JSON.parse(json)
    console.log(model)
        this.setData({
      //     spus: classicItem.spus,
      // branches: classicItem.hotBranches,
          // isRefreshing: false
    })
    // return
    const pageNum = this.data.pageNum
    const pageSize = this.data.pageSize
    console.log(pageNum)
    classicModel.fetchSpusByClassicId(classicItem.id, 2, 1, pageNum, pageSize, {
      success: (res) => {
        const data = this.data
        let spus = (data.pageNum == 1) ? [] : data.spus;
        const newSpus = res.data.list
        spus = spus.concat(newSpus)
        const hasMore = !res.data.isLastPage
        this.setData({
          spus: spus,
          pageNum: pageNum+1,
          enableLoadingMore: hasMore
        })
        console.log(this.data.spus)
        this.setRefreshing(false, 0)
      },
      fail: (err) => {
        console.log(err)
        this.setRefreshing(false, 0)
      }
    })
  },

  setRefreshing:function(isRefreshing, timeout) {
    clearTimeout(this.data.refreshingTimeoutId)
    if (timeout == 0) {
      this.setData({
        isRefreshing: isRefreshing,
      })
    } else {
      const that = this
      var refreshingTimeoutId = setTimeout(function () {
        that.setData({
          isRefreshing: isRefreshing,
        })
      }, timeout);
      that.setData({
        refreshingTimeoutId: refreshingTimeoutId,
      })
    }
  },

  onClick: function(e) {
    let item = e.currentTarget.dataset.id
    JHRouterUtils.toProductDetail(item.id)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  handleAddToCartIfNeed: function(e) {
    let item = e.detail
    console.log(item)
    console.log(item)
    console.log("handleAddToCartIfNeed")
    if (JHObjectUtils.isNullOrUndefined(item)) {
      wx.showToast({
        title: '数据有错误, 刷新后重试',
      })
      return
    }

    let shouldShowSelectSkuView = false
    let isShowingSelectSkuView = false
    console.log("====asdfasd==============")
    if (item.skuId != null) {
      //直接加入购物车
      shouldShowSelectSkuView = false
      isShowingSelectSkuView = false
      item.count = 1
      this.handleAddToCart(item)
    } else {
      //弹出选择spu框
      shouldShowSelectSkuView = true
      isShowingSelectSkuView = true
    }
    this.setData({
      shouldShowSelectSkuView: shouldShowSelectSkuView,
      isShowingSelectSkuView: isShowingSelectSkuView,
      product: item
    })
  },

  handleAddToCart: function(item) {
    console.log("===handleAddToCart===")
    if (UserUtils.isLogined()) {
      shopCartModel.addGoodToShopCart(item, {
        success: (res) => {
          console.log("=====success====")
          console.log(res)
          wx.showToast({
            title: res.msg,
          })
        },
        fail: (err) => {
          console.log("=====fail====")
          wx.showToast({
            title: "网络错误, 请稍后重试",
          })
        }
      })
    } else {
      let localItem = ShopCartProductLocalItem.fromProduct(item)
      console.log(localItem)
      OMCartStorageUtils.addItemToCartAsync(localItem)
    }
  },

  //操作商品数量成功
  handleBuyCountSuccess: function (index, isAdd, res) {
    if (res == null || !res.success()) {
      //TODU 错误提示
      wx.showToast({
        title: res.msg,
        duration: 2000
      })
      return
    }
    var buyCount = this.data.products[index].buyCount
    buyCount = isAdd ? buyCount + 1 : buyCount - 1
    if (buyCount < 0) {
      return
    }
    var ab = "products[" + index + "].buyCount"
    this.setData({
      [ab]: buyCount
    })
  },

  /**
   * =====================pop sku select begin==================
   */
  //sku选择框回调方法
  handleMove: function(e) {
    // return
  },

  handleCloseSelectSkuView: function(e) {
    console.log("=fsd")
    this.setData({
      isShowingSelectSkuView: false
    })
  },

  /**
   * =====================pop sku select end==================
   */
})