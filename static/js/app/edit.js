/**
 * Created by shanguiren on 16/12/30.
 */

$("#app-edit-btn").click(function (e) {
    e.preventDefault();

    var form = $("#edit-form");
    var action = form.attr("action");
    var data = form.serialize();
    $.ajax({
        type: "POST",
        url: action,
        data: data,
        dataType: "json",
        success: function (data) {
            if (data.success) {
                iAlert("操作成功!");
                setTimeout("location.reload();", 1000);
            } else {
                iAlert("操作失败! " + data['message']);
            }
        },
        error: function (xhr, textStatus, error) {
            if (xhr.status == 404) {
                iAlert("不存在或被删除!");
            } else if (xhr.status == 401) {
                iAlert("没有权限!");
            } else if (xhr.status == 500) {
                iAlert("系统错误!");
            }
        }
    });
});