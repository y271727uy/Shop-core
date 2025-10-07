// 移除配方格式示例
ServerEvents.recipes(event => {
	// 在这里添加要移除的配方
	// 示例格式:
	// event.remove({ id: 'modid:recipe_id' })
	// event.remove({ output: 'modid:item_id' })
	// event.remove({ mod: 'modid' })
	
	// 根据用户要求转换的配方移除行
	event.remove({id: 'cocraftplus:sun_pale_ale'})
	event.remove({id: 'alcocraftplus:kvass'})
	event.remove({id: 'alcocraftplus:chorus_ale'})
	event.remove({id: 'alcocraftplus:wither_stout'})
	event.remove({id: 'alcocraftplus:night_rauch'})
	event.remove({id: 'alcocraftplus:digger_bitter'})
	event.remove({id: 'alcocraftplus:nether_star_lager'})
	event.remove({id: 'alcocraftplus:nether_porter'})
	event.remove({id: 'alcocraftplus:magnet_pilsner'})
	event.remove({id: 'alcocraftplus:leprechaun_cider'})
	event.remove({id: 'alcocraftplus:ice_beer'})
	event.remove({id: 'alcocraftplus:drowned_ale'})
	event.remove({id: 'alcocraftplus:sun_pale_ale'})
	event.remove({id: 'alcocraftplus:kvass'})
	event.remove({id: 'alcocraftplus:chorus_ale'})
})