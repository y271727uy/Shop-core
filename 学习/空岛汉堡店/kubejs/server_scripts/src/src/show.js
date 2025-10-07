global.drawcombo=function(player,timestamp){
	player.paint({
		bar:{
			type:'rectangle',
			draw:'ingame',
			visible:true,
			alignX:"left",
			alignY:"bottom",
			texture:"kubejs:textures/painter/strike_bar.png",
			x: 0,
			y: -8,
			w: 32,
			h: 224
		},
		hamburger:{
			type: 'item',
			alignX:"left",
			alignY:"bottom",
			x: 16,
			y: "-200+200*sin(((time()-"+(timestamp/1000)+")/60)*HALF_PI)",
			w: 32,
			h: 32 ,
			draw: 'ingame',
			item: "farmersdelight:hamburger",
			visible:true
		},
		combotext:{
			type:'text',
			alignX:"left",
			alignY:"bottom",
			draw:"ingame",
			scale:2,
			visible:true,
			x:24,
			y:-8,
			text:`Combo x${player.persistentData.getInt("combos")}`
			//text:[Text.translate("message.kubejs.combo"),Text.of(player.persistentData.getInt("combos")+"")]
		}
	})
}
PlayerEvents.tick(event => {
	let player = event.player;
	//player.tell()
	
	let rumiadial=player.persistentData.getInt("rumiadialogue")
	let combo=player.persistentData.getLong("comboTimeStamp")
	
	if(Date.now()-combo>=60*1000){
		player.paint({
			bar:{type:'rectangle',visible:false,},
			hamburger:{type: 'item',visible:false},
			combotext:{type:'text',visible:false}
		})
		player.persistentData.putLong("comboTimeStamp",0)
		player.persistentData.putInt("combos",0)
	}
	
	let dialstage=player.persistentData.getInt("dialoguestage")
	let curstage=dialstage
	if(rumiadial!=0){
		let curdial=global.lumiaDialogues[rumiadial]
		for(let i=0;i<curdial.length;i++){
			if(curstage<0)break;
			if(curstage<=curdial[i][0].length){
				let text={}
				text["text"+parseInt(curstage/11)]={
					type:'text',
					text:curdial[i][0].slice(parseInt(curstage/11)*11,curstage+1),
					scale:2,
					visible:true,
					alignX:"left",
					alignY:"bottom",
					x:60,y:-70+(parseInt(curstage/11))*20,
					draw:"ingame"}
				player.paint(text)
			}
			if(i==0&&curstage==0){
				let timenow=(Date.now()/1000)
				let multi=(3.1415/2)/(curdial[i][0].length*0.05)
				player.paint({rumia: {
					type: 'rectangle',
					draw: 'ingame',
					visible:true,
					x: -10,
					y:'((sin((time() * 1.1))*10)-(sin((time()-'+timenow+')*'+multi+')*100)-200)',
					w: 160, h: 272,
					alignX: 'right',
					texture: 'kubejs:textures/painter/'+curdial[i][1]}
					})
			}
			if(i==curdial.length-1&&curstage==curdial[i][0].length*7){
				let timenow=(Date.now()/1000)
				let multi=(3.1415/2)/(curdial[i][0].length*0.05)
				player.paint({rumia: {
					type: 'rectangle',
					draw: 'ingame',
					visible:true,
					x: -10,
					y:'((sin((time() * 1.1))*10)-(cos((time()-'+timenow+')*'+multi+')*200)-300)',
					w: 160, h: 272,
					alignX: 'right',
					texture: 'kubejs:textures/painter/'+curdial[i][1]}
					})
			}
			if((curstage==0&&i!=0)||(i==0&&curstage==curdial[i][0].length)){
				player.paint({rumia: {
					type: 'rectangle',
					draw: 'ingame',
					visible:true,
					x: -10,
					y:"((sin((time() * 1.1))*10)+100)",
					w: 160, h: 272,
					alignX: 'right',
					texture: 'kubejs:textures/painter/'+curdial[i][1]}
					})
			}
			if(curstage==0){
				player.paint({
						text1:{type:'text',visible: false}
						,text2:{type:'text',visible: false}
						,text3:{type:'text',visible: false}
						,text4:{type:'text',visible: false}
					})
			}
			curstage-=(curdial[i][0].length*8)
		}
		if(curstage>0){
			player.persistentData.putInt("rumiadialogue",0)
			player.persistentData.putInt("dialoguestage",0)
			player.paint({rumia:{type:'rectangle',visible: false}
				,text0:{type:'text',visible: false}
				,text1:{type:'text',visible: false}
				,text2:{type:'text',visible: false}
				,text3:{type:'text',visible: false}
				,text4:{type:'text',visible: false}
			})
		}
		else{
			player.persistentData.putInt("dialoguestage", dialstage+1)
		}
	}

    //if (player.age % 20 != 0) return;
	let item=player.getOffHandItem();
	let obj={}
	if (item!="create:clipboard"){
		for(let i=0;i<15;i++){
			obj[i]={type: 'item',visible: false}
		}
	}
	if (item=="create:clipboard"&&item.nbt?.displayData!=null){
		let display=item.nbt.displayData
		for(let i=0;i<15;i++){
			if(display[i]!=null){
				let k=global.ingredients[display[i]].id
				//console.log(k.length);
				obj[i]={type: 'item',x: 40,y: (17*12-12*i),w: 32,h: 32,draw: 'ingame',alienY:"bottom",item:k,visible:true}
			}
			else{
				obj[i]={type: 'item',visible: false}
			}
		}
	}
	player.paint(obj)
})
PlayerEvents.loggedIn(event => {
	let player=event.player
	if(!player.persistentData.getInt("firsttime")){
		player.persistentData.putInt("firsttime",1)
		player.give(Item.of("ftbquests:book"))
	}
})

