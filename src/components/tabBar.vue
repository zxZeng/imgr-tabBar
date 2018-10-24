<template>
  <div>

    <div class="p-formRegion">
      <div class="panel panel-default">
        <div class="panel-heading">
          <i class="icon-warring"></i>
          <span class="panel-title">每次更改导航栏后需重新提交微信审核，审核通过后方可生效（只更换链接无需审核）</span>
        </div>
      </div>
      <div class="cn-wrap clearfix">
        <div class="cn-bg">
          <div class="cn-body">
            <div class="p-nav-menu">
              <div class="menu-box">
                <ul>
                  <li class="tabBar-item" v-for="item,index in tabBar.list" :key="index">
                    <div class="icon"><img :src="require('../assets/'+item.iconPath)" v-if="item.iconPath !== ''"   alt=""></div>
                    <div class="title"><span>{{item.text}}</span></div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="cn-iRegion">
          <div class="cn-content">
            <div v-for="item,index in tabBar.list" class="tabBarList" :key="index" v-if="index === 0">
              <label class="item-title">导航{{index + 1}}：</label>
              <div class="item">
                <div class="form-horizontal">
                  <div class="form-group">
                    <label class="control-label">
                      <i class="text-danger">*</i>
                      <span>名称：</span>
                    </label>
                    <div class="controls">
                      <input :class="['form-control','input-normal',item.text?'':'empty']" type="text" v-model="item.text" style="width: 200px;" maxlength="5">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label">
                      <i class="text-danger">*</i>
                      <span>图片：</span>
                    </label>
                    <div class="controls mt5">
                      <div>
                        <a href="javascript:;" @click="editIcon(index)">修改</a>
                      </div>
                      <div class="icons" v-if="item.iconPath !== ''">
                        <div class="wrapper">
                          <div class="icon" v-if="item.iconPath !== ''">
                            <img :src="require('../assets/'+item.iconPath)" alt="">
                          </div>
                          <div class="mt5">未选中</div>
                        </div>
                        <div class="wrapper">
                          <div class="icon" v-if="item.selectedIconPath !== ''">
                            <img :src="require('../assets/'+item.selectedIconPath)" alt="">
                          </div>
                          <div class="mt5">选中</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label">
                      <i class="text-danger">*</i>
                      <span>链接：</span>
                    </label>
                    <div class="controls">
                      <div class="input-group">
                        <input type="text" class="form-control" placeholder="请选择链接" :id="'link_'+index"
                               disabled="disabled" :value="item.pathName">
                        <span class="input-group-btn"
                              v-if="item.pathName !== '首页' && item.pathName !== '购物车' && item.pathName !== '个人中心'"> <button
                          class="btn btn-default iconfont" type="button" @click="chooseLink(index)"
                          :data-index="index"></button> </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="delClose" v-if="item.pathName !== '首页' && item.pathName !== '购物车' && item.pathName !== '个人中心'"
                   @click="delTabBar(index)">&times;
              </div>
            </div>
            <draggable v-model="tabBar.list" :options="{ animation:150}" draggable='false'>
              <div v-for="item,index in tabBar.list" class="tabBarList" :key="index"
                   v-if="index > 0 && index < tabBar.list.length - 1">
                <label class="item-title">导航{{index + 1}}：</label>
                <div class="item">
                  <div class="form-horizontal">
                    <div class="form-group">
                      <label class="control-label">
                        <i class="text-danger">*</i>
                        <span>名称：</span>
                      </label>
                      <div class="controls">
                        <input :class="['form-control','input-normal',item.text?'':'empty']" type="text" v-model="item.text" style="width: 200px;" maxlength="5">
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label">
                        <i class="text-danger">*</i>
                        <span>图片：</span>
                      </label>
                      <div class="controls mt5">
                        <div>
                          <a href="javascript:;" :class="item.iconPath?'':'empty'" @click="editIcon(index)">修改</a>
                        </div>
                        <div class="icons" v-if="item.iconPath !== ''">
                          <div class="wrapper">
                            <div class="icon" v-if="item.iconPath !== ''">
                              <img :src="require('../assets/'+item.iconPath)" alt="">
                            </div>
                            <div class="mt5">未选中</div>
                          </div>
                          <div class="wrapper">
                            <div class="icon" v-if="item.selectedIconPath !== ''">
                              <img :src="require('../assets/'+item.selectedIconPath)" alt="">
                            </div>
                            <div class="mt5">选中</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label">
                        <i class="text-danger">*</i>
                        <span>链接：</span>
                      </label>
                      <div class="controls">
                        <div class="input-group">
                          <input type="text" :class="['form-control',item.pathName?'':'empty']" placeholder="请选择链接" :id="'link_'+index"
                                 disabled="disabled" :value="item.pathName">
                          <span class="input-group-btn"
                                v-if="item.pathName !== '首页' && item.pathName !== '购物车' && item.pathName !== '个人中心'"> <button
                            class="btn btn-default iconfont" type="button" @click="chooseLink(index)"
                            :data-index="index"></button> </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="delClose"
                     v-if="item.pathName !== '首页' && item.pathName !== '购物车' && item.pathName !== '个人中心'"
                     @click="delTabBar(index)">&times;
                </div>
              </div>
            </draggable>
            <div v-for="item,index in tabBar.list" class="tabBarList" :key="index" v-if="index === tabBar.list.length - 1">
              <label class="item-title">导航{{index + 1}}：</label>
              <div class="item">
                <div class="form-horizontal">
                  <div class="form-group">
                    <label class="control-label">
                      <i class="text-danger">*</i>
                      <span>名称：</span>
                    </label>
                    <div class="controls mt5">
                      <input :class="['form-control','input-normal',item.text?'':'empty']" type="text" v-model="item.text" style="width: 200px;" maxlength="5">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label">
                      <i class="text-danger">*</i>
                      <span>图片：</span>
                    </label>
                    <div class="controls mt5">
                      <div>
                        <a href="javascript:;" @click="editIcon(index)">修改</a>
                      </div>
                      <div class="icons">
                        <div class="wrapper">
                          <div class="icon" v-if="item.iconPath !== ''">
                            <img :src="require('../assets/'+item.iconPath)" alt="">
                          </div>
                          <div class="mt5">未选中</div>
                        </div>
                        <div class="wrapper">
                          <div class="icon" v-if="item.selectedIconPath !== ''">
                            <img :src="require('../assets/'+item.selectedIconPath)" alt="">
                          </div>
                          <div class="mt5">选中</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label">
                      <i class="text-danger">*</i>
                      <span>链接：</span>
                    </label>
                    <div class="controls">
                      <div class="input-group">
                        <input type="text" class="form-control" placeholder="请选择链接" :id="'link_'+index"
                               disabled="disabled" :value="item.pathName">
                        <span class="input-group-btn"
                              v-if="item.pathName !== '首页' && item.pathName !== '购物车' && item.pathName !== '个人中心'"> <button
                          class="btn btn-default iconfont" type="button" @click="chooseLink(index)"
                          :data-index="index"></button> </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="delClose" v-if="item.pathName !== '首页' && item.pathName !== '购物车' && item.pathName !== '个人中心'"
                   @click="delTabBar(index)">&times;
              </div>
            </div>
            <div class="addTabBar" @click="addTabBar">+ 添加导航</div>
          </div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="page-footer">
        <div class="op">
          <button class="btn btn-primary btn-lg" @click="saveTabBarData">保存</button>
        </div>
      </div>
    </div>
    <div class="iconWindow" id="iconWindow" ref="iconWindow" style="display: none;">
      <div class="content">
        <div class="item" v-for="icon,index in iconList" :key="index" @click="chooseIcon(index)">
          <div class="icon">
            <img :src="require('../assets/'+icon.iconPath)" alt="">
          </div>
          <div class="icon">
            <img :src="require('../assets/'+icon.selectedIconPath)" alt="">
          </div>
          <div class="title"><span>{{icon.title}}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import draggable from 'vuedraggable';

  export default {
    data() {
      return {
        editIconIndex: 0,
        iconList: [
          {
            title: '首页',
            iconPath: 'icon/Ico_Home_N.png',
            selectedIconPath: "icon/Ico_Home_S.png"
          },
          {
            title: '购物车',
            iconPath: 'icon/Ico_Cart_N.png',
            selectedIconPath: "icon/Ico_Cart_S.png"
          },
          {
            title: '我的',
            iconPath: 'icon/Ico_Account_N.png',
            selectedIconPath: "icon/Ico_Account_S.png"
          },
          {
            title: '店铺活动',
            iconPath: 'icon/Ico_Activity_N.png',
            selectedIconPath: "icon/Ico_Activity_S.png"
          },
          {
            title: '分类',
            iconPath: 'icon/Ico_Category_N.png',
            selectedIconPath: "icon/Ico_Category_S.png"
          },
          {
            title: '发现',
            iconPath: 'icon/Ico_Find_N.png',
            selectedIconPath: "icon/Ico_Find_S.png"
          },
          {
            title: '热卖专区',
            iconPath: 'icon/Ico_Hot_N.png',
            selectedIconPath: "icon/Ico_Hot_S.png"
          },
          {
            title: '推荐',
            iconPath: 'icon/Ico_Recommend_N.png',
            selectedIconPath: "icon/Ico_Recommend_S.png"
          },
          {
            title: '优选',
            iconPath: 'icon/Ico_Good_N.png',
            selectedIconPath: "icon/Ico_Good_S.png"
          },
          {
            title: '特惠',
            iconPath: 'icon/Ico_Sale_N.png',
            selectedIconPath: "icon/Ico_Sale_S.png"
          }
        ],
        tabBar: {
          "color": "#333",
          "selectedColor": "#F84848",
          "backgroundColor": "#fff",
          "borderStyle": "black",
          "list": [
            {
              "text": "首页",
              "pagePath": "pages/market/index",
              "iconPath": "icon/Ico_Home_N.png",
              "selectedIconPath": "icon/Ico_Home_S.png",
              "pathName": "首页"
            },
            {
              "text": "购物车",
              "pagePath": "pages/cart/index",
              "iconPath": "icon/Ico_Cart_N.png",
              "selectedIconPath": "icon/Ico_Cart_S.png",
              "pathName": "购物车"
            },
            {
              "text": "个人中心",
              "pagePath": "pages/user/index",
              "iconPath": "icon/Ico_Account_N.png",
              "selectedIconPath": "icon/Ico_Account_S.png",
              "pathName": "个人中心"
            }
          ]
        },
        oldData: '',
        changed: false
      };
    },
    components: {
      draggable,
    },
    created() {
      let _this = this;
      $.ajax({
        url: "wxa/getShopWxaTabBarInfo",
        type: 'post',
        success: function (res) {
          if (res !== null && res !== '') {
            _this.oldData = JSON.parse(res);
            _this.tabBar = JSON.parse(res);
          } else {
            _this.oldData ={
              "color": "#333",
              "selectedColor": "#F84848",
              "backgroundColor": "#fff",
              "borderStyle": "black",
              "list": [
                {
                  "text": "首页",
                  "pagePath": "pages/market/index",
                  "iconPath": "icon/Ico_Home_N.png",
                  "selectedIconPath": "icon/Ico_Home_S.png",
                  "pathName": "首页"
                },
                {
                  "text": "购物车",
                  "pagePath": "pages/cart/index",
                  "iconPath": "icon/Ico_Cart_N.png",
                  "selectedIconPath": "icon/Ico_Cart_S.png",
                  "pathName": "购物车"
                },
                {
                  "text": "个人中心",
                  "pagePath": "pages/user/index",
                  "iconPath": "icon/Ico_Account_N.png",
                  "selectedIconPath": "icon/Ico_Account_S.png",
                  "pathName": "个人中心"
                }
              ]
            };
          }
        }
      })
    },
    mounted() {
      $("#iconWindow").kendoWindow({
        visible: false,
        modal: true,
        resizable: false,
        close: function () {
        }
      }).data('kendoWindow').center();
    },
    methods: {
      chooseLink(index) {
        let _this = this;
        MKLinkSelWidget.create({
          currentTab: 'tab_normal',
          onConfirm: function (data) {
            _this.tabBar.list[index].pathName = data.name;
            _this.tabBar.list[index].type = JSON.parse(data.newLink).btype;
            if (_this.tabBar.list[index].type === "customPage") {
              _this.tabBar.list[index].pageId = JSON.parse(data.newLink).source.pageId;
            } else {
              _this.tabBar.list[index].pageId = null;
            }
          }
        })
      },
      destroy() {
      },
      editIcon(index) {
        this.editIconIndex = index;
        $("#iconWindow").data('kendoWindow').open();
      },
      chooseIcon(index) {
        $("#iconWindow").data('kendoWindow').close();
        this.tabBar.list[this.editIconIndex].iconPath = this.iconList[index].iconPath;
        this.tabBar.list[this.editIconIndex].selectedIconPath = this.iconList[index].selectedIconPath;
      },
      addTabBar() {
        let item = {
          "text": "",
          "pagePath": "pages/tabPage/one",
          "iconPath": "",
          "selectedIconPath": "",
          "pathName": "",
          "type": "",
          "pageId": ""
        };
        if (JSON.stringify(this.tabBar.list).includes("pages/tabPage/one")) {
          item.pagePath = "pages/tabPage/two";
        } else {
          item.pagePath = "pages/tabPage/one";
        }
        if (this.tabBar.list.length < 5) {
          this.tabBar.list.splice(-1, 0, item);
        } else {
          web.utils.showWarningMessage("最多添加5个导航");
        }
      },
      delTabBar(index) {
        this.tabBar.list.splice(index, 1);
      },
      saveTabBarData() {
        let _this = this;
        this.changed = false;
          let tabData = _this.tabBar.list;
          let oldData = _this.oldData.list;
          let length = tabData.length > oldData.length ?tabData.length:oldData.length;
          for(let o = 0; o < tabData.length; o++) {
            if(tabData[o].text === ''||tabData[o].iconPath === '' || tabData[o].pathName === ''){
              web.utils.showWarningMessage("请填写完整");
              return false;
            }
          }
            for(let i = 0; i < length; i++) {
              if(tabData[i].text !== oldData[i].text) {
                this.changed = true;
                break;
              }
              if(tabData[i].iconPath !== oldData[i].iconPath) {
                this.changed = true;
                break;
              }
            }
            if (this.changed) {
              web.utils.showConfirmBox("提醒", "你调整了导航栏样式，保存后需前往小程序-提交和发布中更新版本，待新版本审核通过后新的导航栏才会生效。", function () {
                $.post("wxa/saveTabBarInfo", {data: JSON.stringify(_this.tabBar)}, function () {
                  window.location.href = "wxa/wxaAudit?isAddTarBar=true";
                });
              }, true, '前往更新', '取消');
            } else {
              $.post("wxa/saveTabBarInfo", {data: JSON.stringify(_this.tabBar)}, function () {
                web.utils.alert("保存成功");
              });
            }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .panel-default {
    margin-bottom: 30px;
  }
  .icon-warring:before {
    content:'\e605'
  }
  .panel-title {
   font-weight: 400;
  }
  .addTabBar {
    margin-top: 20px;
    height: 44px;
    line-height: 44px;
    margin-left: 68px;
    border: 1px solid #e5e5e5;
    background-color: #fff;
    text-align: center;
    color: #38f;
    cursor: pointer;
  }

  .iconWindow {
    width: 692px;
    padding: 20px;
    .item {
      cursor: pointer;
      display: inline-block;
      padding: 10px 5px;
      margin: 0 7px;
      border-radius: 5px;
      .icon {
        display: inline-block;
        width: 35px;
        height: 30px;
        img {
          width: 100%;
        }
      }
      .title {
        margin-top: 3px;
        text-align: center;
        color: #333;
        font-size: 13px;
      }
      &:hover {
        background-color: #f9f9f9;
      }
    }
  }

  .p-formRegion {
    overflow: hidden;
    background-color: #fff;
    padding: 25px;
    margin-bottom: 50px;
    .empty {
      color:#f84848;
      border-color:#f84848;
    }
    .cn-wrap {
      width: 834px;
      margin: 0 auto;
      .cn-bg {
        float: left;
        position: relative;
        width: 354px;
        height: 683px;
        background: url(../assets/image/Mockup_Phone.png) no-repeat center;
        background-size: 100% 100%;
        z-index: 2;
        .cn-body {
          background-color: #ffffff;
          position: absolute;
          height: 508px;
          width: 320px;
          top: 107px;
          left: 17px;
          right: 17px;
          overflow: hidden;
          .p-nav-menu {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: #f8f8f8;
            text-align: center;
            .menu-box {
              background: #fff;
              left: 0;
              bottom: 0;
              width: 100%;
              height: 49px;
              z-index: 55;
              box-shadow: 0 0 2px rgba(0, 0, 0, .3);
              ul {
                height: inherit;
                display: flex;
                justify-content: center;
                align-items: center;
                .tabBar-item {
                  padding-top: 3px;
                  height: inherit;
                  flex: 1;
                  text-align: center;
                  .icon {
                    width: 25px;
                    height: 25px;
                    margin: auto;
                    img {
                      width: 100%;
                    }
                  }
                  .title {
                    color: #333;
                    font-size: 12px;
                  }

                }
              }
            }
          }
        }
      }
      .cn-iRegion {
        font-size: 12px;
        float: left;
        width: 415px;
        min-height: 200px;
        margin-left: 40px;
        padding: 0 20px 20px;
        color: #333;
        background-color: #fafafa;
        border: 1px solid #d3d7db;
        position: relative;
        &:after {
          content: '';
          position: absolute;
          right: 413px;
          top: 50px;
          height: 0;
          width: 0;
          border-right: 14px solid #fafafa;
          border-top: 14px solid transparent;
          border-bottom: 14px solid transparent;
        }
        &:before {
          content: '';
          position: absolute;
          right: 414px;
          top: 50px;
          height: 0;
          width: 0;
          border-right: 14px solid #d3d7db;
          border-top: 14px solid transparent;
          border-bottom: 14px solid transparent;
        }
        .tabBarList {
          margin-top: 20px;
          position: relative;
          &:hover .delClose {
            display: block;
          }
          .delClose {
            display: none;
            width: 20px;
            height: 20px;
            background-color: rgba(0, 0, 0, 0.3);
            color: #fff;
            font-size: 14px;
            position: absolute;
            top: -10px;
            right: -10px;
            border-radius: 50%;
            line-height: 20px;
            cursor: pointer;
            text-align: center;
          }
        }
        .item-title {
          display: inline-block;
          width: 46px;
          margin-right: 18px;
          text-align: right;
          vertical-align: top;
        }
        .item {
          display: inline-block;
          position: relative;
          background-color: #fff;
          border: 1px solid #e5e5e5;
          padding: 15px 8px 0;
          width: 304px;
          .icon {
            width: 50px;
            height: 50px;
            margin-top: 10px;
            img {
              width: 80%;
            }
          }
          .wrapper {
            position: relative;
            margin-right: 20px;
            display: inline-block;
            text-align: center;
            .icon {

            }
          }
        }
        .controls {
          margin-left: 80px;
        }
        .control-label {
          width: 60px;
        }
      }
    }
  }
</style>
