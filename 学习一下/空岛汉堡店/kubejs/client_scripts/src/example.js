// priority: 0

// Visit the wiki for more info - https://kubejs.com/

const typeName=[Text.translate("tooltip.kubejs.typename.1"),Text.translate("tooltip.kubejs.typename.2"),
	Text.translate("tooltip.kubejs.typename.3"),Text.translate("tooltip.kubejs.typename.4"),Text.translate("tooltip.kubejs.typename.5")]
const pizzaTypeName=[Text.translate("tooltip.kubejs.pizzaname.1"),Text.translate("tooltip.kubejs.pizzaname.2"),
	Text.translate("tooltip.kubejs.pizzaname.3"),Text.translate("tooltip.kubejs.pizzaname.4")]
const snackName=["",Text.translate("tooltip.kubejs.snackname.1"),Text.translate("tooltip.kubejs.snackname.2")]
ItemEvents.tooltip(event => {
	//let str=""
	//console.log(global.ingredients[1])
	for(let i in global.ingredients){
		if(isNaN(i)){continue;}
		
		let ingredient=global.ingredients[i];
		let ttiplist=[]
		if(ingredient.type!=null){
			ttiplist.push(typeName[ingredient.type])
			ttiplist.push([Text.translate("tooltip.kubejs.material.1"),ingredient.price+"C"])
			ttiplist.push([Text.translate("tooltip.kubejs.material.2"),(ingredient.extraprice>=0?"+":"§c")+ingredient.extraprice+"C"])
			ttiplist.push([Text.translate("tooltip.kubejs.material.3"),(100-parseInt(ingredient.favor*100))+"%"])
		}
		if(ingredient.pizzatype!=null){
			ttiplist.push(pizzaTypeName[ingredient.pizzatype])
			if(ingredient.pizzatype==0){
				ttiplist.push([Text.translate("tooltip.kubejs.material.4"),(parseInt(ingredient.pizzabase*100))+"%"])
			}
			else if(ingredient.pizzatype==3){
				ttiplist.push(Text.translate("tooltip.kubejs.material.5"))
				ttiplist.push(Text.translate("tooltip.kubejs.material.6"))
			}
			else{
				ttiplist.push([Text.translate("tooltip.kubejs.material.7"),ingredient.pizzaprice+"C"])
				ttiplist.push([Text.translate("tooltip.kubejs.material.8"),(ingredient.pizzaextra>=0?"+":"§c")+ingredient.pizzaextra+"C"])
			}
		}
		event.add(ingredient.id,ttiplist)
		/*
		let price=(ingredient.price+ingredient.extraprice*5)*8
		if(i>=48){
			str+='{\n"isRare":true,'
		}
		else{
			str+='{\n"isRare":false,'
		}
        str+='\n"offer":{\n"itemKey":"'
		str+=ingredient.id
		str+='","amount":8},\n"request":{\n"itemKey":"'
		if(price>=100){
			str+="kubejs:gold_coin"
		}
		else{
			str+="kubejs:iron_coin"
		}
		str+='","amount":'
		if(price>=100){
			str+=Math.floor(price/100)+1
		}
		else{
			str+=Math.floor(price/10)+1
		}
         str+='},\n"tradeExp":4,\n"maxUses":4,\n"priceMultiplier":0.0,\n"demand":0,\n"tradeLevel":1},\n'
		*/

		
	}
	for(let i in global.snacks){
		if(isNaN(i)){continue;}
		let ingredient=global.snacks[i];
		event.add(ingredient.id,[snackName[ingredient.type],
			[Text.translate("tooltip.kubejs.material.9"),(ingredient.pricemod>1?("§a+"+Math.round((ingredient.pricemod-1)*100)+"%"):("§c-"+Math.round((1-ingredient.pricemod)*100)+"%"))],
			[Text.translate("tooltip.kubejs.material.10"),(ingredient.repmod>1?("§a+"+Math.round((ingredient.repmod-1)*100)+"%"):("§c-"+Math.round((1-ingredient.repmod)*100)+"%"))]])
	}
	event.add("some_assembly_required:burger_bun",Text.translate("tooltip.kubejs.burger_bun"))
	event.add("vintagedelight:salt_dust",[Text.translate("tooltip.kubejs.salt_dust.1"),Text.translate("tooltip.kubejs.salt_dust.2")])
	event.add("kubejs:burgerbot_iron",[Text.translate("tooltip.kubejs.burgerbot")])
	event.add("kubejs:burgerbot_gold",[Text.translate("tooltip.kubejs.burgerbot")])
	event.add("kubejs:burgerbot",[Text.translate("tooltip.kubejs.burgerbot")])
	event.add("kubejs:iron_contract",[Text.translate("tooltip.kubejs.contract.1"),Text.translate("tooltip.kubejs.contract.2"),
		[Text.translate("tooltip.kubejs.contract.3"),Text.of("50%")],
		[Text.translate("tooltip.kubejs.contract.4"),Text.of("6s"),Text.translate("tooltip.kubejs.contract.5"),]])
	event.add("kubejs:gold_contract",[Text.translate("tooltip.kubejs.contract.1"),Text.translate("tooltip.kubejs.contract.2"),
		[Text.translate("tooltip.kubejs.contract.3"),Text.of("25%")],
		[Text.translate("tooltip.kubejs.contract.4"),Text.of("4s"),Text.translate("tooltip.kubejs.contract.5"),]])
	event.add("kubejs:diamond_contract",[Text.translate("tooltip.kubejs.contract.1"),Text.translate("tooltip.kubejs.contract.2"),
		[Text.translate("tooltip.kubejs.contract.4"),Text.of("2s"),Text.translate("tooltip.kubejs.contract.5"),]])
	event.add("kubejs:copper_coin","§e1C")
	event.add("kubejs:iron_coin","§e10C")
	event.add("kubejs:gold_coin","§e100C")
	event.add("kubejs:diamond_coin","§e1000C")
	event.add("kubejs:netherite_coin","§e10000C")
	event.add("kubejs:copper_certificate",[[Text.translate("tooltip.kubejs.certificate.1"),Text.of("5"),Text.translate("tooltip.kubejs.certificate.2")]])
	event.add("kubejs:iron_certificate",[[Text.translate("tooltip.kubejs.certificate.1"),Text.of("10"),Text.translate("tooltip.kubejs.certificate.2")]])
	event.add("kubejs:gold_certificate",[[Text.translate("tooltip.kubejs.certificate.1"),Text.of("15"),Text.translate("tooltip.kubejs.certificate.2")]])
	event.add("kubejs:diamond_certificate",[[Text.translate("tooltip.kubejs.certificate.1"),Text.of("20"),Text.translate("tooltip.kubejs.certificate.2")]])
	event.add("kubejs:netherite_certificate",[[Text.translate("tooltip.kubejs.certificate.1"),Text.of("25"),Text.translate("tooltip.kubejs.certificate.2")]])
	event.add("kubejs:flying_feather",Text.translate("tooltip.kubejs.flying_feather"))
	event.add("kubejs:speed_feather",Text.translate("tooltip.kubejs.speed_feather"))
	event.add("minecraft:paper",Text.translate("tooltip.kubejs.paper"))
	event.add("minecraft:book",Text.translate("tooltip.kubejs.book"))
	event.add("kubejs:eternal_codex",[Text.translate("tooltip.kubejs.eternal_codex.1"),Text.translate("tooltip.kubejs.eternal_codex.2")])
	event.add("kubejs:punched_card_make",Text.translate("tooltip.kubejs.burgerbot"))
	event.add("kubejs:punched_card_sell",Text.translate("tooltip.kubejs.burgerbot"))
	event.add("kubejs:spade",[Text.translate("tooltip.kubejs.spade.1"),Text.translate("tooltip.kubejs.spade.2")])
	//console.log(str)
	/*
	let colorfulnames=[
	{
		id:"minecraft:beacon",
		name:"超级无敌炫彩彩虹信标",
		nodes:[[255,255,0],[0,255,255],[255,0,255]],
		length:5,
		time:1
	}
	]
	for(let i=0;i<colorfulnames.length;i++){
		let cname=colorfulnames[i];
		event.addAdvanced(cname.id, (item, advanced, text) => {
			let offset=Math.floor(Client.player.age/cname.time)%(cname.nodes.length*cname.length);
			
			let namearray=cname.name.split("");
			let coloredname=[];
			for(let j=0;j<namearray.length;j++){
				let pos=(j+offset)%(cname.nodes.length*cname.length)
				let newcolor=0;
				for(let k=0;k<3;k++){
					newcolor+=(Math.pow(256,2-k)*
					(
						cname.nodes[Math.floor(pos/cname.length)%cname.nodes.length][k]+
						Math.floor(
							((cname.nodes[(Math.floor(pos/cname.length)+1)%cname.nodes.length][k]-
							cname.nodes[Math.floor(pos/cname.length)%cname.nodes.length][k])/cname.length)
							*(pos%cname.length)
						)
					)
					)
				}
				coloredname.push(Text.of(namearray[j]).color(newcolor))
			}
		text.set(0,coloredname);
		})
	}
	//
	//event.add('minecraft:diamond', ["Not equivalent to Industrial Foregoing's Latex", 'Line 2 text would go here'])
	*/
})
JEIEvents.hideItems(event => {
	event.getAllIngredients()
	event.getAllIngredients().forEach((item)=>{
		if(item.getMod()=='pizzacraft'&&!item.hasTag('pizzacraft:keepjei')){
			event.hide(item)
		}
	})
	event.hide('kubejs:strider_egg')
	event.hide('kubejs:sliced_ham_model')
	event.hide('kubejs:cooked_loin')
	event.hide('kubejs:cooked_lampray_fillet')
	event.hide('kubejs:cooked_pufferfish_slice')
	event.hide('kubejs:cooked_tropical_fish_slice')
	event.hide('kubejs:minced_strider')
	event.hide('kubejs:oily_bean_curd')
	event.hide('kubejs:cucumber_noodles')
	event.hide('kubejs:roasted_sausage')
	event.hide('kubejs:cooked_bass_slice')
	event.hide('kubejs:baked_portobello_cap')
	event.hide('kubejs:rice_burger_top_model')
	event.hide('kubejs:rice_burger_bottom_model')
	event.hide('kubejs:ink_burger_top_model')
	event.hide('kubejs:ink_burger_bottom_model')
	event.hide('kubejs:oat_burger_top_model')
	event.hide('kubejs:oat_burger_bottom_model')
	event.hide('kubejs:blaze_burger_top_model')
	event.hide('kubejs:blaze_burger_bottom_model')
	event.hide('kubejs:egg_burger_top_model')
	event.hide('kubejs:egg_burger_bottom_model')
})
	