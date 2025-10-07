EntityEvents.hurt(event => {
	if(event.entity.type!='mca:male_villager'&&event.entity.type!='mca:female_villager'&&event.entity.type!='youkaishomecoming:rumia'){return;}
	if(event.source.player&&event.entity.type!='youkaishomecoming:rumia'){return;}
	if(event.entity.y<-64){event.level.getServer().runCommandSilent("/execute as "+event.entity.uuid.toString()+" at @s run tp @s @p")}
	event.cancel()
})
EntityEvents.spawned(e => {
    if(e.entity.type == 'minecraft:hoglin'){
        e.entity.mergeNbt("{IsImmuneToZombification:1b,PersistenceRequired:1b}")
    }
	if(e.entity.type=='youkaishomecoming:rumia'){
		e.entity.mergeNbt("{Invulnerable:1b,PersistenceRequired:1b}")
		e.entity.setCustomName(Text.of("露米娅"))
	}
})
