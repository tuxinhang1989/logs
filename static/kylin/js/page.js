$(function() {
	var $page =$(".page");

	// 添加服务器弹窗
 	$('.add').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['700px', 'auto'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.add_alert')
	    });
	})


	// 查看弹窗
	$('.look').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['700px', 'auto'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.look_alert')
	    });
	})

	// 更新单个弹窗
	$('.update_single').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['420px', 'auto'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.update_single_alert')
	    });
	})


	// 删除单个弹窗
	$('.del').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['420px', 'auto'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.del_alert')
	    });
	})

	//导入IP弹窗
	$('.import_btn').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['700px', 'auto'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.import_alert')
	    });
	})

	//检测IP弹窗
	$('.test_btn').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['700px', 'auto'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.test_alert')
	    });
	})


	//ip详情弹窗
	$('.details_btn').click(function(){
	    layer.open({
	      title:"使用情况",
	      type: 1,
	      area: ['700px', 'auto'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.details_alert')
	    });
	})


	// 添加数据库弹窗
	$('.add_data_btn').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['700px', 'auto'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.add_database_alert'),
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
	})
	$('.write').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['700px', 'auto'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.write_alert')
	 	});
	})
	// 编辑网络设备弹窗（jinmeng）
	$('.write_chosel').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['700px', 'auto'],
	      maxHeight:"700px",
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.write_chosel_alert'),
	      success: function(){
	      	$('.write_chosel_alert .chose_sel').chosen({
		        no_results_text: '没有找到',    // 当检索时没有找到匹配项时显示的提示文本
		        // disable_search_threshold:10, //10 个以下的选择项则不显示检索框
		        disable_search:false,  //禁用检索
		        lang:'zh-cn',
		        search_contains: true,         // 从任意位置开始检索
		        allow_single_deselect:true
		    });
		  }
	    });
	})
	$('.edit_chosel').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['700px', '85%'],
	      maxHeight:"700px",
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.edit_chosel_alert'),
	      success: function(){
	      	$('.edit_chosel_alert .chose_sel').chosen({
		        no_results_text: '没有找到',    // 当检索时没有找到匹配项时显示的提示文本
		        // disable_search_threshold:10, //10 个以下的选择项则不显示检索框
		        disable_search:false,  //禁用检索
		        lang:'zh-cn',
		        search_contains: true,         // 从任意位置开始检索
		        allow_single_deselect:true
		    });
		  }
	    });
	})
	// 删除所有弹窗（jinmeng）
	$('.del_all').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['460px', 'auto'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.del_all_alert')
	    });
	})

	// 主页
	$('.return').click(function(e) {
        $(this).parent('.tab_action').siblings('.dataView').toggle();
		return false;
    });
	oneclcik('.dataView');
	 
	// 回滚弹窗
	$('.rollback').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['700px', 'auto'],
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
	})

	// 发布详情弹窗
	$('.fb_details').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: [($(window).outerWidth()-400)+'px', 'auto'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.publish_detail_alert')
	    });
	})
	
	// 添加配置弹窗
	$('.add_chosel').click(function(e) {
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['700px', 'auto'],
	      maxHeight:"700px",
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.add_chosel_alert'),
	      success: function(){
	      	$('.add_chosel_alert .chose_sel').chosen({
		        no_results_text: '没有找到',    // 当检索时没有找到匹配项时显示的提示文本
		        // disable_search_threshold:10, //10 个以下的选择项则不显示检索框
		        disable_search:false,  //禁用检索
		        lang:'zh-cn',
		        search_contains: true,         // 从任意位置开始检索
		        allow_single_deselect:true
		    });
		  }
	    });
    });


	// 预发布弹窗
	$('.pre_release').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['700px', 'auto'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.pre_release_alert'),
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
	})

    //发布弹窗
	$('.release').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['700px', 'auto'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.pre_release_alert'),
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
	})


	// 清理所有过期包弹窗

	$('.clean_all').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['420px', 'auto'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.clean_all_alert')
	    });
	})

	// 编辑包弹窗
 	$('.edit_package').click(function(){
	    layer.open({
	      title:"编辑",
	      type: 1,
	      area: ['700px', 'auto'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.edit_package_alert'),
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
	})

 	// 操作记录弹窗
	$('.action_record').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['700px', 'auto'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.action_record_alert')
	    });
	})

	//添加url弹窗 
	$('.add_url').click(function(){
	    layer.open({
	      title:"添加url",
	      type: 1,
	      area: ['700px', 'auto'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.add_url_alert'),
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
	})
	// 编辑url弹窗
	$('.edit_url').click(function(){
	    layer.open({
	      title:"编辑url",
	      type: 1,
	      area: ['700px', 'auto'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.edit_url_alert'),
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
	})

	//日志推送弹窗
	$('.push_log').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['700px', 'auto'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.push_log_alert'),
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
	})


	// 更新数据源
	$('.update_source1').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['700px', '85%'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.update_source_alert01'),
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
	})

	// 更新数据源
	$('.update_source2').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['700px', '85%'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.update_source_alert02'),
	      success: function(){
	      	$('.chose_sel02').chosen({
		        no_results_text: '没有找到',    // 当检索时没有找到匹配项时显示的提示文本
		        // disable_search_threshold:10, //10 个以下的选择项则不显示检索框
		        disable_search:false,  //禁用检索
		        lang:'zh-cn',
		        search_contains: true,         // 从任意位置开始检索
		        allow_single_deselect:true
		    });
		  }
	    });
	})


	// 执行详情查看
	$('.per_details').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['700px', '85%'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.per_details_alert'),
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
	})

	// 添加配置弹窗
	$('.add_pz').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['700px', '85%'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.add_pz_alert'),
	      success: function(){
	      	$('.chose_sel01').chosen({
		        no_results_text: '没有找到',    // 当检索时没有找到匹配项时显示的提示文本
		        // disable_search_threshold:10, //10 个以下的选择项则不显示检索框
		        disable_search:false,  //禁用检索
		        lang:'zh-cn',
		        search_contains: true,         // 从任意位置开始检索
		        allow_single_deselect:true
		    });
		  }
	    });
	})
	// 添加Tomcat数据源
	$('.add_source1').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['700px', '85%'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.add_source1_alert')
	    });
	})

	// 添加Dubbo数据源
	$('.add_source2').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['800px', '85%'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.add_source2_alert')
	    });
	})

	// 添加Dubbo数据源
	$('.edit_source1').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['700px', '85%'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.edit_source1_alert')
	    });
	})

	// 创建虚拟机
	$('.create_virtual').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['700px', '85%'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.create_virtual_alert')
	    });
	})

	// 归档历史
	$('.look_history').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['700px', '85%'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.look_history_alert')
	    });
	})
	// 创建虚拟机
	$('.look_virtual').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['700px', '85%'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.look_virtual_alert')
	    });
	})

	// 虚机信息
	$('.virtual_info').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['700px', '85%'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.virtual_info_alert')
	    });
	})

	// 创建虚拟机
	$('.update_all').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['700px', 'auto'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.update_all_alert')
	    });
	})
	 // 添加PG数据库服务安装配置弹窗 
	 $('.add_pg').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['800px', '85%'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.add_pg_alert')
	    });
	})

	 // 添加Oracle数据库服务安装配置弹窗 
	 $('.add_ora').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['800px', '85%'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.add_ora_alert')
	    });
	})

	 // 添加角色
	$('.add_role').click(function(){
	    layer.open({
	      title:false,
	      move:".title",
	      type: 1,
	      area: ['700px', '85%'],
	      shadeClose: true, //点击遮罩关闭
	      resize:false,
	      content: $('.add_role_alert')
	    });
	})
	// databasetab切换

	var $page = $(".page");
	$page.on('click', '.database_tab a', function() {
		$(this).addClass("cur").siblings().removeClass("cur");
		var index = $(".database_tab a").index(this);

		$page.find(".database_box").eq(index).show().siblings('.database_box').hide();
	});

	$page.on('click', '.start_creat', function() {
		layer.msg('请稍等', {
		  icon: 16
		  ,shade: 0.01
		});
	});

});