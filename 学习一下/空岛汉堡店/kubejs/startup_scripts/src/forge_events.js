// priority ：100000
function require(/**@type {String}*/classpath) {
    let javaclass = classpath.split('/').slice(1)//将字符串切分成数组并去除packages
    let classname = javaclass.pop()//获取类名
    let newclasspath = javaclass.concat(classname.substring(1)).join('.')//将数组拼接回字符串
    let thisclass = {}
    thisclass[ classname ] = Java.loadClass( newclasspath )
    return thisclass
}
const { $BasicBlockJS } = require("packages/dev/latvian/mods/kubejs/block/custom/$BasicBlockJS");
const { $BlockEntityJS } = require("packages/dev/latvian/mods/kubejs/block/entity/$BlockEntityJS");
const { $LivingEntity } = require("packages/net/minecraft/world/entity/$LivingEntity");

ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingChangeTargetEvent',event=> {
	global.LivingChangeTargetEvent(event)
	
})
/**
 *
 * @param {Internal.LivingChangeTargetEvent} event
 */
global.LivingChangeTargetEvent= event =>{
	let $player=Java.loadClass('net.minecraft.server.level.ServerPlayer')
	//console.log(event.cancelable)
	if(event.entity.type=="minecraft:hoglin"){
		return;
	}
	if(event.newTarget instanceof $player){
		event.setNewTarget(null)
		//event.setCanceled(true)
	}
}
/**
 * 
 * @param {$CompoundTag_} tag 
 * @param {$EntityAccessor_} accessor 
 */
global.JadeEmployee=function(tag,accessor){
	let entity=accessor.getEntity()
	if(!entity)return;
	//console.log(entity.persistentData.getInt("employee"))
	tag.put("employee",entity.persistentData.getInt("employee"))
}
global.JadeCounter = function(tag, accessor){
	/**
	 * @type {$BlockEntity}
	 */
	//console.log(123)
	let entity=accessor.blockEntity
	//console.log(entity)
	if (!entity) return;
	//console.log(entity.block)
	if (entity.block!='kubejs:counter') return;
	tag.put('reputation', entity.persistentData.getInt('reputation'))
	tag.put('menu', entity.persistentData.getString('menu') || '')
}
JadeEvents.onCommonRegistration(event=>{
	event.entityDataProvider('kubejs:employee',$LivingEntity).setCallback((tag,accessor)=>{global.JadeEmployee(tag,accessor)})
	event.blockDataProvider('kubejs:counter',$BlockEntityJS).setCallback((tag,accessor)=>{global.JadeCounter(tag,accessor)})
})