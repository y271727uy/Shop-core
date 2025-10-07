// priority : 100000
ServerEvents.tags('item', event => {
    let pizzakeeprecipelist=[
        'pizzacraft:netherite_pizza_peel',
        'pizzacraft:rolling_pin',
        'pizzacraft:chef_hat',
        'pizzacraft:chef_shirt',
        'pizzacraft:chef_leggings',
        'pizzacraft:chef_boots',
        'pizzacraft:pizza_delivery_boots',
        'pizzacraft:pizza_delivery_leggings',
        'pizzacraft:pizza_delivery_shirt',
        'pizzacraft:pizza_delivery_cap'
    ]
    let pizzakeepjeilist=[
        'pizzacraft:stone_pizza_peel',
        'pizzacraft:iron_pizza_peel',
        'pizzacraft:golden_pizza_peel',
        'pizzacraft:diamond_pizza_peel',
        'pizzacraft:dough',
        'pizzacraft:oven'
    ]
    let pizzataglist=[
        'pizzacraft:ingredients/vegetables/onion_layer',
        'pizzacraft:ingredients/vegetables/pepper_layer',
        'pizzacraft:ingredients/fruits/pineapple_layer',
        'pizzacraft:ingredients/vegetables/tomato_layer',
        'pizzacraft:ingredients/sauces/tomato_sauce_layer',
        'pizzacraft:ingredients/vegetables/vegetable_layer',
        'pizzacraft:ingredients/vegetables/broccoli_layer',
        'pizzacraft:ingredients/cheese_layer',
        'pizzacraft:ingredients/meats/chicken_layer',
        'pizzacraft:ingredients/vegetables/corn_layer',
        'pizzacraft:ingredients/vegetables/cucumber_layer',
        'pizzacraft:ingredients/fish_layer',
        'pizzacraft:ingredients/meats/ham_layer',
        'pizzacraft:ingredients/sauces/hot_sauce_layer',
        'pizzacraft:ingredients/mushrooms/mushroom_layer',
        'pizzacraft:ingredients/fruits/olive_layer'
    ]
    let i=0;
    for(i=0;i<pizzakeeprecipelist.length;i++){
        event.add('pizzacraft:keeprecipe',pizzakeeprecipelist[i])
    }
    event.add('pizzacraft:keepjei','#pizzacraft:keeprecipe')
    for(i=0;i<pizzakeepjeilist.length;i++){
        event.add('pizzacraft:keepjei',pizzakeepjeilist[i])
    }
    for(i=0;i<pizzataglist.length;i++){
        event.removeAll(pizzataglist[i])
    }
    for(let i in global.ingredients){
		if(isNaN(i)){continue;}
		let ingredient=global.ingredients[i];
        if(ingredient.pizza==null){continue;}
		event.add(pizzataglist[ingredient.pizza],ingredient.id)
        if(ingredient.pizzatype==0){
            event.add("pizzacraft:sauce",ingredient.id)
        }
	}
    //event.add('pizzacraft:ingredients/vegetables/cucumber_layer', 'kubejs:sliced_warped_fungus')
    //event.add('pizzacraft:ingredients/cheese_layer', 'vintagedelight:cheese_slice')
    //event.add('pizzacraft:ingredients/fruits/olive_layer','farmersdelight:tomato')
    //event.add('pizzacraft:ingredients/mushrooms/mushroom_layer','farmersdelight:tomato_sauce')
   // event.add('pizzacraft:sauce','farmersdelight:tomato_sauce')
    //event.add('pizzacraft:ingredients/mushrooms/mushroom_layer','kubejs:sliced_warped_fungus')
})
ServerEvents.tags('block', event => {
	event.add('some_assembly_required:sandwiching_stations', 'kubejs:counter')
})