// components/searchbar/searchbar.js
Component({

  /**
   * 页面的初始数据
   */
  properties: {

    placeholder: {
      type: String,
      value: "搜索"
    },
    focus: {
      type: Boolean,
      value: false
    },
    value: {
      type: String,
      value:""
    },
    searchState:{
      type: Boolean,
      value: false
    }


  },


  data: {

    //搜索结果
    result:[]

  },


  methods: {

    //清除输入框及查询结果
    clearInput(e){
      this.setData({
        value: '',
        focus: false,
        result: []
      });
    },

    //输入框获取焦点
    inputFocus(e){
      this.triggerEvent('focus', e.detail);
    },

    //输入框失去焦点
    inputBlur(e){
      this.triggerEvent('blur',e.detail);
      this.setData({
        focus: false
      });
    },

    showInput(){
      this.setData({
        focus: true,
        searchState: true
      });
    },

    hideInput(){
      this.setData({
        focus: false,
        searchState: false
      });
      this.triggerEvent('cancle');
    },

    //动态输入查询
    inputChange(e){
      this.setData({
        value: e.value.detail
      });
      this.triggerEvent('input',e.detail);

      if (Date.now() - this.lastSearch < this.data.throttle) {
        return;
      }

      if (typeof this.data.search !== 'function') {
        return;
      }

      this.lastSearch = Date.now();
      this.timerId = setTimeout(() => {
        this.data.search(this.data.value).then(json => {
          this.setData({
            result: json
          });
        }).catch(err => {
          console.error('search error', err);
        });
      }, this.data.throttle);

    }
  }
})