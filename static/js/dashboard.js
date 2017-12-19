/**
 * 存放 Dashboard 公共函数, 包括:
 *      提示框,
 *      确认框
 */

/* eslint-disable no-unused-vars */


/**
 * 提示框
 *
 * @param {string} msg: 提示的消息
 * @param {string} cls: 提示的类
 * @returns {undefined}
 */

/**
 * 加载框
 * @param {string} text:        加载框加载文字
 * @returns {undefined}
 */
var showPreloader = function(text) {
    $("#ipreloader-modal .modal-body .preload-text").html(text);
    $("#ipreloader-modal").modal({
        backdrop: 'static'
    });
};

var hidePreloader = function() {
    $("#ipreloader-modal").modal("hide");
};

/**
  确认框

  @param {Object} options:

        msg         提示信息
        title       提示标题
        modal_size  模态框尺寸
        html        Body HTML 如果提供此参数则忽略 msg
        show_footer 显示底部按钮, 默认: true
        cancel_txt  取消按钮文本, 默认: 取消
        confirm_txt 确认俺就文本, 默认: 确定
        cancel_cb   取消回调函数
        confirm_cb  确认回调函数
        shown_cb    悬浮框加载完成回调函数
        closable    确认框是否可关闭
    @returns {undefined}
 */
var iConfirm = function(options){
    var modalSize;
    if (options.modal_size !== undefined ) {
        modalSize = options.modal_size;
    } else if (options.html) {
        modalSize = "modal-lg";
    } else {
        modalSize = "modal-sm";
    }
    if (options.html) {
        $("#iconfirm-modal .modal-body").html(options.html);
        $("#iconfirm-modal .modal-dialog").removeClass("modal-lg"
            ).removeClass("modal-sm");
        $("#iconfirm-modal .modal-dialog").addClass(modalSize);
    } else {
        $("#iconfirm-modal .modal-dialog").removeClass("modal-lg"
            ).removeClass('modal-sm');
        $("#iconfirm-modal .modal-dialog").addClass(modalSize);
        $("#iconfirm-modal .modal-body").html('<p>' + options.msg + '</p>');
    }

    $("#iconfirm-modal .modal-title").html(options.title || "提示");
    var cbCalled = false;

    $("#iconfirm-modal").on("hidden.bs.modal", function(e){
        $(this).unbind();

        $("#iconfirm-modal .modal-footer #iconfirm-confirm").unbind("click");
        $("#iconfirm-modal").off("hidden.bs.modal");

        if (options.cancel_cb && !cbCalled){
            cbCalled = true;
            options.cancel_cb();
        }
    });

    if (options.show_footer !== undefined && options.show_footer === false){
        $("#iconfirm-modal .modal-footer").hide();
        if (options.max_height !== undefined || options.max_height === true){
            $("#iconfirm-modal .modal-dialog .modal-body").addClass(
                "iconfirm-modal-max-height");
        }
    } else {
        $("#iconfirm-modal .modal-dialog .modal-body").removeClass(
            "iconfirm-modal-max-height");
        $("#iconfirm-modal .modal-footer").show();
        $("#iconfirm-modal .modal-footer #iconfirm-cancel").html(
            options.cancel_txt || "取消");
        $("#iconfirm-modal .modal-footer #iconfirm-confirm").html(
            options.confirm_txt || "确定");
        $("#iconfirm-modal .modal-footer #iconfirm-confirm").off("click");

        $("#iconfirm-modal .modal-footer #iconfirm-confirm").click(function(){
            $(this).unbind();
            if (options.confirm_cb){
                // 如果在隐藏之后调用确认回调则注册隐藏事件, 否则则直接调用确认回调.
                // 防止确认回调中同样包含弹出 iConfirm 造成无法正常弹出的情况
                if (options.callConfirmAfterHidden){
                    $("#iconfirm-modal").off("hidden.bs.modal");
                    $("#iconfirm-modal").on("hidden.bs.modal", function(e){
                        $(this).unbind();
                        options.confirm_cb();
                        cbCalled = true;
                    });
                } else {
                    options.confirm_cb();
                    cbCalled = true;
                }
            }
        });

        $("#iconfirm-modal").on("shown.bs.modal", function(e){
            // 悬浮框加载完成
            if (options.shown_cb){
                options.shown_cb();
            }
            $("#iconfirm-modal").off("shown.bs.modal");
        });
    }

    if (options.closable === undefined){
        options.closable = true;
    }

    if (!options.closable){
        $("#iconfirm-modal .close").hide();
    } else {
        $("#iconfirm-modal .close").show();
    }

    $("#iconfirm-modal").modal({
        backdrop: options.closable ? true : "static",
        keyboard: options.closable ? true : false,
        show: true
    });
};


/*
 * 通用 Ajax 响应处理, 响应格式需满足接口返回规范:
 *  {
 *      "success": true,
 *      "message": "",      // 错误消息
 *      "data": {},         // 返回数据
 *  }
 *
 * successCallback 接收接口返回的 data 值
 */
var ajaxResponseHandler = function(xhr, statusText, data, successCallback){
    var codeMsgMap = {
        404: "资源未找到! 请联系管理员.",
        401: "没有权限! 请联系管理员.",
        500: "系统内部错误! 请联系管理员."
    };

    if (xhr.status === 200){
        if (data.success && successCallback !== undefined
             && typeof(successCallback) === "function"){
            successCallback(data.data);
        } else if (!data.success){
            // 参数不对
            if (data.code === -1 && data.argument_name){
                var text = $("[name=" + data.argument_name + "]"
                                    ).parent().prev().text();
                iAlert(text + data.message);
            } else {
                iAlert(data.message || "请求失败!");
            }
        }
    } else {
        iAlert(codeMsgMap[xhr.status] || "未知错误! 请联系管理员.");
    }
};


/* eslint-disable no-bitwise, camelcase */
var red = "#bf616a",
    blue = "#5B90BF",
    orange = "#d08770",
    yellow = "#ebcb8b",
    green = "#a3be8c",
    teal = "#96b5b4",
    pale_blue = "#8fa1b3",
    purple = "#b48ead",
    brown = "#ab7967";


function Colour(col, amt) {

    var usePound = false;

    if (col[0] === "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;

    if (r > 255) {
        r = 255;
    } else if (r < 0) {
        r = 0;
    }

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) {
        b = 255;
    } else if (b < 0) {
        b = 0;
    }

    var g = (num & 0x0000FF) + amt;

    if (g > 255) {
        g = 255;
    } else if (g < 0) {
        g = 0;
    }

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);

}
/* eslint-enable */
