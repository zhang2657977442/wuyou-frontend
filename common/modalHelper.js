export default (function (bodyCls) {
        var scrollTop;
        return {
                open: function () {
                        scrollTop = document.scrollingElement.scrollTop;
                        document.body.classList.add(bodyCls);
                        document.body.style.top = -scrollTop + 'px';
						
						document.querySelector('.uni-page-head').style.top = 0;
                },
                close: function () {
                        document.body.classList.remove(bodyCls);
                        // scrollTop lost after set position:fixed, restore it back.
                        document.scrollingElement.scrollTop = scrollTop;
                        document.body.style.top = "auto";
                }
        };
})('modal-open');