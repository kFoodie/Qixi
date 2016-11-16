var lamp = {
    elem: $('.b_background'),
    bright: function() {
        this.elem.addClass('lamp-bright')
    },
    dark: function() {
        this.elem.removeClass('lamp-bright')
    }
}