$(function() {
			
	var container = $("#content");
    var visualWidth = container.width();
    var visualHeight = container.height();

	var swipe = Swipe(container);
	var boy = BoyWalk();

	function scrollTo(time, proportionX) {
		var distX = container.width() * proportionX
		swipe.scrollTo(distX, time)
	}
    
	$("#sun").addClass('rotation')

    $(".cloud:first").addClass('cloud1Animation')
    $(".cloud:last").addClass('cloud2Animation')

    // swipe.scrollTo(visualWidth * 2, 0);

			
		    
	// 获取数据
	var getValue = function(className) {
	    var $elem = $('' + className + '')
	    // 走路的路线坐标
	    return {
	        height: $elem.height(),
	        top: $elem.position().top
	    };
	};
	    
	            // 桥的Y轴
	var bridgeY = function() {
	    var data = getValue('.c_background_middle');
	    return data.top;
	}();

	var girl = {
	    elem: $('.girl'),
	    getHeight: function() {
	        return this.elem.height();
	    },// 转身动作
	    rotate: function() {
	        this.elem.addClass('girl-rotate');
	    },
	    getHeight: function() {
	       return this.elem.height();
	    },
	    setOffset: function() {
	       this.elem.css({
	           left: $("#content").width() / 2,
	           top: bridgeY - this.getHeight()
	       });
	    },
	    getOffset : function(){
	        return this.elem.offset();//jquery的方法，返回在document文档中的位置，返回的是top和left
	    },
	    setPosition: function() {
	        this.elem.css({
	            left: visualWidth / 2,
	            top: bridgeY - this.getHeight()
	        });
	    },
	    getPosition: function() {
	        return this.elem.position();
	    },
	    getWidth: function() {
	        return this.elem.width();
	    }
	};

	// 修正小女孩位置
	girl.setOffset();

	var bird = {
		elem: $('.bird'),
		fly: function(){
			this.elem.addClass('birdFly');
			this.elem.transition({right: container.width()}, 15000, 'linear');
		}
	}

	// 音乐配置
	var audio = Hmlt5Audio(audioConfig.playURl);
	audio.end(function() {
	    Hmlt5Audio(audioConfig.cycleURL, true);
	});
	   

	    //第一次走路，花2000ms走到x的0.5倍的地方，
	boy.walkTo(2000,0.5)//这个时候返回的是一个deffer对象，只有deffer对象resolve之后，才会执行then中的操作
	//第一次走路结束
	.then(function(){
		 scrollTo(5000, 1);//滑动的的时间，滑动距离的比例
		 bird.fly();
	})

	//第二次走
	.then(function(){
		return boy.walkTo(5000,0.5);//必须限制有先后关系的一定要用return？？
	})
	//暂停走路
	.then(function(){
		boy.stopWalk();
	})
	//开门
	.then(function(){
		return openDoor();
	})
	.then(function() {
	    //开灯
	    lamp.bright()
	})
	.then(function() {
	    //进商店
	    return boy.toShop(2000)
	})
	.then(function(){
		return boy.takeFlower();
	})
	.then(function() {
	    //出商店
	    console.log("hehe")
	    return boy.outShop(2000)
	})
	.then(function(){
		return shutDoor();
	})
	.then(function() {
	    //灯暗
	    lamp.dark();
	   
	})
	.then(function(){
		scrollTo(5000, 2);//滑动的x的距离，滑动时间，其实小男孩本身没有移动，移动的是背景
		
	})//下面是处理桥上的状态
	.then(function(){
		return boy.walkTo(5000, 0.15);
		
	})
	.then(function(){
		return boy.walkTo(2000, 0.25, (girl.getOffset().top ) / visualHeight);

	})
	.then(function(){
		// 实际走路的比例
	    var proportionX = (girl.getPosition().left - boy.getWidth() + girl.getWidth() / 3) / visualWidth;
	    // 第三次桥上直走到小女孩面前
	    return boy.walkTo(1500, proportionX);
	})
	.then(function(){
		boy.resetOriginal();
	})
	.then(function() {
	        // 增加转身动作 
	    var d =  $.Deferred();   
		setTimeout(function() {
	            girl.rotate();
	            boy.rotate(function() {
	                // 开始logo动画
	                logo.run();
	                snowflake()
	                d.resolve();
	            });
	        }, 1000);
		return d;
	})

});
