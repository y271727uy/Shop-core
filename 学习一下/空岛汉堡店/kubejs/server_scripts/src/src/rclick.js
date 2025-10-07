// priority : 1000
const $ingredients=Java.loadClass('someassemblyrequired.ingredient.Ingredients')
ItemEvents.entityInteracted('kubejs:iron_contract', event => {
	let entity=event.target
	if(!entity.isLiving())return;
	if(entity.isPlayer())return;
	entity.persistentData.putInt("employee",10)
	event.level.spawnParticles("minecraft:enchant",false,entity.x,entity.y+1,entity.z,0.3,0.5,0.3,80,0)
	event.item.shrink(1);
})
ItemEvents.entityInteracted('kubejs:gold_contract', event => {
	let entity=event.target
	if(!entity.isLiving())return;
	if(entity.isPlayer())return;
	entity.persistentData.putInt("employee",20)
	event.level.spawnParticles("minecraft:enchant",false,entity.x,entity.y+1,entity.z,0.3,0.5,0.3,80,0)
	event.item.shrink(1);
})
ItemEvents.entityInteracted('kubejs:diamond_contract', event => {
	let entity=event.target
	if(!entity.isLiving())return;
	if(entity.isPlayer())return;
	entity.persistentData.putInt("employee",30)
	event.level.spawnParticles("minecraft:enchant",false,entity.x,entity.y+1,entity.z,0.3,0.5,0.3,80,0)
	event.item.shrink(1);
})

ItemEvents.entityInteracted('kubejs:broom',event=>{
	let entity=event.target;
	let deleteflag=false;
	event.player.swing();
	if(entity.type=='easy_npc:humanoid'){
		deleteflag=true;
	}
	if(entity.type=='mca:male_villager'||entity.type=='mca:female_villager'){
		if(entity.nbt?.VillagerData?.profession=='mca:adventurer'){
			deleteflag=true;
		}
	}
	if(deleteflag){
		event.level.spawnParticles("minecraft:poof",false,entity.x,entity.y+1,entity.z,0.5,1,0.5,50,0);
		entity.discard();
	}
})
ItemEvents.entityInteracted('kubejs:skin_scanner',event=>{
	let entity=event.target;
	if(entity.isPlayer())return;
	event.player.swing();
	if(entity.type=='easy_npc:humanoid'){
		console.log(entity.nbt.SkinData.SkinUUID.toString())
	}
})
ItemEvents.entityInteracted('kubejs:baggage',event=>{
	let entity=event.target;
	event.player.swing();
	if(!entity.isLiving())return;
	if(entity.isPlayer())return;
	if(entity.hasEffect('minecraft:glowing')){
		if(entity.type=='mca:male_villager'||entity.type=='mca:female_villager'){
			console.log(entity.getStringUuid())
			event.server.runCommandSilent(`mca-admin assumeUuidDead ${entity.getStringUuid()}`)
		}
		event.level.spawnParticles("minecraft:poof",false,entity.x,entity.y+1,entity.z,0.5,1,0.5,50,0);
		entity.discard();
	}
	else{
		event.player.tell([Text.translate("message.kubejs.baggage_1").red(),Text.of(entity.getName().getString()).red(),Text.translate("message.kubejs.baggage_2").red()])
		event.player.tell(Text.translate("message.kubejs.baggage_3").red())
		event.player.tell(Text.translate("message.kubejs.baggage_4").yellow())
		entity.potionEffects.add('minecraft:glowing',200)
	}
})


ItemEvents.entityInteracted('create:brass_hand', event => {
	let entity=event.target
	if(!entity.isLiving())return;
	if(entity.isPlayer())return;
	let employee=entity.persistentData.getInt("employee")
	if(employee==0)return;
	employee+=1;
	if(employee%10>2)employee-=employee%10;
	entity.persistentData.putInt("employee",employee)
	event.level.spawnParticles("minecraft:enchant",false,entity.getX(),entity.getY()+1,entity.getZ(),0.3,0.5,0.3,80,0)
})
BlockEvents.rightClicked('minecraft:cobblestone', event => {
	if(!event.item.hasTag("forge:tools/pickaxes"))return;
	event.server.runCommandSilent(`playsound minecraft:block.stone.break block @a ${event.block.getX()} ${event.block.getY()} ${event.block.getZ()}`)
	event.block.set('minecraft:gravel')
})
BlockEvents.rightClicked('minecraft:gravel', event => {
	event.cancel
	if(!event.item.hasTag("forge:tools/pickaxes"))return;
	event.server.runCommandSilent(`playsound minecraft:block.gravel.break block @a ${event.block.getX()} ${event.block.getY()} ${event.block.getZ()}`)
	event.block.set('minecraft:sand')
})
BlockEvents.rightClicked('minecraft:sand', event => {
	if(!event.item.hasTag("forge:tools/pickaxes"))return;
	event.server.runCommandSilent(`playsound minecraft:block.sand.break block @a ${event.block.getX()} ${event.block.getY()} ${event.block.getZ()}`)
	event.block.set('minecraft:clay')
})
BlockEvents.rightClicked('minecraft:bamboo_sapling', event => {
	if(!event.item.hasTag("forge:tools/shovels"))return;
	event.server.runCommandSilent(`playsound minecraft:block.grass.place block @a ${event.block.getX()} ${event.block.getY()} ${event.block.getZ()}`)
	event.block.popItem('kubejs:bamboo_shoot')
	event.block.set('minecraft:air')
})
BlockEvents.rightClicked('snifferplus:tall_fiddlefern',event =>{
	let item=event.item
	let block=event.block
	if(item=="minecraft:bone_meal"){
		event.block.popItem('snifferplus:fiddlefern')
		event.server.runCommandSilent(`playsound minecraft:item.bone_meal.use block @a ${block.getX()} ${block.getY()} ${block.getZ()}`)
		event.level.spawnParticles("minecraft:happy_villager",false,block.getX()+0.5,block.getY()+0.5,block.getZ()+0.5,0.5,0.5,0.5,10,0.1)
		item.shrink(1)
	}
})
BlockEvents.rightClicked('some_assembly_required:sandwich', event => {
	let player=event.player
	let block=event.block
	if(event.item=='kubejs:spade'){
		let burger=Item.of('some_assembly_required:sandwich');
		block.entity.saveToItem(burger);
		player.give(burger);
		block.set('minecraft:air');
		player.swing();
	}
	/*
	else{
		if(event.getHand()=="off_hand")return;
		block.entity.interact(player,event.getHand())
		player.swing();
	}
	*/
})

BlockEvents.leftClicked('some_assembly_required:sandwich', event => {
	let player=event.player
	let block=event.block
	if(event.item=='kubejs:spade'){
		let burger=Item.of('some_assembly_required:sandwich');
		block.entity.saveToItem(burger);
		let burgerlist=burger.nbt?.BlockEntityTag?.Sandwich
		for(let i=0;i<burgerlist.length;i++){
			if(!$ingredients.hasContainer(Item.of(burgerlist[i].id))){
				player.give(Item.of(burgerlist[i].id))
			}
		}
		block.set('minecraft:air');
		player.swing();
	}
	/*
	else{
		if(event.getHand()=="off_hand")return;
		block.entity.interact(player,event.getHand())
		player.swing();
	}
	*/
})
///data modify block 499 -57 157 Sandwich append value {id:"minecraft:apple",Count:1b}
/*
BlockEvents.rightClicked('minecraft:dirt', event => {
	let $sandwich=Java.loadClass('someassemblyrequired.ingredient.Ingredients')
	let level=event.level
	let entity=level.getBlockEntity(event.block.getPos().above().above())
	if(entity instanceof $sandwich){
		let burger=Item.of('some_assembly_required:sandwich');
		entity.saveToItem(burger);
		burger.nbt.Sandwich.push({id:"some_assembly_required:bread_slice",Count:1})
		level.setBlock(event.block.getPos().above()")
		event.block.set(burger);
	}
	
})
*/
ItemEvents.rightClicked('kubejs:speed_feather', event => {
    let player = event.player;
	event.level.spawnParticles("minecraft:wax_off",false,player.x,player.y+1,player.z,0.5,1,0.5,50,0);
    player.potionEffects.add("minecraft:speed",20*60,9);
	player.potionEffects.add("minecraft:jump_boost",20*60,9);
})
ItemEvents.rightClicked('kubejs:flying_feather', event => {
    let player = event.player;
	event.level.spawnParticles("minecraft:end_rod",false,player.x,player.y+1,player.z,0.5,1,0.5,50,0);
	if (player.abilities.mayfly) {
		player.abilities.mayfly = false;
		player.abilities.flying = false;
	} else {
		player.abilities.mayfly = true;
    }
    player.onUpdateAbilities();
})
const datelist=[Text.translate("message.kubejs.utc_0"),Text.translate("message.kubejs.utc_6"),
	Text.translate("message.kubejs.utc_12"),Text.translate("message.kubejs.utc_18")
]
const typeName=["",
	Text.translate("message.kubejs.news_type_1"),
	Text.translate("message.kubejs.news_type_2"),
	Text.translate("message.kubejs.news_type_3"),
	Text.translate("message.kubejs.news_type_4"),
	Text.translate("message.kubejs.news_type_5"),
	Text.translate("message.kubejs.news_type_6")]
const newslist=[
	"",
	Text.translate("message.kubejs.news_message_1_positive"),
	Text.translate("message.kubejs.news_message_2_positive"),
	Text.translate("message.kubejs.news_message_3_positive"),
	Text.translate("message.kubejs.news_message_4_positive"),
	Text.translate("message.kubejs.news_message_5_positive"),
	Text.translate("message.kubejs.news_message_6_positive"),

	Text.translate("message.kubejs.news_message_1_negative"),
	Text.translate("message.kubejs.news_message_2_negative"),
	Text.translate("message.kubejs.news_message_3_negative"),
	Text.translate("message.kubejs.news_message_4_negative"),
	Text.translate("message.kubejs.news_message_5_negative"),
	Text.translate("message.kubejs.news_message_6_negative")
]
ItemEvents.rightClicked('kubejs:newspaper',event=>{
	let trend=getTrend()
	let player=event.player
	player.swing()
	//player.tell((Date.now()%(3600*24*1000))/(1000*3600))
	player.tell(datelist[Math.floor((Date.now()%(3600*24*1000))/(1000*3600*6))])
	player.tell(newslist[trend[0]])
	player.tell([typeName[trend[0]].yellow(),Text.translate("messgae.kubejs.news_positive").green()])
	player.tell(newslist[trend[1]+6])
	player.tell([typeName[trend[1]].yellow(),Text.translate("messgae.kubejs.news_negative").red()])
})
BlockEvents.rightClicked("minecraft:turtle_egg",event=>{
	let player=event.player
	if(player.getMainHandItem().isEmpty()&&player.getOffHandItem().isEmpty()){
		player.give(Item.of("minecraft:turtle_egg").withCount(event.block.getProperties().get("eggs")))
		event.block.set("minecraft:air")
		player.swing()
	}
})
BlockEvents.rightClicked("ends_delight:chorus_succulent",event=>{
	let block=event.block
	if(event.item!='minecraft:bone_meal')return;
	if(block.getProperties().get("succulent")==3&&event.level.getBlock(block.pos.below())=='minecraft:end_stone'){
		event.block.popItem('ends_delight:chorus_succulent')
	}
	//event.cancel()
})
ItemEvents.rightClicked('kubejs:eternal_codex',event=>{
	console.log(event.getHand()=='MAIN_HAND')
	if(event.getHand()=='MAIN_HAND'){
		if(event.player.getOffHandItem().isEmpty())return;
		event.player.swing();
		event.player.give(event.player.getOffHandItem().withNBT({Unbreakable:true}).withCount(1))
		event.item.shrink(1);
		event.player.getOffHandItem().shrink(1);
	}
})