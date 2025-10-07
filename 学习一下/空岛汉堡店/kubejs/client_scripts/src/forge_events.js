function require(/**@type {String}*/classpath) {
    let javaclass = classpath.split('/').slice(1)//将字符串切分成数组并去除packages
    let classname = javaclass.pop()//获取类名
    let newclasspath = javaclass.concat(classname.substring(1)).join('.')//将数组拼接回字符串
    let thisclass = {}
    thisclass[ classname ] = Java.loadClass( newclasspath )
    return thisclass
}
const { $BasicBlockJS } = require("packages/dev/latvian/mods/kubejs/block/custom/$BasicBlockJS");
const { $LivingEntity } = require("packages/net/minecraft/world/entity/$LivingEntity");
/**
 * 
 * @param {$Tooltip_} tooltip 
 * @param {$EntityAccessor_} accessor 
 * @param {$ConfigBase_} pluginConfig 
 * @returns 
 */
const employeetext=[
    [
        [Text.of(">"),Text.translate("jade.kubejs.employee.2").white(),Text.translate("jade.kubejs.employee.1")],
        [Text.of(">"),Text.translate("jade.kubejs.employee.3").gold(),Text.translate("jade.kubejs.employee.1")],
        [Text.of(">"),Text.translate("jade.kubejs.employee.4").aqua(),Text.translate("jade.kubejs.employee.1")]
    ],
    [
        [Text.translate("jade.kubejs.employee.5")],
        [Text.translate("jade.kubejs.employee.6")],
        [Text.translate("jade.kubejs.employee.7")]
    ]
]
function reputationLevel(reputation){
	for(let i=1;i<=100;i++){
		if((((50+50*i)*i)/2)>reputation){
			return i-1;
		}
	}
	return 100;
}
function reputationString(reputation){
	let replevel=reputationLevel(reputation);
	return [Text.translate("message.kubejs.reputation.1"),Text.of(parseInt(replevel)+""),Text.translate("message.kubejs.reputation.2"),
        Text.of((reputation-(((50+50*replevel)*replevel)/2))+"/"+((replevel+1)*50)),Text.translate("message.kubejs.reputation.3")];
}
global.JadeClientEmployee=function(tooltip, accessor, pluginConfig){
    
	let serverData = accessor.getServerData();
    if (!serverData) return;
    //console.log(accessor.getServerData())
    if (!serverData.contains("employee")) return;
    let employee = serverData.get("employee");
    if(employee == null) return;
    if(employee == 0) return;
    tooltip.add(employeetext[0][Math.floor(employee/10)-1])
    tooltip.add(employeetext[1][employee%10])
    //tooltip['append(int,snownee.jade.api.ui.IElement)'](1, tooltip.elementHelper.item(Item.of("minecraft:diamond")))
};
global.JadeClientCounter = (tooltip, accessor, pluginConfig) => {
    let serverData=accessor.getServerData()
    //console.log(serverData.get('reputation'))
    if (serverData.get('reputation') == null) return;
    //console.log(serverData.get('reputation'))
    tooltip.add(reputationString(serverData.get('reputation')))
    let menu=serverData.get('menu').toString().replaceAll('"','').split(",");
    for(let i=0;i<menu.length;i++){
        //console.log(menu[i])
        if(global.ingredients[menu[i]]!=null){
            //console.log(global.ingredients[menu[i]].id)
            tooltip['append(int,snownee.jade.api.ui.IElement)'](parseInt(i/9+2), tooltip.elementHelper.item(Item.of(global.ingredients[menu[i]].id)))
        }
    }
    /*
    let textTooltips = serverData.get('item')
    for (let [k, v] in textTooltips) {
      tooltip['append(int,snownee.jade.api.ui.IElement)'](1, tooltip.elementHelper.item(Item.of(k, v)))
    }
    if (serverData.time != 0) tooltip.add([Fluid.of(serverData.wine).fluidStack.name, ':', serverData.time / 20, '秒'])
    */
};
JadeEvents.onClientRegistration((event) => {
    // Register a new block component provider for the Brushable Block.
    event.entity('kubejs:employee',$LivingEntity).tooltip((tooltip, accessor, pluginConfig) => {
        global.JadeClientEmployee(tooltip, accessor, pluginConfig);
    })
    event.block('kubejs:counter',$BasicBlockJS).tooltip((tooltip, accessor, pluginConfig) => {
        global.JadeClientCounter(tooltip, accessor, pluginConfig)
    })
});