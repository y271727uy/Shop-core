StartupEvents.registry('item', event => {
    event.create('sliced_ham').texture('kubejs:item/sliced_ham').food(food =>food.hunger(4).saturation(0.5))
	event.create('sliced_red_mushroom').texture('kubejs:item/sliced_red_mushroom').food(food =>food.hunger(2).saturation(0.5))
	event.create('sliced_brown_mushroom').texture('kubejs:item/sliced_brown_mushroom').food(food =>food.hunger(2).saturation(0.5))
	event.create('sliced_crimson_fungus').texture('kubejs:item/sliced_crimson_fungus').food(food =>food.hunger(2).saturation(0.5))
	event.create('sliced_warped_fungus').texture('kubejs:item/sliced_warped_fungus').food(food =>food.hunger(2).saturation(0.5))
	event.create('smoked_red_mushroom').texture('kubejs:item/smoked_red_mushroom').food(food =>food.hunger(3).saturation(0.5))
	event.create('smoked_brown_mushroom').texture('kubejs:item/smoked_brown_mushroom').food(food =>food.hunger(3).saturation(0.5))
	event.create('smoked_crimson_fungus').texture('kubejs:item/smoked_crimson_fungus').food(food =>food.hunger(3).saturation(0.5))
	event.create('smoked_warped_fungus').texture('kubejs:item/smoked_warped_fungus').food(food =>food.hunger(3).saturation(0.5))
	event.create('cheese_slice').texture('kubejs:item/cheese_slice').food(food =>food.hunger(3).saturation(0.5))
	event.create('hashbrown').texture('kubejs:item/hashbrown').food(food =>food.hunger(3).saturation(0.5))
	event.create('bamboo_shoot').texture('kubejs:item/bamboo_shoot')
	event.create('pickled_bamboo_shoot').texture('kubejs:item/pickled_bamboo_shoot').food(food =>food.hunger(6).saturation(1))
	event.create('sliced_bamboo_shoot').texture('kubejs:item/sliced_bamboo_shoot').food(food =>food.hunger(4).saturation(0.5))
	event.create('smoked_carrot').texture('kubejs:item/smoked_carrot').food(food =>food.hunger(6).saturation(1))
	event.create('smoked_carrot_slice').texture('kubejs:item/smoked_carrot_slice').food(food =>food.hunger(3).saturation(0.5))
	event.create('mayo_sauce').texture('kubejs:item/mayo_sauce').food(food =>food.hunger(2).saturation(0.5).eaten(ctx => {
		if(ctx.player!=null)ctx.player.give(Item.of('minecraft:bowl'))
	}))
	event.create('bbq_sauce').texture('kubejs:item/bbq_sauce').food(food =>food.hunger(2).saturation(0.5).eaten(ctx => {
		if(ctx.player!=null)ctx.player.give(Item.of('minecraft:bowl'))
	}))
	event.create('ancient_sauce').texture('kubejs:item/ancient_sauce').food(food =>food.hunger(2).saturation(0.5).eaten(ctx => {
		if(ctx.player!=null)ctx.player.give(Item.of('minecraft:bowl'))
	}))
	event.create('blaze_sauce').texture('kubejs:item/blaze_sauce').food(food =>food.hunger(2).saturation(0.5).eaten(ctx => {
		if(ctx.player!=null)ctx.player.give(Item.of('minecraft:bowl'))
	}))
	event.create('pepper_sauce').texture('kubejs:item/pepper_sauce').food(food =>food.hunger(2).saturation(0.5).eaten(ctx => {
		if(ctx.player!=null)ctx.player.give(Item.of('minecraft:bowl'))
	}))
	event.create('seafood_sauce').texture('kubejs:item/seafood_sauce').food(food =>food.hunger(2).saturation(0.5).eaten(ctx => {
		if(ctx.player!=null)ctx.player.give(Item.of('minecraft:bowl'))
	}))
	event.create('clam_slice').texture('kubejs:item/clam_slice').food(food =>food.hunger(3).saturation(0.5))
	event.create('clawster_slice').texture('kubejs:item/clawster_slice').food(food =>food.hunger(3).saturation(0.5))
	event.create('crab_slice').texture('kubejs:item/crab_slice').food(food =>food.hunger(3).saturation(0.5))
	event.create('fiddlefern').texture('kubejs:item/fiddlefern').food(food =>food.hunger(3).saturation(0.5))
	event.create('fried_turtle_eggs').texture('kubejs:item/fried_turtle_eggs').food(food =>food.hunger(3).saturation(0.5))
	event.create('pepper_pieces').texture('kubejs:item/pepper_pieces').food(food =>food.hunger(3).saturation(0.5))
	event.create('scrambled_snifferegg').texture('kubejs:item/scrambled_snifferegg').food(food =>food.hunger(4).saturation(0.5))
	event.create('shrimp_slice').texture('kubejs:item/shrimp_slice').food(food =>food.hunger(3).saturation(0.5))
	event.create('sliced_century_egg').texture('kubejs:item/sliced_century_egg').food(food =>food.hunger(4).saturation(0.5))
	event.create('sliced_enchantfruit').texture('kubejs:item/sliced_enchantfruit').food(food =>food.hunger(4).saturation(0.5))
	event.create('sliced_goat').texture('kubejs:item/sliced_goat').food(food =>food.hunger(4).saturation(0.5))
	event.create('sliced_pickle').texture('kubejs:item/sliced_pickle').food(food =>food.hunger(2).saturation(0.5))
	event.create('sliced_pitcher').texture('kubejs:item/sliced_pitcher').food(food =>food.hunger(2).saturation(0.5))
	event.create('sliced_sniffer').texture('kubejs:item/sliced_sniffer').food(food =>food.hunger(4).saturation(0.5))
	event.create('sliced_succulent').texture('kubejs:item/sliced_succulent').food(food =>food.hunger(2).saturation(0.5))
	event.create('sliced_torchflower').texture('kubejs:item/sliced_torchflower').food(food =>food.hunger(3).saturation(0.5))
	event.create('sliced_turtle').texture('kubejs:item/sliced_turtle').food(food =>food.hunger(3).saturation(0.5))
	event.create('sliced_udumbera').texture('kubejs:item/sliced_udumbera').food(food =>food.hunger(6).saturation(0.5))
	
	event.create('onion_slice').texture('kubejs:item/onion_slice').food(food =>food.hunger(2).saturation(0.5))
	event.create('beetroot_slice').texture('kubejs:item/beetroot_slice').food(food =>food.hunger(2).saturation(0.5))
	event.create('boneless_mutton').texture('kubejs:item/boneless_mutton').food(food =>food.hunger(4).saturation(0.5))
	event.create('urchin_sauce').texture('kubejs:item/urchin_sauce').food(food =>food.hunger(2).saturation(0.5).eaten(ctx => {
		if(ctx.player!=null)ctx.player.give(Item.of('minecraft:bowl'))
	}))
	event.create('lime_sauce').texture('kubejs:item/lime_sauce').food(food =>food.hunger(2).saturation(0.5).eaten(ctx => {
		if(ctx.player!=null)ctx.player.give(Item.of('minecraft:bowl'))
	}))
	event.create('pomegranate_sauce').texture('kubejs:item/pomegranate_sauce').food(food =>food.hunger(2).saturation(0.5).eaten(ctx => {
		if(ctx.player!=null)ctx.player.give(Item.of('minecraft:bowl'))
	}))
	
	event.create('rice_burger_top').texture('kubejs:item/rice_burger_top').food(food =>food.hunger(3).saturation(0.5))
	event.create('rice_burger_bottom').texture('kubejs:item/rice_burger_bottom').food(food =>food.hunger(3).saturation(0.5))
	event.create('rice_burger').texture('kubejs:item/rice_burger').food(food =>food.hunger(6).saturation(0.5))
	
	event.create('ink_burger_top').texture('kubejs:item/ink_burger_top').food(food =>food.hunger(3).saturation(0.5))
	event.create('ink_burger_bottom').texture('kubejs:item/ink_burger_bottom').food(food =>food.hunger(3).saturation(0.5))
	event.create('ink_burger').texture('kubejs:item/ink_burger').food(food =>food.hunger(6).saturation(0.5))
	
	event.create('oat_burger_top').texture('kubejs:item/oat_burger_top').food(food =>food.hunger(3).saturation(0.5))
	event.create('oat_burger_bottom').texture('kubejs:item/oat_burger_bottom').food(food =>food.hunger(3).saturation(0.5))
	event.create('oat_burger').texture('kubejs:item/oat_burger').food(food =>food.hunger(6).saturation(0.5))
	
	event.create('blaze_burger_top').texture('kubejs:item/blaze_burger_top').food(food =>food.hunger(3).saturation(0.5))
	event.create('blaze_burger_bottom').texture('kubejs:item/blaze_burger_bottom').food(food =>food.hunger(3).saturation(0.5))
	event.create('blaze_burger').texture('kubejs:item/blaze_burger').food(food =>food.hunger(6).saturation(0.5))
	
	event.create('egg_burger_top').texture('kubejs:item/egg_burger_top').food(food =>food.hunger(3).saturation(0.5))
	event.create('egg_burger_bottom').texture('kubejs:item/egg_burger_bottom').food(food =>food.hunger(3).saturation(0.5))
	event.create('egg_burger').texture('kubejs:item/egg_burger').food(food =>food.hunger(6).saturation(0.5))
	
	event.create('pizza_sauce_tomato').texture('kubejs:item/pizza_sauce_tomato').food(food =>food.hunger(2).saturation(0.5).eaten(ctx => {
		if(ctx.player!=null)ctx.player.give(Item.of('minecraft:bowl'))
	}))
	event.create('pizza_sauce_seafood').texture('kubejs:item/pizza_sauce_seafood').food(food =>food.hunger(2).saturation(0.5).eaten(ctx => {
		if(ctx.player!=null)ctx.player.give(Item.of('minecraft:bowl'))
	}))
	event.create('pizza_sauce_alfredo').texture('kubejs:item/pizza_sauce_alfredo').food(food =>food.hunger(2).saturation(0.5).eaten(ctx => {
		if(ctx.player!=null)ctx.player.give(Item.of('minecraft:bowl'))
	}))
	event.create('pizza_sauce_blaze').texture('kubejs:item/pizza_sauce_blaze').food(food =>food.hunger(2).saturation(0.5).eaten(ctx => {
		if(ctx.player!=null)ctx.player.give(Item.of('minecraft:bowl'))
	}))
	event.create('pizza_sauce_torch').texture('kubejs:item/pizza_sauce_torch').food(food =>food.hunger(2).saturation(0.5).eaten(ctx => {
		if(ctx.player!=null)ctx.player.give(Item.of('minecraft:bowl'))
	}))


	event.create('fries').texture('kubejs:item/fries').food(food =>food.hunger(4).saturation(1).eaten(ctx => {
		if(ctx.player!=null)ctx.player.give(Item.of('minecraft:paper'))
	}))
	event.create('fried_chicken').texture('kubejs:item/fried_chicken').food(food =>food.hunger(6).saturation(1).eaten(ctx => {
		if(ctx.player!=null)ctx.player.give(Item.of('minecraft:paper'))
	}))

	event.create('caramel').texture('kubejs:item/caramel')
	event.create('newspaper').texture('kubejs:item/newspaper')
	event.create('skin_scanner').texture('kubejs:item/skin_scanner')
	event.create('soda_can').texture('kubejs:item/soda_can')
	event.create('soda_water').texture('kubejs:item/soda_water').useAnimation('drink').useDuration(itemstack => 20)
		.use((level, player, hand) => true)
		.finishUsing((itemstack, level, entity) => {
			itemstack.shrink(1)
			return itemstack
		})
	event.create('soda_plain').texture('kubejs:item/soda_plain').useAnimation('drink').useDuration(itemstack => 20)
		.use((level, player, hand) => true)
		.finishUsing((itemstack, level, entity) => {
			itemstack.shrink(1)
			return itemstack
		})
	event.create('soda_lily').texture('kubejs:item/soda_lily').useAnimation('drink').useDuration(itemstack => 20)
		.use((level, player, hand) => true)
		.finishUsing((itemstack, level, entity) => {
			itemstack.shrink(1)
			return itemstack
		})
	event.create('soda_lime').texture('kubejs:item/soda_lime').useAnimation('drink').useDuration(itemstack => 20)
		.use((level, player, hand) => true)
		.finishUsing((itemstack, level, entity) => {
			itemstack.shrink(1)
			return itemstack
		})
	event.create('soda_pomegranate').texture('kubejs:item/soda_pomegranate').useAnimation('drink').useDuration(itemstack => 20)
		.use((level, player, hand) => true)
		.finishUsing((itemstack, level, entity) => {
			itemstack.shrink(1)
			return itemstack
		})
	event.create('soda_ancient').texture('kubejs:item/soda_ancient').useAnimation('drink').useDuration(itemstack => 20)
		.use((level, player, hand) => true)
		.finishUsing((itemstack, level, entity) => {
			itemstack.shrink(1)
			return itemstack
		})

	event.create('flying_feather').texture('kubejs:item/flying_feather')
	event.create('speed_feather').texture('kubejs:item/speed_feather')
	event.create('spade', 'sword').texture('kubejs:item/spade')
	event.create('eternal_codex').texture('kubejs:item/eternal_codex')
	event.create('broom','sword').texture('kubejs:item/broom')
	event.create('baggage').texture('kubejs:item/baggage')
	
	event.create('sliced_ham_model').modelJson({parent: 'kubejs:sliced_ham'})
	event.create('strider_egg').texture('kubejs:item/ingredients/strider_egg')
	event.create('cooked_loin').texture('kubejs:item/ingredients/cooked_loin')
	event.create('cooked_lampray_fillet').texture('kubejs:item/ingredients/cooked_lampray_fillet')
	event.create('cooked_pufferfish_slice').texture('kubejs:item/ingredients/cooked_pufferfish_slice')
	event.create('cooked_tropical_fish_slice').texture('kubejs:item/ingredients/cooked_tropical_fish_slice')
	event.create('minced_strider').modelJson({parent: 'kubejs:minced_strider'})
	event.create('oily_bean_curd').modelJson({parent: 'kubejs:oily_bean_curd'})
	event.create('cucumber_noodles').texture('kubejs:item/ingredients/cucumber_noodles')
	event.create('roasted_sausage').texture('kubejs:item/ingredients/roasted_sausage')
	event.create('cooked_bass_slice').texture('kubejs:item/ingredients/cooked_bass_slice')
	event.create('baked_portobello_cap').texture('kubejs:item/ingredients/baked_portobello_cap')
	
	event.create('rice_burger_top_model').modelJson({parent: 'kubejs:rice_burger_top'})
	event.create('rice_burger_bottom_model').modelJson({parent: 'kubejs:rice_burger_bottom'})
	event.create('ink_burger_top_model').modelJson({parent: 'kubejs:ink_burger_top'})
	event.create('ink_burger_bottom_model').modelJson({parent: 'kubejs:ink_burger_bottom'})
	event.create('oat_burger_top_model').modelJson({parent: 'kubejs:oat_burger_top'})
	event.create('oat_burger_bottom_model').modelJson({parent: 'kubejs:oat_burger_bottom'})
	event.create('blaze_burger_top_model').modelJson({parent: 'kubejs:blaze_burger_top'})
	event.create('blaze_burger_bottom_model').modelJson({parent: 'kubejs:blaze_burger_bottom'})
	event.create('egg_burger_top_model').modelJson({parent: 'kubejs:egg_burger_top'})
	event.create('egg_burger_bottom_model').modelJson({parent: 'kubejs:egg_burger_bottom'})
	event.create('crushed_brass').texture('kubejs:item/economic/crushed_brass')
	
})
ItemEvents.modification(event => {
	event.modify('minecraft:milk_bucket', item => {
	  item.maxStackSize = 16
	})
})
