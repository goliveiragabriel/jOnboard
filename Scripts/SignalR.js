(function () {
    onboardHub = $.connection.onBoardHub;
    function init() {

    }
    onboardHub.client.broadcastMessage = function (x, y, dragging) {
        canvas.addClick(x, y, dragging);
        canvas.redraw();
    }
    $.connection.hub.start().done(init);
}());