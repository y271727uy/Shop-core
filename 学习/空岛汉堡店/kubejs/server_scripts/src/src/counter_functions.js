// priority : 114514
//随机数函数
function randomInt(min,max){
	return Math.floor(Math.random()*(max-min+1)+min);
}
//声望等级判定函数
//由声望值判定声望等级
function reputationLevel(reputation){
	for(let i=1;i<=100;i++){
		if((((50+50*i)*i)/2)>reputation){
			return i-1;
		}
	}
	return 100;
}
//声望字符串生成函数
//由声望值生成声望字符串
//废弃
function reputationString(reputation){
	let replevel=reputationLevel(reputation);
	return "(声望"+replevel+"级："+(reputation-(((50+50*replevel)*replevel)/2))+"/"+((replevel+1)*50)+")";
}
//Text.of的list
function reputationList(reputation,color){
	let replevel=reputationLevel(reputation);
	return [Text.translate("message.kubejs.repstr.1").color(color),Text.of((replevel).toString()).color(color),
		Text.translate("message.kubejs.repstr.2").color(color),Text.of((reputation-(((50+50*replevel)*replevel)/2)).toString()).color(color),
		Text.translate("message.kubejs.repstr.3").color(color),Text.of(((replevel+1)*50).toString()).color(color),
		Text.translate("message.kubejs.repstr.4").color(color)]
}
//由汉堡计算声望影响权重
//后续章节的材料声望影响更大
function genReputation(burger,reputation){
	let trend=getTrend()
	let rep=0;
	//let replevel=reputationLevel(reputation)
	for(let i=0;i<burger.length;i++){
		let ingredient=global.ingredients[burger[i]]
		//if(replevel<25){
		//	if(replevel>=ingredient.chapter*5){
		//		continue;
		//	}
		//}
		if(trend[1]==ingredient.type)continue;
		if(trend[0]==ingredient.type)rep+=1+Math.floor(ingredient.chapter/2)
		rep+=1+Math.floor(ingredient.chapter/2)
		//console.log(global.ingredients[burger[i]].chapter)
		//console.log(rep)
	}
	return rep;
	
}
function genPizzaReputation(pizza,reputation){
	let trend=getTrend()
	let rep=0;
	let replevel=reputationLevel(reputation)
	for(let i=0;i<pizza.length;i++){
		let ingredient=global.ingredients[pizza[i]]
		if(replevel<25){
			if(replevel>=ingredient.chapter*5){
				continue;
			}
		}
		if((trend[1]-4)==ingredient.pizzatype)continue;
		if((trend[0]-4)==ingredient.pizzatype)rep+=3+Math.floor(ingredient.chapter/2)
		rep+=3+Math.floor(ingredient.chapter/2)
		//console.log(global.ingredients[burger[i]].chapter)
		//console.log(rep)
	}
	return rep;
	
}
//比较两个汉堡列表
//某一种材料多一个/少一个扣四分
//某一层位置错误扣一分
//总分为总层数的五倍
//也就是材料占80%，位置占20%
/*
function compareBurgers(burger1,burger2){
	let compare=[];
	let cnt=0;
	let siz=Math.max(burger1.length,burger2.length)
	for(let i=0;i<siz;i++){
		if(burger1[i]!=null){
			compare[burger1[i]]=(compare[burger1[i]]??0)+4;
		}
		if(burger2[i]!=null){
			compare[burger1[i]]=(compare[burger2[i]]??0)-4;
		}
		if(burger1[i]!=burger2[i]){
			cnt+=1
		}
	}
	for(let i=0;i<compare.length;i++){
		if(compare[i]!=undefined&&compare[i]!=0){
			cnt+=Math.abs(compare[i])
		}
	}
	let cntnt=5*(Math.min(burger1.length,burger2.length))
	return (cntnt-cnt)/cntnt;
}
	*/
//比较两个汉堡列表
//改成以下逻辑：
//错误严重性：缺少汉堡顶 > 缺少某种食材 > 多某种食材 >= 食材顺序不一样 > 完美
//每种食材遵循以下规则得分：
// |   状态   | 缺失 | 少料 | 多料 | 正好 |
// | 位置正确 |  -5  |  -3  |  -1  |  0  |
// | 位置错误 |  -5  | -3-1 | -1-1 | 0-1 |
//汉堡顶额外加一条规则：若汉堡顶存在但不在顶部，"不缺料"分-3
// burger1是交付的汉堡，burger2是订单
// 转换函数，返回转换好的burgerMap，键是各个材料名字，值是数量和底下材料的名字
function convertToBurgerMap(burger) {
	let burgerMap = new Map();
	for (let i=0; i<burger.length; i++) {
		let current = burger[i]; // 当前正在查找的汉堡材料
		let belowLayer = burger[i - 1] || null; // 当前材料底下的材料
		if (!burgerMap.has(current)) {
			burgerMap.set(current, { count: 0, below: new Set() });
		}
		burgerMap.get(current).count++; // 层数++
		if (belowLayer !== null) { // 如果底下有材料，则记录这个材料
			burgerMap.get(current).below.add(belowLayer);
		}
		//player.tell("burgerMap<" + current + ">: " + burgerMap.get(current).count + ", below: " + Array.from(burgerMap.get(current).below).join(", "))
	}
	return burgerMap
}
function compareBurgers(burger1, burger2){
	// 总分
	burger1=burger1.join().split(",")
	burger2=burger2.join().split(",")
	let totalScore = 5*Math.min(burger2.length, burger1.length) + 5; // 汉堡底的分数是必得的
	let wrongAmountPanal = 0;
	let wrongLayoutPanal = 0;
	let lackLayerPanal = 0;
	//player.tell("totalScore: "+totalScore)
	
	let burger1Map = convertToBurgerMap(burger1);
	// player.tell("burger1Map content:");
    // for (let [key, value] of burger1Map) {
    //     player.tell("burger1Map<" + key + ">: count=" + value.count + ", below=" + Array.from(value.below).join(", "));
    // }
	let burger2Map = convertToBurgerMap(burger2);
	// player.tell("burger2Map content:");
    // for (let [key, value] of burger2Map) {
    //     player.tell("burger2Map<" + key + ">: count=" + value.count + ", below=" + Array.from(value.below).join(", "));
    // }

	/* "不缺料"分 */
	for (let i=0; i<burger2.length; i++) {
		if (!burger1.includes(burger2[i])) { // 检查是否存在
			lackLayerPanal += 5;
		}
		if (i === burger2.length - 1 && burger1[burger1.length - 1] != burger2[burger2.length - 1]) {
            // 当i指向最后一个（即汉堡顶），且不同时（即汉堡顶不在最顶上），即使找到了也要扣"不缺料"分
            // 当然，如果汉堡顶本身就没放上去，"不缺料"分已经扣掉了就不能重复扣了
            if (burger1.includes(burger2[i])) {
                lackLayerPanal += 3;
            }
        }
	}
	//player.tell("lackLayerPanal: "+lackLayerPanal)
	/* "份量正好"分 */
	for (let [burger2Key, burger2Value] of burger2Map) {
		if (burger1Map.has(burger2Key)) { // 订单中要求的材料存在于要交付的汉堡中
			let burger1Value = burger1Map.get(burger2Key);
			if (burger1Value.count > burger2Value.count) { // 材料数量过多
				wrongAmountPanal+=1;
			} else if (burger1Value.count < burger2Value.count) { // 材料数量过少
				wrongAmountPanal+=3;
			}
		} // 不存在的情况不由此处处理
	}
	//player.tell("wrongAmountPanal: "+wrongAmountPanal)

	/* "位置正确"分 */
	// 位置正确的判定依据是：先找出订单中每种材料与其底下的材料的材料所形成的上下关系，然后在交付的汉堡中检测这个关系是否存在。（若有多种上下关系，存在一种就够）
	// 简单来说假如订单是[底<-牛肉饼<-牛肉饼<-芝士<-顶]，那么检验的就是牛肉饼的[{底or牛肉饼}<-牛肉饼]、芝士的[牛肉饼<-芝士]这两个关系
	// 假如交付的是[底<芝士<牛肉饼<牛肉饼<顶]，那么此时因符合[牛肉饼<-牛肉饼]这一个关系而得到牛肉饼的"位置正确"分，而失去芝士[牛肉饼<-芝士]的"位置正确"分
	for (let [burger2Key, burger2Value] of burger2Map) {
		if (burger1Map.has(burger2Key)) { // 订单中要求的材料存在于要交付的汉堡中
			let burger1Value = burger1Map.get(burger2Key);
			let hasSharedBelowLayer = false;
			// 特殊处理最底层的材料
            if (burger1Value.below.size === 0 && burger2Value.below.size === 0) {
                hasSharedBelowLayer = true;
            } else {
				for (let belowLayer of burger2Value.below) { // 检测双方的below集合中是否有同样的元素
					if (burger1Value.below.has(belowLayer)) {
						hasSharedBelowLayer = true;
						break;
					}
				}
			}
			//player.tell("Checking below layers for " + burger2Key + ": " + hasSharedBelowLayer);
			if (!hasSharedBelowLayer) { // 没有任何同样的元素才视作判定失败，位置不正确
				wrongLayoutPanal+=1;
			}
		} // 不存在的情况不由此处处理
	}
	//player.tell("wrongLayoutPanal: "+wrongLayoutPanal)
	//console.log([totalScore,wrongAmountPanal,wrongLayoutPanal,lackLayerPanal].join())
	let ratio = Math.max((totalScore-wrongAmountPanal-wrongLayoutPanal-lackLayerPanal)/totalScore, 0)
	return ratio;
}
function convertTopizzaMap(pizza) {
	let pizzaMap = new Map();
	for (let i=0; i<pizza.length; i++) {
		let current = pizza[i]; // 当前正在查找的汉堡材料
		let belowLayer = pizza[i - 1] || null; // 当前材料底下的材料
		if (!pizzaMap.has(current)) {
			pizzaMap.set(current, { count: 0, below: new Set() });
		}
		pizzaMap.get(current).count++; // 层数++
		if (belowLayer !== null) { // 如果底下有材料，则记录这个材料
			pizzaMap.get(current).below.add(belowLayer);
		}
		//player.tell("pizzaMap<" + current + ">: " + pizzaMap.get(current).count + ", below: " + Array.from(pizzaMap.get(current).below).join(", "))
	}
	return pizzaMap
}
function comparePizzas(pizza1,pizza2){
	pizza1=pizza1.join().split(",")
	pizza2=pizza2.join().split(",")
	let totalScore = 5*Math.min(pizza2.length, pizza1.length) + 5; // 汉堡底的分数是必得的
	let wrongAmountPanal = 0;
	let wrongLayoutPanal = 0;
	let lackLayerPanal = 0;
	//player.tell("totalScore: "+totalScore)
	// 转换函数，返回转换好的pizzaMap，键是各个材料名字，值是数量和底下材料的名字
	
	let pizza1Map = convertTopizzaMap(pizza1);
	// player.tell("pizza1Map content:");
    // for (let [key, value] of pizza1Map) {
    //     player.tell("pizza1Map<" + key + ">: count=" + value.count + ", below=" + Array.from(value.below).join(", "));
    // }
	let pizza2Map = convertTopizzaMap(pizza2);
	// player.tell("pizza2Map content:");
    // for (let [key, value] of pizza2Map) {
    //     player.tell("pizza2Map<" + key + ">: count=" + value.count + ", below=" + Array.from(value.below).join(", "));
    // }

	/* "不缺料"分 */
	for (let i=0; i<pizza2.length; i++) {
		if (!pizza1.includes(pizza2[i])) { // 检查是否存在
			lackLayerPanal += 5;
		}
		if (i === 1 && pizza1[1] != pizza2[1]) {
            // 当i指向最后一个（即汉堡顶），且不同时（即汉堡顶不在最顶上），即使找到了也要扣"不缺料"分
            // 当然，如果汉堡顶本身就没放上去，"不缺料"分已经扣掉了就不能重复扣了
            if (pizza1.includes(pizza2[i])) {
                lackLayerPanal += 3;
            }
        }
	}
	//player.tell("lackLayerPanal: "+lackLayerPanal)
	/* "份量正好"分 */
	for (let [pizza2Key, pizza2Value] of pizza2Map) {
		if (pizza1Map.has(pizza2Key)) { // 订单中要求的材料存在于要交付的汉堡中
			let pizza1Value = pizza1Map.get(pizza2Key);
			if (pizza1Value.count > pizza2Value.count) { // 材料数量过多
				wrongAmountPanal+=1;
			} else if (pizza1Value.count < pizza2Value.count) { // 材料数量过少
				wrongAmountPanal+=3;
			}
		} // 不存在的情况不由此处处理
	}
	//player.tell("wrongAmountPanal: "+wrongAmountPanal)

	/* "位置正确"分 */
	// 位置正确的判定依据是：先找出订单中每种材料与其底下的材料的材料所形成的上下关系，然后在交付的汉堡中检测这个关系是否存在。（若有多种上下关系，存在一种就够）
	// 简单来说假如订单是[底<-牛肉饼<-牛肉饼<-芝士<-顶]，那么检验的就是牛肉饼的[{底or牛肉饼}<-牛肉饼]、芝士的[牛肉饼<-芝士]这两个关系
	// 假如交付的是[底<芝士<牛肉饼<牛肉饼<顶]，那么此时因符合[牛肉饼<-牛肉饼]这一个关系而得到牛肉饼的"位置正确"分，而失去芝士[牛肉饼<-芝士]的"位置正确"分
	for (let [pizza2Key, pizza2Value] of pizza2Map) {
		if (pizza1Map.has(pizza2Key)) { // 订单中要求的材料存在于要交付的汉堡中
			let pizza1Value = pizza1Map.get(pizza2Key);
			let hasSharedBelowLayer = false;
			// 特殊处理最底层的材料
            if (pizza1Value.below.size === 0 && pizza2Value.below.size === 0) {
                hasSharedBelowLayer = true;
            } else {
				for (let belowLayer of pizza2Value.below) { // 检测双方的below集合中是否有同样的元素
					if (pizza1Value.below.has(belowLayer)) {
						hasSharedBelowLayer = true;
						break;
					}
				}
			}
			//player.tell("Checking below layers for " + pizza2Key + ": " + hasSharedBelowLayer);
			if (!hasSharedBelowLayer) { // 没有任何同样的元素才视作判定失败，位置不正确
				wrongLayoutPanal+=1;
			}
		} // 不存在的情况不由此处处理
	}
	//player.tell("wrongLayoutPanal: "+wrongLayoutPanal)
	
	let ratio = Math.max((totalScore-wrongAmountPanal-wrongLayoutPanal-lackLayerPanal)/totalScore, 0)
	return ratio;
}
//计算汉堡价格
function burgerPrice(burger){
	let trend=getTrend()
	let uniset=new Set();
	let price=0;
	let uniprice=0;
	for(let i=0;i<burger.length;i++){
        let ingredient=global.ingredients[burger[i]]
		let trendmod=1;
        if(isNaN(ingredient.type))continue;
		if(trend[0]==ingredient.type)trendmod=2;
		price+=ingredient.price*trendmod
		if(!uniset.has(burger[i])){
			uniset.add(burger[i])
			uniprice+=ingredient.extraprice*trendmod
		}
	}
	price+=uniprice*uniset.size
	return price;
}

function pizzaPrice(pizza){
	let trend=getTrend()
	let price=0;
	let uniprice=0;
    let multiplier=1.0;
	for(let i=0;i<pizza.length;i++){
        let ingredient=global.ingredients[pizza[i]]
		let trendmod=1;
        if(isNaN(ingredient.type))continue;
        if(ingredient.type==3)continue;
		if((trend[0]-4)==ingredient.pizzatype)trendmod=2;
        if(ingredient.type==0){
            multiplier=Math.max(multiplier,ingredient.pizzabase)
        }
		price+=ingredient.price*trendmod;
        uniprice+=ingredient.extraprice*trendmod;
	}
	price+=uniprice*pizza.length;
    price*=multiplier;
	return price;
}


//给玩家特定数额的钱
function payMoney(player,amount){
	if(amount>=10000){
		player.give(Item.of('kubejs:netherite_coin').withCount(parseInt(amount/10000)))
		amount=amount % 10000
	}
	if(amount>=1000){
		player.give(Item.of('kubejs:diamond_coin').withCount(parseInt(amount/1000)))
		amount=amount % 1000
	}
	if(amount>=100){
		player.give(Item.of('kubejs:gold_coin').withCount(parseInt(amount/100)))
		amount=amount % 100
	}
	if(amount>=10){
		player.give(Item.of('kubejs:iron_coin').withCount(parseInt(amount/10)))
		amount=amount % 10
	}
	if(amount>=1){
		player.give(Item.of('kubejs:copper_coin').withCount(parseInt(amount)))
	}
}
function insertMoney(inventory,amount){
    if(amount>=10000){
        inventory.insertItem(Item.of('kubejs:netherite_coin').withCount(parseInt(amount/10000)), false);
        amount=amount % 10000
    }
    if(amount>=1000){
        inventory.insertItem(Item.of('kubejs:diamond_coin').withCount(parseInt(amount/1000)), false);
        amount=amount % 1000
    }
    if(amount>=100){
        inventory.insertItem(Item.of('kubejs:gold_coin').withCount(parseInt(amount/100)), false);
        amount=amount % 100
    }
    if(amount>=10){
        inventory.insertItem(Item.of('kubejs:iron_coin').withCount(parseInt(amount/10)), false);
        amount=amount % 10
    }
    if(amount>=1){
        inventory.insertItem(Item.of('kubejs:copper_coin').withCount(parseInt(amount)), false);
    }
}
//通过菜单随机创建订单
//创建的逻辑FTB任务里面有具体介绍
function createRandomOrder(menu){
	let order = new Array();
	let breadlist = new Array();
	//寻找成对的面包
	for(let i=0;i<menu.length;i++){
		let ing=global.ingredients[menu[i]]
		//if(menu[i]==70)console.log(menu.includes(ing.bottom.toString()))
		if(ing.type==0&&menu.includes(ing.bottom.toString())){
			breadlist.push(menu[i]);
		}
	}
	
	if(breadlist.length==0){breadlist.push(1)}
	//随机选择面包
	let bread=breadlist[randomInt(0,breadlist.length-1)]
	
	order.push(global.ingredients[bread].bottom);
	let types = [false,false,false,false,false];
	let unfinished = true;
	while(unfinished){
		let newitem=menu[randomInt(0,menu.length-1)]
		//console.log([newitem])
		if(global.ingredients[newitem].type==0){
			continue;
		}
		if(order.includes(newitem)&&Math.random()<0.5){
			unfinished=false;
		}
		order.push(newitem)
		if(types[global.ingredients[newitem].type]){
			if(global.ingredients[newitem].favor<Math.random()){
				unfinished=false
			}
		}
		if(order.length>=14){unfinished=false}
		types[global.ingredients[newitem].type]=true;
	}
	order.push(bread);
	return order.join();
}
function createRandomPizza(menu){
	let material=[[],[],[],[]]
	for(let i=0;i<menu.length;i++){
		let ing=global.ingredients[menu[i]]
		if(ing.pizzatype!=null){material[ing.pizzatype].push(menu[i])}
	}
	let order=[];
	order.push(83);
	order.push(material[0][randomInt(0,material[0].length-1)]);
	for(let i=0;i<8;i++){
		let randoming=material[i%2+1][randomInt(0,material[i%2+1].length-1)]
		if(order.includes(randoming))break;
		order.push(randoming);
	}
	return order.join()
}

function filtertomenu(items){
	let newmenu=[];
	for(let i=0;i<items.length;i++){
		if(items[i].id=='create:filter'){
			let cmenu=filtertomenu(items[i].tag?.Items?.Items);
			for(let j=0;j<cmenu.length;j++){
				if(newmenu.includes(cmenu[j])){continue;}
				newmenu.push(cmenu[j])
			}
		}
		if(items[i].id in global.ingredients){
			let newid=global.ingredients[items[i].id];
			if(newmenu.includes(newid)){continue;}
			newmenu.push(newid)
		}
	}
	return newmenu;
}

function orderstring(orderstr){
    let order=orderstr.split(",")
    let orderstring="{displayData:["
    orderstring+=orderstr
    orderstring+="],Pages:[{Entries:["
    for(let i=order.length-1;i>=0;i--){
        orderstring+=('{Checked:0b,Text:\'{"text":"'+Item.of(global.ingredients[order[i]].id).getDisplayName().	getString()+'"}\'}')
        if(i!=0){
            orderstring+=","
        }
    }
    orderstring+=']}],Type:1,PreviouslyOpenedPage:0}'
    return orderstring
}

function customerreaction(score,player,level,entity,customer,repvalue,money){
    let combo=player.persistentData.getInt("combos")
    let reputation=entity.persistentData.getInt("reputation");
	let replevel=reputationLevel(reputation)
	let menu=entity.persistentData.getString("menu").split(",")
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
    if(score==100){
        player.persistentData.putLong("comboTimeStamp",Date.now())
        player.persistentData.putInt("combos",combo+1)
        global.drawcombo(player,Date.now())
    }
    else{
        player.persistentData.putLong("comboTimeStamp",0)
        player.persistentData.putInt("combos",0)
    }
	if(menurequired){
		if(!player.persistentData.getInt("firstrepblock")){
			player.persistentData.putInt("firstrepblock",1)
			player.persistentData.putInt("rumiadialogue",10030001)
            player.persistentData.putInt("dialoguestage",0)
		}
	}
    if(score==100){
        if(!menurequired){
			reputation+=Math.floor(repvalue*(1+0.1*combo))
			player.setStatusMessage([Text.translate("message.kubejs.customer.very_happy").green()].concat(reputationList(reputation,"WHITE")).concat([Text.of(` §a+${Math.floor(repvalue*(1+0.1*combo))} §e+${Math.floor(money)}C`)]))
        	//player.setStatusMessage(`§a顾客非常满意！§f${reputationString(reputation)} §a+${Math.floor(repvalue*(1+0.1*combo))} §e+${Math.floor(money)}C`)
		}
		else{
			player.setStatusMessage([Text.translate("message.kubejs.customer.very_happy").green(),Text.translate("message.kubejs.customer.bad_menu").red()].concat(reputationList(reputation,"WHITE")).concat([Text.of(` §e+${Math.floor(money)}C`)]))
			//player.setStatusMessage(`§a顾客非常满意！ §c请扩展新章节菜单以继续提升声望。 §e+${Math.floor(money)}C`)
		}
		level.spawnParticles("minecraft:happy_villager",false,customer.x,customer.y+1,customer.z,0.3,1,0.3,50,0);
    }
    else if(score>=75){
        if(!menurequired){
			reputation+=repvalue
			player.setStatusMessage([Text.translate("message.kubejs.customer.happy").green()].concat(reputationList(reputation,"WHITE")).concat([Text.of(` §a+${repvalue} §e+${Math.floor(money)}C`)]))
        	//player.setStatusMessage(`§a顾客还算满意。§f${reputationString(reputation)} §a+${repvalue} §e+${Math.floor(money)}C`)
		}
		else{
			player.setStatusMessage([Text.translate("message.kubejs.customer.happy").green(),Text.translate("message.kubejs.customer.bad_menu").red()].concat(reputationList(reputation,"WHITE")).concat([Text.of(` §e+${Math.floor(money)}C`)]))
			//player.setStatusMessage(`§a顾客还算满意。 §c请扩展新章节菜单以继续提升声望。 §e+${Math.floor(money)}C`)
		}
		level.spawnParticles("minecraft:wax_off",false,customer.x,customer.y+1,customer.z,0.3,1,0.3,50,0);
    }
    else if(score>=50){
		player.setStatusMessage([Text.translate("message.kubejs.customer.neutral").red()].concat(reputationList(reputation,"WHITE")).concat([Text.of(` §e+${Math.floor(money)}C`)]))
		//player.setStatusMessage(`§c顾客不是很满意……§f${reputationString(reputation)} §e+${Math.floor(money)}C`)
        level.spawnParticles("minecraft:smoke",false,customer.x,customer.y+1,customer.z,0.3,1,0.3,50,0);
    }
    else if(score>0){
        reputation=Math.max(reputation-repvalue,0)
		player.setStatusMessage([Text.translate("message.kubejs.customer.mad").red()].concat(reputationList(reputation,"WHITE")).concat([Text.of(` §c-${repvalue} §e+${Math.floor(money)}C`)]))
        //player.setStatusMessage(`§c顾客非常生气……§f${reputationString(reputation)} §c-${repvalue} §e+${Math.floor(money)}C`)
		level.spawnParticles("minecraft:smoke",false,customer.x,customer.y+1,customer.z,0.3,1,0.3,50,0);
    }
    else{
        reputation=Math.max(reputation-repvalue*2,0)
		player.setStatusMessage([Text.translate("message.kubejs.customer.very_mad").red()].concat(reputationList(reputation,"WHITE")).concat([Text.of(` §c-${repvalue*2} §e+${Math.floor(money)}C`)]))
        //player.setStatusMessage(`§c顾客气疯了！§f${reputationString(reputation)} §c-${repvalue*2} §e+${Math.floor(money)}C`)
		level.spawnParticles("minecraft:angry_villager",false,customer.x,customer.y+1,customer.z,0.3,1,0.3,20,0);
        /*
        entity.persistentData.putInt("reputation",reputation)
        customer.persistentData.putInt("customerPhase",0)
        //本来这里顾客会直接从顾客变成普通实体然后真人快打玩家的
        //但是不知道为啥easynpc的“攻击玩家”目标有几率不生效
        customer.mergeNbt('{EntityAttribute:{IsAttackable:1b},ObjectiveData:{HasTravelTarget:0b,ObjectiveDataSet:[{Type:"MELEE_ATTACK",Prio:2},{Type:"ATTACK_PLAYER",Prio:2}],HasObjectives:1b}}')
        customer.setNoAi(false);
        return;
        */
    }
    entity.persistentData.putInt("reputation",reputation)
}

const customerVarients=["ALEX","ARI","EFE","KAI","MAKENA","NOOR","STEVE","SUNNY","ZURI"]
const customerNames=["Alex","Ari","Efe","Kai","Makena","Noor","Steve","Sunny","Zuri"]
function spawncustomer(be){
    let pos=be.getBlockPos()
    let menu=be.persistentData.getString("menu").split(",")
    let level=be.getLevel()
    let newCustomer=level.createEntity("easy_npc:humanoid")
	if(menu.includes("83")){
		newCustomer.setPositionAndRotation(pos.getX()+8,pos.getY(),pos.getZ()+2.5,90.0,0.0)
		level.spawnParticles("minecraft:poof",false,pos.getX()+8,pos.getY()+1,pos.getZ()+2.5,0.5,1,0.5,50,0);	
		newCustomer.spawn()
		newCustomer.persistentData.putString("customerOrder",createRandomPizza(menu))
		newCustomer.persistentData.putInt("customerPhase",5.0)
	}
	else{
		newCustomer.setPositionAndRotation(pos.getX()+8,pos.getY(),pos.getZ()+1.5,90.0,0.0)
		level.spawnParticles("minecraft:poof",false,pos.getX()+8,pos.getY()+1,pos.getZ()+1.5,0.5,1,0.5,50,0);	
		newCustomer.spawn()
		newCustomer.persistentData.putString("customerOrder",createRandomOrder(menu))
		newCustomer.persistentData.putInt("customerPhase",1.0)
	}
	level.getServer().runCommandSilent("/execute as "+newCustomer.uuid.toString()+" at @s run tp @s ~ ~ ~ ~ ~")
	let variant=randomInt(0,customerVarients.length-1)
	newCustomer.mergeNbt({Variant:customerVarients[variant]})
	newCustomer.setCustomName(Text.of(customerNames[variant]))
	//let SkinUUID='[I;170627784,-716491044,-1823310331,1309155084]'
	//newCustomer.mergeNbt(`{SkinData:{SkinUUID:${SkinUUID},SkinType:"CUSTOM",Skin:""}}`)
	newCustomer.setNoAi(true)
	if(Math.random()<0.1){
		specialcustomerattempt(be,newCustomer)
	}
}
const randomStr="E6IFIKHI?EK67K92FH=@CI0>?D1FD=2E0D@3;JD>7?7>F?C4<2L:2763GBC5K:?JBH7@2J;=HBC>IFHEA@E?98IC6K@FB9HI:8G=<:G>;F5KJDA3MG156EL>;FGEM4AM4D8M=<G1?1:@?B4K>JA;?1H;F@I7HE7@L;5G0@ICKLDH?2B3@F@>F;<=IB@>J?:FDBFKMDJ=76?LCJCAK27B7ECMDF;9=4?IE9LFG90AE5BG@0JK18MCDJ91AG3FE62HLM96@3G@FJ5B46F6;JMK:8D8DK;48A4D:?B81LJHK3B=1FH834@EDI<M:J1M52LE90L<7C71896A54GDJ;9<0=J4K<J45G52B9>GM712K4D3>C>81K9?<:H=F57>GM6C2>6JD15F=L;=L@<5>AB274IJ?1A@4?42;G52D5H1=LHE1;4LD9@924<MF9D?4?0M?0587=B4LH0M<B8IE@:6F9M9?EI=H3M?3ACL@6FLI6E3;A=8<8H=5G80C9DJ4E23>=L>:C@FH:DFL5>7D4FAIB9DF976E85M2KHADC10KEJ>ED;CA@M2K<>AIE<5B2<CL=?=A1968DAJ@2F0C=J409676F@?3MJIH4L>JLK265398?@31BGE2B0G=?<4>7GH94HM6B3I7D2FD@L46>HLB27F=8L1GBCI0B:8C17@0@FLC0K6A5J0=AI9>4D>9509B?3;5LGA8@2L1M=C0:J<0HKC0L=1;M>;J8CFB0MEG;D=C@=H?M;B4743GMC4L>146IJ9K;J;><1;D93ADC2<BHB2E6=30<G;E3>;GJ9F@:FMF209G;EB<?6M1GL2D@=MAFJK5>IB6ACG>ID:G6M1:J?B7IB5A2GI64B;4>K1>I1@E;4KEG28<>581L>;<2=A><=JF3505E>5?;F7=KF2>;G?D4<=8701A0M67G84HJGHI:;J2651:;G4=>12591:JKHCI7HDF5MD?:51AK971MCB@C?7AMK:;@=J7K7>L@983F:6FH92EI<47:=H1GBMB>DC2?F;K6I9E;4AF?4<IJ:@2:5L=17GK8JHC;1@<G@;1575H?ECBA:719>CGM=;JLH87B647>:8J@?32A;FG<?:?F4LA9H3A=DIA;M:80>3><A86M:=6>4E;=6LEI3MBLM;4D=3K<D0A70E9;G;>M7A:1JLG9HF2?DIG<08ECE:5A8G1G2:EA9@8>AK=4246?=KGB8L7>@6G3?IH9GDKI=>CE6C19L8A6CB>;64@M:=6<3D>:GF9D?7@:JMCB?EJ3H>M7HFG1KJC9B?:D373D1AJ>2EF30DBIJM7CF0DADJ0A5H>G3G21:2HI@=B<52JB5ELAHBA4>FJG0HEM4=8B=JL@1@JK<J6D<=1AIJ5:5>6J@284@8M46:I=;B4@129FK6@987GD;8CE4?B9HMDJ:651:EB1D5D5?7HJ>4CGF81LDE?M9GB"
const strMap=["0","1","2","3","4","5","6","7","8","9",":",";","<","=",">","?","@","A","B","C","D","E","F","G","H","I","J","K","L","M"]
function getTrend(){
	let number=strMap.indexOf(randomStr[parseInt(Date.now()/(1000*3600*6))%1461])
	//for(let number=0;number<30;number++){
	let num1=(parseInt(number/5)+1)
	let num2=(number%5+1)
	if(num1<=num2)num2+=1;
	//console.log([num1,num2].join())
	return [num1,num2]
	//}
}