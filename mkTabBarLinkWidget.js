/**!
 * MKLinkSelWidget
 * @author  tanmiao
 * @version 1.0.0
 */

/*MKLinkSelWidget.create({
    currentTab:'tab_normal', //导航栏tab页 tab_normal(常用链接) tab_productGroup(商品分组) tab_product(商品) tab_minPage(微页面) tab_userDefined(自定义链接) tab_activity(活动链接) tab_pointProduct(积分商品链接)
    curType:'', // 默认为'' ,目前只有 'point' 一种类型
    onConfirm: function(data){
    }
});*/

;(function (factory) {
  'use strict';

  if (typeof define == 'function' && define.amd) {
    define(factory);
  }
  else if (typeof module != 'undefined' && typeof module.exports != 'undefined') {
    module.exports = factory();
  }
  else if (typeof Package != 'undefined') {
    MKLinkSelWidget = factory();  // export for Meteor.js
  }
  else {
    /* jshint sub:true */
    window['MKLinkSelWidget'] = factory();
  }
})(function () {

  'use strict';
  if (typeof window == 'undefined' || typeof window.document == 'undefined') {
    return function () {
      throw new Error('MKLinkSelWidget.js requires a window with a document');
    }
  }

  var $ = jQuery,
    win = window,
    document = win.document,
    _thisObject,
    $bodyEl = $('body'),
    $mkpWindowEl, //窗体
    $mkActivitiyDownListEl, //活动下拉列表
    $serchTxtEl, // 普通查询文本
    $serchActivityTxtEl, //活动查询文本
    $linkGridEl, //表格栏
    $zdyDivEl,  //自定义链接模块
    $tabClickEl, // tab点击
    $baseSearchEl, // 普通搜索按钮
    $queryTxtDivEl // 普通搜索模块


  /**
   * @class  MKLinkSelWidget
   * @param  {Object}       [options]
   */
  var MKLinkSelWidget = function (options) {

    // Default options
    var defaults = {
      currentTab: 'tab_normal',
      curType: '',
      onConfirm: function (data) {
      }
    };

    this.options = options = $.extend({}, defaults, options);

    this.currentTab = this.options.currentTab;
    this.curType = this.options.curType;
    this.sourceFrom = this.options.sourceFrom;
    this.isPoint = false;
    if(this.curType == 'point'){
      this.isPoint = true;
    }
    this.curActiveType = 'coupon';
    //加载init
    this.init();
  };

  MKLinkSelWidget.prototype = {
    constructor: MKLinkSelWidget,
    init: function () {
      this.renderHtml();
      this.initEvt();
      this.initGard();
      if (this.currentTab != 'tab_normal' && this.currentTab != 'tab_productGroup' && this.currentTab != 'tab_product' && this.currentTab != 'tab_minPage' && this.currentTab != 'tab_userDefined'&& this.currentTab != 'tab_activity' && this.currentTab != 'tab_pointProduct') {
        $serchTxtEl.val('');
        this.tabClick('tab_normal');
      } else {
        $serchTxtEl.val('');
        this.tabClick(this.currentTab);
      }
      this.selectedLink();

    },
    renderHtml: function () {
      var _this = this;
      var html = [];
      html.push('<div id="linkSelWind" style="display:none;">');
      html.push('<div class="ui-nav nav-small">');
      html.push('<ul id="MKLinkSelWidget_linkTab" class="nav nav-tabs">');
      html.push('<li id="tab_normal" class="MKLinkSelWidget_tabClick"><a href="#MKLinkSelWidget_linkDiv" data-toggle="tab" >常用链接</a></li>');
      // if (_this.curType != 'point') {
      //   html.push('<li id="tab_productGroup" class="MKLinkSelWidget_tabClick" ><a href="#MKLinkSelWidget_linkDiv" data-toggle="tab">商品分组链接</a></li>');
      //   html.push('<li id="tab_product" class="MKLinkSelWidget_tabClick" ><a href="#MKLinkSelWidget_linkDiv" data-toggle="tab">商品链接</a></li>');
      //   if(_this.sourceFrom != 'wxa'){
      //     html.push('<li id="tab_userDefined" class="MKLinkSelWidget_tabClick" ><a href="#MKLinkSelWidget_linkDiv" data-toggle="tab">自定义链接</a></li>');
      //   }
      //   if(_this.isShowActive){
      //     html.push('<li id="tab_activity" class="MKLinkSelWidget_tabClick"><a href="#MKLinkSelWidget_linkDiv" data-toggle="tab" >活动链接</a></li>');
      //   }
      // } else {
      //   html.push('<li id="tab_pointProduct" class="MKLinkSelWidget_tabClick"><a href="#MKLinkSelWidget_linkDiv" data-toggle="tab" >积分商品</a></li>');
      // }
      html.push('<li id="tab_minPage" class="MKLinkSelWidget_tabClick" ><a href="#MKLinkSelWidget_linkDiv" data-toggle="tab">微页面链接</a></li>');
      html.push('</ul></div>');
      html.push('<div id="MKLinkSelWidget_queryTxtDiv" class="MKLinkSelWidget_queryDivClass"><div class="form-inline tr mt10"><input class="form-control inputPlaceholder" style="width: 200px;" type="text" id="MKLinkSelWidget_valueName" placeholder="请输入商品名称" /><input class="btn btn-primary ml5 MKLinkSelWidget_baseSearch" type="button" value="查询"/></div></div>');
      html.push('<div class="form-inline tr mt10">');
      html.push('<div class="mr5" style="display:  inline-block"><input style="text-align: left" id="MKLinkSelWidget_activitiyDownList"></div>');
      html.push('<input class="form-control" style="width: 200px;" type="text" id="MKLinkSelWidget_activityLinkName" placeholder="请输入优惠券名称" />');
      html.push('<input class="btn btn-primary ml5 MKLinkSelWidget_activeSearch" type="button" value="查询"/>');
      html.push('</div></div>');
      html.push('<div id="MKLinkSelWidget_linkDiv" class="tab-pane fade in active" style="margin-top: 10px">');
      html.push('<div id="MKLinkSelWidget_linkGrid"></div>');
      html.push('</div>');
      html.push('</div>');
      $bodyEl.append(html.join(''));
    },
    initEvt: function () {
      $mkpWindowEl = $('#linkSelWind');
      $mkActivitiyDownListEl = $('#MKLinkSelWidget_activitiyDownList');
      $serchTxtEl = $('#MKLinkSelWidget_valueName');
      $baseSearchEl = $('.MKLinkSelWidget_baseSearch');
      $serchActivityTxtEl = $('#MKLinkSelWidget_activityLinkName');
      $linkGridEl = $('#MKLinkSelWidget_linkGrid');
      $tabClickEl = $(".MKLinkSelWidget_tabClick");
      $queryTxtDivEl = $("#MKLinkSelWidget_queryTxtDiv");

      var _this = this;
      if ($mkpWindowEl.length > 0) {
        $mkpWindowEl.kendoWindow({
          visible: false,
          modal: true,
          title: "选择链接",
          width: 900,
          close: _this.destroy
        }).data("kendoWindow").center();

        //kendoWindow open
        $mkpWindowEl.data('kendoWindow').open();
        $tabClickEl.click(function (e) {
          $serchTxtEl.val('');
          _this.tabClick(e.currentTarget.id);
        });
        $baseSearchEl.click(function () {
          _this.querySearch();
        });


        var radio = '';
        if ($("#MKLinkSelWidget_userDefinedUrl").val() === '') {
          $("#MKLinkSelWidget_userDefinedUrl").attr('value', $('input:radio[name="MKLinkSelWidget_http"]:checked').eq(0).val());
          radio = $('input:radio[name="MKLinkSelWidget_http"]:checked').eq(0).val();
        }
        $('input:radio[name="MKLinkSelWidget_http"]').click(function () {
          $("#MKLinkSelWidget_userDefinedUrl").val($(this).val());
          radio = $(this).val();
        });
        $("#MKLinkSelWidget_userDefinedUrl").on("blur", function () {
          if ($("#MKLinkSelWidget_userDefinedUrl").val().indexOf("http://") == -1 && $("#MKLinkSelWidget_userDefinedUrl").val().indexOf("https://") == -1) {
            $("#MKLinkSelWidget_userDefinedUrl").val(radio + $("#MKLinkSelWidget_userDefinedUrl").val());
          }
        });
      } else {
      }
    },
    tabClick: function (type) {
      var that = this;
      var dataSource = [];

      // 处理tab选择
      $('#' + type).addClass('active');
      $('#' + type).siblings().removeClass('active');
      if (type == 'tab_normal') { // 常用链接
        $linkGridEl.show();
        $queryTxtDivEl.hide();
        dataSource =[{"name":"商品分类页","newLink":"{\"btype\":\"categoryPage\",\"source\":{}}"}];
      } else if (type == 'tab_minPage') { // 微页面链接
        $linkGridEl.show();
        $queryTxtDivEl.show();
        $("#queryTxtLinkDiv").show();
        $(".inputPlaceholder").attr('placeholder', '请输入微页面链接名称');
        $.ajax({
          url: "linkSelect/getWxaCustomPages",
          async: false,
          type: "POST",
          data: {
            title: $serchTxtEl.val()
          },
          dataType: "json",
          success: function (data) {
            dataSource = data;
            for (var i = 0; i < data.length; i++) {
              dataSource[i] = {newLink: data[i].newLink, name: data[i].title};
            }
          }
        });
      }
      that.currentTab = type;
      var ds = new kendo.data.DataSource({
        data: dataSource,
        pageSize: 10
      })
      if (type == 'tab_pointProduct') {
        that.initGard(ds, 'point');
      } else {
        that.initGard(ds);
      }
    },
    querySearch: function () {
      var that = this;
      that.tabClick(that.currentTab);
    },
    selectActivityList: function (type) {
      var that = this;
      that.curActiveType = type;
      var array = new Array();
      var name = $.trim($serchActivityTxtEl.val());
      if (type == 'groupon') { //拼团购
        $.ajax({
          url: "groupPurchase/list",
          async: false,
          type: "POST",
          data: {
            status: "effective",
            name: name
          },
          dataType: "json",
          success: function (result) {
            if (result != null) {
              var data = result;
              if (data != null) {
                for (var i = 0; i < data.length; i++) {
                  var obj = data[i];
                  array[i] = {
                    newLink: obj.newLink,
                    name: obj.name,
                    date: obj.startTime + "至" + obj.endTime
                  };
                }
              }
            }
          }
        });
      } else if (type == 'shopping_spree') { //N元任选
        $.ajax({
          url: "activity/shoppingspree/list",
          async: false,
          type: "POST",
          data: {
            effectTimeFilter: "effective",
            name: name
          },
          dataType: "json",
          success: function (result) {
            if (result != null) {
              var data = result.list;
              var pattern = "yyyy-MM-dd hh:mm:ss";
              if (data != null) {
                for (var i = 0; i < data.length; i++) {
                  array[i] = {
                    newLink: data[i].newLink,
                    name: data[i].name,
                    date: new Date(data[i].startTime).format(pattern) + '至' + new Date(data[i].endTime).format(pattern)
                  };
                }
              }
            }
          }
        });
      } else if (type == 'fulfil') { //满减赠
        $.ajax({
          url: "activity/fulfil/list",
          async: false,
          type: "POST",
          data: {
            effectTimeFilter: "effective",
            name: name
          },
          dataType: "json",
          success: function (result) {
            if (result != null) {
              var data = result.list;
              if (data != null) {
                for (var i = 0; i < data.length; i++) {
                  var pattern = "yyyy-MM-dd hh:mm:ss";
                  array[i] = {
                    newLink: data[i].newLink,
                    name: data[i].name,
                    date: new Date(data[i].startTime).format(pattern) + '至' + new Date(data[i].endTime).format(pattern)
                  };
                }
              }
            }
          }
        });
      } else if (type == 'memberCard') {  //会员卡
        $.ajax({
          url: "memberCard/getMemberCardByLink",
          async: false,
          type: "POST",
          data: {
            name: name
          },
          dataType: "json",
          success: function (result) {
            if (result != null) {
              var data = result;
              if (data != null) {
                for (var i = 0; i < data.length; i++) {
                  array[i] = {
                    newLink: data[i].newLink,
                    name: data[i].title,
                    date: data[i].cardType + "（已启用）"
                  };
                }
              }
            }
          }
        });
      } else if (type == 'wheel') {  //幸运大抽奖
        $.ajax({
          url: "activity/wheel/getListByLinkTag",
          async: false,
          type: "POST",
          data: {
            title: name
          },
          dataType: "json",
          success: function (result) {
            if (result != null) {
              var data = result;
              var pattern = "yyyy-MM-dd hh:mm:ss";
              if (data != null) {
                for (var i = 0; i < data.length; i++) {
                  array[i] = {
                    newLink: data[i].newLink,
                    name: data[i].title,
                    date: new Date(data[i].startTime).format(pattern) + '至' + new Date(data[i].endTime).format(pattern)
                  };
                }
              }
            }
          }
        });
      } else if (type == 'signActi') {  //签到区
        $.ajax({
          url: "signActivies/querySignActiInfo",
          async: false,
          type: "POST",
          data: {
            signActiName: name,
            status: 'notend'
          },
          dataType: "json",
          success: function (result) {
            if (result != null) {
              var data = result.list;
              var pattern = "yyyy-MM-dd hh:mm:ss";
              if (data != null) {
                for (var i = 0; i < data.length; i++) {
                  array[i] = {
                    newLink: data[i].newLink,
                    name: data[i].signActiName,
                    date: new Date(data[i].cycleStartDate).format(pattern) + '至' + new Date(data[i].cycleEndDate).format(pattern)
                  };
                }
              }
            }
          }
        });
      }
      else if (type == 'incrementCoupon') {  //升值劵
        $.ajax({
          url: "coupon/increment/list",
          async: false,
          type: "POST",
          data: {
            couponIdOrName: name,
            effectTimeFilter: 'effective'
          },
          dataType: "json",
          success: function (result) {
            if (result != null) {
              var data = result.list;
              var pattern = "yyyy-MM-dd hh:mm:ss";
              if (data != null) {
                for (var i = 0; i < data.length; i++) {
                  var obj = data[i];
                  var time = '';
                  if (obj.effectType == 'time_range') {
                    time = new Date(data[i].effectStarttime).format(pattern) + '至' + new Date(data[i].effectEndtime).format(pattern);
                  } else {
                    time = obj.effectPeriod + "天";
                  }
                  array[i] = {newLink: data[i].newLink, name: data[i].name, date: time};
                }
              }
            }
          }
        });
      } else if (type == 'happyGroup') { //欢乐团
        $.ajax({
          url: "happyGroup/list",
          async: false,
          type: "POST",
          data: {
            status: "effective",
            name: name
          },
          dataType: "json",
          success: function (result) {
            if (result != null) {
              var data = result;
              if (data != null) {
                for (var i = 0; i < data.length; i++) {
                  var obj = data[i];
                  array[i] = {
                    newLink: obj.newLink,
                    name: obj.name,
                    date: obj.startTime + "至" + obj.endTime
                  };
                }
              }
            }
          }
        });
      } else if (type == 'note') { //店长笔记
        $.ajax({
          url: "note/queryNotes",
          async: false,
          type: "POST",
          data: {
            title: name
          },
          dataType: "json",
          success: function (result) {
            if (result != null) {
              var data = result.list;
              if (data != null) {
                for (var i = 0; i < data.length; i++) {
                  var obj = data[i];
                  array[i] = {newLink: obj.newLink, name: obj.title, date: ""};
                }
              }
            }
          }
        });
      } else if (type == 'bargain') {//砍价
        var pattern = "yyyy-MM-dd hh:mm:ss";
        $.ajax({
          url: "linkSelect/getBargainActivities",
          async: false,
          type: "POST",
          data: {
            title: name
          },
          dataType: "json",
          success: function (result) {
            if (result != null) {
              for (var i = 0; i < result.length; i++) {
                var obj = result[i];
                array[i] = {newLink: obj.newLink, name: obj.name, date: new Date(obj.effectStartTime).format(pattern) + '至' + new Date(obj.effectEndTime).format(pattern)};
              }
            }
          }
        });
      } else if (type == 'assist') { // 助力宝
        $.ajax({
          url: "activity/assist/listByLink",
          async: false,
          type: "POST",
          data: {
            title: name,
            status: 'effective'
          },
          dataType: "json",
          success: function (result) {
            if (result != null) {
              var data = result;
              if (data != null) {
                for (var i = 0; i < data.length; i++) {
                  var obj = data[i];
                  array[i] = {
                    newLink: obj.newLink,
                    name: obj.title,
                    date: obj.startTime + "-" + obj.endTime
                  };
                }
              }
            }
          }
        });
      } else if (type == 'discount') { // 限时折扣
        $.ajax({
          url: "activity/discount/effectiveList",
          async: false,
          type: "POST",
          data: {
            activityName: name
          },
          dataType: "json",
          success: function (result) {
            if (result != null) {
              for (var i = 0; i < result.length; i++) {
                var obj = result[i];
                array[i] = {newLink: obj.newLink, name: obj.name, date: new Date(obj.startTime).format(pattern) + '至' + new Date(obj.endTime).format(pattern)};
              }
            }
          }
        });
      }else {
        $.ajax({
          url: "coupon/list",
          async: false,
          type: "POST",
          data: {
            effectTimeFilter: "effective",
            couponIdOrName: name
          },
          dataType: "json",
          success: function (result) {
            if (result != null) {
              var data = result.list;
              var pattern = "yyyy-MM-dd hh:mm:ss";
              if (data != null) {
                for (var i = 0; i < data.length; i++) {
                  var obj = data[i];
                  var time = '';
                  if (obj.effectType == 'time_range') {
                    time = new Date(obj.effectStarttime)
                        .format(pattern)
                      + '至'
                      + new Date(obj.effectEndtime)
                        .format(pattern);
                  } else {
                    time = obj.effectPeriod + "天";
                  }
                  array[i] = {
                    newLink: data[i].newLink,
                    name: data[i].name,
                    date: time
                  }
                }
              }
            }
          }
        });
      }

      var dataSource = new kendo.data.DataSource({
        data: array,
        pageSize: 10
      });
      that.initGard(dataSource,'active');

    },
    initGard: function (ds, type) {
      var columns = [];
      if (type == 'point') {
        columns = [
          {field: "newLink", title: "newLink", hidden: true, width: "100px"},
          {field: "identName", title: "名称", width: "100px"},
          {field: "startTime", title: "开始时间", width: "100px"},
          {field: "endTime", title: "结束时间", width: "100px"},
          {field: "activityStatus", title: "状态", width: "50px"},
          {
            field: " ",
            title: "操作",
            width: "50px",
            attributes: {
              "class": "MKLinkSelWidget_table-cell",
              style: "text-align: center; width:100px"
            },
            headerAttributes: {
              "class": "MKLinkSelWidget_table-cell",
              style: "text-align: center; width:100px"
            },
            template:
              "<div><input class='btn btn-sm btn-default MKLinkSelWidget_selectedButton' value='选择' type='button' data-name='#:identName#' data-newLink='#:newLink#'></input></div>"
          }];
      } else if(type == 'active'){
        columns = [{field: "newLink", title: "newLink", hidden: true, width: "100px"},
          {field: "name", title: "名称", width: "100px"},
          {field: "date", title: "日期", width: "100px"},
          {
            field: " ",
            title: "操作",
            width: "50px",
            attributes: {
              "class": "MKLinkSelWidget_table-cell",
              style: "text-align: center; width:100px"
            },
            headerAttributes: {
              "class": "MKLinkSelWidget_table-cell",
              style: "text-align: center; width:100px"
            },
            template:
              "<div><input class='btn btn-sm btn-default MKLinkSelWidget_selectedButton' value='选择' type='button' data-name='#:name#' data-newLink='#:newLink#'></input></div>"
          }]
      }else {
        columns = [
          {field: "newLink", title: "newLink", hidden: true, width: "100px"},
          {field: "name", title: "名称", width: "100px"},
          {
            field: " ",
            title: "操作",
            width: "50px",
            attributes: {
              "class": "MKLinkSelWidget_table-cell",
              style: "text-align: center; width:100px"
            },
            headerAttributes: {
              "class": "MKLinkSelWidget_table-cell",
              style: "text-align: center; width:100px"
            },
            template:
              "<div><input class='btn btn-sm btn-default MKLinkSelWidget_selectedButton' value='选择' type='button' data-name='#:name#' data-newLink='#:newLink#'></input></div>"
          }];
      }
      $linkGridEl.empty();
      $linkGridEl.kendoGrid({
        dataSource: ds,
        height: 500,
        pageable: true, scrollable: true, selectable: true, sortable: false,
        pageSize: 10,
        columns: columns
      }).data("kendoGrid");
    },
    selectedLink: function () {
      var _this = this;
      $mkpWindowEl.on('click', 'input.MKLinkSelWidget_selectedButton', function () {
        var $thisEl = $(this);
        if ($thisEl.hasClass('btn-primary')) {
          $thisEl.addClass('btn-default');
          $thisEl.removeClass('btn-primary');
          $thisEl.val('选择');
        } else {
          $thisEl.addClass('btn-primary');
          $thisEl.removeClass('btn-default');
          var data = {
            name: $thisEl.attr('data-name'),
            newLink: $thisEl.attr('data-newLink'),
            type: _this.currentTab
          };
          $mkpWindowEl.data('kendoWindow').close();
          //调用用户回调函数
          _this.options.onConfirm(data);
        }

      });
    },
    destroy: function () {
      if ($mkpWindowEl != null && $mkpWindowEl.length > 0) {
        $mkpWindowEl.remove();
      }
      if ($mkActivitiyDownListEl != null && $mkActivitiyDownListEl.length > 0) {
        $mkActivitiyDownListEl.remove();
      }
      if ($linkGridEl != null && $linkGridEl.length > 0) {
        $linkGridEl.remove();
      }
      $mkpWindowEl.off('click', 'input.MKLinkSelWidget_selectedButton');
    }
  }

  /**
   * Create MKLinkSelWidget instance
   * @param {Object}      [options]
   */
  MKLinkSelWidget.create = function (options) {
    _thisObject = new MKLinkSelWidget(options);
    return _thisObject;
  };

  // Export
  MKLinkSelWidget.version = '1.0.0';
  return MKLinkSelWidget;
});
