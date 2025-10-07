// priority: 0


//顾客AI函数参数：
//顾客实体 全部顾客的X坐标列表（便于判定是否能向前移动） 柜台的方块实体 柜台的菜单（用于判定是否关店）
global.customerAI = function (entity,XList,blockentity,menu){
	let phase = entity.persistentData.getInt("customerPhase")
	let level = entity.getLevel()
	//如果菜单为空（关店）或者处于夜晚，则立刻离开
	if((menu.length<=1||level.getDayTime()%24000>14400)&&phase!=4){
		entity.persistentData.putInt("customerPhase",4)
		entity.setPositionAndRotation(entity.x,entity.y,entity.z,90,0)
		level.getServer().runCommandSilent("/execute as "+entity.uuid.toString()+" at @s run tp @s ~ ~ ~ ~ ~")
	}
	//取决于顾客的阶段决定行动。
	//1：出场阶段
	//2：等待记录订单
	//3：等待完成订单
	//4：离场阶段
	switch(phase){
		//出场阶段
		case 1:
			for(let i=0;i<XList.length;i++){
				if(XList[i]<entity.x){
					//寻找第一个比自己靠前的顾客
					//如果距离不够远则结束整个判定流程
					if((entity.x-XList[i])<1.3){
						return;
					}
					//找到了就结束寻找
					break;
				}
			}
			//如果没找到比自己靠前的顾客/找到的顾客的距离够远，就会执行这里的代码
			//向前移动
			entity.setPositionAndRotation(entity.x-0.1,entity.y,entity.z,90,0)
			//如果到达柜台处，则向柜台旋转，进入2阶段
			if(entity.x<=blockentity.getBlockPos().getX()+0.5){
				entity.setPositionAndRotation(entity.x,entity.y,entity.z,180,0)
				//这里的原版指令是为了同步客户端
				//我找不到更好的办法了
				level.getServer().runCommandSilent("/execute as "+entity.uuid.toString()+" at @s run tp @s ~ ~ ~ ~ ~")
				entity.persistentData.putInt("customerPhase",2)
			}
			return;
		//离场阶段
		case 4:
			//向前移动
			entity.setPositionAndRotation(entity.x-0.1,entity.y,entity.z,90,0)
			//如果距离够远，则删除自身
			if(entity.x<=blockentity.getBlockPos().getX()-10){
				level.spawnParticles("minecraft:poof",false,entity.x,entity.y+1,entity.z,0.5,1,0.5,50,0);
				entity.discard()
			}
			return;
	}
}
global.customerAIPizza=function(entity,id,PosList,blockentity,menu){
	let phase = entity.persistentData.getInt("customerPhase")
	let level = entity.getLevel()
	//如果菜单为空（关店）或者处于夜晚，则立刻离开
	if((menu.length<=1||level.getDayTime()%24000>14400)&&phase!=4){
		entity.persistentData.putInt("customerPhase",4)
		entity.setPositionAndRotation(entity.x,entity.y,entity.z,90,0)
		level.getServer().runCommandSilent("/execute as "+entity.uuid.toString()+" at @s run tp @s ~ ~ ~ ~ ~")
	}
	//取决于顾客的阶段决定行动。

	//5：出场阶段（披萨店）
	//6：入座阶段（披萨店）
	//7：等待记录订单（披萨店）
	//8：等待完成订单（披萨店）
	//9：离座阶段
	//10：离场阶段

	switch(phase){
		case 5:
			for(let i=0;i<PosList.length;i++){
				if( i!=id&&(
					((PosList[id][0]-PosList[i][0])<=0.8)&&
					((PosList[id][0]-PosList[i][0])>=0)&&
					((PosList[i][1]-PosList[id][1])<=0.8)&&
					((PosList[i][1]-PosList[id][1])>=0)
					)
				){
					return;
				}
			}
			//如果没找到比自己靠前的顾客/找到的顾客的距离够远，就会执行这里的代码
			//向前移动
			entity.setPositionAndRotation(entity.x-0.1,entity.y,entity.z,90,0)
			PosList[id][0]-=0.1
			//如果到达柜台处，则向柜台旋转，进入2阶段
			for(let j=-2;j<=2;j++){
				let targetx=blockentity.getBlockPos().getX()+0.5+j
				if(entity.x<targetx+0.1&&entity.x>targetx-0.1){
					for(let i=0;i<PosList.length;i++){
						if( i!=id&&(
							(Math.abs(PosList[id][0]-PosList[i][0])<=0.5)||
							((PosList[i][1]>PosList[id][1]))
							)
						){
							return;
						}
					}
					entity.setPositionAndRotation(entity.x,entity.y,entity.z,180,0)
					level.getServer().runCommandSilent("/execute as "+entity.uuid.toString()+" at @s run tp @s ~ ~ ~ ~ ~")
					entity.persistentData.putInt("customerPhase",6)
				}
			}
			if(entity.x<=blockentity.getBlockPos().getX()-10){
				level.spawnParticles("minecraft:poof",false,entity.x,entity.y+1,entity.z,0.5,1,0.5,50,0);
				entity.discard()
			}
			break;
		case 6:
			entity.setPositionAndRotation(entity.x,entity.y,entity.z-0.1,180,0)
			PosList[id][1]-=0.1
			if(entity.z<=blockentity.getBlockPos().getZ()+1.5){
				entity.persistentData.putInt("customerPhase",7)
			}
			break;
		case 9:
			for(let i=0;i<PosList.length;i++){
				if( i!=id&&(
					(Math.abs(PosList[id][0]-PosList[i][0])<=0.6)&&
					((PosList[id][1]-PosList[i][1])<=0.6)
					)
				){
					return;
				}
			}
			entity.setPositionAndRotation(entity.x,entity.y,entity.z+0.1,0,0)
			PosList[id][1]+=0.1
			if(entity.z>=blockentity.getBlockPos().getZ()+2.5){
				entity.setPositionAndRotation(entity.x,entity.y,entity.z,90,0)
				level.getServer().runCommandSilent("/execute as "+entity.uuid.toString()+" at @s run tp @s ~ ~ ~ ~ ~")
				entity.persistentData.putInt("customerPhase",10)
			}
			break;
		case 10:
			//如果距离够远，则删除自身
			entity.setPositionAndRotation(entity.x-0.1,entity.y,entity.z,90,0)
			PosList[id][0]-=0.1
			if(entity.x<=blockentity.getBlockPos().getX()-10){
				level.spawnParticles("minecraft:poof",false,entity.x,entity.y+1,entity.z,0.5,1,0.5,50,0);
				entity.discard()
			}
			break;
			
	}
}
//柜台每tick触发的函数
/**
 * 
 * @param {$BlockEntityJS_} entity 
 * @returns 
 */
global.tableTick = function (entity) {
	
	let level=entity.getLevel();
	let pos=entity.getBlockPos();
	//分析菜单
	let menu=entity.persistentData.getString("menu").split(",")
	
	//获取顾客实体列表
	let rng = new AABB.of(pos.getX()-12, pos.getY(), pos.getZ()+1, pos.getX()+12, pos.getY()+1, pos.getZ()+3);
    let entityList = level.getEntitiesWithin(rng);
	let customerList = [];
	let customerXPosList = [];
	let customerPosList = [];
	for(let i=0;i<entityList.length;i++){
		let customer = entityList[i];
		if (customer.persistentData.getInt("customerPhase")!=0){
			customerXPosList.push(customer.x)
			customerPosList.push([customer.x,customer.z])
			customerList.push(customer)
		}
	}
	//给顾客的X坐标列表排序
	customerXPosList.sort(function(a,b){return b-a});
	//逐一执行顾客AI
	for(let i=0;i<customerList.length;i++){
		if(customerList[i].persistentData.getInt("customerPhase")<=4){
			global.customerAI(customerList[i],customerXPosList,entity,menu)
		}
		else{
			global.customerAIPizza(customerList[i],i,customerPosList,entity,menu)
		}
	}
	//这里是一个倒计时，倒计时归零时创建顾客
	//然后随机定时5秒~10秒
	if(entity.tick%20!=0)return;
	let cd=entity.persistentData.getInt("cd");
	if(cd<=0){
		//如果可以创建顾客（开店且处于白天）
		if(menu.length>1&&level.getDayTime()%24000<12000){
			//如果有空间创建顾客
			if(customerXPosList.length==0||customerXPosList[0]<pos.getX()+7){
				spawncustomer(entity)
			}
			cd=randomInt(5,10);
		}
	}
	cd-=1;
	entity.persistentData.putInt("cd",Math.max(cd,0));
	rng = new AABB.of(pos.getX(), pos.getY(), pos.getZ()-1, pos.getX()+1, pos.getY()+1, pos.getZ());
    entityList = level.getEntitiesWithin(rng);
	let employeedata=0;
	for(let i=0;i<entityList.length;i++){
		employeedata=entityList[i].persistentData.getInt("employee");
		if(employeedata!=0&&employeedata%10!=2){
			break;
		}
	}
	if(employeedata==0||employeedata%10==2){
		return;
	}
	if(menu.length<=1){
		return;
	}
	let nosell=(employeedata%10==1);
	let server=level.getServer()
	let percent=1-0.25*(3-Math.floor(employeedata/10));
	let pcd=entity.persistentData.getInt("pcd");
	if(pcd>0){
		entity.persistentData.putInt("pcd",Math.max(0,pcd-1));
	}
	else{
		let reputation=entity.persistentData.getInt("reputation");
		let replevel=reputationLevel(reputation)
		let menurequired=(replevel<25)
		if(menurequired){
			let cnt=0;
			for(let i=0;i<menu.length;i++){
				if(replevel<global.ingredients[menu[i]].chapter*5){
					cnt++
				}
			}
			menurequired=(cnt<3)
		}
		let material=level.getBlock(pos.north().east()).inventory
		let storage=level.getBlock(pos.north().west()).inventory
		let block=level.getBlock(pos.above())
		if(material==null||storage==null)return;
		if(menu.includes("83")){
			for(let i=-2;i<=2;i++){
				if(level.getBlock(pos.x+i,pos.y+1,pos.z)=='pizzacraft:pizza'){
					let pb=level.getBlock(pos.x+i,pos.y+1,pos.z)
					let pizza=Item.of("pizzacraft:pizza");
					pb.entity.writeToItemStack(pizza)
					material.insertItem(pizza,false)
					pb.set("minecraft:air")
				}
			}
		}
		entity.persistentData.putInt("pcd",2*(4-Math.floor(employeedata/10))-1)
		for(let k=0;k<customerList.length;k++){
			let phase=customerList[k].persistentData.getInt("customerPhase")
			let customer=customerList[k]
			if(customer.persistentData.getInt("specialcustomer")!=0&&phase!=4){
				if(global.specialCustomers[customer.persistentData.getInt("specialcustomer")].isIgnoredByEmployees){
					customer.persistentData.putInt("customerPhase",4);
					continue;
				}
			}
			if (phase==2||phase==3){
				customer.persistentData.putInt("customerPhase",3)
				let order=customer.persistentData.getString("customerOrder").split(",")
				if(block=="some_assembly_required:sandwich"){
					let sandwichbe=level.getBlockEntity(pos.above())
					let sandwichbuilt=Item.of('some_assembly_required:sandwich')
					sandwichbe.saveToItem(sandwichbuilt)
					let builtlist=sandwichbuilt.nbt?.BlockEntityTag?.Sandwich
					for(let j=0;j<order.length;j++){
						let ingredient=global.ingredients[order[j]]?.id
						if(j==builtlist.length){
							for(let i=0;i<material.getSlots();i++){
								let stack=material.getStackInSlot(i)
								if(stack==global.ingredients[order[j]]?.id){
									server.runCommandSilent(`data modify block ${pos.getX()} ${pos.getY()+1} ${pos.getZ()} Sandwich append value {id:"${global.ingredients[order[j]]?.id}",Count:1b}`)
									server.runCommandSilent(`playsound some_assembly_required:block.sandwich.add_item.generic block @a ${pos.getX()} ${pos.getY()+1} ${pos.getZ()}`)
									level.getBlockEntity(pos.above()).updateHeight()
									if($ingredients.hasContainer(stack)){
										storage.insertItem($ingredients.getContainer(stack).copy(),false)
									}
									material.extractItem(i,1,false)
									return;
								}
							}
							return;
						}
						if(builtlist[j].id!=ingredient){
							for(let i=0;i<builtlist.length;i++){
								if(!$ingredients.hasContainer(Item.of(builtlist[i].id))){
									material.insertItem(Item.of(builtlist[i].id),false)
								}
							}
							server.runCommandSilent(`setblock ${pos.getX()} ${pos.getY()+1} ${pos.getZ()} air`)
							return;
						}
					}
					if(nosell)return;
					server.runCommandSilent(`setblock ${pos.getX()} ${pos.getY()+1} ${pos.getZ()} air`)
					
					let screpmod=1.0
					let scpricemod=1.0
					if(customer.persistentData.getInt("specialcustomer")!=0){
						let specialcustomer=global.specialCustomers[customer.persistentData.getInt("specialcustomer")]
						screpmod=specialcustomer.reputationModifier
						scpricemod=specialcustomer.priceModifier
					}
					let amount=(burgerPrice(order))*(1+0.2*reputationLevel(reputation))*percent*scpricemod
					if(!menurequired)reputation+=genReputation(order,reputation)*percent*screpmod
					entity.persistentData.putInt("reputation",Math.floor(reputation))
					insertMoney(storage,amount)
					customer.persistentData.putInt("customerPhase",4)
					customer.setPositionAndRotation(customer.x,customer.y,customer.z,90,0)
					server.runCommandSilent("/execute as "+customer.uuid.toString()+" at @s run tp @s ~ ~ ~ ~ ~")
					return;
				}
				else if(block=="minecraft:air"){
					for(let i=0;i<material.getSlots();i++){
						let stack=material.getStackInSlot(i)
						if(stack==global.ingredients[order[0]]?.id){
							server.runCommandSilent(`setblock ${pos.getX()} ${pos.getY()+1} ${pos.getZ()} some_assembly_required:sandwich{Sandwich:[{id:"${global.ingredients[order[0]]?.id}",Count:1b}]}`)
							server.runCommandSilent(`playsound some_assembly_required:block.sandwich.add_item.generic block @a ${pos.getX()} ${pos.getY()+1} ${pos.getZ()}`)
							material.extractItem(i,1,false)
							return;
						}
					}
					return;
				}
				else{
					return;
				}
			}
			if (phase==7||phase==8){
				//console.log(`k:${k}`)
				let customerflag=false;
				customer.persistentData.putInt("customerPhase",8)
				let order=customer.persistentData.getString("customerOrder").split(",")
				for(let i=0;i<material.getSlots();i++){
					let stack=material.getStackInSlot(i)
					if(stack=="pizzacraft:pizza"){
						let pizza=stack.nbt?.Inventory?.Items ?? []
						if(pizza.length+1!=order.length)continue;
						for(let i=0;i<pizza.length;i++){
							if(global.ingredients[pizza[i].id]!=order[i+1]){
								continue;
							}
						}
						customerflag=true;
						//console.log(111)
						if(!nosell){
							material.extractItem(i,1,false)
							let screpmod=1.0
							let scpricemod=1.0
							if(customer.persistentData.getInt("specialcustomer")!=0){
								let specialcustomer=global.specialCustomers[customer.persistentData.getInt("specialcustomer")]
								screpmod=specialcustomer.reputationModifier
								scpricemod=specialcustomer.priceModifier
							}
							let amount=(pizzaPrice(order))*(1+0.2*reputationLevel(reputation))*percent*scpricemod
							if(!menurequired)reputation+=genPizzaReputation(order,reputation)*percent*screpmod
							entity.persistentData.putInt("reputation",Math.floor(reputation))
							insertMoney(storage,amount)
							customer.persistentData.putInt("customerPhase",9)
							customer.setPositionAndRotation(customer.x,customer.y,customer.z,0,0)
							server.runCommandSilent("/execute as "+customer.uuid.toString()+" at @s run tp @s ~ ~ ~ ~ ~")
						}
					}
				}
				//console.log(customerflag)
				for(let i=-2;i<=2;i++){
					if(i==0)continue;
					if(level.getBlock(pos.x+i,pos.y+1,pos.z)=='pizzacraft:raw_pizza'){
						let pb=level.getBlock(pos.x+i,pos.y+1,pos.z)
						let raw_pizza=Item.of("pizzacraft:raw_pizza");
						pb.entity.saveToItem(raw_pizza);
						let pizza=raw_pizza?.nbt?.BlockEntityTag?.Inventory?.Items ?? []
						if(pizza.length+1!=order.length)continue;
						for(let i=0;i<pizza.length;i++){
							if(global.ingredients[pizza[i].id]!=order[i+1]){
								continue;
							}
						}
						customerflag=true;
					}
				}
				//console.log(customerflag)
				//console.log(customerflag)
				if(customerflag)continue;
				if(block.id=='minecraft:air'){
					for(let i=0;i<material.getSlots();i++){
						let stack=material.getStackInSlot(i)
						if(stack=='pizzacraft:dough'){
							material.extractItem(i,1,false)
							block.set("pizzacraft:dough")
							return;
						}
					}
				}
				else if(block.id=='pizzacraft:dough'){
					let age=parseInt(block.getProperties().get("age"))
					if(age==5){block.set('pizzacraft:raw_pizza')}
					else{
						block.set('pizzacraft:dough',{"age":`${Math.min(age+2,5)}`})
					}
				}
				else if(block.id=='pizzacraft:raw_pizza'){
					let raw_pizza=Item.of("pizzacraft:raw_pizza");
					if(block.entity)block.entity.saveToItem(raw_pizza);
					//console.log(raw_pizza.nbt)
					let pizza=raw_pizza?.nbt?.BlockEntityTag?.Inventory?.Items ?? []
					//console.log([pizza.length,order.length])
					if(pizza.length+1>order.length)continue;
					let matchflag=true;
					for(let i=0;i<pizza.length;i++){
						if(global.ingredients[pizza[i].id]!=order[i+1]){
							matchflag=false;
							break;
						}
					}
					//console.log(matchflag)
					if(!matchflag)continue;
					if(pizza.length+1==order.length){
						//console.log(112)
						for(let i=-2;i<=2;i++){
							if(i==0)continue;
							if(level.getBlock(pos.x+i,pos.y,pos.z).hasTag("pizzacraft:ovens")){
								if(level.getBlock(pos.x+i,pos.y+1,pos.z)=='minecraft:air'){
									level.runCommandSilent(`clone ${pos.x} ${pos.y+1} ${pos.z} ${pos.x} ${pos.y+1} ${pos.z} ${pos.x+i} ${pos.y+1} ${pos.z} replace move`)
								}
							}
						}
					}
					else{
						//console.log([pizza.length,order.length])
						for(let i=0;i<material.getSlots();i++){
							let stack=material.getStackInSlot(i)
							if(stack==global.ingredients[order[pizza.length+1]]?.id){
								material.extractItem(i,1,false)
								block.inventory.insertItem(pizza.length,Item.of(global.ingredients[order[pizza.length+1]]?.id),false)
								block.entity.setChanged()
								return;
							}
						}
						//level.runCommandSilent(`clone ${pos.x} ${pos.y+1} ${pos.z} ${pos.x} ${pos.y+1} ${pos.z} ${pos.x} ${pos.y+1} ${pos.z} replace move`)
					}
				}
				return;
			}
		}
		let items=block.getDrops();
		items.forEach((item)=>{
			material.insertItem(item,false)
		})
		block.set("minecraft:air")
	}
}



//玩家右键柜台事件
BlockEvents.rightClicked('kubejs:counter', event => {
	let player=event.player
	let item=event.item
	//如果空手右键，直接跳过判定流程
	if(!item){return;}
	let entity=event.block.entity
	let pos=entity.getBlockPos();
	let menu=entity.persistentData.getString("menu").split(",")
	//如果拿着羽毛但是副手没有剪贴板，直接跳过判定流程
	if(item=='minecraft:feather'&&event.player.getOffHandItem()!='create:clipboard'){
		player.setStatusMessage(Text.translate("message.kubejs.counter.clipboard"))
		event.server.runCommandSilent(`playsound minecraft:block.anvil.land block @a ${pos.getX()} ${pos.getY()} ${pos.getZ()}`)
		return;
	}
	let level=event.level;
	//如果拿着纸，则根据声望等级给予对应的执照
	if(item=='minecraft:paper'){
		let reputation=entity.persistentData.getInt("reputation");
		let replevel=reputationLevel(reputation)
		if(replevel<5){
			player.setStatusMessage(Text.translate("message.kubejs.counter.not_enough_rep"))
			return;
		}
		else if(replevel<10){
			player.give(Item.of('kubejs:copper_certificate'))
		}
		else if(replevel<15){
			player.give(Item.of('kubejs:iron_certificate'))
		}
		else if(replevel<20){
			player.give(Item.of('kubejs:gold_certificate'))
		}
		else if(replevel<25){
			player.give(Item.of('kubejs:diamond_certificate'))
		}
		else{
			player.give(Item.of('kubejs:netherite_certificate'))
		}
		item.shrink(1);
		return;
	}
	//如果拿着列表过滤器，则进入菜单设置逻辑
	if(item=='create:filter'){
		//黑名单状态直接判定为打烊
		if(item.nbt?.Blacklist==1){
			entity.persistentData.putString("menu","")
			player.setStatusMessage(Text.translate("message.kubejs.counter.closed_for_now"))
			event.server.runCommandSilent(`playsound minecraft:entity.player.levelup block @a ${pos.getX()} ${pos.getY()} ${pos.getZ()}`)
			return;
		}
		//否则的话，遍历列表过滤器中的物品
		else{
			if(menu.length>1){
				player.setStatusMessage(Text.translate("message.kubejs.counter.cant_change_menu"))
				event.server.runCommandSilent(`playsound minecraft:block.anvil.land block @a ${pos.getX()} ${pos.getY()} ${pos.getZ()}`)
				return;
			}
			let rawnewmenu=filtertomenu(item.nbt?.Items?.Items);
			let newmenu=[]
			if(rawnewmenu.includes(83)){
				let foodcount=[0,0,0,0];
				for(let i=0;i<rawnewmenu.length;i++){
					let newfood=global.ingredients[rawnewmenu[i]]
					if(newfood.pizzatype!=null){
						newmenu.push(rawnewmenu[i])
					}
					foodcount[newfood.pizzatype]+=1;
				}
				if(foodcount[0]==0||foodcount[1]<=1||foodcount[2]<=1){
					player.setStatusMessage(Text.translate("message.kubejs.counter.bad_menu_pizza"))
					event.server.runCommandSilent(`playsound minecraft:block.anvil.land block @a ${pos.getX()} ${pos.getY()} ${pos.getZ()}`)
					return;
				}
			}
			else{
				let foodcount=0;
				for(let i=0;i<rawnewmenu.length;i++){
					let newfood=global.ingredients[rawnewmenu[i]]
					if(newfood.type!=null){
						newmenu.push(rawnewmenu[i])
					}
					if(newfood.type!=3&&newfood.type!=0){foodcount+=1;}
				}
				//食材不够三种非酱料的食材则结束判定
				if(foodcount<3){
					player.setStatusMessage(Text.translate("message.kubejs.counter.bad_menu"))
					event.server.runCommandSilent(`playsound minecraft:block.anvil.land block @a ${pos.getX()} ${pos.getY()} ${pos.getZ()}`)
					return;
				}
			}
			//设置菜单
			entity.persistentData.putString("menu",newmenu.join())
			newmenu=newmenu.join().split(",")
			player.setStatusMessage(Text.translate("message.kubejs.counter.set_menu"))
			event.server.runCommandSilent(`playsound minecraft:entity.player.levelup block @a ${pos.getX()} ${pos.getY()} ${pos.getZ()}`)
		}
	}
	if(item=='minecraft:book'){
		player.setStatusMessage(reputationList(entity.persistentData.getInt("reputation")),"WHITE")
		//player.setStatusMessage(reputationString(entity.persistentData.getInt("reputation")))
	}
	//找顾客
	
	let rng = new AABB.of(pos.getX()-12, pos.getY(), pos.getZ()+1, pos.getX()+12, pos.getY()+1, pos.getZ()+2);
    let entityList = level.getEntitiesWithin(rng);
	let customercount = 0;
	//player.tell(level.getBlock(pos.above()))	
	for(let i=0;i<entityList.length;i++){
		let customer = entityList[i];
		let phase=customer.persistentData.getInt("customerPhase")
		if (phase!=0){
			//计数顾客数量
			customercount++;
			let order=customer.persistentData.getString("customerOrder").split(",")
			//如果是羽毛，记录订单
			if(item=='minecraft:feather'){
				//不是2/3阶段的话，说明是进场和离场阶段，跳过
				if(phase!=2&&phase!=3){
					continue;
				}
				player.getOffHandItem().setNbt(orderstring(customer.persistentData.getString("customerOrder")))
				event.server.runCommandSilent(`playsound minecraft:item.book.page_turn block @a ${pos.getX()} ${pos.getY()} ${pos.getZ()}`)
				if(customer.persistentData.getInt("specialcustomer")!=0){
					global.specialCustomers[customer.persistentData.getInt("specialcustomer")].noteTrigger(entity,customer,player)
				}
				customer.persistentData.putInt("customerPhase",3)
				return;
			}
			//如果是三明治则进入交付逻辑
			if(item=='some_assembly_required:sandwich'){
				//二阶段尚未记录订单
				if(phase==2){
					player.setStatusMessage(Text.translate("message.kubejs.counter.new_order"))
					event.cancel()
					return;
				}
				//跳过进场和离场阶段
				if(phase!=3){
					continue;
				}
				let reputation=entity.persistentData.getInt("reputation");
				//将交付的三明治抽象为列表
				let sandwich=item?.nbt?.BlockEntityTag?.Sandwich ?? []
				let sandwicharr=[]
				for(let i=0;i<sandwich.length;i++){
					sandwicharr.push(global.ingredients[sandwich[i].id] ?? 0)
				}
				//player.tell(sandwicharr)
				//计算分数
				let score=(100*compareBurgers(sandwicharr,order))
				//给钱
				let repvalue=genReputation(order,reputation)
				let pricemod=1;
				//额外商品计算
				let inv = player.inventory.items
				let extrafoods=[];
				let extrafoodset= new Set();
				for(let i=0;i<inv.length;i++){
					if((inv[i]?.id in global.snacks)&&(!extrafoodset.has(inv[i]?.id))){
						extrafoods.push(inv[i])
						extrafoodset.add(inv[i]?.id)
					}
				}
				//console.log(extrafoods.length)
				let extrafood=extrafoods[randomInt(0,extrafoods.length)]
				if(extrafood!=null){
					let snack=global.snacks[global.snacks[extrafood.id]]
					let display_list=[Text.translate("message.kubejs.extra_product_1").gray(),
						Text.of(extrafood.getDisplayName().getString()).white(),
						Text.of((snack.repmod>1?(" §a+"+Math.round((snack.repmod-1)*100)+"%"):(" §c-"+Math.round((1-snack.repmod)*100)+"%"))),
						(snack.repmod>1?Text.translate("message.kubejs.extra_product_2").green():Text.translate("message.kubejs.extra_product_2").red()),
						Text.of((snack.pricemod>1?(" §e+"+Math.round((snack.pricemod-1)*100)+"%"):(" §c-"+Math.round((1-snack.pricemod)*100)+"%"))),
						(snack.pricemod>1?Text.translate("message.kubejs.extra_product_3").yellow():Text.translate("message.kubejs.extra_product_3").red())
					]
					player.tell(display_list)
					//Client.getInstance().gameRenderer.displayItemActivation(extrafood.id)
					extrafood.shrink(1);
					
					pricemod=snack.pricemod
					repvalue=Math.round(repvalue*snack.repmod)
				}
				if(customer.persistentData.getInt("specialcustomer")!=0){
					let specialcustomer=global.specialCustomers[customer.persistentData.getInt("specialcustomer")]
					repvalue=Math.round(repvalue*specialcustomer.reputationModifier)
					pricemod*=specialcustomer.priceModifier
				}
				let money=Math.floor((Math.min(burgerPrice(order),burgerPrice(sandwicharr))
				*(score/100.0))
				*(1+0.2*reputationLevel(reputation))
				*pricemod)
				payMoney(player,money)
				//player.tell(score)
				item.shrink(1);
				//根据分数的不同，产生不同的声望结果
				customerreaction(score,player,level,entity,customer,repvalue,money)
				if(customer.persistentData.getInt("specialcustomer")!=0){
					global.specialCustomers[customer.persistentData.getInt("specialcustomer")].deliveryTrigger(entity,customer,player,score,money)
				}
				customer.persistentData.putInt("customerPhase",4)
				customer.setPositionAndRotation(customer.x,customer.y,customer.z,90,0)
				level.getServer().runCommandSilent("/execute as "+customer.uuid.toString()+" at @s run tp @s ~ ~ ~ ~ ~")
				//event.player.tell(customer.persistentData.getString("customerOrder").split(","))
				event.cancel()
				return;
			}
			if(item=='create:filter'&&phase!=3){
				customer.persistentData.putString("customerOrder",createRandomOrder(newmenu))
			}
		}
	}
	//搬运工具逻辑
	if(item=='kubejs:crowbar'){
		if(customercount!=0){
			player.setStatusMessage(Text.translate("message.kubejs.counter.wait_for_leaving"));
			return;
		}
		let counter=Item.of('kubejs:counter');
		entity.saveToItem(counter);
		counter=counter.withLore([reputationList(entity.persistentData.getInt("reputation"),"YELLOW")])
		//counter=counter.withLore([Text.yellow(reputationString(entity.persistentData.getInt("reputation")))])
		player.give(counter);
		item.shrink(1);
		event.block.set('minecraft:air');
	}
})
ItemEvents.entityInteracted(event=>{
	//if(event.target.type!='easy_npc:humanoid')return;
	let target=event.target;
	if(target.persistentData.getInt("customerPhase")==0)return;
	let player=event.player
	
	let level=event.level
	let phase=target.persistentData.getInt("customerPhase");
	let counter=null;
	if(phase!=7&&phase!=8)return;
	for(let i=-3;i<=3;i++){
		if(level.getBlock(target.x+i,target.y,target.z-1)=='kubejs:counter'){
			counter=level.getBlock(target.x+i,target.y,target.z-1).getEntity()
			break;
		}
	}
	if(counter==null)return;
	if(event.item=='minecraft:feather'&&(phase==7||phase==8)){
		if(player.getOffHandItem()!='create:clipboard'){
			player.setStatusMessage(Text.translate("message.kubejs.counter.clipboard"))
			event.server.runCommandSilent(`playsound minecraft:block.anvil.land block @a ${target.x} ${target.y} ${target.z}`)
			return;
		}
		else{
			player.getOffHandItem().setNbt(orderstring(target.persistentData.getString("customerOrder")))
			event.server.runCommandSilent(`playsound minecraft:item.book.page_turn block @a ${target.x} ${target.y} ${target.z}`)
			let counter=null;
			if(target.persistentData.getInt("specialcustomer")!=0){
				global.specialCustomers[target.persistentData.getInt("specialcustomer")].noteTrigger(counter,target,player)
			}
			target.persistentData.putInt("customerPhase",8)
			return;
		}
	}
	if(event.item=='pizzacraft:pizza'){
		if(phase==7){
			player.setStatusMessage(Text.translate("message.kubejs.counter.new_order"))
			return;
		}
		if(phase==8){
			let pizza=event.item?.nbt?.Inventory?.Items ?? []
			let pizzaarr=[]
			pizzaarr.push(83)
			for(let i=0;i<pizza.length;i++){
				pizzaarr.push(global.ingredients[pizza[i].id] ?? 0)
				//console.log(pizza[i].id)
			}
			//console.log(pizzaarr.join())
			let order=target.persistentData.getString("customerOrder").split(",")
			let score=(100*comparePizzas(pizzaarr,order))
			//console.log(pizzaarr.join()+"*"+order.join())
			let reputation=counter.persistentData.getInt("reputation");
			//给钱
			let repvalue=genReputation(order,reputation)
			let pricemod=1;
			//额外商品计算
			let inv = player.inventory.items
			let extrafoods=[];
			let extrafoodset= new Set();
			for(let i=0;i<inv.length;i++){
				if((inv[i]?.id in global.snacks)&&(!extrafoodset.has(inv[i]?.id))){
					extrafoods.push(inv[i])
					extrafoodset.add(inv[i]?.id)
				}
			}
			//console.log(extrafoods.length)
			let extrafood=extrafoods[randomInt(0,extrafoods.length)]
			if(extrafood!=null){
				let snack=global.snacks[global.snacks[extrafood.id]]
				//Client.getInstance().gameRenderer.displayItemActivation(extrafood.id)
				let display_list=[Text.translate("message.kubejs.extra_product_1").gray(),
					Text.of(extrafood.getDisplayName().getString()).white(),
					Text.of((snack.repmod>1?(" §a+"+Math.round((snack.repmod-1)*100)+"%"):(" §c-"+Math.round((1-snack.repmod)*100)+"%"))),
					(snack.repmod>1?Text.translate("message.kubejs.extra_product_2").green():Text.translate("message.kubejs.extra_product_2").red()),
					Text.of((snack.pricemod>1?(" §e+"+Math.round((snack.pricemod-1)*100)+"%"):(" §c-"+Math.round((1-snack.pricemod)*100)+"%"))),
					(snack.pricemod>1?Text.translate("message.kubejs.extra_product_3").yellow():Text.translate("message.kubejs.extra_product_3").red())
				]
				player.tell(display_list)
				extrafood.shrink(1);
				pricemod=snack.pricemod
				repvalue=Math.round(repvalue*snack.repmod)
				
			}
			if(target.persistentData.getInt("specialcustomer")!=0){
				let specialcustomer=global.specialCustomers[target.persistentData.getInt("specialcustomer")]
				repvalue=Math.round(repvalue*specialcustomer.reputationModifier)
				pricemod*=specialcustomer.priceModifier
			}
			let money=Math.floor((Math.min(pizzaPrice(order),pizzaPrice(pizzaarr))
			*(score/100.0))
			*(1+0.2*reputationLevel(reputation))
			*pricemod)
			payMoney(player,money)
			//player.tell(score)
			event.item.shrink(1);
			//根据分数的不同，产生不同的声望结果
			customerreaction(score,player,level,counter,target,repvalue,money)
			if(target.persistentData.getInt("specialcustomer")!=0){
				global.specialCustomers[target.persistentData.getInt("specialcustomer")].deliveryTrigger(counter,target,player,score,money)
			}
			target.persistentData.putInt("customerPhase",9)
			target.setPositionAndRotation(target.x,target.y,target.z,0,0)
			level.getServer().runCommandSilent("/execute as "+target.uuid.toString()+" at @s run tp @s ~ ~ ~ ~ ~")
			
		}
	}
})
BlockEvents.placed("kubejs:counter",event=>{
	let pos=event.block.pos
	let level=event.level
	for(let i=-15;i<=15;i++){
		for(let j=-1;j<=1;j++){
			for(let k=-2;k<=2;k++){
				if(i==0&&k==0&&j==0)continue;
				if(level.getBlock(pos.x+i,pos.y+j,pos.z+k)=="kubejs:counter"){
					//console.log(level.getBlock(pos.x+i,pos.y+j,pos.z+k).getEntity().persistentData.getString("menu").split(","))
					event.player.setStatusMessage(Text.translate("message.kubejs.counter_too_close"))
					event.server.runCommandSilent(`playsound minecraft:block.anvil.land block @a ${pos.getX()} ${pos.getY()} ${pos.getZ()}`)
					let counter=Item.of('kubejs:counter')
					let entity=event.block.entity
					entity.saveToItem(counter)
					counter=counter.withLore([reputationList(entity.persistentData.getInt("reputation"),"YELLOW")])
					//counter=counter.withLore([Text.yellow(reputationString(entity.persistentData.getInt("reputation")))])
					event.player.give(counter)
					event.block.set("minecraft:air")
					//event.cancel()
					return;
				}
			}
		}
	}
})

/*
BlockEvents.broken("kubejs:counter",event=>{
    if(!event.player){
        return;
        event.cancel()
    }
    let bitem=Item.of('kubejs:counter');
	event.getBlock().getEntity().saveToItem(bitem);
    event.player.give(bitem);
    event.block.popItem(bitem);
    event.block.set('minecraft:air')
    event.cancel()
})
	*/


//自动机器每tick触发的函数
/*
global.botTick = function (entity,percent,cdmodify) {
	let level=entity.getLevel();
	let server=level.getServer();
	let pos=entity.getBlockPos().above();
	//如果上方不是柜台，跳过所有逻辑
	if(level.getBlock(pos)!="kubejs:counter"){
		return;
	}
	let nomake=false;
	let nosell=false;
	for(let i=0;i<54;i++){
		let stack=entity.inventory.getStackInSlot(i)
		if(stack=="kubejs:punched_card_make"){
			nomake=true
		}
		if(stack=="kubejs:punched_card_sell"){
			nosell=true
		}
	}
	let cd=entity.persistentData.getInt("cd")
	if(cd>1){
		entity.persistentData.putInt("cd",cd-1);
		return;
	}
	entity.persistentData.putInt("cd",cdmodify);
	//寻找顾客

	let counter=level.getBlockEntity(pos)
	let rng = new AABB.of(pos.getX()-12, pos.getY(), pos.getZ()+1, pos.getX()+12, pos.getY()+1, pos.getZ()+2);
    let entityList = level.getEntitiesWithin(rng);
	for(let i=0;i<entityList.length;i++){
		let customer = entityList[i];
		let phase=customer.persistentData.getInt("customerPhase")
		//如果有合适的顾客，则尝试完成其订单
		if (phase==2||phase==3){
			customer.persistentData.putInt("customerPhase",3)
			let order=customer.persistentData.getString("customerOrder").split(",")
			let block=level.getBlock(pos.above())
			if(block=="some_assembly_required:sandwich"){
				let sandwichbe=level.getBlockEntity(pos.above())
				let sandwichbuilt=Item.of('some_assembly_required:sandwich')
				sandwichbe.saveToItem(sandwichbuilt)
				let builtlist=sandwichbuilt.nbt?.BlockEntityTag?.Sandwich
				for(let j=0;j<order.length;j++){
					let ingredient=global.ingredients[order[j]]?.id
					if(j==builtlist.length){
						if(!nomake){
							for(let i=0;i<54;i++){
								let stack=entity.inventory.getStackInSlot(i)
								if(stack==global.ingredients[order[j]]?.id){
									server.runCommandSilent(`data modify block ${pos.getX()} ${pos.getY()+1} ${pos.getZ()} Sandwich append value {id:"${global.ingredients[order[j]]?.id}",Count:1b}`)
									server.runCommandSilent(`playsound some_assembly_required:block.sandwich.add_item.generic block @a ${pos.getX()} ${pos.getY()+1} ${pos.getZ()}`)
									level.getBlockEntity(pos.above()).updateHeight()
									if($ingredients.hasContainer(stack)){
										entity.inventory.insertItem($ingredients.getContainer(stack).copy(),false)
									}
									stack.shrink(1)
									return;
								}
							}
						}
						return;
					}
					if(builtlist[j].id!=ingredient){
						for(let i=0;i<builtlist.length;i++){
							if(!$ingredients.hasContainer(Item.of(builtlist[i].id))){
								entity.inventory.insertItem(Item.of(builtlist[i].id),false)
							}
						}
						server.runCommandSilent(`setblock ${pos.getX()} ${pos.getY()+1} ${pos.getZ()} air`)
						return;
					}
				}
				if(nosell)return;
				server.runCommandSilent(`setblock ${pos.getX()} ${pos.getY()+1} ${pos.getZ()} air`)
				let reputation=counter.persistentData.getInt("reputation");
				let amount=(burgerPrice(order))*(1+0.2*reputationLevel(reputation))*percent
				reputation+=genReputation(order,reputation)*percent
				counter.persistentData.putInt("reputation",Math.floor(reputation))
				if(amount>=10000){
					entity.inventory.insertItem(Item.of('kubejs:netherite_coin').withCount(parseInt(amount/10000)), false);
					amount=amount % 10000
				}
				if(amount>=1000){
					entity.inventory.insertItem(Item.of('kubejs:diamond_coin').withCount(parseInt(amount/1000)), false);
					amount=amount % 1000
				}
				if(amount>=100){
					entity.inventory.insertItem(Item.of('kubejs:gold_coin').withCount(parseInt(amount/100)), false);
					amount=amount % 100
				}
				if(amount>=10){
					entity.inventory.insertItem(Item.of('kubejs:iron_coin').withCount(parseInt(amount/10)), false);
					amount=amount % 10
				}
				if(amount>=1){
					entity.inventory.insertItem(Item.of('kubejs:copper_coin').withCount(parseInt(amount)), false);
				}
				customer.persistentData.putInt("customerPhase",4)
				customer.setPositionAndRotation(customer.x,customer.y,customer.z,90,0)
				server.runCommandSilent("/execute as "+customer.uuid.toString()+" at @s run tp @s ~ ~ ~ ~ ~")
				return;
			}
			else if(block=="minecraft:air"&&!nomake){
				for(let i=0;i<54;i++){
					let stack=entity.inventory.getStackInSlot(i)
					if(stack==global.ingredients[order[0]]?.id){
						server.runCommandSilent(`setblock ${pos.getX()} ${pos.getY()+1} ${pos.getZ()} some_assembly_required:sandwich{Sandwich:[{id:"${global.ingredients[order[0]]?.id}",Count:1b}]}`)
						server.runCommandSilent(`playsound some_assembly_required:block.sandwich.add_item.generic block @a ${pos.getX()} ${pos.getY()+1} ${pos.getZ()}`)
						stack.shrink(1)
						return;
					}
				}
				return;
			}
			else{
				return;
			}
		}
	}
}
	*/