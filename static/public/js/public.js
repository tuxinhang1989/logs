$(function() {
	 // 侧边导航
	 var $page=$(".page"),
        _left=$page.find(".left_nav");
        // 点击菜单标题
         _left.on("click",".left_item_title",function(){
          $(this).closest(".left_item ").find(".sub_list").slideToggle("fast",function(){
            if ($(this).is(':hidden')){
                $(this).siblings(".left_item_title").find(".arrow").addClass("arrow_down2");
            } else {
                $(this).siblings(".left_item_title").find(".arrow").removeClass("arrow_down2");
            }        
            return false;
          });
          $(".left_item_title").find(".arrow").removeClass("arrow_down2");
          $(".left_item_title").parent().removeClass("cur");
          $(this).parent().addClass("cur");
          $(this).parent().siblings().children(".sub_list").slideUp("fast");
     	});
         // 点击子菜单
        _left.on("click",".sub_list .sub_item a",function(){
            $(this).parents(".left_item").siblings(".left_item").find('.sub_list .sub_item a').removeClass('active');
            $(this).addClass('active').parent(".sub_item").siblings().children(".sub_list .sub_item a").removeClass('active');
        });

		//箭头hover
         _left.find(".left_item_title").hover(function(){
                $(this).find(".arrow").addClass("arrow_down1");
         }, function() {
                 $(this).find(".arrow").removeClass("arrow_down1");
         });

    //左侧导航滚动
    function getHeight(){
        var windowHeight = $(window).height();
        $('#scroll').css('height',windowHeight-55);
    }
    getHeight();    
    $(window).resize(function(e) {
        getHeight();
        var dHeigth = $('#scroll').height();
        var ulHeight = $('.left_list').height();
        if(dHeigth > ulHeight){
            $('.left_list').css('top',0);   
        }
    });

    $("#scroll").panel({iWheelStep:30});

    // 头部下拉选择
    var $sel = $page.find(".current_txt"),
        aList = $page.find(".sel_list");

    $sel.click(function() {
        aList.toggle();
        return false
    });

     aList.on('click', 'ul li', function() {
         aList.hide();
     });

    oneclcik(".sel_list");

	$page.find(".tab_con table tr:even").css({
        backgroundColor: '#f8f9fb'
    });

     // 底部固定
    footerPosition();
    $(window).resize(footerPosition);


     // 全选单选
    var $selectAll = $('.chk_all');
    var $selectSingle = $('.chk_single')
    $selectAll.click(function(e) {
          $selectSingle.prop('checked',this.checked);
    });
    $selectSingle.click(function(e) {
        if($selectSingle.length == $('.chk_single:checked').length){
            $selectAll.prop('checked',true);
        }else{
            $selectAll.prop('checked',false);
        }
    });

     //单日历
     if($('.single-calendar').length>0){
        for(var i = 0;i<$('.single-calendar').length;i++){
            $('.single-calendar').eq(i).attr('id','single'+i);
            laydate.render({
              elem: '#single'+i,
              theme: '#45a2ff'
            });
        }
    }

    // 双日历
    if($('.double-calendar').length>0){
        for(var i = 0;i<$('.double-calendar').length;i++){
            $('.double-calendar').eq(i).attr('id','double'+i);
            laydate.render({
              elem: '#double'+i,
              theme:'#45a2ff',
              range: true
            });
        }
    } 
});

// 底部固定
function footerPosition(){
    $(".footer").removeClass("fixed-bottom");
    var contentHeight = document.body.scrollHeight,
        winHeight = window.innerHeight;
    if(!(contentHeight > winHeight)){
        $(".footer").addClass("fixed-bottom");
    } else {
        $(".footer").removeClass("fixed-bottom");
    }
}

// tab切换
  function tabs(a,b,c){
      var $tar=$(b);  
    a.click(function(){
          var index = $(this).index();
          var $CtrTar = $(this);
          $CtrTar.addClass(c).siblings().removeClass(c);
          $tar.eq(index).show().siblings(b).hide();
      });
  }
// 点击空白关闭
  function oneclcik(obj){
	  $(document).on("click",function(e){
		  if($(e.target).parents(obj).length == 0)
		  {
			  $(obj).hide();
		  }
	  });
 }

function changeFile(){
    var file = $('.alert_con .query_bar .file')
    file.each(function(){
      $(this).siblings('input[type=text]').val($(this).val());
    })
  }
