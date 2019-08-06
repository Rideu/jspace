
class Game
{
	constructor()
	{
		this.prototype = this.__proto__;
	}
	
	Init()
	{
		
	}
	
	Update()
	{
		
	}
	
	Draw()
	{
		
	}
	
	RunOneFrame()
	{ 
		this.Update(); 
		this.Draw();
	}
	
	Run()
	{
		this.Init();
		window.setInterval(this.prototype.RunOneFrame(this), 17);
	}
	
}


var TO_RADIANS = Math.PI/180; 
var RAD = 57.295779513082320876798154814105;
var isDebug = true; //checked or Draw()
class SpriteBatch //extends IComponent
{
	constructor()
	{
		this.canvas = document.createElement("canvas");
		this.canvas.width = 1280;
        this.canvas.height = 600;
		this.centerator = new Vector2(0,0);
        this.Bounds = new Rectangle(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.setAttribute("id", "batch");
        this.canvas.style = "background-color:#2f3235; display:block; margin:auto";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.canvasmouse = new Vector2(0);
		var b = this;
		this.canvas.onmousemove = function(e)
		{
			b.canvasmouse = new Vector2(e.layerX, e.layerY);
		}
		this.MousePos = () => {
			return this.canvasmouse;
		} 
		this.GlobalMousePos = () => {
			return this.canvasmouse.substract(this.centerator);
		} 
		this.CenterMousePos = () => {
			return this.MousePos().substract(this.Bounds.size.div(2));
		} 
        this.frameNo = 0;
	}
	
    Clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
	
	CenterBound()
	{
		return new Rectangle(-this.Bounds.size.X/2 + this.centerator.X,-this.Bounds.size.Y/2 + this.centerator.Y, this.Bounds.size.X, this.Bounds.size.Y);
	}
	
	Draw(obj/* is uPosable */) { // => (texture t, vector2 v, color? c)
		var c = this.canvas;
		var ctx = c.getContext("2d");
		ctx.fillStyle = obj.color;
		//ctx.filter = 'drop-shadow(4px 4px 4px red)';
		if (obj.tex == null)
		{
			ctx.save(); 
		 
			ctx.translate(obj.pos.X + obj.size.X/2 - this.centerator.X, obj.pos.Y+ obj.size.Y/2 - this.centerator.Y);
			ctx.rotate(obj.angle * TO_RADIANS);
			ctx.fillRect( -obj.size.X/2, -obj.size.Y/2, obj.size.X, obj.size.Y);
			
			ctx.restore();
		}
		else
		{
			ctx.save(); 
		 
			ctx.translate(obj.pos.X + obj.size.X/2 - this.centerator.X, obj.pos.Y+ obj.size.Y/2 - this.centerator.Y);
			ctx.rotate(obj.angle * TO_RADIANS);
		 
			ctx.drawImage(obj.tex, -obj.size.X/2, -obj.size.Y/2, obj.size.X, obj.size.Y);
			if(isDebug)
			ctx.fillRect( -obj.size.X/2, -obj.size.Y/2, obj.size.X, obj.size.Y);
							
			ctx.restore();
		}
    }
	
    DrawTextured(obj) {
		var c = this.canvas;
        var ctx = c.getContext("2d");
        ctx.fillStyle = obj.color;
        ctx.fillRect(obj.pos.X - this.centerator.X, obj.pos.Y - this.centerator.Y, obj.size.X, obj.size.Y);
    }
	DrawString(pos, text, fonttype, fontsize, color, centerate = false) {
        var c = this.canvas;
        var ctx = c.getContext("2d");
        ctx.font = fontsize + " " + fonttype;
        ctx.fillStyle = color;
		var p = centerate?pos:pos.substract(centerate);
        ctx.fillText(text, pos.X, pos.Y);
            //ctx.fillRect(obj.pos.X, obj.pos.Y, obj.size.X, obj.size.Y);
    }
	
	Fill(bounds, color)
	{
        var c = this.canvas;
        var ctx = c.getContext("2d");
        ctx.fillStyle = color;
        ctx.fillRect(bounds.pos.X, bounds.pos.Y, bounds.size.X, bounds.size.Y);
	}
}
document.addEventListener('keydown', (event) => {
	const key = event.keyCode;
	keymap[key] = true;
	//alert('keypress event\n\n' + 'key: ' + keyName);
});

document.addEventListener('keyup', (event) => {
	const key = event.keyCode;
	delete keymap[key];
	//alert('keypress event\n\n' + 'key: ' + keyName);
});
		
function KeyPressed(key) // => input.js
{
	if (keymap[key])
	return true;
	return false;
}

var keymap = {};
var Keys = { // => input.js
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            SHIFT: 16,
            CTRL: 17,
            ALT: 18,
            PAUSE: 19,
            CAPS_LOCK: 20,
            ESCAPE: 27,
            SPACE: 32,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            END: 35,
            HOME: 36,
            LEFT_ARROW: 37,
            UP_ARROW: 38,
            RIGHT_ARROW: 39,
            DOWN_ARROW: 40,
            INSERT: 45,
            DELETE: 46,
            0: 48,
            1: 49,
            2: 50,
            3: 51,
            4: 52,
            5: 53,
            6: 54,
            7: 55,
            8: 56,
            9: 57,
            A: 65,
            B: 66,
            C: 67,
            D: 68,
            E: 69,
            F: 70,
            G: 71,
            H: 72,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            M: 77,
            N: 78,
            O: 79,
            P: 80,
            Q: 81,
            R: 82,
            S: 83,
            T: 84,
            U: 85,
            V: 86,
            W: 87,
            X: 88,
            Y: 89,
            Z: 90,
            LEFT_META: 91,
            RIGHT_META: 92,
            SELECT: 93,
            NUMPAD_0: 96,
            NUMPAD_1: 97,
            NUMPAD_2: 98,
            NUMPAD_3: 99,
            NUMPAD_4: 100,
            NUMPAD_5: 101,
            NUMPAD_6: 102,
            NUMPAD_7: 103,
            NUMPAD_8: 104,
            NUMPAD_9: 105,
            MULTIPLY: 106,
            ADD: 107,
            SUBTRACT: 109,
            DECIMAL: 110,
            DIVIDE: 111,
            F1: 112,
            F2: 113,
            F3: 114,
            F4: 115,
            F5: 116,
            F6: 117,
            F7: 118,
            F8: 119,
            F9: 120,
            F10: 121,
            F11: 122,
            F12: 123,
            NUM_LOCK: 144,
            SCROLL_LOCK: 145,
            SEMICOLON: 186,
            EQUALS: 187,
            COMMA: 188,
            DASH: 189,
            PERIOD: 190,
            FORWARD_SLASH: 191,
            GRAVE_ACCENT: 192,
            OPEN_BRACKET: 219,
            BACK_SLASH: 220,
            CLOSE_BRACKET: 221,
            SINGLE_QUOTE: 222
        };


class Vector2 {
    constructor(x, y = x) {
        this.X = x;
        this.Y = y;
    }
	
	set _(e)
	{
		
	}
	
	length()
	{
		return Math.sqrt(this.X*this.X-this.Y*this.Y);
	}
	
	dist(v)
	{
		return Math.sqrt(Math.pow(this.X - v.X, 2) + Math.pow(this.Y - v.Y, 2));
	}
	
	mult(v)
	{
		if(typeof v == Vector2)
			return new Vector2(this.X*v.X, this.Y*v.Y);
		else
			return new Vector2(this.X*v, this.Y*v);
	}
	
	div(v)
	{
		return new Vector2(this.X/v, this.Y/v);
	}
	
	substract(v)
    {
		var rv = new Vector2(this.X, this.Y);
		rv.X -= v.X;
		rv.Y -= v.Y;
		return rv;
    }
	
	offset(v)
    {
		var rv = new Vector2(this.X, this.Y);
		rv.X += v.X;
		rv.Y += v.Y;
		return rv;
    }
	
	norm()
	{
		var a = Math.atan2(this.Y, this.X);
		return new Vector2(Math.cos(a), Math.sin(a));
	}
	
	atan2()
	{
		return Math.atan2(this.Y, this.X);
	}
	
	angle()
	{
		return this.atan2()*RAD;
	}
	
	grad()
	{
		return this.atan2();
	}
	
	toStr()
	{
		return "{"+this.X+":"+this.Y+"}";
	}
	
	valueOf(e)
	{
		return this.length();
	}
	
	toString(e)
	{
		return "{"+this.X+":"+this.Y+"}";
	}
}
class uPosable {
    constructor(x, y) {
        this.pos = new Vector2(x, y);
		this.angle = 0;
    }
}
class Rectangle extends uPosable {
    constructor(x, y, width, height) {
        super(x, y);
        this.size = new Vector2(width, height);
    }
}


		