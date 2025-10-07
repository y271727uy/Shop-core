ServerEvents.recipes(event => {
	//pizzacraft
	event.remove({mod:'pizzacraft',not:{output:'#pizzacraft:keeprecipe'}})
	event.smithing(
		'pizzacraft:diamond_pizza_peel',
		'create:sand_paper',
		'pizzacraft:iron_pizza_peel',
		'minecraft:diamond'
	)
	event.shaped(
		Item.of('pizzacraft:iron_pizza_peel'),
		[
			'A  ',
			'B  ',
			'B  '
		],
		{
				A: 'minecraft:heavy_weighted_pressure_plate',
				B: 'minecraft:stick'
			}
	)
	event.shaped(
		Item.of('pizzacraft:golden_pizza_peel'),
		[
			'A  ',
			'B  ',
			'B  '
		],
		{
				A: 'minecraft:light_weighted_pressure_plate',
				B: 'minecraft:stick'
			}
	)
	event.shaped(
		Item.of('pizzacraft:stone_pizza_peel'),
		[
			'A  ',
			'B  ',
			'B  '
		],
		{
				A: 'minecraft:stone_pressure_plate',
				B: 'minecraft:stick'
			}
	)
	event.shapeless(
		Item.of('pizzacraft:dough', 2),
		['2x minecraft:wheat',
		'#forge:eggs',
		'farmersdelight:milk_bottle'])
	event.custom({
		type: "create:mixing",
		ingredients: [
		{tag: "forge:flour"},
		{tag: "forge:flour"},
		{tag: "forge:eggs"},
		{amount: 250,fluid: "minecraft:milk",nbt: {}}
		],
		results: [{
		  item: "pizzacraft:dough",
		  count: 4
		}]
	})
	event.shaped(
		Item.of('pizzacraft:oven'),
		[
			'AAA',
			'BCB',
			'BBB'
		],
		{
				A: 'minecraft:smooth_stone',
				B: 'minecraft:bricks',
				C: 'minecraft:campfire'
			}
	)
	//chapter 1
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'minecraft:brown_mushroom' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:sliced_brown_mushroom', count: 2 }]
	})
	event.smoking('kubejs:smoked_brown_mushroom', 'kubejs:sliced_brown_mushroom')
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'minecraft:red_mushroom' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:sliced_red_mushroom', count: 2 }]
	})
	event.smoking('kubejs:smoked_red_mushroom', 'kubejs:sliced_red_mushroom')
	event.custom({type: "farmersdelight:cooking",cookingtime: 100,experience: 0.35,
	ingredients: [{item:"minecraft:egg"},{item:"minecraft:egg"},{item:"youkaishomecoming:butter"},{item:"vintagedelight:salt_dust"}],
	container: {item:"minecraft:bowl"},
	recipe_book_tab: "misc",
	result: {item: "kubejs:mayo_sauce"}
	})
	event.custom({type: "farmersdelight:cooking",cookingtime: 100,experience: 0.35,
	ingredients: [{item:"farmersdelight:onion"},{item:"farmersdelight:tomato"},{item:"minecraft:sugar"},{item:"vintagedelight:salt_dust"}],
	container: {item:"minecraft:bowl"},
	recipe_book_tab: "misc",
	result: {item: "kubejs:bbq_sauce"}
	})
	event.custom({type: "farmersdelight:cooking",cookingtime: 100,experience: 0.35,
	ingredients: [{item:"minecraft:potato"},{item:"youkaishomecoming:butter"}],
	recipe_book_tab: "misc",
	result: {item: "kubejs:hashbrown"}
	})
	event.smoking('kubejs:smoked_carrot', 'minecraft:carrot')
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'kubejs:smoked_carrot' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:smoked_carrot_slice', count: 2 }]
	})
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'farmersdelight:cooked_mutton_chops' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:boneless_mutton', count: 1 },
	{ item: 'minecraft:bone_meal', count: 1 }]
	})
	event.remove({ id: 'farmersdelight:cutting/smoked_ham' })
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'farmersdelight:smoked_ham' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:sliced_ham', count: 3 },
	{ item: 'minecraft:bone', count: 1 }]
	})
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'vintagedelight:cheese_slice' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:cheese_slice', count: 2 }]
	})
	event.custom({type: "vintagedelight:fermenting",
	processingTime: 5000,
	ingredients: [
    {item: "kubejs:bamboo_shoot"},
    {item: "kubejs:bamboo_shoot"},
	{item: "kubejs:bamboo_shoot"},
	{item: "kubejs:bamboo_shoot"},
	{item: "kubejs:bamboo_shoot"},
    {tag: "forge:salt"}],
	"output": {
	"count": 5,"item": "kubejs:pickled_bamboo_shoot"}
	})
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'kubejs:pickled_bamboo_shoot' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:sliced_bamboo_shoot', count: 2 }]
	})
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'vintagedelight:pickled_onion' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:onion_slice', count: 2 }]
	})
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'vintagedelight:pickled_beetroot' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:beetroot_slice', count: 2 }]
	})
	
	//chapter 2
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'crabbersdelight:cooked_clawster' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:clawster_slice', count: 3 }]
	})
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'crabbersdelight:raw_clam_meat' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:clam_slice', count: 4 }]
	})
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'collectorsreap:clam_meat' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:clam_slice', count: 1 }]
	})
	event.custom({type: "farmersdelight:cooking",cookingtime: 100,experience: 0.35,
	ingredients: [{ item: 'crabbersdelight:cooked_crab' },{tag:'forge:dough'}],
	recipe_book_tab: "misc",
	result: { item: 'kubejs:crab_slice', count: 3 }
	})
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'collectorsreap:cooked_tiger_prawn' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:shrimp_slice', count: 2 }]
	})
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'crabbersdelight:cooked_shrimp' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:shrimp_slice', count: 3 }]
	})
	event.custom({type: "farmersdelight:cooking",cookingtime: 100,experience: 0.35,
	ingredients: [{item:"collectorsreap:uni"},{item:"collectorsreap:uni"},{item:"minecraft:dried_kelp"},{item:"vintagedelight:salt_dust"}],
	container: {item:"minecraft:bowl"},
	recipe_book_tab: "misc",
	result: {item: "kubejs:urchin_sauce"}
	})
	event.custom({type: "farmersdelight:cooking",cookingtime: 100,experience: 0.35,
	ingredients: [{tag:"forge:raw_fishes"},{tag:"forge:raw_fishes"},{item:"farmersdelight:onion"},{item:"minecraft:sugar"}],
	container: {item:"minecraft:bowl"},
	recipe_book_tab: "misc",
	result: {item: "kubejs:seafood_sauce"}
	})
	//chapter 3
	event.campfireCooking('kubejs:fried_turtle_eggs', 'minecraft:turtle_egg')
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'vintagedelight:pickle' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:sliced_pickle', count: 2 }]
	})
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'vintagedelight:pickled_pepper' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:pepper_pieces', count: 2 }]
	})
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'dropthemeat:cooked_goat' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:sliced_goat', count: 2 }]
	})
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'dropthemeat:cooked_turtle' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:sliced_turtle', count: 2 }]
	})
	event.custom({type: "farmersdelight:cooking",cookingtime: 100,experience: 0.35,
	ingredients: [{item:"vintagedelight:ghost_pepper"},{item:"vintagedelight:ghost_pepper"},{item:"farmersdelight:minced_beef"},{item:"farmersdelight:onion"}],
	container: {item:"minecraft:bowl"},
	recipe_book_tab: "misc",
	result: {item: "kubejs:pepper_sauce"}
	})
	event.custom({type: "farmersdelight:cooking",cookingtime: 100,experience: 0.35,
	ingredients: [{item:"collectorsreap:lime_slice"},{item:"collectorsreap:lime_slice"},{item:"minecraft:honey_bottle"}],
	container: {item:"minecraft:bowl"},
	recipe_book_tab: "misc",
	result: {item: "kubejs:lime_sauce"}
	})
	
	
	//chapter 4
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'minecraft:crimson_fungus' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:sliced_crimson_fungus', count: 2 }]
	})
	event.smoking('kubejs:smoked_crimson_fungus', 'kubejs:sliced_crimson_fungus')

	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'minecraft:warped_fungus' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:sliced_warped_fungus', count: 2 }]
	})
	event.smoking('kubejs:smoked_warped_fungus', 'kubejs:sliced_warped_fungus')
	
	event.custom({type: "farmersdelight:cooking",cookingtime: 100,experience: 0.35,
	ingredients: [{item:"mynethersdelight:bullet_pepper"},{item:"mynethersdelight:bullet_pepper"},{item:"minecraft:blaze_powder"},{item:"mynethersdelight:minced_strider"}],
	container: {item:"minecraft:bowl"},
	recipe_book_tab: "misc",
	result: {item: "kubejs:blaze_sauce"}
	})
	event.custom({type: "farmersdelight:cooking",cookingtime: 100,experience: 0.35,
	ingredients: [{item:"collectorsreap:pomegranate_slice"},{item:"collectorsreap:pomegranate_slice"},{item:"minecraft:honey_bottle"}],
	container: {item:"minecraft:bowl"},
	recipe_book_tab: "misc",
	result: {item: "kubejs:pomegranate_sauce"}
	})
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'ends_delight:chorus_succulent' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:sliced_succulent', count: 2 }]
	})
	//chapter 5
	
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'minecraft:pitcher_plant' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:sliced_pitcher', count: 4 },
	{ item: 'minecraft:pitcher_pod'},
	{chance: 0.5,item: "minecraft:pitcher_pod"}]
	})
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'minecraft:torchflower' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:sliced_torchflower', count: 2 },
	{ item: 'minecraft:torchflower_seeds'},
	{chance: 0.5,item: "minecraft:torchflower_seeds"}]
	})
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'youkaishomecoming:udumbara_flower' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:sliced_udumbera', count: 8 }]
	})
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'quark:ancient_fruit' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:sliced_enchantfruit', count: 2 }]
	})
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'snifferplus:fiddlefern' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:fiddlefern', count: 2 }]
	})
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'dropthemeat:cooked_sniffer' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:sliced_sniffer', count: 12 }]
	})
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'vintagedelight:century_egg' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:sliced_century_egg', count: 16 }]
	})
	event.custom({type: "farmersdelight:cooking",cookingtime: 100,experience: 0.35,
	ingredients: [{item:"minecraft:sniffer_egg"},{item:"youkaishomecoming:butter"},{item:"vintagedelight:salt_dust"}],
	recipe_book_tab: "misc",
	result: {item: "kubejs:scrambled_snifferegg",count:12}
	})
	event.custom({type: "farmersdelight:cooking",cookingtime: 100,experience: 0.35,
	ingredients: [{item:"kubejs:sliced_pitcher"},{item:"kubejs:sliced_pitcher"},{item:"kubejs:sliced_torchflower"},{ item: 'quark:ancient_fruit' },{item:"minecraft:honey_bottle"}],
	container: {item:"minecraft:bowl"},
	recipe_book_tab: "misc",
	result: {item: "kubejs:ancient_sauce"}
	})
	
	event.remove({ output: 'some_assembly_required:burger_bun' })
	
	event.remove({ id: 'resourceful_tools:blaze_rod' })
	event.shapeless(
	Item.of('some_assembly_required:burger_bun', 2),
	['2x minecraft:wheat',
	'minecraft:wheat_seeds'])
	
	event.remove({ id: 'minecraft:barrel' })
	event.remove({ id: 'minecraft:cartography_table' })
	event.remove({ id: 'minecraft:brewing_stand' })
	event.shaped(
	Item.of('minecraft:barrel', 1),
	[
		'ACA',
		'CBC',
		'ACA'
	],
	{
			A: '#minecraft:planks',
			B: 'kubejs:copper_certificate',
			C: 'kubejs:iron_coin'
		}
	)
	event.shaped(
	Item.of('minecraft:cartography_table', 1),
	[
		'ACA',
		'CBC',
		'ACA'
	],
	{
			A: '#minecraft:planks',
			B: 'kubejs:iron_certificate',
			C: 'kubejs:gold_coin'
		}
	)
	event.shaped(
	Item.of('minecraft:brewing_stand', 1),
	[
		'CAC',
		'CBC',
		'AAA'
	],
	{
			A: 'minecraft:cobblestone',
			B: 'kubejs:gold_certificate',
			C: 'kubejs:diamond_coin'
		}
	)
	event.custom({
	type: "create:mixing",
	ingredients: [{item: "create:crushed_raw_copper"},
	{item: "create:crushed_raw_zinc"}
	],
	results: [{
      item: "kubejs:crushed_brass",
	  count:2
	}]
	})
	event.blasting("create:brass_ingot","kubejs:crushed_brass")
	event.custom({
	type: "create:compacting",
	ingredients: [
	{item: "minecraft:blaze_powder",},
	{item: "minecraft:blaze_powder",},
	{item: "minecraft:blaze_powder",},
	{item: "minecraft:blaze_powder",},
    {amount: 100,fluid: "minecraft:lava",nbt: {}}],
	results: [{
      item: "minecraft:blaze_rod"
    }]
	})
	event.shaped(
	Item.of('create:blaze_burner', 1),
	[
		' A ',
		'ABA',
		' A '
	],
	{
			A: 'minecraft:blaze_rod',
			B: 'create:empty_blaze_burner'
		}
	)
	event.remove({ id: 'fishermens_trap:fishtrap_farmersdelight' })
	event.remove({ id: 'crabbersdelight:crab_trap' })
	event.remove({ id: 'minecraft:fishing_rod' })
	event.shaped(
	Item.of('kubejs:string_duper', 1),
	[
		'CDC',
		'ABA',
		'CCC'
	],
	{
			A: 'minecraft:tripwire_hook',
			B: 'minecraft:string',
			C: '#minecraft:planks',
			D: 'minecraft:water_bucket'
		}
	)
	event.smoking("minecraft:sugar","minecraft:beetroot")
	event.blasting("minecraft:coal","minecraft:charcoal")
	event.blasting("minecraft:glowstone_dust","minecraft:redstone")
	/*
	event.shaped(
	Item.of('kubejs:burgerbot_iron', 1),
	[
		'CAC',
		'ABA',
		'CAC'
	],
	{
			A: 'kubejs:gold_coin',
			B: 'kubejs:iron_certificate',
			C: 'minecraft:iron_block'
		}
	)
	event.shaped(
	Item.of('kubejs:burgerbot_gold', 1),
	[
		'CAC',
		'ABA',
		'CDC'
	],
	{
			A: 'kubejs:diamond_coin',
			B: 'kubejs:gold_certificate',
			C: 'minecraft:gold_block',
			D: 'kubejs:burgerbot_iron'
		}
	)
	*/
	event.shapeless(
	Item.of('kubejs:copper_certificate', 1),
	['kubejs:iron_certificate']
	)
	event.shapeless(
	Item.of('kubejs:iron_certificate', 1),
	['kubejs:gold_certificate']
	)
	event.shapeless(
	Item.of('kubejs:gold_certificate', 1),
	['kubejs:diamond_certificate']
	)
	event.shapeless(
	Item.of('kubejs:diamond_certificate', 1),
	['kubejs:netherite_certificate']
	)
	event.shapeless(
	Item.of('kubejs:copper_coin', 10),
	['kubejs:iron_coin']
	)
	event.shapeless(
	Item.of('kubejs:iron_coin', 10),
	['kubejs:gold_coin']
	)
	event.shapeless(
	Item.of('kubejs:gold_coin', 10),
	['kubejs:diamond_coin']
	)
	event.shapeless(
	Item.of('kubejs:diamond_coin', 10),
	['kubejs:netherite_coin']
	)

	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'mynethersdelight:powder_cannon' }],
	tool: { item: 'minecraft:grindstone' },
	result: [{ item: 'create:cinder_flour'}]
	})
	
	event.custom({type: "create:milling",
	ingredients: [
    {"item": "mynethersdelight:powder_cannon"}
	],
	processingTime: 150,
	results: [
    {"item": "create:cinder_flour"}
	]
	})
	
	
	event.shaped(
	Item.of('kubejs:rice_burger', 2),
	[
		'A  ',
		'A  ',
		'   '
	],
	{
			A: 'farmersdelight:cooked_rice'
		}
	)
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'kubejs:rice_burger' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:rice_burger_top'},
	{ item: 'kubejs:rice_burger_bottom'}]
	})
	event.custom({type: "farmersdelight:cooking",cookingtime: 100,experience: 0.35,
	ingredients: [{item:"minecraft:ink_sac"},{tag:"forge:dough"},{tag:"forge:seeds"}],
	recipe_book_tab: "misc",
	result: {item: "kubejs:ink_burger",count:2}
	})
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'kubejs:ink_burger' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:ink_burger_top'},
	{ item: 'kubejs:ink_burger_bottom'}]
	})
	event.custom({type: "farmersdelight:cooking",cookingtime: 100,experience: 0.35,
	ingredients: [{item:"vintagedelight:oat_dough"},{item:"minecraft:sugar"},{tag:"forge:seeds"}],
	recipe_book_tab: "misc",
	result: {item: "kubejs:oat_burger",count:2}
	})
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'kubejs:oat_burger' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:oat_burger_top'},
	{ item: 'kubejs:oat_burger_bottom'}]
	})
	event.custom({type: "farmersdelight:cooking",cookingtime: 100,experience: 0.35,
	ingredients: [{item:"create:cinder_flour"},{item:"minecraft:blaze_powder"},{item:"minecraft:gunpowder"}],
	recipe_book_tab: "misc",
	result: {item: "kubejs:blaze_burger",count:2}
	})
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'kubejs:blaze_burger' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:blaze_burger_top'},
	{ item: 'kubejs:blaze_burger_bottom'}]
	})
	event.custom({type: "farmersdelight:cooking",cookingtime: 100,experience: 0.35,
	ingredients: [{item:"minecraft:sniffer_egg"},{item:"youkaishomecoming:butter"},{item:"youkaishomecoming:butter"},{item:"youkaishomecoming:butter"},{item:"farmersdelight:onion"}],
	recipe_book_tab: "misc",
	result: {item: "kubejs:egg_burger",count:8}
	})
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'kubejs:egg_burger' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'kubejs:egg_burger_top'},
	{ item: 'kubejs:egg_burger_bottom'}]
	})
	
	
	event.remove({ output: 'resourceful_tools:hand_tiller' })
	event.remove({ output: 'resourceful_tools:hand_tiller_copper' })
	event.remove({ output: 'automobility:steep_slope' })
	event.remove({ output: 'automobility:slope' })
	
	event.shaped(
	Item.of('kubejs:spade'),
	[
		'  A',
		' B ',
		'C  '
	],
	{
			A: 'minecraft:iron_ingot',
			B: 'minecraft:iron_nugget',
			C: 'minecraft:stick'
		}
	)
	
	event.custom({
	type: "create:haunting",
	ingredients: [{item: "farmersdelight:ham"}],
	results: [{item: "ends_delight:dragon_leg"}]
	})
	event.custom({
	type: "create:haunting",
	ingredients: [{item: "crabbersdelight:raw_clam_meat"}],
	results: [{item: "ends_delight:shulker_meat"}]
	})
	event.custom({type: 'farmersdelight:cutting',
	ingredients: [{ item: 'dropthemeat:raw_villager' }],
	tool: { tag: 'forge:tools/knives' },
	result: [{ item: 'youkaishomecoming:flesh'}]
	})
	
	event.shapeless(
	Item.of('mca:rose_gold_dust', 4),
	['3x create:crushed_raw_gold',
	'create:crushed_raw_copper'])
	/*
	event.shaped(
		Item.of('kubejs:punched_card_make', 1),
		[
			'CAA',
			'AAB',
			'   '
		],
		{
			A: 'minecraft:paper',
			B: 'some_assembly_required:burger_bun',
			C: 'kubejs:iron_coin'
		}
	)
	event.shaped(
		Item.of('kubejs:punched_card_sell', 1),
		[
			'CAA',
			'AAB',
			'   '
		],
		{
			A: 'minecraft:paper',
			B: 'minecraft:gold_ingot',
			C: 'kubejs:iron_coin'
		}
	)
	*/
	event.custom({type: "farmersdelight:cooking",cookingtime: 100,experience: 0.35,
	ingredients: [{item:"minecraft:milk_bucket"}],
	recipe_book_tab: "misc",
	result: {item: "youkaishomecoming:butter",count:4}
	})
	event.custom({
	type: "create:mixing",
	ingredients: [{amount: 250,fluid: "minecraft:milk",nbt: {}}],
	results: [{item: "youkaishomecoming:butter"}]
	})
	event.smelting('kubejs:caramel', 'minecraft:sugar')
	event.campfireCooking('kubejs:caramel', 'minecraft:sugar')
	event.shaped(
		Item.of('kubejs:soda_can', 16),
		[
			' A ',
			'A A',
			' A '
		],
		{
			A: 'minecraft:iron_nugget'
		}
	)
	event.custom({type: "vintagedelight:fermenting",
		processingTime: 600,
		ingredients: [{item: "kubejs:soda_can"}],
		output: {count: 1,item: "kubejs:soda_water"}
	})
	event.shapeless("kubejs:soda_plain",["kubejs:soda_water","kubejs:caramel","minecraft:sugar"])
	event.shapeless("kubejs:soda_lily",["kubejs:soda_water","kubejs:caramel","minecraft:sugar","minecraft:lily_pad"])
	event.shapeless("kubejs:soda_lime",["kubejs:soda_water","kubejs:caramel","minecraft:sugar","collectorsreap:lime_slice"])
	event.shapeless("kubejs:soda_pomegranate",["kubejs:soda_water","kubejs:caramel","minecraft:sugar","collectorsreap:pomegranate_slice"])
	event.shapeless("kubejs:soda_ancient",["kubejs:soda_water","kubejs:caramel","minecraft:sugar","quark:ancient_fruit"])
	event.custom({type: "farmersdelight:cooking",cookingtime: 100,experience: 0.35,
		ingredients: [{item:"minecraft:potato"},{item:"vintagedelight:salt_dust"},{item:"youkaishomecoming:butter"}],
		container: {item:"minecraft:paper"},
		recipe_book_tab: "misc",
		result: {item: "kubejs:fries"}
	})
	event.custom({type: "farmersdelight:cooking",cookingtime: 100,experience: 0.35,
		ingredients: [{tag:"forge:raw_chicken"},{item:"vintagedelight:salt_dust"},{item:"youkaishomecoming:butter"}],
		container: {item:"minecraft:paper"},
		recipe_book_tab: "misc",
		result: {item: "kubejs:fried_chicken"}
	})
	event.custom({type: "farmersdelight:cooking",cookingtime: 100,experience: 0.35,
		ingredients: [{item:"farmersdelight:tomato"},{item:"farmersdelight:tomato"},{item:"farmersdelight:onion"},{item:"vintagedelight:salt_dust"}],
		container: {item:"minecraft:bowl"},
		recipe_book_tab: "misc",
		result: {item: "kubejs:pizza_sauce_tomato"}
	})
	event.custom({type: "farmersdelight:cooking",cookingtime: 100,experience: 0.35,
		ingredients: [{item:"youkaishomecoming:butter"},{tag:"forge:raw_fishes"},{tag:"forge:raw_fishes"},{item:"vintagedelight:salt_dust"}],
		container: {item:"minecraft:bowl"},
		recipe_book_tab: "misc",
		result: {item: "kubejs:pizza_sauce_seafood"}
	})
	event.custom({type: "farmersdelight:cooking",cookingtime: 100,experience: 0.35,
		ingredients: [{item:"vintagedelight:ghost_charcoal"},{item:"youkaishomecoming:butter"},{item:"youkaishomecoming:butter"},{item:"vintagedelight:salt_dust"}],
		container: {item:"minecraft:bowl"},
		recipe_book_tab: "misc",
		result: {item: "kubejs:pizza_sauce_alfredo"}
	})
	event.custom({type: "farmersdelight:cooking",cookingtime: 100,experience: 0.35,
		ingredients: [{item:"minecraft:crimson_fungus"},{item:"minecraft:crimson_fungus"},{item:"mynethersdelight:bullet_pepper"},{item:"minecraft:blaze_powder"}],
		container: {item:"minecraft:bowl"},
		recipe_book_tab: "misc",
		result: {item: "kubejs:pizza_sauce_blaze"}
	})
	event.custom({type: "farmersdelight:cooking",cookingtime: 100,experience: 0.35,
		ingredients: [{item:"kubejs:sliced_torchflower"},{item:"kubejs:sliced_torchflower"},{item:"kubejs:fiddlefern"},{item:"minecraft:blaze_powder"}],
		container: {item:"minecraft:bowl"},
		recipe_book_tab: "misc",
		result: {item: "kubejs:pizza_sauce_torch"}
	})
	event.shaped(
		Item.of('kubejs:broom'),
		[
			'  A',
			' B ',
			'C  '
		],
		{
				A: 'minecraft:hay_block',
				B: 'farmersdelight:rope',
				C: 'minecraft:stick'
			}
		)
	event.shaped(
		Item.of('kubejs:baggage'),
		[
			'  A',
			' BD',
			'C  '
		],
		{
				D: 'farmersdelight:canvas',
				B: 'minecraft:bread',
				A: 'minecraft:gold_nugget',
				C: 'minecraft:stick'
			}
		)
	event.shaped(
		Item.of('kubejs:iron_contract'),
		[
			'ABA',
			'CDC',
			'ABA'
		],
		{
			A:'minecraft:iron_block',
			B:'kubejs:gold_coin',
			C:'minecraft:paper',
			D:'kubejs:iron_certificate'
		}
	)
	event.shaped(
		Item.of('kubejs:gold_contract'),
		[
			'ABA',
			'CDC',
			'ABA'
		],
		{
			A:'minecraft:gold_block',
			B:'kubejs:diamond_coin',
			C:'minecraft:paper',
			D:'kubejs:gold_certificate'
		}
	)
	event.shaped(
		Item.of('kubejs:diamond_contract'),
		[
			'ABA',
			'CDC',
			'ABA'
		],
		{
			A:'minecraft:diamond_block',
			B:'kubejs:netherite_coin',
			C:'minecraft:paper',
			D:'kubejs:netherite_certificate'
		}
	)
	event.shaped(
		Item.of('kubejs:counter'),
		[
			'AAA',
			'BCB',
			'DDD'
		],
		{
			A:'minecraft:iron_trapdoor',
			B:'#minecraft:planks',
			C:'kubejs:diamond_certificate',
			D:'kubejs:netherite_coin'
		}
	)
	event.shaped(
		Item.of('create:item_vault'),
		[
			'A  ',
			'B  ',
			'A  '
		],
		{
			A:'create:iron_sheet',
			B:'minecraft:composter'
		}
	)
	event.shaped(
		Item.of('create:fluid_tank'),
		[
			'A  ',
			'B  ',
			'A  '
		],
		{
			A:'create:copper_sheet',
			B:'minecraft:composter'
		}
	)
	event.shapeless("kubejs:newspaper",["resourceful_tools:ream_of_paper","minecraft:black_dye","minecraft:feather"])
})