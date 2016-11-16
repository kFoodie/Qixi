///////////
//loge动画 //
///////////
var logo = {
    elem: $('.logo'),
    run: function() {
    	console.log("hehehe111")
        this.elem.addClass('logolightSpeedIn')
            .on(animationEnd, function() {
                $(this).addClass('logoshake').off();
            });
    }
};
