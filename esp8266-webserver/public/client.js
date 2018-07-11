R"***(
"use strict";class client{constructor(t){this.doorStatusEnum={Unknown:0,IsOpen:1,IsClosed:2,Error:3},this.openCloseModeEnum={OpenClose:0,Toggle:1},this.commandEnum={Toggle:"toggle"},this.doorStatus=this.doorStatusEnum.Unknown,this.elements=t,this.elements.toggle.addEventListener("click",this.toggleDoorCommand.bind(this))}start(){this.checkStatus(),setInterval(this.checkStatus.bind(this),3e3)}checkStatus(){fetch("api/v1/status",{method:"GET",credentials:"include"}).then(t=>{200===t.status?t.text().then(t=>{"IsOpen"==t?this.doorStatus=this.doorStatusEnum.IsOpen:"IsClosed"==t&&(this.doorStatus=this.doorStatusEnum.IsClosed),this.applyDoorStatusToDOM(this.doorStatus)}):(this.doorStatus=this.doorStatusEnum.Error,this.applyDoorStatusToDOM(this.doorStatus))}).catch(t=>{console.log(t),this.doorStatus=this.doorStatusEnum.Error,this.applyDoorStatusToDOM(this.doorStatus)})}applyDoorStatusToDOM(t){switch(t){case this.doorStatusEnum.Unknown:this.elements.status.innerText="Door is unknown",this.elements.status.className="unknown";break;case this.doorStatusEnum.IsOpen:this.elements.status.innerText="Door is open",this.elements.status.className="open";break;case this.doorStatusEnum.IsClosed:this.elements.status.innerText="Door is closed",this.elements.status.className="closed";break;case this.doorStatusEnum.Error:this.elements.status.innerText="Error",this.elements.status.className="error"}}sendDoorCommand(t){fetch("api/v1/"+t,{method:"POST",credentials:"include"}).then(t=>{200===t.status?this.setCommandStatus(!0):this.setCommandStatus(!1)}).catch(s=>{this.setCommandStatus(!1),console.log("Error sending "+t+" command"),console.log(s)})}setCommandStatus(t){this.elements.commandStatus.className=t?"success":"error",setTimeout(()=>this.elements.commandStatus.className="hidden",3e3)}toggleDoorCommand(){confirm("Toggle door?")&&this.sendDoorCommand(this.commandEnum.Toggle)}}let elements={body:document.body,status:document.getElementById("status"),commandStatus:document.getElementById("commandStatus"),toggle:document.getElementById("toggleDoor")},cl=new client(elements);cl.start();
)***"
