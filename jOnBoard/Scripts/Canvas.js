(function () {
    var Plan = {
        translate: {
            x: -260,
            y: -24
        }
    }
    this.Tool = function () {
        this.active = true;
        this.text = "";
    };
    this.Pencil = function () {
        this.tool = new Tool();
        this.tool.text = "\uf040";
    }
    this.Undo = function (elementId, canvas) {
        var element = document.getElementById(elementId);
        this.canvas = canvas;
        this.tool = new Tool();
        var that = this;
        this.action = function (canvas) {
            if (canvas.dataStack.length == 0) return;
            canvas.dataStack.pop();
            var imgObj = new Image();
            imgObj.onload = function () {
                canvas.context.drawImage(this, 0, 0, canvas.context.canvas.width, canvas.context.canvas.height);
            }
            canvas.reset();
            if (canvas.dataStack.length == 0) {
                canvas.click = [];
                return;
            }
            imgObj.src = canvas.dataStack[canvas.dataStack.length - 1];
        }

        element.addEventListener("click", function () {
            that.action(that.canvas);
        })
    }
    this.Canvas = function (containerId, server) {
        this.containerId = containerId;
        this.click = [];
        this.isPainting = false;
        this.tools = [];
        this.settings = {
            id: "canvas",
            width: 800,
            height: 600

        }
        this.init();
        this.tools.push(new Pencil());
        this.tools.push(new Undo("undo", this));
        this.dataStack = [];
    }
    this.Canvas.prototype.getCurrentTool = function () {
        return $.grep(this.tools, function (elem) {
            if (elem.tool.active)
                return elem;
        });
    };
    this.Canvas.prototype.reset = function () {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.context.lineJoin = "round";
        this.context.lineWidth = 5;
        this.removeLastClick();
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
        mouseX += Plan.translate.x;
        mouseY += Plan.translate.y;
        this.isPainting = true;
        onboardHub.server.addClick(mouseX, mouseY, "");
        this.addClick(mouseX, mouseY, false);
        this.redraw();
    };

    this.Canvas.prototype.addClick = function (x, y, dragging) {
        var obj = { x: x, y: y, dragging: dragging };
        this.click.push(obj);
    };

    this.Canvas.prototype.removeLastClick = function () {
        do {
            lastClick = this.click.pop();
        } while ((lastClick = this.click.pop()).dragging || this.click.length == 0);
    };

    this.Canvas.prototype.redraw = function () {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.context.lineJoin = "round";
        this.context.lineWidth = 5;

        for (var i = 0; i < this.click.length; i++) {
            this.context.beginPath();
            if (this.click[i].dragging && i) {
                this.context.moveTo(this.click[i - 1].x, this.click[i - 1].y);
            } else {
                this.context.moveTo(this.click[i].x - 1, this.click[i].y);
            }
            this.context.lineTo(this.click[i].x, this.click[i].y);
            this.context.closePath();
            this.context.stroke();
        }
    }

    this.Canvas.prototype.onMouseMove = function (e) {
        var mouseX = e.pageX - this.canvas.offsetLeft;
        var mouseY = e.pageY - this.canvas.offsetTop;
        mouseX += Plan.translate.x;
        mouseY += Plan.translate.y;

        if (this.isPainting) {
            this.addClick(mouseX, mouseY, true);
            onboardHub.server.addClick(mouseX, mouseY, true);
            this.redraw();
        }
        else {
            this.setMouseState();
        }
    }
    this.Canvas.prototype.onMouseUp = function (e) {
        this.isPainting = false;
        var dataURL = this.canvas.toDataURL();
        this.dataStack.push(dataURL);
    }
    this.Canvas.prototype.onMouseLeave = function (e) {
        this.isPainting = false;
    }
}());