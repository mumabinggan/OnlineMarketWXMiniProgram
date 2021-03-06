// components/classic/shopcartlistitem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: null
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectedStateImage: '/images/shopcartselected/selected.png',
    unselectedStateImage: '/images/shopcartselected/unselected.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSelect:function() {
      this.triggerEvent('onSelect',
        this.dataset.id)
    },

    handleAddCount: function () {
      this.triggerEvent('onAdd',
        this.dataset.id)
    },

    handleSubCount: function () {
      this.triggerEvent('onSub', this.dataset.id)
    }
  }
})
