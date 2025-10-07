/*

function yawdelta(standard,target){
    let ntarget=target
    if(standard>ntarget){ntarget+=360}
    if(ntarget-standard>180){
        return ntarget-standard-360
    }
    else{
        return ntarget-standard
    }
}
ItemEvents.rightClicked("minecraft:netherite_ingot",event=>{
    let player=event.player
    player.swing()
    let yaw=player.yaw
    let storedyaw=player.persistentData.getInt("yaw")
    event.level.spawnParticles("minecraft:wax_off",false,player.x,player.y+1,player.z,0.3,0.5,0.3,50,0)
    if(storedyaw==0){
        player.persistentData.putInt("yaw",yaw);
    }
    else{
        let delta=yawdelta(storedyaw,yaw)
        if(delta>30){
            player.give("minecraft:gold_ingot")
        }
        else if(delta>-30){
            player.give("minecraft:emerald")
        }
        else{
            player.give("minecraft:diamond")
        }
    }
})
PlayerEvents.tick(event => {
	let player = event.player;
    let storedyaw=player.persistentData.getInt("yaw")
    if(storedyaw==0){
        player.paint({
            diamond:{
                type: 'item',
                visible: false
            },
            emerald:{
                type: 'item',
                visible: false
            },
            gold_ingot:{
                type: 'item',
                visible: false
            }
        })
        return;
    }
    if(player.getMainHandItem()!='minecraft:netherite_ingot'){
        player.persistentData.putInt("yaw",0)
        return;
    }
    let delta=yawdelta(storedyaw,player.yaw)
    player.paint({
        diamond:{
            type: 'item',
            x:"$screenW/2-100",
            y:"$screenH/2+sin(time()*1.1)*$screenH/32",
            w:Math.max(Math.min(48,-delta),16)*2,
            h:Math.max(Math.min(48,-delta),16)*2,
            draw: 'ingame',
            item: 'minecraft:diamond',
            visible: true
        },
        emerald:{
            type: 'item',
            x:"$screenW/2",
            y:"$screenH/2+sin(time()*1.2)*$screenH/32",
            w:Math.max(48-Math.abs(delta),16)*2,
            h:Math.max(48-Math.abs(delta),16)*2,
            draw: 'ingame',
            item: 'minecraft:emerald',
            visible: true
        },
        gold_ingot:{
            type: 'item',
            x:"$screenW/2+100",
            y:"$screenH/2+sin(time()*1.3)*$screenH/32",
            w:Math.max(Math.min(48,delta),16)*2,
            h:Math.max(Math.min(48,delta),16)*2,
            draw: 'ingame',
            item: 'minecraft:gold_ingot',
            visible: true
       }
   })
})

*/