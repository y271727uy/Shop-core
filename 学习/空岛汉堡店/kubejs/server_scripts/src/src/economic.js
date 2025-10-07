ItemEvents.rightClicked('kubejs:mini_banker', event => {
    let player = event.player;
    let item = event.item;
    if (event.getHand() == "off_hand") {
		if(player.isShiftKeyDown()){
			let inv = player.inventory.items
			let count = 0
			for(let i=0;i<inv.length;i++){
				let coincount = inv[i].getCount()
				switch(inv[i].getItem().toString()){
					case 'copper_coin':
						count+=coincount
						inv[i].shrink(coincount);
						break;
					case 'iron_coin':
						count+=coincount*10
						inv[i].shrink(coincount);
						break;
					case 'gold_coin':
						count+=coincount*100
						inv[i].shrink(coincount);
						break;
					case 'diamond_coin':
						count+=coincount*1000
						inv[i].shrink(coincount);
						break;
				}
			}
			if(count>=10000){
				player.give(Item.of('kubejs:netherite_coin').withCount(parseInt(count/10000)))
				count=count % 10000
			}
			if(count>=1000){
				player.give(Item.of('kubejs:diamond_coin').withCount(parseInt(count/1000)))
				count=count % 1000
			}
			if(count>=100){
				player.give(Item.of('kubejs:gold_coin').withCount(parseInt(count/100)))
				count=count % 100
			}
			if(count>=10){
				player.give(Item.of('kubejs:iron_coin').withCount(parseInt(count/10)))
				count=count % 10
			}
			if(count>=1){
				player.give(Item.of('kubejs:copper_coin').withCount(count))
			}
		}
		else{
			let coin = player.getMainHandItem();
			let count = parseInt(coin.getCount()/10);
			switch(coin.getItem().toString()){
				case 'copper_coin':
					player.give(Item.of('kubejs:iron_coin').withCount(count))
					coin.shrink(count*10);
					break;
				case 'iron_coin':
					player.give(Item.of('kubejs:gold_coin').withCount(count))
					coin.shrink(count*10);
					break;
				case 'gold_coin':
					player.give(Item.of('kubejs:diamond_coin').withCount(count))
					coin.shrink(count*10);
					break;
				case 'diamond_coin':
					player.give(Item.of('kubejs:netherite_coin').withCount(count))
					coin.shrink(count*10);
					break;
			}
		}
    } else {
       let coin = player.getOffHandItem();
	   if(player.isShiftKeyDown()){
		   let count = coin.getCount();
		   switch(coin.getItem().toString()){
				case 'iron_coin':
					player.give(Item.of('kubejs:copper_coin').withCount(count*10))
					coin.shrink(count);
					break;
				case 'gold_coin':
					player.give(Item.of('kubejs:iron_coin').withCount(count*10))
					coin.shrink(count);
					break;
				case 'diamond_coin':
					player.give(Item.of('kubejs:gold_coin').withCount(count*10))
					coin.shrink(count);
					break;
				case 'netherite_coin':
					player.give(Item.of('kubejs:diamond_coin').withCount(count*10))
					coin.shrink(count);
					break;
			}
	   }
	   else{
			switch(coin.getItem().toString()){
				case 'iron_coin':
					player.give(Item.of('kubejs:copper_coin').withCount(10))
					coin.shrink(1);
					break;
				case 'gold_coin':
					player.give(Item.of('kubejs:iron_coin').withCount(10))
					coin.shrink(1);
					break;
				case 'diamond_coin':
					player.give(Item.of('kubejs:gold_coin').withCount(10))
					coin.shrink(1);
					break;
				case 'netherite_coin':
					player.give(Item.of('kubejs:diamond_coin').withCount(10))
					coin.shrink(1);
					break;
			}
	   }
    }
})

ServerEvents.commandRegistry(event => {
	const { commands: Commands, arguments: Arguments } = event

	event.register(Commands.literal('bank-save')
		.executes(c => save(c.source.player))
	)
	let save=(player)=>{
		let inv = player.inventory.items
		let count=player.persistentData.getInt("balance");
		for(let i=0;i<inv.length;i++){
			let coincount = inv[i].getCount()
			switch(inv[i].getItem().toString()){
				case 'copper_coin':
					count+=coincount
					inv[i].shrink(coincount);
					break;
				case 'iron_coin':
					count+=coincount*10
					inv[i].shrink(coincount);
					break;
				case 'gold_coin':
					count+=coincount*100
					inv[i].shrink(coincount);
					break;
				case 'diamond_coin':
					count+=coincount*1000
					inv[i].shrink(coincount);
					break;
				case 'netherite_coin':
					count+=coincount*10000
					inv[i].shrink(coincount);
					break;
			}
		}
		player.persistentData.putInt("balance",count);
		player.setStatusMessage("当前余额：§6"+count+"C")
		return 1;
	}
	event.register(Commands.literal('bank-extract')
	.executes(c => extract(c.source.player,-1))
		.then(Commands.argument("value", Arguments.INTEGER.create(event))
		.executes(c => extract(c.source.player,Arguments.INTEGER.getResult(c, "value")))
		)
	)
	let extract=(player,amount)=>{
		//console.log(player)
		let count=player.persistentData.getInt("balance");
		if(amount<0||amount>count){amount=count;}
		count-=amount;
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
		player.persistentData.putInt("balance",count);
		player.setStatusMessage([Text.translate("message.kubejs.balance"),Text.of(count+"C").gold()]);
		return 1;
	}
	event.register(Commands.literal('bank')
		.executes(c => bank(c.source.player))
	)
	let bank=(player)=>{
		let count=player.persistentData.getInt("balance");
		player.setStatusMessage([Text.translate("message.kubejs.balance"),Text.of(count+"C").gold()]);
		return 1;
	}
})