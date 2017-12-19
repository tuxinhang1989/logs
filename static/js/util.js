"use strict";

/* 通用工具包
 *
 *
 *
*/
$(function(){
    var DEF_MAX_TRY_TIMES = 20;

    var iAlert = function(msg){
        layer.alert(msg)
    };

    function errorHandler(xhr){
        if (xhr.status === 404){
            iAlert("资源未找到! 请联系管理员");
        } else if (xhr.status === 401){
            iAlert("没有权限! 请联系管理员");
        } else if (xhr.status === 500){
            iAlert("系统错误! 请联系管理员");
        }
    }

    $('.rollback').unbind("click").click(function(){
        $(this).unbind("click");
        var title = $(this).data("title");
        var url = $(this).data("url");
        var width = $(this).data("width") || "600px";
        var height = $(this).data("height") || "auto";

        $.ajax({
            url: url,
            success: function (page) {
                $(".rollback_alert").html(page);
                layer.open({
                  title: title,
                  move: ".title",
                  type: 1,
                  area: [width, height],
                  shadeClose: true, //点击遮罩关闭
                  resize:false,
                  content: $('.rollback_alert'),
                  success: function(){
                    $('.chose_sel').chosen({
                        no_results_text: '没有找到',    // 当检索时没有找到匹配项时显示的提示文本
                        // disable_search_threshold:10, //10 个以下的选择项则不显示检索框
                        disable_search:false,  //禁用检索
                        lang:'zh-cn',
                        search_contains: true,         // 从任意位置开始检索
                        allow_single_deselect:true
                    });
                  }
                });
            },
            error: errorHandler
        })
	});

    var objURL = function(url){
        this.priUrl = url;
        this.init = function(){
            var index = this.priUrl.indexOf("#");
            var url;
            if (index >= 0){
                url = this.priUrl.substr(0, index);
            }else {
                url = this.priUrl;
            }
            index = url.indexOf("?");
            if (index >= 0){
                this.baseUrl = url.substr(0, index);
                var queryStr = url.substr(index+1);
                var params = {};
                $.each(queryStr.split("&"), function(i, str){
                    var kv = str.split("=");
                    if(kv[0]){
                        params[kv[0]] = kv[1];
                    }
                });
                this.params = params;
            }else {
                this.baseUrl = url;
                this.params = {};
            }
        };

        this.getQuery = function(){
            var params = this.params;
            var query = [];
            $.each(params, function(k, v){
                query.push(k + "=" + v);
            });
            return query.join("&");
        };
        this.get = function(k){
            return this.params[k];
        };
        this.set = function(k, v){
            this.params[k] = v;
        };
        this.remove = function(k){
            this.params[k] = undefined;
        };
        this.getHref = function(){
            var queryStr = this.getQuery();
            return this.baseUrl + "?" + queryStr;
        };
        this.init();
    };

    $("#id-jmp-btn").click(function(){
        var page = $("#id-page-jmp").val();
        var url = location.href;
        var urlObj = new objURL(url);
        urlObj.set("page", page);
        location.href = urlObj.getHref();
    });

    function ajaxWithRemotePage(url, title, width, height){
        height = height || "auto";
        $.ajax({
            url: url,
            success: function(page){
                $("#iconfirm-modal").html(page);
                layer.open({
                  title:title,
                  move:".title",
                  type: 1,
                  area: [width, height],
                  shadeClose: true, //点击遮罩关闭
                  resize:false,
                  content: $("#iconfirm-modal")
                });
            },
            error: errorHandler
        });
    }

    var reload = function(){
        location.reload();
    };

    function postForm(form, onSuccess){
        $.ajax({type: "POST",
            url: form.attr("action"),
            data: new FormData(form[0]),
            dataType: "json",
            processData: false,  // 告诉jQuery不要去处理发送的数据
            contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
            beforeSend: function(){
                layer.load();
                $(".query_btn").attr("disabled", "disabled");
            },
            success: function(data){
                if (data.success){
                    var successMethod = onSuccess || function(){
                        iAlert(data.message || "操作成功!");

                        setTimeout(function(){if (data.redirect_url){location.href=data.redirect_url}else {location.reload()}}, 1000);
                    };
                    successMethod(data);
                } else {
                    $(".query_btn").removeAttr("disabled");
                    if (data.html){
                        $("#iconfirm-modal").html(data.html);
                    }else{
                        console.log(data.message);
                        iAlert("操作失败! " + data.message);
                    }
                }
            },
            error: errorHandler,
            complete: function(){
                layer.closeAll("loading");
            }
        });
    }

    $(".ajax-page").click(function () {
        var url = $(this).attr("data-url");
        $.ajax({
            url: url,
            success: function (html) {
                $("#iconfirm-modal").html(html)
            }
        })
    });

    function tryRequestTaskInfo(options, maxTryTimes){
        if (options.currentTimes >= (maxTryTimes || DEF_MAX_TRY_TIMES)){
            iAlert("超时请重试");
            setTimeout(reload, 1000);
        }
        $.ajax({
            url: options.url,
            success: function(data){
                if (data.success && data.is_success){
                    iAlert("操作成功");
                    if (options.needComment) {
                        $("#ialert-modal").modal('hide');
                        $("#modal-waitting-bar").modal('hide');
                        $("#modal-modify-coverage-comment").modal();
                    } else {
                        setTimeout(reload, 1000);
                    }
                } else if (data.success && data.is_finish){
                    iAlert("任务失败, 请重试");
                    setTimeout(reload, 1000);
                } else if (data.success){
                    options.currentTimes += 1;
                    setTimeout(
                        function(){
                            return tryRequestTaskInfo(options, maxTryTimes);
                        }, 1000);
                    return true;
                } else {
                    iAlert("操作失败! "+ data.message);
                    setTimeout(reload, 1000);
                }
            },
            error: errorHandler
        });
    }

    function waitingTaskDone(options){
        var url = "/order/task/finish?task_info=" +
            options.task_info + "&order_no=" + options.order_no;
        tryRequestTaskInfo(
            {url: url, currentTimes: 0, needComment: options.needComment},
            120);
    }

    function waitingModifyProposal(notificationId){
        $("#modal-waitting-bar").modal({ backdrop: "static"});
        var url = "/modify/proposal/finish?notification_id=" + notificationId;
        tryRequestTaskInfo({url: url, currentTimes: 0}, 120);
    }

    var showRemotePageHandler = function(){
        /* 展示远程页面
         * 要求标签内存在 data-url, data-title(模态框标题)
         * 可选:
         *       data-footer 默认false
         */
        var url = $(this).attr("data-url");
        if (!url){
            return;
        }
        var title = $(this).attr("data-title") || "  ";
        var width = $(this).data("width") || "600px";
        var height = $(this).data("height") || "auto";
        ajaxWithRemotePage(url, title, width, height);
    };

    var bindShowRemotePage = function(){
        $(".show-remote-page").unbind("click").click(showRemotePageHandler);
    };

    bindShowRemotePage();

    var latest_url;

    $(".show-deploy-detail").unbind("click").click(function () {
        var url = $(this).attr("data-url");
        if (!url){
            return;
        }
        latest_url = url;
        var title = $(this).attr("data-title") || " ";
        var width = $(this).attr("data-width");
        var height = $(this).data("height") || "auto";
        ajaxWithRemotePage(url, title, width, height);
        setTimeout(function(){get_deploy_detail_loop(url, 0)}, 8000)
    });

    var get_deploy_detail_loop = function (url, times) {
        if (!$("#iconfirm-modal").hasClass("in")){
            return
        }
        if (latest_url !== url){
            return
        }
        if (times > 200){
            return
        }
        $.ajax({
            url: url,
            success: function (html) {
                    $("#iconfirm-modal .modal-body").html(html)
                },
            error: errorHandler
        });
        setTimeout(function(){get_deploy_detail_loop(url, times+1)}, 8000)
    };

    var bindPostForm = function() {
        $(".post-form").unbind("click").on("click", function(){
            /* 页面直接提交表单
            * 要求标签内存在 要提交form的id data-form
            *
            */
            var form = $($(this).attr("data-form"));
            if (!form){
                iAlert("error");
                return;
            }
            postForm(form);
        });
    };
    bindPostForm();

    $(".confirm-del").unbind("click").on("click", function(){
        $("#form-confirm-del").attr("action", $(this).data("url"));
        var title = $(this).data("title");
        $("#id-confirm-del-title").text(title);
        layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['420px', 'auto'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('#iconfirm-del')
	    });
    });

    $(".task-redo").click(function(){
        var url = $(this).attr("data-url");
        $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            success: function(data){
                if (data.success){
                    iAlert("重做成功");
                    setTimeout(reload, 1000);
                } else {
                    iAlert("重做失败: " + data.message);
                }
            },
            error: errorHandler
        });
    });

    var util = {};

    util.errorHandler = errorHandler;
    util.postForm = postForm;
    util.waitingTaskDone = waitingTaskDone;
    util.waitingModifyProposal = waitingModifyProposal;
    util.ajaxWithRemotePage = ajaxWithRemotePage;
    util.bindPostForm = bindPostForm;
    util.bindShowRemotePage = bindShowRemotePage;
    util.iAlert = iAlert;

    /* eslint-disable */
    window._util = util;
    /* eslint-enable */
});

$("textarea").prop("wrap", "off");