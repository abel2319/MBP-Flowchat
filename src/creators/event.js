
class bpmnEvent{
    constructor(type = "start_event", prosp={x:200, y:100, r:15}){
        this.type = type;
        this.component;
        this.events = {};

        this.addComponent(prosp.x, prosp.y, prosp.r);
        this.addChildren();
        this.component.form.c_svg.onmouseover = Events.mouseovercb;
        this.component.form.c_svg.onmouseleave = Events.mouseleavecb;
        this.component.form.c_svg.ondblclick = Events.doubleclickcb;
    }

    addComponent(u, v, w){
        if (this.type == "start_event"){
            this.component = aya.Component("circle", {x:u, y:v, r:w});
            this.component.form.c_svg.setAttribute("stroke-width","2px");
        }
        else if (this.type == "intermediate_event"){
            this.component = aya.Component("circle", {x:u, y:v, r:w});
            this.component.form.c_svg.setAttribute("stroke-width","2px");
            /*this.component.form.addChild(tmp, (p, c)=>{
                c.x = (p.x);
                c.y = (p.y);
            }, (p, c)=>{});*/
        }
        else{
            this.component = aya.Component("circle", {x:(u + 200), y:v, r:w});
            this.component.form.c_svg.setAttribute("stroke-width","5px");
        }
    }
    // addEvent(event, callback){
    //     this.component.form.c_svg.addEventListener(event, callback);
    //     this.events[event] = callback;
    //     //this.component.form.events[event] = callback;
    // }

    addChildren(){
        var circle = aya.Image(215, 100, 20, 20, "./Images/circle.png", "circle");
        var lozenge = aya.Image(135,100, 20, 20, "./Images/lozenge.png", "lozenge");
        var rectangle = aya.Image(140,100, 20, 20, "./Images/rectangle.png", "rectangle");
        var trash = aya.Image(140,100, 20, 20, "./Images/trash.png", "trash");
        var endEvent = aya.Image(140,100, 20, 20, "./Images/endEvent.png", "endEvent");
        var text = aya.Text(0,0,"");

        if (this.type == "start_event"){
            this.component.form.addChild(lozenge, (p, c)=>{
                c.x = (p.x + this.component.form.r + 10);
                c.y = (p.y - this.component.form.r);
            }, (p, c)=>{}, true);

            this.component.form.addChild(rectangle, (p, c)=>{
                c.x = (p.x + this.component.form.r + 35);
                c.y = (p.y - this.component.form.r);
            }, (p, c)=>{}, true);
        }       
        else if (this.type == "intermediate_event"){
            this.component.form.addChild(circle, (p, c)=>{
                c.x = (p.x + this.component.form.r + 10);
                c.y = (p.y - this.component.form.r);
            }, (p, c)=>{}, true);

            this.component.form.addChild(lozenge, (p, c)=>{
                c.x = (p.x + this.component.form.r + 35);
                c.y = (p.y - this.component.form.r);
            }, (p, c)=>{}, true);

            this.component.form.addChild(rectangle, (p, c)=>{
                c.x = (p.x + this.component.form.r + 10);
                c.y = (p.y - this.component.form.r + 25);
            }, (p, c)=>{}, true);

            this.component.form.addChild(endEvent, (p, c)=>{
                c.x = (p.x + this.component.form.r + 35);
                c.y = (p.y - this.component.form.r + 25);
            }, (p, c)=>{}, true);

            this.component.form.addChild(trash, (p, c)=>{
                c.x = (p.x + this.component.form.r + 10);
                c.y = (p.y - this.component.form.r + 50);
            }, (p, c)=>{}, true);
        }
        else if (this.type == "end_event"){
            this.component.form.addChild(trash, (p, c)=>{
                c.x = (p.x + this.component.form.r + 10);
                c.y = (p.y - this.component.form.r);
            }, (p, c)=>{}, true);
        }

        this.component.form.addChild(text, (p,c)=>{
            c.setOffsetX(p.x - p.r/4);
            c.setOffsetY(p.y + p.r + 5);
        }, (p,c)=>{}, true);
        
        this.component.form.children.map(({child}) => {
            if (child.type != "text") {
                child.c_svg.onclick = Events.mousedowncbChild;
                child.c_svg.setAttribute("id", this.component.form.uuid);
            }
        });

        this.component.form.children.map(({child}) => {
            if (child.type != "text")
                child.c_svg.setAttribute("class", "hidden")
        });
    }

}