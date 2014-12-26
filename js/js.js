var home=$("#homepage");
var time=null;
//home.style.height=window.innerHeight+'px';
//导入音乐列表
window.onload=function(){
	//alert(window.innerHeight)

	/*for(var i=0;i<=musicList.length;i++){
		var oLi=document.createElement("li");
		oLi.innerHTML="<div class='container'><div class='row'><div class='col-xs-3'><img src='"+musicList[i].singerimg+"'></div><div class='col-xs-6'><h2>"+musicList[i].name+"</h2><h3>"+musicList[i].singer+"</h3></div><div class='col-xs-3'>"+toTime(musicList[i].time)+"</div></div></div>";
		$("#list").appendChild(oLi);
	}*/
	var num=0;
	initPlayer(num);
	listHighlight(num);

	//获取歌曲播放时间
	var barWidth=parseInt($("#bar").style.width);
	/*function showTime(){
		var totle=musicList[num].time;
		$("#time").getElementsByTagName("span")[1].innerHTML=toTime(totle);
		//进度条控制
		$("#bar").onclick=function(ev){
			var pX=adjustPorgress(this,ev);
			time=parseInt(pX*totle/barWidth);
		};
		//document.title=time;
		musicList[num].currentTime=time;
		time++;parseInt($("#audio").currentTime);
		$("#time").getElementsByTagName("span")[0].innerHTML=toTime(time);
		$("#buffer").style.left=100*time/totle+'%';
		$("#progress").style.width=100*time/totle+'%';
		if(totle==time){
			num=num<3 ? num+1 : 0;
			initPlayer(num);
			listHighlight(num);
		}
	}
	showTime();
	setInterval(showTime, 1000);*/
	var posAdjust=null;
			$("#buffer").onmousedown=$("#buffer").ontouchstart=function(ev){
				var oEvent=ev||event;

				//var pos=getPos(oEvent);
				disX=oEvent.clientX-$("#buffer").offsetLeft;
				document.onmousemove=document.ontouchmove=function(ev){
					var oEvent1=ev||event;
					//var pos1=getPos(oEvent1);

					var l=oEvent1.clientX-disX;
					//console.log(l);
					if(l<0){l=0;}
					if(l>barWidth){l=barWidth;}
					$("#buffer").style.left=l+'px';
					$("#audio").currentTime=l*$("#audio").duration/barWidth;
				};
				document.onmouseup=document.ontouchend=function(){
					document.onmousemove=document.ontouchmove=null;
					document.onmouseup=document.ontouchend=null;
				};
				return false;
			};

	$("#audio").ontimeupdate=function(){
		if($("#audio").currentTime==$("#audio").duration){
			num=num<3 ? num+1 : 0;
			initPlayer(num);
			listHighlight(num);
		}else{
			var pos=($("#audio").currentTime/$("#audio").duration)*barWidth;
			$("#buffer").style.left=pos+'px';
			$("#progress").style.width=pos+'px';
			$("#time").getElementsByTagName("span")[0].innerHTML=toTime($("#audio").currentTime);
			$("#time").getElementsByTagName("span")[1].innerHTML=toTime($("#audio").duration);
		}
	}
	
	//	停止播放
	$("#play").onclick=function(){
		$("#play").style.display="none";
		$("#stop").style.display="block";
		$("#singerImg").className="singerImg";
		$("#audio").pause();
	};

	//播放音乐
	$("#stop").onclick=function(){
		$("#play").style.display="block";
		$("#stop").style.display="none";
		$("#singerImg").className="singerImg active";
		$("#audio").play();
	};

	//下一首
	$("#next").onclick=function(){
		num=num<3 ? num+1 : 0;
		initPlayer(num);
		listHighlight(num);
	};
	//上一首
	$("#pre").onclick=function(){
		num=num>0 ? num-1 : 3;
		initPlayer(num);
		listHighlight(num);
	};
	//选曲播放
	var listLi=$("#list").getElementsByTagName('li');
	for (var i = 0; i < listLi.length; i++) {
		listLi[i].index=i;
		listLi[i].onclick=function(){
			initPlayer(this.index);
			listHighlight(this.index);
		};
	}

};


function $(obj){
	return document.querySelector(obj);
}
function initPlayer(index){
	time=0;
	$("#audio").setAttribute('src',musicList[index].url);
	$("#musicName").innerHTML=musicList[index].name;
	$("#sigerName").innerHTML=musicList[index].singer;
	$("#singerImg").style.background='url('+musicList[index].singerimg+')';
	$("#singerImg").style.backgroundSize=100+'px';
	$("#audio").play();
	document.title=musicList[index].name+'|Wystan Wang';
}
function listHighlight(index){
	var li=$("#list").getElementsByTagName('li');
	for (var i = 0; i < musicList.length; i++) {
		li[i].style.background="#FFF";
	}
	li[index].style.background="#FDF9EE";
}
function toDou(num){
	return num>9?num:'0'+num
}
function toTime(num){
	var mit=parseInt(num/60); 
	var sec=parseInt(num%60) ;
	return toDou(mit)+':'+toDou(sec);
}

