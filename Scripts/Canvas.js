(function () {
    this.Tool = function () {
        this.active = true;
        this.text = "";
    };
    this.Pencil = function () {
        this.tool = new Tool();
        this.tool.text = "\uf040";
    }
    this.Canvas = function (containerId) {
        this.containerId = containerId;
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
        this.isPainting = false;
        this.tools = [];
        this.settings = {
            id: "canvas",
            width: 800,
            height: 600

        }
        this.tools.push(new Pencil());
        this.init();
    }
    this.Canvas.prototype.getCurrentTool = function () {
        return $.grep(this.tools, function (elem) {
            if (elem.tool.active)
                return elem;
        });
    };

    this.Canvas.prototype.init = function () {
        var canvasDiv = document.getElementById(this.containerId);
        this.canvas = document.createElement("canvas");
        this.canvas.setAttribute('width', this.settings.width);
        this.canvas.setAttribute('height', this.settings.height);
        this.canvas.setAttribute('id', this.settings.id);
        canvasDiv.appendChild(this.canvas);
        this.context = this.canvas.getContext("2d");
        var that = this;
        $(this.settings.id).on("mousedown", function (e) {
            that.onMouseDown(e);
        });
        $(this.settings.id).mousemove(function (e) {
            that.onMouseMove(e);
        });
        $(this.settings.id).mouseup(function (e) {
            that.onMouseUp(e);
        });
        $(this.settings.id).mouseleave(function (e) {
            that.onMouseLeave(e);
        });
        this.cursorCanvas = document.createElement("canvas");
        this.cursorCanvas.width = 24;
        this.cursorCanvas.height = 24;
        var ctx = this.cursorCanvas.getContext("2d");
        ctx.fillStyle = "#000000";
        ctx.font = "24px FontAwesome";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

    };
    this.Canvas.prototype.setMouseState = function () {
        var currentTool = this.getCurrentTool()[0];
        var ctx = this.cursorCanvas.getContext("2d");
        ctx.fillText(currentTool.tool.text, "12", "12");
        var dataUrl = this.cursorCanvas.toDataURL("image/png");
        $("#" + this.containerId).css('cursor', 'url(' + dataUrl + '), auto');
    };
    this.Canvas.prototype.onMouseDown = function (e) {
        var mouseX = e.pageX - this.canvas.offsetLeft;
        var mouseY = e.pageY - this.canvas.offsetTop;
        this.isPainting = true;
        onboardHub.server.addClick(mouseX, mouseY,"");
        this.addClick(mouseX, mouseY);
        this.redraw();
        this.context.save();
    };
    this.Canvas.prototype.addClick = function (x, y, dragging) {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
    }
    this.Canvas.prototype.redraw = function () {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.context.lineJoin = "round";
        this.context.lineWidth = 5;

        for (var i = 0; i < this.clickX.length; i++) {
            this.context.beginPath();
            if (this.clickDrag[i] && i) {
                this.context.moveTo(this.clickX[i - 1], this.clickY[i - 1]);
            } else {
                this.context.moveTo(this.clickX[i] - 1, this.clickY[i]);
            }
            this.context.lineTo(this.clickX[i], this.clickY[i]);
            this.context.closePath();
            this.context.stroke();
        }
    }

    this.Canvas.prototype.onMouseMove = function (e) {
        var mouseX = e.pageX - this.canvas.offsetLeft;
        var mouseY = e.pageY - this.canvas.offsetTop;
        if (this.isPainting) {
            onboardHub.server.addClick(mouseX, mouseY, true);
            this.addClick(mouseX, mouseY, true);
            this.redraw();
        }
        else {
            this.setMouseState();
        }
    }
    this.Canvas.prototype.onMouseUp = function (e) {
        this.isPainting = false;
    }
    this.Canvas.prototype.onMouseLeave = function (e) {
        this.isPainting = false;
    }
}());