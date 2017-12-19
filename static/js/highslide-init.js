/*
 * 用于初始化 highslide，需要引入以下静态文件:
 *  - /static/js/highslide/highslide.js
 *  - /static/js/highslide/highslide.css
 */
$(function() {
    function _highslide(){
        hs.graphicsDir = "/static/js/highslide/graphics/";
        hs.maxHeight = 1000;
        hs.maxWidth= 600;
        var r = 0;
        $(function() {
            $(".image-rotate").click(function(e){
                r += 90;
                $("table[cellspacing=0]").css('rotate', r);
                $(".highslide-wrapper").css('rotate', r);
            });
        });
    }
    _highslide();
});
